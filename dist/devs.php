<?php
/*This file works with the developer dashboard and the 2 SQL tables to show the progression
of a bug, its history, and its assigned developer and tester.*/
        // Connect to database
        require_once "config.php";

        $request_method = $_SERVER["REQUEST_METHOD"];
        switch($request_method)
                {
                    case 'GET':
                            get_devs();
                            break;
                    case 'POST':
                            $request = json_decode(file_get_contents('php://input'), TRUE);
                            $cases = $request["cases"];
                            if ($cases == "assign_dev") {
                                    $id = $request["bugID"];
                                    $devUsername = $request["devUsername"];
                                    assign_dev($id, $devUsername);
                            }
                            elseif ($cases == "assign_tester") {
                                $id = $request["bugID"];
                                $devUsername = $request["devUsername"];
                                assign_tester($id, $devUsername);
                            }
                            else {
                                echo json_encode(array('res' => 'invalid cases field'));
                            }
                            break;
                    default:
                            // Invalid Request Method
                            header("HTTP/1.0 405 Method Not Allowed");
                            break;
                }

        /*get_devs retrieves the bugs that have been assigned to the logged-in developer*/
        function get_devs() {
              global $conn;
              $query = "SELECT * FROM `bug_byte_users` WHERE `type` LIKE 'developer'";
              $response = array();
              $result = mysqli_query($conn, $query);
              while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
              {
                      $response[] = $row;
              }
              header('Content-Type: application/json');
              echo json_encode($response);
        }

        /*assign_dev updates the table to show the assigned developer's progress/history
        parameter $id is the identification of the bug, parameter $devUsername is
        the username of the assigned developer*/
        function assign_dev($id, $devUsername) {
          global $conn;

          $query = "UPDATE bug_byte_bugs SET developer = '".$devUsername."' WHERE id = $id";

          if (mysqli_query($conn, $query)) {
            $response = array(
              'status' => 1,
              'status_message' => 'assign_dev Call was successful'
            );

            $dateProgressed = date("Y-m-d h:i:sa");
            $dateString = '", \\"DevAssigned\\": ' . '\\"' . "$dateProgressed" . '\\""' ;
            $query = "UPDATE bug_byte_bugs SET history=concat(history, $dateString) WHERE id = $id";

            if (mysqli_query($conn, $query)) {
                $response["notes"]="DevAssinged History Successfully modified";
            } else {
                $response['notes']='DevAssign history modify failed';
            }
          } else {
            $response = array(
              'status' => 0,
              'status_message' => 'assign_dev Call failed.'
            );
          }

          mysqli_error($conn);

          header('Content-Type: application/json');
          echo json_encode($response);
        }

        /*assign_tester updates the table to show the assigned tester of the bug
        parameter $id is the identification of the bug, parameter $devUsername is
        the username of the assigned tester*/
        function assign_tester($id, $devUsername) {
          global $conn;

          $query = "UPDATE bug_byte_bugs SET tester = '".$devUsername."' WHERE id = $id";

          if (mysqli_query($conn, $query)) {
            $response = array(
              'status' => 1,
              'status_message' => 'assign_tester Call was successful'
            );

            $dateProgressed = date("Y-m-d h:i:sa");
            $dateString = '", \\"TesterAssigned\\": ' . '\\"' . "$dateProgressed" . '\\""' ;
            $query = "UPDATE bug_byte_bugs SET history=concat(history, $dateString) WHERE id = $id";

            if (mysqli_query($conn, $query)) {
                $response["notes"]="Tester Assign history Successfully modified";
            } else {
                $response['notes']='Tester ASsign history modify failed';
            }

          } else {
            $response = array(
              'status' => 0,
              'status_message' => 'assign_tester Call failed.'
            );
          }

          mysqli_error($conn);

          header('Content-Type: application/json');
          echo json_encode($response);
        }

        mysqli_close($conn);
?>

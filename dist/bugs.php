<?php
        session_start();

        // Connect to database
        header("Content-Type: application/json; charset=UTF-8");
        header('Access-Control-Allow-Origin: http://localhost:3000');
        $host = 'localhost';
        $user = 'root'; # enter your username
        $password = ''; # enter your password
        $dbname = 'bug_byte_dev';

        $conn = new mysqli($host, $user, $password, $dbname);
        if ($conn->connect_error) {
                echo json_encode($conn->connect_error);
        }
        $request_method = $_SERVER["REQUEST_METHOD"];
        switch($request_method)
                {
                        case 'GET':
                                get_bugs();
                                break;
                        case 'POST':
                                $request = json_decode(file_get_contents('php://input'), TRUE);
                                $cases = $request["cases"];
                                if ($cases == "update_progress") {
                                        $id = $request["id"];
                                        $progress = $request["progress"];
                                        update_progress($id, $progress);
                                }
                                elseif ($cases == "add_bug") {
                                        //echo json_encode($request);
                                        addBug($request["data"]);
                                }
                                elseif ($cases = "delete_bug") {
                                    $id = $request["bugID"];
                                    deleteBug($id);
                                }
                                else {
                                        echo json_encode(array('res' => 'invalid cases field'));
                                }
                                break;
                        // case 'UDPATE_DEV':
                        //         $id = ["id"]);
                        //         update_bugs($id);
                        //         break;
                        // case 'UPDATE_PROGRESS':
                        //         $id = intval($_GET["id"]);
                        //         $progress = intval($_GET["progress"]);
                        //         update_progress($id, $progress);
                        //         break;
                        default:
                                // Invalid Request Method
                                header("HTTP/1.0 405 Method Not Allowed");
                                exit;
                                break;
                }

        function get_bugs()
        {
                global $conn;
                if(isset($_GET['filter'])) {
                    $filter = $_GET['filter'];
                    $value = $_GET['value'];
                    $query = "SELECT * FROM bugs_dev where $filter = '$value'";
                }
                else {
                    $query = "SELECT * FROM bugs_dev";
                }
                
                $response = array();
                $result = mysqli_query($conn, $query);
                while($row = mysqli_fetch_array($result,MYSQLI_ASSOC))
                {
                        $response[] = $row;
                }
                echo json_encode($response);
        }

        function addBug($formData)
        {
                global $conn;
                $name = htmlspecialchars(addslashes($formData["name"]));
                $type = $formData["type"];
                $severity = $formData["severity"];
                $description = htmlspecialchars(addslashes($formData["description"]));
                $program = htmlspecialchars(addslashes($formData["program"]));
                $browser = $formData["browser"];
                $creator = $_SESSION['username'];
                $progress = 'Not Started';
                $query = "INSERT INTO bugs_dev (name, type, severity, description, program, browser, progress, creator) VALUES ('$name','$type','$severity','$description','$program','$browser','$progress', '$creator')";
                if(mysqli_query($conn, $query))
                {
                        $response = array(
                                'status' => 1,
                                'status_message' => 'Bug Added Successfully.'
			);
		}

		else
		{
            $error = mysqli_error($conn);
			$response = array(
				'status' => 0,
				'status_message' => $error
			);
		}

		header('Content-Type: application/json');
		echo json_encode($response);
	}

        function update_bugs($id)
        {
                global $conn;
                $post_vars = json_decode(file_get_contents("bug_form.html"),true);
                $assigned_developer = $post_vars["developer"];
                $query = "UPDATE bug_devs SET developer = " . $assigned_developer . " WHERE id = " . $id;

                if(mysqli_query($conn, $query))
                {
                        $response = array(
                        'status' => 1,
                        'status_message' =>'Bug Updated Successfully.'
                        );
                }

                else
                {
                        $response = array(
                        'status' => 0,
                        'status_message' =>'Bug Update Failed.'
                        );
                }

                header('Content-Type: application/json');
                echo json_encode($response);
        }

        function deleteBug($id) {
            global $conn;

            $query = "DELETE FROM `bugs_dev` WHERE `bugs_dev`.`id` = $id";

            if(mysqli_query($conn, $query)) {
                $response = array(
                'status' => 1,
                'status_message' =>'Bug Deleted Successfully.'
                );
            }
            else
            {
                $response = array(
                'status' => 0,
                'status_message' =>'Bug Update Failed.'
                );
            }

            header('Content-Type: application/json');
            echo json_encode($response);
        }

        function update_progress($id, $progress) {
          global $conn;

          $query = "UPDATE bugs_dev SET progress = '".$progress."' WHERE id = $id";

          if (mysqli_query($conn, $query)) {
            $response = array(
              'status' => 1,
              'status_message' => 'Bug Progress Update Call was successful'
            );
          } else {
            $response = array(
              'status' => 0,
              'status_message' => 'Bug Progress Update Call failed.'
            );
          }

          mysqli_error($conn);

          header('Content-Type: application/json');
          echo json_encode($response);
        }

        mysqli_close($conn);
?>

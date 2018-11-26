<?php
        session_start();
        require_once "config.php";

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
                        default:
                                // Invalid Request Method
                                header("HTTP/1.0 405 Method Not Allowed");
                                exit;
                                break;
                }

        function get_bugs()
        {
                global $conn;
                if(isset($_GET['filter1'])) {
                    $filter1 = $_GET['filter1'];
                    $value1 = $_GET['value1'];
                    $filter2 = $_GET['filter2'];
                    $value2 = $_GET['value2'];
                    $query = "SELECT * FROM bug_byte_bugs where $filter1 = '$value1' or $filter2 = '$value2'";
                }
                else {
                    $query = "SELECT * FROM bug_byte_bugs";
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
                $dateCreated = date("Y-m-d h:i:sa");
                $history = '\\"created\\": ' . '\\"' . "$dateCreated" . '\\"' ;
                $query = "INSERT INTO bug_byte_bugs (name, type, severity, description, program, browser, progress, creator, history) VALUES ('$name','$type','$severity','$description','$program','$browser','$progress', '$creator', '$history')";
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
                $query = "UPDATE bug_byte_bugs SET developer = " . $assigned_developer . " WHERE id = " . $id;

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

            $query = "DELETE FROM `bug_byte_bugs` WHERE id = $id";

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

          $query = "UPDATE bug_byte_bugs SET progress = '".$progress."' WHERE id = $id";

          if (mysqli_query($conn, $query)) {
            $response = array(
              'status' => 1,
              'status_message' => 'Bug Progress Update Call was successful'
            );

            $dateProgressed = date("Y-m-d h:i:sa");
            $dateString = '", \\"progress\\": ' . '\\"' . "$dateProgressed" . '\\""' ;
            $query = "UPDATE bug_byte_bugs SET history=concat(history, $dateString) WHERE id = $id";

            if (mysqli_query($conn, $query)) {
                $response["notes"]="history Successfully modified";
            } else {
                $response['notes']='history modify failed';
                mysqli_error($conn);
            }
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

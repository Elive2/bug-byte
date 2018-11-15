<?php
        //TODO:
        // [ ] - Login
        // [ ] - Keep authenticated user in a SESSION variable
        // [ ] - append client First Name and Latname to bug repot query
        // [ ] - consider using Lumen/Laravel to resturcture the api
        //        = would be easier to protect endpoints:
        // https://code.tutsplus.com/tutorials/how-to-secure-a-rest-api-with-lumen--cms-27442
        //

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
                                break;
                }

        function get_bugs()
        {
                global $conn;
                $query = "SELECT * FROM bugs_dev";
                $response = array();
                $result = mysqli_query($conn, $query);
                while($row = mysqli_fetch_array($result,MYSQLI_ASSOC))
                {
                        $response[] = $row;
                }
                header('Content-Type: application/json');
                echo json_encode($response);
        }

        function addBug($formData)
        {
                global $conn;
                $name = $formData["name"];
                $type = $formData["type"];
                $severity = $formData["severity"];
                $description = $formData["description"];
                $program = $formData["program"];
                $browser = $formData["browser"];
                $username = $_SESSION['username'];
                $progress = 'Not Started';
                $query = "INSERT INTO bugs_dev (name, type, severity, description, program, browser, progress, username) VALUES ('$name',' $type',' $severity',' $description',' $program',' $browser','$progress', '$username')";
                //echo json_encode(array('query' => $query));
                if(mysqli_query($conn, $query))
                {
                        $response = array(
                                'status' => 1,
                                'status_message' => 'Bug Added Successfully.'
			);
		}

		else
		{
			$response = array(
				'status' => 0,
				'status_message' => 'Bug Addition Failed.'
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

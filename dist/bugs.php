<?php
        // Connect to database
        header("Content-Type: application/json; charset=UTF-8");
        header('Access-Control-Allow-Origin: http://localhost:3000');
        $host = 'localhost';
        $user = 'root'; # enter your username
        $password = ''; # enter your password
        $dbname = 'bug_byte_dev';

        $conn = new mysqli($host, $user, $password, $dbname);
        if ($conn->connect_error) {
                die("Connection failed: $conn->connection_error");
        }
        $request_method = $_SERVER["REQUEST_METHOD"];
        switch($request_method)
                {
                        case 'GET':
                                get_bugs();
                                break;
                        case 'POST':
                                post_bugs();
                                break;
                        case 'UDPATE':
                                $id = intval($_GET["id"]);
                                update_bugs($id);
                                break;
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

        function post_bugs()
        {
                global $conn;
                $data = $_POST;
                $name = $data["name"];
                $type = $data["type"];
                $severity = $data["severity"];
                $description = $data["description"];
                $program = $data["program"];
                $browser = $data["browser"];
                $progress = 'Not Started';
                $query = "INSERT INTO bugs_dev (name, type, severity, description, program, browser, progress) VALUES ('$name',' $type',' $severity',' $description',' $program',' $browser','$progress')";
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

        mysqli_close($conn);
?>
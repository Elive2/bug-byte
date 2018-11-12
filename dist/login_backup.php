<?php
	//this php script is the login middleware. It is the first point of contact
	//for someone logging into the system
  ob_start();
	error_reporting(E_ALL | E_WARNING | E_NOTICE);
	ini_set('display_errors', TRUE);
	
	session_start();

    $hostRoot = 'index.html';
    $host = 'localhost';
    $user = 'root'; # enter your username
    $password = ''; # enter your password
    $dbname = 'bug_byte_dev';

    $conn = new mysqli($host, $user, $password, $dbname);
    $request_method = $_SERVER["REQUEST_METHOD"];

    switch($request_method)
    {
        case 'POST':
                $request = json_decode(file_get_contents('php://input'), TRUE);
                $cases = $request["cases"];
             	if ($cases == "login") {
                        $email = $request["email"];
                        $password = $request["password"];
                        login($email, $password);
                }
                else {
                        echo json_encode(array('res' => 'invalid cases field'));
                }
                break;
        default:
                // Invalid Request Method
                //header("HTTP/1.0 405 Method Not Allowed");
                // echo "method not allowed";
                break;
    }

    function login($username, $password) {
          global $conn;
          global $hostRoot;
          $query = "SELECT * FROM `users` WHERE username = '$username'";
          $result = mysqli_query($conn, $query);
          if ($result) {
            $fields = mysqli_fetch_assoc($result);
            if($fields['password'] == $password) {
                header("Location:$hostRoot");
                exit;
            }
            else {
                $response = array(
                'status' => "failure",
                'status_message' => 'incorrect password',
                'correct_password' => $fields['password']
                );
            }
            
          } else {
            $response = array(
              'status' => "failure",
              'status_message' => 'Login Call failed.'
            );
          }

          mysqli_error($conn);

          echo json_encode($response);
        }
?>
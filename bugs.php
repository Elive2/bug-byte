<?php
	// Connect to database
	header("Content-Type: application/json; charset=UTF-8");
	header('Access-Control-Allow-Origin: *');

	$host = "dbserver.engr.scu.edu";
	$user = "eyale"; # enter your username
	$password = "tenspot10"; # enter your password
	$dbname = "sdb_" . $user;

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
		$query = "SELECT * FROM bugs_dev";
		$response = array();
		$result = mysqli_query($conn, $query);

		while($row = mysqli_fetch_array($result))
		{
			$response[] = $row;
		}

		//header('Content-Type: application/json');
		echo json_encode($response);

	}

function post_bugs()
 {
		global $conn;

		//$data = json_decode(file_get_contents('php://input'), true);
		$bug_name = $data["bug_name"];

		$name = $_POST["name"];
		$type = $_POST["type"];
		$severity = $_POST["severity"];
		$description = $_POST["description"];
		$program = $_POST["program"];
		$browser = $_POST["browser"];

		$query = "INSERT INTO bug_devs SET name='".$name."', type='".$type."',
		severity='".$severity."', description='".$description."',program='".$program."',
		browser='".$browser."',developer='".$assigned_developer."'";

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

		//header('Content-Type: application/json');
		echo json_encode($response);
	}

function update_bugs($id)
	{
		global $conn;
		//$post_vars = json_decode(file_get_contents("php://input"),true);
		$name = $_POST["name"];
		$type = $_POST["type"];
		$severity = $_POST["severity"];
		$description = $_POST["description"];
		$program = $_POST["program"];
		$browser = $_POST["browser"];
		$assigned_developer = $_POST["developer"];

		$query = "UPDATE bug_devs SET name='".$name."', type='".$type."',
		severity='".$severity."', description='".$description."',program='".$program."',
		browser='".$browser."',developer='".$assigned_developer."' WHERE id=".$id;

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

		//header('Content-Type: application/json');
		echo json_encode($response);
	}
?>

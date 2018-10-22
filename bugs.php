<?php
	// Connect to database
	include("../connection.php");
	$db = new dbObj();
	$connection =  $db->getConnstring();

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
		global $connection;
		$query = "SELECT * FROM bugs_dev";
		$response = array();
		$result = mysqli_query($connection, $query);

		while($row = mysqli_fetch_array($result))
		{
			$response[] = $row;
		}

		//header('Content-Type: application/json');
		//echo json_encode($response);

		echo $response;

	}

function post_bugs()
 {
		global $connection;

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

		if(mysqli_query($connection, $query))
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

		echo $reponse;

		//header('Content-Type: application/json');
		//echo json_encode($response);
	}

function update_bugs($id)
	{
		//global $connection;
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

		if(mysqli_query($connection, $query))
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
		//echo json_encode($response);

		echo $response;
	}
?>

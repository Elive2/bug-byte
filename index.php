<?php
  session_start();
?>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <title>Lab 8</title>
  </head>
  <body>
    <?php 
      if(!isset($_SESSION["todoList"])) {
        //superglobal to maintian state of todo list
        $_SESSION["todoList"] = array("Lab", "Study for quiz");
      }


      if ($_SERVER["REQUEST_METHOD"] == "POST") {
        //handle when the clear from is submitted
        if(isset($_POST["clear"])) {
          session_unset();
          session_destroy();
          $_SESSION["todoList"] = array();
        }
        //handle when the todo form is submitted
        else {
          $newTodo = test_input($_POST["todo"]);
          //validate input
          if(!preg_match("/^[a-zA-Z0-9 ]*$/", $newTodo)) {
            $newTodoErr = "To-do should only contain letters and numbers";
          }
          elseif($newTodo == "") {
            $newTodoErr = "Please enter a to-do";
          }
          else {
            array_push($_SESSION["todoList"], $newTodo);
          }
        }
      }

      //sanitize input
      function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
      }
    ?> 
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>

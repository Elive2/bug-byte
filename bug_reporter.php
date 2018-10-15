<html>
  <body>
    Thank you for your submission.

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = test_input($_POST["name"]);
        $type = test_input($_POST["type"]);
        $severity = test_input($_POST["severity"]);
        $description = test_input($_POST["description"]);
        $program = test_input($_POST["program"]);
        $browser = test_input($_POST["browser"]);
      }


      function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
      }
      ?>

    Your Submission
    Name of Bug: <?php echo $_POST["name"]; ?><br>
    Type of Bug: <?php echo $_POST["type"]; ?><br>
    Severity: <?php echo $_POST["severity"]; ?><br>
    Description of bug: <?php echo $_POST["description"]; ?><br>
    Program you found the bug on: <?php echo $_POST["program"]; ?><br>
    Browser you are using: <?php echo $_POST["browser"]; ?><br>

  </body>
</html>

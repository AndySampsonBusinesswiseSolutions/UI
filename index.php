<?php 
	if(!session_id()) session_start();
	$PAGE_TITLE = "Login";
?>

<!DOCTYPE html>
<html>
<head>
	<title><?php echo $PAGE_TITLE ?></title>
	<link rel="stylesheet" href="login.css">
</head>

<body>
	<div id="container1">
		<div id="col1">
			<div style="margin-top: 25%; color: white; font-size: 70px; padding-left: 15%; padding-right: 25%;">
				Take control of energy costs and consumption with Energy Manager
			</div>
			<br><br><br><br>
			<div style="margin-bottom: 20%; color: white; font-size: 30px; padding-left: 15%; padding-right: 25%;">
				A best in class online reporting portal designed by Businesswise energy experts
			</div>
		</div>
		<div id="col2">
			<div style="padding-top: 50%">
				<form name="loginForm" action="/Internal/Dashboard" method="post">
					<div class="container" style="padding-left: 5%; padding-right: 5%;">
						<input type="text" placeholder="Enter Email Address" id="userName"><!--  required> -->
						<input type="password" placeholder="Enter Password" id="password"><!--  required> -->
						<button type="submit">Sign In</button><br>
						<span class="psw"><a href="/Internal/ForgottenPassword/">Forgot password?</a></span>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
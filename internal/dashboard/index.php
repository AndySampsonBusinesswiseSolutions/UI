<?php 
	if(!session_id()) session_start();
	$PAGE_TITLE = "Dashboard";
?>

<!DOCTYPE html>
<html>
<head>
	<title><?php echo $PAGE_TITLE ?></title>

	<link rel="stylesheet" href="dashboard.css">
	<link href="carousel.css" rel="stylesheet">
</head>

<body>
	<div class="sidenav">
		<a><img srcset="https://cdn.foleon.com/upload/28150/unknown-10.3e4603022681.jpeg" style="width: 95%;"></a>
		<a><i class="fas fa-home"></i>HOME</a>
		<a><i class="fas fa-pound-sign"></i>FINANCE</a>
		<a><i class="fas fa-crosshairs"></i>OPPORTUNITIES</a>
		<a><i class="fas fa-toolbox"></i>PORTFOLIO</a>
		<a><i class="fas fa-file-signature"></i>SUPPLIERS</a>
		<a><i class="fas fa-user"></i>ACCOUNT</a>
		<a style="margin-top: 100px"><i class="fas fa-long-arrow-alt-right"></i>LOG OUT</a>
	</div>

	<div class="main">
		<div class="mainHeader">
			<span>Welcome back "Client Name"</span>
			<i class="far fa-dot-circle" style="float: right;"></i>
			<i class="far fa-bell" style="float: right; margin-right: 25px;"></i>
		</div>
		<div class="mainContainer">
			<div class="filter">
				<div style="background-color: lightgray; float: left; cursor: pointer;">
					<i class="fas fa-filter"></i>
					<span>Filter</span>
				</div>
				<div style="background-color: lightgray; float: right; cursor: pointer;"><i class="far fa-calendar-alt" style="margin-right: 5px;"></i>01/07/2020</div>
				<div style="background-color: white; float: right; margin-right: 15px; margin-left: 25px;">To:</div>
				<div style="background-color: lightgray; float: right; cursor: pointer;"><i class="far fa-calendar-alt" style="margin-right: 5px;"></i>01/07/2019</div>
				<div style="background-color: white; float: right; margin-right: 15px;">From:</div>
				<div style="clear: both;"></div>
			</div>
			<div class="carousel">
				<div class="carousel-row">
					<div id="SiteLocation" class="carousel-tile" onclick="displayItem('SiteLocation')">
						<span>Site Locations</span>
						<br>
						<span>6</span>
						<br><br>
					</div>
					<div id="PortfolioUsage" class="carousel-tile" onclick="displayItem('PortfolioUsage')">
						<span>Portfolio Usage</span>
						<br>
						<span>5,654,002 kWh</span>
						<br><br>
					</div>
					<div id="PortfolioCost" class="carousel-tile" onclick="displayItem('PortfolioCost')">
						<span>Portfolio Cost</span>
						<br>
						<span>£712,054</span>
						<br><br>
					</div>
					<div id="Savings" class="carousel-tile" onclick="displayItem('Savings')">
						<span>Savings</span>
						<br>
						<span>£10,571 to date<br>£9,249 over next 3yrs</span>
						<br>
					</div>
					<div id="Opportunities" class="carousel-tile" onclick="displayItem('Opportunities')">
						<span>Opportunities</span>
						<br>
						<span>7 active<br>£70,000 proj. savings</span>
						<br>
					</div>
					<div id="Carbon" class="carousel-tile" onclick="displayItem('Carbon')">
						<span>Carbon</span>
						<br>
						<span>1,551 tonnes</span>
						<br><br>
					</div>
					<div id="FlexElectricityPrices" class="carousel-tile" onclick="displayItem('FlexElectricityPrices')">
						<span>Flex Electricity Prices</span>
						<br><br><br><br>
					</div>
				</div>
			</div>
			<div class="mainResult" id="mainResult">
			</div>
		</div>
	</div>
</body>

<script src="dashboard.js"></script>
<script type="text/javascript" src="/includes/apexcharts/apexcharts.js"></script>
<script type="text/javascript" src="/includes/jexcel/jexcel.js"></script>
<script type="text/javascript" src="/includes/jsuites/jsuites.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDEzl4cfd2OyotR5jHTowAoxwRzOyX8jws"></script>
<script type="text/javascript" src="dashboard.json"></script>

<script>
	pageLoad();
</script>
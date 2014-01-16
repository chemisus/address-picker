<?php

$search = $_GET['search'];

echo file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' . urlencode($search));

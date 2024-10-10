<?php

require_once 'routes.php';

header("Content-Type: application/json"); // Set the response type to JSON
routeRequest(); // Call the routing function

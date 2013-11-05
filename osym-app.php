<?php
$string = file_get_contents("/home/sirin/osym.txt");
//$string= file_get_contents("/home/sirin/new-osym.txt");
$json_a=json_decode($string,true);
$encoded = json_encode($json_a);
echo $encoded;

?>

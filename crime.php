<?php
 include 'connection.php';
 $q=$_GET['q'];
 $q = "SELECT `Crime_rate` FROM `cime_rate` WHERE State='$q';";
 $query = mysqli_query($con,$q);
 $row = mysqli_fetch_array($query);
 echo $row['Crime_rate'];
?>
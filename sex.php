<?php
 include 'connection.php';
 $q=$_GET['q'];
 $q = "SELECT `Ratio` FROM `sex_ratio` WHERE State='$q';";
 $query = mysqli_query($con,$q);
 $row = mysqli_fetch_array($query);
 echo $row['Ratio'];
?>
<?php
 include '../connection.php';
$q=$_GET['q'];
$sql="SELECT * FROM `Uttar Pradesh` WHERE name='$q';";
$query = mysqli_query($con,$sql);
$y=mysqli_fetch_array($query);
//applying linear regression to predict the future values
$x = array(1,2,3,4);
$xm = 10/4;
$ym = ($y['one']+$y['two']+$y['three']+$y['four'])/4;
$num=0;
$col = array("one","two","three","four");
$c=0;
$den1=0;
$den2=0;
foreach($col as $j)
{
	$num+=($x[$c]-$xm)*($y[$j]-$ym);
	$den1+=pow(($x[$c]-$xm),2);
	$den2+=pow(($y[$j]-$ym),2);
	$c++;
}
$sy= $den2/(4-1);
$sx=$den1/(4-1);
$dem = pow(($den1*$den2),0.5);
$r=1;
if($dem!=0)
$r = $num/$dem;
$sy=pow($sy,0.5);
$sx=pow($sx,0.5);
$b=$r*($sy/$sx);
$a = $ym-$b*$xm;
$pre = $a+$b*5;
echo "past year crimes are <br>,".$y['one'].",".$y['two'].",".$y['three'].",".$y['four'].",<br/>";
echo "next year predicted crime,".$pre;
?>
<?php

$link = @mysql_connect("localhost:3306","root","admin");
if(!$link){
    echo mysql_error($link);
}

$db = @mysql_select_db("test1812");
if(!$db){
    echo mysql_error($link);
}

$utf = @mysql_query("set names utf8");
if(!$utf){
    echo mysql_error($link);
}

$q = @mysql_query("SELECT * FROM goods");
if($q){
    $str = "";
    while($arr = mysql_fetch_assoc($q)){
        $str = $str . json_encode($arr) . ",";
    }
    echo "[" . substr($str,0,-1) . "]";
}else{
    echo mysql_error($link);
}
?>
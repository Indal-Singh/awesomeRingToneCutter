<?php
// print_r($_REQUEST);
if($_REQUEST)
{
    $file = pathinfo($_REQUEST['fileName']);
    $fileName = $file['filename'];
    $fileExt = $file['extension'];
    $start = $_REQUEST['start'];
    $end = $_REQUEST['end'];
}
?>
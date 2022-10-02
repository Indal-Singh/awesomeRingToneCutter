<?php
// print_r($_POST);
if($_POST)
{
    $file = pathinfo($_POST['fileName']);
    $fileName = $file['filename'];
    $start = $_POST['start'];
    $end = $_POST['end'];
    $mainFilePath = "../files/convertedFiles/$fileName.mp3";
    $ringtonePath = "../files/ringtonefiles/$fileName-Ringtone.mp3";
    $cmdCutter = "ffmpeg -y -i $mainFilePath -ss $start -to $end -c copy $ringtonePath";
    exec($cmdCutter);
    $file_name = $fileName.'-Ringtone.mp3';
    header('Content-Type: application/octet-stream');
    header("Content-Transfer-Encoding: Binary"); 
    header("Content-disposition: attachment; filename=\"".$file_name."\""); 
    readfile($ringtonePath);
    exit;
}
?>
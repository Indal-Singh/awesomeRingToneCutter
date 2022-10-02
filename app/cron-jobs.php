<?php

$folder_json = "../files/jsonfiles";
$folder_tone = "../files/ringtonefiles";
$folder_saved = "../files/savedFiles";
$folder_converted = "../files/convertedFiles";

$files_json = glob($folder_json.'/*'); 
$files_tone = glob($folder_tone.'/*'); 
$files_saved = glob($folder_saved.'/*'); 
$files_converted = glob($folder_converted.'/*'); 

foreach($files_json as $file) { 
    if(is_file($file)) 
        unlink($file); 
}
foreach($files_tone as $file) { 
    if(is_file($file)) 
        unlink($file); 
}
foreach($files_saved as $file) { 
    if(is_file($file)) 
        unlink($file); 
}
foreach($files_converted as $file) { 
    if(is_file($file)) 
        unlink($file); 
}

?>
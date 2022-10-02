<?php
if($_POST)
{
   $fileUrl = $_POST['fileUrl'];
   $fileInfo = pathinfo($fileUrl);
   $fileName = $fileInfo['filename'];
   (isset($fileInfo['extension']))?($fileExt = $fileInfo['extension']):$fileExt='mp3'; // checking exataintions
   $saveGetPath = "../files/savedFiles/$fileName.$fileExt";
   if(!file_exists($saveGetPath))
   saveFile($fileUrl,$saveGetPath);
   if(file_exists($saveGetPath))
   {
    $jsonpath = '../files/jsonfiles/'.$fileName.'.json'; // location to save Json File
    $convertedPath = "../files/convertedFiles/$fileName.mp3";
    if(file_exists($saveGetPath)){
        if(!file_exists($convertedPath))
        {
            $cmdConvert = "ffmpeg -i $saveGetPath -vn -ar 44100 -ac 2 -b:a 192k $convertedPath";
            exec($cmdConvert);
        }
    }
            if(!file_exists($jsonpath)){
                $json = audio2Json($convertedPath,$jsonpath); // calling function to convert into json
                if($json)
                echo $fileName;
            }
            else
            {
                echo $fileName;
            }
   
   } 
   
}

function saveFile($mainFile,$saveGetPath)
{
    $ch = curl_init();
    $fp = fopen ($saveGetPath, 'w+');
    $ch = curl_init($mainFile);
    curl_setopt($ch, CURLOPT_TIMEOUT, 50);
    curl_setopt($ch, CURLOPT_FILE, $fp);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_ENCODING, "");
    curl_exec($ch);
    curl_close($ch);
    fclose($fp);
    return 1;
}

function audio2Json($convertedPath,$path)
{
    $cmd = 'ffprobe -v error -f lavfi -i "amovie='.$convertedPath.',asetnsamples=44100,astats=metadata=1:reset=1" -show_entries frame_tags=lavfi.astats.Overall.RMS_level -of json > '.$path.''; // commad for creatring audio cunks in json file using ffmpeg
    exec($cmd);
    return 1;
}
?>
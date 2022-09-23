<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Awesome Ringtone Maker BY Indal Singh</title>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <header>
        <h2>Ringtone Genarator</h2>
    </header>
    <main>
        <div class="uploaderBox">
            <div class="up-row">
                <div class="up-col selected" data-type="File">Upload</div>
                <div class="up-col" data-type="URL">URL</div>
            </div>
            <div class="up-contollers">
                <div id="inputFile">
                    <input type="file" accept="audio/*" class="sourceFile" id="ringtoneFile">
                    <label for="ringtoneFile">Select File..</label>
                </div>
                <div id="inputURL">
                    <input type="text" class="sourceFile" placeholder="Paste Your Audio Url....." class="sourceFile">
                </div>
            </div>
        </div>
    </main>

    <script src="js/main.js"></script>
</body>

</html>
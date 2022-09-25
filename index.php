<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Awesome Ringtone Maker BY Indal Singh</title>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
    <!-- wavesurfer.js regions -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/1.2.3/wavesurfer.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/1.2.3/plugin/wavesurfer.regions.min.js"></script>
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
                    <label for="ringtoneFile">Click Here To Select File..</label>
                </div>
                <div id="inputURL">
                    <input type="text" class="sourceFile" placeholder="Paste Your Audio Url....." class="sourceFile">
                </div>
            </div>
        </div>

        <div id="cutterBox">
            <div id="cutter">
                <div id="waveform"></div>
            </div>
            <form id="form" method="POST" action="app/download.php">
                <div id="contorls">
                </div>
            </form>
        </div>
    </main>

    <script src="js/main.js"></script>
</body>

</html>
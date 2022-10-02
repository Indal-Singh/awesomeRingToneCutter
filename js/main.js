let wavesurfer;
let isplaying = false;

const selectType = (e) => // function foe upload type upload file or URL
{

    $('.up-col').removeClass('selected');
    e.target.classList.add('selected');
    let type=e.target.getAttribute('data-type'); // get which button clicked by user
    // console.log(type);
    if(type=='File')
    {
        $('#inputURL').hide();  
        $('#inputFile').fadeIn();
    }
    else if(type=='URL')
    {
        $('#inputFile').hide();
        $('#inputURL').fadeIn();
    }
}

const togglePlay = () => // functioin for play pause
{
    if(isplaying)
    {
        wavesurfer.playPause();
        $('#btnPlay').html('Play');
        isplaying = false;
    }
    else
    {
        wavesurfer.playPause();
        $('#btnPlay').html('Pause');
        isplaying = true;
    }
}

const previewTone = (e) => // preview Selected Area
{
    let selectedId = e.getAttribute('data-id'); // selected id
    wavesurfer.regions.list[selectedId].play();
    $('#btnPlay').html('Pause');
    isplaying = true;
    // console.log(selectedId);
}

const createWaveForms = () =>  // function for creating waveforms
{
    if (wavesurfer !== undefined)
    wavesurfer.destroy();
    wavesurfer = WaveSurfer.create({
    container: "#waveform",
    waveColor: '#145ceb',
    progressColor: '#66c2ff',
    responsive: true,
    backend: 'MediaElement',
    // resize:true,
    // drag:true,
    cursorWidth: 1,
    height: 100
});

wavesurfer.on('ready', function() {
    if($('#ringtoneFile').prop('files')[0])
    readAndDecodeAudio();
    totalAudioDuration = wavesurfer.getDuration();
    let playPasue = document.createElement("button");
    let preview = document.createElement("button");
    let downloadBtn = document.createElement("button");
    playPasue.innerText="Play";
    playPasue.setAttribute('onclick','togglePlay()');
    playPasue.setAttribute('type','button');
    playPasue.setAttribute('id','btnPlay'); 
    preview.innerText="Preview";
    preview.setAttribute('type','button');
    preview.setAttribute('onclick','previewTone(this)');
    preview.setAttribute('id','btnPreview');
    downloadBtn.innerText="Download";
    ($('#ringtoneFile').prop('files')[0])?(downloadBtn.setAttribute('type','button')): (downloadBtn.setAttribute('type','submit')); // using teranry oprator
    downloadBtn.setAttribute('id','btnDownload'); 
    wavesurfer.enableDragSelection({}); // for enable selection area
    $('#contorls').html('');
    $('#contorls').append(playPasue);
    $('#contorls').append(preview);
    $('#contorls').append(downloadBtn);
});
wavesurfer.on('finish', function() {
    // console.log('indal');
    $('#btnPlay').html('Play');
    isplaying = false;
})

wavesurfer.on('region-updated', function(region) { // this is for selection only one area
    let regions = region.wavesurfer.regions.list;
    let keys = Object.keys(regions);
    if (keys.length > 1) {
        regions[keys[0]].remove();
    }
});

wavesurfer.on('region-created', function(newRegion) {
// console.log(newRegion.id);
$('#btnPreview').attr('data-id',newRegion.id) // seting selected area id   
});
wavesurfer.on('region-update-end', function(newRegion) {
    $('#form input').remove();
    let inputStart = document.createElement("input");
    let inputEnd = document.createElement("input");
    inputStart.setAttribute('hidden','hidden');
    inputStart.setAttribute('name','start');
    inputStart.setAttribute('value',Math.round(newRegion.start));
    inputEnd.setAttribute('hidden','hidden');
    inputEnd.setAttribute('name','end');
    inputEnd.setAttribute('value',Math.round(newRegion.end));
    $('#form').append(inputStart);
    $('#form').append(inputEnd);
    $('#btnDownload').show(); 
    if($('#ringtoneFile').prop('files')[0])
    $('#btnDownload').attr('onclick',`downloadTrack('${newRegion.id}')`);
    if($('#sourceFile').val()!=null)
    setInputName(); // call function for setting input file name
});
}

const setInputName = () => // function for setting name in form type input box
{
    let url = $('#sourceFile').val();
    let fileName = url.substring(url.lastIndexOf('/')+1);
    let inputFileName = document.createElement("input");
    inputFileName.setAttribute('hidden','hidden');
    inputFileName.setAttribute('name','fileName');
    inputFileName.setAttribute('value',fileName);
    $('#form').append(inputFileName);
}
const loadFile = (e) => // loading file
{
    if(e.target.files && e.target.id=='ringtoneFile')
    {
        $('#sourceFile').val('');
        let fileInput = e.target.files[0];
        $('label').html(fileInput.name);
        $('#cutterBox').show();
        // console.log(e.target.files);
        createWaveForms();
        wavesurfer.load(URL.createObjectURL(fileInput));
        
    }
    else if((e.target.value && e.target.id=='sourceFile'))
    {
        $('#loader').show();
        $('#ringtoneFile').val('');
        let audioUrl = e.target.value;
        $.ajax({
            url:'app/createJsonFile.php',
            type:'POST',
            data:{fileUrl:audioUrl},
            success:function(result)
            {
                // console.log(result);
                if(result!="")
                {
                    createWaveForms();
                    $('#cutterBox').show();
                    $('#cutterBox').append(`<audio src="" id="audio"></audio>`);
                    let mediaElt = document.querySelector('audio');
                    mediaElt.src=`files/convertedFiles/${result}.mp3`;
                    fetch(`files/jsonfiles/${result}.json`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("HTTP error " + response.status);
                        }
                        return response.json();
                    })
                    .then(peaks => {
                        // console.log(peaks);
                        // console.log('loaded peaks! sample_rate: ' + peaks.sample_rate);

                        // load peaks into wavesurfer.js
                        wavesurfer.load(mediaElt,peaks.data);
                    })
                    .catch((e) => {
                        console.error('error', e);
                    });

                    $('#loader').hide();
                }
             }
        })
    } 
}
function downloadTrack(regionId) {
    $('#btnDownload').text('Please Wait...');
	trimAudio(wavesurfer.regions.list[regionId]);
}
const readAudio = () => {	
    file = $('#ringtoneFile').prop('files')[0]; // geting audio file
	return new Promise((resolve, reject) => {
					let reader = new FileReader();
					reader.readAsArrayBuffer(file);

					//Resolve if audio gets loaded
					reader.onload = function() {
						console.log("Audio Loaded");
						resolve(reader);
					}
					reader.onerror = function(error){
						console.log("Error while reading audio");
						reject(error);
					}

					reader.onabort = function(abort){
						console.log("Aborted");
						console.log(abort);
						reject(abort);
					}

				})
}

async function readAndDecodeAudio() {
	let arrBuffer = null;

	//Read the original Audio
	await readAudio()
			.then((results) => {
				arrBuffer = results.result;
			})
			.catch((error) => {
				window.alert("Some Error occured");
				return;
			}); 

	//Decode the original Audio into audioBuffer
	await new AudioContext().decodeAudioData(arrBuffer)
				.then((res) => {
					window['audioBuffer'] = res;
				})
				.catch((err) => {
					window.alert("Can't decode Audio");
					return;
				});
}

const encodeAudioBufferLame = (audioData) =>
{
    return new Promise( (resolve, reject) => {
        let worker = new Worker('./js/worker.js');
        
        worker.onmessage = (event) => {
            if(event.data != null){
                resolve(event.data);
            }
            else{
                reject("Error");
            }
            let blob = new Blob(event.data.res, {type: 'audio/mp3'});
              processedAudio = new window.Audio();
              processedAudio.src = URL.createObjectURL(blob);
            //   console.log(blob);
        };

        worker.postMessage({'audioData': audioData});
    });		
}
async function trimAudio(region) {
	//Create empty buffer and then put the slice of audioBuffer i.e wanted part
	let startPoint = Math.floor((region.start*audioBuffer.length)/totalAudioDuration);
	let endPoint = Math.ceil((region.end*audioBuffer.length)/totalAudioDuration);
	let audioLength = endPoint - startPoint;

	let trimmedAudio = new AudioContext().createBuffer(
		audioBuffer.numberOfChannels,
		audioLength,
		audioBuffer.sampleRate
	);

	for(i=0;i<audioBuffer.numberOfChannels;i++){
		trimmedAudio.copyToChannel(audioBuffer.getChannelData(i).slice(startPoint,endPoint),i);
	}

	let audioData = {
		channels: Array.apply(null,{length: trimmedAudio.numberOfChannels})
					.map(function(currentElement, index) {
						return trimmedAudio.getChannelData(index);
					}),
		sampleRate: trimmedAudio.sampleRate,
    	length: trimmedAudio.length,
	}
	await encodeAudioBufferLame(audioData)
		.then((res) => {
			downloadAudio();
		})
		.catch((c) => {
			console.log(c);
		});
}


const downloadAudio = () => {
	let anchorAudio = document.createElement("a");
    anchorAudio.href = processedAudio.src;
	anchorAudio.download = `${$('#ringtoneFile').prop('files')[0].name.replace(".mp3", "")}-Ringtone.mp3`;
	anchorAudio.click();
    $('#btnDownload').text('Download');
}


$('.up-col').on('click',selectType); // calling on click
$('.sourceFile').on('change',loadFile); // calling on click
// $('.sourceFile').on('paste',loadFile); // calling on paste








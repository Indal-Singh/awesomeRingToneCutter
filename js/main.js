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
    downloadBtn.setAttribute('type','submit');
    downloadBtn.setAttribute('id','btnDownload'); 
    wavesurfer.enableDragSelection({}); // for enable selection area
    $('#contorls').html('');
    $('#contorls').append(playPasue);
    $('#contorls').append(preview);
    $('#contorls').append(downloadBtn);
});

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
    console.log(newRegion.start);
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
    setInputName(); // call function for setting input file name
});
}

const setInputName = () => // function for setting name in form type input box
{
    let fileName = $('#ringtoneFile').prop('files')[0].name;
    let inputFileName = document.createElement("input");
    inputFileName.setAttribute('hidden','hidden');
    inputFileName.setAttribute('name','fileName');
    inputFileName.setAttribute('value',fileName);
    $('#form').append(inputFileName);
}
const loadFile = (e) => // loading file
{
    if(e.target.files)
    {
        let fileInput = e.target.files[0];
        $('label').html(fileInput.name);
        $('#cutterBox').show();
        // console.log(e.target.files);
        createWaveForms();
        wavesurfer.load(URL.createObjectURL(fileInput));
        
    }

    
}
$('.up-col').on('click',selectType); // calling on click
$('.sourceFile').on('change',loadFile); // calling on click
$('.sourceFile').on('paste',loadFile); // calling on paste








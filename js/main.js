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
    height: 100,
    minLength: 0,
    maxLength: 168
});

wavesurfer.on('ready', function() {
    let playPasue = document.createElement("button");
    playPasue.innerText="Play";
    playPasue.setAttribute('onclick','togglePlay()');
    playPasue.setAttribute('id','btnPlay'); 
    wavesurfer.enableDragSelection({}); // for enable selection area
    $('#contorls').html('');
    $('#contorls').append(playPasue);
});

wavesurfer.on('region-updated', function(region) { // this is for selection only one area
    let regions = region.wavesurfer.regions.list;
    let keys = Object.keys(regions);
    if (keys.length > 1) {
        regions[keys[0]].remove();
    }
});

wavesurfer.on('region-created', function(newRegion) {

});
wavesurfer.on('region-update-end', function(newRegion) {
    console.log(wavesurfer.regions.list);
});
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








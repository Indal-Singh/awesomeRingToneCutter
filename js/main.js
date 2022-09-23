let selectType = (e) => // function foe upload type upload file or URL
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

let loadFile = (e) => // loading file
{
    if(e.target.files)
    {
        let fileInput = e.target.files[0];
        $('label').html(fileInput.name);
        // console.log(e.target.files);
    }
    
}

$('.up-col').on('click',selectType) // calling on click
$('.sourceFile').on('change',loadFile) // calling on click








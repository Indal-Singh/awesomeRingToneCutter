let selectType = (e) => // function foe upload type upload file or URL
{
    // console.log(e);
    $('.up-col').removeClass('selected');
    e.target.classList.add('selected');
}

let loadFile = () => // loading file
{
    // fileInput = 
}

$('.up-col').on('click',selectType) // calling on click


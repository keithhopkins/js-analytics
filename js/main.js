// add scripts
var secondsOnPage=0;
var timeInSection = [];
var secondsBeforeSignUp=0;


var pixelsScrolled=0;


$(document).on('ready', function() {
  window.scrollTo(0,0);

  var onPageInterval = setInterval(function(){secondsOnPage++;},1000);
  var signUpInterval = setInterval(function(){secondsBeforeSignUp++;},1000);

  //stops the signUpInterval when you click sign up
  $('#sign-up').on('click',function(event){
    clearInterval(signUpInterval);
  });

  //displays analytics data in a modal upon clicking analytics button
  $('#analytics').on('click',function(event){
    event.preventDefault();
    clearInterval(onPageInterval);
    clearInterval(signUpInterval);
    displayModal();
    
    //closes light box upon clicking 'close'
    $('#close').on('click',function(event){
      $('#modal').remove();
      $('.block-page').remove();
      if(secondsOnPage===secondsBeforeSignUp){
        signUpInterval=setInterval(function(){secondsBeforeSignUp++;},1000);
      }
      onPageInterval = setInterval(function(){secondsOnPage++;},1000);
    });

    $('section').on('mouseenter',function(){
      var index = $('section').index(this);
      console.log(index);
    });

  });

  //keeps track of the max distance scrolled
  $(document).scroll(function(){ 
    var scroll = $(document).scrollTop();
    if(scroll>pixelsScrolled){
      pixelsScrolled=scroll;
    }
  });
});

//calls all methods needed for creating the modal
function displayModal(){
  addBlockPage();
  addPopupBox();
  addModalStyles();
  displayAnalysis();
}

function addBlockPage(){
  var blockPage = $("<div class='block-page'></div>");
  blockPage.appendTo('body');
}

//styles modal and block page and close button
function addModalStyles(){
  var pageHeight = $(document).height();
  var pageWidth = $(document).width();

  $('#modal').css({
    'position':'fixed',
    'top':'30%',
    'left':'25%',
    'background-color':'white',
    'z-index':'11',
    'border':'solid'
  });

  $('.block-page').css({
    'position':'absolute',
    'top':'0',
    'left':'0',
    'background-color':'rgba(0,0,0,0.6)',
    'height':pageHeight,
    'width':pageWidth,
    'z-index':'10'
  });

  $('#close').css({
    'margin':'auto',
    'text-align':'center'
  });

}

//adds the modal to the DOM
function addPopupBox(){
  var popupBox = $('<div id="modal">');
  popupBox.append('<h3>Page Analysis</h3>');
  popupBox.append('<div id="percent-page"></div>');
  popupBox.append('<div id="total-distance"></div>');
  popupBox.append('<div id="sign-up-time"></div>');
  popupBox.append('<div id="page-time"></div>');
  popupBox.append('<div id="section-time"></div>');
  popupBox.append('<button id="close" class="btn">Close</button>');
  $('body').append(popupBox);
}

//displays analysis data to the modal
function displayAnalysis(){

  var percentScrolled = (pixelsScrolled + $(window).height()) / $(document).height()*100;

  $('#percent-page').append('User has seen '+percentScrolled+'% of the page.');
  $('#total-distance').append('User has scrolled '+pixelsScrolled+' pixels down the page');
  $('#sign-up-time').append('User spent '+secondsBeforeSignUp+' seconds on the page before pressing sign up button');
  $('#page-time').append('User has spent '+secondsOnPage+' seconds on the page');
  $('#section-time').append('Who knows how much time on each section?');
}







$(document).foundation();

$.fn.highlight = function() {
  var c = "#2BA6CB";
  var duration = 1500;
  var originalColor = this.css("color");
  this.stop().css("color", c).animate({
    color : originalColor
  }, duration);
};

function switchPage(page, event) {
  event.preventDefault();
  $("#main").slideUp(1500, function() {
    $(".page").hide();
    $("#" + page).show();
    $("#main").slideDown(500);
  });
  return false;
}

var wordList = ['be awesome with', 'develop with', 'learn from', 'drink beer with', 'help', 'create with', 'work with']


function updateWords() {
  var word = wordList.shift();
  $("#words:visible").text(word).highlight();
  wordList.push(word);
}

function generateOwl(event) {
  event.preventDefault();
  $('#owl-image').empty().text("Busy retrieving a fresh owl.");
  $('#owl-url').hide();

  var request = $.ajax("http://owlgen.herokuapp.com/random/100", {
    crossDomain : true,
    dataType : 'jsonp'
  });

  request.done(function(data) {
    $('#owl-image').empty().html(data.image.replace(/\\n/g, "\n"));
    $('#owl-url').show().attr('href', data.original);
  });
  request.fail(function(jqXHR, textStatus) {
    $('#owl-image').empty().text("An error has occurred while retrieving a fresh owl.");
    $('#owl-url').hide();
  });
}


$(document).ready(function() {
  $(".cv a").click(function(e) {
    switchPage('cv', e);
  });

  $(".back a").click(function(e) {
    switchPage('welcome', e);
  });

  $("a.owl").click(function(e) {
    switchPage('owl', e);
  });

  $("a.generate-owl").click(function(e) {
    generateOwl(e);
  });

  setInterval(updateWords, 3500)
});
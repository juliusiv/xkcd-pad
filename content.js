var SHIFT_PRESSED = false;

// Insert the alt-text into the DOM and hide it.
$("#comic img").each(function() {
  var alt_text = $(this).attr("title");
  if (alt_text != '') {
    $("<span id='alt-text-popup'>" + alt_text + "</span>").css({
      "position": "absolute",
      "left": "0",
      "text-align": "center",
      "color": "white",
      "background": "rgba(0, 0, 0, 0.85)",
      "padding-top": "1em",
      "padding-bottom": "1em",
      "width": "100%",
      "display": "none",
      "font-size": "1.2em"
    }).insertAfter(this);
  }
});

// Stop the page from scrolling down when Space is pressed.
window.onkeydown = function(e) { 
  return !(e.keyCode == 32);
};

$(document).keydown(function(e) {
  switch(e.keyCode) {
    // Shift
    case 16:
      SHIFT_PRESSED = true;
      break;
    // Space -> Show alt-text
    case 32:
      var is_visible = $("#alt-text-popup").css("display") !== "none";
      $("#alt-text-popup").css("display", is_visible ? "none" : "inline");
      break;
    // Left -> Go back one comic
    case 37:
      $("[rel='prev']")[0].click();
      break;
    // Right -> Go forward one comic
    case 39:
      $("[rel='next']")[0].click();
      break;
    // Comma (for pressing '<') -> Go to comic 1
    case 188:
      if(SHIFT_PRESSED)
        $("[href='/1/']")[0].click();
      break;
    // Period (for pressing '>') -> Go to the latest comic
    case 190:
      if(SHIFT_PRESSED)
        $("[href='/']")[0].click();
      break;
    // Forward slash (for pressing '?') -> Go to a random comic
    case 191:
      if(SHIFT_PRESSED)
        $("[href='//c.xkcd.com/random/comic/']")[0].click();
      break;
    // case
    default:
      // console.log(e);
  }
}).keyup(function(e) {
  if(e.keyCode === 16)
    SHIFT_PRESSED = false;
});
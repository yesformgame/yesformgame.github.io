var PI2 = Math.PI * 2;
var QPI = Math.PI * .25;

var msToTime = function(duration) {
    var milliseconds  = parseInt((duration%1000)/100)
        	, seconds = parseInt((duration/1000)%60)
        	, minutes = parseInt((duration/(1000*60))%60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds + "." + milliseconds;
}

function compareNumbers(a, b) {
  return a - b;
}
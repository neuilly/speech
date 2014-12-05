/*
function Main(){
	var speech = document.getElementById("speech");
	for (var i = 1; i<54;i++){
		var word = new Image();
		word.src = "images/page 1/sumner-"+i+".jpg";
		word.className = "words";
		word.id = "word_"+i;
		console.log(word);
		speech.appendChild(word);
	}
}
*/

var final_transcript = '';
var recognizing = false;
var ignore_onend;

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  start(event);

  recognition.onstart = function() {
    recognizing = true;
    //start_img.src = 'images/mic-animate.gif';
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      //start_img.src = 'images/mic.gif';
      console.log("no speech");
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      //start_img.src = 'images/mic.gif';
      ignore_onend = true;
      console.log("error audio-capture");
    }
    if (event.error == 'not-allowed') {
    	console.log("err not-allowed");
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    console.log("ended");
    //start_img.src = 'images/mic.gif';
    if (!final_transcript) {
      return;
    }
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    if (typeof(event.results) == 'undefined') {
      recognition.onend = null;
      recognition.stop();
      upgrade();
      return;
    }
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal){
      	Match(event.results[i][0].transcript);
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    //console.log(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    //if (final_transcript || interim_transcript) {
    //  showButtons('inline-block');
    //}
  };

}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function start(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = 'en';
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  //start_img.src = 'images/mic.gif';
  //showButtons('none');
}

var current_style;
function showButtons(style) {
  if (style == current_style) {
    return;
  }
  current_style = style;
}

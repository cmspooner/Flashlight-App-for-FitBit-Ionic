/*
 * Entry point for the watch app
 */
import document from "document";
import { display } from "display";
import { me } from "appbit";

let background = document.getElementById("background");
let sosText = document.getElementById("sosLabel");
sosText.text = "S.O.S."
let toggle = true;
let sos = false;
let timeInterval = "250"

let s = [1,0,1,0,1,0,0,0];
let o = [1,1,1,0,1,1,1,0,1,1,1,0,0,0];
let space = [0,0,0,0,0,0,0];

let sosMsg = s.concat(o).concat(s).concat(space);
console.log(sosMsg);

var wait = false;
var morse;


background.style.fill = "white";
display.brightnessOverride = 1.0;
display.autoOff = false;

background.onclick = function(evt) {
  console.log("Click");
  if (!sos){
    if (toggle){
      toggle = false;
      background.style.fill = "gray";
      display.brightnessOverride = undefined;
      display.autoOff = true;
    } else{
      toggle = true;
      background.style.fill = "white";
      display.brightnessOverride = 1.0;
      display.autoOff = false;
    }
    console.log("Toggle is " + toggle);
  }
}

document.onkeypress = function(evt) {
  if (evt.key == "up"){
    if (sos){
      sos = false;
    } else {
      sos = true;
    }
  }
}

function doMorse(code){
  let index = 0;
  morse = setInterval(function(){
    if (index < code.length){
      console.log(code[index])
      if (code[index] == 1)
        background.style.fill = "white";
      else
        background.style.fill = "black";
      index++;
    } else {
      console.log("Done!")
      clearInterval(morse);
      wait = false;
    }
  }, timeInterval);
}

function checkSOS(){
  if (sos){
    sosText.text = "";
    if (!wait) {
      console.log("Doing SOS");
      wait = true;
      doMorse(sosMsg);
    }
  } else {
    clearInterval(morse);
    wait = false;
    sosText.text = "S.O.S.";
    if (!toggle){
      toggle = false;
      background.style.fill = "gray";
      display.brightnessOverride = undefined;
      display.autoOff = true;
    } else{
      toggle = true;
      background.style.fill = "white";
      display.brightnessOverride = 1.0;
      display.autoOff = false;
    }
  }
}

setInterval(checkSOS, 10);
console.log("App Started");

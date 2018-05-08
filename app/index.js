/*
 * Entry point for the watch app
 */
import document from "document";
import { display } from "display";
import { me } from "appbit";

import * as messaging from "messaging";
import * as fs from "fs";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let background = document.getElementById("background");
let sosText = document.getElementById("sosLabel");

let toggle = true;
let sos = false;
let timeInterval = "250"
let sosEnable = false;

let s = [1,0,1,0,1,0,0,0];
let o = [1,1,1,0,1,1,1,0,1,1,1,0,0,0];
let space = [0,0,0,0,0,0,0];

let sosMsg = s.concat(o).concat(s).concat(space);
console.log(sosMsg);

var wait = false;
var morse;

let settings = loadSettings();

messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "sosToggle" && evt.data.newValue) {
    sosEnable = JSON.parse(evt.data.newValue);
    console.log("SOS is: " + sosEnable);
  }
}


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
  if (sosEnable){
    if (evt.key == "up"){
      if (sos){
        sos = false;
      } else {
        sos = true;
      }
    }
  } else {
    sos = false;
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
  if (sosEnable){
    console.log("SOS")
    sosText.text = "S.O.S."
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
  } else {
    console.log("NO SOS")
    sosText.text = ""
  }
  
}

applySettings(settings);

me.onunload = saveSettings;

function applySettings(settings){
  sosEnable = settings.sos
}

function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    // Defaults
    return {
      sos : 'false',
    }
  }
}

function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

setInterval(checkSOS, 10);
console.log("App Started");

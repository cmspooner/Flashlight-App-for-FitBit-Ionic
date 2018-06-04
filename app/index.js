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
let strobeText = document.getElementById("strobeLabel");

let toggle = true;
let sos = false;
let sosInterval = "250"
let sosEnable = false;
let strobe = false;
let strobeInterval = "100"
let strobeEnable = false;


let on = [1];
let off = [0];
let s = [1,0,1,0,1,0,0,0];
let o = [1,1,1,0,1,1,1,0,1,1,1,0,0,0];
let space = [0,0,0,0,0,0,0];

let sosMsg = s.concat(o).concat(s).concat(space);
console.log(sosMsg);

let strobeMsg = on.concat(off);

var wait = false;
var morse;
var mode;
var showButtons = true;
var controls = "Both"

let settings = loadSettings();

var y = 0;
var x = 0;
var swiptTheshold = 40

messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "sosToggle" && evt.data.newValue) {
    settings.sos = JSON.parse(evt.data.newValue);
    console.log("SOS is: " + settings.sos);
  }
  if (evt.data.key === "sosSlider" && evt.data.newValue) {
    settings.sosInterval = JSON.parse(evt.data.newValue);
    console.log("SOS Interval is: " + settings.sosInterval);
  }
  if (evt.data.key === "strobeToggle" && evt.data.newValue) {
    settings.strobe = JSON.parse(evt.data.newValue);
    console.log("Strobe is: " + settings.strobe);
  }
  if (evt.data.key === "strobeSlider" && evt.data.newValue) {
    settings.strobeInterval = JSON.parse(evt.data.newValue);
    console.log("Strobe Inteval is: " + settings.strobeInterval);
  }
  if (evt.data.key === "showButtons" && evt.data.newValue) {
    settings.showButtons = JSON.parse(evt.data.newValue);
    console.log("Show buttons is: " + settings.sos);
  }
  if (evt.data.key === "controls" && evt.data.newValue) {
    settings.controls = JSON.parse(evt.data.newValue).values[0].name;
    console.log("Controls are: " + settings.controls);
  }
  applySettings();
}

background.onmousedown = function(evt) {
  y = evt.screenY;
  x = evt.screenX;
}

background.onmouseup = function(evt) {
  if (controls == "Both" || controls == "Swipe"){
    console.log("m up")
    let yMove = evt.screenY-y;
    let xMove = evt.screenX-x;
    console.log(xMove + ", " + yMove);
    if (xMove< -swiptTheshold) {//swipe left  };
      console.log("Left");
      if (strobeEnable && !sos){
        if (strobe){
          strobe = false;
        } else {
          strobe = true;
        }
      } else {
        sos = false;
      }
    } else if (xMove> swiptTheshold) {//swipe right};
      console.log("Right");
      if (sosEnable && !strobe){
        if (sos){
          sos = false;
        } else {
          sos = true;
        }
      } else {
        strobe = false;
      }
    }
  }
}


background.style.fill = "white";
display.brightnessOverride = 1.0;
display.autoOff = false;

background.onclick = function(evt) {
  console.log("Click");
  if (!sos && !strobe){
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
  if (controls == "Both" || controls == "Buttons"){
    evt.preventDefault();
    if (sosEnable && !strobe){
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
    if (strobeEnable && !sos){
      if (evt.key == "down"){
        if (strobe){
          strobe = false;
        } else {
          strobe = true;
        }
      }
    } else {
      strobe = false;
    }
    if (evt.key == "back"){
      if (sos || strobe){
        sos = false;
        strobe = false;
      }
      else{
        me.exit();
      }
    }
  }
}

function doMorse(code, timeInterval){
  let index = 0;
  console.log(code + ", " + timeInterval)
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

function checkMode(){
  if (sosEnable && !sos && !strobe && showButtons && (controls == "Both" || controls == "Buttons"))
    sosText.text = "S.O.S."
  else
    sosText.text = ""
  
  if (strobeEnable && !strobe && !sos && showButtons&& (controls == "Both" || controls == "Buttons"))
    strobeText.text = "Strobe"
  else 
    strobeText.text = ""
  
  if (sos){
    if (!wait) {
      console.log("Doing SOS");
      wait = true;
      doMorse(sosMsg, sosInterval);
    }
  } else if (strobe){
    if (!wait) {
      console.log("Doing Strobe");
      wait = true;
      doMorse(strobeMsg, strobeInterval);
    }
  } else {
    clearInterval(morse);
    wait = false;
  }
  
  if (!sos && !strobe){
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

applySettings(settings);

me.onunload = saveSettings;

function applySettings(){
  sosEnable = settings.sos;
  sosInterval = settings.sosInterval;
  strobeEnable = settings.strobe;
  strobeInterval = settings.strobeInterval;
  showButtons = settings.showButtons;
  controls = settings.controls;
}
  

function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    // Defaults
    return {
      sos : 'false',
      sosInterval : "250",
      strobe : 'false',
      strobeInterval : "100",
      showButtons : 'true',
      controls : "Both"
    }
  }
}

function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}
clearInterval()
mode = setInterval(checkMode, 10);
console.log("App Started");

/*
 * Entry point for the watch app
 */
import document from "document";
import { display } from "display";

let background = document.getElementById("background");
let toggle = true;
background.style.fill = "white";
display.brightnessOverride = 1.0;
display.autoOff = false;

background.onclick = function(evt) {
  console.log("Click");
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

display.poke(); 

console.log("App Started");

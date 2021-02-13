import { Bubble } from "./Bubble";
import { initCanvas, resizeCanvas, setEventHandler } from "./Core";
import { Vector2 } from "./Util"; 
import "./ga";

export const body   = document.getElementsByTagName("body")[0];
export const div    = document.createElement("div");
export const canvas = document.createElement("canvas");
export const ctx    = canvas.getContext("2d");

export var Bubbles:Bubble[] = [];
export var isStopped:Boolean = false;
export var pointer:Vector2 = {x: -500, y: -500};
export var BUBBLE_MAXIMUM = -1;

export function setPointer(v:Vector2){
    pointer = v;
};
export function setIsStopped(v:Boolean){
    isStopped = v;
}

function main(){
    initCanvas();
    resizeCanvas(canvas);
    BUBBLE_MAXIMUM = Math.round(canvas.height * canvas.width / 15000);
    setEventHandler();
    frameUpdate();
}

// calls per frame updates
export function frameUpdate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    if(Bubbles.length < BUBBLE_MAXIMUM){
        Bubbles.push(new Bubble(canvas, ctx));
    }
    Bubbles.forEach(b => b.draw());
    Bubbles = Bubbles.filter(b => !b.getDestroyed());
    if(!isStopped){
        requestAnimationFrame(frameUpdate);
    }
};

main();
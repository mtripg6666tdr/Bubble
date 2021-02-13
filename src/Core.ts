import { Bubble } from "./Bubble";
import { canvas, ctx, Bubbles, div, body, setPointer, isStopped, setIsStopped, frameUpdate } from "./index";
import { getKeyCode } from "./Util";

export function initCanvas() {
    canvas.style.background = "linear-gradient(#3300ff, #1300af)";
    div.style.width = "100vw";
    div.style.height = "100vh";
    div.appendChild(canvas);
    body.style.margin = "0px";
    body.appendChild(div);

    const title = document.createElement("title");
    title.textContent = "Bubble/バブル - Html Canvasが織りなす幻想的な深海";
    document.getElementsByTagName("head")[0].appendChild(title);
}
export function setEventHandler(){
    canvas.addEventListener("pointermove", (e)=> {
        setPointer({
            x: e.clientX,
            y: e.clientY
        });
    });
    canvas.addEventListener("pointerleave", ()=> {
        setPointer({
            x: -500, y: -500
        });
    });
    canvas.addEventListener("click", (e) => {
        e.preventDefault();
        createCustomBubble(e.clientX, e.clientY)
    });
    window.addEventListener("keyup", (e) => {
        e.preventDefault();
        if(getKeyCode(e) == 32){
            if(isStopped){
                setIsStopped(false);
                frameUpdate();
            }else{
                setIsStopped(true);
            }
        }
        return false;
    });
    window.addEventListener("resize", () => {
        resizeCanvas(canvas);
    });
}
export function createCustomBubble(x:number, y:number) {
    const bubble = new Bubble(canvas, ctx, {x: x, y: y});
    bubble.draw();
    Bubbles.push(bubble);
};
export function resizeCanvas(canvas:HTMLCanvasElement) {
    canvas.height = div.offsetHeight;
    canvas.width = div.offsetWidth;
};
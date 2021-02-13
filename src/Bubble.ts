import { Vector2, BUBBLE_COLOR } from "./Util";
import { pointer } from "./index";

export class Bubble {
    constructor(canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D, position?:Vector2){
        this.canvas = canvas;
        this.ctx = ctx;
        if(position){
            this.position = position;
            this.current = 1;
            this.sizeInit();
        }
    }

    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    private current:number = 0;
    private destroyed:Boolean = false;
    position:Vector2 = {x: -1, y: -1};
    velocityY:number = 5;
    size:number = -1;

    // get if object is destroyed or not
    getDestroyed(){
        return this.destroyed;
    }

    // draw a bubble which this is
    draw(){
        // check if it is invalid or not
        if(this.current == 0){
            this.init();
        }else if(this.current < 0){
            return;
        }else if(this.position.y <= -(this.size * 2)){
            this.destroy();
            return;
        }
        this.current++;

        // calc the y direction moving distance
        var numY = this.velocityY + Math.round(Math.random() * 2) - 1;
        if(numY <= 5) numY = 5;
        else if(numY >= 30) numY = 30;
        this.velocityY = numY;
        // calc size factor
        var sizeK = 5.5 / Math.sqrt(this.size);
        if(sizeK < 0.02) sizeK = 0.02;
        else if(sizeK > 1.6) sizeK = 1.6;
        this.position.y -= numY * sizeK;

        // calc the x direction moving distance
        if(this.current % 5 == 0){
            const distance = Math.sqrt(Math.pow(pointer.x - this.position.x, 2) + Math.pow(pointer.y - this.position.y, 2));
            if(distance < 500 * sizeK){
                if(pointer.x - this.position.x > 0){
                    this.position.x -= Math.round(Math.random() * 2) * (500 * sizeK) / distance;
                }else{
                    this.position.x += Math.round(Math.random() * 2) * (500 * sizeK) / distance;
                }
            }else{
                this.position.x += Math.round(Math.random() * 5) -2;
            }
        }

        // draw
        this.ctx.beginPath();
        {
            this.ctx.globalCompositeOperation = "lighter";
            this.ctx.strokeStyle = this.ctx.fillStyle = BUBBLE_COLOR();
            this.ctx.arc(this.position.x, this.position.y, this.size, 0 , Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.closePath();
    }

    // destroy object instance
    destroy(){
        this.destroyed = true;
    }

    // initialize object
    private init(){
        // calc initial pos
        this.sizeInit();
        this.position.y = this.canvas.height + this.size * 2;
        this.position.x = Math.round(Math.random() * this.canvas.width);
    }

    private sizeInit(){
        this.size = Math.round(Math.random() * 50) + 4;
    }
}
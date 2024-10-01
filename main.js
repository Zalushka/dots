const
    canvas = document.querySelector('.canvas'),
    ctx = canvas.getContext('2d');

let 
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,

    circles = [];

    window.onresize = () =>{
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight;
    }

function back(){
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);
};

class Forms {
    constructor(){
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velX = Math.random()*(1*2)-1;
        this.velY = Math.random()*(1*2)-1;
    };

    drawCircle(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fillStyle = 'rgb(2, 172, 245)';
        ctx.fill();
    };

    circlePosition(){
        this.x + this.velX > w && this.velX > 0 || this.x + this.velX < 0 && this.velX < 0? this.velX*=-1 : this.velX;
        this.y + this.velY > h && this.velY > 0 || this.y + this.velY < 0 && this.velY < 0? this.velY*=-1 : this.velY;
        this.x += this.velX;
        this.y += this.velY;
    };
}


function circlesf(){
    for(var i in circles){
        circles[i].drawCircle();
        circles[i].circlePosition();
    }
};

function drawLines(){
    var x1,x2,y1,y2,len, op;
    for(var i in circles){
        for(var j in circles){

            x1 = circles[i].x;
            y1 = circles[i].y;
            x2 = circles[j].x;
            y2 = circles[j].y;

            len = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
            if(len < 150){
                op = 1-len/150;
                ctx.lineWidth = '0,';
                ctx.strokeStyle = 'rgba(2, 124, 176, ' + op + ')';
                ctx.beginPath();
                ctx.moveTo(x1,y1);
                ctx.lineTo(x2,y2);
                ctx.closePath();
                ctx.stroke();
            }

        }
    }

}

function loop(){
    back();
    circlesf();
    drawLines();
    requestAnimationFrame(loop);
};

function init(){
    for (let i = 0; i < 100; i++) {
        circles.push(new Forms)   
    }
    loop();
};

init()
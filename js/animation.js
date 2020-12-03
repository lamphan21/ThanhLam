const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particalesArray;

// get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80),
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// create particle
class Particle {
    constructor (x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // menthos to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#8c5523';
        ctx.fill();
    }

    // check praticle position, check mouse position, momve thw particle, draw the particle
    update() {
        // check if particle is stilll within canvas
        if (this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }

        // check collision detection - mouse position / particle posotion
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size){
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10
            }
            if (mouse.x > this.x && this.x > this.size * 10){
                this.x -= 10
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y += 10
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10
            }
        }
        // move particle
        this.x += this.directionX;
        this.y += this.directionY;
        // draw particle
        this.draw();

    }
}

// create particle array
let init = () => {
    particalesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#8c5523';

        particalesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// animate loop
let animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particalesArray.length; i++) {
        particalesArray[i].update();
    }
    connect();
}

// check if particles are close enough to draw line between them
let connect = () => {
    for (let a =  0; a < particalesArray.length; a++) {
        for (let b = a; b < particalesArray.length; b++){
            let distance = ((particalesArray[a].x - particalesArray[b].x)* (particalesArray[a].x - particalesArray[b].x)) + ((particalesArray[a].y - particalesArray[b].y) * (particalesArray[a].y - particalesArray[b].y));
            if (distance < (canvas.width/8) * (canvas.height/8)) {
                ctx.strokeStyle = 'rgba(140, 85, 71, 1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particalesArray[a].x, particalesArray[a].y);
                ctx.lineTo(particalesArray[b].x, particalesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// risize event
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height/80) * (canvas.width/80));
    init()
})

init();
animate();



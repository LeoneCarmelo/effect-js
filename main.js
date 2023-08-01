const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//measure buttons
const buttonElements = document.querySelectorAll('.button')
let buttonMeasurements = []
function measureButtons() {
    buttonMeasurements = []
        buttonElements.forEach(button => {
            buttonMeasurements.push(button.getBoundingClientRect())
        })
}
measureButtons()
console.log(buttonMeasurements);

//create particles
let particlesArray = []
class Particle {
    constructor(x, y, size){
        this.x = x
        this.y = y
        this.size = size //radius of circle
        this.weight = Math.random() * 1.5 + 1.5 //vertical speed
        this.directionX = Math.random() * 6 // horizonatal movement, wind
    }
    //this update() will calculate position for each particle for each frame 
    update() {
        // it will make particles rise up i a negative direction
        this.y -= this.weight 
        // it will make particles flow to the right
        this.x += this.directionX 
        // to avoid to get a size with 0 as value and an error and because it's not possible to drow something with no size we do this make the particle shrink down
        if (this.size >= 0.3) this.size -= 0.2  
    }
    draw() {
        //start to draw
        ctx.beginPath()
        //dran an circle
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        //choose color a color
        ctx.fillStyle = 'orange'
        //fill the path
        ctx.fill()
    }
}

//here we activate the single button on hover
let activeButton = -1
buttonElements.forEach(button => button.addEventListener('mouseenter', function(){
    //the data-number we put in html we call like this with js
    activeButton = button.dataset.number
}))
buttonElements.forEach(button => button.addEventListener('mouseleave', function(){
    //the data-number we put in html we call like this with js
    activeButton = -1
}))

function handleParticles(){
    for(let i = 0; i< particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
        if (particlesArray[i].size <= 1) {
            particlesArray.splice(i, 1)
            i--
        }
    }
}

function createParticle() {
    if (activeButton > -1) {
        let size = Math.random() * 40 + 10
        let x = Math.random() * (buttonMeasurements[activeButton].width - size * 2) + buttonMeasurements[activeButton].x + size
        let y = buttonMeasurements[activeButton].y + 40
        particlesArray.push(new Particle(x, y, size))
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    createParticle()
    handleParticles()
    requestAnimationFrame(animate)
}
animate()
//add responsive
window.addEventListener('resize', function() {
    canvas.width = this.window.innerWidth;
    canvas.height = window.innerHeight;
    measureButtons()
})
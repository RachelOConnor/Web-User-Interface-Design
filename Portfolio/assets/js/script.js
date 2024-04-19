function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// ANIMATION VARIABLES
const walkLoop = [0, 1, 2, 3, 4, 5, 6, 7];
const frameLimit = 7;

let currentLoopIndex = 0;
let frameCount = 0;

// FOOD VARIABLES
const foodWidth = 32;
const foodHeight = 32;

let randomX = Math.abs(Math.floor(Math.random() * 1099) - 50);
let randomY = Math.abs(Math.floor(Math.random() * 499) - 50);
let randomFoodX = Math.abs(Math.floor(Math.random() * 7));
let randomFoodXSelect = randomFoodX * 64;
let randomFoodY = Math.abs(Math.floor(Math.random() * 4));
let randomFoodYSelect = randomFoodY * 64;

// PLAYER VARIABLES
const scale = 1;                                            // increase size by 2
const width = 64;
const height = 64;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

let currentDirection = 0;
let speed = 6;
let alive;

// SCORE VARIABLES
let scoreCount = 0;
let score = document.getElementById("scoreCounter");
score.innerHTML = "Score: " + scoreCount;                   // Score starts at 0

let joystickEnabled = false;

// Function to disable NippleJS control
function disableNippleJS() {
    dynamic.destroy(); // Destroy NippleJS control
    console.log("disabled");
    joystickEnabled = false;
}

// Function to enable NippleJS control
function enableNippleJS() {
    dynamic = nipplejs.create({
        color: '#FFC369',
    });
    console.log("enabled");
    joystickEnabled = true;
}

if(joystickEnabled)
{
    var dynamic = nipplejs.create({
        color: '#FFC369',
    });
}

function start(){
        //start player
        alive = true;
        player.x = 0;
        player.y = 0;
        currentDirection = 0;
        scoreCount = 0;
        score.innerHTML = "Score: ";
    
        enableNippleJS();
    
        document.getElementById("startButton").style.visibility = "hidden";
}

function restart(){
    //reset player
    alive = true;
    player.x = 0;
    player.y = 0;
    currentDirection = 0;
    scoreCount = 0;
    score.innerHTML = "Score: ";

        enableNippleJS();

    restartButton.style.visibility = "hidden";
}

function randoPos(rangeX, rangeY, delta){
    this.x = Math.abs(Math.floor(Math.random() * rangeX) - delta);
    this.y = Math.abs(Math.floor(Math.random() * rangeY) - delta);
}

function newFood(){
    randomFoodX = Math.abs(Math.floor(Math.random() * 7));
    randomFoodXSelect = randomFoodX * 64;
    randomFoodY = Math.abs(Math.floor(Math.random() * 4));
    randomFoodYSelect = randomFoodY * 64;
    foodPosition = new randoPos(999, 299, 50);                      // Set max range - cannot exceed canvas
}

let character = new Image();                                        // assign an image to character
character.src = "assets/img/truck.png";
character.imageSmoothingEnabled = false;

let foodSprite = new Image();                                       // assign food spritesheet image
foodSprite.src = "assets/img/fruitnveg64wh37.png";

// GameObject holds object information
function GameObject(spritesheet, x, y, width, height) {
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mvmtDirection = "None";                                    // default direction = none
}

// Player
let player = new GameObject(character, 0, 0, 100, 100);             // set up player

// Food items
let foods = new GameObject(foodSprite, randomX, randomY, 100, 100); // set up food items

// The GamerInput holds the current action/input
function GamerInput(input) {
    this.action = input; // Hold input as  string
}

// Default GamerInput is None
let gamerInput = new GamerInput("None"); //No Input

function input(event) {
    if(alive === false)
    {
    if (event.type === "keyup") {
        switch (event.keyCode) {
            case 32:                                  // Space
                restart();
                break;
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        gamerInput = new GamerInput("None");
    }
}
}

function playerMovement(){
    if (alive === true)
{
    dynamic.on('added', function (evt, nipple) {
        //nipple.on('start move end dir plain', function (evt) {
        nipple.on('dir:up', function (evt, data) {
        //console.log("direction up");
        gamerInput = new GamerInput("Up");
        });
        nipple.on('dir:down', function (evt, data) {
        //console.log("direction down");
        gamerInput = new GamerInput("Down");
        });
        nipple.on('dir:left', function (evt, data) {
        //console.log("direction left");
        gamerInput = new GamerInput("Left");
        });
        nipple.on('dir:right', function (evt, data) {
        //console.log("direction right");
        gamerInput = new GamerInput("Right");
        });
        nipple.on('end', function (evt, data) {
        //console.log("mvmt stopped");
        gamerInput = new GamerInput("None");
        });
    });
    }
    // Check Player Input IF ALIVE
    if(alive === true)
    {
    if (gamerInput.action === "Up") {
        if (player.y < 0){

            alive = false;
        }
        else{
            player.y -= speed;                          // Move Up - 1
        }
        currentDirection = 3;

    } else if (gamerInput.action === "Down") {
        if (player.y + scaledHeight > canvas.height){

            alive = false;
        }
        else{
            player.y += speed;                          // Move Down - 0
        }
        currentDirection = 0;

    } else if (gamerInput.action === "Left") {
        if (player.x < 0){

            alive = false;
        }
        else{
            player.x -= speed;                          // Move Left - 2
        }
        currentDirection = 1;

    } else if (gamerInput.action === "Right") {
        if (player.x + scaledWidth > canvas.width){

            alive = false;
        }
        else{
            player.x += speed;                          // Move Right - 3
        }
        currentDirection = 2;

    } else if (gamerInput.action === "None") {          // If no movement, do nothing
    }
}
}

// Draw frames of food + person
function drawFrame(image, frameX, frameY, canvasX, canvasY) {
    context.drawImage(image,
                  frameX * width, frameY * height, width, height,
                    canvasX, canvasY, scaledWidth, scaledHeight);
}

// Animate player
function animate() {
    if(alive === true){
        if (gamerInput.action != "None"){
            frameCount++;
            
            if (frameCount >= frameLimit) {
                frameCount = 0;
                currentLoopIndex++;

                if (currentLoopIndex >= walkLoop.length) {
                    currentLoopIndex = 0;
                }
            }      
        }
        else{
            currentLoopIndex = 0;
        }
    }
    drawFrame(player.spritesheet, walkLoop[currentLoopIndex], currentDirection, player.x, player.y);
}

// Assign food a new pos
foodPosition = new randoPos(999, 299, 50);

function manageFood(){
    // Place food
    context.drawImage(foodSprite, randomFoodX*64, randomFoodY*64, 64, 64, foodPosition.x, foodPosition.y, foodWidth, foodHeight);
    
    // Collision check
    if (foodPosition.x < player.x + scaledWidth &&      // Left to right
        foodPosition.x + foodWidth > player.x &&        // Right to left
        foodPosition.y < player.y + scaledHeight &&     // Top to bottom
        foodPosition.y + foodHeight > player.y          // Bottom to top
        ){
        scoreCount ++;                                  // If collided, add to score
        newFood();                                      // Reassign pos of new food item
        localStorage.setItem("score", scoreCount);
        score.innerHTML = "Score: " + scoreCount;       // Update score variable
    }
    
}


function update() {
    // Check for player movement
    playerMovement();
    // checkDeath();
}

function checkDeath()
{
    if(alive === false){
        // context.clearRect(0,0, canvas.width, canvas.height);
        // context.fillStyle = "black";
        // context.fillRect(0,0, canvas.width, canvas.height);

        restartButton.style.visibility = "visible";
        // Disable joystick if it was enabled
        if (joystickEnabled && alive === false) {
            disableNippleJS();
            gamerInput.action = "None"
        }
    }
}

function drawBG(){
    if(!joystickEnabled)
    {
        context.clearRect(0,0, canvas.width, canvas.height);
        context.fillStyle = "rgb(255, 255, 255, 0.7)";
        context.fillRect(0,0, canvas.width, canvas.height);
    }
}

// Draw function - draw all items
function draw() {
    // back
    context.clearRect(0,0, canvas.width, canvas.height);
    context.fillStyle = "rgb(255, 255, 255, 0.7)";
    context.fillRect(0,0, canvas.width, canvas.height);

    manageFood();
    animate();
    checkDeath();
    drawBG();
    // front
}

// constantly update and draw
function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

// Browser Tag Animation
window.requestAnimationFrame(gameloop);

window.addEventListener('keyup', input);

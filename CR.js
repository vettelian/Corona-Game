function load_image(){
    enemy_image = new Image;
    enemy_image.src = "v1.png";
    
    player_image = new Image;
    player_image.src = "superhero.png";
    
    gem_image = new Image;
    gem_image.src = "gemm.png";
}



function init(){
    canvas = document.getElementById("mycanvas");
    W=700;
    H=400;
    canvas.width = W;
    canvas.height = H;
    game_over = false;
    
    pen = canvas.getContext('2d');
    console.log(pen);
    e1 = {
        x:150,
        y:50,
        w:60,
        h:60,
        speed:10,
    };
    e2 = {
        x:300,
        y:150,
        w:60,
        h:60,
        speed:20,
    };
    e3 = {
        x:450,
        y:20,
        w:60,
        h:60,
        speed:30,
    };
    enemy = [e1,e2,e3];
    
    player = {
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving: false,
        health:100,
    }
    
    gem = {
        x:W-100,
        y:H/2,
        w:60,
        h:60,
    }
    
    canvas.addEventListener("mousedown",function(){
        player.moving = true;
    });
    canvas.addEventListener("mouseup",function(){
       player.moving = false; 
    });

}
    
function isOverlap(rect1,rect2){
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
            return true;
    }
        
    return false;
}
    


function draw(){
     pen.clearRect(0,0,W,H)
     pen.drawImage(player_image,player.x,player.y,player.h,player.w)
     pen.drawImage(gem_image,gem.x,gem.y,gem.h,gem.w)
    
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    
    pen.fillStyle = "white";
    pen.fillText("SCORE"+player.health,10,10);
    
}

function update(){
   
    for(let i=0;i<enemy.length;i++){
        enemy[i].y +=enemy[i].speed;
        if(enemy[i].y>=H-enemy[i].h || enemy[i].y<0){
            enemy[i].speed *= -1;
        }
    }
    if(player.moving == true){
        player.x += player.speed;
        player.health += 20;
    }
    
    if(isOverlap(player,gem)){
        alert("You Won");
        game_over = true;
        return;
        
    }
    for(let i=0;i<enemy.length;i++){
        if(isOverlap(player,enemy[i])){
            player.health -=50;;
            if(player.health<=0){
                game_over = true;
            }
        }
    }
    
}

function gameloop(){
    if(game_over==true){
        clearInterval(f);
    }
    draw();
    update();
    
}


load_image();
init();

var f = setInterval(gameloop,100);
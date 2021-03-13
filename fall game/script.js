var charater = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];

function moveLeft(){
    var left = parseInt(window.getComputedStyle(charater) .getPropertyValue("left"));
    if(left>0){
    charater.style.left = left - 2 + "px";
    }
 }

 function moveright(){
     var left = parseInt(window.getComputedStyle(charater) .getPropertyValue("left"));
     if(left<380){
        charater.style.left = left + 2 + "px";
     }     
 }

 document.addEventListener("keydown", event => {
     if (both==0){
         both++;
         if(event.key==="ArrowLeft"){
             interval = setInterval(moveLeft, 1)
         }
         if(event.key==="ArrowRight"){
            interval = setInterval(moveright, 1)
         }
    }
 });

document.addEventListener("keyup", event =>{
     clearInterval(interval);
     both=0;
 });

 var blocks = setInterval(function(){

     if(counter>0){ 
        var blockLast = document.getElementById("block"+(counter-1))
        var holeLast = document.getElementById("hole"+(counter-1))
        var blockLasttop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLasttop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
     }
     if (counter==0 || blockLasttop<400){
         var block = document.createElement("div")
         var hole = document.createElement("div")
         block.setAttribute("class", "block");
         hole.setAttribute("class", "hole");
         block.setAttribute("id", "block"+counter);
         hole.setAttribute("id", "hole"+counter);
         block.style.top = blockLasttop + 100 + "px";
         hole.style.top = holeLasttop + 100 + "px";
         var random = Math.floor (Math.random() * 360);
         hole.style.left = random + "px";
         game.appendChild(block);
         game.appendChild(hole);
         currentBlocks.push(counter);
         counter++;
     }
     var characterTop = parseInt(window.getComputedStyle(charater).getPropertyValue("top"));
     var characterleft = parseInt(window.getComputedStyle(charater).getPropertyValue("left"));
     var drop = 0;
     if(characterTop <= 0){
         alert("Game over. Score: "+(counter-9));
         clearInterval(blocks);
         location.reload();
     }
     for(var i = 0; i < currentBlocks.length;i++){
         let current = currentBlocks[i];
         let iblock = document.getElementById("block"+current);
         let ihole = document.getElementById("hole"+current);
         let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
         iblock.style.top = iblockTop - top - 0,5 + "px";
         ihole.style.top = iblockTop - 0.5 + "px";
         if (iblockTop <-20){
             currentBlocks.shift();
             iblock.remove();
             ihole.remove(); 
         }
     if(iblockTop-20<characterTop && iblockTop>characterTop){
         drop++;
         if(iholeLeft<=characterleft && iholeleft+20>=characterleft){
             drop = 0;
         }
     }
    }
     if(drop==0){
          if(characterTop < 480){
         charater.style.top = characterTop + 2 + "px";
     }else{
         charater.style.top = characterTop - 0.5 + "px"
     }
    }
},1);
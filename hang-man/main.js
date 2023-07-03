let letters = "abcdefghijklmnopqrstuvwxyz";
let arrOfLetters = [...letters];
let lettersBox = document.querySelector(".box .letters");
let myCategory = document.querySelector(".content .category span");

arrOfLetters.forEach((letter) => {
    let letterspan = document.createElement("span");
    letterspan.className = "letterSpan";
    letterspan.innerHTML = letter.toUpperCase();
    lettersBox.appendChild(letterspan);
});

let myRequest = new XMLHttpRequest();
myRequest.open("GET", "./main.json");
myRequest.send();
myRequest.onreadystatechange = function () {
    if (myRequest.readyState === 4 && myRequest.status === 200){
        let data = JSON.parse(myRequest.responseText);
        let category = Object.keys(data[0]);
        let chosenCategory = category[Math.floor(Math.random() * category.length)];
        let chosenWord = Object.values(data[0][chosenCategory])[Math.floor(Math.random() * (Object.values(data[0][chosenCategory])).length)];
        let chosenkey = Object.keys(chosenWord);
        myCategory.innerHTML = chosenCategory;    

        let img  = Object.values(chosenWord);
        let image = document.querySelector('.image');
        image.innerHTML = `<img src="${img}">`

        let arrayFromChosenWord = Array.from(chosenkey[0]);

        let showLetters = document.querySelector(".show-letters");

        arrayFromChosenWord.forEach((letter) => {
            let blankLetter = document.createElement("div");
            blankLetter.className = "blankLetter";
            showLetters.appendChild(blankLetter);
        });
        console.log(arrayFromChosenWord);
        let myletter = document.querySelectorAll(".letterSpan");
        let attempts = 0;

        let myBlankLetter = document.querySelectorAll(".blankLetter");
        arrayFromChosenWord.forEach((l , index) => {
                if (l === " "){
                    myBlankLetter[index].innerHTML = "-";
                    arrayFromChosenWord[index] = " ";
                }
            });
        myletter.forEach((letter) => {
            letter.addEventListener("click", () =>{
                let status = false;
                letter.classList.add("clicked");
                
                arrayFromChosenWord.forEach((l , index) => {
                    if (letter.innerHTML.toLowerCase() === l.toLowerCase()){
                        myBlankLetter[index].innerHTML = l.toUpperCase();
                        document.querySelector(".success").play();
                        status = true;
                    }
                });
                if (status === false){
                    attempts++;
                    document.querySelector(".failed").play();
                    let myDraw = document.querySelector(".draw");
                    myDraw.classList.add(`wrong-${attempts}`);
                } 
                //**************** Failed ****************************

                if (attempts === 9){
                    let popup = document.querySelector(".popup");
                    popup.style.cssText = "display:flex;";
                    document.querySelector(".game-over").play();
                    lettersBox.style.pointerEvents = "none";
                    setTimeout(() => {
                        window.location.reload();
                    }, 4000);
                }
                //****************************************************
                for (let i = 0 ; i < arrayFromChosenWord.length ; i++){
                    if(arrayFromChosenWord[i].toLowerCase() === letter.innerHTML.toLowerCase()){
                        arrayFromChosenWord[i] = " ";
                    }
                }
                let countOfEmptyString = 0;
                arrayFromChosenWord.forEach(function(l){
                    if (l === " "){
                        countOfEmptyString++;
                    }
                })
                // ******************* success ***********************
                    if (arrayFromChosenWord.length === countOfEmptyString){
                    document.querySelector(".success").pause();
                    document.querySelector(".win").play();
                    lettersBox.style.pointerEvents = "none";
                    setTimeout(function() {
                        document.querySelector(".fireworks").play();
                    },400);
                    setTimeout(function() {
                        document.querySelector(".fireworks").play();
                    },2500);
                    setTimeout(() => {
                        window.location.reload();
                    }, 4500);
                //****************************************************

                // ******************* fireworks *********************
                    const max_fireworks = 5,
                    max_sparks = 100;
                    let canvas = document.getElementById('myCanvas');
                    let context = canvas.getContext('2d');
                    let fireworks = [];
                    
                    canvas.style.zIndex = 15;
                    canvas.style.position = 'absolute';
                    for (let i = 0; i < max_fireworks; i++) {
                        let firework = {
                        sparks: []
                    };
                    for (let n = 0; n < max_sparks; n++) {
                        let spark = {
                            vx: Math.random() * 5 + .5,
                            vy: Math.random() * 5 + .5,
                            weight: Math.random() * .3 + .03,
                            red: Math.floor(Math.random() * 28),
                            green: Math.floor(Math.random() * 19),
                            blue: Math.floor(Math.random() * 3)
                        };
                        if (Math.random() > .5) spark.vx = -spark.vx;
                        if (Math.random() > .5) spark.vy = -spark.vy;
                        firework.sparks.push(spark);
                    }
                    fireworks.push(firework);
                    resetFirework(firework);
                    }
                    window.requestAnimationFrame(explode);
                    
                    function resetFirework(firework) {
                        firework.x = Math.floor(Math.random() * canvas.width);
                        firework.y = canvas.height;
                        firework.age = 0;
                        firework.phase = 'fly';
                    }
                    
                    function explode() {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    fireworks.forEach((firework,index) => {
                        if (firework.phase == 'explode') {
                            firework.sparks.forEach((spark) => {
                            for (let i = 0; i < 10; i++) {
                            let trailAge = firework.age + i;
                            let x = firework.x + spark.vx * trailAge;
                            let y = firework.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
                            let fade = i * 20 - firework.age * 2;
                            let r = Math.floor(spark.red * fade);
                            let g = Math.floor(spark.green * fade);
                            let b = Math.floor(spark.blue * fade);
                            context.beginPath();
                            context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
                            context.rect(x, y, 4, 4);
                            context.fill();
                            }
                        });
                        firework.age++;
                        if (firework.age > 100 && Math.random() < .05) {
                            resetFirework(firework);
                        }
                        } else {
                        firework.y = firework.y - 10;
                        for (let spark = 0; spark < 15; spark++) {
                            context.beginPath();
                            context.fillStyle = 'rgba(' + index * 50 + ',' + spark * 17 + ',0,1)';
                            context.rect(firework.x + Math.random() * spark - spark / 2, firework.y + spark * 4, 4, 4);
                            context.fill();
                        }
                        if (Math.random() < .001 || firework.y < 200) firework.phase = 'explode';
                        }
                    });
                    window.requestAnimationFrame(explode);
                    }
                }
                // *********************************
                if(letter.classList.contains("clicked")){
                    letter.innerHTML = `<i class="fa-sharp fa-solid fa-skull-crossbones"></i>`;
                    letter.style.fontFamily = "FontAwesome";
                    letter.style.backgroundColor = "#ccc";
                    letter.style.color = "red";
                    letter.style.cursor = "not-allowed";
                    letter.style.pointerEvents = "none";
                }           
            });
        });
    }
}



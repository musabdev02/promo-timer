// DOM elements
const time = document.querySelector(".time h1");
const play = document.querySelector(".controls .play_pause");
const nextMode = document.querySelector(".controls .next");
let mode_list = document.querySelector(".mode_list span");
const body = document.body;
const modeTag = document.querySelector(".mode");
const modeIcon = document.querySelector(".mode img");
const modeTitle = document.querySelector(".mode h4");
// popup
const openPopup = document.querySelector(".openPopup");

// sounds


// others
const themes = ["red", "blue", "green"];
const modes = ["focus", "shortbreak", "longbreak"];
const modeImg = ["assets/focus.svg", "assets/shortbreak.svg", "assets/longbreak.svg"];
let currentThemeIndex = 0;
// modes
const modeObj = [
    {foucsMode: 25,},
    {shortBreak: 1},
    {longBreak: 40}
];
let selectedTime = modeObj[0].foucsMode;
let changeIcon = play.firstChild.firstChild;
let counter = null;
let calseconds = 0;
let isPaused = false;
play.addEventListener("click", ()=>{

    if(changeIcon.src.endsWith("assets/play_arrow.svg")){
        changeIcon.src = "assets/pause.svg";
        time.style.fontWeight = "700";
        startTimer();
    }else{
        changeIcon.src = "assets/play_arrow.svg";
        time.style.fontWeight = "400";
        clickAudio();
        pauseTimer();
    };
});

let convertNum = Number(mode_list.innerHTML);
nextMode.addEventListener("click", ()=>{
    if(changeIcon.src.endsWith("assets/pause.svg")){changeIcon.src = "assets/play_arrow.svg";}
    clearInterval(counter);
    isPaused = false
    calseconds = 0;
    clickAudio();
    if(convertNum < 3){convertNum++;mode_list.innerHTML = convertNum;}
    else if(convertNum > 0){convertNum = 1;mode_list.innerHTML = convertNum;}; 

    currentThemeIndex = (currentThemeIndex + 1) % themes.length;

    const nextTheme = themes[currentThemeIndex];
    modeTitle.textContent = modes[currentThemeIndex];
    modeIcon.src = `${modeImg[currentThemeIndex]}`;
    const firstKey = Object.keys(modeObj[currentThemeIndex])[0];
    selectedTime = modeObj[currentThemeIndex][firstKey];
    document.body.setAttribute("data-theme", nextTheme);
    if(selectedTime < 10){
        time.innerHTML = `0${selectedTime}<br>00`;
    }
    else{
    time.innerHTML = `${selectedTime}<br>00`;
    }
    
});

const startTimer = ()=>{
    clickAudio();
    if (!isPaused) {
        calseconds = selectedTime * 60;
    }
    counter = setInterval(()=>{
        if(calseconds > 0){
            calseconds--;
            updateDisplay();
        }else{
            clearInterval(counter);
            counter = null;
            endAudio();
            console.log(isPaused)
        }
    }, 1000);

};


const updateDisplay = ()=>{
    let minutes = Math.floor(calseconds / 60);
    let seconds = calseconds % 60;
    if(minutes < 10){
        time.innerHTML = `0${minutes}<br>${seconds}`;
    }
    else{
        time.innerHTML = `${minutes}<br>${seconds}`;
    }
};

const pauseTimer = ()=>{
    clearInterval(counter);
    isPaused = true;
};

const clickAudio = () =>{
    let tick = new Audio("sounds/click.mp3").play();
};
const endAudio = () =>{
    let endAudio = new Audio("sounds/end.wav").play();
};
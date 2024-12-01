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
let counter;
// sounds
let tick = new Audio("sounds/click.mp3");

// others
const themes = ["red", "blue", "green"];
const modes = ["focus", "shortbreak", "longbreak"];
const modeImg = ["assets/focus.svg", "assets/shortbreak.svg", "assets/longbreak.svg"];
let currentThemeIndex = 0;
// modes
const modeObj = [
    {foucsMode: 25,},
    {shortBreak: 1},
    {longBreak: 70}
];
let selectedTime = modeObj[0].foucsMode;
play.addEventListener("click", ()=>{
    let changeIcon = play.firstChild.firstChild;

    if(changeIcon.src.endsWith("assets/play_arrow.svg")){
        changeIcon.src = "assets/pause.svg";
        time.style.fontWeight = "700";
        startTimer();
    }else{
        changeIcon.src = "assets/play_arrow.svg";
        time.style.fontWeight = "400";
        tick.play();
        clearInterval(counter)
    };
});

let convertNum = Number(mode_list.innerHTML);
nextMode.addEventListener("click", ()=>{
    clearInterval(counter)
    tick.play();
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
    tick.play();
    let seconds = selectedTime * 60;
   counter = setInterval(()=>{
        seconds--;
        let minutes = Math.floor(seconds / 60);
        let finalSeconds = seconds % 60;
        if(minutes < 10){
            time.innerHTML = `0${minutes}<br>${finalSeconds}`;
        }
        else{
        time.innerHTML = `${minutes}<br>${finalSeconds}`;
        }
        
    }, 1000)
    if(seconds === 0){
        clearInterval(counter);
    }
};

openPopup.addEventListener("click", ()=>{

});
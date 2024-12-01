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
let tick = new Audio("sounds/click.mp3");

// others
const themes = ["red", "blue", "green"];
const modes = ["focus", "shortbreak", "longbreak"];
const modeImg = ["assets/focus.svg", "assets/shortbreak.svg", "assets/longbreak.svg"];
let currentThemeIndex = 0;
// modes
const modeObj = [
    {foucsMode: 25,},
    {shortBreak: 5},
    {longBreak: 40}
];
let selectedTime = modeObj[currentThemeIndex];
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
    };
});

let convertNum = Number(mode_list.innerHTML);
nextMode.addEventListener("click", ()=>{
    tick.play();
    if(convertNum < 3){
        convertNum++; 
        mode_list.innerHTML = convertNum;
    }
    else if(convertNum > 0){convertNum = 1;mode_list.innerHTML = convertNum;}; 

    currentThemeIndex = (currentThemeIndex + 1) % themes.length;

    const nextTheme = themes[currentThemeIndex];
    modeTitle.textContent = modes[currentThemeIndex];
    modeIcon.src = `${modeImg[currentThemeIndex]}`;
    selectedTime = modeObj[currentThemeIndex];
    document.body.setAttribute("data-theme", nextTheme);
});

const startTimer = ()=>{
    tick.play();
    console.log(selectedTime.foucsMode);
};

openPopup.addEventListener("click", ()=>{

});
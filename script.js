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
const closePopup = document.querySelector(".closePopup");
const setting = document.querySelector(".settings");
let usrFocus = document.getElementById("focusMode");
let usrShort = document.getElementById("shortBreak");
let usrLong = document.getElementById("longBreak");
const popBtn = document.querySelector(".popup button");
const lofi = document.getElementById("lofi");

// sounds
let lofiAudio = new Audio("sounds/lofi.mp3");

// others
const themes = ["red", "blue", "green"];
const modes = ["focus", "shortbreak", "longbreak"];
const modeImg = ["assets/focus.svg", "assets/shortbreak.svg", "assets/longbreak.svg"];
let currentThemeIndex = 0;
// modes
const modeObj = [
    {focusMode: 25},
    {shortBreak: 1},
    {longBreak: 40}
];
let selectedTime = modeObj[0].foucsMode;
let changeIcon = play.firstChild.firstChild;
let counter = null;
let calseconds = 0;
let isPaused = false;
let convertNum = Number(mode_list.innerHTML);

// change icons play and pause resume timer
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

// changing the mode
nextMode.addEventListener("click", ()=>{
    clickAudio();
    if(changeIcon.src.endsWith("assets/pause.svg")){changeIcon.src = "assets/play_arrow.svg";}
    clearInterval(counter);
    isPaused = false
    calseconds = 0;
    if(convertNum < 3){convertNum++;mode_list.innerHTML = convertNum;}
    else if(convertNum > 0){convertNum = 1;mode_list.innerHTML = convertNum;}; 
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    changeMode();
});

// countdown funcationlity 
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
            changeIcon.src = "assets/play_arrow.svg";
        }
    }, 1000);

};

// display the timer on document
const updateDisplay = ()=>{
    let minutes = Math.floor(calseconds / 60);
    let seconds = calseconds % 60;
    time.innerHTML = `${minutes.toString().padStart(2, 0)}<br>${seconds.toString().padStart(2, 0)}`;
    document.title = `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
};
// pause the timer
const pauseTimer = ()=>{
    clearInterval(counter);
    isPaused = true;
};
// when clicks on button
const clickAudio = () =>{
    let tick = new Audio("sounds/click.mp3").play();
};
// when the timer end
const endAudio = () =>{
    let endAudio = new Audio("sounds/end.wav").play();
};

// mode & theme
const changeMode = ()=>{
    const firstKey = Object.keys(modeObj[currentThemeIndex])[0];
    selectedTime = modeObj[currentThemeIndex][firstKey];
    time.innerHTML = `${selectedTime.toString().padStart(2, 0)}<br>00`;
    const nextTheme = themes[currentThemeIndex];
    modeTitle.textContent = modes[currentThemeIndex];
    modeIcon.src = `${modeImg[currentThemeIndex]}`;
    document.body.setAttribute("data-theme", nextTheme);
};

// popup
openPopup.addEventListener("click", ()=>{
    setting.style.transform = "translateY(0px)"
});
const popUpclose = () =>{
   setting.style.transform = "translateY(1000px)"
}
closePopup.addEventListener("click", popUpclose);


popBtn.addEventListener("click", () => {
    const limits = [
        { input: usrFocus, max: 60, defaultValue: 25, property: "focusMode", modeIndex: 0 },
        { input: usrShort, max: 30, defaultValue: 5, property: "shortBreak", modeIndex: 1 },
        { input: usrLong, max: 120, defaultValue: 40, property: "longBreak", modeIndex: 2 }
    ];

    limits.forEach(({ input, max, defaultValue, property, modeIndex }) => {
        const userValue = Number(input.value);
        if (userValue > max) {
            input.value = defaultValue;
            window.alert(`${property} limit is ${max}`);
        } else {
            modeObj[modeIndex][property] = userValue;
            changeMode();
        };
    });
    
    if(lofi.checked){
        lofiAudio.play();
    }
    else{
        lofiAudio.pause();
        lofiAudio.currentTime = 0;
    }
    popUpclose();
});

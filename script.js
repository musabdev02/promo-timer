// DOM Elements
const timerDisplay = document.querySelector(".time h1");
const playPauseBtn = document.querySelector(".controls .play_pause");
const nextModeBtn = document.querySelector(".controls .next");
const modeIndicator = document.querySelector(".mode_list span");
const bodyElement = document.body;
const modeSection = document.querySelector(".mode");
const modeIcon = modeSection.querySelector("img");
const modeTitle = modeSection.querySelector("h4");
const resetButton = document.querySelector(".controls .restart");

// Popup Elements
const popupTrigger = document.querySelector(".openPopup");
const popupClose = document.querySelector(".closePopup");
const settingsPopup = document.querySelector(".settings");
const focusInput = document.getElementById("focusMode");
const shortBreakInput = document.getElementById("shortBreak");
const longBreakInput = document.getElementById("longBreak");
const popupSaveBtn = document.querySelector(".popup button");
const lofiCheckbox = document.getElementById("lofi");

// Sounds
const lofiAudio = new Audio("sounds/lofi.mp3");
const clickSound = new Audio("sounds/click.mp3");
const endSound = new Audio("sounds/end.wav");

// Themes, Modes, and Settings
const themes = ["red", "blue", "green"];
const modes = ["Focus", "Short Break", "Long Break"];
const modeIcons = ["assets/focus.svg", "assets/shortbreak.svg", "assets/longbreak.svg"];
const modeSettings = [
    { name: "Focus", duration: 25 },
    { name: "Short Break", duration: 5 },
    { name: "Long Break", duration: 40 }
];

let currentModeIndex = 0;
let timerSeconds = modeSettings[0].duration * 60;
let timerInterval = null;
let isPaused = false;

// Update UI Elements
const updateTimerDisplay = () => {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    timerDisplay.innerHTML = `${minutes.toString().padStart(2, '0')}<br>${seconds.toString().padStart(2, '0')}`;
    document.title = `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const updateMode = () => {
    const mode = modeSettings[currentModeIndex];
    timerSeconds = mode.duration * 60;
    modeTitle.textContent = mode.name;
    modeIcon.src = modeIcons[currentModeIndex];
    bodyElement.setAttribute("data-theme", themes[currentModeIndex]);
    updateTimerDisplay();
};

// Timer Controls
const startTimer = () => {
    clickSound.play();
    if (!isPaused) timerSeconds = modeSettings[currentModeIndex].duration * 60;

    timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
            timerSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            endSound.play();
            resetPlayPauseIcon();
        }
    }, 1000);
};

const pauseTimer = () => {
    clearInterval(timerInterval);
    isPaused = true;
};

const togglePlayPause = () => {
    const playPauseIcon = playPauseBtn.querySelector("img");
    if (playPauseIcon.src.endsWith("assets/play_arrow.svg")) {
        playPauseIcon.src = "assets/pause.svg";
        timerDisplay.style.fontWeight = "700"
        startTimer();
    } else {
        playPauseIcon.src = "assets/play_arrow.svg";
        timerDisplay.style.fontWeight = "inherit"
        pauseTimer();
    }
};

const resetPlayPauseIcon = () => {
    playPauseBtn.querySelector("img").src = "assets/play_arrow.svg";
};

// Change Mode
const changeMode = () => {
    clickSound.play();
    currentModeIndex = (currentModeIndex + 1) % modeSettings.length;
    updateMode();
    resetPlayPauseIcon();
    clearInterval(timerInterval);
    isPaused = false;
};

// Popup Controls
const openSettings = () => settingsPopup.style.transform = "translateY(0)";
const closeSettings = () => settingsPopup.style.transform = "translateY(1000px)";

const saveSettings = () => {
    const userInputs = [
        { input: focusInput, max: 60, default: 25, modeIndex: 0 },
        { input: shortBreakInput, max: 30, default: 5, modeIndex: 1 },
        { input: longBreakInput, max: 120, default: 40, modeIndex: 2 }
    ];

    userInputs.forEach(({ input, max, default: defaultVal, modeIndex }) => {
        const value = Number(input.value);
        if (value > max) {
            alert(`${modeSettings[modeIndex].name} limit is ${max}`);
            input.value = defaultVal;
        } else {
            modeSettings[modeIndex].duration = value;
        }
    });

    if (lofiCheckbox.checked) {
        lofiAudio.play();
    } else {
        lofiAudio.pause();
        lofiAudio.currentTime = 0;
    }

    updateMode();
    closeSettings();
};

// Event Listeners
playPauseBtn.addEventListener("click", togglePlayPause);
nextModeBtn.addEventListener("click", changeMode);
resetButton.addEventListener("click", () => {
    currentModeIndex = 0;
    updateMode();
    resetPlayPauseIcon();
    clearInterval(timerInterval);
    clickSound.play();
});

popupTrigger.addEventListener("click", openSettings);
popupClose.addEventListener("click", closeSettings);
popupSaveBtn.addEventListener("click", saveSettings);

// Initialize
updateMode();

const SONG_LIST = [
  {
    songName: "Dark Aria",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1740240414/Dark_Aria_from_Solo_Leveling_1_dxyhls.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1740241405/Dark_Aria_flcccm.png",
  },
  {
    songName: "Look At Me",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1740240404/LOOK_AT_ME_xqi77s.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1740241406/LookAt_Me_yltxbv.png",
  },
  {
    songName: "Itachi Uchiha",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1740849554/spotidownloader.com_-_Itachi_Uchiha_-_GAMIIX_h6l7bp.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1740849722/Screenshot_2025-03-01_224845_umbfxz.png",
  },
  {
    songName: "Drums Of Liberation",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1740240411/One_Piece_Drums_of_Liberation_x_Overtaken_EPIC_COVER_GEAR_5_bkfwl1.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1740241407/One_Piece_trbzu1.png",
  },
  {
    songName: "Slava Funk",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1740240408/SLAVA_FUNK_ivk81a.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1740241405/Slava_Funk_jbichb.png",
  },
  {
    songName: "No Fear",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1740240397/NO_FEAR_ekssxs.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1740241410/No_Fear_wwwz1y.png",
  },
  {
    songName: "Shape of You",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1740240410/Shape_of_You_chfqak.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1740241407/Shape_of_U_lrisr7.png",
  },
  {
    songName: "Die with a Smile",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1740240418/Die_With_A_Smile_xyjmxf.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1740241404/Die_with_a_Smile_dabz0z.png",
  },
];
let updateTrack;
let isMixBtnClick = false;
let isRepeatBtnClick = false;
let isAddBtnClick = false;
let mixModeTxt = "Mix all";
let repeatModeTxt = "Repeat";
let arrayCount = 0;
let changeWarningText = document.getElementById("change-warning");
const music = document.getElementById("music");
let currentMusic = document.getElementById("currentMusic");
let volumeSlider = document.getElementById("volume-slider");
let trackSlider = document.getElementById("track-slider");
const albumImg = document.getElementById("album-img");
const currentSongName = document.getElementById("current-song-name");
const backgroundImg = document.getElementById("container");
const play = document.getElementById("play");
const rightBtn = document.getElementById("right");
const leftBtn = document.getElementById("left");
const mixBtn = document.getElementById("mix");
const repeatBtn = document.getElementById("repeat");
const menuIcon = document.getElementById("menu-icon");
const menuCancelIcon = document.getElementById("cancel-icon")
const menu = document.querySelector("nav");
const addBtn = document.getElementById("add-icon");
const newSongContainer = document.getElementById("new-song-container");

// EVENT LISTENER

rightBtn.addEventListener("click", changeSong);
leftBtn.addEventListener("click", changeSong);
play.addEventListener("click", audioPlay);
volumeSlider.addEventListener("change", changeVolume);
trackSlider.addEventListener("change", changeTrack);
trackSlider.addEventListener("change", seekUpdate);
music.addEventListener("ended", autoSongChange);
mixBtn.addEventListener("click", mixModeActive);
repeatBtn.addEventListener("click", repeatModeActive);
menuIcon.addEventListener("click", openMenu);
menuCancelIcon.addEventListener("click", cancelMenu)
addBtn.addEventListener("click", newSongPage);

// FUNCTION

function changeSong(e) {
  let way = e.target;
  mixSongs();
  swapBtn(way);
  changeSwapStyle();
  if(play.textContent === "❚ ❚"){
    music.play()
  }
}

function mixSongs() {
  if (isMixBtnClick) {
    arrayCount = Math.floor(Math.random() * SONG_LIST.length);
  }
}

function swapBtn(way) {
  if (way === rightBtn) {
    arrayCount++;
  } else if (way === leftBtn) {
    arrayCount--;
  }
  disableSwap();
}

function disableSwap() {
  if (arrayCount >= SONG_LIST.length) {
    return (arrayCount = 0);
  } else if (arrayCount < 0) {
    return (arrayCount = Number(`${SONG_LIST.length - 1}`));
  }
}

function changeSwapStyle() {
  albumImg.style.background = `url(${SONG_LIST[arrayCount].album}) no-repeat  center center`;
  albumImg.style.backgroundSize = "cover";
  backgroundImg.style.background = `url(${SONG_LIST[arrayCount].background}) no-repeat  center center`;
  backgroundImg.style.backgroundSize = "cover";
  currentSongName.innerHTML = `${SONG_LIST[arrayCount].songName}`;
  music.src = `${SONG_LIST[arrayCount].music}`;
}

function audioPlay() {
  const icon = music.paused ? "❚ ❚" : "►";
  play.textContent = icon;
  music.paused ? music.play() : music.pause();
  updateTrack = setInterval(seekUpdate, 1000);
}

function changeVolume() {
  music.volume = volumeSlider.value / 100;
}
function changeTrack() {
  time = music.duration * (trackSlider.value / 100);
  music.currentTime = time;
}

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(music.duration)) {
    seekPosition = music.currentTime * (100 / music.duration);
    trackSlider.value = seekPosition;
  }
}

function autoSongChange() {
  mixModeSongChange();
  repeatModeSongChange();
  resetAutoChangeIfEnd();
  updateTrack = setInterval(seekUpdate, 1000);
  if(play.textContent === "❚ ❚"){
    music.play()
  }
}

function mixModeSongChange() {
  if (isMixBtnClick) {
    mixSongs();
  } else if (isRepeatBtnClick) {
    return;
  } else {
    arrayCount++;
  }
}

function repeatModeSongChange() {
  isRepeatBtnClick ? clearInterval(updateTrack) : changeSwapStyle();
}

function resetAutoChangeIfEnd() {
  if (arrayCount >= SONG_LIST.length - 1) {
    arrayCount = 0;
  }
}

function mixModeActive() {
  if (isRepeatBtnClick) {
    return;
  } else if (!isMixBtnClick) {
    ifModeActive(mixBtn, mixModeTxt);
    isMixBtnClick = true;
  } else if (isMixBtnClick) {
    mixBtn.style.transform = "scale(1)";
    isMixBtnClick = false;
    changeWarning("");
  }
}

function repeatModeActive() {
  if (isMixBtnClick) {
    return;
  } else if (!isRepeatBtnClick) {
    isRepeatBtnClick = true;
    ifModeActive(repeatBtn, repeatModeTxt);
  } else if (isRepeatBtnClick) {
    isRepeatBtnClick = false;
    repeatBtn.style.transform = "scale(1)";
    changeWarning("");
  }
}

function ifModeActive(button, text) {
  button.style.transform = "scale(1.3)";
  changeWarning(text);
}

function changeWarning(text) {
  return (changeWarningText.innerText = text);
}

function openMenu() {
  menu.style.left = "0";
}

function cancelMenu(){
  menu.style.left = "-20rem"
}

function newSongPage() {
  addSongCondition();
  isAddBtnClick
    ? (newSongContainer.style.display = "flex")
    : (newSongContainer.style.display = "none");
}

function addSongCondition() {
  
  !isAddBtnClick ? (isAddBtnClick = true) : (isAddBtnClick = false);
}

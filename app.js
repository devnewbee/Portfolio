var songs = [
  'bensound-dance.mp3',
  'bensound-dreams.mp3',
  'bensound-dubstep.mp3',
  'bensound-house.mp3'
];

//get div player ids
var songTitle = document.getElementById('songTitle');
songSlider = document.getElementById('songSlider');
currentTime = document.getElementById('currentTime');
duration = document.getElementById('duration');
volumeSlider = document.getElementById('volumeSlider');
nextSongTitle = document.getElementById('nextSong');

var song = new Audio();
currentSong = 0;

//play song upon opening the browser
window.onload = loadSong;

//create a function for loadSong, identify source of songs
function loadSong() {
  song.src = 'music/' + songs[currentSong];
  songTitle.textContent = currentSong + 1 + '. ' + songs[currentSong];
  nextSongTitle.innerHTML =
    '<strong>Next Song: </strong>' + songs[currentSong + (1 % songs.length)];
  song.playbackRate = 1;
  song.volume = volumeSlider.value;
  setTimeout(showDuration, 1000);
  song.play();
}

setInterval(updateSongSlider, 1000);

//create function for song slider
function updateSongSlider() {
  var c = Math.round(song.currentTime);
  songSlider.value = c;
  currentTime.textContent = convertTime(c); // cannot be used alone needs convertTime function
  if (song.ended) {
    next();
  }
}

function convertTime(secs) {
  var min = Math.floor(secs / 60);
  var sec = secs % 60;
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  return min + ':' + sec;
}

//create function for song duration
function showDuration() {
  var d = Math.floor(song.duration);
  songSlider.setAttribute('max', d);
  duration.textContent = convertTime(d);
}

//function for playing and pausing
function playOrPauseSong(img) {
  song.playbackRate = 1;
  if (song.paused) {
    song.play();
    img.src = 'favorites/icons8-pause-50.png';
  } else {
    song.pause();
    img.src = 'favorites/icons8-play-50.png';
  }
}

// function next() {
//   currentSong = currentSong + (1 % songs.length);
//   loadSong();
// }

// yup, there's a bug here, I am still learning how to loop the songs array ;)
function next() {
  if (currentSong < songs.length) {
    currentSong++;
  } else {
    currentSong = 0;
  }
  loadSong();
}

function previous() {
  currentSong--;
  currentSong = currentSong < 0 ? songs.length - 1 : currentSong;
  loadSong();
}

function seekSong() {
  song.currentTime = songSlider.value;
  currentTime.textContent = convertTime(song.currentTime);
}

function adjustVolume() {
  song.volume = volumeSlider.value;
}

function increasePlaybackRate() {
  songs.playbackRate += 0.5;
}

function decreasePlaybackRate() {
  songs.playbackRate -= 0.5;
}

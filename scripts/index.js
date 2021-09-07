const image = document.querySelector('img');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const audioElement = document.querySelector('audio');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const currentTimeElement = document.querySelector('.current-time');
const durationElement = document.querySelector('.duration');
const prevButton = document.querySelector('.fa-backward');
const playButton = document.querySelector('.fa-play');
const forwButton = document.querySelector('.fa-forward');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    },
]

let isPlaying = false;

const toggleMusicWithKey = evt => {
    if (evt.keyCode == '32') {
        isMusicPlaying()
    }
}

const isMusicPlaying = () => (!isPlaying) ? playMusic() : pauseMusic();

const playMusic = () => {
    isPlaying = true;
    audioElement.play();
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
}

const pauseMusic = () => {
    isPlaying = false;
    audioElement.pause()
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
}

playButton.addEventListener('click', isMusicPlaying);
document.addEventListener('keydown', toggleMusicWithKey);

const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    audioElement.src = `./music/${song.name}.mp3`;
    image.src = `./images/${song.name}.jpg`;
}

let songIndex = 0;

const prevSong = () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playMusic()
}

const nextSong = () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playMusic()
}

loadSong(songs[songIndex]);

const switchSongsWithKey = evt => {
    if (evt.ctrlKey && evt.key == 'x') {
        nextSong();
    } else if (evt.ctrlKey && evt.key == 'z') {
        prevSong();
    }
}

document.addEventListener('keydown', switchSongsWithKey)

const updateProgressBar = evt => {
    if (isPlaying) {
        const { duration, currentTime } = evt.srcElement;
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        (durationSeconds < 10) ? durationSeconds = `0${durationSeconds}` : null;
        // delay switching duration element to avoid NaN
        if (durationSeconds) {
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`
        }
        // calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        (currentSeconds < 10) ? currentSeconds = `0${currentSeconds}` : null;
        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

const clickToProgressTroughSong = evt => {
    const { duration } = audioElement;
    const songPartition = 0.05;
    if (evt.keyCode == '39') {
        audioElement.currentTime += duration * songPartition;
    } else if (evt.keyCode == '37' && audioElement.currentTime > 0) {
        audioElement.currentTime -= duration * songPartition;
    }
}

const setProgressBar = function (evt) {
    const width = this.clientWidth;
    const offsetX = evt.offsetX;
    const { duration } = audioElement;
    audioElement.currentTime = (offsetX / width) * duration;
    playMusic();
}

const controlVolume = function (evt) {
    const changeVolumeBy = 0.1;
    if (evt.keyCode == '40' && audioElement.volume >= 0.1) {
        audioElement.volume -= changeVolumeBy;
    } else if (evt.keyCode == '38' && audioElement.volume != 1) {
        audioElement.volume += changeVolumeBy;
    }
}

document.addEventListener('keydown', clickToProgressTroughSong);
document.addEventListener('keydown', controlVolume);
prevButton.addEventListener('click', prevSong);
forwButton.addEventListener('click', nextSong);
audioElement.addEventListener('ended', nextSong);
audioElement.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

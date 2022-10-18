let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");


let timer;
let autoplay = 0;

let index_no = 0;

let playing_song = false;

//Audio Element

let track = document.createElement('audio');



//All songs list

let All_song = [
    {
        name: "Don't Be Afraid",
        path: "Audio/Aaron_Hall_-_Dont_Be_Afraid_(getmp3.pro).mp3",
        img: "Images/Csr 103.9.jpg",
        singer: "Aaron Hall"
    },

    {
        name: "Sensitivity",
        path: "Audio/Sensitivity_(getmp3.pro).mp3",
        img: "Images/Csr 103.9.jpg",
        singer: "Ralph Tresvant"
    },

    {
        name: "So you Like",
        path: "Audio/So_You_Like_What_You_See_(getmp3.pro).mp3",
        img: "Images/Csr 103.9.jpg",
        singer: "Samuelle"
    },
    
    
    {
        name: "Don't be Cruel",
        path: "Audio/Bobby_Brown-Dont_Be_Cruel_(getmp3.pro).mp3",
        img: "Images/Csr 103.9.jpg",
        singer: "Bobby Brown"
    },

    {
        name: "I'm So Into You",
        path:"Audio/SWV_Im_So_Into_You_Audio_(getmp3.pro).mp3",
        img: "Images/Csr 103.9.jpg",
        singer: "SWV"
    }

];

//All function 

//function load the track

function load_track(index_no) {
    clearInterval(timer);
    reset_slider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img
    artist.innerHTML = All_song[index_no].singer
    track.load();
    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    timer = setInterval(range_slider , 1000);
}
load_track(index_no);


//Mute Sound

function mute_sound() {

    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

//Reset Song Slider

function reset_slider() {

    slider.value = 0;
}


//checking to see if the song is playing or not

function justplay() {
    if (playing_song==false) {
        playsong();
    } else {
        pausesong();
    }
}

// Play Song

function playsong() {
	track.play();
	playing_song = true;
	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//Pause Song

function pausesong() {
	track.pause();
	playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

//Next Song

function next_song() {
    if (index_no < All_song.length - 1) {
        index_no += 1;
        load_track(index_no);
        playsong();
    }
}

//Previous Song

function previous_song() {

    if (index_no > 0) {
        index_no -= 1;
        load_track(index_no);
        playsong();
    } else {
        index_no = All_song.length;
        load_track(index_no);
        playsong();
    }
}

//Change Volume

function volume_change() {

    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

//Change Slider Position

function change_duration() {

    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}


// autoplay function
function autoplay_switch() {
	if (autoplay == 1) {
		autoplay = 0;
		auto_play.style.background = "#303E7F";
	} else {
		autoplay = 1;
		auto_play.style.background = "#7F1B73";
	}
}

function range_slider() {
	let position = 0;

	// Update Slider Position
	if (!isNaN(track.duration)) {
		position = track.currentTime * (100 / track.duration);
		slider.value = position;
         // Calculate the time left and the total duration
    let currentMinutes = Math.floor(track.currentTime / 60);
    let currentSeconds = Math.floor(track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(track.duration / 60);
    let durationSeconds = Math.floor(track.duration - durationMinutes * 60);
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
       // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  
      
	}

    //Function Will Run When The Song Is Over

    if (track.ended) {
        play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        if (autoplay ==1) {

            index_no += 1;
            load_track(index_no);
            playsong();
        }
    }
}


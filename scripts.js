//code to pause and play video
const vid = document.querySelector('.viewer');

vid.addEventListener('click', playVid);
function playVid(e) {
    if (vid.paused) {
        vid.play();
        icon.textContent = '❚ ❚';
    } else {
        vid.pause();
        icon.textContent = '►';
    }

}

//code to toggle between pause and play icon 
const icon = document.querySelector('.toggle');
icon.addEventListener('click', changeIcon);
function changeIcon() {
    if (vid.paused) {
        icon.textContent = '❚ ❚'

    } else {
        icon.textContent = '►'
    }
}
icon.addEventListener('click', () => {
    if (vid.paused) {
        vid.play()
    } else {
        vid.pause()
    }
});

//code to enable space-key control pause/play
window.addEventListener('keydown',spaceControl);
function spaceControl(e){
    if (e.key===" "){
        playVid();
    }
}

//code to update progress-bar
const vidDuration = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

vid.addEventListener('timeupdate', updateBar)

function updateBar(e) {
    //since flex-basis is measured in percentage,we have to covert currentTime of vid to a percentile equivalent
    let percentile = (this.currentTime / vid.duration) * 100;
    progressBar.style.flexBasis = `${percentile}%`;

}

//code to drag n drop progressBar
let mouseDown = false;
vidDuration.addEventListener('click',dragDrop);
vidDuration.addEventListener('mousedown',()=>mouseDown=true);
// vidDuration.addEventListener('mouseup',()=>mouseDown=false);
vidDuration.addEventListener('mouseout',()=>mouseDown=false);

function dragDrop(e){
    if (mouseDown){
        let drop = (e.offsetX / vidDuration.offsetWidth) * vid.duration;
    vid.currentTime = drop;
    }
}

//code to control volume
const volume = document.querySelector('.player__slider');
volume.addEventListener('change', updateVolume);
function updateVolume(e) {
    vid.volume = this.value;
}

//code to control playbackrate
const playBack = document.querySelector('.player__slider2');
playBack.addEventListener('change', updatePlayBack);
function updatePlayBack(e) {
    vid.playbackRate = this.value;
}

//code to control skip buttons
const skipped = document.querySelectorAll('[data-skip]');
skipped.forEach(step=>step.addEventListener('click',skipVid))
function skipVid(){
    vid.currentTime += parseInt(this.dataset.skip);
}

//code to control skip with arrow-keys
const backSkip = document.querySelector('.skip1');
const frontSkip = document.querySelector('.skip2');
window.addEventListener('keydown',arrowControl);
function arrowControl(e){
    if(e.key==='ArrowRight'){
        vid.currentTime += parseInt(frontSkip.dataset.skip);
    }else if(e.key==='ArrowLeft'){
        vid.currentTime += parseInt(backSkip.dataset.skip);
    }

}

//code to expand to fullscreen
const fullscreen = document.querySelector('.expandIcon');
const myPlayer = document.querySelector('.player');
fullscreen.addEventListener('click',updateFullscreen);


function updateFullscreen(){
    if(document.fullscreenElement === null){
        myPlayer.requestFullscreen();
        fullscreen.setAttribute('src','./compress-solid.svg')
        
    }else{
        document.exitFullscreen();
        fullscreen.setAttribute('src','./expand-solid.svg');
        
        
    }
}
window.addEventListener('fullscreenchange',(e)=>{
    
    if(!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement){
        fullscreen.setAttribute('src','./expand-solid.svg');
    }
})

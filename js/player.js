;
(function (w) {
    function Player($audio, musicList) {
        this.$audio = $audio
        this.audio = $audio[0]
        this.musicList = musicList || []
        this.currentIndex = -1
        this.currentMusic = {}
    }
    Player.prototype.playMusic = function (index, music) {

        if(this.currentIndex == index){
            if(this.audio.paused){
                this.audio.play();
            }else{
                this.audio.pause();
            }
        }else {
            this.$audio.attr("src", music.link_url);
            this.audio.play();
            this.currentIndex = index;
            this.currentMusic = music
        }
    },
    Player.prototype.preIndex = function () {
        var index = this.currentIndex - 1;
        if(index < 0){
            index = this.musicList.length - 1;
        }
        return index;
    },
    Player.prototype.nextIndex = function () {
        var index = this.currentIndex + 1;
        if(index > this.musicList.length - 1){
            index = 0;
        }
        return index;
    },
    Player.prototype.changeMusic = function (index) {
        this.musicList.splice(index, 1);
        if(index < this.currentIndex){
            this.currentIndex = this.currentIndex - 1;
        }
    },
    Player.prototype.musicTimeUpdate = function (callBack) {
        var $this = this;
        this.$audio.on("timeupdate", function () {
            var duration = $this.audio.duration;
            var currentTime = $this.audio.currentTime;
            var timeStr = $this.formatDate(currentTime, duration);
            callBack(currentTime, duration, timeStr);
        });
    },
    Player.prototype.formatDate = function (currentTime, duration) {
        var endMin = parseInt(duration / 60); // 2
        var endSec = parseInt(duration % 60);
        if(endMin < 10){
            endMin = "0" + endMin;
        }
        if(endSec < 10){
            endSec = "0" + endSec;
        }

        var startMin = parseInt(currentTime / 60); // 2
        var startSec = parseInt(currentTime % 60);
        if(startMin < 10){
            startMin = "0" + startMin;
        }
        if(startSec < 10){
            startSec = "0" + startSec;
        }
        return startMin+":"+startSec+" / "+endMin+":"+endSec;
    },
    Player.prototype.musicSeekTo = function (value) {
        if(isNaN(value)) return;
        this.audio.currentTime = this.audio.duration * value;
    },
    Player.prototype.musicVoiceSeekTo = function (value) {
        if(isNaN(value)) return;
        if(value <0 || value > 1) return;
        this.audio.volume = value;
    }

w.Player = Player;
})(window);
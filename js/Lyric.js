;
(function (w) {
    function Lyric(path) {
        this.path = path || ""
        this.times = []
        this.lyrics = []
        this.index = -1
    }
    Lyric.prototype.loadLyricPath = function (callBack) {
        var $that = this
        $.ajax({
            type: 'GET',
            url: this.path,
            dataType: 'text',
            success: function (data) {
                // 对歌词进行解析
                parseLyric.call($that, data)
                // 设置回调
                callBack()
            },
            error: function (e) {
                alert('获取歌词失败')
            }
        })
    }
    //解析歌词，将时间和歌词分开
    //时间放到times中
    //歌词放到lyrics中
    function parseLyric(data) {
        var $that = this
        this.times = []
        this.lyrics = []
        var array = data.split("\n")
        var timeReg = /\[(\d*:\d*\.\d*)\]/
        $.each(array, function (index, ele) {
            var lrc = ele.split("]")[1]
            if (lrc.length == 1) return true
            $that.lyrics.push(lrc)
            // 处理时间
            var res = timeReg.exec(ele)
            if (res == null) return true
            var timeStr = res[1] 
            var res2 = timeStr.split(":")
            var min = parseInt(res2[0]) * 60;
            var sec = parseFloat(res2[1])
            var time = parseFloat(Number(min + sec).toFixed(2))
            $that.times.push(time)
        });
    }
    Lyric.prototype.currentIndex = function (currentTime) {
        if (currentTime >= this.times[0]) {
            this.index ++
            this.times.shift()
        }
        return this.index
    }
    w.Lyric = Lyric
})(window)
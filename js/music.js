;
(function (w) {
    function Music(options) {
        options = options || {}
        this.name = options.name || ''
        this.singer = options.singer || ''
        this.album = options.album || ''
        this.time = options.time || ''
        this.link_url = options.link_url || ''
        this.cover = options.cover || ''
        this.link_lrc = options.link_lrc || ''
        this.lyric = {}
        this.index = -1

    }
    // 根据每条music 创建相应的dom对象
    Music.prototype.creatDom = function (index, divEle) {
        // var $str = $(' <li class="list_music">' +
        //     '<div class="list_check"><i></i></div>' +
        //     '<div class="list_number">' + (index + 1) + '</div>' +
        //     ' <div class="list_name">' + this.name +
        //     ' <div class="list_menu">' +
        //     ' <a href="javascript:;" title="播放" class="list_menu_play"></a>' +
        //     ' <a href="javascript:;" title="添加"></a>' +
        //     '<a href="javascript:;" title="下载" ></a>' +
        //     '<a href="javascript:;" title="分享" ></a>' +
        //     '</div>' +
        //     '</div>' +
        //     '<div class="list_singer">' + this.singer + '</div>' +
        //     '<div class="list_time">' +
        //     ' <span>' + this.time + '</span>' +
        //     '<a href="javascript:;" title="删除" class="list_menu_del"></a>' +
        //     '</div>' +
        //     '</li>')
        
        //  因为用$() 是把元素添加到内存中的 所以要进行追加
        this.index = index
        var $str = template('musicInfoTemp',this)
        console.log('hhhhhhhh'+$str);
        console.log(Object.prototype.toString.call($str));
        // $str.get(0).index = index
        // $str.get(0).music = this
        divEle.append($str)
    }
    // 根据每条music 设置相应的内容
    Music.prototype.initMusicInfo = function () {
        $('.song_info_pic img').attr('src', this.cover)
        $('.song_info_name a').text(this.name)
        $('.song_info_singer a').text(this.singer)
        $('.song_info_album a').text(this.album)
        $('.music_progress_name').text(this.name + '/' + this.singer)
        $('.music_progress_time').text('00:00/' + this.time)
        $('.mod_player_mask_bg').css('background', 'url("' + this.cover + '")')
        $('.song_lyric').html('')
        var lyric = new Lyric(this.link_lrc)
        lyric.loadLyricPath(function () {
            $.each(lyric.lyrics, function (index, ele) {
                var $item = $("<li>" + ele + "</li>")
                $('.song_lyric').append($item)
            })
        });
        this.lyric = lyric

    }
    

    w.Music = Music

})(window)
$(function () {
    var player = new Player($('#music'))
    var delArr = [];
    var progress;
    var voiceProgress;
    var $musicPlay = $(".music_play");
    (function(){
        $.ajax({
            type: "GET",
            url: './source/songData.json',
            dataType: 'json',
            success: function (data) {
                $(data).each(function (idx, ele) {
                    console.log(ele.name);
                    var $musicListDom = $(".content_list ul");
                    var music = new Music(ele)
                    player.musicList.push(music)
                    // 创建每首歌
                    
                    music.creatDom(idx , $musicListDom)
                    if (idx == 0)  music.initMusicInfo()               
                })
            },
            error: function (e) {
                alert('读取数据失败')
            }
        })
    })();
    (function(){
        var $progressBar = $(".music_progress_bar");
        var $progressLine = $(".music_progress_line");
        var $progressDot = $(".music_progress_dot");
        progress =new Progress($progressBar,$progressLine,$progressDot);
        progress.progressClick(function (value) {
            player.musicSeekTo(value);
        });
        progress.progressMove(function (value) {
            player.musicSeekTo(value);
        });


        var $voiceBar = $(".music_voice_bar");
        var $voiceLine = $(".music_voice_line");
        var $voiceDot = $(".music_voice_dot");
        voiceProgress = new Progress($voiceBar,$voiceLine,$voiceDot);
        voiceProgress.progressClick(function (value) {
            player.musicVoiceSeekTo(value);
        });
        voiceProgress.progressMove(function (value) {
            player.musicVoiceSeekTo(value);
        });
    })();
   
    $('body').dblclick(function () {
    })
    $('.content_toolbar').on('click','.content_toolbar_collect',function() {
        if (delArr.length == 0) {
            alert('请选中要收藏的歌曲') 
            return
        }else {
           
            alert('已收藏');
            for(var i = 0;i < delArr.length;i++) {
                 $(".list_music").eq(delArr[i]).find(".list_check").toggleClass('list_checked');
            }
        }
    })
    $('.content_toolbar').on('click','.content_toolbar_add',function() {
        if (delArr.length == 0) {
            alert('请选中要添加的歌曲') 
            return
        }else {
            alert('已添加');
            for(var i = 0;i < delArr.length;i++) {
                $(".list_music").eq(delArr[i]).find(".list_check").toggleClass('list_checked');
           }
        }
    })
    $('.content_toolbar').on('click','.content_toolbar_download',function() {
        if (delArr.length == 0) {
            alert('请选中要下载的歌曲') 
            return
        }else {
            alert('已下载');
            for(var i = 0;i < delArr.length;i++) {
                $(".list_music").eq(delArr[i]).find(".list_check").toggleClass('list_checked');
           }
        }
    })
    $('.content_toolbar').on('click','.content_toolbar_delete',function() {
        if (delArr.length == 0) {
            alert('请选中要删除歌曲') 
            return
        } else {           
            for(var i = delArr.length;i >= 0;i--) {
                $(".list_music").eq(delArr[i]).find(".list_menu_del").trigger("click");
            }
        }
    })
    $('.content_toolbar').on('click','.content_toolbar_deleteAll',function() {
        var con = confirm('确认清空吗') 

        if(con) {
            player.playMusic(player.currentIndex,player.currentMusic)
            $musicPlay.removeClass("music_play2");
            $('.content_list').find('.list_music').remove()
            var music = new Music()
            music.initMusicInfo()
        }
    })
    $('.content_list').on('mouseenter','.list_music',function(){
        $(this).find('.list_menu').stop().fadeIn(100)
        $(this).find('.list_time a').stop().fadeIn(100)
        $(this).find('.list_time span').stop().fadeOut(100)
    })
    $('.content_list').on('mouseleave','.list_music',function(){
        $(this).find('.list_menu').stop().fadeOut(100)
        $(this).find('.list_time a').stop().fadeOut(100)
        $(this).find('.list_time span').stop().fadeIn(100)
    })
    $('.content_list').on('click','.list_check',function(){

        $(this).toggleClass('list_checked')
        var $item = $(this).parents(".list_music")
        if($(this).hasClass('list_checked')) {
            delArr.push($item.get(0).index)
        }else {
            var index = delArr.indexOf($item.get(0).index);
            delArr.splice(index,1)
        }
        console.log(delArr);
    })
     
    $('.content_list').on('click','.list_menu_play',function() {
        var $item = $(this).parents(".list_music");
        $(this).toggleClass("list_menu_play2");
        $item.siblings().find(".list_menu_play").removeClass("list_menu_play2");
        if($(this).hasClass("list_menu_play2")){
            $musicPlay.addClass("music_play2");
            $item.find("div").css("color", "#fff");
            $item.siblings().find("div").css("color", "rgba(255,255,255,0.5)");
        }else{
            $musicPlay.removeClass("music_play2");
            $item.find("div").css("color", "rgba(255,255,255,0.5)");
        }
        $item.find(".list_number").toggleClass("list_number2");
        $item.siblings().find(".list_number").removeClass("list_number2");
        player.playMusic($item.get(0).index, $item.get(0).music);
        $item.get(0).music.initMusicInfo()  
        
    })
    $('.content_list').on('click','.list_menu_del',function() {
        var $item = $(this).parents('.list_music')
        if($item.get(0).index == player.currentIndex)
            $('.music_next').trigger('click')
        $item.remove()
        player.changeMusic($item.get(0).index)
        $('.list_music').each(function(index,ele){
            ele.index = index
            $(ele).find('.list_number').text(index+1)
        }) 
       if( delArr.includes($item.get(0).index) )  {
          var index = delArr.indexOf($item.get(0).index);
            delArr.splice(index,1)
       }      
    })
    $musicPlay.click(function () {
        player.currentIndex == -1 ? $(".list_music").eq(0).find(".list_menu_play").trigger("click"): $(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");

    })

    $(".music_pre").click(function () {
        $(".list_music").eq(player.preIndex()).find(".list_menu_play").trigger("click");
    })

    $(".music_next").click(function () {
        $(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
    })
    $('.music_voice_icon').click(function() {
        $(this).toggleClass('music_voice_icon2')
        $(this).hasClass('music_voice_icon2') ? player.musicVoiceSeekTo(0) : player.musicVoiceSeekTo(1)
    })
    $('.music_mode').click(function(){
        // 
    })
    $('.music_fav').click(function() {
        $(this).toggleClass('music_fav2')

    })
    $('.music_down').click(function() {
        alert('下载中')
    })
    $('.music_only').click(function() {
        $(this).toggleClass('music_only2')
    })
    player.musicTimeUpdate(function(currentTime,duration,timeStr) {
        $('.music_progress_time').text(timeStr)
        var value = currentTime / duration * 100
        
        if(value >= 100)  {
            $(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
            player.currentMusic.initMusicInfo()
            progress.setProgress(0)
            return
        }
        progress.setProgress(value)
        var index = player.currentMusic.lyric.currentIndex(currentTime)
        var $item = $('.song_lyric li').eq(index)
        $item.addClass('cur')
        $item.siblings().removeClass('cur')
        if(index <= 2) return
        // 如果进度条拖动过长 跳动就会太慢 跳转到指定的位置
        $('.song_lyric').css({
            marginTop:(-index + 2) * 30
        })
        

    })


})
;
(function (w) {
    function Progress($progressBar, $progressLine, $progressDot) {
           this.$progressBar = $progressBar,
            this.$progressLine = $progressLine,
            this.$progressDot = $progressDot
            this.isMove = false
            this.value = 0
    }
    Progress.prototype.progressClick = function (callBack) {
        var $this = this
        this.$progressBar.click(function (event) {
            var normalLeft = $(this).offset().left
            var eventLeft = event.pageX
            $this.$progressLine.css('width', eventLeft - normalLeft)
            $this.$progressDot.css('left', eventLeft - normalLeft)
            var value = (eventLeft - normalLeft) / $(this).width()
            $this.value = value
            callBack(value)
        })
    };
    Progress.prototype.progressMove = function (callBack) {
        var $this = this
        var normalLeft = this.$progressBar.offset().left
        var barWidth = this.$progressBar.width()
        var eventLeft
        this.$progressBar.mousedown(function () {
            $this.isMove = true
            $(document).mousemove(function (event) {
                eventLeft = event.pageX
                var offset = eventLeft - normalLeft
                if (offset >= 0 && offset <= barWidth) {
                    $this.$progressLine.css('width', offset)
                    $this.$progressDot.css('left', offset)
                }
            })
        })
        $(document).mouseup(function() {
            $(document).off('mousemove')
            $this.isMove = false
            var value = (eventLeft - normalLeft) / barWidth
            $this.value = value
            callBack(value)
        })
    };
   
    Progress.prototype.setProgress = function(value) {
        if (this.isMove) return
        if (value < 0 || value > 100) return
        this.$progressLine.css({
            width: value + '%'
        });
        this.$progressDot.css ({
            left: value + '%'
        })

    };
    w.Progress = Progress 
})(window)
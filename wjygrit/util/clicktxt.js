<!--点击爱心特效-->
<script
    src="https://code.jquery.com/jquery-3.6.0.js"
    integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
    crossorigin="anonymous"
></script>

//需要jquery插件
/* 鼠标特效 */
var a_idx = 0;
jQuery(document).ready(function ($) {
    $("body").click(function (e) {
        var a = new Array(
            "❤不做咸鱼！❤",
            "❤努力变得卓越❤",
            "❤拒绝懒惰！❤",
            "❤我要减肥❤",
            "❤向大佬学习❤",
            "❤扶我起来~❤",
            "❤come on❤",
            "❤一直在路上~❤",
            "❤累了~❤",
            "❤再趴一会❤",
            "❤66666❤",
            "❤冲鸭！！！❤"
        );
        var $i = $("<span></span>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
            y = e.pageY;
        $i.css({
            "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
            top: y - 20,
            left: x,
            position: "absolute",
            "font-weight": "bold",
            color:
                "rgb(" +
                ~~(255 * Math.random()) +
                "," +
                ~~(255 * Math.random()) +
                "," +
                ~~(255 * Math.random()) +
                ")",
        });
        $("body").append($i);
        $i.animate(
            {
                top: y - 180,
                opacity: 0,
            },
            1500,
            function () {
                $i.remove();
            }
        );
    });
});
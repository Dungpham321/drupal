(function($){
    $(".block-gioithieu2-gdt article").each(function () {
        var pl = $(this);
        var src = pl.attr('src');
        var height = pl.find('img').attr('height');
        var width = pl.find('img').attr('width');
        var poster = pl.find('img').attr('src');
        pl.replaceWith($('<video>' + this.innerHTML + '</video>'));
        var video = $(".block-gioithieu2-gdt").find('video');
        video.attr('src', src);
        video.attr('poster', poster);
        video.attr('height', height);
        video.attr('width', width);
        video.mediaelementplayer({
            success: function (media) {
                pl.find(".mejs__controls").css({ "display": "none" });
                // media.addEventListener('play', function () {
                //     pl.find(".mejs__controls").css({ "display": "" });
                //     pl.parents('.item').find('.content-item').hide();
                // }, true);
            }
        });
    });
})(jQuery);

(function($, Drupal){
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
})(jQuery, Drupal);

(function (Drupal) {
  Drupal.behaviors.menuToggle = {
    attach: function (context, settings) {
      const btn = context.querySelector(".tbm-button");
      const menu = context.querySelector(".tbm-main");
      if (btn && menu && !btn.dataset.bound) {
        btn.dataset.bound = true;
        btn.addEventListener("click", () => {
          menu.classList.toggle("open");
        });
      }
    }
  };
})(Drupal);

//js chuyển tab trong block nội dung trang giới thiệu
(function (Drupal, once) {
  Drupal.behaviors.tabsBehavior = {
    attach: function (context, settings) {

      const buttons = once('tab-btn', '.tab-btn', context);
      const tabs = document.querySelectorAll(".tab-panel");

      buttons.forEach(btn => {
        btn.addEventListener("click", () => {

          buttons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");

          tabs.forEach(tab => tab.classList.remove("active"));
          document.getElementById(btn.dataset.tab).classList.add("active");

        });
      });

    }
  };
})(Drupal, once);
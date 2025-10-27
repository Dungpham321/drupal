// (function($, Drupal){
//     $(".block-gioithieu2-gdt article").each(function () {
//         var pl = $(this);
//         var src = pl.attr('src');
//         var height = pl.find('img').attr('height');
//         var width = pl.find('img').attr('width');
//         var poster = pl.find('img').attr('src');
//         pl.replaceWith($('<video>' + this.innerHTML + '</video>'));
//         var video = $(".block-gioithieu2-gdt").find('video');
//         video.attr('src', src);
//         video.attr('poster', poster);
//         video.attr('height', height);
//         video.attr('width', width);
//         video.mediaelementplayer({
//             success: function (media) {
//                 pl.find(".mejs__controls").css({ "display": "none" });
//                 // media.addEventListener('play', function () {
//                 //     pl.find(".mejs__controls").css({ "display": "" });
//                 //     pl.parents('.item').find('.content-item').hide();
//                 // }, true);
//             }
//         });
//     });
// })(jQuery, Drupal);

(function($, Drupal){
  Drupal.behaviors.videoResponsive = {
    attach: function (context, settings) {

      $(".block-gioithieu2-gdt article", context).each(function () {
        var pl = $(this);
        var src = pl.attr('src');
        var poster = pl.find('img').attr('src');

        // Tạo video mới
        var video = $('<video class="gdt-video-player" preload="none" controls></video>');
        video.attr('src', src);
        video.attr('poster', poster);

        // Xóa width/height ảnh gốc để không bị ép layout
        video.removeAttr('width').removeAttr('height');
        pl.find('img').removeAttr('width').removeAttr('height');

        // Thay thế vào
        pl.replaceWith(video);

        // Kích hoạt MediaElementPlayer
        video.mediaelementplayer();
      });

    }
  };
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

(function ($, Drupal, once) {
  Drupal.behaviors.slickUngroup = {
    attach: function (context) {
      once('ungroup-slick', '.view-bao-chi .slick__slider', context).forEach(function (slider) {
        var $slider = $(slider);
        // Nếu slick đã init → hủy để chuẩn bị build lại
        if ($slider.hasClass('slick-initialized')) {
          $slider.slick('unslick');
        } 
        var slides = [];
        $slider.find('ul.b-grid li').each(function () {
          var $li = $(this);
          slides.push($('<div class="slick__slide slide"></div>').append($li.clone(true)));
        });
        if (slides.length) {
          $slider.empty();
          slides.forEach(function ($s) {
            $slider.append($s);
          });
        }
        // Re-init slick với responsive chuẩn
        $slider.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
          responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768,  settings: { slidesToShow: 2 } },
            { breakpoint: 480,  settings: { slidesToShow: 1 } }
          ]
        });

      });
    }
  };
})(jQuery, Drupal,once);

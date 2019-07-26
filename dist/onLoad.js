$(document).ready(function () {
  registerMessage = function (event) {
    if (event.data.registration) {
      $(".is-guest").remove();
      $(".navbar-end").append("<a href=\"" + event.data.registration[0] + "\" class=\"navbar-item\">" + event.data.registration[1] + "</a>");
      window.removeEventListener("message", registerMessage, false);
    }
  };

  window.addEventListener("message", registerMessage, false);

  $(".navbar-burger").click(function () {
    $(".tipsy").remove();
    $(".navbar-burger,.navbar-menu").toggleClass("is-active");

    if ($(".navbar-burger").hasClass("is-active")) {
      $(".navbar-search").prependTo(".navbar-start");
    } else {
      $(".navbar-search").prependTo(".navbar-end");
    }
  });

  // $("body").on("click", ".toggleadd", function () {
  //   $(".menuadd").removeClass("is-hoverable").on("mouseenter", function () {$(this).addClass("is-hoverable").off();});
  //   $("#games-form .input").focus();
  //   return false;
  // });

  // gameSetup = function (msg) {
  //   $("#games-form button").removeClass("is-loading").addClass("is-danger");
  //   $("#games-form").removeClass("shake").closest(".container").find(".fieldmsg").addClass("has-text-danger").html(msg);
  //   void $("#games-form")[0].offsetWidth;
  //   $("#games-form").addClass("shake").find("input").focus();
  // };

  var homedefault = $(".hero-foot .columns:first-child").html(), homerun = false;

  // TODO: Make the spinning shit ours
  // $(".hero-foot").on("click", ".button", function () {
  //   $(".hero-foot .buttonpulse span").remove();
  //   var columns = $(".hero-foot .columns:first-child");

  //   if ($("#howdoesitwork").hasClass("is-active")) {
  //     columns.html(homedefault);
  //     $(".hero-foot .columns:last-child").slideUp();
  //     $("#howdoesitwork").removeClass("is-active").removeClass("is-running").text("How to get started?");
  //   } else if (!$("#howdoesitwork").hasClass("is-running")) {
  //     $("#howdoesitwork").addClass("is-running").text("Add your Game");
  //     column = columns.find(".column:eq(0)").addClass("is-active");
  //     temp = column.find(".iconbg").clone();
  //     column.find(".iconbg").replaceWith(temp.addClass("spin"));
  //     column.find(".icon.is-centered-text").html("<svg class=\"fa icon-light-gamepad\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-light-gamepad\"></use></svg>");
  //     column.find(".title").text("1. Add your Game");
  //     column.find(".subtitle").html("Create your <a href=\"https://mod.io/games/add\" class=\"toggleadd\">games profile</a> on mod.io (or our <a href=\"https://test.mod.io\" target=\"_blank\">test env</a>), and take a peek at all we have to offer.");

  //     setTimeout(function () {
  //       $("#howdoesitwork").text("Integrate the SDK");
  //       column = columns.find(".column:eq(1)").addClass("is-active");
  //       temp = column.find(".iconbg").clone();
  //       column.find(".iconbg").replaceWith(temp.addClass("spin"));
  //       column.find(".icon.is-centered-text").html("<svg class=\"fa icon-light-code\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-light-code\"></use></svg>");
  //       column.find(".title").text("2. Integrate the SDK");
  //       column.find(".subtitle").html("Drop our <a href=\"https://docs.mod.io\" class=\"slidetotools\">SDK, Engine Plugin, Wrapper or API</a> into your game, to get mods installing.");
  //     }, homerun ? 0 : 2000);

  //     setTimeout(function () {
  //       $("#howdoesitwork").text("Accept Mods");
  //       column = columns.find(".column:eq(2)").addClass("is-active");
  //       temp = column.find(".iconbg").clone();
  //       column.find(".iconbg").replaceWith(temp.addClass("spin"));
  //       column.find(".icon.is-centered-text").html("<svg class=\"fa icon-light-cog\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-light-cog\"></use></svg>");
  //       column.find(".title").text("3. Accept Mods");
  //       column.find(".subtitle").html("Connect your mod making tools <a href=\"https://apps.mod.io/guides/getting-started\">to mod.io</a>, we'll promote your game and let the mods roll on in.");
  //     }, homerun ? 0 : 4000);

  //     setTimeout(function () {
  //       $("#howdoesitwork").addClass("is-active").removeClass("is-running").text("Follow the steps above");
  //       $(".hero-foot .columns:last-child").slideDown();
  //       $(".iconbg.spin").removeClass("spin");
  //       homerun = true;
  //     }, homerun ? 0 : 6000);
  //   }

  //   return false;
  // });

  // TODO: Make slick work
  $(".tablegrid.is-slick1").slick({
    rows: 1,
    infinite: true,
    autoplay: true,
    centerMode: true,
    variableWidth: true,
    lazyLoad: "progressive",
    prevArrow: "<div class=\"slick-prev\"><button type=\"button\" class=\"button is-white is-large is-rounded is-hidden-touch\"><span class=\"icon\"><svg class=\"fa icon-light-chevron-left\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-light-chevron-left\"></use></svg></span></button></div>",
    nextArrow: "<div class=\"slick-next\"><button type=\"button\" class=\"button is-white is-large is-rounded is-hidden-touch\"><span class=\"icon\"><svg class=\"fa icon-light-chevron-right\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-light-chevron-right\"></use></svg></span></button></div>"
  });


  $.fn.visible = function (partial) {
    var $t = $(this),
      $w = $(window),
      viewTop = $w.scrollTop(),
      viewBottom = viewTop + $w.height(),
      _top = $t.offset().top,
      _bottom = _top + $t.height(),
      compareTop = partial === true ? _bottom : _top,
      compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  };

  $(".benefits .media").css("opacity", 0);
  var lastbenefit = 0;

  $(window).on("scroll.comein", function () {
    $(".benefits .media:not(.comedone)").each(function (i, el) {
      var el = $(el);
      if (el.visible(true)) {
        el.addClass("comedone");

        if (lastbenefit == 0 || (lastbenefit + 250) < (new Date().getTime())) {
          lastbenefit = new Date().getTime();
          var nextbenefit = 0;
        } else {
          var nextbenefit = (lastbenefit + 250) - (new Date().getTime());
          lastbenefit = new Date().getTime() + nextbenefit;
        }

        setTimeout(function () {
          el.css("animation", "comein 0.6s ease forwards").addClass("comein").css("opacity", 1);
          if ($(".benefits .media").length == $(".benefits .media.comein").length) {
            $(window).unbind("scroll.comein");
          }
        }, nextbenefit);
      }
    });
  });

  $("body").on("click", ".slidetotools", function () {
    $("html,body").animate({scrollTop: $("#sdktools").closest("section").position().top}, 500);
    return false;
  });

  $(".card-image").each(function () {
    actions = $(".card-actions", this);
    $(".card-overlay", this).prepend($("<span>").css({display: "block", float: "right", height: actions.height() + "px", width: actions.width() + "px", marginbottom: "0.75rem", marginleft: "0.75rem"}));
  });
});
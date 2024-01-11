(function ($) {
    $.fn.gallaryPlugin = function () {
      
        //gallary in body
    $("body").css({
      background: "#f3f3f3",
      margin: "0",
      padding: "0",
    });

    var galleryName = $("<h1>")
      .attr("class", "galleryName")
      .html("My Gallery")
      .css({
        width: "fit-content",
        margin: "50px auto",
        "font-size": "40px",
        "font-family": "cursive",
        "text-align": "center",
        "letter-spacing": "4px",
        color: "rgb(183, 81, 18)",
      });

    var borderBottom = $("<div>").css({
      width: "50%",
      borderBottom: "6px solid rgb(183, 81, 18)",
      "border-radius": "50px",
      margin: "10px auto",
    });

    galleryName.append(borderBottom);

    $("body").append(galleryName);

    var imageGrid = $("<div>").attr("class", "image-grid").css({
      display: "flex",
      "flex-wrap": "wrap",
      "justify-content": "center",
      width: "90%",
      margin: "auto",
    });

    $("body")
      .find("img")
      .each(function () {
        var $img = $(this);
        $img.addClass("gallery-img");
        $img.css({
          width: "300px",
          height: "250px",
          margin: "10px",
          cursor: "pointer",
          "border-radius": "5px",
        });

        $img.hover(
          function () {
            $(this).css({
              cursor: "pointer",
              transform: "scale(1.07)",
              transition: "transform 0.4s",
            });
          },
          function () {
            $(this).css({
              cursor: "auto",
              transform: "scale(1)",
              transition: "transform 0.4s",
            });
          }
        );
      });

    $("body").append(imageGrid.append($(".gallery-img")));

    // footer
    var footer = $("<footer>").css({
      background: "rgb(183, 81, 18)",
      color: "#fff",
      padding: "20px",
      "margin-top": "30px",
      "text-align": "center",
    });

    var footerText = $("<p>").html(
      "&copy; 2024, My JQuery Gallary Plugin. All rights reserved."
    );

    $("body").append(footer.append(footerText));

    //slider
    var popupContainer = $("<div>").attr("class", "popup-container").css({
      display: "none",
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.85)",
      "align-items": "center",
      "justify-content": "center",
    });
    var popupContainer = $("<div>").attr("class", "popup-container").css({
      display: "none",
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.85)",
      "align-items": "center",
      "justify-content": "center",
    });

    var popupSlider = $("<div>").attr("class", "popup-slider").css({
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      "min-height": "100vh",
    });

    var prevBtn = $("<button>")
      .attr("class", "navigation-btn prev-btn")
      .html("&lt;")
      .css({
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        "font-size": "20px",
        color: "#fff",
        cursor: "pointer",
        background: "none",
        border: "none",
        left: "25px",
      });

    var nextBtn = $("<button>")
      .attr("class", "navigation-btn next-btn")
      .html("&gt;")
      .css({
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        "font-size": "20px",
        color: "#fff",
        cursor: "pointer",
        background: "none",
        border: "none",
        right: "25px",
      });

    var imgSlider = $("<img>").attr("src", "").attr("alt", "").css({
      "max-width": "100%",
      "max-height": "100%",
      "object-fit": "contain",
      margin: "auto",
    });

    var closeBtn = $("<span>").attr("class", "close-btn").html("&times;").css({
      position: "absolute",
      top: "30px",
      right: "30px",
      cursor: "pointer",
      color: "#fff",
      "font-size": "30px",
      "font-weight": "bold",
    });

    popupSlider.append(prevBtn, imgSlider, nextBtn);

    popupContainer.append(popupSlider, closeBtn);

    $("body").append(popupContainer);

    var currentIndex = 0;
    var $images = $(".gallery-img");
    var isAnimating = false;

    $(this).on("click", ".gallery-img", function () {
      currentIndex = $(this).index();
      showImage();
      popupContainer.fadeIn();
    });

    closeBtn.on("click", function () {
      popupContainer.fadeOut();
    });

    prevBtn.on("click", function () {
      if (!isAnimating) {
        isAnimating = true;
        currentIndex = (currentIndex - 1 + $images.length) % $images.length;
        showImageWithAnimation("right");
      }
    });

    nextBtn.on("click", function () {
      if (!isAnimating) {
        isAnimating = true;
        currentIndex = (currentIndex + 1) % $images.length;
        showImageWithAnimation("left");
      }
    });

    function showImage() {
      var $clickedImage = $images.eq(currentIndex).clone();
      popupSlider.find("img").replaceWith($clickedImage);
    }

    function showImageWithAnimation(direction) {
      var $currentImage = popupSlider.find("img");
      var $newImage = $images.eq(currentIndex).clone();

      $currentImage.fadeOut(500, function () {
        popupSlider.find("img").replaceWith($newImage);
        $newImage.hide().fadeIn(500, function () {
          isAnimating = false;
        });
      });
    }
    return $(this);
  };
})(jQuery);

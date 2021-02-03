$(".member__link").click(function(e) {
  e.preventDefault();

  if(this.classList.contains("member__link--active")) {
    this.classList.remove("member__link--active");
  } else {
    $(".member__link").each( function(index, item) {
      if ($(item).hasClass("member__link--active")) {
        this.classList.remove("member__link--active");
      }
    })
    this.classList.add("member__link--active");
  }
})
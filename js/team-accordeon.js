// $(".member__link").click(function(e) {
//   e.preventDefault();

//   if(this.classList.contains("member__link--active")) {
//     this.classList.remove("member__link--active");
//   } else {
//     $(".member__link").each( function(index, item) {
//       if ($(item).hasClass("member__link--active")) {
//         this.classList.remove("member__link--active");
//       }
//     })
//     this.classList.add("member__link--active");
//   }
// })

function accordeonTeam() {
  const windowWidth = window.innerWidth;
  if (windowWidth > 768) {
    const team = document.querySelector(".team__list--version--desktop");
  } else {
    const team = document.querySelector(".team__list--version--mobile");
  }

  const members = team.querySelectorAll(".members__item");
  
  team.addEventListener("click", function(e) {
    e.preventDefault();

    const target = e.target.parentNode;

    if(target.classList.contains("member__link")) {
      const member = target.parentNode;
      const content = target.nextElementSibling;
      const contentHeight = content.firstElementChild.clientHeight;

      for (const iterator of members) {
        if(iterator !== member) {
          iterator.classList.remove("members__item--active");
          iterator.lastElementChild.style.height = 0;
        }
      }
      
      if(member.classList.contains("members__item--active")) {
        member.classList.remove("members__item--active");
        content.style.height = 0;
      } else {
        member.classList.add("members__item--active");
        content.style.height = contentHeight + "px";
      }

    };
  })
}

accordeonTeam();
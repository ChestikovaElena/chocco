function accordeonTeam() {

  const members = document.querySelectorAll(".members__item");

  members.forEach(member => {
    member.addEventListener("click", function(e) {

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
  })
}

accordeonTeam();
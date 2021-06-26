  const sections = $("section");
  const display = $(".maincontent");
  const sideMenu = $(".fixed-menu");
  const menuItems = sideMenu.find(".fixed-menu__item");
  const hamburgerElement = $("#hamburger");
  const overlayElement = $("#overlay");

  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  const isMobile = mobileDetect.mobile();

  let inScroll = false;

  sections.first().addClass("active");

  const countSectionPosition = sectionEq => {
    const position = sectionEq * -100;

    if (isNaN(position)) {
      console.error("передано не врное значение в countSectionPosition");
      return 0;
    }

    return position;
  };

  const setMenuThemeForSection = (sectionEq, menuElement, activeClass) => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");

    if (menuTheme == "blue") {
      menuElement.addClass(activeClass);
    } else {
      menuElement.removeClass(activeClass);
    }
  }

  const changeMenuThemeForSection = sectionEq => {
    const isHamburgerMenu = window.matchMedia('(max-width: 768px)').matches;

    if (isHamburgerMenu) {
      setMenuThemeForSection(sectionEq, hamburgerElement, "hamburger--shadowed");
    } else {
      setMenuThemeForSection(sectionEq, sideMenu, "fixed-menu--shadowed");
    }
    
  };

  const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
  };

  const perfomTransition = sectionEq => {
    if (inScroll) return;

    const transitionOver = 1000;
    const mouseInertionOver = 300;

    inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
      transform: `translateY(${position}%)`
    });

    resetActiveClassForItem(sections, sectionEq, "active");

    setTimeout(() => {
      inScroll = false;

      resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");

    }, transitionOver + mouseInertionOver);
  };

  const viewportScroller = () => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
      next() {
        if (nextSection.length) {
          perfomTransition(nextSection.index());
        }
      },
      prev() {
        if (prevSection.length) {
          perfomTransition(prevSection.index());
        }
      }
    };
  };

  $(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();

    if (deltaY > 0) {
      scroller.next();
    }

    if (deltaY < 0) {
      scroller.prev();
    };
  });

  $(window).on("keydown", e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === "input" || tagName === "textarea";
  const scroller = viewportScroller();

    if (userTypingInInputs) return;
    
    switch (e.keyCode) {
      case 38: //
        scroller.prev();
        break;

      case 40:
        scroller.next();
        break;
    };
  });

  $(".wrapper").on("touchmove", e => e.preventDefault());

  $("[data-scroll-to]").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);
    const isHamburgerMenu = window.matchMedia('(max-width: 768px)').matches;
    
    perfomTransition(reqSection.index());

    if (isHamburgerMenu) {
      hamburgerElement.removeClass("hamburger--active");
      overlayElement.removeClass("overlay--active");
    };
  });

  hamburgerElement.click(e => {

    if (hamburgerElement.hasClass("hamburger--active")) {
      hamburgerElement.removeClass("hamburger--active");
      overlayElement.removeClass("overlay--active");
    } else {
      hamburgerElement.addClass("hamburger--active");
      overlayElement.addClass("overlay--active");
      hamburgerElement.removeClass("hamburger--shadowed");
    }
  })

  if (isMobile) {

    //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

    $("body").swipe( {
      swipe:function(
        event,
        direction
      ) {
        const scroller = viewportScroller();
        let scrollDirection = "";

        if (direction === "up") scrollDirection = "next";
        if (direction === "down") scrollDirection = "prev";
        
        scroller[scrollDirection]();
      },
    });
  }

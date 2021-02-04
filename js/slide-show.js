$(".interactive-avatar__link").click(e => {
  e.preventDefault();
  
  const $this = e.currentTarget;
  const curItem = $this.closest(".interactive-avatar");
  console.log($this.closest(".interactive-avatar"));
  curItem.addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active');
});
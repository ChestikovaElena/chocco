document.querySelector('.bars__list').addEventListener('click', (e) => {
  e.preventDefault();
  const trigger = e.target.closest('[data-trigger]');
  
  if (!trigger) return;

  const item = trigger.parentNode;
  
  if (item.classList.contains('active')) {

    closeItem(item);

  } else {

    closeActiveItem(item);
    openItem(item);
  
  }
})

function closeActiveItem(item) {
  const list = item.parentNode;
  const itemActive = list.querySelector('.active');

  if (!!itemActive) {
    closeItem(itemActive);
  }
}

function openItem(item) {
  const contentWrap = item.querySelector('[data-open]');
  //const content = contentWrap.firstElementChild;
  const openWidth = calctWidth(item);

  //content.style.minWidth = `${openWidth}px`;
  contentWrap.style.width = `${openWidth}px`;
  item.classList.add('active');

}

function closeItem(item) {
  const contentWrap = item.querySelector('[data-open]');

  contentWrap.style.width = 0;
  item.classList.remove('active');
}

function calctWidth(item) {
  const list = item.parentNode;
  const windowWidth = window.innerWidth;
  const triggers = list.querySelectorAll('[data-trigger]');
  const triggersWidth = triggers[0].clientWidth * triggers.length;
  const isTablet = window.matchMedia('(max-width: 768px) && (min-width: 480px)').matches;
  const isMobile = window.matchMedia('(max-width: 480px)').matches;
  
  if (isTablet) {
    return windowWidth - triggersWidth;
  } else if (isMobile) {
    return windowWidth - triggersWidth / triggers.length;
  } else {
    return (windowWidth - triggersWidth) > 524 ? 524 : windowWidth - triggersWidth;
  }
}
window.addEventListener("DOMContentLoaded", function () {
  function setupScroll(instance) {
    const scrollImages = document.querySelector(`.scroll-images.${instance}`);
    if (!scrollImages) {
      console.error(`No element found for ${instance}`);
      return;
    }
    const leftButton = document.querySelector(`.left.${instance}`);
    const rightButton = document.querySelector(`.right.${instance}`);
    
    const scrollAmount = parseInt(scrollImages.getAttribute('data-scroll-amount'), 10);

    function leftScroll() {
      scrollImages.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    }

    function rightScroll() {
      scrollImages.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }

    leftButton.addEventListener("click", leftScroll);
    rightButton.addEventListener("click", rightScroll);

    // Touch swipe handling
    let startX;
    let isSwiping = false;

    scrollImages.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
    });

    scrollImages.addEventListener("touchmove", (e) => {
      if (!isSwiping) return;
      const touchX = e.touches[0].clientX;
      const diffX = startX - touchX;

      if (diffX > 50) {
        rightScroll();
        isSwiping = false;
      } else if (diffX < -50) {
        leftScroll();
        isSwiping = false;
      }
    });
  }

  setupScroll('instance-1');
  setupScroll('instance-2');
  setupScroll('instance-3');
});



function setScrollAmount() {
  const instances = {
    'instance-1': { 'max-width: 576px': '320', 'min-width: 577px and max-width: 768px': '320', 'default': '320' },
    'instance-2': { 'max-width: 576px': '330', 'min-width: 577px and max-width: 768px': '370', 'default': '430' },
    'instance-3': { 'max-width: 576px': '350', 'min-width: 577px and max-width: 768px': '380', 'default': '440' }
  };

  Object.keys(instances).forEach(instance => {
    const scrollContainer = document.querySelector(`.scroll-images.${instance}`);
    
    if (!scrollContainer) return; // Skip if element is not found

    const scrollAmounts = instances[instance];
    let scrollAmount;

    if (window.matchMedia("(max-width: 576px)").matches) {
      scrollAmount = scrollAmounts['max-width: 576px'];
    } else if (window.matchMedia("(min-width: 577px) and (max-width: 768px)").matches) {
      scrollAmount = scrollAmounts['min-width: 577px and max-width: 768px'];
    } else {
      scrollAmount = scrollAmounts['default'];
    }

    scrollContainer.setAttribute('data-scroll-amount', scrollAmount);
  });
}

setScrollAmount();


window.addEventListener('resize', setScrollAmount);

document.addEventListener('DOMContentLoaded', function () {
  flatpickr("#ScheduleDate", {
    enableTime: false,
    dateFormat: "d-m-Y",
    disableMobile: true 
  });
});

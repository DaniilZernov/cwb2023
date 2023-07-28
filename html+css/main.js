/* There I connected all project(Ameer's, Momo's, Denis's and mine) in one
for creating our common object. For Project Requirements of js look files cart.html and forcat.js!!*/

// Denis part
/*
Automatic slider function.
Adds classes for previous, current and next slides, and shifts them in a cycle.

Takes arguments:
    slidesContainer
        Element which contains slide elements as direct children.
    changeTime
        Time in seconds between change of slides (5 by default).

Control methods (self-explanatory):
    start()
    stop()
    prev()
    next()
*/

function autoSlider(slidesContainer, changeTime=5) {
    const slides = Array.from(slidesContainer.children);

    // Returns random number from 0 to max.
    function getRandomSlide() {
        return Math.floor(Math.random() * slides.length);
    }

    // Start with random slide as current.
    let currentSlide = getRandomSlide();

    // Assign initial slide classes.
    addSlideClasses();

    // Define local variable for a value to stop slider via clearInterval().
    let stopSlider;

    function removeSlideClasses() {
        slides.at(currentSlide - 1).classList.remove("prev");
        slides.at(currentSlide).classList.remove("current");
        slides.at(currentSlide + 1 - slides.length).classList.remove("next");
    }

    function addSlideClasses() {
        slides.at(currentSlide - 1).classList.add("prev");
        slides.at(currentSlide).classList.add("current");
        slides.at(currentSlide + 1 - slides.length).classList.add("next");
    }

    return {
        start: function() {
            stopSlider = setInterval(() => {this.next(slides)}, changeTime * 1000);
        },
        stop: function() {
            clearInterval(stopSlider);
        },
        prev: function() {
                removeSlideClasses();
                if (--currentSlide < 0) currentSlide = slides.length - 1;
                addSlideClasses();
        },
        next: function() {
            removeSlideClasses();
            if (++currentSlide === slides.length) currentSlide = 0;
            addSlideClasses();
        }
    }
}

let slider = autoSlider(document.querySelector("#testimonials .slider"));
window.addEventListener("load", () => {
    slider.start();
})

let prevSlideButton = document.querySelector("#testimonials .back-button");
let nextSlideButton = document.querySelector("#testimonials .forward-button");

prevSlideButton.addEventListener("click", () => {
    slider.stop();
    slider.prev();
    slider.start();
})

nextSlideButton.addEventListener("click", () => {
    slider.stop();
    slider.next();
    slider.start();
})

// Momo part
function horizontalScrollingBanner() {
    const banners = document.getElementsByClassName(
      "horizontal-scrolling-banner"
    );
    if (!banners || banners.length === 0) {
      return;
    }
    const pxPerSecond = 50;
    setUpElements();
    scrollTheBanners();
    window.addEventListener("resize", setUpElements);
  
    function setUpElements() {
      for (let i = 0; i < banners.length; i++) {
        const currentBanner = banners[i];
        const helperWrapperClass = "horizontal-scrolling-banner__helper-wrapper";
        const currentHelperWrapper = currentBanner.querySelector(
          "." + helperWrapperClass
        );
        if (currentHelperWrapper) {
          const clones = currentHelperWrapper.querySelectorAll("[data-clone]");
          Array.prototype.forEach.call(clones, function (clone) {
            clone.remove();
          });
          const childrenCount = currentHelperWrapper.children.length;
          for (let i = 0; i < childrenCount; i++) {
            currentBanner.appendChild(currentHelperWrapper.children[0]);
          }
          currentHelperWrapper.remove();
        }
  
        const children = currentBanner.children;
  
        const bannerWidth = currentBanner.getBoundingClientRect().width;
        const minWidthToCoverBanner =
          bannerWidth * 2 + children[0].getBoundingClientRect().width;
        const childrenWidth = Array.prototype.reduce.call(
          children,
          function (r, child) {
            return r + child.getBoundingClientRect().width;
          },
          0
        );
        let currentWidth = childrenWidth;
  
        do {
          Array.prototype.forEach.call(children, function (child) {
            const clone = child.cloneNode();
            clone.setAttribute("aria-hidden", true);
            clone.dataset.clone = true;
            currentBanner.appendChild(clone);
          });
          currentWidth += childrenWidth;
        } while (currentWidth < minWidthToCoverBanner);
  
        const transitionHelperWrapper = document.createElement("div");
        transitionHelperWrapper.classList.add(
          "horizontal-scrolling-banner__helper-wrapper"
        );
        const childrenCount = children.length;
        for (let i = 0; i < childrenCount; i++) {
          transitionHelperWrapper.appendChild(children[0]);
        }
        currentBanner.appendChild(transitionHelperWrapper);
        transitionHelperWrapper.dataset.childrenWidth = childrenWidth;
      }
    }
  
    function scrollTheBanners() {
      for (let i = 0; i < banners.length; i++) {
        const helperWrapper = banners[i].firstElementChild;
        const childrenWidth = helperWrapper.dataset.childrenWidth;
        const offsetLeft = helperWrapper.offsetLeft;
  
        if (offsetLeft <= childrenWidth * -1) {
          helperWrapper.style.transitionDuration = "0s";
          helperWrapper.style.left = "0px";
          helperWrapper.style.removeProperty("transition-duration");
        } else if (
          helperWrapper.style.left === "" ||
          helperWrapper.style.left === "0px"
        ) {
          setTimeout(function () {
            helperWrapper.style.transitionDuration =
              (childrenWidth / pxPerSecond).toFixed() + "s";
            helperWrapper.style.left = childrenWidth * -1 + "px";
          }, 0);
        }
      }
      requestAnimationFrame(scrollTheBanners);
    }
  };

  horizontalScrollingBanner();

// Ameer part
var counter=1;
        setInterval(function() {
            document.getElementById('radio' + counter).checked=true;
            counter++;
            if(counter > 4) {
                counter = 1;
            }
        },5000);


  
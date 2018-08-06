/* TO DO LIST
1. DONE opravit dropDown, scroluje to o jedno nizsie chyba bude asi v autoscrolle treba ho vypnut skor
2. opravit navbar, niekedy sa objavi az po scroll action
3. hodit cely pojekt na git
4. doplnit fotky co poslala Linda 
5.spravit mobilnu verziu
6.skontrolovat ci su animacne veci podporvanie vsetkymi prehliadacmi
7.zrefaktorovat kod*/
var portMode = false;
var triangleMode = false;
var street = document.querySelector("#street");
var fantasyH2 = document.querySelector("#fantasy h2");
var section1 = document.querySelector("#section1");
var section2 = document.querySelector("#section2");
var section3 = document.querySelector("#section3");
var section4 = document.querySelector("#section4");
var tglc = document.querySelector("#tglc");
var portfolio = document.querySelector("#portfolio");
var imgCollection = document.querySelector("#imgCollection");
var categoryImg = document.querySelectorAll(".category section img");
var categoryP = document.querySelectorAll(".category section p");
var categoryH3 = document.querySelectorAll(".category section h3");
var catSection = document.querySelectorAll(".category section");
var catH2 = document.querySelectorAll(".category h2");
var tmpOffset = section3.offsetTop;
var currentOffset = 0;
var dd = false;
const wHeight = window.innerHeight;
//WHAT TO HAPPEN AFTER SCROLL
window.addEventListener("scroll", scrollHandler);

function scrollHandler() {
  stickyNav();
  if (portMode) {
    if (window.pageYOffset >= currentOffset) {
      pageScrollPlus();
      currentOffset = window.pageYOffset;
    } else {
      pageScrollMinus();
      currentOffset = window.pageYOffset;
    }
  }
}

//STICKY NAVBAR
function stickyNav() {
  //no portMode
  if (!portMode && !triangleMode) {
    if (window.pageYOffset >= tmpOffset) {
      section3.classList.add("fixed");
      section4.classList.add("fixed");
    } else {
      section3.classList.remove("fixed");
      section4.classList.remove("fixed");
    }
  } //portMode activated
  else if (portMode) {
    section3.classList.add("fixed");
    section4.classList.add("fixed");
  }

}

//SETTING UP IMAGES IN PORTFOLIO
function setPortImages() {
  imgCollection.style.display = "block";
  street.style.display = "block";
  for (var j = 0; j < catSection.length; j++) {
    catSection[j].style.height = wHeight.toString() + "px";
  }
  for (var j = 0; j < 3; j++) {
    catH2[j].style.height = wHeight.toString() + "px";
  }
}

//PORTFOLIO BUTTON
portfolio.addEventListener("click", function () {
  if (!portMode) {
    setPortfolio();
  }

});
document.querySelector("#section4 h2").addEventListener("click", setPortfolio);

function setPortfolio() {
  if (window.innerWidth >= 768) {
    //camera on beginning
    if (window.pageYOffset <= 0) {
      portMode = true;
      setPortImages();

      section4.style.display = "none";
      tglc.style.marginTop = (-tmpOffset.toString()) + "px";
      document.querySelector("#fantasy h2").style.opacity = "1";

      setTimeout(function () {
        tglc.style.display = "none";
        section3.style.marginTop = "0"
      }, 1200);

      initDropDown();

    }
    //camera below begining page
    else {
      section1.style.opacity = "0";
      section2.style.opacity = "0";
      section3.style.opacity = "0";
      section4.style.opacity = "0";
      document.querySelector("#section5").style.opacity = "0";
      document.querySelector("#section6").style.opacity = "0";

      setTimeout(function () {
        scrollTo(0, 0);
      }, 500);

      setTimeout(function () {
        portMode = true;
        setPortImages();
        section1.style.display = "none";
        section2.style.display = "none";
        section4.style.display = "none";
        section3.classList.add("fixed");
        section3.style.opacity = "1";
      }, 700);

      setTimeout(function () {
        document.querySelector("#fantasy").classList.add("active");
      }, 750);

      initDropDown();

    }
  }
}

var x = true;
//PAGE SCROLL
function pageScrollPlus() {
  if (x) {
    var y = setInterval(function () {
      //prva faza +
      for (var i = 0; i < categoryImg.length + 2; i++) {
        if ((window.pageYOffset >= (i * wHeight)) && (window.pageYOffset < ((i + 1) * wHeight))) {
          window.scrollBy(0, 3.5);
          if (window.pageYOffset > ((i + 1) * (wHeight - 1))) {
            clearInterval(y);
          };
          x = false;
        }
      }
    }, 1);
  }
  x = true;
}

function pageScrollMinus() {
  if (x) {
    var y = setInterval(function () {
      //prva faza +
      for (var i = categoryImg.length + 2; i > 0; i--) {
        if ((window.pageYOffset < i * wHeight) && (window.pageYOffset >= (i - 1) * wHeight)) {
          window.scrollBy(0, -2.5);
          if (window.pageYOffset <= (i - 1) * wHeight) {
            clearInterval(y);
          };
          x = false;
        }
      }
    }, 1);
  }
  x = true;
}

//CLICK IMG IN PORTFOLIO
/* toto je riesene velmi neefektivne a skaredo! */
var g = document.getElementById('my_div');
clicked = false;
for (var i = 0; i < categoryImg.length; i++) {

  (function (index) {
    categoryImg[i].onclick = function () {
      if (!clicked) {
        categoryImg[index].style.width = "28vw";
        categoryImg[index].style.top = "50%";
        categoryImg[index].style.left = "50%";
        categoryImg[index].style.transform = "translate(-50%, -50%)";
        categoryP[index].style.opacity = "0"
        categoryH3[index].style.opacity = "0";
        clicked = true;
      } else {
        categoryImg[index].style.width = "20vw";
        categoryImg[index].style.top = "50%";
        categoryImg[index].style.left = "25%";
        categoryImg[index].style.transform = "translate(-25%, -50%)";
        categoryP[index].style.opacity = "1"
        categoryH3[index].style.opacity = "1";
        clicked = false;
      }
    }
  })(i);
}


//TRIANGLES ANCHOR
for (var i = 1; i < 11; i++) {
  if (i < 3) document.querySelector("#section1 div:nth-child(" + i + ")").addEventListener("click", function () {
    catScroll("#fantasy h2", 40, false)
  });
  if ((i > 2) && (i < 9)) document.querySelector("#section1 div:nth-child(" + i + ")").addEventListener("click", function () {
    catScroll("#street h2", 40, true)
  });
  if (i > 8) document.querySelector("#section1 div:nth-child(" + i + ")").addEventListener("click", function () {
    catScroll("#real h2", 40, true)
  });
}

function catScroll(category, speed, scr) {
  triangleMode = true;
  portMode = true;

  section3.classList.add("fixed");
  section4.classList.add("fixed");
  section4.style.display = "none";

  document.querySelector("#fantasy h2").style.opacity = "1";
  tglc.style.marginTop = "-450px";

  setPortImages();

  if (scr) {
    scroll(speed, category);
  }
}


//DROPDOWN MENU
//anchor
document.querySelector("#fantasyNav").addEventListener("click", function () {
  //vypnut autoscroll
  section3.classList.add("fixed");
  section4.classList.add("fixed");
  scroll(30, "#fantasy h2", 3000);
});

document.querySelector("#realNav").addEventListener("click", function () {
  //vypnut autoscroll
  section3.classList.add("fixed");
  section4.classList.add("fixed");
  scroll(20, "#real h2", 2000);
});

document.querySelector("#streetNav").addEventListener("click", function () {
  //vypnut autoscroll
  section3.classList.add("fixed");
  section4.classList.add("fixed");
  scroll(25, "#street h2", 2500);
});

//hover over portfolio button
portfolio.addEventListener("mouseover", function () {
  if (portMode && dd) {
    document.querySelector("#portfolio").classList.add("active");
  }
});

portfolio.addEventListener("mouseout", function () {
  if (portMode && dd) {
    document.querySelector("#portfolio").classList.remove("active");
  }
});

//this animation is made just once, after setting up portfolio
function initDropDown() {
  document.querySelector("#portfolio div").style.display = "block";
  setTimeout(function () {

    document.querySelector("#portfolio").classList.add("active");
  }, 1000);

  setTimeout(function () {
    dd = true;
    document.querySelector("#portfolio").classList.remove("active");
  }, 2500);
}




//GET TOP OFFSET (FROM THE TOP OF THE PAGE)
var getOffsetTop = function (elem) {
  var distance = 0;

  if (elem.offsetParent) {
    do {
      distance += elem.offsetTop;
      elem = elem.offsetParent;
    } while (elem);
  }
  return distance < 0 ? 0 : distance;
};





//CUSTOM SLOW-ANIMATED SCROLL
function scroll(speed, destination, delay) {
  var elem = document.querySelector(destination);
  var offset = getOffsetTop(elem);

  window.removeEventListener("scroll", scrollHandler);
  var y = setInterval(function () {
    //if scroll down 

    if (offset > currentOffset) {
      currentOffset = window.pageYOffset;
      if (window.pageYOffset >= offset) {
        clearInterval(y);
      };
      window.scrollBy(0, speed);
    }
    //if scroll up
    else if (offset < currentOffset) {
      currentOffset = window.pageYOffset;
      if (window.pageYOffset <= offset) {
        clearInterval(y);
      };
      window.scrollBy(0, -speed);
    }
    else if(offset == currentOffset){
      console.log("nothing should happen");
      currentOffset = window.pageYOffset;
      clearInterval(y);

    }
  }, 1);
  setTimeout(function () {
    window.addEventListener("scroll", scrollHandler);
  }, delay);
}

/* SLOW SCROLLING DOWN */
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
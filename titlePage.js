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
var imgCollectionImg = document.querySelectorAll("#imgCollection img");
var categoryImg = document.querySelectorAll(".category section img");
var categoryP = document.querySelectorAll(".category section p");
var categoryH3 = document.querySelectorAll(".category section h3");
var catSection = document.querySelectorAll(".category section");
var catH2 = document.querySelectorAll(".category h2");
var tmpOffset = section3.offsetTop;
var currentOffset = 0;
var dd = false; //allowance of hovering over portfolio menu
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
      document.querySelector("#fantasy h2 span").style.marginTop = "-41px";
      document.querySelector("#fantasy h2 section").style.marginTop = "-41px";
      portMode = true;
      setPortImages();
      section4.style.display = "none";

      tglc.style.marginTop = ((-tmpOffset).toString()) + "px";
      document.querySelector("#fantasy h2").style.opacity = "1";

      setTimeout(function () {
        tglc.style.display = "none";
        section3.style.marginTop = "0";
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
        document.querySelector("#section5").style.opacity = "1";
        document.querySelector("#section6").style.opacity = "1";
      }, 750);

      initDropDown();
    }
  }
}




var x = true;
//PAGE SCROLL
function pageScrollPlus() {
  document.querySelector("#fantasy h2 span").style.marginTop = "0px";
  document.querySelector("#fantasy h2 section").style.marginTop = "0px";
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
      for (var i = categoryImg.length + 20; i > 0; i--) { //TU JE ZMENA TOTO OPRAVIT
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
var clicked = false;

for (var i = 0; i < categoryImg.length; i++) {

  (function (index) {
    categoryImg[i].onclick = function () {

      if (!clicked) {
        categoryImg[index].style.height = (screen.height - 170).toString() + "px";
        categoryImg[index].style.top = "50%";
        categoryImg[index].style.left = "50%";
        categoryImg[index].style.transform = "translate(-50%, -50%)";
        categoryP[index].style.opacity = "0"
        categoryH3[index].style.opacity = "0";
        section3.style.opacity = "0";
        document.querySelector("body").style.backgroundColor = "rgb(48, 47, 47)";
        categoryImg[index].style.cursor = "auto";
        clicked = true;
      } else {

        normalizeImg(index);
        clicked = false;
      }
      window.onscroll = function () {
        normalizeImg(index);
      }


    }
  })(i);
}
/* 
document.querySelector("body").addEventListener("click", function(){
  if (!j){
    j = true;
  } else normalizeImg(index);
}); */



function normalizeImg(index) {
  document.querySelector("body").style.backgroundColor = "white";
  clicked = false;
  if (categoryImg[index].height / categoryImg[index].width < 1) {
    categoryImg[index].style.height = "18vw";
  } else {
    categoryImg[index].style.height = "30vw";
  }
  categoryImg[index].style.top = "50%";
  categoryImg[index].style.left = "25%";
  categoryImg[index].style.transform = "translate(-25%, -50%)";
  categoryP[index].style.opacity = "1"
  categoryH3[index].style.opacity = "1";
  section3.style.opacity = "1";
  categoryImg[index].style.cursor = "pointer";
}

//TRIANGLES ANCHOR
for (var i = 1; i < 10; i++) {
  if (i < 3) document.querySelector("#section1 div:nth-child(" + i + ")").addEventListener("click", function () {
    trianglePortfolioset("#fantasy h2");
  });

  if ((i > 2) && (i < 9)) document.querySelector("#section1 div:nth-child(" + i + ")").addEventListener("click", function () {
    trianglePortfolioset("#real h2");
  });
  if (i > 8) document.querySelector("#section1 div:nth-child(" + i + ")").addEventListener("click", function () {
    trianglePortfolioset("#street h2");
  });
}



function trianglePortfolioset(destination) {
  section1.style.opacity = "0";
  section2.style.opacity = "0";
  section3.style.opacity = "0";
  section4.style.opacity = "0";

  document.querySelector("#portfolio div").style.display = "block";
  section3.classList.add("fixed");
  section4.classList.add("fixed");


  setTimeout(function () {
    portMode = true;
    setPortImages();
    dd = true;
    window.removeEventListener("scroll", scrollHandler);

    section1.style.display = "none";
    section2.style.display = "none";
    section4.style.display = "none";

    document.querySelector("#portfolio div").style.display = "block";
    section3.classList.add("fixed");
    section4.classList.add("fixed");
    section3.style.opacity = "1";
  }, 700);

  setTimeout(function () {
    elem = document.querySelector(destination);
    offset = getOffsetTop(elem);
    window.scrollTo(0, offset);
    document.querySelector("#fantasy").classList.add("active");
  }, 750);

  setTimeout(function () {
    window.addEventListener("scroll", scrollHandler);
  }, 1000);
}


//DROPDOWN MENU
//anchor
document.querySelector("#fantasyNav").addEventListener("click", function () {

  section3.classList.add("fixed");
  section4.classList.add("fixed");
  scroll(30, "#fantasy h2", 3000);
});

document.querySelector("#realNav").addEventListener("click", function () {

  section3.classList.add("fixed");
  section4.classList.add("fixed");
  scroll(20, "#real h2", 2000);
});

document.querySelector("#streetNav").addEventListener("click", function () {

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

  setTimeout(function () {
    imgCollection.style.opacity = "0";
    street.style.opacity = "0";
  }, 0);

  setTimeout(function () {
    window.scrollTo(0, offset);
  }, 900);

  setTimeout(function () {
    imgCollection.style.opacity = "1";
    street.style.opacity = "1";
  }, 1000);


  setTimeout(function () {
    window.addEventListener("scroll", scrollHandler);
  }, 1500);
}

//ANIMATED ARROW
var arrows = document.querySelectorAll(".arrow a")
for (var i = 0; i < 3; i++) {
  arrows[i].addEventListener("click", function () {
    window.scrollBy(0, 50);
  });
}
//FIX
//adjusting images to approprite height in relevance with their ratio

for (var i = 0; i < imgCollectionImg.length; i++) {
  ratio = imgCollectionImg[i].height / imgCollectionImg[i].width;
  if (ratio < 1) {
    imgCollectionImg[i].style.height = "18vw";
  }
}

//disapperaing section 4 in main mode
window.onscroll = function () {

  if (!portMode) {
    offset = getOffsetTop(section5);
    if (window.pageYOffset > offset - 400) {
      section4.style.opacity = "0";
    }
    else {
      section4.style.opacity = "1";
    }
  }
}
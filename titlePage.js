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
var img = document.querySelectorAll("#section4 img");
var tmpOffset = section3.offsetTop;
var currentOffset = 0;
var dd = false; //allowance of hovering over portfolio menu
const wHeight = window.innerHeight;
var desktopMode;
var mobileMode;
(window.innerWidth > 768) ? desktopMode = true: mobileMode = true;

//WHAT TO HAPPEN AFTER SCROLL
window.addEventListener("scroll", scrollHandler);

function scrollHandler() {
  stickyNav();
  if (portMode && desktopMode) {
    if (window.pageYOffset >= currentOffset) {
      fadingSurrounedImagesDown();
      currentOffset = window.pageYOffset;
    } else {
      fadingSurrounedImagesUp();
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
  if (desktopMode) {
    for (var j = 0; j < catSection.length; j++) {
      catSection[j].style.height = wHeight.toString() + "px";
    }
    for (var j = 0; j < 3; j++) {
      catH2[j].style.height = wHeight.toString() + "px";
    }
  }


}


//PORTFOLIO BUTTON
portfolio.addEventListener("click", function () {
  if (!portMode) {
    setPortfolio();
    enableNormalizeImg();
  }
});
document.querySelector("#section4 h2").addEventListener("click", function () {
  setPortfolio();
  enableNormalizeImg();
});

function setPortfolio() {
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






//CLICK IMG IN PORTFOLIO
var clicked = false;
for (var i = 0; i < categoryImg.length; i++) {

  (function (index) {
    categoryImg[i].onclick = function () {

      if (!clicked) {
        straigtener(index);
        setTimeout(function () {
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
          testClicked = true;
        }, 250);

      } else {
        clicked = false;
      }
      setTimeout(function () {
        window.onscroll = function () {
          normalizeImg(index);
        }
      }, 300);

    }
  })(i);
}


function enableNormalizeImg() {
  document.querySelector("body").addEventListener("click", function () {
    if (portMode && desktopMode) {
      for (var i = 0; i < categoryImg.length; i++) {
        normalizeImg(i);
      }
    }
  });
}


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
//IMG IN PORTFOLIO CENTERING TO MIDDLE 
function straigtener(index) {
  imgHeight = categoryImg[index].height;
  imgScreenOffset = (wHeight - imgHeight) / 2;
  var distanceToTop = categoryImg[index].getBoundingClientRect().top;
  if (distanceToTop > imgScreenOffset) {
    var interval = setInterval(function () {
      window.scrollBy(0, 3.5);
      var distanceToTop = categoryImg[index].getBoundingClientRect().top;
      if (distanceToTop < imgScreenOffset) {
        clearInterval(interval);
      }
    }, 5);
  }

  if (distanceToTop < imgScreenOffset) {
    var interval = setInterval(function () {
      window.scrollBy(0, -3.5);
      var distanceToTop = categoryImg[index].getBoundingClientRect().top;
      if (distanceToTop > imgScreenOffset) {
        clearInterval(interval);
      }
    }, 5);
  }

}
//TRIANGLES PORTFOLIO SET ANCHOR
for (var i = 1; i < 10; i++) {
  if (i < 3) document.querySelector("#section1 div:nth-child(" + i + ")").addEventListener("click", function () {
    fadeInOutPortfolioset("#fantasy h2",0);
    enableNormalizeImg();
  });

  if ((i > 2) && (i < 9)) document.querySelector("#section1 div:nth-child(" + i + ")").addEventListener("click", function () {
    fadeInOutPortfolioset("#real h2",0);
    enableNormalizeImg();
  });
  if (i > 8) document.querySelector("#section1 div:nth-child(" + i + ")").addEventListener("click", function () {
    fadeInOutPortfolioset("#street h2",0);
    enableNormalizeImg();
  });
}


// PORTFOLIO PREVIEW TO PORTFOLIOSET ANCHOR
img[0].addEventListener("click", function () {
  fadeInOutPortfolioset("#previewImg1", 350);
  enableNormalizeImg();
});
img[1].addEventListener("click", function () {
  fadeInOutPortfolioset("#previewImg2", 350);
  enableNormalizeImg();
});
img[2].addEventListener("click", function () {
  fadeInOutPortfolioset("#previewImg3", 350);
  enableNormalizeImg();
});
img[3].addEventListener("click", function () {
  fadeInOutPortfolioset("#previewImg4", 350);
  enableNormalizeImg();
});




function fadeInOutPortfolioset(destination, customOffset) {
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
    window.scrollTo(0, offset - customOffset);
    document.querySelector("#fantasy").classList.add("active");
  }, 750);

  setTimeout(function () {
    window.addEventListener("scroll", scrollHandler);
  }, 1000);
}


//DROPDOWN MENU
//anchor
if (desktopMode) {
  document.querySelector("#fantasyNav").addEventListener("click", function () {

    section3.classList.add("fixed");
    section4.classList.add("fixed");
    navLinker("#fantasy h2");
  });

  document.querySelector("#realNav").addEventListener("click", function () {

    section3.classList.add("fixed");
    section4.classList.add("fixed");
    navLinker("#real h2");
  });

  document.querySelector("#streetNav").addEventListener("click", function () {

    section3.classList.add("fixed");
    section4.classList.add("fixed");
    navLinker("#street h2");
  });
}
//hover over portfolio button
if (desktopMode) {
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





//CUSTOM FADING LINKER
function navLinker(destination) {
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
    for (var i = 0; i < catSection.length; i++) {
      catSection[i].style.opacity = "1";
    }
    window.addEventListener("scroll", scrollHandler);
  }, 1500);


}


//FIX
//adjusting images to approprite height in relevance with their ratio
if (desktopMode) {
  for (var i = 0; i < imgCollectionImg.length; i++) {
    ratio = imgCollectionImg[i].height / imgCollectionImg[i].width;
    if (ratio < 1) {
      imgCollectionImg[i].style.height = "18vw";
    }
  }
}

//disapperaing section 4 in main mode
window.onscroll = function () {
  if (!portMode) {
    offset = getOffsetTop(section5);
    if (desktopMode) {
      if (window.pageYOffset > offset - 400) {
        section4.style.opacity = "0";
      } else {
        section4.style.opacity = "1";
      }
    } else if (mobileMode) {
      if (window.pageYOffset > offset - 300) {
        section4.style.opacity = "0";
      } else {
        section4.style.opacity = "1";
      }
    }
  }
}

//MOUSEOVER HANDLER ON AUTHOR EMAIL REFERENCE IN FOOTER
var emailName = document.querySelector("footer address span");
var emailBoard = document.querySelector("footer address div");
var wholeEmail = document.querySelector("footer address div a");
emailName.addEventListener("mouseover", function () {
  document.querySelector("footer address div").style.opacity = "1";
  wholeEmail.style.cursor = "pointer";
  emailBoard.addEventListener("mouseover", function () {
    document.querySelector("footer address div").style.opacity = "1";
    wholeEmail.style.cursor = "pointer";
  });
});
emailName.addEventListener("mouseout", function () {
  document.querySelector("footer address div").style.opacity = "0";
  wholeEmail.style.cursor = "default";
});
emailBoard.addEventListener("mouseout", function () {
  document.querySelector("footer address div").style.opacity = "0";
  wholeEmail.style.cursor = "default";
});










// FADING IMAGES SURROUNED TARGETED IMG 
function fadingSurrounedImagesDown() {
  if (portMode) {
    imgIndex = window.pageYOffset / wHeight - 0.33;
    for (var i = 0; i < categoryImg.length + 2; i++) {
      if (imgIndex > i && imgIndex <= i + 1) {
        catSection[i].style.opacity = "0";
      }
    }
  }
}

function fadingSurrounedImagesUp() {
  if (portMode) {
    imgIndex = window.pageYOffset / wHeight - 0.33;
    for (var i = 0; i < categoryImg.length + 2; i++) {
      if (imgIndex > i && imgIndex <= i + 1) {
        catSection[i].style.opacity = "1";
      }
    }
  }
}

  //this animation is made just once, after setting up portfolio
  if (desktopMode) {
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
  }

  //LOADING DIFFERENT IMAGES IN PORTFOLIO PREVIEW IF MOBILEMODE IS ON
if (mobileMode) {
  img[0].src = "images/Real/IMG_8807.JPG";
  img[1].src = "images/fantazy/37851590_2064183830282905_6057014016146931712_n.jpg";
  img[2].src = "images/Street/36427035_2020025158032106_3361779114280222720_n.jpg";
  img[3].src = "images/Real/pastaMonster.JPG";
}
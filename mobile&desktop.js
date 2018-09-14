var street = document.querySelector("#street");
var fantasy = document.querySelector("#fantasy");
var real = document.querySelector("#real");
var fantasyH2 = document.querySelector("#fantasy h2");
var section1 = document.querySelector("#section1");
var section2 = document.querySelector("#section2");
var section3 = document.querySelector("#section3");
var section4 = document.querySelector("#section4");
var section5 = document.querySelector("#section5");
var section6 = document.querySelector("#section6");
var tglc = document.querySelector("#tglc");
var portfolio = document.querySelector("#portfolio");
var imgCollection = document.querySelector("#imgCollection");
var imgCollectionImg = document.querySelectorAll("#imgCollection img");
var categoryImg = document.querySelectorAll(".category section img");
var categoryP = document.querySelectorAll(".category section p");
var categoryH3 = document.querySelectorAll(".category section h3");
var catSection = document.querySelectorAll(".category section");
var imgFantasy = document.querySelectorAll("#fantasy img");
var h3Fantasy = document.querySelectorAll("#fantasy h3");
var pFantasy = document.querySelectorAll("#fantasy p");
var imgReal = document.querySelectorAll("#real img");
var h3Real = document.querySelectorAll("#real h3");
var pReal = document.querySelectorAll("#real p");
var imgSection = document.querySelectorAll(".imgSection");
var catH2 = document.querySelectorAll(".category h2");
var img = document.querySelectorAll("#section4 img");
var body = document.querySelector("body");
var tmpOffset = section3.offsetTop;
var currentOffset = 0;
var portMode = false;
var triangleMode = false;
var desktopMode = false;
var mobileMode = false;
var clicked = false;
var dd = false; //allowance of hovering over portfolio menu
const wHeight = window.innerHeight;
(window.innerWidth > 768) ? desktopMode = true: mobileMode = true;

//-------------------------------IMG CONTROLLERS------------------------------
//CLICK IMG IN PORTFOLIO
if (desktopMode) {
    for (var i = 0; i < categoryImg.length; i++) {
        (function (index) {
            categoryImg[i].onclick = function () {

                if (!clicked) {
                    imgCenterer(index);
                   enlargeImage(index);

                } else {
                    clicked = false;
                    goToBelowImage();

                }
                setTimeout(function () {
                    window.onscroll = function () {
                        normalizeImg(index);
                    }
                }, 300);
            }
        })(i);
    }
}


function enlargeImage(index){
    setTimeout(function () {
        categoryImg[index].style.height = (screen.height - 170).toString() + "px";
        categoryImg[index].style.top = "50%";
        categoryImg[index].style.left = "50%";
        categoryImg[index].style.transform = "translate(-50%, -50%)";
        categoryP[index].style.opacity = "0"
        section3.style.backgroundColor = "rgb(48, 47, 47)";
        categoryH3[index].style.opacity = "0";
        section3.style.opacity = "0";
       body.style.backgroundColor = "rgb(48, 47, 47)";
        categoryImg[index].style.cursor = "auto";
        body.style.cursor = "pointer";
        categoryImg[index].style.curso = "default";
        clicked = true;
        testClicked = true;
    }, 300);
}

function enableNormalizeImg() {
    if (desktopMode) {
        body.addEventListener("click", function () {
            if (portMode && desktopMode) {
                for (var i = 0; i < categoryImg.length; i++) {
                    normalizeImg(i);
                }
            }
        });
    } 
document.onkeydown = function(e){
    var keyCode = e.keyCode;
    if ((keyCode === 27) && portMode && desktopMode) {
        for (var i = 0; i < categoryImg.length; i++) {
            normalizeImg(i);
        }
    }
    if ((keyCode === 40) && portMode && desktopMode && clicked) {
            goToBelowImage(); 
    }
    if ((keyCode === 38) && portMode && desktopMode && clicked) {
        goToAboveImage(); 
}
    if ((keyCode === 13) && portMode && desktopMode) {
        for (var i = 0; i < categoryImg.length; i++) {
            enlargeImage(i);
        } 
}
}

}
//after clicking on image in preview mode linking to another
function goToBelowImage(){
    scrolled = 0;
interval = setInterval(function(){
scrollBy(0, 10);
scrolled += 10;
if (scrolled > wHeight) clearInterval(interval);
},10);
}
function goToAboveImage(){
    scrolled = 0;
interval = setInterval(function(){
scrollBy(0, -10);
scrolled += 10;
if (scrolled > wHeight) clearInterval(interval);
},10);
}
//setting img characteristic to origin state
function normalizeImg(index) {
    body.style.backgroundColor = "white";
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
    section3.style.backgroundColor = "white";
    section3.style.opacity = "1";
    categoryImg[index].style.cursor = "pointer";
    body.style.cursor = "default";
}
//IMG IN PORTFOLIO CENTERING TO MIDDLE 
function imgCenterer(index) {
    imgHeight = categoryImg[index].height;
    imgScreenOffset = (wHeight - imgHeight) / 2;
    var distanceToTop = categoryImg[index].getBoundingClientRect().top;
    if (distanceToTop > imgScreenOffset+10) {
        var interval = setInterval(function () {
            window.scrollBy(0, 12);
            var distanceToTop = categoryImg[index].getBoundingClientRect().top;
            if (distanceToTop < imgScreenOffset) {
                clearInterval(interval);
            }
        }, 5);
    }

    if (distanceToTop < imgScreenOffset-10) {
        var interval = setInterval(function () {
            window.scrollBy(0, -12);
            var distanceToTop = categoryImg[index].getBoundingClientRect().top;
            if (distanceToTop > imgScreenOffset) {
                clearInterval(interval);
            }
        }, 5);
    }
}


//------------------EXPLORING CLICKABLE AND HOVERABLE THINGS-------------------

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
    imgCollection.style.opacity = "0";

    section5.style.opacity = "0";
    section6.style.opacity = "0";

    setTimeout(function () {
        scrollTo(0, 0);
        portMode = true;
    }, 500);

    setTimeout(function () {
        setPortImages();

        section1.style.display = "none";
        section2.style.display = "none";
        section4.style.display = "none";
        section3.classList.add("fixed");
        section3.style.opacity = "1";

    }, 700);

    setTimeout(function () {
        document.querySelector("#fantasy").classList.add("active");
        section5.style.opacity = "1";
        section6.style.opacity = "1";
        imgCollection.style.opacity = "1";
    }, 750);

    initDropDown();
    if (mobileMode) setStateOfportfolioFirstView();
}

//DROPDOWN MENU
//hover over portfolio button
portfolio.addEventListener("mouseover", function () {
    if (portMode && dd) {
        setTimeout(function () {
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
        }, 500);
        document.querySelector("#portfolio").classList.add("active");
    }
});
portfolio.addEventListener("mouseout", function () {
    if (portMode && dd) {
        document.querySelector("#portfolio").classList.remove("active");

    }
});

//LINKERS FROM TRIANGLE PATTERS TO CATEGORIES
if (desktopMode) {
    for (var i = 1; i < 10; i++) {
        if (i < 3) document.querySelector("#section1 div:nth-child(" + i + ")").addEventListener("click", function () {
            fadeInOutPortfolioset("#fantasy h2", 0);
            enableNormalizeImg();
        });

        if ((i > 2) && (i < 9)) document.querySelector("#section1 div:nth-child(" + i + ")").addEventListener("click", function () {
            fadeInOutPortfolioset("#real h2", 0);
            enableNormalizeImg();
        });
        if (i > 8) document.querySelector("#section1 div:nth-child(" + i + ")").addEventListener("click", function () {
            fadeInOutPortfolioset("#street h2", 0);
            enableNormalizeImg();
        });
    }
}
if (mobileMode) {
    document.querySelector("#section1 div:nth-child(1)").addEventListener("click", function () {
        fadeInOutPortfolioset("#fantasy h2", 80);
        enableNormalizeImg();
    });

    document.querySelector("#section1 div:nth-child(2)").addEventListener("click", function () {
        fadeInOutPortfolioset("#real h2", 80);
        enableNormalizeImg();
    });

    document.querySelector("#section1 div:nth-child(3)").addEventListener("click", function () {
        fadeInOutPortfolioset("#street h2", 80);
        enableNormalizeImg();
    });
}

//CUSTOM FADING LINKER
function navLinker(destination) {
    var elem = document.querySelector(destination);
    var offset = getOffsetTop(elem);
    var customOffset = 0;
    if (mobileMode) customOffset = 200;
    window.removeEventListener("scroll", scrollHandler);

    setTimeout(function () {
        imgCollection.style.opacity = "0";
        street.style.opacity = "0";
    }, 0);

    setTimeout(function () {
        window.scrollTo(0, offset - customOffset);
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

// PORTFOLIO PREVIEW TO PORTFOLIOSET ANCHOR EVENT LISTENTERS
if (desktopMode) {
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
}
if (mobileMode) {
    img[0].addEventListener("click", function () {
        fadeInOutPortfolioset("#previewImg5", 200);
        enableNormalizeImg();
    });
    img[1].addEventListener("click", function () {
        fadeInOutPortfolioset("#previewImg6", 200);
        enableNormalizeImg();
    });
    img[2].addEventListener("click", function () {
        fadeInOutPortfolioset("#previewImg7", 200);
        enableNormalizeImg();
    });
    img[3].addEventListener("click", function () {
        fadeInOutPortfolioset("#previewImg8", 200);
        enableNormalizeImg();
    });
}



//LINKER TO CERTAIN PART OF PORTFOLIO
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
        imgCollection.style.opacity = "0";


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
        imgCollection.style.opacity = "1";
    }, 750);

    setTimeout(function () {
        window.addEventListener("scroll", scrollHandler);
    }, 1000);
}
var arrows = document.querySelectorAll(".arrow a");
//ANIMATED ARROW SCROLLING PAGE DOWN
if (desktopMode) {
        arrows[0].addEventListener("click", function () {
            var interval1 = setInterval(function () {
                window.scrollBy(0, 3.5);
                if (arrows[0].getBoundingClientRect().top < -100) {
                    clearInterval(interval1);
                }
            }, 5);
        });

        arrows[1].addEventListener("click", function () {
            var interval1 = setInterval(function () {
                window.scrollBy(0, 3.5);
                if (arrows[1].getBoundingClientRect().top < -100) {
                    clearInterval(interval1);
                }
            }, 5);
        });

        arrows[2].addEventListener("click", function () {
            var interval1 = setInterval(function () {
                window.scrollBy(0, 3.5);
                if (arrows[2].getBoundingClientRect().top < -100) {
                    clearInterval(interval1);
                }
            }, 5);
        });
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

//-----------------------SCROLL HANDLERS-----------------------------------------------

//WHAT TO HAPPEN AFTER SCROLL
window.addEventListener("scroll", scrollHandler);

function scrollHandler() {
    stickyNav();
    if (window.pageYOffset >= currentOffset) {
        fadingSurrounedImagesDown();
        currentOffset = window.pageYOffset;
    } else {
        fadingSurrounedImagesUp();
        currentOffset = window.pageYOffset;
    }
}

//STICKY NAVBAR
function stickyNav() {
    //no portMode
    if (!portMode && !triangleMode) {
        if (window.pageYOffset >= tmpOffset) {
            section3.classList.add("fixed");
            section4.classList.add("fixed");
            section5.classList.add("fixed");
        } else {
            section3.classList.remove("fixed");
            section4.classList.remove("fixed");
            section5.classList.remove("fixed");
        }
    } //portMode activated
    else if (portMode) {
        section3.classList.add("fixed");
        section4.classList.add("fixed");
    }
}


// FADING IMAGES SURROUNED TARGETED IMG 
//while scrolling down
function fadingSurrounedImagesDown() {
    if (portMode) {
        if (desktopMode) {
            imgIndex = window.pageYOffset / wHeight - 0.33;
            for (var i = 0; i < categoryImg.length + 2; i++) {
                if (imgIndex > i && imgIndex <= i + 1) {
                    catSection[i].style.opacity = "0";
                }
            }
        }
        if (mobileMode) {
            for (var i = 1; i < imgFantasy.length; i++) {
                imgBordersOffset = (wHeight - imgFantasy[i].height) / 2;
                if ((imgFantasy[i].getBoundingClientRect().top > imgBordersOffset + wHeight * 0.1) && (imgFantasy[i].getBoundingClientRect().top < (wHeight - imgBordersOffset - wHeight * 0.1))) {
                    if (i != 0) {
                        imgFantasy[i - 1].style.opacity = "0";
                        h3Fantasy[i - 1].style.opacity = "0";
                        pFantasy[i - 1].style.opacity = "0";
                    }
                    if (i != imgFantasy.length - 1) {
                        imgFantasy[i + 1].style.opacity = "0";
                        h3Fantasy[i + 1].style.opacity = "0";
                        pFantasy[i + 1].style.opacity = "0";
                    }
                    imgFantasy[i].style.opacity = "1";
                    h3Fantasy[i].style.opacity = "1";
                    pFantasy[i].style.opacity = "1";
                }
            }
            for (var i = 0; i < imgReal.length; i++) {
                imgBordersOffset = (wHeight - imgReal[i].height) / 2;
                if ((imgReal[i].getBoundingClientRect().top > imgBordersOffset + wHeight * 0.1) && (imgReal[i].getBoundingClientRect().top < (wHeight - imgBordersOffset - wHeight * 0.1))) {
                    if (i != 0) {
                        imgReal[i - 1].style.opacity = "0";
                        h3Real[i - 1].style.opacity = "0";
                        pReal[i - 1].style.opacity = "0";
                    }
                    if (i != imgReal.length - 1) {
                        imgReal[i + 1].style.opacity = "0";
                        h3Real[i + 1].style.opacity = "0";
                        pReal[i + 1].style.opacity = "0";
                    }
                    imgReal[i].style.opacity = "1";
                    h3Real[i].style.opacity = "1";
                    pReal[i].style.opacity = "1";
                }
            }
        }
    }
}
//while scrolling up
function fadingSurrounedImagesUp() {
    if (portMode) {
        if (desktopMode) {
            imgIndex = window.pageYOffset / wHeight - 0.33;
            for (var i = 0; i < categoryImg.length + 2; i++) {
                if (imgIndex > i && imgIndex <= i + 1) {
                    catSection[i].style.opacity = "1";
                }
            }
        }
        if (mobileMode) {
            for (var i = 1; i < imgFantasy.length; i++) {
                imgBordersOffset = (wHeight - imgFantasy[i].height) / 2;
                if ((imgFantasy[i].getBoundingClientRect().top < imgFantasy[i].height)) {
                    if (i != 1) {
                        imgFantasy[i - 1].style.opacity = "0";
                        h3Fantasy[i - 1].style.opacity = "0";
                        pFantasy[i - 1].style.opacity = "0";
                    }
                    if (i != imgFantasy.length - 1) {
                        imgFantasy[i + 1].style.opacity = "0";
                        h3Fantasy[i + 1].style.opacity = "0";
                        pFantasy[i + 1].style.opacity = "0";
                    }
                    imgFantasy[i].style.opacity = "1";
                    h3Fantasy[i].style.opacity = "1";
                    pFantasy[i].style.opacity = "1";
                }
            }
            for (var i = 0; i < imgReal.length; i++) {
                imgBordersOffset = (wHeight - imgReal[i].height) / 2;
                if ((imgReal[i].getBoundingClientRect().top < imgReal[i].height)) {
                    if (i != 0) {
                        imgReal[i - 1].style.opacity = "0";
                        h3Real[i - 1].style.opacity = "0";
                        pReal[i - 1].style.opacity = "0";
                    }
                    if (i != imgReal.length - 1) {
                        imgReal[i + 1].style.opacity = "0";
                        h3Real[i + 1].style.opacity = "0";
                        pReal[i + 1].style.opacity = "0";
                    }
                    imgReal[i].style.opacity = "1";
                    h3Real[i].style.opacity = "1";
                    pReal[i].style.opacity = "1";
                }
            }

            if (imgFantasy[0].getBoundingClientRect().top > 0) imgFantasy[0].style.opacity = "1";
        }
    }
}

//-----------------------UX IMPROVERS------------------------------

//dropdown animation done just once after clicking on portfolio
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
        } else if (mobileMode && !portMode) {
            if (window.pageYOffset > offset - 300) {
                section4.style.opacity = "0";
            } else {
                section4.style.opacity = "1";
            }
          
        }
    }
    if (mobileMode){
    s5TopOffset =  document.querySelector("#section5 img").getBoundingClientRect().top;
    if (s5TopOffset > 200){
        section6.style.opacity = "0";
    } else {
     section6.style.opacity = "1";
    }
    footerBottomOffset = document.querySelector("footer").getBoundingClientRect().top;
    if (footerBottomOffset < wHeight-50){
        document.querySelector("#section5 p").style.opacity = "0";
    } else {
     document.querySelector("#section5 p").style.opacity = "1";
    }
}
}


//---------------------INITIAL SET UP FOR DESKTOP---------------------------------------------

//SETTING INIT STATE OF FIRST VIEW IN PORTFOLIO
function setStateOfportfolioFirstView() {
    var imgRatio = categoryImg[0].height / categoryImg[0].width;
    imgHeight = window.innerWidth * 0.8 * imgRatio;
    imgMargin = (window.innerHeight - imgHeight - window.innerHeight * 0.25) / 2;
    fantasyH2.style.marginTop = (imgMargin + 10).toString() + "px";
    fantasyH2.style.marginBottom = (imgMargin - 10).toString() + "px";
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



//---------------------INITIAL SET UP FOR MOBILE-------------------------

//LOADING DIFFERENT IMAGES IN PORTFOLIO PREVIEW IF MOBILEMODE IS ON
window = addEventListener("resize", loadMobileImages);
window.onload = loadMobileImages();

function loadMobileImages() {
    if (mobileMode) {
        img[0].src = "images/Real/IMG_8807.JPG";
        img[1].src = "images/fantazy/37851590_2064183830282905_6057014016146931712_n.jpg";
        img[2].src = "images/Street/36427035_2020025158032106_3361779114280222720_n.jpg";
        img[3].src = "images/Real/pastaMonster.JPG";
    }
}
//about me anchor
document.querySelector("#aboutMe").addEventListener("click", function(){
aboutMeOffset = getOffsetTop(section5);
    window.scrollTo(0, aboutMeOffset);
});



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


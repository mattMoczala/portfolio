//
//  main.js
//
//  Created on 6.10.2019 by Matt Moczala
//

// I know this is spaghetti code, that sucks. 
// All I can say is: I was in fuckin' hurry. 


let positions = ['.nav', '.about', '.projects', '.footer'];
let currPos = 0;
let aboutTyped = false,
    projectsTyped = false;


// scrollTop before load, to make sure website is at top
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}

// Initialize some scripts
window.onload = () => {

    AOS.init({
        once: true
    });
    initTypeWriter();
    setAuthorPhotoSize();
    // initScroll();
    document.addEventListener('keydown', checkKey);
    window.addEventListener("resize", setAuthorPhotoSize);

}

// Checks if element is contained in user's viewport
function isScrolledIntoView(elem) {
    let docViewTop = $(window).scrollTop();
    let docViewBottom = docViewTop + $(window).height();
    let elemTop = $(elem).offset().top;
    let elemBottom = elemTop + $(elem).height();
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

// When users scrolls to section, start typing it's header
$(window).scroll(function() {

    if (isScrolledIntoView($('#aboutmeHeader')) && !aboutTyped) {
        //the div is now visible to user. 
        aboutTyped = true;

        let app = document.getElementById('aboutmeHeader');

        let typewriter = new Typewriter(app, {
            loop: false,
            cursorClassName: 'aboutMeCursor'
        });

        typewriter.typeString('about me')
            .callFunction(() => {
                setInterval(() => {
                    $('.aboutMeCursor').hide();
                }, 300);
            })
            .start();

    } else if (isScrolledIntoView($('#projectsHeader')) && !projectsTyped) {
        //the div is now visible to user. 
        projectsTyped = true;

        aboutTyped = true;

        let app = document.getElementById('projectsHeader');

        let typewriter = new Typewriter(app, {
            loop: false,
            cursorClassName: 'projectsCursor'
        });

        typewriter.typeString('projects')
            .callFunction(() => {
                setInterval(() => {
                    $('.projectsCursor').hide();
                }, 300);
            })
            .start();

    }
});

// setSize of margins in felxbox, css had some issues, so here is a quick fix
function setAuthorPhotoSize() {
    let warpperHeight = document.querySelector('.photo').clientHeight;
    let photoHeight = document.querySelector('.authorPhoto').clientHeight;

    let margin = (warpperHeight - photoHeight) / 2;
    // 30 is a size of social icons
    document.getElementById('myPhoto').style.marginTop = `${margin-30}px`;

    let wrapperHeight = document.querySelector('.aboutWrapper').clientHeight;
    let aboutHeight = document.querySelector('.about').clientHeight;
    let resumeHeight = document.querySelector('.resumeWrapper').clientHeight;

    let quoteMargin = (wrapperHeight - aboutHeight - resumeHeight) / 2;
    console.log(quoteMargin, wrapperHeight, aboutHeight, resumeHeight);
    document.querySelector('.quoteWrapper').style.marginTop = `${quoteMargin-30}px`;

}

// Enable scroll on arrow-keys
function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        // UP
        e.preventDefault();
        if (currPos > 0) {
            currPos--;
            document.querySelector(positions[currPos]).scrollIntoView({
                behavior: 'smooth',
            });
        }
    } else if (e.keyCode == '40') {
        // DOWN
        e.preventDefault();
        if (currPos < 3) {
            currPos++;
            // console.log(positions[currPos]);
            document.querySelector(positions[currPos]).scrollIntoView({
                behavior: 'smooth'
            });

        }
    }
}

// Typewriter in main section
function initTypeWriter() {
    let app = document.getElementById('app');

    let typewriter = new Typewriter(app, {
        loop: true,
        cursorClassName: 'typewriterCursor'
    });

    typewriter.typeString('developer')
        .pauseFor(1200)
        .deleteAll()
        .typeString('car enthusiast')
        .pauseFor(1200)
        .deleteAll()
        .typeString('prograen')
        .pauseFor(100)
        .deleteChars(2)
        .typeString('mmer')
        .pauseFor(1200)
        .deleteAll()
        .typeString('geek')
        .pauseFor(1200)
        .start();
}

// Garbage, might delete it later
function initScroll() {
    let scrollableElement = document.body;

    scrollableElement.addEventListener('wheel', findScrollDirectionOtherBrowsers);

    function findScrollDirectionOtherBrowsers(event) {
        let delta;

        if (event.wheelDelta) {
            delta = event.wheelDelta;
        } else {
            delta = -1 * event.deltaY;
        }

        if (delta < 0) {
            console.log("DOWN");
            if (currPos < 3) {

                document.querySelector(positions[currPos + 1]).scrollIntoView({
                    behavior: 'smooth'
                });
                currPos++;
            }
        } else if (delta > 0) {
            console.log("UP");
            if (currPos > 0) {

                document.querySelector(positions[currPos - 1]).scrollIntoView({
                    behavior: 'smooth'
                });
                currPos--;
            }
        }

    }
}

function about() {
    document.querySelector('.about').scrollIntoView({
        behavior: 'smooth'
    });
    currPos = 1;
}

function projects() {
    document.querySelector('.projects').scrollIntoView({
        behavior: 'smooth'
    });
    currPos = 2;
}
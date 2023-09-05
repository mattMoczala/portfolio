//
//  main.js
//
//  Created on 6.10.2019 by Matt Moczala
//

let positions = ['.nav', '.about', '.projects', 'timeline', '.footer'];
let currPos = 0;
let aboutTyped = false,
    projectsTyped = false;
    timelineTyped = false;
    mmTyped = false;
let globe,
    globeCount = 0;

let app;


// scrollTop before load, to make sure website is at top
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

// Initialize some scripts
document.addEventListener("DOMContentLoaded", () => {


    AOS.init({
        once: true
    });
    initTypeWriter();
    setAuthorPhotoSize();
    document.addEventListener('keydown', checkKey);
    window.addEventListener("resize", setAuthorPhotoSize);
    createGlobe();
    if( window.innerWidth < 765) {
        setUpForMobile()
    }

})

const setUpForMobile = () => {
    document.querySelector('#navName').innerHTML = 'MM';
}

function createGlobe() {
    globeCount++;

    globe = new ENCOM.Globe(window.innerWidth > 765 ? window.innerWidth*0.6 : window.innerWidth, window.innerHeight, {
        font: "Inconsolata",
        data: [],
        tiles: grid.tiles,
        baseColor: "#000000",
        markerColor: "#8e44ad",
        pinColor: "#aacfd1",
        satelliteColor: "#aacfd1",
        scale: 1,
        dayLength: 14000,
        introLinesDuration: 2000,
        maxPins: 500,
        maxMarkers: 4,
        viewAngle: 0.1
    });

    $("#globe").append(globe.domElement);
    globe.init(start);
}

function onWindowResize() {
    globe.camera.aspect = window.innerWidth / window.innerHeight;
    globe.camera.updateProjectionMatrix();
    globe.renderer.setSize(window.innerWidth, window.innerHeight);

}

function roundNumber(num) {
    return Math.round(num * 100) / 100;
}

function projectionToLatLng(width, height, x, y) {

    return {
        lat: 90 - 180 * (y / height),
        lon: 360 * (x / width) - 180,
    };

}

function animate() {

    if (globe) {
        globe.tick();
    }

    lastTickTime = Date.now();

    requestAnimationFrame(animate);
}

function start() {

    if (globeCount == 1) { // only do this for the first globe that's created. very messy
        animate();
    }


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
$(window).scroll(function () {

    if (isScrolledIntoView($('#aboutmeHeader')) && !aboutTyped) {
        aboutTyped = true;

        const app = new TypewriterLight("aboutmeHeader", {
            speed: 200,
            cursorSpeed: 500,
            cursorColor: "#4ecca3",
            endDot: true,
        });
    
        app.queue.add(
            [
                app.wait.bind(app, 300),
                app.type.bind(app, "about me"),
            ],
            false
        );

    } else if (isScrolledIntoView($('#projectsHeader')) && !projectsTyped) {
        //the div is now visible to user. 
        projectsTyped = true;

        const app = new TypewriterLight("projectsHeader", {
            speed: 200,
            cursorSpeed: 500,
            cursorColor: "#4ecca3",
            endDot: true,
        });
    
        app.queue.add(
            [
                app.wait.bind(app, 300),
                app.type.bind(app, "projects"),
            ],
            false
        );

    } else if (isScrolledIntoView($('#timelineHeader')) && !timelineTyped) {
        //the div is now visible to user. 
        timelineTyped = true;

        const app = new TypewriterLight("timelineHeader", {
            speed: 200,
            cursorSpeed: 500,
            cursorColor: "#4ecca3",
            endDot: true,
        });
    
        app.queue.add(
            [
                app.wait.bind(app, 300),
                app.type.bind(app, "timeline"),
            ],
            false
        );
    }

    if (isScrolledIntoView($('.scrollDownWrapper'))) {
        document.getElementById('mainNav').classList.remove('withBorder')
    } else {
        document.getElementById('mainNav').classList.add('withBorder')
    }
});

function setAuthorPhotoSize() {
    let warpperHeight = document.querySelector('.photo').clientHeight;
    let photoHeight = document.querySelector('.authorPhoto').clientHeight;

    let margin = (warpperHeight - photoHeight) / 2;
    // 30 is a size of social icons
    document.getElementById('myPhoto').style.marginTop = `${margin - 30}px`;

    let wrapperHeight = document.querySelector('.aboutWrapper').clientHeight;
    let aboutHeight = document.querySelector('.about').clientHeight;
    let resumeHeight = document.querySelector('.resumeWrapper').clientHeight;

    let quoteMargin = (wrapperHeight - aboutHeight - resumeHeight) / 2;
    document.querySelector('.quoteWrapper').style.marginTop = `${quoteMargin - 30}px`;

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
            document.querySelector(positions[currPos]).scrollIntoView({
                behavior: 'smooth'
            });

        }
    }
}

// Typewriter in main section
function initTypeWriter() {
    const app = new TypewriterLight("app", {
        speed: 180,
        cursorSpeed: 500,
        cursorColor: "#4ecca3",
        endDot: true,
    });

    app.queue.add(
        [
            app.wait.bind(app, 300),
            app.type.bind(app, "web developer"),
            app.wait.bind(app, 1000),
            app.delete.bind(app, 7),
            app.wait.bind(app, 500),
            app.type.bind(app, "signer"),
            app.wait.bind(app, 1000),
            app.delete.bind(app),
            app.wait.bind(app, 1000),
            app.delete.bind(app),
            app.wait.bind(app, 500),
            app.type.bind(app, "car guy"),
            app.wait.bind(app, 1000),
            app.delete.bind(app),
            app.wait.bind(500),
            app.type.bind(app, "watch enthusiast"),
            app.wait.bind(app, 1000),
            app.delete.bind(app),
            app.wait.bind(500),

            app.type.bind(app, "prograen"),
            app.wait.bind(app, 500),
            app.delete.bind(app, 2),
            app.wait.bind(app, 500),
            app.type.bind(app, "mmer"),
            app.wait.bind(app, 1000),
            app.delete.bind(app),
            app.wait.bind(app, 500),
            app.type.bind(app, "student"),
            app.wait.bind(app, 500),
            app.delete.bind(app)
        ],
        true
    );

}

function goToElement(target) {
    let targetEle = document.querySelector(target);
    let pos = targetEle.style.position;
    let top = targetEle.style.top;
    targetEle.style.position = 'relative';
    targetEle.style.top = '-60px';
    targetEle.scrollIntoView({
        behavior: 'smooth'
    });
    targetEle.style.top = top;
    targetEle.style.position = pos;
    currPos = 1;
}

function scrollToMain() {
    document.querySelector('.main').scrollIntoView({
        behavior: 'smooth'
    });
}
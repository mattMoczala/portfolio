let positions = ['.nav', '.about', '.projects', '.footer'];
let currPos = 0;

window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}

window.onload = () => {

    initTypeWriter();
    // initScroll();
    document.addEventListener('keydown', checkKey);

}

function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        e.preventDefault();
        console.log('up');
        if (currPos > 0) {
            currPos--;
            console.log(positions[currPos]);
            document.querySelector(positions[currPos]).scrollIntoView({
                behavior: 'smooth'
            });
        }
    } else if (e.keyCode == '40') {
        e.preventDefault();
        console.log('down');
        if (currPos < 3) {
            currPos++;
            console.log(positions[currPos]);
            document.querySelector(positions[currPos]).scrollIntoView({
                behavior: 'smooth'
            });

        }
    }
}

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
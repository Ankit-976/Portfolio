if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

window.scrollTo(0, 0);


const text = "Welcome"
let animation = document.getElementById('animate-welcome');
let i = 0;


// Background Stars 

const container = document.querySelector('.stars-container');

for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDelay = Math.random() * 5 + 's';
    star.style.animationDuration = 1 + Math.random() * 2 + 's';
    container.appendChild(star);
}

setInterval(() => {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
    });
}, 1000);

// Typewrite Effect Function 
function typewriterEffect(element, text, speed) {
    element.innerHTML = "";
    let i = 0;

    function type() {
        if (i < text.length) {
            if (text[i] === "|") {
                element.innerHTML += "<br>";
            } else {
                element.innerHTML += text[i];
            }
            i++;
            setTimeout(type, speed);
        }
        else {
            element.classList.remove('cursor');
        }
    }

    type();
}

// Welcome animation call 
if (window.scrollY < 350) {
    typewriterEffect(animation, text, 150);
}


const heroQuote = "Learning as I go, building what I can, and having fun with code| — <i>that’s the whole point</i>"
let Quote = document.querySelector('.hero-content span');
function typewriterQuote() {
    Quote.innerHTML = "";  // Clear old text
    i = 0;
    let isTag = false;     // To check if we are inside a tag like <em>
    let tagBuffer = "";    // Store tag while building it (e.g., <em>)
    let displayBuffer = ""; // Final content to show

    function type() {
        if (i < heroQuote.length) {
            let char = heroQuote.charAt(i);

            // Start of a tag like <em>
            if (char === "<") {
                isTag = true;
                tagBuffer += char;
            }
            // End of tag like </em>
            else if (char === ">" && isTag) {
                tagBuffer += char;
                displayBuffer += tagBuffer; // Add full tag at once
                tagBuffer = "";
                isTag = false;
            }
            // Middle of a tag
            else if (isTag) {
                tagBuffer += char;
            }
            // Line break when you write |
            else if (char === "|") {
                displayBuffer += "<br>";
            }
            // Normal characters
            else {
                displayBuffer += char;
            }

            Quote.innerHTML = displayBuffer;
            i++;
            setTimeout(type, isTag ? 0 : 40);  // Don't delay while inside tag
        }
        else {
            // Remove blinking cursor after typing
            document.querySelector('.cursorr').remove();
        }
    }

    type();
}


animation.addEventListener('animationend', () => {
    animation.remove();
    document.querySelector('.navBar').classList.add('navBarAnimation');
    document.querySelector('.hero-content h1').classList.add('h1-animation');
    document.querySelector('.cursorr').classList.add('cursor');
    typewriterQuote();
});

// About Section

window.addEventListener('scroll', () => {
    if(window.scrollY > 200){
        document.querySelector('.aboutMe').classList.add('aboutMeAnimation');
        document.querySelector('.about-photo').classList.add('about-photoAnimation');
        document.querySelector('.about-section').classList.add('about-sectionAnimation');
    }
});

const lang = ['HTML', 'CSS', 'Javascript', 'Tailwind'];
let span = document.getElementById('lang-change');

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function langChange() {
    const currentWord = lang[wordIndex];
    const currentText = currentWord.substring(0, charIndex);
    span.innerHTML = currentText;

    if (!isDeleting) {
        if (charIndex < currentWord.length) {
            charIndex++;
        } else {
            isDeleting = true;
            setTimeout(langChange, 1200); // pause before deleting
            return;
        }
    } else {
        if (charIndex > 0) {
            charIndex--;
        } else {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % lang.length;
        }
    }

    setTimeout(langChange, isDeleting ? 50 : 100);
}

langChange();

/*=========================================
        GreenCup Premium Coffee
        script.js
=========================================*/

"use strict";

/*=========================================
            PRELOADER
=========================================*/

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1200);

});

/*=========================================
            HEADER
=========================================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.style.background = "rgba(255,255,255,.92)";
        header.style.boxShadow = "0 10px 35px rgba(0,0,0,.08)";

    }

    else{

        header.style.background = "rgba(255,255,255,.65)";
        header.style.boxShadow = "none";

    }

});

/*=========================================
            SCROLL TOP
=========================================*/

const scrollBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        scrollBtn.classList.add("active");

    }

    else{

        scrollBtn.classList.remove("active");

    }

});

scrollBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*=========================================
            SEARCH POPUP
=========================================*/

const searchPopup = document.querySelector(".search-popup");

const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click",()=>{

    searchPopup.classList.add("active");

});

searchPopup.addEventListener("click",(e)=>{

    if(e.target===searchPopup){

        searchPopup.classList.remove("active");

    }

});


/*=========================================
            THEME
=========================================*/

const themeBtn=document.querySelector(".theme-btn");

let dark=false;

themeBtn.addEventListener("click",()=>{

    dark=!dark;

    if(dark){

        document.body.classList.add("dark");

        themeBtn.innerHTML='<i class="ri-sun-line"></i>';

    }

    else{

        document.body.classList.remove("dark");

        themeBtn.innerHTML='<i class="ri-moon-line"></i>';

    }

});

/*=========================================
        ACTIVE MENU LINK
=========================================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".navbar a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-150;

        const height=section.offsetHeight;

        if(window.scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});

/*=========================================
        SCROLL REVEAL
=========================================*/

const reveals=document.querySelectorAll(

".section-title,.product-card,.feature-card,.category-card,.review-card,.special-card,.offer-box,.about-container,.contact-container"

);

function reveal(){

    reveals.forEach(el=>{

        const top=el.getBoundingClientRect().top;

        if(top<window.innerHeight-100){

            el.classList.add("show");

        }

    });

}

window.addEventListener("scroll",reveal);

reveal();
/*=========================================
            MOBILE MENU
=========================================*/

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("open");

    if (navbar.classList.contains("open")) {

        menuBtn.innerHTML = '<i class="ri-close-line"></i>';

    } else {

        menuBtn.innerHTML = '<i class="ri-menu-3-line"></i>';

    }

});

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");

        menuBtn.innerHTML = '<i class="ri-menu-3-line"></i>';

    });

});

/*=========================================
            COUNTERS
=========================================*/

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function animateCounters() {

    if (counterStarted) return;

    const stats = document.querySelector(".stats");

    if (!stats) return;

    const rect = stats.getBoundingClientRect();

    if (rect.top > window.innerHeight - 150) return;

    counterStarted = true;

    counters.forEach(counter => {

        const text = counter.textContent.trim();

        let target = parseInt(text.replace(/\D/g, ""));

        let suffix = "";

        if (text.includes("%")) suffix = "%";
        else if (text.includes("+")) suffix = "+";
        else if (text.includes("M")) suffix = "M+";

        let current = 0;
        const step = Math.max(1, Math.ceil(target / 80));

        const timer = setInterval(() => {

            current += step;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            counter.textContent = current + suffix;

        }, 20);

    });

}

window.addEventListener("scroll", animateCounters);
animateCounters();

/*=========================================
            GALLERY LIGHTBOX
=========================================*/

const galleryImages = document.querySelectorAll(".gallery-grid img");

const overlay = document.createElement("div");
overlay.className = "lightbox";

overlay.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="" alt="">
`;

document.body.appendChild(overlay);

const lightboxImg = overlay.querySelector("img");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        lightboxImg.src = img.src;

        overlay.classList.add("active");

    });

});

overlay.addEventListener("click", e => {

    if (
        e.target === overlay ||
        e.target.classList.contains("lightbox-close")
    ) {

        overlay.classList.remove("active");

    }

});

/*=========================================
        ESC CLOSE SEARCH
=========================================*/

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        searchPopup.classList.remove("active");
        overlay.classList.remove("active");

    }

});

/*=========================================
        SAVE THEME
=========================================*/

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    themeBtn.innerHTML = '<i class="ri-sun-line"></i>';

    dark = true;

}

themeBtn.addEventListener("click", () => {

    localStorage.setItem(
        "theme",
        dark ? "dark" : "light"
    );

});

/*=========================================
        HERO PARALLAX
=========================================*/

const heroImage = document.querySelector(".hero-right img");

window.addEventListener("mousemove", e => {

    if (!heroImage) return;

    const x = (window.innerWidth / 2 - e.clientX) / 35;
    const y = (window.innerHeight / 2 - e.clientY) / 35;

    heroImage.style.transform =
        `translate(${x}px,${y}px)`;

});

/*=========================================
        CURRENT YEAR
=========================================*/

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML =
        `© ${new Date().getFullYear()} GreenCup. All Rights Reserved.`;

}
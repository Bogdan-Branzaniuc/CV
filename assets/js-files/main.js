import {
    TimelineMax,
    gsap
} from '../node_modules/gsap/index.js'
import {
    navSystem,
    selectorsAnimations,
    loadNavBar,
    changeNavColors,
    navAtagHover,
} from './nav-methods.js'
import {
    hoverDownloadPDF,
} from './intro-section-methods.js'
import {
    loadAboutMe
} from './about-me.js'
import {
    mapTest,
    createSinglePath
} from './development-helpers.js'
import {
    main as workMain
}
from './work-section.js'
import {
    hobbiesMain
} from './hobbies-section.js'
import {
    email
} from './email-js.js'
import {
    contactForm,
    drawFormSvgs,
} from './contact-form.js'

const pageColors = {
    /**
     * first column = section and navlinks collors, second column = navlogo and selectors color
     **/
    '.intro-section-color': ['#478B9A', '#479A77'],
    '.work-section-color': ['#BDACD3', '#DC91C2'],
    '.principles-section-color': ['#F11D00', '#F11D10', '#F1002B'],
    '.about-me-section-color': ['#98a5d4', '#c9daeb'],
    '.hobbies-section-color': ['#E49A2B', '#E4792B'],
    '.contact-section-color': ['#6D9A77', '#7E9A6D'],
}
const navSelectors = {
    nav: document.querySelector('nav'),
    navSvgPaths: document.querySelectorAll('nav svg path'),
    navLinkLiElements: document.querySelectorAll('.nav-spy-wrapper > div > li'),
    navLinkATags: document.querySelectorAll('.nav-spy-wrapper a'),
    navLogo: document.querySelector('.nav-heading h1'),
    svgMobileSelector: document.querySelector('.mobile-nav-selector'),
    svgDesktopSelector: document.querySelector('.profile-svg'),
    svgMobileSelectorUpperArrow: document.querySelector('.upper-mobile-svg-arrow'),
    svgMobileSelectorLowerArrow: document.querySelector('.lower-mobile-svg-arrow'),
    profileImmage: document.querySelector('#profile-immage'),
}
const introSelectors = {
    downloadPDFSvg: document.querySelector('.download-PDF-svg-tag'),
    downloadPDFSvgPaths: document.querySelectorAll('.download-PDF-svg-tag svg > g>g')
}

const master = new TimelineMax()
navSystem(navSelectors)
master.add(loadNavBar(navSelectors))
master.add(navAtagHover(navSelectors, pageColors), '<')
selectorsAnimations(navSelectors, master)
master.add(changeNavColors(navSelectors, pageColors), '<')
hoverDownloadPDF(introSelectors.downloadPDFSvg, introSelectors.downloadPDFSvgPaths)
loadAboutMe()
hobbiesMain()
workMain()
drawFormSvgs()
contactForm()

email()


fetch('https://8000-bogdanbranzaniuc-cv-ip6061if7q9.ws-eu93.gitpod.io/')
    .then(response => {
        if (!response.ok) {
            // Handle the error here
            // console.log('Error: ', response.status);
            window.location.href = '/404.html'; // Redirect to a 404 page
        } else {
            // Handle the successful response here
            console.log('Success: ', response.status);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

// HELPERS FOR SVG SINGLE PATH CREATION
//mapTest()
// let selector = document.querySelector('#icon-123')
// createSinglePath(selector, 'github-icon-mad', '')
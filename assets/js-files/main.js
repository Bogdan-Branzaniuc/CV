import {
    navSystem,
    selectorsAnimations,
    loadNavBar,
    changeNavColors,
    navAtagHover,
} from './nav-methods.js'

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

const pageColors = {
    // first column = section and navlinks collors, second column = navlogo and selectors color
    '.intro-section-color': ['#478B9A', '#479A77'],
    '.projects-section-color': ['#BDACD3', '#DC91C2'],
    '.principles-section-color': ['#F11D00', '#F11D10', '#F1002B'],
    '.about-me-section-color': ['#527CA3', '#5264A3'],
    '.hobbies-section-color': ['#E49A2B', '#E4792B'],
    '.contact-section-color': ['#6D9A77', '#7E9A6D'],
}
const master = new TimelineMax()
navSystem(navSelectors)
master.add(loadNavBar(navSelectors))
master.add(navAtagHover(navSelectors, pageColors), '<')
selectorsAnimations(navSelectors, master)
master.add(changeNavColors(navSelectors, pageColors), '<')
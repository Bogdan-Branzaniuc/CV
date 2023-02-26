import {
    navSystem,
    selectorsAnimations,
    loadNavBar,
    changeNavColors
} from './nav-methods.js'
const navSelectors = {
    nav: document.querySelector('nav'),
    navSvgPaths: document.querySelectorAll('nav svg path'),
    navLinkLiElements: document.querySelectorAll('.nav-spy-wrapper > div > li'),
    navLinkATags: document.querySelectorAll('nav a'),
    navLogo: document.querySelector('.nav-heading h1'),
    svgMobileSelector: document.querySelector('.mobile-nav-selector'),
    svgDesktopSelector: document.querySelector('.profile-svg'),
    svgMobileSelectorUpperArrow: document.querySelector('.upper-mobile-svg-arrow'),
    svgMobileSelectorLowerArrow: document.querySelector('.lower-mobile-svg-arrow'),
    profileImmage: document.querySelector('#profile-immage'),
}
const master = new TimelineMax()

navSystem(navSelectors)
master.add(loadNavBar(navSelectors))
selectorsAnimations(navSelectors, master)
master.add(changeNavColors(navSelectors), '<')
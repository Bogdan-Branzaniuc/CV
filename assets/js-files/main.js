import {
    navSystem,
    selectorsAnimations,
    loadNavBar
} from './nav-methods.js'

const navSelectors = {
    navLinkLiElements: document.querySelectorAll('.nav-spy-wrapper > div > li'),
    navLogo: document.querySelector('.nav-heading h1'),
    svgMobileSelector: document.querySelector('.mobile-nav-selector'),
    svgDesktopSelector: document.querySelector('.profile-svg'),
    svgMobileSelectorUpperArrow: document.querySelector('.upper-mobile-svg-arrow'),
    svgMobileSelectorLowerArrow: document.querySelector('.lower-mobile-svg-arrow'),
    profileImmage: document.querySelector('#profile-immage'),
}
const master = new TimelineMax()


navSystem(navSelectors)
setTimeout(() => {
    selectorsAnimations(navSelectors)
}, 1500)
master.add(loadNavBar(navSelectors), )
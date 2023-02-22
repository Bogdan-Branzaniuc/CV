import {
    navSystem,
    selectorsAnimations
} from './nav-methods.js'

const navSelectors = {
    profileImmage: document.querySelector('#profile-immage'),
    navLinkLiElements: document.querySelectorAll('.nav-spy-wrapper > div > li'),
    svgMobileSelector: document.querySelector('.mobile-nav-selector'),
    svgDesktopSelector: document.querySelector('.profile-svg'),
    svgMobileSelectorUpperArrow: document.querySelector('.upper-mobile-svg-arrow'),
    svgMobileSelectorLowerArrow: document.querySelector('.lower-mobile-svg-arrow')
}
const master = new TimelineMax()
// loadNav
const loadNavBar = function (selectors) {
    const loadTl = new TimelineMax({
        defaults: {
            ease: 'ease-in',
            duration: 1
        }
    })
    for (let navli of selectors.navLinkLiElements) {
        loadTl.from(navli, {
            opacity: 0,
            x: -100,
        }, '<')
    }
    loadTl.from(navSelectors.profileImmage, {
        opacity: 0,
        y: -100,
        duration: 0.4,
    })
    loadTl.from(selectors.svgDesktopSelector, {
        opacity: 0,
    })
    loadTl.from(selectors.svgMobileSelector, {
        opacity: 0,
        x: 30,
        duration: 1,
        ease: Elastic.easeOut,
    }, '<')
    return loadTl
}
navSystem(navSelectors)
master.add(loadNavBar(navSelectors), )

setTimeout(() => {
    selectorsAnimations(navSelectors)
}, 1500)
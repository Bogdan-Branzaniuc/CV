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
    mapTest,
    createSinglePath
} from './development-helpers.js'
import {
    main as workMain
}
from './work-section.js'

console.log(gsap.version)

const pageColors = {
    /**
     * first column = section and navlinks collors, second column = navlogo and selectors color
     **/
    '.intro-section-color': ['#478B9A', '#479A77'],
    '.work-section-color': ['#BDACD3', '#DC91C2'],
    '.principles-section-color': ['#F11D00', '#F11D10', '#F1002B'],
    '.about-me-section-color': ['#527CA3', '#5264A3'],
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

workMain()


// HELPERS FOR SVG SINGLE PATH CREATION
//mapTest()
// let selector = document.querySelector('#icon-123')
// createSinglePath(selector, 'github-icon-mad', '')
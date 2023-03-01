import {
    gsap,
    TimelineMax,
    Elastic,
    Power1
} from '/node_modules/gsap/index.js'
import {
    ScrollTrigger
} from '../../node_modules/gsap/ScrollTrigger.js'
gsap.registerPlugin(ScrollTrigger)
const navSystem = function (selectors) {
    /** 
     *applies changeNavliSize to all the navLinks
     */
    for (let navLi of selectors.navLinkLiElements) {
        let sectionClass = '.' + navLi.className.replace('-link-li', '-section')
        changeNavliSize(navLi, sectionClass)
    }
}

const changeNavliSize = function (navLi, sectionClass) {
    /** 
     *creates the scrolltrigger that enlarges the current selected section link 
     *dispatch an event every time the scrolltrigger is stumbling across a break-point
     */
    const navliChanged = new CustomEvent('navliChanged', {
        detail: {
            sectionClass
        },
        bubbles: true,
        cancelable: true,
        composed: false,
    })

    const resizeTl = gsap.timeline()
    resizeTl.to(navLi, {
        fontSize: "2em",
        duration: 0.3,
        onComplete: () => navLi.dispatchEvent(navliChanged),
    }, )

    return ScrollTrigger.create({
        animation: resizeTl,
        trigger: sectionClass,
        toggleActions: "play reverse play reverse",
        start: 'top 50%',
        end: 'bottom 50%',
    })
}


const changeNavColors = function (selectors, pageColors) {
    /** 
     *creates the selector out of the section class passed through the navliChanged custom event 
     *changes the navBar colors based on the current section
     */
    document.addEventListener('navliChanged', (e) => {
        let colorKey = e.detail.sectionClass + '-color'
        let currentColor = pageColors[colorKey][0]
        let selectorsColor = pageColors[colorKey][1]
        let tl = new TimelineMax()
        tl.to(selectors.nav, {
            color: currentColor,
            duration: 0.3,
        }, '<')
        tl.to(selectors.navLogo, {
            color: selectorsColor,
            duration: 0.3,
        }, '<')
        tl.to(selectors.profileImmage, {
            borderColor: selectorsColor,
            duration: 0.3,
        }, '<')
        tl.to(selectors.navSvgPaths, {
            fill: selectorsColor,
            duration: 0.3,
        }, '<')
        return tl
    })
}
const navAtagHover = function (selectors, pageColors) {
    /** 
     *hevering effect on navbar links
     */
    for (let a of selectors.navLinkATags) {
        let tl = new TimelineMax()
        a.addEventListener('mouseover', (e) => {
            let colorKey = '.' + a.className.split(' ')[0]
            tl.to(a, {
                color: pageColors[colorKey][0],
                duration: 0.3,
                ease: Power1
            })
        })
        a.addEventListener('mouseleave', (e) => {
            tl.to(a, {
                color: 'inherit',
                duration: 0.3
            })
        })
    }
}

let selectorsAnimationsTls = function (navLi, selectors) {
    /**
     * moves the desktop and mobile selectors to the current sellected section link 
     **/
    let rotationDegrees = {
        'intro-link-li': 3,
        'work-link-li': 25,
        'principles-link-li': 60,
        'about-me-link-li': 90,
        'hobbies-link-li': 120,
        'contact-link-li': 160,
    }
    let liMiddle = navLi.offsetWidth / 2
    let svgMobileSelectorWidth = 7.5
    let liOffsetX = navLi.offsetLeft + liMiddle - svgMobileSelectorWidth
    let selectorXCoor = liOffsetX
    let tl = new TimelineMax()
    if (window.innerWidth < 800) {
        tl.to(selectors.svgMobileSelector, {
            x: selectorXCoor,
            duration: 0.75,
            ease: Elastic.easeOut,
        }, )
        tl.to(selectors.svgMobileSelectorLowerArrow, {
            y: 4,
            duration: 0.3,
            ease: Elastic.easeOut,
        }, '<')
        return tl
    } else {
        let liDegree = rotationDegrees[navLi.className]
        tl.to(selectors.svgDesktopSelector, {
            rotate: liDegree,
            duration: 0.8,
            ease: Elastic.easeOut.config(1, 0.35),
        })
        return tl
    }
}


const selectorsAnimations = function (selectors, master) {
    /**
     * listens for the custom event fired in changeNavliSize function
     **/
    for (const navLi of selectors.navLinkLiElements) {
        navLi.addEventListener('navliChanged', () => {
            master.add(selectorsAnimationsTls(navLi, selectors))
        })

    }
}



const loadNavBar = function (selectors) {
    /**
     * loads the nav-bar elements
     **/
    const loadTl = new TimelineMax({
        defaults: {
            duration: 1
        }
    })
    for (let navli of selectors.navLinkLiElements) {
        loadTl.from(navli, {
            opacity: 0,
            x: -100,
        }, '<')
    }
    loadTl.from(selectors.profileImmage, {
        opacity: 0,
        y: -100,
        duration: 0.4,
    })
    loadTl.from(selectors.navLogo, {
        opacity: 0,
        x: 30,
        duration: 0.5,

    }, '<')
    loadTl.from(selectors.svgDesktopSelector, {
        opacity: 0,
        x: -30,
        duration: 0.4,
    })
    loadTl.from(selectors.svgMobileSelector, {
        opacity: 0,
        duration: 0.6,
    }, '<')

    return loadTl
}
export {
    navSystem,
    selectorsAnimations,
    loadNavBar,
    changeNavColors,
    navAtagHover,
}
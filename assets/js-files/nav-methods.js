gsap.registerPlugin(ScrollTrigger)

const navSystem = function (selectors) {
    /** 
     *applies changeNavliSize to all the navLinks
     */
    for (let navLi of selectors.navLinkLiElements) {
        changeNavliSize(navLi, selectors)
    }
}

const changeNavliSize = function (navLi) {
    /** 
     *creates the scrolltrigger that enlarges the current selected section link 
     *dispatch an event every time the scrolltrigger is stumbling across a break-point
     */
    const navliChanged = new CustomEvent('navliChanged', {
        detail: {},
        bubbles: true,
        cancelable: true,
        composed: false,
    })
    let sectionClass = '.' + navLi.className.replace('-link-li', '-section')
    const resizeTl = new TimelineMax()
    resizeTl.to(navLi, {
        fontSize: "2em",
        color: "rgb(255, 33, 86)",
        duration: 0.3,
        onComplete: () => navLi.dispatchEvent(navliChanged),
    })
    return ScrollTrigger.create({
        animation: resizeTl,
        trigger: sectionClass,
        toggleActions: "play reverse play reverse",
        start: 'top 50%',
        end: 'bottom 50%',
    })
}


let selectorsAnimationsTls = function (navLi, selectors) {
    /**
     * moves the desktop and mobile selectors to the current sellected section link 
     **/
    let rotationDegrees = {
        'intro-link-li': 0,
        'projects-link-li': 30,
        'principles-link-li': 65,
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
        return tl
    } else {
        let liDegree = rotationDegrees[navLi.className]
        tl.to(selectors.svgDesktopSelector, {
            rotate: liDegree,
            duration: 0.5,
            ease: Elastic.easeOut.config(1, 0.3),
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
        x: 30,
        duration: 0.4,
    })
    loadTl.from(selectors.svgMobileSelector, {
        opacity: 0,
        x: 30,
        duration: 0.5,
        ease: Elastic.easeOut,
    }, '<')

    return loadTl
}
export {
    navSystem,
    selectorsAnimations,
    loadNavBar
}
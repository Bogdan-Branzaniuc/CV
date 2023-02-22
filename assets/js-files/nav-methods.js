const navSystem = function (selectors) {
    /** 
     *creates the navigation menu animations for desktop and mobile versions with the gsap library
     */
    gsap.registerPlugin(ScrollTrigger)

    for (let navLi of selectors.navLinkLiElements) {
        changeNavliSize(navLi)
    }
}

const changeNavliSize = function (navLi) {
    let sectionClass = '.' + navLi.className.replace('-link-li', '-section')
    const resizeTl = new TimelineMax()
    resizeTl.to(navLi, {
        fontSize: "2em",
        color: "#FF2156",
        duration: 0.5,
    })
    return ScrollTrigger.create({
        animation: resizeTl,
        trigger: sectionClass,
        toggleActions: "play reverse play reverse",
        start: 'top 50%',
        end: 'bottom 50%',
    })
}

const selectorsAnimations = function (selectors) {
    for (let navLi of selectors.navLinkLiElements) {
        const selectorObserver = new ResizeObserver(() => {

            if ((navLi.style.fontSize) == '2em') {
                let liMiddle = navLi.offsetWidth / 2
                let svgMobileSelectorWidth = 7.5
                let liOffsetX = navLi.offsetLeft + liMiddle - svgMobileSelectorWidth
                let liOffsetY = navLi.offsetTop
                let selectorXCoor = liOffsetX
                let tl = new TimelineMax()
                if (window.innerWidth < 800) {
                    tl.to(selectors.svgMobileSelector, {
                        x: selectorXCoor,
                        duration: 0.4,
                    }, )
                    tl.to(selectors.svgMobileSelectorUpperArrow, {
                        x: 30,
                        duration: 0.4,
                    }, '-=0.3')
                    tl.to(selectors.svgMobileSelectorLowerArrow, {
                        x: 30,
                        duration: 0.4,

                    }, '<')
                    tl.to(selectors.svgMobileSelectorUpperArrow, {
                        x: 0,
                        duration: 0.7,
                        ease: Elastic.easeOut,
                    }, '-=0.25')
                    tl.to(selectors.svgMobileSelectorLowerArrow, {
                        x: 0,
                        duration: 0.7,
                        ease: Elastic.easeOut,
                    }, '<')
                } else {
                    let percentageDegree = liOffsetY < 100 ? 0.15 : 0.27
                    let liDegree = liOffsetY - percentageDegree * liOffsetY
                    tl.to(selectors.svgDesktopSelector, {
                        rotate: liDegree + 10,
                        duration: 0.7,
                        ease: Elastic.easeOut.config(1.5, 0.6),
                    })
                }
                return tl
            }
        })
        selectorObserver.observe(navLi)

    }

}

export {
    navSystem,
    selectorsAnimations
}
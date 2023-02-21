let navSystem = function () {
    /** 
     *creates the navigation menu animations for desktop and mobile versions with the gsap library
     */

    gsap.registerPlugin(ScrollTrigger)

    let navLinkLiElements = document.querySelectorAll('.nav-spy-wrapper > div > li')
    let svgMobileSelector = document.querySelector('.mobile-nav-selector')
    let svgDesktopSelector = document.querySelector('.profile-svg')
    let svgMobileSelectorUpperArrow = document.querySelector('.upper-mobile-svg-arrow')
    let svgMobileSelectorLowerArrow = document.querySelector('.lower-mobile-svg-arrow')
    for (let navLi of navLinkLiElements) {
        let sectionClass = '.' + navLi.className.replace('-link-li', '-section')
        const resizeTl = gsap.timeline()
        resizeTl.to(navLi, {
            fontSize: "2em",
            color: "#FF2156",
            duration: 0.5,
        })

        ScrollTrigger.create({
            animation: resizeTl,
            trigger: sectionClass,
            toggleActions: "play reverse play reverse",
            start: 'top 50%',
            end: 'bottom 50%',
        })

        let selectorObserver = new ResizeObserver(() => {
            if ((navLi.style.fontSize) == '2em') {

                let liMiddle = navLi.offsetWidth / 2
                let svgMobileSelectorWidth = 7.5
                let liOffsetX = navLi.offsetLeft + liMiddle - svgMobileSelectorWidth
                let liOffsetY = navLi.offsetTop
                let selectorXCoor = liOffsetX
                const selectorTl = gsap.timeline()
                selectorTl.to(svgMobileSelector, {
                    x: selectorXCoor,
                    duration: 0.5,
                })
                selectorTl.to(svgMobileSelectorUpperArrow, {
                    x: -30,
                    duration: 0.5,
                }, '-=0.4')
                selectorTl.to(svgMobileSelectorLowerArrow, {
                    x: 30,
                    duration: 0.5,

                }, '<')
                selectorTl.to(svgMobileSelectorUpperArrow, {
                    x: 0,
                    duration: 0.7,
                    ease: Elastic.easeOut,
                }, '-=0.25')
                selectorTl.to(svgMobileSelectorLowerArrow, {
                    x: 0,
                    duration: 0.5,
                    ease: Elastic.easeOut,
                }, '<')

                let liDegree = liOffsetY
                gsap.to(svgDesktopSelector, {
                    rotate: liDegree + 10,
                    duration: 0.7,
                    ease: Elastic.easeOut.config(1.5, 0.6),
                })
            }
        })

        selectorObserver.observe(navLi)
    }
}


export {
    navSystem,
}
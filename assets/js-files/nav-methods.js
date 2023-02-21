let navSystem = function () {
    /** 
     *creates the navigation menu animations for desktop and mobile versions 
     */

    gsap.registerPlugin(ScrollTrigger)

    let navLinkLiElements = document.querySelectorAll('.nav-spy-wrapper > div > li')
    let svgMobileSelector = document.querySelector('.mobile-nav-selector')
    let svgDesktopSelector = document.querySelector('.profile-svg')

    for (let navLi of navLinkLiElements) {
        let sectionClass = '.' + navLi.className.replace('-link-li', '-section')
        gsap.to(navLi, {
            scrollTrigger: {
                trigger: sectionClass,
                toggleActions: "play reverse play reverse",
                start: 'top 50%',
                end: 'bottom 50%',
            },
            fontSize: "2em",
            duration: 0.2,
        })

        let selectorObserver = new ResizeObserver(() => {
            if ((navLi.style.fontSize) == '2em') {

                let liMiddle = navLi.offsetWidth / 2
                let svgMobileSelectorWidth = 7.5
                let liOffsetX = navLi.offsetLeft + liMiddle - svgMobileSelectorWidth
                let liOffsetY = navLi.offsetTop
                let selectorXCoor = liOffsetX

                gsap.to(svgMobileSelector, {
                    x: selectorXCoor,
                    duration: 1
                })
                let liDegree = liOffsetY
                gsap.to(svgDesktopSelector, {
                    rotate: liDegree + 10,
                    duration: 1
                })
            }
        })

        selectorObserver.observe(navLi)
    }
}


export {
    navSystem,
}
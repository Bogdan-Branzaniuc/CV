 gsap.registerPlugin(ScrollTrigger)

 let navSpyWrapperWidth = document.querySelector('.nav-spy-wrapper').offsetWidth
 let navLinkLiElements = document.querySelectorAll('.nav-spy-wrapper > div > li')
 let svgSelector = document.querySelector('.mobile-nav-selector')

 for (let navLi of navLinkLiElements) {
     let sectionClass = '.' + navLi.className + '-section'

     gsap.to(navLi, {
         scrollTrigger: {
             trigger: sectionClass,
             toggleActions: "play reverse play reverse",
             start: 'top 50%',
             endTrigger: sectionClass,
             end: 'bottom 50%',
         },
         fontSize: "15",
         duration: 0.2,
         borderBottom: 'solid 1px black',
     })


     let selectorObserver = new ResizeObserver(() => {
         if ((navLi.style.fontSize) == '15px') {
             let liOffsetX = navLi.offsetLeft
             let liMiddle = navLi.offsetWidth / 2
             let selectorXCoor = liOffsetX + liMiddle - 10
             gsap.to(svgSelector, {
                 x: selectorXCoor,
                 duration: 1
             })
         }
     })
     selectorObserver.observe(navLi)
 }
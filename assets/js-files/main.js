 gsap.registerPlugin(ScrollTrigger)


 let navLinkLiElements = document.querySelectorAll('.nav-spy-wrapper > div > *')
 for (let navLi of navLinkLiElements) {
     let sectionClass = '.' + navLi.className + '-section'

     gsap.to(navLi, {
         scrollTrigger: {
             trigger: '#' + navLi.className,
             toggleActions: "play reverse play reverse",
             start: 'top 40%',
             endTrigger: sectionClass,
             end: 'bottom 40%',
         },
         fontSize: "15",
         duration: 1,
         borderBottom: 'solid 1px black',
     })
 }

 // do the end with the size of the section e voilla
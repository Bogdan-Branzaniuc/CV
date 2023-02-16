 gsap.registerPlugin(ScrollTrigger)


 let navLinks = document.querySelectorAll('.nav-spy-wrapper > ul > *')
 for (let navLink of navLinks) {
     let sectionClass = '.' + navLink.className + '-section'

     gsap.to(navLink, {
         scrollTrigger: {
             trigger: '#' + navLink.className,
             toggleActions: "play reverse play reverse",
             start: 'top 40%',
             endTrigger: sectionClass,
             end: 'bottom 40%',
             markers: true
         },
         fontSize: "30",
         duration: 1,
     })
 }

 // do the end with the size of the section e voilla
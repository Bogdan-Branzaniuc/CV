 gsap.registerPlugin(ScrollTrigger)


 let navLinks = document.querySelectorAll('.nav-spy-wrapper > ul > *')
 for (let navLink of navLinks) {
     gsap.to(navLink, {
         scrollTrigger: {
             trigger: '#' + navLink.className,
             toggleActions: "play none reverse none",
             start: 'top  center',
             end: 'top center',
         },
         fontSize: "30",
         duration: 1,
     })
 }
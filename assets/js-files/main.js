 gsap.registerPlugin(ScrollTrigger)


 let navLinks = document.querySelectorAll('.nav-spy-wrapper > ul > *')
 for (let navLink of navLinks) {
     gsap.to(navLink, {
         scrollTrigger: {
             trigger: '#' + navLink.className,
             toggleActions: "play reverse play reverse",
             start: 'top 50%',
             end: 'bottom -2%',
         },
         fontSize: "30",
         duration: 1,
     })
 }
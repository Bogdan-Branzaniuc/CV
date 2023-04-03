import {
    gsap,
    TimelineMax,
    Bounce,
    Elastic,
    Power2,
    Power4,
} from '../node_modules/gsap/index.js'
import {
    ScrollTrigger
} from '../node_modules/gsap/ScrollTrigger.js'


function loadAboutMe() {
    let contents = document.querySelectorAll('.about-me-content')
    for (let content of contents) {
        let tl = new TimelineMax()
        tl.from(content, {
            x: -100,
            opacity: 0,
            ease: Power4.easeOut,
            duration: 1,
        })
        ScrollTrigger.create({
            trigger: content,
            start: 'top 40%',
            animation: tl,
            end: 'bottom 30%',
            toggleActions: "play reverse play reverse",
        })

    }
    let tlTitle = new TimelineMax()

    tlTitle.from('.about-me-title', {
        y: -100,
        opacity: 0,
        ease: Power4.easeOut,
        duration: 1,
    })
    ScrollTrigger.create({
        trigger: '.about-me-title',
        start: 'top 70%',
        animation: tlTitle,
        end: 'top 20%',
        toggleActions: "play reverse play reverse",
    })

}

export {
    loadAboutMe
}
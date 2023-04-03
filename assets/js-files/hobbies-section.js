import {
    gsap,
    TimelineMax,
    TweenMax,
    Elastic,
    Power1,
    Power2,
    Power4,
    Bounce
} from '../node_modules/gsap/index.js'
import {
    ScrollTrigger
} from '../node_modules/gsap/ScrollTrigger.js'

gsap.registerPlugin(ScrollTrigger)



function hobbiesMain() {
    let hobbies = document.querySelectorAll('.hobbie-title')
    for (let hobbie of hobbies) {
        let tl = new TimelineMax()

        tl.from(hobbie, {
            y: -100,
            opacity: 0,
            ease: Elastic.easeOut,
            duration: 1,
        })
        ScrollTrigger.create({
            trigger: hobbie,
            start: 'top 80%',
            animation: tl,
            end: 'bottom 10%',
            toggleActions: "play reverse play reverse",
        })
    }

    let tlHeadingIn = new TimelineMax()
    tlHeadingIn.from('.hobbies-section-heading', {
        x: 100,
        opacity: 0,
        ease: Power4.easeOut,
        duration: 0.5,
    })
    ScrollTrigger.create({
        trigger: '.hobbies-section-heading',
        start: 'top 80%',
        end: 'bottom 30%',
        animation: tlHeadingIn,
        toggleActions: "play reverse play reverse",

    })
}

export {
    hobbiesMain
}
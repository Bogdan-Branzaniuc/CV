import {
    gsap,
    TimelineMax,
    Bounce,
} from '../node_modules/gsap/index.js'
import {
    ScrollTrigger
} from '../node_modules/gsap/ScrollTrigger.js'
import {
    MorphSVGPlugin
} from '../node_modules/gsap/MorphSVGPlugin.js'
import {
    Draggable
} from '../node_modules/gsap/Draggable.js'
import {
    InertiaPlugin
} from '../node_modules/gsap/InertiaPlugin.js'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(MorphSVGPlugin)
gsap.registerPlugin(Draggable)
gsap.registerPlugin(InertiaPlugin)

const dashboard = $('.work-dashboard')
const section = $('.work-section')
let mobile = window.innerWidth > 800 ? false : true
window.addEventListener('resize', (e) => {
    mobile = window.innerWidth > 800 ? false : true
})


let sectionPin = mobile ? 'top 7%' : 'top 30%'
let sectionPinPercentage = mobile ? 0.93 : 0.7

let dashboardToFixed = function () {
    /* Pinns the dashboard when scrolling 
       Animates the github svg */

    let stAnimation = new TimelineMax()
    stAnimation.to('#github-icon-bg', {
        transformOrigin: "50% 50%",
        rotate: 500,
    })

    ScrollTrigger.create({
        trigger: section,
        start: sectionPin,
        end: 'bottom 100%',
        animation: stAnimation,
        pin: dashboard,
        scrub: 2,
        ease: Bounce.easeOut
    })

}
ScrollTrigger.refresh()

const draggableTrigger = function () {
    let handler = document.querySelector("#handler"),
        barLength, maxScroll, triggerD, draggable, offsetBarLeft,
        offsetBarRight
    let bar = document.querySelector(".bar")
    let barRect = bar.getBoundingClientRect()
    offsetBarLeft = barRect.x - handler.offsetWidth
    offsetBarRight = barRect.x //since bootstrap grid

    let dashboardOffsetTop = section.offset().top + section.css('padding')
    dashboardOffsetTop = parseInt(dashboardOffsetTop).toFixed(2)

    barLength = bar.offsetWidth;

    triggerD = ScrollTrigger.create({
        trigger: section,
        start: sectionPin,
        end: 'bottom 100%',
        onRefresh: onResize,
        onUpdate: () => {
            updateHandler()
        },
    })

    function ThrowDrag() {
        let scrollProgress = (this.x / barLength)
        triggerD.scroll(triggerD.start + scrollProgress * (triggerD.end - triggerD.start))
        ScrollTrigger.normalizeScroll(false)
    }
    draggable = Draggable.create(handler, {
        type: "x",
        bounds: ".bar",
        edgeResistance: 0.9,
        inertia: true,
        onDragStart: () => ScrollTrigger.normalizeScroll(true),
        onDrag: ThrowDrag,
        onThrowUpdate: ThrowDrag,
        onThrowComplete: () => ScrollTrigger.normalizeScroll(false),
    })[0];

    function updateHandler() {
        // move the handler to the corresponding ratio according to the page's scroll position.
        maxScroll = section.innerHeight() - screen.height * sectionPinPercentage
        if (triggerD) {
            let scrollProgress = triggerD.progress.toFixed(2)
            gsap.set(handler, {
                x: scrollProgress * barLength
            });
        }

    }

    function onResize() {
        if (triggerD) {
            // record the maximum scroll value for the page
            maxScroll = section.innerHeight() - screen.height
            barLength = document.querySelector(".bar").offsetWidth - handler.offsetWidth;
            updateHandler();
        }
    }

    function redoLinkSmothScroll() {
        $('a[href^="#"]').on('click', function (event) {
            event.preventDefault();
            var target = $(this.getAttribute('href'));
            if (target.length) {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top
                }, 900);
            }
        });
    }
    redoLinkSmothScroll()
}
export {
    dashboardToFixed,
    draggableTrigger
}
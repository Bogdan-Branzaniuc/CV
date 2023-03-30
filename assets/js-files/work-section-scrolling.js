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


let sectionPin = mobile ? 'top 10%' : 'top 30%'

let dashboardToFixed = function () {
    /* Pinns the dashboard when scrolling 
       Animates the github svg */

    let stAnimation = new TimelineMax()
    stAnimation.to('#github-icon-bg', {
        transformOrigin: "530px 530px",
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
        barLength, maxScroll, triggerD, draggable, offsetTriggerScroll, offsetBarLeft
    let bar = document.querySelector(".bar")

    offsetBarLeft = bar.getBoundingClientRect().x / 4

    let dashboardOffsetTop = section.offset().top + section.css('padding')
    dashboardOffsetTop = parseInt(dashboardOffsetTop).toFixed(2)

    barLength = bar.offsetWidth;

    triggerD = ScrollTrigger.create({
        trigger: section,
        start: sectionPin,
        end: 'bottom 100%',
        onRefresh: onResize,
        onUpdate: ({
            progress,
            direction,
            isActive,
        }, ) => {
            isActive ? draggable.enable() : draggable.disable()
            updateHandler()
        },
        onLeave: () => {
            gsap.set(handler, {
                x: barLength + offsetBarLeft
            });
            draggable.disable()
        },
        onLeaveback: () => {
            gsap.set(handler, {
                x: offsetBarLeft,
            });
            draggable.disable()
        }
    })

    function ThrowDrag() {
        ScrollTrigger.normalizeScroll(true)
        triggerD.disable()
        let scrollTo = ((this.x - offsetBarLeft) * maxScroll / barLength) + section.offset().top
        triggerD.scroll(scrollTo)
        triggerD.enable()
        ScrollTrigger.normalizeScroll(false)
        redoLinkSmothScroll()
    }
    draggable = Draggable.create(handler, {
        type: "x",
        bounds: ".bar",
        edgeResistance: 0.9,
        inertia: true,
        onDrag: ThrowDrag,
        onThrowUpdate: ThrowDrag
    })[0];
    draggable.disable()

    function updateHandler() {
        // move the handler to the corresponding ratio according to the page's scroll position.
        maxScroll = section.innerHeight() - screen.height
        if (triggerD) {
            let handlerX = handler.getBoundingClientRect.x
            if (handlerX > bar.getBoundingClientRect().x < bar.getBoundingClientRect().right) {
                offsetTriggerScroll = triggerD.scroll() - section.offset().top
                gsap.set(handler, {
                    x: barLength * offsetTriggerScroll / maxScroll + offsetBarLeft
                });
            }
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
}
export {
    dashboardToFixed,
    draggableTrigger
}
import {
    gsap,
    TimelineMax,
    TweenMax,
    Elastic,
    Power1
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

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(MorphSVGPlugin)
gsap.registerPlugin(Draggable)

const dashboard = $('.work-dashboard')
const section = $('.work-section')

let dashboardToFixed = function () {
    /* Pinns the dashboard when scrolling 
       Animates the github svg */

    let stAnimation = new TimelineMax()
    stAnimation.to('#github-icon-bg', {
        transformOrigin: "530px 530px",
        rotate: 500,
    })
    // this ScrollTrigger will use the window/<body> by default, calling onRefresh when the page resizes, and onUpdate whenever any scroll happens. 
    ScrollTrigger.create({
        trigger: dashboard,
        start: 'top 24%',
        animation: stAnimation,
        pin: dashboard,
        endTrigger: section,
        end: 'bottom 90%',
        scrub: 2,
        ease: Elastic.easeOut
    })


}
ScrollTrigger.refresh()

const draggableTrigger = function () {
    let handler = document.querySelector("#handler"),
        barLength, maxScroll, triggerD, draggable, offsetTriggerScroll
    let bar = document.querySelector(".bar")
    barLength = document.querySelector(".bar").offsetWidth - handler.offsetWidth;

    triggerD = ScrollTrigger.create({
        trigger: section,
        start: 'top 0%',
        end: 'bottom 100%',
        onRefresh: onResize,
        onUpdate: updateHandler,
    })

    draggable = Draggable.create(handler, {
        type: "x",
        bounds: ".bar",
        edgeResistance: 0.9,
        onDrag: function () {
            let normalizer
            normalizer = ScrollTrigger.normalizeScroll({})
            triggerD.scroll((this.x * maxScroll / barLength) + section.offset().top); // when dragging, scroll the page to the corresponding ratio
            normalizer.kill()
        }
    })[0];

    function onResize() {
        if (triggerD) {
            // record the maximum scroll value for the page
            maxScroll = section.innerHeight() - screen.height
            barLength = document.querySelector(".bar").offsetWidth - handler.offsetWidth;
            updateHandler();
        }
    }

    function updateHandler() {
        // move the handler to the corresponding ratio according to the page's scroll position.
        maxScroll = section.innerHeight() - screen.height
        offsetTriggerScroll = triggerD.scroll() - section.offset().top
        let handlerRect = handler.getBoundingClientRect()
        if (handlerRect.x > barLength + bar.getBoundingClientRect().x) {
            gsap.set(handler, {
                x: barLength
            });
        } else if (triggerD.scroll() > section.offset().top) {
            gsap.set(handler, {
                x: barLength * offsetTriggerScroll / maxScroll
            });
        }
    }
    updateHandler()
}
export {
    dashboardToFixed,
    draggableTrigger
}
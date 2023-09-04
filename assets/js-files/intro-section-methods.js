import {
    Draggable
} from '../node_modules/gsap/Draggable.js'
import {
    gsap,
    TimelineMax,
    Elastic
} from "../node_modules/gsap/index.js"
import {
    MorphSVGPlugin
} from "../node_modules/gsap/MorphSVGPlugin.js"
import {
    ScrollTrigger
} from '../node_modules/gsap/ScrollTrigger.js'
gsap.registerPlugin(MorphSVGPlugin)
gsap.registerPlugin(Draggable)

const pdfSvgMouseover = function (svgPaths) {
    /**
     * creates the timeline for touchstart or mouseover events
     **/
    let tl = new TimelineMax()
    for (let gElement of svgPaths) {
        let startPath
        let endPath
        for (let path of gElement.children) {
            if (path.getAttribute('data-name') == "start") {
                startPath = path
            } else {
                endPath = path
            }
        }
        tl.to(startPath, {
            morphSVG: endPath,
            duration: 0.5,
            ease: Elastic.easeOut,
        }, '-=0.4')
    }
}

const pdfSfgMouseleave = function (svgPaths) {
    /**
     * creates the timeline for touchend or mouseleave events
     **/
    let tl = new TimelineMax()
    for (let gElement of svgPaths) {
        for (let path of gElement.children) {
            tl.to(path, {
                morphSVG: path,
                duration: 0.5,
                ease: Elastic.easeOut,
            }, '-=0.45')
        }
    }
}

const hoverDownloadPDF = function (svgElement, svgPaths) {
    /**
     * animates the DownloadPDFSvg on hover or tocuh events
     **/
    let hoverMain = new TimelineMax()
    svgElement.addEventListener('mouseover', () => {
        hoverMain.add(pdfSvgMouseover(svgPaths), '<')
    })
    svgElement.addEventListener('mouseleave', () => {
        hoverMain.add(pdfSfgMouseleave(svgPaths), )
    })
    svgElement.addEventListener('touchstart', () => {
        hoverMain.add(pdfSvgMouseover(svgPaths), '+>')
    })
    svgElement.addEventListener('touchend', () => {
        hoverMain.add(pdfSfgMouseleave(svgPaths), '>')
    })
    return hoverMain
}

const loadIntroSection = function (selectors) {
    /**
     * loads the intro-section elements
     **/
    const loadTl = new TimelineMax({
        defaults: {
            duration: 2,
            ease: Elastic.easeOut,
        }
    })
    loadTl.from('.intro-section', {
        opacity: 0,
        duration:1,
    })
    loadTl.from('.tech-row-card', {
        opacity: 0,
        x: -200,
        stagger: 0.4,
  
    })
    loadTl.from('.intro-heading', {
        opacity: 0,
        y: -100,
        stagger: 0.4
    },'<')
    loadTl.from('.tech', {
        opacity: 0,
        x: -100,
        stagger: 0.3
    },'<')
    loadTl.from('.education-wrapper', {
        opacity: 0,
        y: 10,
    },'<')
    loadTl.from('.education-image', {
        opacity: 0,
        x: 40,
    },'<')

    ScrollTrigger.create({
        trigger: '.intro-section',
        start: 'top 80%',
        animation: loadTl,
        end: 'bottom 80%',
        toggleActions: "play reverse play reverse",

    })
}

export {
    hoverDownloadPDF,
    loadIntroSection,
}
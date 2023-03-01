import {
    gsap,
    TimelineMax,
    Elastic
} from '/node_modules/gsap/index.js'
import {
    MorphSVGPlugin
} from '/node_modules/gsap/MorphSVGPlugin.js'

gsap.registerPlugin(MorphSVGPlugin)
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
}

export {
    hoverDownloadPDF,
    loadIntroSection
}
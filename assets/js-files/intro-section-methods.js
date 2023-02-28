import {
    gsap,
    TimelineMax,
    Elastic
} from '../../node_modules/gsap/index.js'
import {
    MorphSVGPlugin
} from '../../node_modules/gsap/MorphSVGPlugin.js'
gsap.registerPlugin(MorphSVGPlugin)

let pdfSvgMouseover = function (svgPaths) {
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

let pdfSfgMouseleave = function (svgPaths) {
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

let hoverDownloadPDF = function (svgElement, svgPaths) {
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

export {
    hoverDownloadPDF
}
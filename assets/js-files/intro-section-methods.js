import {
    gsap,
    TimelineMax,
    Power2,
    Elastic
} from '../../node_modules/gsap/index.js'
import {
    MorphSVGPlugin
} from '../../node_modules/gsap/MorphSVGPlugin.js'
gsap.registerPlugin(MorphSVGPlugin)


let hoverDownloadPDF = function (svgElement, svgPaths) {
    svgElement.addEventListener('mouseover', () => {
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
            }, '<')
        }

    })
    svgElement.addEventListener('mouseleave', () => {
        let tl = new TimelineMax()
        for (let gElement of svgPaths) {
            for (let path of gElement.children) {
                tl.to(path, {
                    morphSVG: path,
                    duration: 1,
                    ease: Elastic.easeOut,
                }, '<')
            }
        }
    })
}


export {
    hoverDownloadPDF
}
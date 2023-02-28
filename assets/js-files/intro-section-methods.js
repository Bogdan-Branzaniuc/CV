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

const newPathsMap = {
    1: "M 940.41 594.65 c -6.53 71.39 -32.12 136.45 -71.33 190.66 l -44.04 -32.04 c 41.07 -55.82 64.57 -124.19 64.7 -195.79 l 52.25 0.44 c 0.05 12.11 -0.46 24.42 -1.59 36.74 Z",
    2: "M 830.3 981.97 c -33.46 26.01 -72.63 45.08 -115.32 54.92 l -6.89 -28.73 l -3.14 -14.15 c 8.25 -1.83 16.4 -4.12 24.6 -6.79 c 27.6 -9.14 52.48 -22.45 74.32 -39.08 l 26.43 33.83 Z",
    3: "M 535.06 967.4 c -2.24 0.07 -4.47 0.07 -6.71 0.07 c -47.06 0 -92.35 -7.59 -134.73 -21.56 v -0.07 l 19.87 -61.7 c 38.17 12.82 78.59 19.46 119.74 19.12 l 1.83 64.14 Z",
    4: "M 210.41 932.87 l -32.08 47.29 l -0.06 0.12 C 88.36 918.15 26.58 818.19 15.99 703.38 l 55.49 -5.57 c 2.39 23.11 7.3 46.33 14.85 69.32 c 23.16 69.97 67.7 126.9 124.09 165.75 Z",
    5: "M 326.91 313.98 c -25.74 22.43 -46.87 49.2 -62.67 78.62 l -0.41 -0.16 c -6.42 12.02 -11.96 24.45 -16.57 37.19 l -12.79 -4.61 l -32.68 -12.33 c 19.73 -52.62 52.62 -98.77 94.63 -134.56 l 30.51 35.84 Z",
    5.5: "M 138.78 172.45 c -27.81 39.99 -47.73 84.4 -59.35 130.61 l -0.63 -0.07 c -4.7 18.86 -8.04 37.99 -9.99 57.23 l -19.31 -1.92 L 0 352.61 c 8.99 -79.68 38.43 -154.99 84.09 -219.14 l 54.69 38.97 Z",
    6: "M 443.34 52.51 c -29.03 7.57 -57.36 19.12 -84.58 34.75 l -26.56 -47.99 c 30.31 -17.03 63.23 -30.35 98.45 -39.27 l 12.68 52.51 Z",
    7: "M 1010.22 242.48 l -6.63 1.7 l -46.36 11.84 c -5.06 -18.48 -12.24 -36.66 -21.63 -54.36 c -28.6 -53.85 -73.18 -94.36 -125.1 -118.74 l 20.18 -42.47 l 0.28 -0.56 c 88 38.04 153.64 113.13 179.26 202.59 Z",
    arrow: "M 578.65 205.73 c 0 -14.19 -11.47 -25.66 -25.66 -25.66 s -25.66 11.47 -25.66 25.66 v 194.59 l -58.85 -58.85 c -10.02 -10.02 -26.3 -10.02 -36.32 0 s -10.02 26.3 0 36.32 l 102.63 102.63 c 10.02 10.02 26.3 10.02 36.32 0 l 102.63 -102.63 c 10.02 -10.02 10.02 -26.3 0 -36.32 c -10.02 -10.02 -26.3 -10.02 -36.32 0 l -58.77 58.85 V 205.73 Z",
    disk: "M 707.74 549.82 h -81.38 l -36.32 36.32 c -20.04 20.04 -52.52 20.04 -72.56 0 l -36.24 -36.32 h -81.38 c -28.3 0 -51.31 23.01 -51.31 51.31 v 25.66 c 0 28.3 23.01 51.31 51.31 51.31 h 307.88 c 28.3 0 51.31 -23.01 51.31 -51.31 v -25.66 c 0 -28.3 -23.01 -51.31 -51.31 -51.31 Z m -16.84 85.79 c -10.62 0 -19.24 -8.62 -19.24 -19.24 s 8.62 -19.24 19.24 -19.24 s 19.24 8.62 19.24 19.24 s -8.62 19.24 -19.24 19.24 Z",
}

let hoverDownloadPDF = function (svgElement, svgPaths) {
    let oldPathObject = {}
    for (let path of svgPaths) {
        let pathName = path.className.baseVal.split(' ')[1].split('-')[2]
        let oldShape = path.getAttribute('d')
        oldPathObject[pathName] = oldShape
    }
    svgElement.addEventListener('mouseover', () => {

        for (let path of svgPaths) {
            let tl = new TimelineMax()
            let pathName = path.className.baseVal.split(' ')[1].split('-')[2]

            tl.to(path, {
                morphSVG: newPathsMap[pathName],
                ease: Elastic.easeOut,
                duration: 0.5
            }, '<')

        }
    })

    svgElement.addEventListener('mouseleave', () => {
        let tl = new TimelineMax()
        for (let path of svgPaths) {
            let pathName = path.className.baseVal.split(' ')[1].split('-')[2]

            tl.to(path, {
                morphSVG: oldPathObject[pathName],
                ease: Elastic.easeOut,
                duration: 0.5
            }, '<')
        }
    })


}

export {
    hoverDownloadPDF
}
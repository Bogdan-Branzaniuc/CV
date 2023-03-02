import {
    gsap,
    TimelineMax,
    Elastic
} from "../node_modules/gsap/index.js"


import {
    MorphSVGPlugin
} from "../node_modules/gsap/MorphSVGPlugin.js"




let mapTest = function (svgStart, svgEnd) {

    let tl = new TimelineMax()
    tl.to(svgStart, 1, {
        morphSVG: {
            shape: svgEnd,
            map: "complexity"
        }
    });
}


export {
    mapTest
}
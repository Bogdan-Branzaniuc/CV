import {
    gsap,
    TimelineMax,
    Elastic
} from "../node_modules/gsap/index.js"

let mapTest = function () {
    let main = new TimelineMax({
        repeat: -1,
        yoyo: true
    })
    let tl = new TimelineMax()
    tl.to('#eqjs-path', 3, {
        morphSVG: {
            shape: '#turing-path',
            map: "complexity",
            type: 'rotational',
        },
        fill: '#143173',
    });

    main.add(tl)
}

let createSinglePath = function (selector, selectorId, pathClass) {
    let blackPath = ''
    for (let path of selector.children) {

        blackPath += path.attributes['d'].nodeValue

    }
    console.log('<path class = "' + pathClass + '" id="' + selectorId + '" d="' + blackPath + '"></path>')

}

export {
    mapTest,
    createSinglePath
}
import {
    gsap,
    TimelineMax,
    Elastic,
    Bounce,
    Power3,
} from '../node_modules/gsap/index.js'

import {
    MorphSVGPlugin
} from '../node_modules/gsap/MorphSVGPlugin.js'

import {
    Draggable
} from '../node_modules/gsap/Draggable.js'


console.log('connected')

let buttons = document.querySelectorAll('.principles-buttons')

for (let button of buttons) {
    button.addEventListener('click', (e) => {
        let mainSvg = '#mentors-svg'
        let buttonClassName = button.classList[2]
        let newSvgId = '#' + buttonClassName.replace('button', 'svg')
        if (document.querySelector(newSvgId)) {
            let tl = new TimelineMax()
            tl.to(mainSvg, {
                morphSVG: {
                    shape: newSvgId,
                    type: 'linear',
                    map: 'complexity',
                },
                duration: 3,
                rotate: "360",
                ease: Power3.easeOut,
            })
        }
    })
}
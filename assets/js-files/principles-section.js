import {
    gsap,
    TimelineMax,
    Elastic,
    Bounce,
    TimelineLite,
    Power2,
} from '../node_modules/gsap/index.js'

import {
    MorphSVGPlugin
} from '../node_modules/gsap/MorphSVGPlugin.js'

import {
    Draggable
} from '../node_modules/gsap/Draggable.js'

let buttons = document.querySelectorAll('.principles-buttons')
let mainSvg = '#principles-svg'

let buttonsCoords = []


for (let button of buttons) {
    button.addEventListener('click', (e) => {
        let buttonClassName = button.classList[2]
        let newSvgId = '#' + buttonClassName.replace('button', 'svg')
        changePrinciple(newSvgId)
        snapToNewButton(e.target)
    })
    let btnCoords = button.getBoundingClientRect()
    buttonsCoords.push({
        x: Math.round(btnCoords.x) + 20,
        y: Math.round(btnCoords.y) + 20
    })


    //draggable.isTouching

    // button.addEventListener('mouseover', (e) => {
    //     let buttonClassName = button.classList[2]
    //     let newSvgId = '#' + buttonClassName.replace('button', 'svg')
    //     changePrinciple(newSvgId)
    // })
}
console.log(buttonsCoords)
let draggable = Draggable.create('.draggable-remote', {
    type: "x y",
    bounds: ".buttons-area-container",
    snap: {
        x: function (endvalue) {

        },
        y: function (endvalue) {

        }
    },
})
console.log(draggable)


function snapToNewButton(newButton) {
    console.log(newButton)
}



function changePrinciple(newSvgId) {
    if (document.querySelector(newSvgId)) {
        let tl = new TimelineMax()
        tl.to(mainSvg, {
            morphSVG: {
                shape: newSvgId,
                type: 'rotational',
                map: 'compexity',
                origin: '30% 0%'
            },
            duration: 2,
            ease: Elastic.easeInOut,
        })
        tl.to(mainSvg, {
            morphSVG: {
                shape: newSvgId,
                type: 'linear',
                map: 'compexity',
                origin: '50% 50%'
            },
            duration: 0.6,
            ease: Power2.easeOut,
        }, )
    }
}
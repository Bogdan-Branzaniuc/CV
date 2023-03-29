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

gsap.registerPlugin(MorphSVGPlugin)
gsap.registerPlugin(Draggable)
let buttons = document.querySelectorAll('.principles-buttons')
let mainSvg = '#principles-svg'

let buttonsCoords = []
let i = 0
for (let button of buttons) {
    button.addEventListener('click', (e) => {
        let buttonClassName = button.classList[2]
        let newSvgId = '#' + buttonClassName.replace('button', 'svg')
        changePrinciple(newSvgId)
        snapToNewButton(e.target)
    })
    let buttonY = button.offsetTop
    let buttonX = button.offsetLeft

    let btnCoords = {
        x: buttonX,
        y: buttonY,
    }
    buttonsCoords.push({
        'x': btnCoords.x,
        'y': btnCoords.y
    })

    window.addEventListener('resize', (e) => {
        buttonY = button.offsetTop
        buttonX = button.offsetLeft
        buttonsCoords[i] = {
            x: buttonX,
            y: buttonY,
        }
        console.log(buttonsCoords[i].x)
    })
    //draggable.isTouching

    // button.addEventListener('mouseover', (e) => {
    //     let buttonClassName = button.classList[2]
    //     let newSvgId = '#' + buttonClassName.replace('button', 'svg')
    //     changePrinciple(newSvgId)
    // })
    i++
}
console.log(buttonsCoords)
for (let coord of buttonsCoords) {
    let coordsSquare = document.createElement('div')
    coordsSquare.classList.add('blue-test-circles')
    coordsSquare.style.left = coord.x + 'px'
    coordsSquare.style.top = coord.y + 'px'
    console.log(coordsSquare.style)
    document.querySelector('.buttons-area-container').appendChild(coordsSquare)
    window.addEventListener('resize', (e) => {
        coordsSquare.style.left = coord.x + 'px'
        coordsSquare.style.top = coord.y + 'px'
        console.log('resize')
    })
}


let draggable = Draggable.create('.draggable-remote', {
    type: "x y",
    bounds: ".buttons-area-container",
    inertia: true,
    liveSnap: {
        points: buttonsCoords,
        radius: 40,
    },
    onResize: (self) => {
        console.log('fasdfsad')
    }
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
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
import {
    InertiaPlugin
} from '../node_modules/gsap/InertiaPlugin.js'

gsap.registerPlugin(MorphSVGPlugin)
gsap.registerPlugin(Draggable)
gsap.registerPlugin(InertiaPlugin)
let buttons = document.querySelectorAll('.principles-buttons')
let mainSvg = '#principles-svg'

function resize(button) {
    let buttonY = button.offsetTop
    let buttonX = button.offsetLeft
    buttonsCoordsX[i] = buttonX
    buttonsCoordsY[i] = buttonY
    return {
        x: buttonX,
        y: buttonY
    }
}

let buttonsCoordsX = []
let buttonsCoordsY = []
let i = 0

for (let button of buttons) {
    button.addEventListener('click', (e) => {
        let buttonClassName = button.classList[2]
        let newSvgId = '#' + buttonClassName.replace('button', 'svg')
        changePrinciple(newSvgId)
        snapToNewButton(e.target)
    })

    let btnCoords = resize(button)

    buttonsCoordsX.push(btnCoords.x)
    buttonsCoordsY.push(btnCoords.y)

    window.addEventListener('resize', () => {
        resize(button)
    })
    //draggable.isTouching
    i++
}

// for (let coord of buttonsCoords) {
//     let coordsSquare = document.createElement('div')
//     coordsSquare.classList.add('blue-test-circles')
//     coordsSquare.style.left = coord.x + 'px'
//     coordsSquare.style.top = coord.y + 'px'
//     console.log(coordsSquare.style)
//     document.querySelector('.buttons-area-container').appendChild(coordsSquare)

//     // window.addEventListener('resize', (e) => {
//     //     coordsSquare.style.left = coord.x + 'px'
//     //     coordsSquare.style.top = coord.y + 'px'
//     //     console.log('resize')
//     // })
// }

Draggable.create('.draggable-remote', {
    type: "x y",
    bounds: ".buttons-area-container",
    inertia: true,
    edgeResistance: 0.65,
    snap: {
        x: function (endvalue) {
            let coordIndex = buttonsCoordsX.reduce((incrementIndex, coord, currentIndex, array) => {
                if (Math.abs(coord - endvalue) < Math.abs(array[incrementIndex] - endvalue)) {
                    return currentIndex
                } else {
                    return incrementIndex
                }
            }, 0)
            console.log(coordIndex)
            return buttonsCoordsX[coordIndex]
        },
        y: function (endvalue) {
            let coordIndex = buttonsCoordsY.reduce((incrementIndex, coord, currentIndex, array) => {
                if (Math.abs(coord - endvalue) < Math.abs(array[incrementIndex] - endvalue)) {
                    return currentIndex
                } else {
                    return incrementIndex
                }
            }, 0)
            console.log(coordIndex)
            return buttonsCoordsY[coordIndex]
        }
    }
})


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
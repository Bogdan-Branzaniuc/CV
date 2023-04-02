import {
    gsap,
    TimelineMax,
    Elastic,
    Bounce,
    TimelineLite,
    Power2,
    Power4,
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

import {
    ScrollTrigger
} from '../node_modules/gsap/ScrollTrigger.js'

gsap.registerPlugin(MorphSVGPlugin)
gsap.registerPlugin(Draggable)
gsap.registerPlugin(InertiaPlugin)
gsap.registerPlugin(ScrollTrigger)

let buttons = document.querySelectorAll('.principles-buttons')
let mainSvg = '#principles-svg'
let activeButton = 'scope-button'

function resizeWindow(button) {
    let buttonY = button.offsetTop
    let buttonX = button.offsetLeft
    return {
        x: buttonX,
        y: buttonY
    }
}
let buttonsCoordsX = []
let buttonsCoordsY = []
let whichY = 0

function createCoords() {
    buttonsCoordsX = []
    buttonsCoordsY = []
    let rowX = []

    for (let button of buttons) {
        gsap.set('.draggable-remote', {
            x: buttons[0].offsetLeft,
            y: buttons[0].offsetTop
        })
        button.addEventListener('click', (e) => {
            let buttonID = button.id
            let newSvgId = '#' + buttonID.replace('button', 'svg')
            changePrinciple(newSvgId)
            snapToNewButton(e.target)
        })
        let btnCoords = resizeWindow(button)
        let IncludedX = buttonsCoordsX.includes(btnCoords.x)
        let IncludedY = buttonsCoordsY.includes(btnCoords.y)
        if (!IncludedX) {
            if (btnCoords.x < rowX[rowX.length - 1]) {
                buttonsCoordsX.push(rowX)
                rowX = []
                rowX.push(btnCoords.x)
            } else {
                rowX.push(btnCoords.x)
            }
        }
        if (!IncludedY) {
            buttonsCoordsY.push(btnCoords.y)
        }
    }
    buttonsCoordsX.push(rowX)
    rowX = []
}
createCoords()

window.addEventListener('resize', () => {
    createCoords()
    scrollTriggerPrinciples.refresh()
})

let scrollTriggerPrinciples = ScrollTrigger.create({
    trigger: '.buttons-area-container',
    start: "top 65%",
    end: "bottom 40%",
    onEnter: () => {
        let currentButtonSvgId = '#' + activeButton.replace('button', 'svg')
        changePrinciple(currentButtonSvgId)
        console.log('enter')
    },
    onLeave: () => {
        changePrinciple('#principles-svg')
        console.log('leave')
    },
    onEnterBack: () => {
        let currentButtonSvgId = '#' + activeButton.replace('button', 'svg')
        changePrinciple(currentButtonSvgId)
        console.log('enter back')
    },
    onLeaveBack: () => {
        changePrinciple('#principles-svg')
        console.log('leave back')
    },
})

function proccessSnapX(endValue, whichYrow) {
    let coordIndex = buttonsCoordsX[whichYrow].reduce((incrementIndex, coord, currentIndex, array) => {
        if (Math.abs(coord - endValue) < Math.abs(array[incrementIndex] - endValue)) {
            return currentIndex
        } else {
            return incrementIndex
        }
    }, 0)
    return buttonsCoordsX[whichY][coordIndex]
}

function proccessSnapY(endValue) {
    let coordIndex = buttonsCoordsY.reduce((incrementIndex, coord, currentIndex, array) => {
        if (Math.abs(coord - endValue) < Math.abs(array[incrementIndex] - endValue)) {
            return currentIndex
        } else {
            return incrementIndex
        }
    }, 0)
    return coordIndex
}

Draggable.create('.draggable-remote', {
    type: "x, y",
    bounds: ".buttons-area-container",
    inertia: true,
    edgeResistance: 0.99,
    throwResistance: 900,
    onDrag: function (e) {
        proccessSnapY(gsap.getProperty('.draggable-remote', 'y'))
    },

    onThrowComplete: function (e) {
        isTouching(this)
    },
    snap: {
        x: function (endValue) {
            whichY = proccessSnapY(gsap.getProperty('.draggable-remote', 'y'))
            return proccessSnapX(endValue, whichY)
        },
        y: function (endValue) {
            return buttonsCoordsY[proccessSnapY(endValue)]
        },
    }
})

function isTouching(object) {
    for (let button of buttons) {
        if (object.hitTest(button)) {
            let svgId = '#' + button.id.replace('button', 'svg')
            changePrinciple(svgId)
        }
    }
}

function snapToNewButton(newButton) {
    let tl = new TimelineMax()
    tl.to('.draggable-remote', {
        x: newButton.offsetLeft,
        y: newButton.offsetTop,
        ease: Bounce.easeOut,
        duration: 1,
    })
    activeButton = newButton.id
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
            duration: 1,
            ease: Bounce.easeOut,
        })
        // tl.to(mainSvg, {
        //     morphSVG: {
        //         shape: newSvgId,
        //         type: 'linear',
        //         map: 'compexity',
        //         origin: '50% 50%'
        //     },
        //     duration: 0.6,
        //     ease: Power2.easeOut,
        // }, )
    }
}
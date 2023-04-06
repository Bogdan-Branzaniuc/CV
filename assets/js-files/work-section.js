import {
    gsap,
    TimelineMax,
    TweenMax,
    Elastic,
    Power1,
    Power2,
    Bounce,
    Power4
} from '../node_modules/gsap/index.js'
import {
    ScrollTrigger
} from '../node_modules/gsap/ScrollTrigger.js'
import {
    MorphSVGPlugin
} from '../node_modules/gsap/MorphSVGPlugin.js'
import {
    Draggable
} from '../node_modules/gsap/Draggable.js'

import {
    dashboardToFixed,
    draggableTrigger
} from './work-section-scrolling.js'
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(MorphSVGPlugin)
gsap.registerPlugin(Draggable)

ScrollTrigger.refresh()

const studiesBtn = $('.work-studies-button')
const projectsBtn = $('.work-projects-button')
const algoBtn = $('.work-algo-button')

let currentTabAndSvg = {
    tab: 'p',
    p: 'nuclearFusionP',
    s: 'eloquentJs',
    a: 'two-plus-two',
}
let currentGithubShape = '#github-icon'
let workSvgMainPathId = '#nuclearFusionP'

const section = $('.work-section')
const projectsInfo = $('.projects-info')
const studiesInfo = $('.studies-info')
const algosInfo = $('.algos-info')

let currentMainButton = 'work-projects-button'

let mainButtonsHandlerProjects = function () {
    projectsInfo.show()
    studiesInfo.hide()
    algosInfo.hide()
    githubSvgTo('#github-icon-svg')
}
let mainButtonsHandlerStudies = function () {
    projectsInfo.hide()
    studiesInfo.show()
    algosInfo.hide()
    githubSvgTo('#github-icon-nerd-svg')
}
let mainButtonsHandlerAlgos = function () {
    projectsInfo.hide()
    studiesInfo.hide()
    algosInfo.show()
    githubSvgTo('#github-icon-mad-svg')
}


let githubSvgTo = function (githubTarget) {
    let github = '#github-icon'
    let githubBg = github + '-bg'
    githubTarget = githubTarget.replace('-svg', '')
    let githubTargetBg = githubTarget + '-bg'

    if (githubTarget != currentGithubShape) {
        let tl = new TimelineMax()
        tl.to(github, {
            morphSVG: {
                shape: githubTarget,
                type: 'linear',
                map: 'complexity',
            },
            duration: 1,
            ease: Power2.easeOut,
        })
        tl.to(githubBg, {
            morphSVG: {
                shape: githubTargetBg,
                type: 'linear',
                map: 'linear',
            },
            duration: 1,
            ease: Power2.easeIn,
        }, '<')
    }
    currentGithubShape = githubTarget
}

function hideAllTabs() {
    $('.projects-info').css('display', 'none')
    $('.studies-info').css('display', 'none')
    $('.algos-info').css('display', 'none')
}

const updateInnerTabElementSvg = function () {
    /* Updates the svg of the current scrolled-to tabElement
     when changing tabs and scrolling through their elements*/
    let currentSvg = currentTabAndSvg[currentTabAndSvg.tab] //default projects svg
    let currentTab = document.querySelector('.nuclearFusionP')
    const tabSvgUpdate = (currentSvgSource, currentTabElementClass) => {
        let maintl = new TimelineMax()
        let exSvgId = '#' + currentSvg
        currentSvg = currentSvgSource
        let currentSvgId = '#' + currentSvg
        let tl = new TimelineMax()
        hideAllTabs()
        currentTab = document.querySelector('.' + currentTabElementClass)
        if (currentTab) currentTab.style.display = 'flex'
        let currentSvgFill = $('.' + currentSvg + '-fill').css('fill')
        let currentSvgStroke = $('.' + currentSvg + '-fill').css('stroke')
        if (currentSvgId != exSvgId) {
            tl.to(workSvgMainPathId, {
                morphSVG: {
                    shape: currentSvgId,
                    type: 'rotational',
                    map: 'complexity',
                },
                duration: 2,
                fill: currentSvgFill,
                stroke: currentSvgStroke,
                ease: Power4.easeOut,
            })
        }
        maintl.add(tl)
    }
    document.addEventListener('tabElementChanged', (e) => {
        let redTapeLottie = document.querySelector('#red-tape-p-lottie')
        redTapeLottie.play()
        let tabElementClass = e.detail.className.split(' ')[1]
        let elementCategory = tabElementClass[tabElementClass.length - 1].toLowerCase()
        currentTabAndSvg[elementCategory] = tabElementClass
        if (currentTabAndSvg.tab == elementCategory) {
            tabSvgUpdate(tabElementClass, tabElementClass)
        }
    })
    document.addEventListener('mainButtonPressed', (e) => {
        tabSvgUpdate(e.detail[e.detail.tab], e.detail[e.detail.tab])
    })
}


let mainButtonsHandler = function (e) {
    // the custom event sends the old currentTabAndSvg configuration as detail
    // the dom event e sets the new configuration by case
    const mainButtonPressed = new CustomEvent('mainButtonPressed', {
        detail: currentTabAndSvg,
        bubbles: true,
        cancelable: true,
        composed: false,
    })
    let btnClasses = e.target.className.split(' ')
    let btnClass = btnClasses[btnClasses.length - 1]
    if (btnClass == 'work-projects-button') {
        mainButtonsHandlerProjects()
        currentTabAndSvg.tab = 'p'
    } else if (btnClass == 'work-studies-button') {
        mainButtonsHandlerStudies()
        currentTabAndSvg.tab = 's'
    } else if (btnClass == 'work-algo-button') {
        mainButtonsHandlerAlgos()
        currentTabAndSvg.tab = 'a'
    }
    let tl = new TimelineMax()
    tl.fromTo('.info-wrapper', {
        opacity: 0,
        x: 200,
    }, {
        opacity: 100,
        x: 0,
    })
    document.dispatchEvent(mainButtonPressed)
    ScrollTrigger.refresh()
    currentMainButton = btnClass

    updateMainButtons(btnClass)
}

function updateMainButtons(buttonPressedClass) {
    let buttons = document.querySelectorAll('.work-main-btn')
    let timelinel1 = new TimelineMax()
    for (let button of buttons) {
        let btnClasses = button.classList
        if (btnClasses[btnClasses.length - 1] == buttonPressedClass) {
            timelinel1.to(button, {
                width: '80%',
                x: '10%',
                height: '120%',
                duration: 1.5,
                fontSize: '110%',
                color: 'white',
                ease: Elastic.easeOut,
            }, '<')
        } else {
            timelinel1.to(button, {
                width: '100%',
                x: 0,
                height: '70%',
                fontSize: '100%',
                duration: 1.5,
                color: '#BDACD3',
                ease: Elastic.easeOut
            }, '<')
        }
    }
}

let main = function () {
    mainButtonsHandlerProjects() //default projects tab
    for (let btn of [studiesBtn, projectsBtn, algoBtn]) {
        btn.click((e) => {
            mainButtonsHandler(e)
        })
    }
    createTabsScrollTriggers(projectsInfo)
    createTabsScrollTriggers(studiesInfo)
    createTabsScrollTriggers(algosInfo)
    updateInnerTabElementSvg()
    dashboardToFixed()
    // update slider animation method
    draggableTrigger()
}


const createTabsScrollTriggers = function (tabInfo) {
    /*Creates a scrolltrigger for each of the three tabs, as they have multiple elements inside*/
    let breakPointIncrement = section.height() / tabInfo.length + 1
    let startPoint = 0
    let endPoint = breakPointIncrement
    // create breaking points for the number of elements in the info-tab
    for (let element of tabInfo) {
        const innerTabNewElement = new CustomEvent('tabElementChanged', {
            detail: element,
            bubbles: true,
            cancelable: true,
            composed: false,
        })
        let enter = new TimelineMax({
            paused: true
        })
        let leave = new TimelineMax({
            paused: true
        })
        let main = new TimelineMax()
        enter.from(element, {
            x: -200,
            opacity: 0,
        })
        leave.to(element, {
            x: 200,
            opacity: 0,
        })
        ScrollTrigger.create({
            trigger: section,
            start: `${startPoint} 30%`,
            end: `${endPoint} 30%`,
            onEnter: () => {
                document.dispatchEvent(innerTabNewElement)
                main.add(enter.play())
            },
            onLeave: () => {
                document.dispatchEvent(innerTabNewElement)
                main.add(leave.play())
            },
            onEnterBack: () => {
                document.dispatchEvent(innerTabNewElement)
                main.add(leave.reverse())
            },
            onLeaveBack: () => {
                document.dispatchEvent(innerTabNewElement)
                main.add(enter.reverse())
            },
        })
        startPoint += breakPointIncrement
        endPoint += breakPointIncrement
    }
}
export {
    main
}
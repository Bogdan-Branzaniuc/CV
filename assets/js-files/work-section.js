import {
    gsap,
    TimelineMax,
    Elastic,
    Power1
} from '../node_modules/gsap/index.js'
import {
    ScrollTrigger
} from '../node_modules/gsap/ScrollTrigger.js'

import {
    MorphSVGPlugin
} from '../node_modules/gsap/MorphSVGPlugin.js'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(MorphSVGPlugin)
ScrollTrigger.refresh()

const section = $('.work-section')
const dashboard = $('.work-dashboard')
const studiesBtn = $('.work-studies-button')
const projectsBtn = $('.work-projects-button')
const algoBtn = $('.work-algo-button')

let currentTabAndSvg = {
    tab: 'p',
    p: 'nuclearFusionP',
    s: 'eloquentJs',
    a: 'two-plus-two',
}
const projectsInfo = $('.projects-info')
const studiesInfo = $('.studies-info')
const algosInfo = $('.algos-info')

let workSvgMainPathId = '#nuclearFusionP'

let mainButtonsHandlerProjects = function () {
    projectsInfo.show()
    studiesInfo.hide()
    algosInfo.hide()
    section.height('300vh')
    // github svg change
    // 
}
let mainButtonsHandlerStudies = function () {
    projectsInfo.hide()
    studiesInfo.show()
    algosInfo.hide()
    section.height('300vh')
}
let mainButtonsHandlerAlgos = function () {
    projectsInfo.hide()
    studiesInfo.hide()
    algosInfo.show()
    section.height('450vh')
}


let dashboardToFixed = function () {
    /* Pinns the dashboard when scrolling */
    ScrollTrigger.create({
        trigger: dashboard,
        start: 'top 24%',
        pin: dashboard,
        endTrigger: section,
        end: 'bottom 90%',
    })
}


const updateInnerTabElementSvg = function () {
    /* Updates the svg of the current scrolled-to tabElement
     when changing tabs and scrolling through their elements*/
    let currentSvg = currentTabAndSvg[currentTabAndSvg.tab] //default projects svg

    const tabSvgUpdate = (currentSvgSource) => {
        let maintl = new TimelineMax()
        let exSvgId = '#' + currentSvg
        currentSvg = currentSvgSource
        let currentSvgId = '#' + currentSvg
        let tl = new TimelineMax()

        console.log(exSvgId, currentSvgId)
        let currentSvgFill = $('.' + currentSvg + '-fill').css('fill')
        let currentSvgStroke = $('.' + currentSvg + '-fill').css('stroke')
        console.log(currentSvgFill)
        tl.to(workSvgMainPathId, {
            morphSVG: {
                shape: currentSvgId,
                map: "complexity",
                type: 'rotational',
            },
            duration: 1.6,
            fill: currentSvgFill,
            stroke: currentSvgStroke,
            ease: Elastic.easeOut,

        })

        maintl.add(tl)
    }
    document.addEventListener('tabElementChanged', (e) => {
        let tabElementClass = e.detail.className.split(' ')[1]
        let elementCategory = tabElementClass[tabElementClass.length - 1].toLowerCase()
        currentTabAndSvg[elementCategory] = tabElementClass
        if (currentTabAndSvg.tab == elementCategory) {
            tabSvgUpdate(tabElementClass)
        }
    })
    document.addEventListener('mainButtonPressed', (e) => {
        tabSvgUpdate(e.detail[e.detail.tab])
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
    if (btnClasses[btnClasses.length - 1] == 'work-projects-button') {
        mainButtonsHandlerProjects()
        currentTabAndSvg.tab = 'p'
    } else if (btnClasses[btnClasses.length - 1] == 'work-studies-button') {
        mainButtonsHandlerStudies()
        currentTabAndSvg.tab = 's'
    } else if (btnClasses[btnClasses.length - 1] == 'work-algo-button') {
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
    // update slider animation method
    dashboardToFixed()
}


const createTabsScrollTriggers = function (tabInfo) {
    /*Creates a scrolltrigger for each of the three tabs, as they have multiple elements inside*/
    let count = 1

    for (let element of tabInfo) {
        const innerTabNewElement = new CustomEvent('tabElementChanged', {
            detail: element,
            bubbles: true,
            cancelable: true,
            composed: false,
        })

        let scrollTriggerId = 'scrollTrigger-' + tabInfo.attr('class').split(' ')[0] + count
        //console.log(scrollTriggerId)

        let pinBreakPoint = $(`.pin-b-${count}`)
        let nextBreakPoint = $(`.pin-b-${count+1}`)
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
            trigger: pinBreakPoint,
            id: scrollTriggerId,
            start: 'top 50%',
            endTrigger: nextBreakPoint,
            end: 'top 50%',
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
                document.dispatchEvent(innerTabNewElement),
                    main.add(enter.reverse())
            },
        })
        count++
    }
}
export {
    main
}
//requirements: 
//3 states of github svg
//1 svg for each project
//1 svg for each study
//1 svg for each algorithm
// slider + slider-button
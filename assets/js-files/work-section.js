import {
    gsap,
    TimelineMax,
    Elastic,
    Power1
} from '../node_modules/gsap/index.js'
import {
    ScrollTrigger
} from '../node_modules/gsap/ScrollTrigger.js'
gsap.registerPlugin(ScrollTrigger)
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

let mainButtonsHandlerProjects = function () {
    projectsInfo.show()
    studiesInfo.hide()
    algosInfo.hide()
    let tl = new TimelineMax()
    tl.from('.info-wrapper', {
        opacity: 0,
        x: 200,
    })
    section.height('300vh')

    // github svg change
    // 
}
let mainButtonsHandlerStudies = function () {
    projectsInfo.hide()
    studiesInfo.show()
    algosInfo.hide()
    let tl = new TimelineMax()
    tl.from('.info-wrapper', {
        opacity: 0,
        x: 200,
    })
    section.height('300vh')
}
let mainButtonsHandlerAlgos = function () {
    let tl = new TimelineMax()
    tl.from('.info-wrapper', {
        opacity: 0,
        x: 200,
    })
    projectsInfo.hide()
    studiesInfo.hide()
    algosInfo.show()
    section.height('500vh')
}

let mainButtonsHandler = function (e) {
    const mainButtonPressed = new CustomEvent('mainButtonPressed', {
        detail: currentTabAndSvg,
        bubbles: true,
        cancelable: true,
        composed: false,
    })
    let classes = e.target.className.split(' ')
    if (classes[classes.length - 1] == 'work-projects-button') {
        mainButtonsHandlerProjects()
        currentTabAndSvg.tab = 'p'
        console.log(currentTabAndSvg)
    } else if (classes[classes.length - 1] == 'work-studies-button') {
        mainButtonsHandlerStudies()
        currentTabAndSvg.tab = 's'
        console.log(currentTabAndSvg)
    } else if (classes[classes.length - 1] == 'work-algo-button') {
        mainButtonsHandlerAlgos()
        currentTabAndSvg.tab = 'a'
        console.log(currentTabAndSvg)
    }
    document.dispatchEvent(mainButtonPressed)
    ScrollTrigger.refresh()
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
    /* Updates the svg of the current scrolld-to tabElement */
    let currentSvg = currentTabAndSvg[currentTabAndSvg.tab] //default projects svg
    let maintl = new TimelineMax()

    document.addEventListener('tabElementChanged', (e) => {
        let tabElementClass = e.detail.className.split(' ')[1]
        let elementCategory = tabElementClass[tabElementClass.length - 1].toLowerCase()
        currentTabAndSvg[elementCategory] = tabElementClass
        console.log(currentTabAndSvg)
        if (currentTabAndSvg.tab == elementCategory) {
            let exSvg = currentSvg
            currentSvg = tabElementClass
            let tl = new TimelineMax()
            tl.to($('#' + currentSvg), {
                x: 50,
            })
            tl.to($('#' + exSvg), {
                x: 0,
            }, '>')
            maintl.add(tl)
        }
    })

    document.addEventListener('mainButtonPressed', (e) => {
        let exSvg = currentSvg
        currentSvg = e.detail[e.detail.tab]
        let tl = new TimelineMax()
        tl.to($('#' + currentSvg), {
            x: 50,
        })
        tl.to($('#' + exSvg), {
            x: 0,
        }, '>')
        maintl.add(tl)
    })

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
        console.log(element)
        const innerTabNewElement = new CustomEvent('tabElementChanged', {
            detail: element,
            bubbles: true,
            cancelable: true,
            composed: false,
        })

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
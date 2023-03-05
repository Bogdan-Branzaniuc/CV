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

const section = $('.work-section')
const dashboard = $('.work-dashboard')
const studiesBtn = $('.work-studies-button')
const projectsBtn = $('.work-projects-button')
const algoBtn = $('.work-algo-button')

const projectsTab = $('.work-projects-tab')
const studiesTab = $('.work-studies-tab')
const algoTab = $('.work-algo-tab')
studiesTab.hide()
algoTab.hide()

const projectsInfo = $('.projects-info')

let mainButtonsHandler = function (e) {
    let classes = e.target.className.split(' ')
    //create main timeline 
    //animation-out
    //slider of new state
    //github-shape of sellected tab

    //current project-heading-in
    //current project-svg-in
    //current project-buttons-in
    if (classes[classes.length - 1] == 'work-studies-button') {
        studiesTab.show()
        projectsTab.hide()
        algoTab.hide()

        section.addClass('tab-num-elements-3')
        section.removeClass('tab-num-elements-5')

    } else if (classes[classes.length - 1] == 'work-projects-button') {
        projectsTab.show()
        studiesTab.hide()
        algoTab.hide()

        section.addClass('tab-num-elements-3')
        section.removeClass('tab-num-elements-5')
    } else if (classes[classes.length - 1] == 'work-algo-button') {
        algoTab.show()
        studiesTab.hide()
        projectsTab.hide()

        section.addClass('tab-num-elements-5')
        section.removeClass('tab-num-elements-3')
    }
    ScrollTrigger.refresh()
}

for (let btn of [studiesBtn, projectsBtn, algoBtn]) {
    btn.click((e) => {
        mainButtonsHandler(e)
    })
}

let dashboardToFixed = function () {
    ScrollTrigger.create({
        trigger: dashboard,
        start: 'top 24%',
        pin: dashboard,
        endTrigger: section,
        end: 'bottom 90%',
    })
}


const createTabsScrollTriggers = function () {

    let count = 1
    for (let project of projectsInfo) {
        let pinBreakPoint = $(`.pin-b-${count}`)
        let nextBreakPoint = $(`.pin-b-${count+1}`)
        console.log(pinBreakPoint)
        let projectTl = new TimelineMax()
        projectTl.from(project, {
            x: -200,
            opacity: 0,
        })
        ScrollTrigger.create({
            animation: projectTl,
            trigger: pinBreakPoint,
            start: 'top 50%',
            endTrigger: nextBreakPoint,
            end: 'top 50%',
            toggleActions: 'play reverse play reverse',
        })
        count++
    }

}

let main = function () {
    createTabsScrollTriggers()
    dashboardToFixed()
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
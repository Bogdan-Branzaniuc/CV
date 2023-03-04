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

let section = $('.work-section')

let studiesBtn = $('.work-studies-button')
let projectsBtn = $('.work-projects-button')
let algoBtn = $('.work-algo-button')

let studiesTab = $('.work-studies-tab')
let projectsTab = $('.work-projects-tab')
let algoTab = $('.work-algo-tab')
studiesTab.hide()
algoTab.hide()

let mainButtonsHandler = function (e) {
    let classes = e.target.className.split(' ')

    //create main timeline 

    if (classes[classes.length - 1] == 'work-studies-button') {
        studiesTab.show()
        projectsTab.hide()
        algoTab.hide()
        section.addClass('four-items-section')
        ScrollTrigger.refresh()
    } else if (classes[classes.length - 1] == 'work-projects-button') {
        projectsTab.show()
        studiesTab.hide()
        algoTab.hide()
    } else if (classes[classes.length - 1] == 'work-algo-button') {
        algoTab.show()
        studiesTab.hide()
        projectsTab.hide()
    }
}

for (let btn of [studiesBtn, projectsBtn, algoBtn]) {
    btn.click((e) => {
        mainButtonsHandler(e)
        //animation-out
        //slider of new state
        //github-shape of sellected tab

        //current project-heading-in
        //current project-svg-in
        //current project-buttons-in

    })
}



//requirements: 
//3 states of github svg
//1 svg for each project
//1 svg for each study
//1 svg for each algorithm
// slider + slider-button
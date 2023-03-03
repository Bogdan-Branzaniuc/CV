// event listeners on 3 buttons
// methods
// tabs

let studiesBtn = $('.work-studies-button')
let projectsBtn = $('.work-projects-button')
let algoBtn = $('.work-algo-button')

let studiesTab = $('.work-studies-tab')
let projectsTab = $('.work-projects-tab')
let algoTab = $('.work-algo-tab')

let mainButtonsHandler = function (e) {
    let classes = e.target.className.split(' ')

    //gsap swithcing
    //unload and load
    //handle the github SVG and Slider acordingly
    if (classes[classes.length - 1] == 'work-studies-button') {
        studiesTab.show()
        projectsTab.hide()
        algoTab.hide()
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
    })
}
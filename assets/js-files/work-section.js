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
    InertiaPlugin
} from '../node_modules/gsap/InertiaPlugin.js'
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(InertiaPlugin)
gsap.registerPlugin(MorphSVGPlugin)
gsap.registerPlugin(Draggable)

let currentGithubShape = '#github-icon'
const section = $('.work-section')

const projectsInfo = $('.projects-info')
const studiesInfo = $('.studies-info')
const algosInfo = $('.algos-info')

function updateGithubSvg() {
    let githubTarget 
    if (currentTabAndSubjects['tab'] == 'projects'){
        githubTarget = '#github-icon-svg'
    }else if(currentTabAndSubjects['tab'] == 'studies'){
        githubTarget = '#github-icon-nerd-svg'
    }else if(currentTabAndSubjects['tab'] == 'algo'){
        githubTarget = '#github-icon-mad-svg'
    }
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

let currentTabAndSubjects = {
    tab: 'projects',
    projects: 'nuclearFusionP',
    studies: 'eloquentJsS',
    algo: 'algo-expertA',
}

function reloadTab(e, subject=false){
    /**
     * loads elements of a new work tab
     **/ 
    let oldTab = currentTabAndSubjects[currentTabAndSubjects['tab']]
    if (subject){
        currentTabAndSubjects[currentTabAndSubjects['tab']] = e.target.getAttribute('data-info')
        reloadCardInfo(oldTab)
        updateSubjectSvg()
    }else{
        let newTab = e.target.getAttribute('data-button').split('-')[1]
        if (currentTabAndSubjects['tab'] != newTab){
            reloadTabButtons(currentTabAndSubjects['tab'], newTab)
            currentTabAndSubjects['tab'] = newTab
            updateGithubSvg()
            reloadCardInfo(oldTab)
            updateSubjectSvg()
        }
    }
}


function updateSubjectSvg (){
    /* Updates the svg of the current scrolled-to tabElement
     when changing tabs and scrolling through their elements*/
    let currentSvg = currentTabAndSubjects[currentTabAndSubjects['tab']]
    let currentSvgId = '#' + currentSvg //default projects svg
    let workSvgMainPathId = '#nuclearFusionP'
    let tl = new TimelineMax()  
    let currentSvgFill = $('.' + currentSvg + '-fill').css('fill')
    let currentSvgStroke = $('.' + currentSvg + '-fill').css('stroke')
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

function reloadTabButtons(oldTabButtons, newTabButtons){
    /**
     * renders the buttons of a new Tab
     **/ 

    let oldButtonClass = '.' + oldTabButtons + '-button'
    let newTabButtonClass = '.' + newTabButtons  + '-button'

    let newTabButtonsDivClass = oldButtonClass + 's'
    let oldTabButtonsDivClass = newTabButtonClass + 's'
    

    const tl = new TimelineMax({
        defaults: {
            ease: Elastic.easeOut,
            duration: 1,
        }
    })
    tl.progress(0)
    tl.fromTo(oldButtonClass, {
        opacity: 100,
        y: -0,
    },{
        opacity: 0,
        y: -0,
        onComplete: toggleDisplay(oldTabButtonsDivClass),
    })
    tl.fromTo(newTabButtonClass, {
        onStart: toggleDisplay(newTabButtonsDivClass),
        opacity: 0,
        y: -100,
    },{
        opacity: 100,
        y: 0,
        stagger: 0.1
    }, '<')
}

let svgFocussCounter = 1

function reloadCardInfo(oldTab){
    /**
     * renders info div of the work tab
     **/ 
    let oldTabClass = '.' + oldTab

    const tl = new TimelineMax({
        defaults: {
            duration: 1,
            ease: Elastic.easeOut,
        }
    })
    let currentTab = currentTabAndSubjects['tab']
    let newTabClass = '.' + currentTabAndSubjects[currentTab]
    tl.fromTo(oldTabClass,{
        opacity:100,
        x: 0,
    },{
        opacity:0,
        x: -200,
        onComplete: toggleDisplay(oldTabClass),
    })
    tl.fromTo(newTabClass ,{
        delay:0.3,
        onStart: toggleDisplay(newTabClass),
        opacity:0,
        x: 200,
    },{
        opacity:100,
        x: 0,
    },'<')

    let newSelectorSvgId = '#extended_circle' + `${svgFocussCounter}`
    let spacer = document.querySelector('#work-section-left-spacer').getBoundingClientRect()
    let sellectedTabSubjectButton = document.querySelector('#' + currentTabAndSubjects[currentTab] + '-tab-button')
    let buttonX = sellectedTabSubjectButton.getBoundingClientRect().x - spacer.x -spacer.width + 10; 
    tl.to('#focused-tab-button',{
        rotate: '+=200',
        x: buttonX,
        duration: 1.5,
    }, '<')
    tl.to('#extended_circle1', {
        morphSVG: {
            shape: newSelectorSvgId,
            map: 'complexity',
        },
        transformOrigin:"center",
        duration: 1,
        ease: Power4.easeOut,
    }, '<')

    svgFocussCounter ++
    if (svgFocussCounter > 5) svgFocussCounter = 1
} 

const toggleDisplay = function(className){
    if ($(className).css('display') !== 'none'){
        $(className).css('display', 'none') 
    }else{
        $(className).css('display', 'flex')
    }
}

function addMainBtnsListeners(){
    for (let button of document.querySelectorAll('.work-main-btn')){
        button.addEventListener('click', reloadTab)
    }

    for (let button of document.querySelectorAll('.tab-button')){
        button.addEventListener('click', (e)=>{
            reloadTab(e, true)
        })
    }
}

const loadWorkSection = function(){
    /**
     * loads the work-section elements
     **/
    $('.nuclearFusionP').css('display', 'flex')
    $('.projects-buttons').css('display', 'flex')
    const loadTl = new TimelineMax({
        defaults: {
            duration: 2,
        }
    })
    loadTl.from('.work-section', {
        opacity: 0,
        onComplete: initiateBtn(),
    })

    ScrollTrigger.create({
        trigger: '.work-section',
        start: 'top 50%',
        animation: loadTl,
        end: 'bottom 50%',
        toggleActions: "play reverse play reverse",
    })
}

function initiateBtn(){
    let clickEvent = new Event('click')
    let currentBtn = document.querySelector('#'+ currentTabAndSubjects[currentTabAndSubjects['tab']] + '-tab-button')
    currentBtn.dispatchEvent(clickEvent)
}

function main(){
    addMainBtnsListeners()
    loadWorkSection()
    return true;
}

export {
    main,
}
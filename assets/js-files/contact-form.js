import {
    gsap,
    TimelineMax,
    TweenMax,
    Elastic,
    Power1,
    Power2,
    Power4,
    Bounce
} from '../node_modules/gsap/index.js'
import {
    MorphSVGPlugin
} from '../node_modules/gsap/MorphSVGPlugin.js'

gsap.registerPlugin(MorphSVGPlugin)

function contactForm() {
    // let formFields = document.querySelectorAll('.form-control')
    // window.addEventListener('click', (e) => {
    //     console.log('click')


    //     for (let formField of formFields) {
    //         let label = '#' + formField.id + '-label'
    //         if (e.target == formField) {
    //             let tl1 = new TimelineMax()
    //             tl1.to(formField, {
    //                 scale: 1.01,
    //                 borderRadius: '10px',
    //                 ease: Power1.easeOut,
    //                 duration: 0.5,
    //             })
    //             tl1.to(label, {
    //                 fontSize: "150%",
    //                 ease: Power1.easeOut,
    //                 duration: 0.5,
    //             }, '<')
    //         } else {
    //             let tl2 = new TimelineMax()
    //             tl2.to(formField, {
    //                 scale: 1,
    //                 borderRadius: '5px',
    //                 ease: Power1.easeOut,
    //                 duration: 0.5,
    //             })
    //             tl2.to(label, {
    //                 fontSize: "100%",
    //                 ease: Power1.easeOut,
    //                 duration: 0.5,
    //             }, '<')
    //         }
    //     }
    // })
}

function prepareFormSvgs() {
    let formFieldsSvgs = document.querySelectorAll('.form-group-svg')
    for (let fieldSvg of formFieldsSvgs) {
        console.log(fieldSvg)
        console.log(gsap.getProperty(fieldSvg.nextElementSibling, 'height'))
        let tl = new TimelineMax()

        tl.to('#rectangle-test', {
            morphSVG: {
                shape: '#nuclearFusionP',
                type: 'rotational',
                map: 'compexity',
                origin: '30% 0%'
            },
            duration: 1,
            ease: Bounce.easeOut,
        }, '<')
    }
}

function successfulMessage() {
    let formFieldsSvgs = document.querySelectorAll('.form-group-svg')
    let tl = new TimelineMax()
    tl.to('.form-control', {
        opacity: 0,
        //duration: 0.5,
    })
}


export {
    contactForm,
    prepareFormSvgs,
    successfulMessage
}
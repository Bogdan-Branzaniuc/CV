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
    let formFields = document.querySelectorAll('.form-control')
    let formSvgRects = document.querySelector('.contact-form-svg').children

    window.addEventListener('click', (e) => {
        let offsetTopSvgs = 12
        console.log('click')
        let i = 0
        for (let formField of formFields) {
            let label = '#' + formField.id + '-label'

            if (e.target == formField) {
                let tl = new TimelineMax()
                tl.to(formField, {
                    scale: 1.03,
                    ease: Power1.easeOut,
                    duration: 0.5,
                })
                tl.to(label, {
                    fontSize: "150%",
                    ease: Power1.easeOut,
                    duration: 0.5,
                }, '<')
                tl.to(formSvgRects[i], {
                    scale: 1.05,
                    x: '-2.5%',
                    y: offsetTopSvgs,
                    duration: 0.5,
                    ease: Power1.easeOut,
                }, '<')
            } else {
                let tl2 = new TimelineMax()
                tl2.to(formField, {
                    scale: 1,
                    ease: Power1.easeOut,
                    duration: 0.5,
                })
                tl2.to(label, {
                    fontSize: "100%",
                    ease: Power1.easeOut,
                    duration: 0.5,
                }, '<')
                tl2.to(formSvgRects[i], {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: Power1.easeOut,
                }, '<')
                console.log(e.target.id)
                if (e.target.id == 'name') {
                    tl2.to(formSvgRects[1], {
                        y: offsetTopSvgs,
                        ease: Power1.easeOut,
                    }, '<')
                    tl2.to(formSvgRects[2], {
                        y: offsetTopSvgs,
                        ease: Power1.easeOut,
                    }, '<')
                } else if (e.target.id == 'email') {
                    tl2.to(formSvgRects[2], {
                        y: offsetTopSvgs,
                        ease: Power1.easeOut,
                    }, '<')
                }
            }
            i++
        }
    })
}

function drawFormSvgs() {
    let form = document.querySelector('#contact-form')
    let formRect = form.getBoundingClientRect()
    let formWidth = formRect.width + 2
    let draw = SVG().size(formWidth, formRect.height).fill('none').addClass('contact-form-svg')
    draw.addTo(form)

    let formFields = document.querySelectorAll('.form-control')
    let formGroups = document.querySelectorAll('.form-group')
    let i = 0
    for (let field of formFields) {
        let fieldRect = field.getBoundingClientRect()
        let fieldBorderRadius = getComputedStyle(field).borderRadius
        let fieldSvg = draw.rect(fieldRect.width + 2, fieldRect.height).stroke({
            width: 1,
            color: 'white',
        }).radius(fieldBorderRadius)
        fieldSvg.move(0, formGroups[i].offsetTop + field.offsetTop)
        fieldSvg.addClass('field-svg')

        console.log(fieldSvg)
        i++
    }
}

function successfulMessage() {
    let tl = new TimelineMax({
        yoyo: true,
        repeat: 1
    })
    tl.to('.form-group', {
        opacity: 0,
        display: 'none',
        duration: 0.1,
    })
    tl.to(MorphSVGPlugin.convertToPath('.field-svg'), {
        morphSVG: {
            shape: '#github-icon-nerd',
            type: 'rotational',
            map: 'compexity',
            origin: '30% 0%'
        },
        duration: 5,
        ease: Elastic.easeInOut,
    })


}


export {
    contactForm,
    drawFormSvgs,
    successfulMessage
}
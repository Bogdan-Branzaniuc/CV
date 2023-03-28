import {
    gsap,
    TimelineMax,
    Elastic,
    Bounce,
    Power3,
    TimelineLite,
} from '../node_modules/gsap/index.js'

import {
    MorphSVGPlugin
} from '../node_modules/gsap/MorphSVGPlugin.js'

import {
    Draggable
} from '../node_modules/gsap/Draggable.js'

import {
    dotsTrazitionPath
} from '../media/svg/principles-titles-svg.js'


let buttons = document.querySelectorAll('.principles-buttons')
let mainSvg = '#mentors-svg'
for (let button of buttons) {
    button.addEventListener('click', (e) => {
        let dotsTranzition = '#dots-principles-explosion'
        let buttonClassName = button.classList[2]
        let newSvgId = '#' + buttonClassName.replace('button', 'svg')
        if (document.querySelector(newSvgId)) {
            let tl = new TimelineMax()
            tl.to(mainSvg, {
                morphSVG: {
                    shape: dotsTranzition,
                    type: 'linear',
                },
                duration: 1,
                ease: Power3.easeOut,
            })
            tl.to(mainSvg, {
                morphSVG: {
                    shape: newSvgId,
                    type: 'linear',
                },
                duration: 1,
                ease: Power3.easeOut,
            }, )
        }
    })
}





// To show the points

function createBlob(options) {
    let points = [];
    let path = options.element;
    let slice = (Math.PI * 2) / options.numPoints;
    let startAngle = gsap.utils.random(0, 360);

    let tl = gsap.timeline({
        onUpdate: update
    });

    for (let i = 0; i < options.numPoints; i++) {

        let angle = startAngle + i * slice;
        let duration = gsap.utils.random(options.minDuration, options.maxDuration);

        let point = {
            x: options.centerX + Math.cos(angle) * options.minRadius,
            y: options.centerY + Math.sin(angle) * options.minRadius
        };

        let tween = gsap.to(point, {
            duration,
            x: options.centerX + Math.cos(angle) * options.maxRadius,
            y: options.centerY + Math.sin(angle) * options.maxRadius,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        tl.add(tween, -gsap.utils.random(0, duration));
        points.push(point);
    }

    options.tl = tl;
    options.points = points;

    function update() {
        path.setAttribute("d", cardinal(points, true, 1));
    }

    return options;
}

// Cardinal spline - a uniform Catmull-Rom spline with a tension option
function cardinal(data, closed, tension) {

    if (data.length < 1) return "M0 0";
    if (tension == null) tension = 1;

    let size = data.length - (closed ? 0 : 1);
    let path = "M" + data[0].x + " " + data[0].y + " C";

    for (let i = 0; i < size; i++) {

        let p0, p1, p2, p3;

        let x1 = p1.x + (p2.x - p0.x) / 6 * tension;
        let y1 = p1.y + (p2.y - p0.y) / 6 * tension;

        let x2 = p2.x - (p3.x - p1.x) / 6 * tension;
        let y2 = p2.y - (p3.y - p1.y) / 6 * tension;

        path += " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + p2.x + " " + p2.y;
    }

    return closed ? path + "z" : path;
}
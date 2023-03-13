let svgTestHtml = `
<svg id="github-icon-mad-svg" data-name="github-icon-mad-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1037.33 1037.32">
<path id="github-icon-mad-bg" fill="black" 
d="M1037.33,518.67c0,4.02-.06,8.06-.15,12.09l-6.72-.16-30.16-.7c.09-3.74,.14-7.49,.14-11.24,0-10.34-.32-20.61-.96-30.79l30.11-1.93,6.7-.42c.68,10.95,1.04,22.03,1.04,33.15ZM37.85,549.45l-30.09,1.93-6.72,.42c-.68-10.96-1.04-22-1.04-33.14,0-4.05,.03-8.07,.15-12.1l6.71,.16,30.17,.7c-.09,3.73-.14,7.48-.14,11.23,0,10.34,.32,20.62,.96,30.8ZM1031.47,440.51l-6.63,1-29.84,4.55c-2.11-13.94-4.82-27.69-8.1-41.22l29.33-7.13,6.51-1.59c3.52,14.57,6.44,29.38,8.71,44.4ZM50.42,632.5l-29.33,7.13-6.51,1.59c-3.54-14.56-6.44-29.4-8.71-44.42l6.63-1.01,29.84-4.55c2.11,13.95,4.82,27.73,8.1,41.26ZM1010.17,352.64l-6.34,2.13-28.6,9.67c-4.51-13.35-9.57-26.42-15.19-39.2l27.65-12.12,6.13-2.69c6.04,13.77,11.51,27.85,16.35,42.22ZM77.3,712.08l-27.66,12.12-6.12,2.69c-6.04-13.77-11.52-27.85-16.37-42.22l6.35-2.14,28.61-9.65c4.51,13.34,9.57,26.42,15.19,39.2ZM973.83,269.82l-5.88,3.22-26.48,14.47c-6.74-12.32-14.01-24.31-21.79-35.94l25.11-16.73,5.58-3.72c8.36,12.52,16.2,25.42,23.45,38.69ZM117.65,785.75l-25.11,16.73-5.58,3.72c-8.38-12.52-16.2-25.44-23.47-38.7l5.89-3.22,26.49-14.47c6.74,12.33,14.01,24.32,21.79,35.95ZM923.65,194.62l-5.24,4.2-23.56,18.85c-8.75-10.95-17.99-21.51-27.67-31.65l21.82-20.83,4.85-4.63c10.41,10.92,20.35,22.28,29.8,34.07ZM170.15,851.29l-21.84,20.85-4.85,4.62c-10.4-10.9-20.35-22.27-29.78-34.04l5.23-4.19,23.58-18.86c8.75,10.94,17.99,21.49,27.67,31.62ZM861.22,129.24l-4.41,5.01-19.94,22.67c-10.5-9.26-21.42-18.07-32.71-26.38l17.88-24.31,3.97-5.4c12.15,8.96,23.91,18.44,35.23,28.41ZM233.2,906.79l-17.89,24.31-3.97,5.4c-12.17-8.96-23.91-18.44-35.23-28.41l4.41-5.03,19.93-22.65c10.51,9.26,21.44,18.07,32.74,26.38ZM788.42,75.6l-3.49,5.73-15.69,25.77c-11.94-7.29-24.22-14.07-36.81-20.32l13.38-27.03,2.98-6.02c13.56,6.73,26.76,14.02,39.62,21.87ZM304.87,950.53l-13.38,27.04-2.98,6.02c-13.54-6.73-26.76-14.02-39.62-21.88l3.5-5.72,15.69-25.77c11.93,7.28,24.21,14.06,36.8,20.31ZM707.42,35.42l-2.45,6.26-10.97,28.09c-12.99-5.08-26.27-9.62-39.79-13.55l8.49-28.96,1.89-6.44c14.55,4.27,28.83,9.14,42.84,14.61ZM383.12,981.1l-8.49,28.96-1.88,6.44c-14.55-4.27-28.85-9.14-42.85-14.61l2.44-6.26,10.99-28.1c12.99,5.09,26.27,9.62,39.79,13.56ZM620.65,10.01l-1.32,6.62-5.93,29.57c-13.66-2.73-27.53-4.88-41.58-6.41l3.33-29.97,.76-6.68c15.1,1.65,30.04,3.98,44.74,6.88ZM465.5,997.53l-3.33,29.97-.75,6.68c-15.1-1.67-30.04-3.98-44.74-6.9l1.32-6.59,5.93-29.57c13.66,2.73,27.52,4.88,41.57,6.41ZM530.75,.15l-.17,6.72-.7,30.15c-3.73-.09-7.46-.14-11.21-.14-10.35,0-20.63,.32-30.81,.96l-1.93-30.08-.41-6.7c10.96-.71,22.02-1.07,33.15-1.07,4.05,0,8.05,.06,12.09,.15ZM551.79,1036.28c-10.94,.68-22,1.04-33.13,1.04-4.05,0-8.07-.05-12.1-.15l.16-6.72,.7-30.15c3.74,.09,7.49,.14,11.24,.14,10.34,0,20.62-.32,30.79-.96l1.93,30.09,.41,6.71ZM446.07,42.31c-13.95,2.11-27.71,4.82-41.25,8.1l-7.12-29.32-1.58-6.51c14.57-3.53,29.39-6.44,44.4-8.74l1.01,6.65,4.54,29.82ZM641.2,1022.75c-14.56,3.53-29.38,6.46-44.39,8.71l-1.01-6.63-4.54-29.82c13.95-2.11,27.71-4.82,41.25-8.1l7.12,29.32,1.57,6.51ZM364.43,62.1c-13.34,4.49-26.42,9.56-39.2,15.18l-12.11-27.63-2.69-6.16c13.78-6.03,27.86-11.49,42.21-16.34l2.14,6.35,9.66,28.6ZM726.89,993.83c-13.76,6.03-27.84,11.51-42.2,16.34l-2.13-6.35-9.67-28.59c13.34-4.51,26.41-9.57,39.19-15.18l12.11,27.62,2.69,6.16ZM806.19,950.38c-12.52,8.37-25.43,16.18-38.7,23.45l-3.22-5.89-14.46-26.46c12.32-6.74,24.31-14.01,35.94-21.79l16.73,25.11,3.72,5.58ZM287.52,95.85c-12.33,6.74-24.32,14.01-35.95,21.79l-16.72-25.11-3.72-5.58c12.52-8.37,25.42-16.19,38.7-23.45l3.22,5.89,14.46,26.46ZM876.76,893.85c-10.9,10.42-22.28,20.38-34.04,29.79l-4.2-5.24-18.85-23.55c10.95-8.75,21.5-17.99,31.64-27.67l20.82,21.82,4.63,4.85ZM217.66,142.47c-10.94,8.76-21.49,17.99-31.62,27.68l-20.85-21.84-4.63-4.85c10.92-10.41,22.28-20.35,34.07-29.8l4.2,5.26,18.84,23.55ZM936.51,825.98c-8.96,12.18-18.44,23.92-28.41,35.24l-5.03-4.43-22.66-19.93c9.26-10.51,18.07-21.43,26.38-32.73l24.3,17.88,5.42,3.97ZM156.93,200.46c-9.26,10.51-18.07,21.43-26.38,32.73l-24.31-17.88-5.41-3.99c8.97-12.13,18.44-23.91,28.41-35.21l5.03,4.43,22.66,19.93ZM983.59,748.8c-6.72,13.55-14.02,26.79-21.86,39.64l-5.76-3.5-25.77-15.69c7.29-11.94,14.08-24.22,20.33-36.82l27.04,13.38,6.01,2.98ZM107.11,268.08c-7.29,11.94-14.07,24.22-20.32,36.81l-27.04-13.38-6.01-2.99c6.72-13.54,14.02-26.76,21.86-39.63l5.74,3.5,25.77,15.7ZM1016.52,664.58c-4.27,14.55-9.15,28.84-14.63,42.84l-6.24-2.43-28.12-10.98c5.09-12.99,9.62-26.27,13.58-39.79l28.94,8.49,6.47,1.88ZM69.8,343.32c-5.09,13-9.62,26.28-13.58,39.8l-28.96-8.5-6.44-1.88c4.27-14.56,9.15-28.84,14.63-42.84l6.24,2.43,28.12,10.98ZM1034.2,575.9c-1.66,15.11-3.98,30.03-6.9,44.73l-6.59-1.32-29.58-5.93c2.74-13.65,4.89-27.51,6.41-41.55l29.99,3.34,6.68,.73ZM46.21,423.95c-2.74,13.65-4.88,27.5-6.41,41.53l-29.98-3.33-6.69-.75c1.66-15.1,3.97-30.03,6.9-44.71l6.57,1.32,29.61,5.93ZM962.73,518.66c0,244.48-198.19,442.67-442.67,442.67S77.39,763.14,77.39,518.66,275.58,75.99,520.06,75.99s442.67,198.19,442.67,442.67Z"></path>
<path id="github-icon-mad" fill="#9f97d0"
d="M871.57,755.06c-50.59,78.77-126.86,139.24-216.92,169.48-20.54,4.14-28.08-8.99-28.08-20.04,0-13.8,.67-58.67,.67-114.59,0-39.36-13-64.21-28.1-77.32,39.87-4.47,80.51-13.55,113.85-35.27l158.58,77.74ZM753.71,638.38l150.35,55.43c-8.65,20.24-18.86,39.65-30.45,58.07l-146.4-84.98c9.76-8.04,18.67-17.46,26.51-28.51ZM925.27,630.61c-5.02,20.25-11.53,39.91-19.39,58.85l-145.19-61.86c5.3-8.99,9.95-18.91,13.85-29.88l150.72,32.89ZM449.09,712.59c-11.65,10.35-26.05,55.91-26.05,55.91l-2.05,58.69s.68,67.65,.68,77.32c0,11.04-7.54,24.17-28.1,20.01-81.3-27.29-151.38-79.21-201.45-147.02l119.24-119.69c36.46,36.51,87.8,49.52,137.72,54.77ZM284.67,621.41c5.48,10.37,11.76,19.58,18.72,27.76l-112.61,126.5c-15.76-21.59-29.52-44.76-40.97-69.24l134.86-85.03ZM281.1,614.24l-132.01,90.64c-11.33-24.47-20.36-50.25-26.81-77.04l149.58-37.59c2.66,8.58,5.76,16.56,9.24,23.98ZM932.21,528.97c0,32.37-3.65,63.87-10.58,94.1l-147.43-41.99c5.56-21.14,8.63-45.7,8.63-74.2,0-45.57-15.75-82.84-42.48-111.84,4.11-10.35,53.52-110.01,30.9-167.31,0,0-69.96,45.81-148.76,99.66-32.9-8.98-68.53-13.81-103.48-13.81-34.95,.04-69.74,4.68-103.48,13.81-78.8-53.85-129.27-90.38-129.27-90.38-22.62,57.31,7.3,147.67,11.41,158.03-26.05,29-42.48,66.27-42.48,111.84,0,27.04,2.76,50.53,7.78,70.96l-147.13,45.84c-7.01-30.42-10.72-62.13-10.72-94.71,0-230.58,185.02-416.96,413.88-416.96s413.88,186.39,413.2,416.96ZM712.2,551.39l-27.58-110.85-127.86,36.74,24.53,105.2,130.9-31.08Zm-142.85-68.43l109.11-31.36,23.54,94.62-111.72,26.52-20.93-89.78ZM366.45,431.44l-37.93,107.75,126.99,39.63,37.36-101.35-126.42-46.03Zm81.67,135.72l-108.37-33.81,32.37-91.97,107.89,39.29-31.89,86.49Z"></path>
</svg>
`
$('.test-class').html(svgTestHtml)
let svgTestHtml = `
<svg id="test-start" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4929.67 1467.07">
  <defs>
    <style>
      .cls-1, .cls-2 {
        fill: #6fcaff;
      }

      .cls-2 {
        font-family: AcuminConcept-CondensedBold, 'Acumin Variable Concept';
        font-size: 120.9px;
        font-variation-settings: 'wght' 700, 'wdth' 67, 'slnt' 0;
        font-weight: 700;
      }

      .cls-3 {
        letter-spacing: 0em;
      }

      .cls-4 {
        letter-spacing: 0em;
      }
    </style>
  </defs>
    <path id="svg1" class="cls-1" d="M1960.05,674.09c0-11.83-9.55-21.38-21.38-21.38s-21.38,9.55-21.38,21.38v162.16l-49.04-49.04c-8.35-8.35-21.92-8.35-30.27,0s-8.35,21.92,0,30.27l85.52,85.52c8.35,8.35,21.92,8.35,30.27,0l85.52-85.52c8.35-8.35,8.35-21.92,0-30.27-8.35-8.35-21.92-8.35-30.27,0l-48.98,49.04v-162.16Z M2067.63,890.83h-67.82l-30.27,30.27c-16.7,16.7-43.76,16.7-60.47,0l-30.2-30.27h-67.82c-23.59,0-42.76,19.18-42.76,42.76v21.38c0,23.59,19.18,42.76,42.76,42.76h256.57c23.59,0,42.76-19.18,42.76-42.76v-21.38c0-23.59-19.18-42.76-42.76-42.76Zm-14.03,71.49c-8.85,0-16.04-7.18-16.04-16.04s7.18-16.04,16.04-16.04,16.04,7.18,16.04,16.04-7.18,16.04-16.04,16.04Z"/>
</svg>
<svg id="test-end" data-name="Layer " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2605.23 1400.78">
  <defs>
    <style>
      .cls-1 {
        font-family: AcuminConcept-CondensedBold, 'Acumin Variable Concept';
        font-size: 81.09px;
        font-variation-settings: 'wght' 700, 'wdth' 67, 'slnt' 0;
        font-weight: 700;
      }
      .cls-1, .cls-2 {
        fill: #6fcaff;
      }

      .cls-3 {
        letter-spacing: 0em;
      }

      .cls-4 {
        letter-spacing: 0em;
      }
    </style>
  </defs>

    <path id="svg2" class="cls-2" d="M1584.6,1104.51l-22.14,32.63-.04,.08c-62.04-42.87-104.67-111.85-111.98-191.08l38.29-3.84c1.65,15.94,5.04,31.97,10.24,47.83,15.98,48.29,46.72,87.57,85.62,114.37Z M2059.4,754.44c-20.53,17.89-37.38,39.24-49.98,62.7l-.33-.12c-5.12,9.58-9.54,19.5-13.22,29.66l-10.2-3.68-26.06-9.83c15.74-41.97,41.97-78.77,75.46-107.31l24.33,28.58Z"/>
</svg>
`
$('.test-class').html(svgTestHtml)

export default function screen (numoflines){

    //let w = document.getElementsByClassName('window'); // document.querySelector('window');

    let w = document.querySelector(".window")

    const root = document.documentElement;

    for (let i = 0; i< numoflines; i++){
        let  line = document.createElement("div");
        line.className = `line l${i}`;

        root.style.setProperty(`--line-${i}`, '2px');
        root.style.setProperty(`--line-${i}-color`, 'yellow');


        w.appendChild(line);

        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `.l${i} {
            height: var(--line-${i}); 
            background-color: var(--line-${i}-color);
            }`;
        document.getElementsByTagName('head')[0].appendChild(style);

        /*
        // make screen dynamic. get height and width from css
        let root = document.documentElement;
    
        let height = getComputedStyle(document.documentElement)
        .getPropertyValue('--height')
    
        let width = getComputedStyle(document.documentElement)
        .getPropertyValue('--width')
        */
    }
}
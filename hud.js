export default {Screen, HUDmap};

function Screen (numoflines){

    //let w = document.getElementsByClassName('window'); // document.querySelector('window');

    let w = document.querySelector(".window")

    for (let i = 0; i< numoflines; i++){
        let  line = document.createElement("div");

        line.className = 'line';
        w.append(line);
    }
}

function HUDmap (map){
    let m = document.querySelector(".map")

    map.grid.forEach((row,x) => {
        row.forEach((item,y) =>{
            let box = document.createElement("div"); 
            
            let index = map.MAP_NUM_ROWS * y + x;

            box.className = item != '0'?'mapitem wall': 'mapitem';
            box.setAttribute('data-index',index);
            m.append(box);
                
        });
    });
}


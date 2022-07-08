import {InputHandler} from './inputhandler.js'
import Player from './player.js'
import Map from './map.js'
import Render from './render.js'
import Screen from './screen.js'

const lines = 200;
const map = new Map(lines);
const player = new Player(map);
const render = new Render(400,240,lines);

async function setup()
{
    // create events for input
    const inputhandler =  new InputHandler(player);

    // create html and css elements for rendering screen
    const screen = new Screen(lines);

    loop();
}

function loop(){
    player.update(map);
	render.render(player, map);
    requestAnimationFrame(loop);
}



window.addEventListener('load', setup);


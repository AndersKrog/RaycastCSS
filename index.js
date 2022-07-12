import {InputHandler} from './inputhandler.js'
import Player from './player.js'
import Map from './map.js'
import Render from './render.js'
import hud from './hud.js'

const lines = 400;
const height = 400;
const width = 400;

const map = new Map(lines);
const player = new Player(map);
const render = new Render(height,width,lines);

async function setup()
{
    // create events for input
    const inputhandler =  new InputHandler(player);

    // create html and css elements for rendering screen
    hud.Screen(lines);
    hud.HUDmap(map);

    loop();
}

function loop(){
    player.update(map);

	render.render(player, map);
    requestAnimationFrame(loop);
}

setup();
import Ray from './ray.js';

export default class Render{
    constructor(height, width, numofrays){
        this.WINDOW_HEIGHT = height;
        this.WINDOW_WIDTH = width;
        
        this.FOV_ANGLE = 90 * (Math.PI/180);
        this.NUM_RAYS = numofrays;
        
        this.DIST_PROJ_PLANE = (this.WINDOW_WIDTH/2)/Math.tan(this.FOV_ANGLE/2);

        this.initial(height,width);
    }
    initial(height,width){
        let root = document.documentElement;
    
        root.style.setProperty('--height',height);
        root.style.setProperty('--width',width);

    }
    render(player,map){
        this.castAllRays(player, map);
        this.UpdateHudMap(player,map)    
        
    }
    UpdateHudMap(player,map){
        let x = Math.floor(player.x/map.TILE_SIZE);
        let y = Math.floor(player.y/map.TILE_SIZE);

        //console.log("x : " + x + "y: " + y );

        let itemnr = y * map.MAP_NUM_ROWS + x;

        let m = document.querySelector(`[data-index="${itemnr}"]`);

        m.className = 'mapitem red';
    }
    

    castAllRays(player, map){
        let rays = [];

        // loop all columns casting the rays
        // start first ray by substracting half of the FOV_ANGLE
        for (let col = 0; col < this.NUM_RAYS; col++){
            let rayAngle = player.rotationAngle + Math.atan((col - this.NUM_RAYS / 2) / this.DIST_PROJ_PLANE);
            let ray = new Ray(rayAngle);
            ray.cast(player, map);
            rays.push(ray);
        }
        this.render3DProjectedWalls(player,rays,map)
    }	
    render3DProjectedWalls(player, rays,map){
        let root = document.documentElement;

        let domlines = document.getElementsByClassName('line');
        domlines = [...document.querySelectorAll('.line')];

        domlines.forEach((line,i) => {
            let ray = rays[i];
            // correct fisheye : vandrette afstand
            let correctRayDistance = ray.distance * Math.cos(ray.rayAngle-player.rotationAngle);
            
            //calculate distance to projection plane
            // projected wall height
            let wallStripHeight = (map.TILE_SIZE/ correctRayDistance)*this.DIST_PROJ_PLANE;
        
            let height = wallStripHeight > this.WINDOW_HEIGHT? this.WINDOW_HEIGHT: wallStripHeight;

            // COLOR 
            let colordistance = (250/wallStripHeight) < 1? 1: 250/wallStripHeight;
            let red = Math.floor(100/colordistance) -20;
            let green = Math.floor(256/colordistance/2);
            let blue = Math.floor(100/colordistance) -20;

            line.style.setProperty('--height',height)
            line.style.setProperty('--color',[red, green, blue])

            let offset = ray.wasHitVertical? Math.ceil(ray.wallHitY%map.TILE_SIZE): Math.ceil(ray.wallHitX%map.TILE_SIZE);	
        
            line.style.setProperty('--offset', offset)

        });
    }
}
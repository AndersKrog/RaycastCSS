import Ray from './ray.js';

export default class Render{
    constructor(height, width, numofrays){
        this.WINDOW_WIDTH = width;
        this.WINDOW_HEIGHT = height;
        
        this.FOV_ANGLE = 60 * (Math.PI/180);
        this.NUM_RAYS = numofrays;
        
        this.DIST_PROJ_PLANE = (this.WINDOW_WIDTH/2)/Math.tan(this.FOV_ANGLE/2);
    }
    render(player,map){
        this.castAllRays(player, map);    
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

        // loop every ray in the array of rays
        for (let i = 0; i < this.NUM_RAYS;i++){
            let ray = rays[i];
            
            // correct fisheye : vandrette afstand
            let correctRayDistance = ray.distance * Math.cos(ray.rayAngle-player.rotationAngle);
            
            //calculate distance to projection plane
            // projected wall height
            let wallStripHeight = (map.TILE_SIZE/ correctRayDistance)*this.DIST_PROJ_PLANE;
        
            let value = wallStripHeight > this.WINDOW_HEIGHT? this.WINDOW_HEIGHT: wallStripHeight;

            // COLOR 
            let colordistance = 250/wallStripHeight;
            let red = Math.floor(100/colordistance);
            let green = Math.floor(256/colordistance/2);
            let blue = Math.floor(100/colordistance);

            let colorvalue1 = `--line-${i}-color`
            let colorvalue2 = `rgb(${red},${green},${blue})`; 
            root.style.setProperty(colorvalue1,colorvalue2);

            // DRAW LINE
            let heightvalue1 = `--line-${i}`
            let heightvalue2 = `${value}px`; 
            root.style.setProperty(heightvalue1,heightvalue2);
        }
    }
}
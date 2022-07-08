import calculations from './calculations.js';

export default class Ray{
	constructor(rayAngle){
		//this.wallHitTile = 0;
        this.rayAngle = calculations.normalizeAngle(rayAngle);
		this.wallHitX = 0;
		this.wallHitY = 0;
		this.wasHitVertical = false;

		this.isRayFacingDown = this.rayAngle > 0 && this.rayAngle < Math.PI;
		this.isRayFacingUp = !this.isRayFacingDown;
		
		this.isRayFacingRight = this.rayAngle < 0.5*Math.PI || this.rayAngle > 1.5 * Math.PI;
		this.isRayFacingLeft = !this.isRayFacingRight;
	}	
	cast(player, map){
		let xintercept, yintercept;
		let xstep, ystep;
		//Horizontal Ray-grid intersection
		let foundHorzWallHit = false;
		let horzWallHitX = 0, horzWallHitY = 0;

    	//find the y-coordinate of the closest horizontal grid intersection
		yintercept = Math.floor(player.y/map.TILE_SIZE)*map.TILE_SIZE;
		yintercept += this.isRayFacingDown ? map.TILE_SIZE: 0;
	
		//find the x-coordinate of the closest horizontal grid intersection
		xintercept = player.x + (yintercept-player.y)/Math.tan(this.rayAngle)
	
		// calculate the increment xstep and ystep
		ystep = map.TILE_SIZE;
		ystep *= this.isRayFacingUp ? -1 :1 ;
		xstep = map.TILE_SIZE / Math.tan(this.rayAngle);
		xstep *= (this.isRayFacingLeft && xstep > 0) ? -1: 1;
		xstep *= (this.isRayFacingRight && xstep < 0) ? -1: 1;
	
		let nextHorzTouchX = xintercept;
		let nextHorzTouchY = yintercept;

		let horzWallHitTile;
		
		// increment xstep and ystep till we find a wall
		while (!foundHorzWallHit){
			horzWallHitTile = map.hasWallAt(nextHorzTouchX,nextHorzTouchY - (this.isRayFacingUp ? 1 : 0)); 
			if (horzWallHitTile == 0) {
                nextHorzTouchX += xstep;
                nextHorzTouchY += ystep;            
            } else {
                horzWallHitX = nextHorzTouchX;
                horzWallHitY = nextHorzTouchY;
                foundHorzWallHit = true;
            }
		}
		
		//Vertical Ray-grid intersection
		let foundVertWallHit = false;
		let vertWallHitX = 0;
		let vertWallHitY = 0;
		let vertWallHitTile;
		
		//find the x-coordinate of the closest vertical grid intersection
		xintercept = Math.floor(player.x/map.TILE_SIZE)*map.TILE_SIZE;
		xintercept += this.isRayFacingRight ? map.TILE_SIZE: 0;
	
		//find the y-coordinate of the closest vertical grid intersection
		yintercept = player.y + (xintercept-player.x)*Math.tan(this.rayAngle)
	
		// calculate the increment xstep and ystep
		xstep = map.TILE_SIZE;
		xstep *= this.isRayFacingLeft ? -1 :1;
		
		ystep = map.TILE_SIZE * Math.tan(this.rayAngle);
		ystep *= (this.isRayFacingUp && ystep > 0) ? -1: 1;
		ystep *= (this.isRayFacingDown && ystep < 0) ? -1: 1;
	
		let nextVertTouchX = xintercept;
		let nextVertTouchY = yintercept;
	
		// increment xstep and ystep till we find a wall
		while (!foundVertWallHit){
			vertWallHitTile = map.hasWallAt(nextVertTouchX - (this.isRayFacingLeft ? 1 : 0),nextVertTouchY)
			if (vertWallHitTile == 0){
				nextVertTouchX += xstep;
				nextVertTouchY += ystep;
            } else {
				foundVertWallHit = true;
				vertWallHitX = nextVertTouchX;
				vertWallHitY = nextVertTouchY;	
            }
		}
	
		// calculate both distances and choose the shortest		
		let horzHitDistance = calculations.distanceBetweenPoints(player.x,player.y, horzWallHitX, horzWallHitY);
		let vertHitDistance = calculations.distanceBetweenPoints(player.x,player.y, vertWallHitX, vertWallHitY);
		
		if (vertHitDistance <= horzHitDistance){
			this.wallHitX = vertWallHitX;
			this.wallHitY = vertWallHitY;
			this.distance = vertHitDistance;
			//this.wallHitTile = vertWallHitTile;
			this.wasHitVertical = true;
		} else {
			this.wallHitX = horzWallHitX;
			this.wallHitY = horzWallHitY;
			this.distance = horzHitDistance;
			//this.wallHitTile = horzWallHitTile;
			this.wasHitVertical = false;	
		}
	}
}
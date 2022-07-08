export default class Player{
	constructor(map){
		this.height = map.TILE_SIZE/2;
		this.x = map.MAP_WIDTH/2;
		this.y = map.MAP_HEIGHT/2;
		this.radius = 4;
		this.turnDirection = 0;	//-1:left, 1:right
		this.walkDirection = 0;	//-1:backwards, 1:forwards
		this.rotationAngle = Math.PI /2;
		this.moveSpeed = 1.0;
		this.rotationSpeed = 1 * (Math.PI/180);	//degrees per frame
	}
	update(map){
		this.rotationAngle += this.turnDirection*this.rotationSpeed;
		
		let moveStep = this.walkDirection*this.moveSpeed;
		
		let newX = this.x + Math.cos(this.rotationAngle) * moveStep
		let newY = this.y + Math.sin(this.rotationAngle) * moveStep;

        this.x = newX;
        this.y = newY;

		if (map.hasWallAt(newX,newY) == 0 ){	
			this.x = newX;
			this.y = newY;
		}
	}
}

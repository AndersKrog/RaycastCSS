export default class Map {
    constructor() {
        this.TILE_SIZE = 64;
        this.grid = [
            [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 3, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        // It is turned
        this.MAP_NUM_ROWS = this.grid.length;
        this.MAP_NUM_COLS = this.grid[0].length;
        this.MAP_WIDTH = this.MAP_NUM_COLS * this.TILE_SIZE;
        this.MAP_HEIGHT = this.MAP_NUM_ROWS * this.TILE_SIZE;
        // console.log("ROWS" + this.MAP_NUM_ROWS + " COLS " + this.MAP_NUM_COLS)

    }
	hasWallAt(x,y){
		if (x < 0 || x > this.MAP_WIDTH || y < 0 || y > this.MAP_HEIGHT){
			return true;
		}
		let mapGridIndexX = Math.floor(x/this.TILE_SIZE);
		let mapGridIndexY = Math.floor(y/this.TILE_SIZE);
		
		return this.grid[mapGridIndexY][mapGridIndexX];
	}
}

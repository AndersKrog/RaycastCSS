export {InputHandler}

class InputHandler{
	constructor(player){
        const DOWN = 40;
        const UP = 38;
        const LEFT = 37;
        const RIGHT = 39;
		document.addEventListener("keydown", event => {
			if (event.keyCode == LEFT)
            player.turnDirection = -1;
			if (event.keyCode == RIGHT)
                player.turnDirection = 1;
			if (event.keyCode == UP)
                player.walkDirection = 1;	
			if (event.keyCode == DOWN)
                player.walkDirection = -1;	
		});
			
		document.addEventListener("keyup", event => {
			if (event.keyCode == LEFT)
                player.turnDirection = 0;
			if (event.keyCode == RIGHT)
                player.turnDirection = 0;
			if (event.keyCode == UP)
                player.walkDirection = 0;
			if (event.keyCode == DOWN)
                player.walkDirection = 0;
		});	
	}
}


var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

function create() {

	var height = 30;
	var width = 30;

    ROT.RNG.setSeed(1234);
	map = new ROT.Map.Digger(width, height);
	var display = new ROT.Display({fontSize:8});
	map.create(display.DEBUG);

	//prep our 2d array
	tileset = new Array();
	for (var i=0; i<height; i++) {
		tileset[i] = new Array();
	}

	//create our tileset
	for(var i=0; i<map._rooms.length; i++) {
		var room = map._rooms[i];

		for (var y=room._y1; y<=room._y2; y++) {
			for (var x=room._x1; x<=room. _x2;x++) {
				tileset[y][x] = 'r';
			}
		}
	}


	//display tileset for debugging purposes
	for (var y=0; y<height; y++) {
		var outputString = "";
		for (var x=0; x<width; x++) {
			outputString += tileset[y][x] || 'X';
		}
		console.log(outputString);
	}
	
}
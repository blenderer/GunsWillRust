
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('ground_1x1', 'assets/testtileset.png');
    game.load.image('player', 'assets/callofdutyfree.gif');

}

function create() {

	var height = 42;
	var width = 70;

	var tilewidth = tileheight = 32;

	game.stage.backgroundColor = '#2d2d2d';

	game.world.setBounds(0, 0, width*tileheight, height*tilewidth);

    //  Creates a blank tilemap
    map = game.add.tilemap();

    //  Add a Tileset image to the map
    map.addTilesetImage('ground_1x1');

    //  Creates a new blank layer and sets the map dimensions.
    //  In this case the map is 40x30 tiles in size and the tiles are 32x32 pixels in size.
    layer1 = map.create('level1', width, height, 32, 32);

	

    ROT.RNG.setSeed(new Date().getTime());
	rotmap = new ROT.Map.Digger(width, height);
	display = new ROT.Display({fontSize:8});
	rotmap.create(display.DEBUG);

	//prep our 2d array
	tileset = new Array();
	for (var i=0; i<height; i++) {
		tileset[i] = new Array();
	}

	//create our tileset
	for(var i=0; i<rotmap._rooms.length; i++) {
		var room = rotmap._rooms[i];

		for (var y=room._y1; y<=room._y2; y++) {
			for (var x=room._x1; x<=room. _x2;x++) {
				tileset[y][x] = 'r';
			}
		}
	}



	//display tileset for debugging purposes
	for (var y=0; y<height; y++) {
		for (var x=0; x<width; x++) {
			//check our ROT map for data 
			var generated = display._data[x + ',' + y];
			if (generated[4] != "#ccc") {
				if (tileset[y][x] == 'r') {
					map.putTile(1, x, y);
				}
				else {
					tileset[y][x] = 'c';
					map.putTile(1, x, y);
				}
			}
			else {
				tileset[y][x] = ' ';
				map.putTile(0, x, y);
			}
		}
	}

	p = game.add.sprite(59, 26, 'player');

	cursors = game.input.keyboard.createCursorKeys();
}


function update() {

    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

}

function render() {



}
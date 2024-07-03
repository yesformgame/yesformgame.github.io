# Yes! Game Technical Documentation 

This game is a web-based video game build with [Phaser](https://phaser.io/).

To run the builder, navigate to the base directory that contains `index.html` and execute `gulp`. 

This gulpfile will compile all of the js in `vendor/` first, then every file in `src/`, then specifically the `script.js` file in `src/`, into `main.js`.

It also compiles and minifies the `main.less` into `main.css`.

All of the Yes! game code exists in the `src/` javascript files. The gulp file will automatically concatenate, and minify any changes detected on save. And, if you are running LiveReload it will automatically refresh the page. 

Please refer to the Yes! Game Documentation provided by Special Guest to get a complete run down of each file. 

The map is made with [Tiled](http://www.mapeditor.org/) and saved to the tilemap.json file in the `assets/` directory. 

The spritesheet is made with [TexturePacker](https://www.codeandweb.com/texturepacker) and saved to spritesheet .pngs and spritesheet .json files in the `assets/imgs/` directory. 

Good luck! Have fun! 

At the time of writing this Isabella holds the high score with a speed run of `4:20:00`. 

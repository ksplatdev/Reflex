// import

import * as Engine from '../Reflex.js';

// Init Reflex

var World = new Engine.Reflex({ loop: loop, debug: true });

// create a rigid body rect

var myRoundRect = new Engine.Objects.RigidBody(
	50,
	50,
	50,
	50,
	15,
	'roundrect',
	'#0000FF',
	undefined,
	{
		movement: {
			type: 'TopDown',
			maxSpeed: 4,
			acceleration: 0.02,
			canvasBounds: true,
		},
	}
);

// rigid body event listener

myRoundRect.on('move', () => {
	//console.log("moved");
});

// create a rigid body rect

var myRect = new Engine.Objects.RigidBody(
	250,
	250,
	40,
	40,
	0,
	'rect',
	'#FF0000'
);

// create a rigid body circle

var myCircle = new Engine.Objects.RigidBody(
	400,
	200,
	0,
	0,
	15,
	'circle',
	'#006400'
);

// create sprite

var mySprite = new Engine.Objects.RigidBody(
	450,
	50,
	50,
	50,
	0,
	'sprite',
	undefined,
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThpefIg1QQCIDB3U-9Hkft05D9l9jKCZoBwg&usqp=CAU',
	undefined
);

// create a sprite with SpriteSheet
// https://www.pinclipart.com/picdir/middle/542-5425619_coin-sprite-sheet-png-clipart.png

// create a shadow and append it to myRoundRect

var myShadow = new Engine.GFX.Shadow(0.3, 40);
myShadow.appendTo(myRoundRect);

// play sound on load
// sound from https://freesound.org/people/InspectorJ/sounds/431117/

//let mySound = new Engine.Sound({src: "./test-sound.wav", autoplay: true, destroyAfter: true, onPlay: () => console.log("playing"), onEnd: () => console.log("ended"), onDestroy: () => console.log("removed")});
// mySound.playAfter(new Engine.Sound({src: "./bg-music.mp3", destroyAfter: true}));

// ProximitySound

let mySound1 = new Engine.Audio.Sound({
	src: './bg-music.mp3',
	autoplay: true,
	loop: true,
});
let myProxSound = new Engine.Audio.ProximitySound(
	450,
	50,
	mySound1,
	{ volume: 0.2, radius: 250, debugCirlce: true },
	[myRoundRect]
);

// create particles

let myParticles = new Engine.GFX.Particles(
	'roundrect',
	'#4f4f4f',
	{
		amount: 36,
		minX: 200,
		maxX: 400,
		minY: 200,
		maxY: 400,
	},
	25,
	25,
	5
);

myParticles.emit();

// create some text

let myText = new Engine.UI.Text(400, 400, 'Hello, World!', {
	font: '45px Arial',
	color: '#ffffff',
	textAlign: 'center',
	method: 'fillstroke',
	strokeStyle: '#000000',
	strokeWidth: 2,
});

// create a button

let myButton = new Engine.UI.Button(
	100,
	400,
	100,
	50,
	35,
	'Hi!',
	{
		shape: 'roundrect',
		color: 'rgba(255, 255, 255, 0.4)',
		stroke: {
			style: '#000000',
			width: 2,
		},
		text: {
			font: '16px Arial',
			color: '#000000',
			method: 'fill',
		},
	},
	() => {
		console.log('clicked');
	}
);

// create a StaticLight

let myStaticLight = new Engine.Lights.StaticLight(
	250,
	250,
	75,
	'rgba(255, 255, 255, 0.1)',
	0.3,
	30
);
myStaticLight.emit();

// create a background

var background = new Engine.Objects.Background(
	0,
	0,
	World.width + 100,
	World.width + 100,
	'https://upload.wikimedia.org/wikipedia/commons/b/b5/800x600_Wallpaper_Blue_Sky.png'
);
background.wobble(0.25, 100);

// remove an Entity

//App.remove(myCircle);
//console.log(Engine.Data.Entitys)

function loop() {
	World.clear(); // clears canvas
	let fps = World.fps.tick();
	document.querySelector('#fps').innerHTML = `FPS: ${fps}`;

	// draw background and shadows first
	background.draw();
	myShadow.draw();

	myCircle.draw();
	myRect.draw();
	myRoundRect.draw();
	mySprite.draw();

	myParticles.animate('smoke', 0.5, 'left');
	myParticles.draw();

	myText.draw();
	myButton.draw();

	// draw lights

	myStaticLight.draw();

	// draw proxsound
	myProxSound.draw();

	requestAnimationFrame(loop);
}

World.start(); // starts loop and adds dependencies if config depInstall is true

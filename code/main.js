import kaboom from "kaboom"

kaboom({
    width: 960,
    height: 640,
    font: 'sinko',
    background: [235, 188, 113],
})
var totsc = 0
var starsC = 0
var score = 0
var stars = {
	1:{
		1:1000,
		2:1500,
		3:2250
	},
	2:{
		1:750,
		2:1400,
		3:2000
	},
	3:{
		1:1000,
		2:1400,
		3:1800
	},
	4:{
		1:2800,
		2:3100,
		3:3400
	},
	5:{
		1:2250,
		2:2750,
		3:3250
	},
	6:{
		1:1000,
		2:1500,
		3:2000
	},
	7:{
		1:900,
		2:1000,
		3:1100
	},
	8:{
		1:1200,
		2:1400,
		3:1600
	},
	9:{
		1:3000,
		2:3375,
		3:3750
	},
	10:{
		1:2750,
		2:3000,
		3:3250
	}
	
}
var level = 1
var gameOn = false
loadSound("theme", "sounds/theme.mp3");
loadSprite("player", "sprites/player.png")
loadSprite("floor", "sprites/floor.png")
loadSprite("spike", "sprites/spike.png")
loadSprite("spawn", "sprites/spawn.png")
loadSprite("verygood_floor", "sprites/verygood_floor.png");
loadSprite("good_floor", "sprites/good_floor.png");
loadSprite("better_floor", "sprites/better_floor.png");
loadSprite("pepper", "sprites/pepper.png")
loadSprite("fire", "sprites/fire.png", {
        sliceX: 61,
        anims: {
            firedUp: { from:0, to:60, speed:30, loop:true}
        },
    })
loadSprite("collection", "sprites/collection.png", {
        sliceX: 6,
        anims: {
            pickup: { from:0, to:5, speed:12, loop:true}
        },
    })
loadSprite("bg1", "sprites/bg1.png")
loadSprite("bg2", "sprites/bg2.png")
loadSprite("bg3", "sprites/bg3.png")
function setupPlayer(){
    firepower = 500
    /*
    player = add([
        sprite("player"),
        pos(100, 200),
        area(),
        body(),
        health(8),
        "player",
        origin("center"),
        {
            dead: "false",
        },
    ])
*/
	player = get("player")[0]
	onUpdate("player", (p) => {
        bg1a.pos.x = player.pos.x/25
        bg1b.pos.x = player.pos.x/25 - 1088
        bg1a.pos.y = player.pos.y/25 - 50
        bg1b.pos.y = player.pos.y/25 - 50

        bg2a.pos.x = player.pos.x/7.5
        bg2b.pos.x = player.pos.x/7.5 - 1088
        bg2a.pos.y = player.pos.y/15
        bg2b.pos.y = player.pos.y/15

        bg3a.pos.x = player.pos.x/5
        bg3b.pos.x = player.pos.x/5 - 2176
        bg3a.pos.y = player.pos.y/10
        bg3b.pos.y = player.pos.y/10

        if (gameOn) {
            score += 100 * dt()
        }

		if (firepower<500) {
			firepower+=0.5
			
		}
		get("met")[0].height = firepower/2
		

        if (player.pos.y > 700) {
            go("leveldone")
        }
	})
}

var levels = [
    // wood "="
    // stone "#"
    // iron "i"
    // gold "g"
    // diamond "d"
    // spike "^"

    [
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                      =    ",
        "         ====         =    ",
        "                      =    ",
        "   p   ^^      =      =    ",
        "=iiii======================",
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                 ^         ",
        "      ###        =         ",
        "                 #         ",
        " ##              i         ",
        "                 g         ",
        "      ^ p        d         ",
        "     iiii     ^            ",
        "####         gg            ",
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "     ===            ===    ",
        "   ^                       ",
        "  ==  p     ===     g      ",
        "                 ^^    ^   ",
        "    ===        ====    d   ",
        "                           ",
        "  =   i             ===    ",
        "         ^^                ",
        "         =====             ",
        "                           ",
    ],
		[
        "                           ",
        "                           ",
        "                           ",
        "             p             ",
        "                           ",
        "              ===          ",
        "             ==  ==        ",
        "             =             ",
        "            ====           ",
        "          ==    ==         ",
        "          =      ===       ",
        "          =       ==       ",
        "         =       ===       ",
        "       ==       ====       ",
        "     =        =====        ",
        "      ===    =====         ",
        "         ======            ",
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "         p                 ",
        "       ^#d   ^             ",
        "      ^#d   iii   ^        ",
        "     ^#d    ^    ##        ",
        "    ^#d     ###    ^       ",
        "   ^#d   ^         ##      ",
        "  ^#d   #####              ",
        " ^#d         ####          ",
        "^#d               ###      ",
        "d                          ",
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "      p                    ",
        "                           ",
        "                           ",
        "     dgi                   ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "          ^^^^^^           ",
        "          #=#igd           ",
        "                           ",
        "                           ",
        "                           ",
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "    ^ p ^ ^                ",
        "   ========         ^      ",
        "         ^        =====    ",
        "         =====             ",
        "               ^   ^       ",
        "    ^  ^       =====       ",
        "   =====                   ",
        "          ^                ",
        "       =====               ",
        "                  ^        ",
        "                =====      ",
        "                           ",
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "            p              ",
        "         =========         ",
        "                           ",
        "       =             =     ",
        "    =         =            ",
        "  =      =       =      =  ",
        "       =     =         =   ",
        "    =       =    =         ",
        "        =            =     ",
        "  ^^^^^^^^^^^^^^^^^^^^^^^  ",
        "                           ",
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "       i                   ",
        "      i i                 ",
        "     i   i                ",
        "    i  p  i               ",
        "   iiiiiiiiiiiii           ",
        "   ^   ^   ^   ^           ",
        "                    i      ",
        "        i           ^      ",
        "   i    ^    i    i        ",
        "   ^     i   ^    ^        ",
        "   i     ^    i            ",
        "   ^   i      ^            ",
        "       ^                   ",
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                       =   ",
        "                      = =  ",
        "                     ==    ",
        "         p          ====   ",
        "       = = =        ===    ",
        "        ^^^        ===     ",
        "      ========^            ",
        "     #=# ^   ^ ^           ",
        "    i#i ^ ^ ^   ^          ",
        "   gig ^   ^ ^   ^         ",
        "  dgd ^     ^ ^   ^        ",
    ],
]

function setupMap(){
	add([
    pos(910, 580),
    rect(24, 250, {radius:10}),
		outline(4),
    area(),
		color(rgb(217, 176, 183)),
		origin("bot")
		
])
	
	add([
        pos(910, 580),
        rect(20, 250, {radius:10}),
        area(),
        color(rgb(247, 37, 72)),
        origin("bot"),
        "met"
	])
    add([
            text("FIREPOWER", {
                size: 20
            }),
            origin("center"),
            pos(865, 610)
        ])

    bg1a = add([pos(0,0),sprite("bg1"),scale(4), z(-2), "bg1"]),
    bg1b = add([pos(-1088,0),sprite("bg1"),scale(4), z(-2), "bg1"]),
    bg2a = add([pos(0,0),sprite("bg2"),scale(4), z(-2), "bg2"]),
    bg2b = add([pos(-1088,0),sprite("bg2"),scale(4), z(-2), "bg2"]),
    bg3a = add([pos(0,0),sprite("bg3"),scale(4), z(-2), "bg3"]),
    bg3b = add([pos(-2176,0),sprite("bg3"),scale(4), z(-2), "bg3"]),
    
	onKeyPress(() => {
        if (!gameOn) {
            setupSpawner(20, 0.5)
        }
    })
		if (level == 1) {
			add([
                text("WASD to move, space to launch with your jetpack. When you move the level will start and explosive peppers will start to spawn above you destroying blocks. \n\n To pass the level your aim is to survive as long as you can. Good luck!", {
                    size: 20,
        			width: 900
                }),
                origin("center"),
                pos(480, 200),
        		"tutorial"
            ])
		}
    addLevel(
        levels[level-1], {
            width: 32,
            height: 32,
            "=": () => [
                sprite("floor"),
                area(),
                solid(),
                scale(2),
                "solidBlock",
							"p"
            ],
            "^": () => [
                sprite("spike"),
                area(),
                scale(2.45),
                "danger",
            ],
            "#": () => [
                sprite("spawn"),
                area(),
                solid(),
                scale(2),
                "spawn",
							"p"
            ],
            "i": () => [
                sprite("good_floor"),
                area(),
                solid(),
                scale(2),
                "iron",
							"p"
            ],
            "g": () => [
                sprite("better_floor"),
                area(),
                solid(),
                scale(2),
                "gold",
							"p"
            ],
            "d": () => [
                sprite("verygood_floor"),
                area(),
                solid(),
                scale(2),
                "dim",
							"p"
            ],
					"p":() => [
        sprite("player"),
        scale(0.6),
        area(),
        body(),
        health(8),
        "player",
        origin("center"),
        {
            dead: "false",
        },
    ]	})
}

function setupSpawner(y, interval){
    loop(interval, () => {
        add([
            sprite("pepper"),
            scale(3),
            pos(player.pos.x+((Math.floor(Math.random() * 101))-50), y),
            area(),
            origin("center"),
            "pepper"
        ])
    })
}

function setupControls(){
    onKeyPress("w", () => {
        if (player.isGrounded()){
            player.jump()
        }
    })
    onKeyDown("a", () => {
        player.move(-250, 0)
		player.flipX(true)
    })
    onKeyDown("d", () => {
        player.move(250, 0)
        player.flipX(false)
    })

    onKeyDown("space", () => {
		if (firepower > 50 && gameOn) {
			firepower -= 50
            add([
                "fire",
                sprite("fire", {anim: "firedUp"}),
                pos(player.pos.x+(19.2), player.pos.y+(31.2)),
                origin(vec2(0.15,0.2)),
                scale(2),
                stay(),
                area(),
                lifespan(0.75, {fade: 0.7}),
                rotate(-90),
                z(-1)
            ])
            player.jump()
        }
    })

    onKeyPress("m", () => {
        if (!music.isPaused()){
            music.pause()
        } else {
            music.play()
        }
    })
}

function setupScoretracker(){
    onKeyPress(() => {
        if (!gameOn) {
					if (level==1) {
            get("tutorial")[0].destroy()
					}
        }
        gameOn = true
    })
}

function setupCollisions(){
    onUpdate("pepper", (p) => {
        p.pos.y+=5
    })

    onCollide("player", "spike", (p, f, collision) => {
        shake(10),
        go("leveldone")
    })
    onCollide("pepper", "solidBlock", (p, f, collision) => {
        destroy(f),
				destroy(p)
        shake(10),

        add([
            sprite("collection", {anim: "pickup"}),
            pos(p.pos),
            origin("center"),
            stay(),
            lifespan(0.5),
        ])
    })

	onCollide("pepper", "spawn", (p, s, collision) => {
		var e = s.pos  
		destroy(s)
		destroy(p)
		shake(10)

		add([
            sprite("floor"),
			pos(e),
            area(),
            solid(),
            scale(2),
            "solidBlock"
        ])
   
        add([
            sprite("collection", {anim: "pickup"}),
            pos(p.pos),
            origin("center"),
            stay(),
            lifespan(0.5),
        ])
    })
	onCollide("pepper", "iron", (p, s, collision) => {
		var e = s.pos  
		destroy(s)
		destroy(p)
		shake(10)

		add([
                sprite("spawn"),
				pos(e),
                area(),
                solid(),
                scale(2),
                "spawn"
            ])
   
        add([
            sprite("collection", {anim: "pickup"}),
            pos(p.pos),
            origin("center"),
            stay(),
            lifespan(0.5),
        ])
    })
	onCollide("pepper", "gold", (p, s, collision) => {
		var e = s.pos  
		destroy(s)
		destroy(p)
		shake(10)

		add([
            sprite("good_floor"),
			pos(e),
            area(),
            solid(),
            scale(2),
            "iron"
        ])
   
        add([
            sprite("collection", {anim: "pickup"}),
            pos(p.pos),
            origin("center"),
            stay(),
            lifespan(0.5),
        ])
    })
	onCollide("pepper", "dim", (p, s, collision) => {
		var e = s.pos  
		destroy(s)
		destroy(p)
		shake(10)

		add([
            sprite("better_floor"),
			pos(e),
            area(),
            solid(),
            scale(2),
            "gold"
        ])
   
        add([
            sprite("collection", {anim: "pickup"}),
            pos(p.pos),
            origin("center"),
            stay(),
            lifespan(0.5),
        ])
    })
						
	
    onCollide("pepper", "danger", (fire, danger, collision) => {
        destroy(danger)
    })
	onCollide("player", "danger", (fire, danger, collision) => {
        destroy(fire)
				go("leveldone")
    })
    // onCollide("fire", "p", (fire, block, collision) => {
    //     const distance = Math.sqrt(
    //         (fire.pos.x-block.pos.x)*(fire.pos.x-block.pos.x) +
    //         (fire.pos.y-block.pos.y)*(fire.pos.y-block.pos.y)
    //     )

    //    	const poW = 25000/distance
    //     const dx = Math.cos(fire.pos.angle(block.pos))*poW
    //     const dy = Math.sin(fire.pos.angle(block.pos))*poW
    //     console.log(dx, dy)
    //     player.move(dx,dy)

    //     // const pow = distance/300
    //     // var xpow = (fire.pos.x-block.pos.x)/100
    //     // var ypow = (fire.pos.y-block.pos.y)/100
    //    	// player.pos = vec2(player.pos.x+xpow*pow, player.pos.y+ypow*pow)
    // })
}

scene("game", () => {
	totsc+=score
	score = 0
	add([
        text(String(score), {
            size: 35
        }),
        origin("center"),
        pos(480, 80),
		"score"
    ])
	onUpdate("score", (s) => {
		s.text = String(Math.round(score))
	})
	setupMap()
    setupPlayer()
    
    
    setupCollisions()
    setupControls()
    setupScoretracker()
})

scene("end", () => {
	add([
        text("CITY OF SPICE", {
            size: 60,
            width: 900
        }),
        origin("center"),
        pos(480, 80),
    ])
    add([
        text("With your last breathe you spat out the only remaining piece of flame against the void below, but to no avail, you splatter under the force of gravity, with your last thought being of closure that you tried your best. \n\n In your journey you collected " + String(starsC) + " stars out of 30, and had an accumalative score of "+String(Math.round(totsc))+"! Good Job!", {
            size: 25,
            width: 900
        }),
        origin("center"),
        pos(480, 345),
    ])

    

    add([
        text("Thank you for playing!", {
            size: 20
        }),
        origin("center"),
        pos(480, 560),
    ])

})

scene("leveldone", () => {
	gameOn = false
	if (score>stars[level][1]) {
		if (score>stars[level][2]) {
			if (score>stars[level][3]) {
				starsC+=3
				add([
    		        text("You got 3 stars with a score of: " + String(Math.round(score)), {
    		            size: 40,
    		            width: 900
    		        }),
    		        origin("center"),
    		        pos(480, 345),
		        ])
			} else {
				starsC+=2
				add([
                text("You got 2 stars with a score of: " + String(Math.round(score)), {
                    size: 40,
                    width: 900
                }),
                origin("center"),
                pos(480, 345),
            ])}
        } else {
				starsC+=1
    		add([
            text("You got 1 star with a score of: " + String(Math.round(score)), {
                size: 40,
                width: 900
            }),
            origin("center"),
            pos(480, 345),
        ])}
		level+=1
	} else {
		go("failed")
	}

	add([
        text("CITY OF SPICE", {
            size: 80,
            width: 900
        }),
        origin("center"),
        pos(480, 80),
    ])
    

    
	if (level <11) {
    add([
        text("Click to start level " + String(level), {
            size: 20
        }),
        origin("center"),
        pos(480, 560),
    ])
		onMousePress(() => {
        go("game")
    })
	
	} else {
		add([
        text("Click to go to end screen", {
            size: 20
        }),
        origin("center"),
        pos(480, 560),
    ])
		onMousePress(() => {
        go("end")
    })
	}
	
    
})

scene("failed", () => {
	add([
        text("CITY OF SPICE", {
            size: 80,
            width: 900
        }),
        origin("center"),
        pos(480, 80),
    ])
    add([
        text("Unfortunately your score was not high enough to pass the level", {
            size: 40,
            width: 900
        }),
        origin("center"),
        pos(480, 345),
    ])

    

    add([
        text("Click to try again", {
            size: 20
        }),
        origin("center"),
        pos(480, 560),
    ])

    onMousePress(() => {
        go("game")
    })
})

scene("start", () => {
	add([
        text("CITY OF SPICE", {
            size: 80,
            width: 900
        }),
        origin("center"),
        pos(480, 80),
    ])
    add([
        text("Your city is overrun by the powers of deadly sentient peppers that are destroying your city tile by tile. As one of the last survivors you must try to live for as long as you can in the remains of the city. \n \n (WASD to move, Space for jetpack, Press M to mute the music when you begin your journey!)", {
            size: 30,
            width: 900
        }),
        origin("center"),
        pos(480, 345),
    ])

    

    add([
        text("Click to start level 1", {
            size: 20
        }),
        origin("center"),
        pos(480, 560),
    ])

    onMousePress(() => {
        go("game")
        music = play("theme", {loop:true})
    })
})

go("start")
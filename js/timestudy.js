tree = {
	camera: {x: 0, y: 0, xVel: 0, yVel: 0, zoom: 1},
	studies: [],
	getStudy: function(s) {
		var r = null
		this.studies.forEach(function(study) {
			if(study.id == s) r = study;
		})
		return r
	},
	hasStudy: function(id) {
		return game.timestudy.studies.includes(id);
	},
	getEff: function(id) {
		return this.getStudy(id).eff()
	},
	buyTheorems: function(c) {
		var bought = 0;
		switch(c) {
			case 0: 
				bought = Decimal.affordGeometricSeries(game.dimensions[0].amount, 1, "1e20000", game.timestudy.bought[0])
				break;
			case 1: 
				bought = Decimal.affordGeometricSeries(game.infinityPoints, 1, 1e100, game.timestudy.bought[1])
				game.infinityPoints = game.infinityPoints.subtract(Decimal.sumGeometricSeries(bought, 1, 1e100, game.timestudy.bought[1]));
				break;
			case 2: 
				bought = Decimal.affordGeometricSeries(game.eternityPoints, 1, 2, game.timestudy.bought[2])
				game.eternityPoints = game.eternityPoints.subtract(Decimal.sumGeometricSeries(bought, 1, 2, game.timestudy.bought[2]));
				break;
		}
		game.timestudy.theorems = game.timestudy.theorems.add(bought);
		game.timestudy.bought[c] = game.timestudy.bought[c].add(bought);
	}
}

function getTotalTT() {
	return game.timestudy.bought[0].add(game.timestudy.bought[1]).add(game.timestudy.bought[2]).add(game.dilation.generatedTT);
}

function Study(p={}) {
	this.x = p.x || 0;
	this.y = p.y || 0;
	this.id = p.id; 
	this.pre = p.pre || [];
	this.cost = new Decimal(p.cost);
	this.desc = p.desc;
	this.req = p.req || "true"
	this.and = p.and; // if it requires all previous studies as opposed to any
	this.eff = p.eff; // number, if any
	this.effb = p.effb || "";
	this.effa = p.effb ? (p.effa || "") : (p.effa || "x")
	this.effd = p.effd || "shorten"
}

function ns(p) {
	var study = new Study(p);
	tree.studies.push(study);
	study.button = document.getElementById("timeStudies").appendChild(document.createElement("button"));
	study.button.onclick = function() {
		study.buy()
	}
}

ns({x:     0, y:     0, id:  "s00", cost:    1, desc: "Begin.", and: true})
ns({x:    -2, y:    -1, id:  "p11", cost:    1, desc: "Multiplier to normal dimensions, increasing during this eternity", eff: function() {return Decimal.pow(10, getTimeSince("eternity")/1e4).min(infp())}, pre: ["s00"]})
ns({x:    -2, y:    -2, id:  "p21", cost:    2, desc: "Gain more infinities based on dimension boosts", eff: function() {return game.boosts}, pre: ["p11"]})
ns({x:    -3, y:    -1, id:  "p22", cost:    2, desc: "Boosts based on infinities are 10x stronger", pre: ["p11"]})
ns({x:    -3, y:    -2, id:  "p23", cost:    4, desc: "Dimension Boosts are 4x as powerful", pre: ["p11"]})
ns({x:    -3, y:    -3, id:  "p31", cost:    8, desc: "Sacrifice affects dimensions 1-8 with reduced effect", eff: function() {return getSacrificeMult().pow(0.2)}, pre: ["p23"]})
ns({x:    -4, y:    -3, id:  "p32", cost:    8, desc: "Replicanti give a boost to normal dimensions.", eff: function() {return getReplEffect().pow(16)}, pre: ["p23"]})
ns({x:    -4, y:    -2, id:  "s01", cost:    0, desc: "Eternity Challenge 1", pre: ["p32"]})
ns({x:     2, y:    -1, id:  "i11", cost:    1, desc: "Infinity Dimensions are more powerful based on Infinity Power", eff: function() {return game.infinityDimensions[0].amount.log10().pow(2).max(1)}, pre: ["s00"]})
ns({x:     2, y:    -2, id:  "i21", cost:    4, desc: "Infinity Dimensions get a multiplier based on fastest eternity time", eff: function() {return Decimal.max(1e10 / game.bestEternityTime, 1).pow(2)}, pre: ["i11"]})
ns({x:     3, y:    -2, id:  "i22", cost:    5, desc: "Infinity Shifts are more powerful the more you have", eff: function() {return game.infinityShifts.pow(2).add(10).log10().pow(3)}, pre: ["i11"]})
ns({x:     3, y:    -1, id:  "i23", cost:    2, desc: "Gain 20% more IP per antimatter galaxy", eff: function() {return Decimal.pow(1.2, game.galaxies)}, pre: ["i11"]})
ns({x:     3, y:    -3, id:  "i31", cost:    7, desc: "Sacrifice affects 9th Infinity Dimension with reduced effect", eff: function() {return getSacrificeMult().pow(0.05)}, pre: ["i22"]})
ns({x:     4, y:    -3, id:  "i32", cost:   12, desc: "Replicanti boost is powered up.", pre: ["i22"]})
ns({x:     4, y:    -2, id:  "s02", cost:    0, desc: "Eternity Challenge 2", pre: ["i32"]})
ns({x:    -2, y:     2, id:  "t11", cost:    1, desc: "Tickspeed affects first Time Dimension with reduced effect", eff: function() {return getTickspeed("dimension").pow(0.0005).max(1)}, pre: ["s00"]})
ns({x:    -3, y:     2, id:  "t21", cost:    4, desc: "Time Dimensions get a multiplier based on free tickspeed upgrades", eff: function() {return getFreeTickspeedUpgrades().pow(0.5)}, pre: ["t11"]})
ns({x:    -3, y:     1, id:  "t22", cost:    4, desc: "Time Dimensions are affected by replicanti to a severely reduced effect.", eff: function() {return getReplEffect().pow(0.5)}, pre: ["t11"]})
ns({x:    -4, y:     3, id:  "t31", cost:    6, desc: "Time Dimensions gain a boost equal to time theorems plus one.", eff: function() {return game.timestudy.theorems.add(1)}, pre: ["t21"]})
ns({x:    -4, y:     2, id:  "t32", cost:   14, desc: "Time shards boost Normal Dimensions.", eff: function() {return game.timeDimensions[0].amount.add(1).log(1.0025).pow(25)}, pre: ["t22"]})
ns({x:    -3, y:     3, id:  "t41", cost:   20, desc: "The free tickspeed given from Time Dimensions is multiplied by 1.1.", eff: function() {return 1.1}, pre: ["t31"]})
ns({x:    -3, y:     4, id:  "s03", cost:    0, desc: "Eternity Challenge 3", pre: ["t41"]})
ns({x:     0, y:    -3, id:  "g11", cost:    1, desc: "Galaxies are 10% stronger.", eff: function() {return 1.1}, pre: ["s00"]})
ns({x:     0, y:    -4, id:  "g12", cost:    2, desc: "Replicanti grow faster based on tickspeed.", eff: function() {return getTickspeed("infinityDimension").pow(0.5).divide(1e70).add(1).log(10000).divide(10).max(1)}, pre: ["g11"]})
ns({x:     1, y:    -3, id:  "g21", cost:    6, desc: "Second Time Dimension gains a boost based on galaxies.", eff: function() {return getEffectiveGalaxies().add(1).pow(0.0125)}, pre: ["g12"]})
ns({x:    -1, y:    -3, id:  "g22", cost:    6, desc: "Third Time Dimension gains a boost based on eternity points.", eff: function() {return game.eternityPoints.add(1).pow(0.125)}, pre: ["g12"]})
ns({x:     1, y:    -4, id:  "g31", cost:   10, desc: "Replicanti grow faster based on free tickspeed upgrades.", eff: function() {return getFreeTickspeedUpgrades().add(1).pow(0.125)}, pre: ["g21"]})
ns({x:    -1, y:    -4, id:  "g32", cost:   10, desc: "You gain a multiplier to EP based on replicated galaxies.", eff: function() {return game.replicanti.galaxies.add(1).pow(0.125)}, pre: ["g22"]})
ns({x:     2, y:     2, id:  "r11", cost:   10, desc: "Decrease galaxy cost scaling by 10%", pre: ["s00"]})
ns({x:     3, y:     1, id:  "r21", cost:   25, desc: "Distant antimatter galaxy scaling starts 25 later", pre: ["r11"]})
ns({x:     3, y:     2, id:  "r22", cost:    5, desc: "You gain replicanti three times faster", pre: ["r11"]})
ns({x:     4, y:     2, id:  "r31", cost:    5, desc: "Sacrifice is 10% stronger", pre: ["r21"]})
ns({x:     4, y:     3, id:  "r32", cost:   50, desc: "Replicanti galaxies are 50% more effective", pre: ["r22"]})
ns({x:     3, y:     3, id:  "r41", cost:   85, desc: "Replicanti galaxies boost replicanti multiplier.", eff: function() {return game.replicanti.galaxies.add(1/250).multiply(250).max(1)}, pre: ["r32"]})
ns({x:     3, y:     4, id:  "s04", cost:    0, desc: "Eternity Challenge 4", pre: ["r41"]})
ns({x:     0, y:     3, id:  "d11", cost:  200, desc: "Unlock Time Dilation", pre: ["s00"],})
ns({x:    -1, y:     4, id:  "d12", cost: 5000, desc: "Unlock time dimensions 5 and 6", pre: ["d11"],})
ns({x:     0, y:     4, id:  "d21", cost:  1e7, desc: "Unlock time dimensions 7 and 8", pre: ["d12"],})
ns({x:     1, y:     4, id:  "d22", cost: 1e10, desc: "Unlock time dimension 9", pre: ["d21"],})
ns({x:     0, y:     5, id:  "d31", cost: 1e13, desc: "Unlock ex-dilation", pre: ["d22"],})

Study.prototype.getPostStudies = function() {
	var l = []
	tree.studies.forEach(function(study) {
		if(study.pre.includes(this.id)) l.push(study);
	})
	this.post = l;
	return l;
}

Study.prototype.canBuy = function(nocost) {
	if(tree.hasStudy(this.id)) return false;
	if(!nocost && game.timestudy.theorems.lt(this.cost)) return false;
	
	var or = false;
	var and = true;
	
	this.pre.forEach(function(p) {
		if(game.timestudy.studies.includes(p)) or = true; else and = false;
	});
	
	if(this.and) {
		if(and) return true;
		return false;
	}
	else {
		if(or) return true;
		return false;
	}
}

Study.prototype.buy = function() {
	if(!this.canBuy()) return;
	game.timestudy.theorems = game.timestudy.theorems.subtract(this.cost)
	game.timestudy.studies.push(this.id);
  if(this.id == "d11") game.dilation.unlocked = true;
	return true;
}

var canvas = document.getElementById("studyTreeCanvas");
var ctx = canvas.getContext("2d");
addEventListener("resize", resizeCanvas);

function resizeCanvas() {
	canvas.width = innerWidth;
	ge("timeStudies").style.height = canvas.height = innerHeight - 200;
	canvas.style.position = "absolute"
	canvas.style.left = 0;
	canvas.style.top = 200;
	drawStudyTree();
}

document.onload = resizeCanvas;

function drawStudyTree() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	
}
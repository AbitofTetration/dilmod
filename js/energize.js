function resetEnergize() {
  game.energize = {
    times: new Decimal(0),
    energyShards: new Decimal(0),
    upgrades: [],
    stored_boosts: new Decimal(0),
    battery: {
      unlock: false,
      power: new Decimal(0),
      electric: new Decimal(0)
    }
  }
}

function haveEnergized() {
	return game.energize.times.gt(0);
}

function atEnergize() {
	return game.eternityPoints.gte(getEnergize());
}

function gainedEnergyShards() {
	return game.eternityPoints.add(gainedEternityPoints()).pow(1/3000).multiply(1).divide(10).floor();
}

var chargedMilestones = {
	keepIU: {req:  2500000, desc: "You keep infinity upgrades."},
  keepNC: {req:  2400000, desc: "You keep normal challenges."},
  keepIC: {req:  2300000, desc: "You keep infinity challenges."},
  keepEC: {req:  2200000, desc: "You keep eternity challenges."},
	keepBU: {req:  1500000, desc: "You keep break infinity upgrades."},
	keepTP: {req:  1250000, desc: "You keep some of your TP on energize."},
	tAuto1: {req:  1000000, desc: "Unlock Infinity Dimension autobuyer 1"},
	tAuto2: {req:  900000, desc: "Unlock Infinity Dimension autobuyer 2"},
	tAuto3: {req:  800000, desc: "Unlock Infinity Dimension autobuyer 3"},
	tAuto4: {req:  700000, desc: "Unlock Infinity Dimension autobuyer 4"},
	tAuto5: {req:  600000, desc: "Unlock Infinity Dimension autobuyer 5"},
	tAuto6: {req:  500000, desc: "Unlock Infinity Dimension autobuyer 6"},
	tAuto7: {req:  400000, desc: "Unlock Infinity Dimension autobuyer 7"},
	tAuto8: {req:  300000, desc: "Unlock Infinity Dimension autobuyer 8"},
	tAuto9: {req:  200000, desc: "Unlock Infinity Dimension autobuyer 9"},
	dShift: {req:  100000, desc: "Unlock automatic dilation upgrades"},
	keepTT: {req:  50000, desc: "You keep Time Studies and time theorems."},
	keepEU: {req:  25000, desc: "You keep eternity upgrades."},
}

function chargedMilestone(id) {
  return game.chargedMilestones.includes(chargedMilestones[id])
}

function getEnergize() {
	if(getChallengeSet() == 4) return getChallengeGoal()
	return new Decimal("1e3000");
}

function energize(force) {
  if(!atEnergize() && !force) return;
  
  if(!confirm("Are you sure you want to Energize? This will reset all of your progress in Eternity in exchange for Energy Shards.")) return;
  
  if(!force) {
    game.energize.times = game.energize.times.add(1)
    game.energize.energyShards = game.energize.energyShards.add(gainedEnergyShards())
		var time = getTimeSince("energize");
  }
  
  for (var i in chargedMilestones) {
    if (i.req < game.totalBoostsEnergize) game.chargedMilestones.push(i)
  }
  
  for (var i = 0; i <= 3; i++) {
    game.timestudy.bought[i] = new Decimal(0)
  }
  game.energizeTime = 0;
  resetEternityUpgrades()
  resetTimeDimensions()
  resetExDilation()
  resetReplicanti()
  resetDilation()
  respecTimeStudies()
  game.eternities = new Decimal(0);
	
  if(!eternityMilestone("keepIT")) game.bestInfinityTime = Infinity;
	for(var i = (chargedMilestone("keepNC")+chargedMilestone("keepIC")+chargedMilestone("keepEC"))*12; i < 36; i++) game.challenges[Math.floor(i/12)][i%12].completed = false;
	if(eternityMilestone("iShift")) game.infinityShifts = 9;
	
	if(eternityMilestone("keepBI"));
	else if(eternityMilestone("keepIU")) game.infinityUpgrades = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
	else resetInfinityUpgrades();
	game.repeatInf = [
		{cost: new Decimal(10), costMult: new Decimal(10), bought: new Decimal(0)}, 
		{cost: new Decimal(1e10), costMult: new Decimal(10), bought: new Decimal(0)}, 
		{cost: new Decimal(1e10), costMult: new Decimal(1e10), bought: new Decimal(0)}
	]
	
	game.infinityTime = game.eternityTime = Date.now();
	game.bestIPRate = game.bestEPRate = new Decimal(0);
	game.infinityPoints = game.infinities = new Decimal(0);
  game.totalBoostsEnergize = new Decimal(0)
	resetInfinityDimensions();
  game.infinityPoints = getStartingIP()
	game.shifts = getStartingShifts();
	game.boosts = new Decimal(0);
	game.galaxies = new Decimal(0);
  game.replicanti.amount = new Decimal(1);
  game.replicanti.ticks = 0;
	game.replicanti.galaxies = new Decimal(0);
	resetDimensions();
  game.dilation.active = false
  game.eternityPoints = new Decimal(0);
}

var energizeUpgradeCosts = "1, 1, 1, 6e4, 8e5, 9e11, 1e15, 1e21, 1e43, 1e60, 1e140, 1e170, 1e200, 1e260, 1e280, 1e380, 1e500, 1e620, 1e700, 1e880".split(",");

function canBuyEnergizeUpgrade(i) {
	if(game.energize.upgrades.includes(i)) return false;
	if(game.energize.energyShards.lt(energizeUpgradeCosts[i])) return false;
	return true;
}

function buyEnergizeUpgrade(i) {
	if(!canBuyEnergizeUpgrade(i)) return;
	game.energize.energyShards = game.energize.energyShards.subtract(energizeUpgradeCosts[i]);
	game.energize.upgrades.push(i);
}

function getEnergizeUpgradeEffect(n) {
	switch(n) {
		case 2:
			return game.eternities.pow(game.eternities.log(10).divide(2)).max(1)
		case 3:
			return game.infinityDimensions[9].bought.pow(10).max(1)
		case 4:
			return game.timeDimensions[0].amount.pow(0.5).max(1)
    case 8:
      return game.replicanti.galaxies.add(1).pow(0.125).max(1)
    case 9:
      return getSacrificeMult().add(1).log(1.65404).pow(2).max(1)
    case 10:
      return game.dimensions[0].amount.add(1).log("1e1200000").max(1).pow(1/3).max(1)
    case 11:
      return game.infinityPoints.add(gainedInfinityPoints()).add(1).log("1e20000").max(1).pow(1/3).max(1)
    case 12:
      return game.eternityPoints.add(gainedEternityPoints()).add(1).log("1e300").max(1).pow(1/3).max(1)
    case 13:
      return game.infinityDimensions[0].amount.add(1).log("1e50000").pow(1/3).max(1).max(1)
    case 14:
      return game.timeDimensions[0].amount.add(1).log("1e2000").max(1).pow(1/3).max(1)
	}
}

function getEnUDescriptions() {
	return [
		"Dimension boosts are 1e5x stronger.",
    "Infinity shifts are 100x stronger.",
    "You gain more infinities based on your eternities.<br>Currently: " + shorten(getEnergizeUpgradeEffect(2)) + "x"
	]
}
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
	keepIU: {req:  1, desc: "You keep infinity upgrades."},
	keepTT: {req:  2, desc: "You keep time studies and time theorems."},
  keepNC: {req:  3, desc: "You keep normal challenges."},
  keepIC: {req:  4, desc: "You keep infinity challenges."},
  keepEC: {req:  5, desc: "You keep eternity challenges."},
	keepBU: {req:  6, desc: "You keep break infinity upgrades."},
	lotOfE: {req:  7, desc: "You start Energizes with 300 eternities."},
	keepTP: {req:  8, desc: "You keep some of your TP on energize."},
	tAuto1: {req:  9, desc: "Unlock Infinity Dimension autobuyer 1"},
	tAuto2: {req:  10, desc: "Unlock Infinity Dimension autobuyer 2"},
	tAuto3: {req:  11, desc: "Unlock Infinity Dimension autobuyer 3"},
	tAuto4: {req:  12, desc: "Unlock Infinity Dimension autobuyer 4"},
	tAuto5: {req:  13, desc: "Unlock Infinity Dimension autobuyer 5"},
	tAuto6: {req:  14, desc: "Unlock Infinity Dimension autobuyer 6"},
	tAuto7: {req:  15, desc: "Unlock Infinity Dimension autobuyer 7"},
	tAuto8: {req:  16, desc: "Unlock Infinity Dimension autobuyer 8"},
	tAuto9: {req:  17, desc: "Unlock Infinity Dimension autobuyer 9"},
	dShift: {req:  18, desc: "Unlock automatic dilation upgrades"},
	keepEU: {req:  20, desc: "You keep eternity upgrades."},
}

function chargedMilestone(id) {
  return game.energize.times.gt(chargedMilestones[id].req)
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
  
  if(!chargedMilestone("keepTT")) 
  for (var i = 0; i <= 3; i++) {
    game.timestudy.bought[i] = new Decimal(0)
  }
  game.energizeTime = 0;
  resetEternityUpgrades()
  resetTimeDimensions()
  resetExDilation()
  resetReplicanti()
  resetDilation()
  if(!chargedMilestone("keepTT"))respecTimeStudies()
  game.eternityPoints = new Decimal(0);
  game.eternities = new Decimal(0);
	
  if(!chargedMilestone("keepIT")) game.bestInfinityTime = Infinity;
	for(var i = (chargedMilestone("keepNC")+chargedMilestone("keepIC")+chargedMilestone("keepEC"))*12; i < 36; i++) game.challenges[Math.floor(i/12)][i%12].completed = false;
	if(chargedMilestone("iShift")) game.infinityShifts = 9;
	
	if(chargedMilestone("keepBU"));
	else if(chargedMilestone("keepIU")) game.infinityUpgrades = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
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
}

var energizeUpgradeCosts = "1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 5, 100".split(",");

function canBuyEnergizeUpgrade(i) {
	if(game.energize.upgrades.includes(i)) return false;
	if(game.energize.energyShards.lt(energizeUpgradeCosts[i])) return false;
  if(!game.energize.upgrades.includes(i-3)||i<3) return false;
	return true;
}

function buyEnergizeUpgrade(i) {
	if(!canBuyEnergizeUpgrade(i)) return;
	game.energize.energyShards = game.energize.energyShards.subtract(energizeUpgradeCosts[i]);
	game.energize.upgrades.push(i);
}

function getEnergizeUpgradeEffect(n) {
	switch(n) {
    case 0:
      return game.energize.times.add(1).pow(game.energize.times.pow(2).add(1))
		case 1:
			return Math.max(1e25 / getChallengeTimes(2) ** 5, 1) //Decimal.divide(1e25, Decimal.pow(getChallengeTimes(2), 6))
		case 2:
			return game.timeDimensions[0].amount.add(1).log10().add(1)
		case 3:
			return getTickspeed("dimension").add(1).log(250).pow(1/15).max(1)
		case 4:
			return getReplChance().add(1).pow(1/3).max(1)
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
		"Time Dimensions are stronger based on your energizes.<br>Currently: " + shorten(getEnergizeUpgradeEffect(0)) + "x",
    "Time Dimensions are stronger based on EC times.<br>Currently: " + shorten(getEnergizeUpgradeEffect(1)) + "x",
    "Time Dimensions are stronger based on your time shards.<br>Currently: " + shorten(getEnergizeUpgradeEffect(2)) + "x",
    "Replicanti are stronger based on tickspeed.<br>Currently: " + shorten(getEnergizeUpgradeEffect(3)) + "x",
    "You gain extra replicated galaxies based on replicanti chance.<br>Currently: " + "+" + shorten(getEnergizeUpgradeEffect(4))
	]
}
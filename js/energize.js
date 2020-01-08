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
	keepIU: {req:  23000, desc: "You keep infinity upgrades."},
	keepBU: {req:  15000, desc: "You keep infinity upgrades."},
	tAuto1: {req:  10000, desc: "Unlock Infinity Dimension autobuyer 1"},
	tAuto2: {req:  9000, desc: "Unlock Infinity Dimension autobuyer 2"},
	tAuto3: {req:  8000, desc: "Unlock Infinity Dimension autobuyer 3"},
	tAuto4: {req:  7000, desc: "Unlock Infinity Dimension autobuyer 4"},
	tAuto5: {req:  6000, desc: "Unlock Infinity Dimension autobuyer 5"},
	tAuto6: {req:  5000, desc: "Unlock Infinity Dimension autobuyer 6"},
	tAuto7: {req:  4000, desc: "Unlock Infinity Dimension autobuyer 7"},
	tAuto8: {req:  3000, desc: "Unlock Infinity Dimension autobuyer 8"},
	tAuto9: {req:  2000, desc: "Unlock Infinity Dimension autobuyer 9"},
	dShift: {req:  1000, desc: "Unlock automatic dilation upgrades"}
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
    if (i.req < game.totalBoostsEnergize) game.chargedMilestones.push
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
	for(var i = (eternityMilestone("keepNC")+eternityMilestone("keepIC"))*12; i < 24; i++) game.challenges[Math.floor(i/12)][i%12].completed = false;
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
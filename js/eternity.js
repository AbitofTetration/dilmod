function haveEternitied() {
	return game.eternities.gt(0);
}

function atEternity() {
	return game.infinityPoints.gte(getEternity());
}

function gainedEternityPoints() {
	return game.infinityPoints.add(gainedInfinityPoints()).pow(1/308).multiply(getEternityPointMult()).divide(10).floor();
}

function getEternityPointMult() {
	r = Decimal.pow(5, game.repeatEter[0])
	
	return r;
}

function getEternity() {
	if(getChallengeSet() == 3) return getChallengeGoal()
	return infp()
}

function getStartingIP() {
	r = 0
	if(game.achievements.includes(76)) r = 1e30
	if(game.achievements.includes(85)) r = 1e100
	return new Decimal(r)
}

function eternity(force) {
	if(!atEternity() && !force) return;
	
	if(!haveEternitied()) {
		showTab("dimensions")
		showDimensionTab("time")
	}
	
	if(!force) {
    if(game.infinityDimensions[0].amount.eq(1)) giveAchievement(81)
    if(game.dilation.active) game.dilation.tachyonParticles = game.dilation.tachyonParticles.add(gainedTP())
		giveAchievement(67);
		
		game.eternityPoints = game.eternityPoints.add(gainedEternityPoints())
		var time = getTimeSince("eternity");
		game.eternities = game.eternities.add(1);
    if(game.eternities.gt(100)) giveAchievement(78)
		if(time < game.bestEternityTime) game.bestEternityTime = getTimeSince("eternity")
    if(game.bestEternityTime < 3e4) giveAchievement(76)
    if(game.bestEternityTime < 1e3) giveAchievement(85)

		if(inChallenge() && getChallengeSet() == 3) {
			var c = game.challenges[2][(game.challengesRunning[0]-1)%12]
			c.completed = true;
			c.bestTime = Math.min(c.bestTime || Infinity, getTimeSince("eternity"));
      giveAchievement(82)
			exitChallenge();
		}
	}
	
  if(!eternityMilestone("keepIT")) game.bestInfinityTime = Infinity;
	for(var i = (eternityMilestone("keepNC")+eternityMilestone("keepIC"))*12; i < 24; i++) game.challenges[Math.floor(i/12)][i%12].completed = false;
	if(eternityMilestone("iShift")) game.infinityShifts = 9;
	
	if(eternityMilestone("keepBI"));
	else if(eternityMilestone("keepIU")) game.infinityUpgrades = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
	else resetInfinityUpgrades();
  game.dilation.active = false;
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
  game.replicanti.ticks = new Decimal(0);
	game.replicanti.galaxies = new Decimal(0);
	resetDimensions();
  game.dilation.active = false
	
	return true;
}

function respecTimeStudies() {
	game.timestudy.theorems = getTotalTT();
	game.timestudy.studies = [];
	eternity();
}

var eternityUpgradeCosts = "20, 400, 5000, 6e4, 8e5, 9e11, 1e15, 1e21, 1e43, 1e60, 1e150, 1e200, 1e270, 1e300, 1e320, 1e340".split(",");

function canBuyEternityUpgrade(i) {
	if(game.eternityUpgrades.includes(i)) return false;
	if(game.eternityPoints.lt(eternityUpgradeCosts[i])) return false;
	return true;
}

function buyEternityUpgrade(i) {
	if(!canBuyEternityUpgrade(i)) return;
	game.eternityPoints = game.eternityPoints.subtract(eternityUpgradeCosts[i]);
	game.eternityUpgrades.push(i);
}

function getEternityUpgradeEffect(n) {
	switch(n) {
		case 0:
			return game.eternityPoints.max(1);
		case 1:
			return game.eternities.pow(game.eternities.log10()).max(1);
		case 2:
			return Math.max(1e25 / getChallengeTimes(1) ** 4, 1)
		case 3:
			return game.infinityDimensions[9].bought.pow(10).max(1)
		case 4:
			return game.timeDimensions[0].amount.pow(0.5).max(1)
    case 8:
      return game.replicanti.galaxies.add(1).pow(0.125).max(1)
    case 9:
      return getSacrificeMult().add(1).log(1.65404).pow(2).max(1)
    case 10:
      return game.dimensions[0].amount.add(1).log("1e8000000").max(1)
    case 11:
      return game.infinityPoints.add(gainedInfinityPoints()).add(1).log("1e70000").max(1)
    case 12:
      return game.eternityPoints.add(gainedEternityPoints()).add(1).log("1e4320").max(1)
    case 13:
      return game.infinityDimensions[0].amount.add(1).log("1e100000").max(1)
    case 14:
      return game.timeDimensions[0].amount.add(1).log("1e4200").max(1)
	}
}

function getEUDescriptions() {
	return [
		"Infinity Dimensions are multiplied by unspent EP<br>Currently: " + shortenMoney(getEternityUpgradeEffect(0)) + "x",
		"Infinity Dimensions get a multiplier based on eternitites<br>Currently: " + shortenMoney(getEternityUpgradeEffect(1)) + "x",
		"Infinity Dimensions get a multiplier based on IC times<br>Currently: " + shortenMoney(getEternityUpgradeEffect(2)) + "x",
		"Infinity Dimensions get a multiplier based on ninth IDs<br>Currently: " + shortenMoney(getEternityUpgradeEffect(3)) + "x",
		"Infinity Dimensions get a multiplier based on time shards<br>Currently: " + shortenMoney(getEternityUpgradeEffect(4)) + "x",
		"The first 2 infinity upgrades affect Time Dimensions<br>Currently: " + shorten(getInfinityUpgradeEffect(23)) + "x",
		"Your achievement multiplier affects Time Dimensions<br>Currently: " + shortenMoney(getAchievementMultiplier()) + "x",
		"Time Dimensions gain a boost based on their tier.<br>Currently: " + shortenMoney(20) + "% extra per tier",
		"Time Dimensions gain a boost based on replicanti galaxies.<br>Currently: " + shorten(getEternityUpgradeEffect(8)) + "x",
		"4th Time Dimension gains a boost based on sacrifice.<br>Currently: " + shorten(getEternityUpgradeEffect(9)) + "x",
    "Dilated time gain is boosted based on antimatter.<br>Currently: " + shorten(getEternityUpgradeEffect(10)) + "x",
    "Dilated time gain is boosted based on infinity points.<br>Currently: " + shorten(getEternityUpgradeEffect(11)) + "x",
    "Dilated time gain is boosted based on eternity points.<br>Currently: " + shorten(getEternityUpgradeEffect(12)) + "x",
    "Tachyon particle gain is boosted based on infinity power.<br>Currently: " + shorten(getEternityUpgradeEffect(13)) + "x",
    "Tachyon particle gain is boosted based on time shards.<br>Currently: " + shorten(getEternityUpgradeEffect(14)) + "x"
	]
}

function resetEternityUpgrades() {
	game.eternityUpgrades = []
	game.repeatEter = [
		new Decimal(0),
	]
}

function getRepeatEterCost(i) {
	return new Decimal(["100"][i]).multiply(new Decimal(["100"][i]).pow(game.repeatEter[i]))
}

function canBuyRepeatEter(i) {
	return game.eternityPoints.gte(getRepeatEterCost(i));
}

function buyRepeatEter(i) {
	if(!canBuyRepeatEter(i)) return;
	if(i) {
		if(game.eternityPoints.lt(infp())) game.eternityPoints = game.eternityPoints.subtract(getRepeatEterCost(i));
		game.repeatEter[i] = game.repeatEter[i].add(1);
	}
	else {
		game.repeatEter[0] = game.eternityPoints.log10().divide(2).floor();
		if(game.eternityPoints.lt(infp())) game.eternityPoints = game.eternityPoints.subtract(Decimal.pow(100, game.eternityPoints.log10().divide(2).floor()))
	}
	return true;
}

var eternityMilestones = {
	keepNC: {req:   1, desc: "You start with all challenges completed"},
	ipMult: {req:   2, desc: "Unlock IP Multiplier autobuyer"},
	keepIU: {req:   3, desc: "You keep your infinity upgrades"},
	keepIT: {req:   5, desc: "You keep your best infinity time"},
	keepBI: {req:   8, desc: "You keep your break infinity upgrades"},
	keepIC: {req:  10, desc: "You start with all ICs completed"},
	iAuto1: {req:  11, desc: "Unlock Infinity Dimension autobuyer 1"},
	iAuto2: {req:  12, desc: "Unlock Infinity Dimension autobuyer 2"},
	iAuto3: {req:  13, desc: "Unlock Infinity Dimension autobuyer 3"},
	iAuto4: {req:  14, desc: "Unlock Infinity Dimension autobuyer 4"},
	iAuto5: {req:  15, desc: "Unlock Infinity Dimension autobuyer 5"},
	iAuto6: {req:  16, desc: "Unlock Infinity Dimension autobuyer 6"},
	iAuto7: {req:  17, desc: "Unlock Infinity Dimension autobuyer 7"},
	iAuto8: {req:  18, desc: "Unlock Infinity Dimension autobuyer 8"},
	iAuto9: {req:  19, desc: "Unlock Infinity Dimension autobuyer 9"},
	iShift: {req:  20, desc: "Unlock Infinity Shift autobuyer"},
	etAuto: {req: 100, desc: "Unlock Eternity autobuyer"},
	// repGal: {req: 200, desc: "Unlock Replicanti Galaxy autobuyer"},
	// repCha: {req: 300, desc: "Unlock Replicanti Chance autobuyer"},
	// repInt: {req: 500, desc: "Unlock Replicanti Interval autobuyer"},
	// repMax: {req: 1e3, desc: "Unlock Max Replicanti Galaxy autobuyer"},
}

function eternityMilestone(id) {
	return game.eternities.gte(eternityMilestones[id].req)
}

function resetDilation() {
  game.dilation = {
    unlocked: false,
    active: false,
    tachyonParticles: new Decimal(0),
    dilatedTime: new Decimal(0),
    galaxyThreshold: new Decimal(1000),
    thresholdUpSpeed: new Decimal(5),
    freeGalaxies: new Decimal(0),
    generatedTT: new Decimal(0),
    upgrades: [],
    repeatUpgr: [new Decimal(0),new Decimal(0),new Decimal(0)]
  }
}

function unlockedDilation() {
  return game.dilation.unlocked
}

function inDilation() {
  return game.dilation.active
}

function gainedTP() {
  return game.dimensions[0].amount.log(10).div(4000).pow(Decimal.add(1.5, game.dilation.repeatUpgr[2].add(1).log(10).divide(5))).subtract(game.dilation.tachyonParticles.add(1).log(10).div(4000)).multiply(extraTPMult())
}

function extraTPMult() {
  let r = new Decimal("1")
  
  for (var i = 12; i < 14; i++) if(game.eternityUpgrades.includes(i+1)) r = r.multiply(getEternityUpgradeEffect(i))

  return r;
}

function dilate() {
  eternity(true)
  game.dilation.active = true
}
var dilationRepUpgradeCosts = "100, 1000, 10000".split(",");

var dilationRepUpgradeCostMults = "100, 100, 100".split(",");

function getRepeatDilDesc() {
  return [
    "You gain twice as much dilated time.<br>Currently: " + shorten(Decimal.pow(2, game.dilation.repeatUpgr[0])) + "x",
    "Free galaxy threshold is reduced, but reset dilated time and free galaxies.",
    "Tachyon particle formula is better.<br>Currently: ^" + shorten(Decimal.add(1.5, game.dilation.repeatUpgr[2].add(1).log(10).divide(5)))
  ]
}

function getRepeatDilCost(i) {
	return new Decimal(dilationRepUpgradeCosts[i]).multiply(new Decimal(dilationRepUpgradeCostMults[i]).pow(game.dilation.repeatUpgr[i]))
}

function canBuyRepeatDil(i) {
	return game.dilation.dilatedTime.gte(getRepeatDilCost(i));
}

function buyRepeatDil(i) {
	if(!canBuyRepeatDil(i)) return;
		game.dilation.repeatUpgr[i] = game.dilation.dilatedTime.log10().divide(2).floor();
		if(game.dilation.dilatedTime.lt(infp())) game.dilation.dilatedTime = game.dilation.dilatedTime.subtract(Decimal.pow(dilationRepUpgradeCostMults[i], game.dilation.dilatedTime.log10().divide(2).floor()))
    if(i == 1) {
        game.dilation.dilatedTime = new Decimal(0),
        game.dilation.galaxyThreshold = new Decimal(1000),
        game.dilation.freeGalaxies = new Decimal(0),
        game.dilation.thresholdUpSpeed = new Decimal(5).divide(Decimal.add(1, game.dilation.repeatUpgr[1].add(1).log(10)))
    }
	return true;
}

var dilationUpgradeCosts = "100, 3200, 1e5, 1e7, 1e9, 1e11".split(",");

function getDUDescriptions() {
	return [
		"Replicanti grow faster based on DT.<br>Currently: " + shorten(getDilationUpgradeEffect(0)) + "x",
		"Tachyon Particles boost Time Dimensions.<br>Currently: " + shorten(getDilationUpgradeEffect(1)) + "x",
		"Normal dimensions gain a boost based on DT, unaffected by dilation.<br>Currently: " + shortenMoney(getDilationUpgradeEffect(2)) + "x",
		"You automatically generate TT.<br>Currently: " + shortenMoney(getDilationUpgradeEffect(3)) + "/s",
		"You gain some of your Infinity Points on infinity automatically.",
		"The first 2 infinity upgrades affect Time Dimensions<br>Currently: " + shortenMoney(getInfinityUpgradeEffect(23)) + "x",
	]
}
function getDilationUpgradeEffect(n) {
	switch(n) {
		case 0:
			return game.dilation.dilatedTime.pow(1/10).max(1);
		case 1:
			return game.dilation.tachyonParticles.pow(6).max(1);
		case 2:
			return game.dilation.dilatedTime.pow(4).max(1)
		case 3:
			return game.dilation.tachyonParticles.divide(2000).divide(getTTScaling()).max(1)
		case 4:
			return game.timeDimensions[0].amount.pow(0.5).max(1)
	}
}

function canBuyDilationUpgrade(i) {
	if(game.dilation.upgrades.includes(i)) return false;
	if(game.dilation.dilatedTime.lt(dilationUpgradeCosts[i])) return false;
	return true;
}

function buyDilationUpgrade(i) {
	if(!canBuyDilationUpgrade(i)) return;
	game.dilation.dilatedTime = game.dilation.dilatedTime.subtract(dilationUpgradeCosts[i]);
	game.dilation.upgrades.push(i);
}

function getDilationToimeMult() {
  let r = Decimal.pow(2, game.dilation.repeatUpgr[0])
  
  for (var i = 10; i < 12; i++) if(game.eternityUpgrades.includes(i+1)) r = r.multiply(getEternityUpgradeEffect(i))

  return r
}

function getTTScaling() {
  if(game.timestudy.theorems.lt(1e6)) return 1
  
  else return game.timestudy.theorems.divide(1e9).max(1)
}
function resetReplicanti() {
	game.replicanti = {
		amount: new Decimal(1),
		ticks: 0,
		galaxies: new Decimal(0),
		upgrades: [new Decimal(0), new Decimal(0), new Decimal(0)]
	}
}

const replUpgIncs = ["10", "100", "1e5"];

function getReplUpgradeCost(i) {
	return new Decimal(replUpgIncs[i]).pow(game.replicanti.upgrades[i].add(1));
}

function canBuyReplUpgrade(i) {
	return game.eternityPoints.gte(getReplUpgradeCost(i));
}

function buyReplUpgrade(i) {
	if(!canBuyReplUpgrade(i)) return;
	var inc = new Decimal(replUpgIncs[i]);
	var bought = Decimal.affordGeometricSeries(game.eternityPoints, inc, inc, game.replicanti.upgrades[i])
	game.replicanti.upgrades[i] = game.replicanti.upgrades[i].add(bought);
	if(game.eternityPoints.lt(infp())) game.eternityPoints = game.eternityPoints.subtract(getReplUpgradeCost(i).divide(inc))
}

function getReplEffect() {
  var r = game.replicanti.amount.floor().add(1).log2().pow(4).max(1);
  
  if(inChallenge(4,2)) r = new Decimal(1)
  if(challengeCompleted(2,2)) r = r.pow(1.05)
  if(tree.hasStudy("i32")) r = r.pow(1.32)
  if(tree.hasStudy("r41")) r = r.multiply(tree.getEff("r41"))
  
	return r
}

function getReplChance() {
  if(inChallenge(3, 1)) return new Decimal(0);
	var r = game.replicanti.upgrades[0].divide(100).add(1)
	
	return r;
}

function getReplSpeed() {
	var r = game.replicanti.upgrades[1].divide(10).add(1)
	if(tree.hasStudy("r22")) r = r.multiply(3)
  if(tree.hasStudy("g12")) r = r.multiply(tree.getEff("g12"))
  if(tree.hasStudy("g31")) r = r.multiply(tree.getEff("g31").max(500))
  if(challengeCompleted(4, 2)) r = r.multiply(Decimal.pow(2, getTimeSince("eternity")/1e6).min(infp(0.25)))
	if(game.dilation.upgrades.includes(0)) r = r.multiply(getDilationUpgradeEffect(0))
	
	return r;
}

function getReplLimit() {
	return infp(getMaxReplGalaxies().add(1)).max(infp())
}

function getMaxReplGalaxies() {
	if(game.replicanti.upgrades[2].lte(75)) {
     return game.replicanti.upgrades[2]; // cap this at some point
  } else {
     return game.replicanti.upgrades[2].log(getMaxReplGalaxiesSoftcap()).add(65.3908740944)
  }
}

function getMaxReplGalaxiesSoftcap() {
  let s = 1.5
  
  if(game.dilation.upgrades.includes(9)) s *= 0.9
  
  return s
}

fu

function canReplGalaxy() {
	return game.replicanti.amount.gte(infp(game.replicanti.galaxies.add(1))) && game.replicanti.galaxies.lt(getMaxReplGalaxies())
}

function replGalaxy() {
  var bought = game.replicanti.amount.log(infp()).max(getMaxReplGalaxies()).subtract(game.replicanti.galaxies).min(getMaxReplGalaxies())
  if(!canReplGalaxy()) return;
	game.replicanti.galaxies = game.replicanti.amount.log(infp()).min(getMaxReplGalaxies());
	game.replicanti.amount = game.replicanti.amount.divide(infp(bought.max(1)).max(1)).max(1);
}

function handleReplGrowth() {
  game.replicanti.ticks += diff/1000*hacker;
  if (game.replicanti.ticks > 1/getReplSpeed()) {
      updates = Math.floor(game.replicanti.ticks * getReplSpeed())
      if(updates > 10 || game.replicanti.amount.gt(100)) { // cap manual replication iterations, so as to not brick your computer
          game.replicanti.amount = game.replicanti.amount.multiply(getReplChance().pow(updates));
      } else {
          var a = game.replicanti.amount;
          for(var i = 0; i < a * updates; i++) {
              if(Math.random() < getReplChance() - 1) {
                  game.replicanti.amount = game.replicanti.amount.add(1); // run through all replicanti
                  }
              }
          }
      game.replicanti.ticks -= updates / getReplSpeed();
      game.replicanti.amount = game.replicanti.amount.min(getReplLimit());
   }
}
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

function atEnergize() {
	return game.eternityPoints.gte(getEnergize());
}

function gainedEternityPoints() {
	return game.eternityPoints.add(gainedEternityPoints()).pow(1/12000).multiply(1).divide(10).floor();
}

function getEnergize() {
	if(getChallengeSet() == 4) return getChallengeGoal()
	return new Decimal("1e12000");
}
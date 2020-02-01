var bhDimensionBaseCosts = [0, 15, 45, 250, 600, "1e2000", "1e5200", "1e6000", "1e9800", "1e15000"]
var bhDimensionCostMults = [0, 3, 9, 27, 81, 59049, 3486784401, 1.2157665e19, 1.4780882e38, 2.1847447e78]
var bhDimensionBuyMults = [0, 4, 4, 4, 4, 4, 4, 4, 4, 4]

function TimeDimension(i) {
	this.id = game.blackHoleDimensions.length;
	this.amount = new Decimal(0);
	this.bought = new Decimal(0);
	this.multiplier = new Decimal(1);
	this.cost = new Decimal(bhDimensionBaseCosts[i]);
	this.costMult = new Decimal(bhDimensionCostMults[i]);
}

function resetBHDimensions() {
	game.blackHoleDimensions = [];

	for(var i = 0; i <= 10; i++) {
		game.blackHoleDimensions[i] = new TimeDimension(i);
	}
	
	game.blackHoleDimensions[0].amount = new Decimal(0);
}

function getBHDimensionProduction(i) {
	var dim = game.blackHoleDimensions[i];
	
	dim.multiplier = Decimal.pow(bhDimensionBuyMults[dim.id], dim.bought)
	
	return dim.amount.multiply(dim.multiplier);
}

function canBuyBHDimension(i) {
	return game.blackHoleDimensions[i].cost.lte(game.exDilation.amount);
}

function buyBHDimension(i) {
	var dim = game.blackHoleDimensions[i];
	
	dim.cost = dim.costMult.pow(dim.bought).multiply(bhDimensionBaseCosts[i]);
	if(!canBuyBHDimension(i)) return;
	game.exDilation.amount = game.exDilation.amount.subtract(dim.cost);
	
	dim.amount = dim.amount.add(1);
	dim.bought = dim.bought.add(1);
	
	dim.cost = dim.costMult.pow(dim.bought).multiply(bhDimensionBaseCosts[i]);
	
	return true;
}

function maxBHDimension(i) {
	var dim = game.blackHoleDimensions[i];
	if(!canBuyBHDimension(i)) return;
	
	dim.bought = game.exDilation.amount.divide(bhDimensionBaseCosts[i]).log10().divide(Decimal.log10(bhDimensionCostMults[i])).add(1).floor();
	dim.amount = dim.amount.max(dim.bought)
	dim.cost = dim.costMult.pow(dim.bought).multiply(bhDimensionBaseCosts[i]);
	if(game.exDilation.amount.lt("eee1")) game.exDilation.amount = game.exDilation.amount.subtract(dim.cost.divide(bhDimensionCostMults[i]));
}

function maxAllBHDimensions() {
	for(var i = 1; i < 4; i++) maxBHDimension(i);
}


const achievements = 108;

function updateAchievementDescriptions() {
	achievementDescriptions = [
		"The first one's always free", `Buy a single first dimension.`,
		"100 antimatter is a lot", `Buy a single second dimension.`,
		"Half Life 3 unconfirmed", `Buy a single third dimension.`,
		"Hard to imagine", `Buy a single fourth dimension.`,
		"First Death", `Buy a single fifth dimension.`,
		"We could barely afford 9", `Buy a single sixth dimension.`,
		"Praise hevi", `Buy a single seventh dimension.`,
		"90 degrees to infinity", `Buy a single eighth dimension.`,
		"Impossible", `Buy a single ninth dimension.`,
		
		"To Infinity", `Reach ${shortenMoney("1.8e308")} antimatter. Reward: Start with 100 extra antimatter.`,
		"The tenth dimension is a lie", `Get 5 dimension shifts.`, 
		"Boosting to the max", `Get 5 dimension boosts.`,
		"Uh oh", `Get over ${shortenMoney(1e303)} antimatter.`, 
		"You got past the big wall", `Buy an antimatter galaxy.`, 
		"Triple Galaxy", `Have 3 antimatter galaxies at once.`, 
		"Nerf the Galaxies Please", `Have 4 antimatter galaxies at once.`, 
		"There's no point in doing that", `Sacrifice without having any ninth dimensions.`, 
		"Unhevi", `Get over ${shortenMoney(6.66e201)} antimatter with exactly 9 ninth dimensions. Reward: Ninth dimensions are 9% stronger.`,
		
		"The gods are pleased", `Get a multiplier of over 66,666 from dimensional sacrifice. Challenge 8 doesn't count. Reward: Sacrifice is 10% stronger.`,
		"Multidimensional", `Reach ${shortenCosts(1e27)} eighth dimensions.`,
		"Faster than a potato", `Get more than ${shortenCosts(1e16)} ticks per second. Reward: Tickspeed is 1% faster.`,
		"That's a lot of infinities", `Reach infinity 10 times.`,
		"I am speed", `Infinity in under 5 hours. Reward: Start with 1,000 extra antimatter.`,
		"The way it's meant to be", `Reach infinity with 2 or fewer antimatter galaxies. Reward: Tickspeed is 2% faster.`,
		"You didn't need it anyway", `Reach infinity without having any ninth dimensions. Challenge 10 doesn't count. Reward: Dimensions 1-8 are 8% stronger.`,
		"Cast out the heretic", `Reach infinity without ever buying a ninth dimension during the current infinity. Challenge 10 doesn't count.`,
		"I don't believe in gods", `Reach infinity without sacrificing.`,
		
		"Galaxy Cluster", `Buy 100 antimatter galaxies.`,
		"Hoarding infinities", `Have over 1,000 unspent Infinity Points at once.`,
		"Slower than a potato", `Reach infinity without any tickspeed upgrades. Reward: Tickspeed is 5% faster.`,
		"The Grind Begins", `Infinity 1,000 times.`,
		"That's fast!", `Infinity in under an hour. Reward: Start with 200,000 antimatter.`,
		"That sucked", `Complete a challenge.`,
		"Suffer", `Complete challenge 9.`,
		"Confused Screaming", `Reach infinity without any antimatter galaxies. Reward: Tickspeed is 10% faster.`,
		"Hevi would be proud", `Complete all of the challenges.`,
		
		"And Beyond", `Break Infinity.`,
		"Two Infinities at Once", `Reach ${shorten(infp(2))} antimatter. Reward: 2x multiplier to IP.`,
		"Powered Up", `Buy 6 Break Infinity upgrades.`,
		"New Dimensions", `Unlock the first infinity dimension.`,
		"Supersanic", `Infinity in under a minute. Reward: Start with 10 billion antimatter.`,
		"Boosted", `Dimension boost 27 times in a single infinity. Reward: Dimension boosts are 1% stronger.`,
		"Zero Deaths", `Reach infinity without any dimension shifts, boosts, or galaxies. Reward: You can start with dimension shifts in challenges.`,
		"Life is pain", `Complete a challenge in under 3 minutes.`,
		"Suicide is badass", `Get the sum of all challenge times under 3 minutes.`,
		
		"1 million is a lot", `Reach 1 million infinity power.`,
		"Get off of Amazon", `Buy 150 first dimensions in a single infinity. Reward: Dimensions get a multiplier based on the amount bought.`,
		"Oh hey", `Have exactly 69 ninth dimensions at once. Reward: Break Infinity upgrade 3 is 3.14x stronger.`,
		"There better not be 9", `Unlock the second infinity dimension.`,
		"Forever isn't that long", `Infinity in under a second. Reward: Start with ${getFullExpansion(1e25)} antimatter.`,
		"Unholy Infinity", `Get all dimension multipliers over ${shorten(infp())}. Reward: Infinity dimensions are 1% stronger.`,
		"Infinitely Challenging", `Complete Infinity Challenge 1.`,
		"Don't judge me, I'm a sadist", `Complete Infinity Challenge 5.`,
		"Is this hell?", `Get the sum of all challenge times under 5 seconds.`,
		
		"ERROR 909: Dimension Not Found", `Reach infinity with only 1 first dimension. Reward: First dimensions are stronger the more you have.`,
		"INFINITE POWER", `Reach ${shorten(infp())} Infinity Power.`,
		"THIS<BR>ACHIEVEMENT<BR>DOESN'T<BR>EXIST", `Reach ${shortenMoney("9.99e9999")} antimatter. Reward: Dimensions are more powerful the more antimatter you have.`,
		"You can get 50 galaxies?", `Get 50 galaxies.`,
		"Blink of an Eye", `Infinity in under a tenth of a second. Reward: Start with ${getFullExpansion(1e100)} antimatter.`,
		"Yet another infinity reference", `Get a total sacrifice multiplier of ${shorten(infp())}. Reward: Sacrifice is stronger.`,
		"Hevipelle did nothing wrong", `Complete Infinity Challenge 5 in 10 seconds or less.`,
		"Antichallenged", `Complete all 12 infinity challenges.`,
		"Yes. This is hell.", `Get the sum of all infinity challenge times under 6.66 seconds.`,
		
		"Galaxy Supercluster", `Buy 10,000 antimatter galaxies.`,
		"Ludicrous Speed", `Big Crunch for 1e200 IP in 2 seconds or less.`,
		"I got a few to spare", `Reach ${shorten("1e35000")} antimatter. Reward: Dimensions are more powerful the more antimatter you have.`,
		"All your IP are belong to us", `Big Crunch for ${shorten(infp())} IP.`,
		"Time is Relative", `Go Eternal.`,
		"Maximum Overdrive", `Reach ${shorten(1e303)} IP per minute.`,
		"Oh hey... You're still here?", `Reach ${shorten("1e333")} IP.`,
		"0 degrees from infinity", `Unlock the eighth infinity dimension.`,
		"Are you kidding me?", `Unlock the ninth infinity dimension.`,
		
		"Galaxy Filament", `Buy 50,000 antimatter galaxies.`,
		"Is this safe?", `Reach Infinite replicanti in under 30 minutes.`,
		"Minute of Infinity", `Reach Infinite replicanti in under a minute.`,
		"Infinite Time", `Get 308 tickspeed upgrades. Reward: Time dimensions get a boost based on tickspeed upgrades.`,
		"That wasn't a eternity", `Eternity in 30 seconds. Reward: You start eternities with ${shorten("1e30")} IP.`,
		"ONE HUNDRED THOUSAND INFINITIES", `Reach ${shorten("1e5")} infinities. Reward: Infinities more than one second long give 50x infinities.`,
		"That took a while", `Reach 100 eternities.`,
		"Quick spender", `Buy 10 time theorems.`,
		"Faster than a potato^3000", `Reach ${shorten(Decimal.pow(1e16,3000))} tick per second. Reward: Tickspeed is 1% faster.`,

		"We didn't need them anyway", `Eternity without any Infinity Dimensions (including EC1).`,
		"Eternal Suffering", `Complete a Eternity Challenge.`,
		"You can't stop me!", `Get the sum of all infinity challenge times under 1 second.`,
		"Nerf replicanti", `Get a multiplier from replicanti equal to ${shorten(1e20)}x.`,
		"Eternity is the new infinity", `Eternity in one second. Reward: You start eternities with ${shorten("1e100")} IP.`,
		"But I wanted a new prestige layer!", `Reach ${shorten(infp())} eternity points.`,
		"I do not trust you", `Reach 9,999 ninth dimensions.`,
		"I told you already, time is relative.", `Dilate time.`,
		"Este logro no existe 2", `Reach ${shortenMoney("9.99e99999")} IP. Reward: Gain more infinity points based on antimatter.`,

		"Now you're thinking with dilation!", `Undilate time for ${shortenCosts("1e600")} EP in 10 seconds. Reward: Dilation doesn't affect Time Dimensions.`,
		"Faster than a Dry Bones", `Reach ${shorten(Decimal.pow(1e16,125000))} ticks per second. Reward: Time Dimensions are 3% stronger.`,
		"I gotta keep grinding!", `Buy six dilation upgrades.`,
		"It won't be enough", `Reach ${shorten(new Decimal("1e20000"))} replicanti.`,
		"Time goes by fast", `Eternity in one tenth of a second.`,
		"Unique Snowflakes", `Reach ${shortenMoney(250)} galaxies without any replicated galaxies. Reward: Normal galaxies are 1% stronger.`,
		"GAS GAS GAS", `Reach ${shortenMoney(1e4)} tickspeed upgrades.`,
		"The next update is in 5 eternities", `Complete all of the eternity challenges.`,
		"Once More, Beyond", `Ex-dilate.`,

		"In the depths of the far endgame", `Reach ${shortenMoney("1e4000")} eternity points. Reward: Small multiplier to ex-dilation based on eternity points.`,
		"This game is easy<br><br>Bottom text", `Reach ${shortenMoney("8e8888888")} antimatter.`,
		"Galactic Great Wall", `Buy 200,000 antimatter galaxies.`,
		"Infinite free real estate", `Reach ${shorten(new Decimal("5e7"))} banked infinities. Reward: You gain 10% of your infinities on eternity as banked infinities.`,
		"Empowered!", `Energize. (You can't get this yet, as Energize hasn't been finished.)`,
		"I never really liked this infinity stuff anyway", `Reach ${shorten("1.79e300008")} IP while in dilation, without IP multipliers. Reward: You gain more infinities based on your tachyon particles.`,
		"Still waiting for Battle Replicants", `Get a multiplier from replicanti equal to ${shorten(1e30)}x.`,
		"", ``,
		"When will I get rid of you?", `Reach ${shortenMoney("1e7000")} infinity points within EC10. Reward: Upgrades that use infinities are ${shortenMoney("1e10")}x stronger.`,
	],
  
  achievementImages = [
    "The first one's always free", "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F47ca946b-e0d4-422d-a703-a54e525f58ad.image.png?v=1579974571096",
    "100 antimatter is a lot", "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Ff71e7fdb-28fa-4a2f-955f-a38ffc3906f8.image.png?v=1579974666134"
  ]
}



function giveAchievement(id) {
	if(game.achievements.includes(id)) return;
	game.achievements.push(id);
	updateAchievements();
  $.notify(achievementDescriptions[id * 2], "success");
}

function updateAchievements() {
	updateAchievementDescriptions();
	
	for(var i = 0; i < achievements; i++) {
		var a = ge("achievement" + i)
		a.className = game.achievements.includes(i) ? "achievementunlocked" : "achievementlocked"
		a.innerHTML = "<br>" + achievementDescriptions[i * 2] + "<br>" + (devMode ? i : "") 
		a.setAttribute("tooltip", achievementDescriptions[i * 2 + 1])
	  if (achievementDescriptions[i * 2])	{
      a.setAttribute("background", achievementImages[i * 2 + 1])
    } else {
      a.setAttribute("background", "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F47ca946b-e0d4-422d-a703-a54e525f58ad.image.png?v=1579974571096")
    }
		a.style.zIndex = 1e6-i;
	}
}

function getAchievementMultiplier() {
	var multiplier = new Decimal(1);
	game.achievementRowsCompleted = 0;
	for(var i = 0; i < achievements; i += 9) {
		var completed = true;
		for(var j = 0; j < 9; j++) {
			if(!game.achievements.includes(i + j)) completed = false;
		}
		if(completed) {
			game.achievementRowsCompleted++;
			multiplier = multiplier.multiply(2);
		}
	}
	return multiplier;
}
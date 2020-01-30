function notations(yes) {
  displayIf("notationsSelect", yes) 
}

function switchNotation(notation) {
  game.options.notation = notation
}

function saves(yes) {
  displayIf("notationsSelect", yes) 
}

function presets(yes) {
  displayIf("presetsSelect", yes) 
}

function updatePresets(num) {
   game.presets[num] = game.timestudy.study
}

function switchPresets(num) {
  if (!game.presets[num]) return;
  respecTimeStudies()
  for (i in game.presets[num]) {
    game.presets[num].buy()
  }
}
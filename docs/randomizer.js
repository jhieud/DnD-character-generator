// generates a random character
var nameRandom;
var raceRandom;
var alignRandom;
var classRandom;
var profBonusRandom = 2;
var speedRandom;
var acRandom;
var hpRandom;
var hitDiceRandom;

var abilitiesArray = [
  {name: "strength", score: 0, mod: 0, attr: "str"},
  {name: "dexterity", score: 0, mod: 0, attr: "dex"},
  {name: "constitution", score: 0, mod: 0, attr: "con"},
  {name: "intelligence", score: 0, mod: 0, attr: "int"},
  {name: "wisdom", score: 0, mod: 0, attr: "wis"},
  {name: "charisma", score: 0, mod: 0, attr: "cha"}
]

var savesArray = [
  {name: "strength", isProficient: false, mod:0, attr: "str"},
  {name: "dexterity", isProficient: false, mod:0, attr: "dex"},
  {name: "constitution", isProficient: false, mod:0, attr: "con"},
  {name: "intelligence", isProficient: false, mod:0, attr: "int"},
  {name: "wisdom", isProficient: false, mod:0, attr: "wis"},
  {name: "charisma", isProficient: false, mod:0, attr: "cha"},
]

var skillsArray = [ //alphabetical order
  {name: "acrobatics", isProficient: false, mod:0, attr: "dex"},
  {name: "animal handling", isProficient: false, mod:0, attr: "wis"},
  {name: "arcana", isProficient: false, mod:0, attr: "int"},
  {name: "athletics", isProficient: false, mod:0, attr: "str"},
  {name: "deception", isProficient: false, mod:0, attr: "cha"},
  {name: "history", isProficient: false, mod:0, attr: "int"},
  {name: "insight", isProficient: false, mod:0, attr: "wis"},
  {name: "intimidation", isProficient: false, mod:0, attr: "cha"},
  {name: "investigation", isProficient: false, mod:0, attr: "int"},
  {name: "medicine", isProficient: false, mod:0, attr: "wis"},
  {name: "nature", isProficient: false, mod:0, attr: "int"},
  {name: "perception", isProficient: false, mod:0, attr: "wis"},
  {name: "performance", isProficient: false, mod:0, attr: "cha"},
  {name: "persuasion", isProficient: false, mod:0, attr: "cha"},
  {name: "religion", isProficient: false, mod:0, attr: "int"},
  {name: "sleight of hand", isProficient: false, mod:0, attr: "dex"},
  {name: "stealth", isProficient: false, mod:0, attr: "dex"},
  {name: "survival", isProficient: false, mod:0, attr: "wis"}
]

var featsArray = []

var proficienciesArray = []

var equipmentArray = []

var spellInfo = {
  dc: 0,
  atk:0,
  cantripsNum:0,
  cantripsList: [],
  slots: 0,
  spellsNum: 0,
  spellList:[]}

// --- CHARACTER-MAKING FUNCTION CALLS ---
/*
1. make ability scores
2. get a race. adjust skills proficiencies as necessary
   - determine name
   - determine speed
   - determine feats
3. get a class. adjust skills proficiencies as necessary
   - determine feats
   - determine equipment
   - hit dice
4. calculate final modifiers
5. adjust AS mods, save mods, and skill mods
6. calculate AC and HP
7. pick an alignment
8. determine spells (if applicable)
*/

// ------------- CHARACTER OBJECT ---------------

// constructor for Character object
function Character(name, race, alignment, givenClass, pBonus, speed, armorClass, hitPoints,
  hitDice, abilityScores, saves, feats, proficiencies, equipment, spells) {
  this.name = name;
  this.race = race;
  this.alignment = alignment;
  this.class = givenClass;
  this.pBonus = pBonus;
  this.speed = speed;
  this.armorClass = armorClass;
  this.hitPoints = hitPoints;
  this.hitDice = hitDice;
  this.abilityScores = abilityScores;
  this.saves = saves;
  this.feats = feats;
  this.proficiencies = proficiencies;
  this.equipment = equipment;
  this.spells = spells;
}

// --------- CLEAR FUNCTION DEFINITIONS -----------
//resets initial values to zero or empty
function clear() {
  nameRandom = "";
  raceRandom ="";
  alignRandom ="";
  classRandom="";
  speedRandom="";
  acRandom="";
  hpRandom="";
  hitDiceRandom="";

  clearAbilityScores();
  clearSkills(savesArray);
  clearSkills(skillsArray);

  featsArray = []
  proficienciesArray = []
  equipmentArray = []

  clearSpells();
}

//resets the spell info
function clearSpells() {
  spellInfo.dc = 0;
  spellInfo.atk = 0;
  spellInfo.cantripsNum = 0;
  spellInfo.cantripsList = [];
  spellInfo.slots = 0;
  spellInfo.spellsNum = 0;
  spellInfo.spellList = [];
}

//resets the isProficient and mod values of the given array
function clearSkills(array) {
  for (item of array) {
    item.isProficient = false;
    item.mod = 0;
  }
}

//resets number values of abilitiesArray to 0
function clearAbilityScores() {
  for (item of abilitiesArray) {
    item.score = 0;
    item.mod = 0;
  }
}

// --------- RANDOMIZER FUNCTION DEFINITIONS ------------

// when called, generates a new random Character
function makeRandomCharacter() {
  generateAllAbilityScores(); // calculate AS and mods
  generateRandomRace(); // gets a random race and adjusts the character stats accordingly
  generateRandomClass(); // gets a random class and adjusts stats
  generateAllModifiers(); // uses the final ability scores to generate modifiers
  generateSaveSkillModifiers(); // calculates save and skill mods based on attribute and proficiency
  generateCombatStats(); // hp and ac
  alignRandom = randomItem(alignments).name;
  if (classRandom == "bard" || classRandom =="cleric" || classRandom=="druid" || classRandom == "sorceror" ||
      classRandom=="warlock" || classRandom=="wizard") {
        generateSpellInfo();
  } else {
        spellInfo.dc = 0;
        spellInfo.atk = 0;
        spellInfo.cantripsNum = 0;
        spellInfo.cantripsList = [];
        spellInfo.slots = 0;
        spellInfo.spellsNum = 0;
        spellInfo.spellList = [];
  }
}

// ------------ spell-handling functions ------------
function generateSpellInfo() {
  var charaClass = getClass();
  spellInfo.dc = getSpellDC(charaClass);
  spellInfo.atk = getSpellATK(charaClass);
  spellInfo.cantripsNum = charaClass.cantrips;
  spellInfo.cantripsList = randomSelect(charaClass.cantrips, charaClass.canList);
  spellInfo.slots = charaClass.slots;
  spellInfo.spellsNum = charaClass.spells;
  spellInfo.spellList = randomSelect(charaClass.spells, charaClass.lvl1List);
}

//calc spell atk
function getSpellATK(givenClass) {
  return profBonusRandom + getModByAttr(givenClass.ability);
}

//calc the spell dc
function getSpellDC(givenClass) {
  return 8 + profBonusRandom + getModByAttr(givenClass.ability);
}
//returns an int
// returns the modifier that correspons to the given string attr
function getModByAttr(string) {
  for (item of abilitiesArray) {
    if (item.attr == string) {
      return item.mod;
    }
  }
}

// returns the class object
function getClass() {
  var i;

  if (classRandom == "bard") {
    i = 1;
  } else if (classRandom == "cleric") {
    i = 2;
  } else if (classRandom == "druid") {
    i = 3;
  } else if (classRandom == "sorceror") {
    i = 9;
  } else if (classRandom == "warlock") {
    i = 10;
  } else if (classRandom == "wizard") {
    i = 11;
  }

  return classes[i];
}

// ---------- HP and AC ----------
// no return type
// modifies the HP and AC stats
function generateCombatStats() {
  hpRandom = hitDiceRandom + abilitiesArray[2].mod;
  acRandom = calculateArmorClass();
}

// returns an int
// calculate ac based on dex modifier and class. does not account for armor
function calculateArmorClass() {
  ac = 10 + abilitiesArray[1].mod;
  if (classRandom == "barbarian") {
    ac += abilitiesArray[2].mod;
  }
  else if (classRandom == "monk") {
    ac += abilitiesArray[4].mod;
  }
  return ac;
}

// ---------- character save/skill modifier function(s) -------------
// no return type
// calculates save and skill mods based on attribute and proficiency
function generateSaveSkillModifiers() {
  generateModsAbstract(savesArray);
  generateModsAbstract(skillsArray);
}

// no return type
// changes the mod value of each object in the given array based on attribute and proficiency
function generateModsAbstract(array) {
  for (item of array) {
    var num = 0;
    for (object of abilitiesArray) {
      if (item.attr == object.attr) {
        num += object.mod;

        if (item.isProficient) {
          num += profBonusRandom;
        }
      }
    }
    item.mod = num;
  }
}

// --------- Class-related functions ----------

// EFFECT: selects a random class and mutates the values of
// hitDiceRandom, savesArray, featsArray, proficienciesArray, skillsArray, equipmentArray
function generateRandomClass() {
  var c = randomItem(classes);
  classRandom = c.name;
  hitDiceRandom = c.hitDie;
  setSaves(c);
  appendAllValues(featsArray, c.feats);
  appendAllValues(proficienciesArray, compileClassProficiencies(c));
  setClassSkills(c);
  appendAllValues(equipmentArray, getClassEquipment(c));
}

// returns an array of strings
// gets the list of starting equipment
function getClassEquipment(givenClass) {
  var all = givenClass.equipment;
  var arr;
  var result = [];

  for (var i = 0; i<all.length; i++) {
    arr = all[i];
    result.push(randomItem(arr));
  }
  return result;
}

// no return type
// adjusts the isProficient value of each object in skillsArray based on given class
function setClassSkills(givenClass) {
  var skillList = getClassSkillList(givenClass);

  for (item of skillsArray) {
    if (skillList.includes(item.name)) {
      item.isProficient = true;
    }
  }
}

// returns an array
// gets a list of skills based on the given class
function getClassSkillList(givenClass) {
  var chooseFrom = givenClass.skills;

  if (givenClass.name == "rogue") {
    return randomSelect(4, chooseFrom);
  }
  else if ((givenClass.name == "bard") || (givenClass.name == "ranger")) {
    return randomSelect(3, chooseFrom);
  }
  else {
    return randomSelect(2, chooseFrom);
  }
}

//returns an array of all class-related non-skill proficiencies for the given class
function compileClassProficiencies(givenClass) {
  var armor = givenClass.armor;
  var weapons = givenClass.weapons;
  var tools;
  if (givenClass.name == "bard") {
    tools = randomSelect(3, givenClass.tools);
  }
  else if (givenClass.name == "monk") {
    tools = randomItem(givenClass.tools);
  }
  else {
    tools = givenClass.tools;
  }

  return armor.concat(weapons).concat(tools);
}

// no return type
// EFFECT: adjusts the saving throw proficiencies based on the given class
function setSaves(givenClass) {
  var saveList = givenClass.saves;

  for (item of savesArray) {
    if (saveList.includes(item.attr)) {
      item.isProficient = true;
    }
  }
}


// --------- Race-related functions -----------

// no return type
// EFFECT: selects a random race and mutates the values of raceRandom, nameRandom, speedRandom, abilitiesArray, featsArray, proficienciesArray, and skillsArray
function generateRandomRace() {
  var r = randomItem(races);
  raceRandom = r.name;
  nameRandom = fullName(r.names);
  speedRandom = r.baseSpeed;
  raceAbilityAdjustments(r.abMods);
  appendAllValues(featsArray, r.feats);
  appendAllValues(proficienciesArray,compileRacialProficiencies(r));
  setRacialSkills(r);
}

//no return type
//for every object in the skillsArray variable, sets isProficient to True if it's in the array of skills for the given Race.
// if skillList is empty, nothing happens.
function setRacialSkills(race) {
  var skillList = getRacialSkillList(race);

  if (skillList.length > 0) {
    for (item of skillsArray) {
      if (skillList.includes(item.name)) {
        item.isProficient = true;
      }
    }
  }
}

//returns an array of strings (skill names)
//gets the skillList of the given race, if applicable
function getRacialSkillList(race) {
  var skillList = [];

  if (race.name == "half-elf") {
    var objectList = randomSelect(2, skills);

    for (item of objectList) {
      str = item.name;
      skillList.push(str);
    }
  }
  else {
    skillList = race.skills;
  }
  return skillList;
}

// returns an array
// adds non-skill racial proficiencies to an array and returns that array
function compileRacialProficiencies(race) {
  var result = [];
  appendAllValues(result, race.lang);
  appendAllValues(result, race.proficiencies);
  var temp;
  if (race.name == "dwarf") {
    temp = randomItem(race.tools);
    result.push(temp);
  }
  else if (race.name == "half-elf") {
    temp = randomItem(languages);
    while (temp == "Elvish") {
      temp = randomItem(languages);
    }
    result.push(temp);
  }
  else if (race.name == "human") {
    temp = randomItem(languages);
    result.push(temp);
  }
  return result;
}

//no return type
// EFFECT: adjusts the values of abilitiesArray one by one
function raceAbilityAdjustments(modifiers) {
  abilitiesArray[0].score += modifiers.str;
  abilitiesArray[1].score += modifiers.dex;
  abilitiesArray[2].score += modifiers.con;
  abilitiesArray[3].score += modifiers.int;
  abilitiesArray[4].score += modifiers.wis;
  abilitiesArray[5].score += modifiers.cha;
}
// array -> String
// returns a random full name from the given object
function fullName(r) {
  var first = randomItem(r.first);
  var last = randomItem(r.last);
  return first + " " + last;
}

// ------ Ability score/mod functions ---------
//no return type
//EFFECT: mutates the modifier of every object in the abilitiesArray variable
function generateAllModifiers() {
  for (item of abilitiesArray) {
    item.mod = calculateAbilityModifier(item.score);
  }
}

// int -> int
// calculates a modifier based on the given AS
function calculateAbilityModifier(aScore) {
  return Math.floor((aScore - 10)/2);
}

//no return type
//EFFECT: mutates the ability score of every object in the abilitiesArray variable
function generateAllAbilityScores() {
  for (item of abilitiesArray) {;
    num = oneAbilityScore();
    item.score = num;
  }
}

// returns an int
//generates a single Ability Score by rolling four dice and adding the highest three together.
function oneAbilityScore() {
  var roll1 = rollDie(1,6);
  var roll2 = rollDie(1,6);
  var roll3 = rollDie(1,6);
  var roll4 = rollDie(1,6);

  var lowest = Math.min(roll1, roll2, roll3, roll4);

  return roll1 + roll2 + roll3 + roll4 - lowest;
}

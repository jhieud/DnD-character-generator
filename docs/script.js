// This sheet handles user input

//when the randomize button is clicked, makes a new random character and fills the sheet with their info
var randomizerButton = document.getElementById("randomize");
randomizerButton.addEventListener("click", fillRandomSheet);

//when the clear button is clicked, clears the page
var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearSheet);

//when the save button is clicked, saves the information as a .txt file
var saveButton = document.getElementById("save");
saveButton.addEventListener("click", saveFile);

//citation: https://www.w3schools.com/w3css/w3css_tabulators.asp
//switches between embedded pages
function switchTabs(tab) {
  var i;
  var x = document.getElementsByClassName("folder");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tab).style.display = "block";
}

//-------- SAVE DATA FUNCTION ------------
//code taken from https:
// //www.encodedna.com/javascript/how-to-save-form-data-in-a-text-file-using-javascript.htm
function saveFile() {
  //get the data from each element
  const indRace = document.getElementById("choose-race");
  const indAlign = document.getElementById("choose-alignment");
  const indClass = document.getElementById("choose-class");

  const saveName = document.getElementById("name-text");
  const saveRace = indRace.options[indRace.selectedIndex];
  const saveAlign = indAlign.options[indAlign.selectedIndex];
  const saveClass = indClass.options[indClass.selectedIndex];

  //combat
  const saveAC = document.getElementById("ac");
  const saveSpeed = document.getElementById("speed");
  const saveHP = document.getElementById("hp");
  const saveHD = document.getElementById("hd");

  //feats
  const saveFeats = document.getElementById("feats-input");

  //proficiencies
  const savePBonus = document.getElementById("prof-bonus");

  //spells
  const saveSpells = document.getElementById("spells");

  //inventory
  const saveOtherProf = document.getElementById("proficiency-text");
  const saveEquipment = document.getElementById("equipment-text");

  //stores all data
  let fileData = "\r BASIC INFORMATION \r\n " +
                "-------------------------------------- \r\n\n " +
                "Name: " + saveName.value + " \r\n " +
                "Race: " + saveRace.text + " \r\n " +
                "Alignment: " + saveAlign.text + " \r\n " +
                "Class: " + saveClass.text + " \r\n\n " +

                "STATS \r\n " +
                "-------------------------------------- \r\n\n " +
                "-- Ability Scores -- \r\n " +
                getAbScoreValues() + "\n " +
                "-- Combat Info -- \r\n " +
                "Armor Class:" + saveAC.value + " \r\n " +
                "Speed:" + saveSpeed.value + " \r\n " +
                "Hit Points:" + saveHP.value + " \r\n " +
                "Hit Dice:" + saveHD.value + " \r\n\n " +
                "-- Feats and Traits -- \r\n" +
                saveFeats.value + " \r\n " +
                "-- Proficiency Bonus : " + savePBonus.value + " -- \r\n\n " +
                "-- Saving Throws-- \r\n " +
                getSaveThrowValues() +
                "\n -- Skills -- \r\n " +
                getSkills() +
                "\n INVENTORY \r\n " +
                "-------------------------------------- \r\n\n " +
                "-- Other Proficiencies & Languages -- \r\n " +
                saveOtherProf.value + " \r\n\n " +
                "-- Equipment -- \r\n " +
                saveEquipment.value + " \r\n\n " +
                "\n SPELLS \r\n " +
                "-------------------------------------- \r\n\n " +
                getMagic("cantrip") + "\n " + getMagic("spell");

  //convert text to BLOB
  const textToBLOB = new Blob([fileData], { type: "text/plain"});
  const sFileName = "CharSheet.txt";

  let newLink = document.createElement("a");
  newLink.download = sFileName;

  if (window.webkitURL != null) {
    newLink.href = window.webkitURL.createObjectURL(textToBLOB);
  } else {
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
  }

  newLink.click();
}


//---------SHEET-BUILDING FUNCTION CALLS------------
//initialize race, alignment, and class dropdowns
makeDropdown("choose-race", races);
makeDropdown("choose-alignment", alignments);
makeDropdown("choose-class", classes);

//---------- HELPER FUNCTION DEFINITIONS -----------
//gets the cantrips or spells depending on input and returns them as a string. god im lazy
function getMagic(cantripOrSpell) {
  var input = cantripOrSpell;
  var magicListLength;
  var magicNum;
  var magicLabel;
  var magicNameList;
  var magicRangeList;
  var slots = "";

  var dataAsStrings;

  if (input == "cantrip") {
    magicListLength = 4;
    magicLabel = "Cantrips";
    magicNum = document.getElementById("cans-known").value;

    magicNameList = document.getElementsByClassName("can-name");
    magicRangeList = document.getElementsByClassName("can-range");

  } else if (input == "spell") {
    magicListLength = 5;
    magicLabel = "Level 1 Spells"
    magicNum = document.getElementById("spells-known").value;
    slots = "Slots: " + document.getElementById("spell-slots").value + " \r\n ";

    magicNameList = document.getElementsByClassName("spell-name");
    magicRangeList = document.getElementsByClassName("spell-range");

  }

  var dataAsStrings = " -- " + magicLabel + ": " + magicNum + " -- \r\n " + slots;

  for (var i = 0; i<magicListLength; i++) {
    var name = magicNameList[i].value;
    var range = magicRangeList[i].value;

    dataAsStrings = dataAsStrings + "Name: " + name + "|| Range: " + range + " \r\n ";
  }
  return dataAsStrings;
}

//ges the skills and returns them as a string
function getSkills() {
  var skillLabelList = document.getElementsByClassName("skill-label");
  var skillModList = document.getElementsByClassName("skill-mod-input");
  var skillProfList = document.getElementsByClassName("skill-checks");
  var skillAttrList = document.getElementsByClassName("skill-attr");

  var dataAsStrings = "";

  for (var i = 0; i<skillsArray.length; i++) {
    var labElement = skillLabelList[i];
    var lab = labElement.innerHTML;

    var modElement = skillModList[i];
    var mod = modElement.value;

    var profElement = skillProfList[i];
    var prof = profElement.checked;

    var attrElement = skillAttrList[i];
    var attr = attrElement.innerHTML;

    dataAsStrings = dataAsStrings + lab + ": \r\n " + "     Modifier: " + mod + " || Proficiency: " +
                    prof + " || Attribute: " + attr + " \r\n\n ";
  }
  return dataAsStrings;
}

// gets the saving throw information and returns it as a string
function getSaveThrowValues() {
  var saveLabelList = document.getElementsByClassName("abLabel");
  var saveModList = document.getElementsByClassName("save-mod-input");
  var saveProfList = document.getElementsByClassName("save-checks");

  var dataAsStrings = "";

  for (var i = 0; i<abilitiesArray.length; i++) {
    var labEl = saveLabelList[i];
    var lab = labEl.innerHTML;

    var modEl = saveModList[i];
    var mod = modEl.value;

    var profEl = saveProfList[i];
    var prof = profEl.checked;

    dataAsStrings = dataAsStrings + lab + ": \r\n " + "     Modifier: " + mod +
                    " || Proficiency: " + prof + " \r\n\n ";

  }
  return dataAsStrings;
}
// returns the ability scores and modifiers as string
function getAbScoreValues() {
  var abLabelList  = document.getElementsByClassName("abLabel");
  var abScoreList = document.getElementsByClassName("abScoreInput");
  var abModList = document.getElementsByClassName("asModInput");

  var labelElement;
  var lab;
  var scoreElement;
  var score;
  var modElement;
  var mod;

  var dataAsStrings = "";

  for (var i = 0; i<abilitiesArray.length; i++) {
    labelElement = abLabelList[i];
    lab = labelElement.textContent;

    scoreElement = abScoreList[i];
    score = scoreElement.value;

    modElement = abModList[i];
    mod = modElement.value;

    dataAsStrings = dataAsStrings + lab + ": " + score + ", Modifier: " + mod + " \r\n ";
  }
  return dataAsStrings;
}

//resets all the character values in the page
function clearSheet() {
  clearByTags("input");
  clearByTags("textarea");
  initializeCheckboxes();
  document.getElementById("choose-race").selectedIndex = 0;
  document.getElementById("choose-alignment").selectedIndex = 0;
  document.getElementById("choose-class").selectedIndex = 0;
  clear();
}

//fills the page with the values of a randomly generated character. also prints that character to the console
function fillRandomSheet() {
  clearSheet();
  makeRandomCharacter();
  var char = new Character(nameRandom, raceRandom, alignRandom, classRandom, 2, speedRandom, acRandom, hpRandom,
    "1d" + hitDiceRandom, abilitiesArray, savesArray, featsArray, proficienciesArray, equipmentArray, spellInfo);
  console.log(char);

  // top half: name, race, alignment, class

  document.getElementById("name-text").value = char.name;
  document.getElementById("choose-race").selectedIndex = getIndex("choose-race", char.race);
  document.getElementById("choose-alignment").selectedIndex = getIndex("choose-alignment", char.alignment);
  document.getElementById("choose-class").selectedIndex = getIndex("choose-class", char.class);

  //fills in stats
  document.getElementById("prof-bonus").value = char.pBonus;

  fillAbilityScores();
  fillInput("asModInput", abilitiesArray);
  fillInput("save-mod-input", savesArray);
  fillCheckboxes("save-checks", savesArray);
  fillInput("skill-mod-input", skillsArray);
  fillCheckboxes("skill-checks", skillsArray);
  //fills in battle info
  document.getElementById("ac").value = char.armorClass;
  document.getElementById("speed").value = char.speed;
  document.getElementById("hp").value = char.hitPoints;
  document.getElementById("hd").value = char.hitDice;
  //fills in feats & traits box
  fillTextArea("feats-input", char.feats);
  //clears spell info
  clearInputsByClass("can-name");
  clearInputsByClass("can-range");
  clearInputsByClass("spell-name");
  clearInputsByClass("spell-range");
  //fill names and ranges
  fillSpellNames("can-name", char.spells.cantripsList);
  fillSpellRanges("can-range", char.spells.cantripsList);
  fillSpellNames("spell-name", char.spells.spellList);
  fillSpellRanges("spell-range", char.spells.spellList);

  document.getElementById("cans-known").value = char.spells.cantripsNum;
  document.getElementById("spells-known").value = char.spells.spellsNum;
  document.getElementById("spell-slots").value = char.spells.slots;

  fillTextArea("equipment-text", char.equipment);
  fillTextArea("proficiency-text", char.proficiencies);
}

//clears the values of all elements with the given tags
function clearByTags(tagName) {
  var elList = document.getElementsByTagName(tagName);
  var item;
  for (var i=0; i<elList.length; i++) {
    item = elList[i];
    item.value = '';
  }
}

//clears the values all elements with the given class
function clearInputsByClass(cName) {
  var elList = document.getElementsByClassName(cName);
  var item;

  for (var i=0; i<elList.length; i++) {
    item = elList[i];
    item.value = '';
  }
}

//fills the input boxes with the given class with info from the given array
function fillSpellRanges(cName, array) {
  var elList = document.getElementsByClassName(cName);

  var innerArray = [];
  for (var i=0; i<array.length; i++) {
    var item = array[i];
    innerArray.push(item.range);
  }

  for (var j=0; j<innerArray.length; j++) {
    var item = innerArray[j];
    var el = elList[j];

    el.value = item;
  }
}

//fills input boxes with given class using spells names from the given array
function fillSpellNames(cName, array) {
  var elList = document.getElementsByClassName(cName);

  var innerArray = [];
  for (var i=0; i<array.length; i++) {
    var item = array[i];
    innerArray.push(item.name);
  }

  for (var j=0; j<innerArray.length; j++) {
    var item = innerArray[j];
    var el = elList[j];

    el.value = item;
  }
}

//fills the text area with the given id with info from the given array
//puts each entry on a new line
function fillTextArea(id, array) {
  var box = document.getElementById(id);
  var input = "";

  for (var i = 0; i<array.length; i++) {
    var item = array[i];
    input = input + item + "\n";
  }
  box.value = input;
}

//clears all the checkboxes
function initializeCheckboxes() {
  var inputs = document.getElementsByTagName("input");

  for (var i=0; i<inputs.length; i++) {
    if (inputs[i].type == "checkbox") {
      inputs[i].checked = false;
    }
  }
}

//checks off skill boxes if the character is proficient
function fillCheckboxes(cName, array) {
  var asList = document.getElementsByClassName(cName);

  for (var i = 0; i<array.length; i++) {
    var isProf = array[i].isProficient;
    var el = asList[i];

    if (isProf) {
      el.checked = true;
    }
    else {
      el.checked = false;
    }
  }
}

//fills the input box with the given class with mod info from the given array
function fillInput(cName, array) {
  var asList = document.getElementsByClassName(cName);

  for (var i = 0; i<array.length; i++) {
    var score = array[i].mod;
    var el = asList[i];
    el.value = score;
  }
}

//fills the ability score input boxes with the character's base ability scores
function fillAbilityScores() {
  var abScoreList = document.getElementsByClassName("abScoreInput");

  for (var i = 0; i<abilitiesArray.length; i++) {
    var score = abilitiesArray[i].score;
    var el = abScoreList[i];
    el.value = score;
  }
}

//returns the index of the given input in the dropdown menu with the given id; returns -1 if not found
function getIndex(id, name) {
  var arr = document.getElementById(id);
  var item;
  for (var i=0; i<arr.length; i++) {
    item = arr[i];
    if (item.innerHTML == name) {
      return i;
    }
  }
  return -1;
}

// sets the values in a given array as the options in the dropdown menu with the given id
function makeDropdown(id, array) {
  var selection = document.getElementById(id);
  for(var i = 0; i < array.length; i++) {
    var item = array[i];
    var opt = document.createElement("option");
    opt.class = id;
    opt.innerHTML = item.name;
    opt.value = i + 1;
    selection.append(opt);
  }
}

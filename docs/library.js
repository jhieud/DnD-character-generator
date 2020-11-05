//objects and functions on this document are static and used purely for reference.
//also contains utility methods like the die roller.

// alignments
var alignments = [{name:"lawful good"},{name:"neutral good"},{name:"chaotic good"},
                  {name:"lawful neutral"},{name:"true neutral"},{name:"chaotic neutral"},
                  {name:"lawful evil"},{name:"neutral evil"},{name:"chaotic evil"}]

//equipment
var equipment = {
  weapons: {
    simpleM: ["club", "dagger", "greatclub", "handaxe", "javelin", "light hammer", "mace", "quarterstaff", "sickle", "spear"],
    simpleR: ["light crossbow", "dart", "shortbow", "sling"],
    martialM: ["battleaxe", "flail", "glaive", "greataxe", "greatsword", "halberd", "lance", "longsword", "maul", "morningstar", "pike", "rapier",
                "scimitar", "shortsword", "trident", "war pick", "warhammer", "whip"],
    martialR: ["blowgun", "hand crossbow", "heavy crossbow", "longbow", "net"]
  },

  tools: {
    artisan: ["alchemist's supplies", "brewer's supplies", "calligrapher's supplies", "carpenter's tools", "cartographer's tools", "cobbler's tools",
              "cook's utensils", "glassblower's tools", "jeweler's tools", "leatherworker's tools", "mason's tools",
              "painter's supplies", "potter's tools", "smith's tools", "tinker's tools", "weaver's tools", "woodcarver's tools"],
    instrument: ["bagpipes", "drum", "dulcimer", "flute", "lute", "lyre", "horn", "panflute", "shawm", "viol"]
  }
}

var allSimpleWeapons = equipment.weapons.simpleM.concat(equipment.weapons.simpleR);
var allMartialWeapons = equipment.weapons.martialM.concat(equipment.weapons.martialR);

//skills
var skills = [
  //saving throws
  {name: "strength", attr: "str"},
  {name: "dexterity", attr: "dex"},
  {name: "constitution", attr: "con"},
  {name: "intelligence", attr: "int"},
  {name: "wisdom", attr: "wis"},
  {name: "charisma", attr: "cha"},
  //skills
  //str skills
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

//languages
var languages = ["Celestial", "Dwarvish", "Draconic", "Elvish", "Gnomish", "Infernal"]

//names
var names = {
  dragonborn: {first: ["Arjhan", "Balasar", "Bharash", "Donaar", "Ghesh", "Heskan", "Kriv", "Medrash", "Mehen", "Nadarr", "Pandjed", "Patrin", "Rhogar",
                      "Shamash", "Shedinn", "Tarhun", "Torinn", "Akra", "Biri", "Daar", "Farideh", "Harann", "Havilar", "Jheri", "Kava", "Korinn", "Mishann",
                      "Nala", "Perra", "Raiann", "Sora","Surina", "Thava", "Uadjit"],
              last: ["Clethtinthiallor", "Daardendrian", "Delmirev", "Drachedandion", "Fenkenkabradon", "Kepeshkmolik", "Kerrhylon", "Kimbatuul",
                      "Linxakasendalor", "Myastan", "Nemmonis", "Norixius", "Ophinshtalajiir", "Prexijandilin", "Shestendeliath", "Turnuroth",
                      "Verthisathurgiesh", "Yarjerit"]},
  dwarf: {first: ["Adrik", "Alberich", "Baern", "Barendd", "Brottor", "Bruenor", "Dain", "Darrak", "Delg", "Eberk", "Einkil", "Fargrim", "Flint", "Gardain",
                  "Harbek", "Kildrak", "Morgran", "Orsik", "Oskar", "Rangrim", "Rurik", "Taklinn", "Thoradin", "Thorin", "Tordek", "Traubon", "Travok", "Ulfgar",
                  "Veit", "Vondal", "Amber", "Artin", "Audhild", "Bardryn", "Dagnal", "Diesa", "Eldeth", "Falkrunn", "Finellen", "Gunnloda", "Gurdis", "Helya",
                  "Hlin", "Kathra", "Kristryd", "Ilde", "Liftrasa", "Mardred", "Riswynn", "Sannl", "Torbera", "Torgga", "Vistra"],
          last: ["Balderk", "Battlehammer", "Brawnanvil", "Dankil", "Fireforge", "Frostbeard", "Gorunn", "Holderhek", "Ironfist", "Loderr", "Lutgehr", "Rumnaheim",
                  "Strakeln", "Torunn", "Ungart"]
 },
 elf: {first: ["Adran", "Aelar", "Aramil", "Arannis", "Aust", "Beiro", "Berrian", "Carric", "Enialis", "Erdan", "Erevan", "Galinndan", "Hadarai", "Heian",
              "Himo", "Immeral", "Ivellios", "Laucian", "Mindartis", "Paelias", "Peren", "Quarion", "Riardon", "Rolen", "Soveliss", "Thamior", "Tharivol", "Theren",
              "Varis", "Adrie", "Althaea", "Anastrianna", "Andraste", "Antinua", "Bethrynna", "Birel", "Caelynn", "Drusilia", "Enna", "Felosial", "Ielenia",
              "Jelenneth", "Keyleth", "Leshanna", "Lia", "Meriele", "Mialee", "Naivara", "Quelenna", "Quillathe", "Sariel", "Shanairra", "Shava", "Silaqui",
              "Theirastra", "Thia", "Vadania", "Valanthe", "Xanaphia", "Xania"],
      last: ["Amakiir", "Amastacia", "Galanodel", "Holimion", "Ilphelkiir", "Liadon", "Meliamne", "Nailo", "Siannodel", "Xiloscient"]
 },
 gnome: {first: ["Alston", "Alvyn", "Boddynock", "Brocc", "Burgell", "Dimble", "Eldon", "Erky", "Fonkin", "Frug", "Gerbo", "Gimble", "Glim", "Jebeddo", "Kellen",
                 "Namfoodle", "Orryn", "Roondar", "Seebo", "Sindri", "Warryn", "Wrenn", "Finch", "Zook", "Bimpnottin", "Breena", "Caramip", "Carlin",
                 "Donella", "Duvamil", "Ella", "Ellyjobell", "Ellywick", "Lilli", "Loopmottin", "Lorilla", "Mardnab", "Nissa", "Nyx", "Oda", "Orla", "Roywyn",
                 "Shamil", "Tana", "Waywocket", "Zanna"],
         last: ["Beren", "Daergel", "Folkor", "Garrick", "Nackle", "Murnig", "Ningel", "Raulnor", "Scheppen", "Timbers", "Turen"]
 },
 halfElf: {first: ["Aesir", "Bardeid", "Haseid", "Khemed", "Mehmen", "Sudeiman", "Zasheir", "Atala", "Ceidil", "Hama", "Jasmal", "Meilil", "Seipora", "Yasheira",
                "Zasheida", "Darvin", "Dorn", "Evendur", "Gorstag", "Grim", "Helm", "Malark", "Morn", "Randal", "Stedd", "Arveene", "Esvele", "Jhessail", "Kerri",
                "Lureene", "Miri", "Rowan", "Shandri", "Tessele", "Bor", "Fodel", "Glar", "Grigor", "Igan", "Ivor", "Kosef", "Mival", "Orel", "Pavel", "Sergor",
                "Alethra", "Kara", "Katernin", "Mara", "Natali", "Olma", "Tana", "Zora", "Ander", "Blath", "Bran", "Frath", "Geth", "Lander", "Luth", "Malcer",
                "Stor", "Taman", "Urth", "Amafrey", "Betha", "Cefrey", "Kethra", "Mara", "Olga", "Silifry", "Westra", "Aoth", "Bereris", "Ehput-Ki", "Kethoth",
                "Mumed", "Ramas", "So-Kehur", "Thazar-De", "Urhur", "Arizima", "Chathi", "Nephis", "Nulara", "Murithi", "Sefris", "Thola", "Umara", "Zolis",
                "Borivik", "Faurgar", "Jandar", "Kanithar", "Madislak", "Ralmevik", "Shaumar", "Vladisak", "Fyevarra", "Hulmarra", "Immith", "Imzel", "Navarra",
                "Shevarra", "Tammith", "Yuldra", "Cheng", "Ying", "An", "Chen", "Chi", "Fai", "Jun", "Lian", "Long", "Meng", "On", "Shan", "Shui", "Wen", "Yao",
                "Chiyo", "Jin", "Min", "Kou", "Tao", "Lien", "Hoa", "Sen", "Hiro", "Kei", "Li", "Vi", "Yang", "Quan", "Yuan", "Dun", "Tri", "Mai", "Sau",
                "Shin", "Yun", "Sreya", "Kumi", "Val", "Shu", "Linh", "Minh", "Anton", "Diero", "Marcon", "Pieron", "Rimardo", "Romero", "Salazar", "Umbero",
                "Balama", "Vonda", "Fuu", "Adran", "Aelar", "Aramil", "Arannis", "Aust", "Beiro", "Berrian", "Carric", "Enialis", "Erdan", "Erevan", "Galinndan",
                "Hadarai", "Heian", "Himo", "Immeral", "Ivellios", "Laucian", "Mindartis", "Paelias", "Peren", "Quarion", "Riardon", "Rolen", "Soveliss", "Thamior",
                "Tharivol", "Theren", "Varis", "Adrie", "Althaea", "Anastrianna", "Andraste", "Antinua", "Bethrynna", "Birel", "Caelynn", "Drusilia", "Enna",
                "Felosial", "Ielenia", "Jelenneth", "Keyleth", "Leshanna", "Lia", "Meriele", "Mialee", "Naivara", "Quelenna", "Quillathe", "Sariel", "Shanairra",
                "Shava", "Silaqui", "Theirastra", "Thia", "Vadania", "Valanthe", "Xanaphia", "Xania"],
        last: ["Basha", "Dumein", "Jassan", "Khalid", "Mostana", "Pashar", "Rein", "Amblecrown", "Buckmann", "Dundragon", "Evenwood", "Greycastle", "Tallstag",
              "Bersk", "Chernin", "Dotsk", "Kulenov", "Marsk", "Nemetsk", "Shemov", "Starag", "Brightwood", "Helder", "Hornraven", "Lackman", "Stormwind",
              "Windrivver", "Ankhalab", "Anskuld", "Fezim", "Hahpet", "Nathandem", "Sepret", "Uuthrakt", "Chergoba", "Dyernina", "Iltazyara", "Murnyethara",
              "Stayanoga", "Ulmokina", "Chien", "Qiu", "Lan", "Huang", "Hoang", "Kao", "Kung", "Lao", "Jiang", "Trinh", "Mei", "Pin", "Shin", "Sum", "Tan", "Wan",
              "Wang", "Wei", "Wen", "Jin", "Chen", "Shen", "Tran", "Dao", "Vu", "Vo", "Luu", "Liu", "Qi", "Yue", "Shang", "Qing", "Luo", "Zheng", "Agosto",
              "Astorio", "Calabra", "Domine", "Falone", "Marivaldi", "Pisacar", "Ramondo", "Yu", "Amakiir", "Amastacia", "Galanodel", "Holimion", "Ilphelkiir",
              "Liadon", "Meliamne", "Nailo", "Siannodel", "Xiloscient"]
 },
 halfOrc: {first: ["Dench", "Feng", "Gell", "Henk", "Holg", "Imsh", "Keth", "Krusk", "Mhurren", "Ront", "Shump", "Thokk", "Baggi", "Emen", "Engong", "Kansif",
                   "Myev", "Neega", "Ovak", "Ownka", "Shautha", "Sutha", "Vola", "Volen", "Yevelda",
                   "Aesir", "Bardeid", "Haseid", "Khemed", "Mehmen", "Sudeiman", "Zasheir", "Atala", "Ceidil", "Hama", "Jasmal", "Meilil", "Seipora", "Yasheira",
                   "Zasheida", "Darvin", "Dorn", "Evendur", "Gorstag", "Grim", "Helm", "Malark", "Morn", "Randal", "Stedd", "Arveene", "Esvele", "Jhessail", "Kerri",
                  "Lureene", "Miri", "Rowan", "Shandri", "Tessele", "Bor", "Fodel", "Glar", "Grigor", "Igan", "Ivor", "Kosef", "Mival", "Orel", "Pavel", "Sergor",
                  "Alethra", "Kara", "Katernin", "Mara", "Natali", "Olma", "Tana", "Zora", "Ander", "Blath", "Bran", "Frath", "Geth", "Lander", "Luth", "Malcer",
                  "Stor", "Taman", "Urth", "Amafrey", "Betha", "Cefrey", "Kethra", "Mara", "Olga", "Silifry", "Westra", "Aoth", "Bereris", "Ehput-Ki", "Kethoth",
                  "Mumed", "Ramas", "So-Kehur", "Thazar-De", "Urhur", "Arizima", "Chathi", "Nephis", "Nulara", "Murithi", "Sefris", "Thola", "Umara", "Zolis",
                  "Borivik", "Faurgar", "Jandar", "Kanithar", "Madislak", "Ralmevik", "Shaumar", "Vladisak", "Fyevarra", "Hulmarra", "Immith", "Imzel", "Navarra",
                  "Shevarra", "Tammith", "Yuldra", "Cheng", "Ying", "An", "Chen", "Chi", "Fai", "Jun", "Lian", "Long", "Meng", "On", "Shan", "Shui", "Wen", "Yao",
                  "Chiyo", "Jin", "Min", "Kou", "Tao", "Lien", "Hoa", "Sen", "Hiro", "Kei", "Li", "Vi", "Yang", "Quan", "Yuan", "Dun", "Tri", "Mai", "Sau",
                  "Shin", "Yun", "Sreya", "Kumi", "Val", "Shu", "Linh", "Minh", "Anton", "Diero", "Marcon", "Pieron", "Rimardo", "Romero", "Salazar", "Umbero",
                  "Balama", "Vonda", "Fuu"],
           last: ["Basha", "Dumein", "Jassan", "Khalid", "Mostana", "Pashar", "Rein", "Amblecrown", "Buckmann", "Dundragon", "Evenwood", "Greycastle", "Tallstag",
                 "Bersk", "Chernin", "Dotsk", "Kulenov", "Marsk", "Nemetsk", "Shemov", "Starag", "Brightwood", "Helder", "Hornraven", "Lackman", "Stormwind",
                 "Windrivver", "Ankhalab", "Anskuld", "Fezim", "Hahpet", "Nathandem", "Sepret", "Uuthrakt", "Chergoba", "Dyernina", "Iltazyara", "Murnyethara",
                 "Stayanoga", "Ulmokina", "Chien", "Qiu", "Lan", "Huang", "Hoang", "Kao", "Kung", "Lao", "Jiang", "Trinh", "Mei", "Pin", "Shin", "Sum", "Tan", "Wan",
                 "Wang", "Wei", "Wen", "Jin", "Chen", "Shen", "Tran", "Dao", "Vu", "Vo", "Luu", "Liu", "Qi", "Yue", "Shang", "Qing", "Luo", "Zheng", "Agosto",
                 "Astorio", "Calabra", "Domine", "Falone", "Marivaldi", "Pisacar", "Ramondo", "Yu"]
 },
 halfling: {first: ["Alton", "Ander", "Cade", "Corrin", "Eldon", "Errich", "Finnan", "Garret", "Lindal", "Lyle", "Merric", "Milo", "Osborn", "Perrin", "Reed",
                    "Roscoe", "Wellby", "Andry", "Bree", "Callie", "Cora", "Euphemia", "Jillian", "Kithri", "Lavinia", "Lidda", "Merla", "Nedda", "Paela",
                    "Portia", "Seraphina", "Shaena", "Trym", "Vani", "Verna"],
            last: ["Brushgather", "Goodbarrel", "Greenbottle", "High-hill", "Hilltopple", "Leagallow", "Tealeaf", "Thorngage", "Tosscobble", "Underbough",
                  "Baggins", "Gamgee", "Brandybuck", "Took"]
 },
 human: {first: ["Aesir", "Bardeid", "Haseid", "Khemed", "Mehmen", "Sudeiman", "Zasheir", "Atala", "Ceidil", "Hama", "Jasmal", "Meilil", "Seipora", "Yasheira",
                "Zasheida", "Darvin", "Dorn", "Evendur", "Gorstag", "Grim", "Helm", "Malark", "Morn", "Randal", "Stedd", "Arveene", "Esvele", "Jhessail", "Kerri",
                "Lureene", "Miri", "Rowan", "Shandri", "Tessele", "Bor", "Fodel", "Glar", "Grigor", "Igan", "Ivor", "Kosef", "Mival", "Orel", "Pavel", "Sergor",
                "Alethra", "Kara", "Katernin", "Mara", "Natali", "Olma", "Tana", "Zora", "Ander", "Blath", "Bran", "Frath", "Geth", "Lander", "Luth", "Malcer",
                "Stor", "Taman", "Urth", "Amafrey", "Betha", "Cefrey", "Kethra", "Mara", "Olga", "Silifry", "Westra", "Aoth", "Bereris", "Ehput-Ki", "Kethoth",
                "Mumed", "Ramas", "So-Kehur", "Thazar-De", "Urhur", "Arizima", "Chathi", "Nephis", "Nulara", "Murithi", "Sefris", "Thola", "Umara", "Zolis",
                "Borivik", "Faurgar", "Jandar", "Kanithar", "Madislak", "Ralmevik", "Shaumar", "Vladisak", "Fyevarra", "Hulmarra", "Immith", "Imzel", "Navarra",
                "Shevarra", "Tammith", "Yuldra", "Cheng", "Ying", "An", "Chen", "Chi", "Fai", "Jun", "Lian", "Long", "Meng", "On", "Shan", "Shui", "Wen", "Yao",
                "Chiyo", "Jin", "Min", "Kou", "Tao", "Lien", "Hoa", "Sen", "Hiro", "Kei", "Li", "Vi", "Yang", "Quan", "Yuan", "Dun", "Tri", "Mai", "Sau",
                "Shin", "Yun", "Sreya", "Kumi", "Val", "Shu", "Linh", "Minh", "Anton", "Diero", "Marcon", "Pieron", "Rimardo", "Romero", "Salazar", "Umbero",
                "Balama", "Vonda", "Fuu"],
        last: ["Basha", "Dumein", "Jassan", "Khalid", "Mostana", "Pashar", "Rein", "Amblecrown", "Buckmann", "Dundragon", "Evenwood", "Greycastle", "Tallstag",
              "Bersk", "Chernin", "Dotsk", "Kulenov", "Marsk", "Nemetsk", "Shemov", "Starag", "Brightwood", "Helder", "Hornraven", "Lackman", "Stormwind",
              "Windrivver", "Ankhalab", "Anskuld", "Fezim", "Hahpet", "Nathandem", "Sepret", "Uuthrakt", "Chergoba", "Dyernina", "Iltazyara", "Murnyethara",
              "Stayanoga", "Ulmokina", "Chien", "Qiu", "Lan", "Huang", "Hoang", "Kao", "Kung", "Lao", "Jiang", "Trinh", "Mei", "Pin", "Shin", "Sum", "Tan", "Wan",
              "Wang", "Wei", "Wen", "Jin", "Chen", "Shen", "Tran", "Dao", "Vu", "Vo", "Luu", "Liu", "Qi", "Yue", "Shang", "Qing", "Luo", "Zheng", "Agosto",
              "Astorio", "Calabra", "Domine", "Falone", "Marivaldi", "Pisacar", "Ramondo", "Yu"],
 },
 tiefling: {first: ["Akmenos", "Amnon", "Barakas", "Damakos", "Ekemon", "Iados", "Kairon", "Leucis", "Melech", "Mordai", "Morthos", "Pelaios", "Skamos", "Therai",
                    "Akta", "Anakis", "Bryseis", "Criella", "Damaia", "Ea", "Kallista", "Lerissa", "Makaria", "Nemeia", "Orianna", "Phelaia", "Rieta"],
            last: [""]
 }

}
//races
var races = [
  //common races
  {name: "dragonborn", baseSpeed:30, armorMod: 10, abMods: {str:2, dex:0, con:0, int:0, wis:0, cha:1},
                  feats:["Draconic Ancestry", "Breath Weapon", "Damage Resistance"],
                  lang:["Common", "Draconic"],
                  skills:[],
                  proficiencies:[],
                  names: names.dragonborn},

  {name: "dwarf", baseSpeed:25, armorMod: 0, abMods: {str:0, dex:0, con:2, int:0, wis:0, cha:0},
                  feats:["Darkvision", "Dwarven Resilience", "Dwarven Combat Training", "Tool Proficiency", "Stonecunnning"],
                  lang:["Common", "Dwarvish"],
                  skills: [],
                  proficiencies: ["battleaxe", "handaxe","light hammer", "warhammer"],
                  names: names.dwarf,
                  tools:["smith's tools", "brewer's supplies", "mason's tools"]}, //choose 1 random

  {name: "elf", baseSpeed:30, armorMod: 10, abMods: {str:0, dex:2, con:0, int:0, wis:0, cha:0},
                  feats:["Darkvision", "Keen Senses", "Fey Ancestry", "Trance"],
                  lang:["Common", "Elvish"],
                  skills: ["perception"],
                  proficiencies: [],
                  names: names.elf},

  {name: "gnome", baseSpeed:25, armorMod: 5, abMods: {str:0, dex:0, con:0, int:2, wis:0, cha:0},
                  feats:["Darkvision", "Gnome Cunning"],
                  lang:["Common", "Gnomish"],
                  skills: [],
                  proficiencies: [],
                  names: names.gnome},

  {name: "half-elf", baseSpeed:30, armorMod: 10, abMods: {str:0, dex:1, con:0, int:0, wis:0, cha:2},
                  feats:["Darkvision", "Fey Ancestry", "Skill Versatility"],
                  lang:["Common", "Elvish"], //and one random language
                  skills: [], //two random skills
                  proficiencies: [],
                  names: names.halfElf},

  {name: "half-orc", baseSpeed:30, armorMod: 10, abMods: {str:2, dex:0, con:1, int:0, wis:0, cha:0},
                  feats:["Darkvision", "Menacing", "Relentless Endurance", "Savage Attack"],
                  lang:["Common", "Orc"],
                  skills: ["intimidation"],
                  proficiencies: [],
                  names: names.halfOrc},

  {name: "halfling", baseSpeed:20, armorMod: 5, abMods: {str:0, dex:2, con:0, int:0, wis:0, cha:0},
                  feats:["Brave", "Lucky", "Halfling Nimbleness"],
                  lang:["Common", "Halfling"],
                  skills: [],
                  proficiencies: [],
                  names: names.halfling},

  {name: "human", baseSpeed:30, armorMod: 10, abMods: {str:1, dex:1, con:1, int:1, wis:1, cha:1},
                  feats:[],
                  lang:["Common"],//and one random language
                  skills: [],
                  proficiencies: [],
                  names: names.human},

  {name: "tiefling", baseSpeed:30, armorMod: 10, abMods: {str:0, dex:0, con:0, int:1, wis:0, cha:2},
                  feats:["Darkvision", "Hellish Resistance", "Infernal Legacy"],
                  lang:["Common", "Infernal"],
                  skills: [],
                  proficiencies: [],
                  names: names.tiefling}
]


//spells: Name, Classes, Level, Range (ft)

var cantrips = [
    {name: "Acid Splash", classes: ["sorceror", "wizard"], level: 0, range: 60},
    {name: "Blade Ward", classes: ["bard", "sorceror", "warlock", "wizard"], level: 0, range: "self"},
    {name: "Chill Touch", classes: ["sorceror", "warlock", "wizard"], level: 0, range: 120},
    {name: "Dancing Lights", classes: ["bard", "sorceror", "wizard"], level: 0, range: 120},
    {name: "Druidcraft", classes: ["druid"], level: 0, range: 30},
    {name: "Eldritch Blast", classes: ["warlock"], level: 0, range: 120},
    {name: "Fire Bolt", classes: ["sorceror", "wizard"], level: 0, range: 120},
    {name: "Friends", classes: ["bard","sorceror", "warlock","wizard"], level: 0, range: "self"},
    {name: "Guidance", classes: ["cleric", "druid"], level: 0, range: "touch"},
    {name: "Light", classes: ["bard", "cleric", "sorceror", "wizard"], level: 0, range: "touch"},
    {name: "Mage Hand", classes: ["bard", "cleric", "sorceror", "wizard"], level: 0, range: 30},
    {name: "Mending", classes: ["bard", "cleric", "druid", "sorceror", "wizard"], level: 0, range: "touch"},
    {name: "Message", classes: ["bard","sorceror", "wizard"], level: 0, range: 120},
    {name: "Minor Illusion", classes: ["bard","sorceror", "warlock","wizard"], level: 0, range: 30},
    {name: "Poison Spray", classes: ["druid","sorceror","warlock", "wizard"], level: 0, range: 10},
    {name: "Prestidigitation", classes: ["bard","sorceror", "warlock", "wizard"], level: 0, range: 10},
    {name: "Produce Flame", classes: ["druid"], level: 0, range: "self"},
    {name: "Ray of Frost", classes: ["sorceror", "wizard"], level: 0, range: 60},
    {name: "Resistance", classes: ["cleric", "druid"], level: 0, range: "touch"},
    {name: "Sacred Flame", classes: ["cleric"], level: 0, range: 60},
    {name: "Shillelagh", classes: ["druid"], level: 0, range: "touch"},
    {name: "Shocking Grasp", classes: ["sorceror", "wizard"], level: 0, range: "touch"},
    {name: "Spare the Dying", classes: ["cleric"], level: 0, range: "touch"},
    {name: "Thaumaturgy", classes: ["cleric"], level: 0, range: 30},
    {name: "True Strike", classes: ["bard", "sorceror", "warlock", "wizard"], level: 0, range: 30},
    {name: "Vicious Mockery", classes: ["bard"], level: 0, range: 60}
]

var lvl1 = [
    {name: "Alarm", classes: ["ranger", "wizard"], level: 1, range: 30},
    {name: "Animal Friendship", classes: ["bard", "druid", "ranger"], level: 1, range: 30},
    {name: "Bane", classes: ["bard", "cleric"], level: 1, range: 30},
    {name: "Bless", classes: ["cleric", "paladin"], level: 1, range: 30},
    {name: "Burning Hands", classes: ["sorceror", "wizard"], level: 1, range: "self (15 ft cone)"},
    {name: "Charm Person", classes: ["bard", "druid", "sorceror", "warlock", "wizard"], level: 1, range: 30},
    {name: "Color Spray", classes: ["sorceror", "wizard"], level: 1, range: "self (15 foot cone)"},
    {name: "Command", classes: ["cleric", "paladin"], level: 1, range: 60},
    {name: "Comprehend Languages", classes: ["bard", "sorceror", "warlock", "wizard"], level: 1, range: "self"},
    {name: "Create or Destroy Water", classes: ["cleric", "druid"], level: 1, range: 30},
    {name: "Cure Wounds", classes: ["bard", "cleric", "druid", "paladin", "ranger"], level: 1, range: "touch"},
    {name: "Detect Evil and Good", classes: ["cleric", "paladin"], level: 1, range: "self"},
    {name: "Detect Magic", classes: ["bard", "cleric", "druid", "paladin", "ranger", "sorcerer", "wizard"], level: 1, range: "self"},
    {name: "Detect Poison and Disease", classes: ["cleric", "druid", "paladin", "ranger"], level: 1, range: "self"},
    {name: "Disguise Self", classes: ["bard", "sorceror", "wizard"], level: 1, range: "self"},
    {name: "Divine Favor", classes: ["paladin"], level: 1, range: "self"},
    {name: "Entangle", classes: ["druid"], level: 1, range: 90},
    {name: "Expeditious Retreat", classes: ["sorceror", "warlock", "wizard"], level: 1, range: "self"},
    {name: "Faerie Fire", classes: ["bard", "druid"], level: 1, range: 60},
    {name: "False Life", classes: ["sorceror", "wizard"], level: 1, range: "self"},
    {name: "Feather Fall", classes: ["bard", "sorceror", "wizard"], level: 1, range: 60},
    {name: "Find Familiar", classes: ["wizard"], level: 1, range: 10},
    {name: "Floating Disk", classes: ["wizard"], level: 1, range: 30},
    {name: "Fog Cloud", classes: ["druid", "ranger", "sorceror", "wizard"], level: 1, range: 120},
    {name: "Goodberry", classes: ["druid", "ranger"], level: 1, range: "touch"},
    {name: "Grease", classes: ["wizard"], level: 1, range: 60},
    {name: "Guiding Bolt", classes: ["cleric"], level: 1, range: 120},
    {name: "Healing Word", classes: ["bard", "cleric", "druid"], level: 1, range: 60},
    {name: "Hellish Rebuke", classes: ["warlock"], level: 1, range: 60},
    {name: "Heroism", classes: ["bard", "paladin"], level: 1, range: "touch"},
    {name: "Hideous Laughter", classes: ["bard", "wizard"], level: 1, range: 30},
    {name: "Hunter's Mark", classes: ["ranger"], level: 1, range: 90},
    {name: "Identify", classes: ["bard", "wizard"], level: 1, range: "touch"},
    {name: "Illusory Script", classes: ["bard", "warlock", "wizard"], level: 1, range: "touch"},
    {name: "Inflict Wounds", classes: ["cleric"], level: 1, range: "touch"},
    {name: "Jump", classes: ["druid", "ranger", "sorceror", "wizard"], level: 1, range: "touch"},
    {name: "Longstrider", classes: ["bard", "druid", "ranger", "wizard"], level: 1, range: "touch"},
    {name: "Mage Armor", classes: ["sorceror", "wizard"], level: 1, range: "touch"},
    {name: "Magic Missile", classes: ["sorceror", "wizard"], level: 1, range: 120},
    {name: "Protection From Evil and Good", classes: ["cleric", "paladin", "warlock", "wizard"], level: 1, range: "touch"},
    {name: "Purify Food and Drink", classes: ["cleric", "druid", "paladin"], level: 1, range: 10},
    {name: "Sanctuary", classes: ["cleric"], level: 1, range: 30},
    {name: "Shield", classes: ["sorceror", "wizard"], level: 1, range: "self"},
    {name: "Shield of Faith", classes: ["cleric", "paladin"], level: 1, range: 60},
    {name: "Silent Image", classes: ["bard", "sorceror", "wizard"], level: 1, range: 60},
    {name: "Sleep", classes: ["bard", "sorceror", "wizard"], level: 1, range: 90},
    {name: "Speak With Animals", classes: ["bard", "druid", "ranger"], level: 1, range: "self"},
    {name: "Thunderwave", classes: ["bard", "druid", "sorceror", "wizard"], level: 1, range: "self (15-foot cube)"},
    {name: "Unseen Servant", classes: ["bard", "warlock", "wizard"], level: 1, range: 60}
  ]


// classes at first level
var classes = [
  {name: "barbarian", hitDie: 12, // hp = 12 + cons
                      saves: ["str","con"],
                      armor: ["light armor", "medium armor"],
                      weapons: ["shields", "simple weapons", "martial weapons"],
                      feats: ["Rage", "Unarmored Defense"], //ac = 10 + dex + con
                      profBonus: 2,
                      tools: [],
                      skills: ["animal handling", "athletics", "intimidation", "nature", "perception", "survival"], // choose 2
                      equipment: [["greateaxe", randomItem(equipment.weapons.martialM)],
                                  ["2 handaxes", randomItem(allSimpleWeapons)],
                                  ["explorer's pack"],
                                  ["four javelins"]]},

  {name: "bard", hitDie: 8, // hp = 8 + cons
                 saves: ["dex","cha"],
                 armor: ["light armor"],// hp: "8 + cons modifier",
                 weapons:["simple weapons", "hand crossbows", "longswords", "rapiers", "shortswords"],
                 feats: ["Spellcasting", "Bardic Inspiration"],
                 profBonus: 2,
                 tools: equipment.tools.instrument, // choose 3
                 skills: skills, // 3 random skills
                 equipment: [["rapier", "longsword", randomItem(allSimpleWeapons)], //choose one
                            ["diplomat's pack", "entertainer's pack"],
                            equipment.tools.instrument,
                            ["leather armor"],
                            ["dagger"]],
                 cantrips: 2,
                 spells:4,
                 ability: "cha",
                 canList: filterSpellsByClass(cantrips, "bard"),
                 lvl1List: filterSpellsByClass(lvl1, "bard"),
                 slots: 2
                 }, //spell save DC = 8 + prof bonus + cha mod || spell atk mod = prof bonus + cha mod

  {name: "cleric", hitDie: 8, //8+cons
                   saves: ["wis", "cha"],
                   armor: ["light armor", "medium armor"],
                   weapons: ["shields", "simple weapons"],
                   feats: ["Spellcasting", "Divine Domain"],
                   profBonus: 2,
                   tools: [],
                   skills: ["history", "insight", "medicine", "persuasion", "religion"], //choose 2
                   equipment: [["mace", "warhammer"],
                                ["scale mail", "leather armor", "chain mail"],
                                ["light crossbow and 20 bolts", randomItem(allSimpleWeapons)], //choose 1
                                ["priest's pack", "explorer's pack"],
                                ["shield"], ["holy symbol"]],
                   cantrips: 3,
                   spells: 0, // DC = 8+PB+wis; atk mod = PB + wis
                   ability: "wis",
                   canList: filterSpellsByClass(cantrips, "cleric"),
                   lvl1List: filterSpellsByClass(lvl1, "cleric"),
                   slots: 2
                   },

  {name: "druid", hitDie: 8, //8 + cons
                  saves: ["int", "wis"],
                  armor: ["light armor (nonmetal)", "medium armor (nonmetal)"],
                  weapons: ["shields (nonmetal)", "clubs", "daggers", "darts", "javelins", "maces", "quarterstaffs", "scimitars", "sickles", "slings", "spears"],
                  feats: ["Druidic", "Spellcasting"],
                  profBonus: 2,
                  tools: ["herbalism kit", "Druidic"],
                  skills: ["arcana", "animal handling", "insight", "medicine", "nature", "perception", "religion", "survival"], // choose 2
                  equipment: [["wooden shield", randomItem(allSimpleWeapons)], //choose 1
                              ["scimitar", randomItem(allSimpleWeapons)], //choose 1
                              ["leather armor"], ["explorer's pack"], ["druidic focus"]],
                  cantrips: 2,
                  spells: 0, //DC: 8+PB+wis; atk = PB + wis
                  ability: "wis",
                  canList: filterSpellsByClass(cantrips, "druid"),
                  lvl1List: filterSpellsByClass(lvl1, "druid"),
                  slots:3
                  },

  {name: "fighter", hitDie: 10, //10+cons
                    saves: ["str", "con"],
                    armor: ["all armor"],
                    weapons: ["shields", "simple weapons", "martial weapons"],
                    feats: ["Fighting Style", "Second Wind"],
                    profBonus: 2,
                    tools: [],
                    skills: ["acrobatics", "animal handling", "athletics", "history", "insight", "intimidation", "perception", "survival"], //choose 2
                    equipment: [["chain mail", "leather armor, longbow and 20 arrows"],
                                [["shield", randomItem(allMartialWeapons)].join(" and "), randomSelectWithDuplicates(2, allMartialWeapons).join(" and ")],
                                ["light crossbow and 20 bolts", "two handaxes"],
                                ["dungeoneer's pack", "explorer's pack"]]},

  {name: "monk", hitDie: 8,//HP: 8 + cons
                 saves: ["str", "dex"],
                 armor: [], //while unarmored, AC = 10 + dex + wis
                 weapons: ["simple weapons", "shortswords"],
                 feats: ["Unarmored Defense", "Martial Arts"],
                 profBonus: 2,
                 tools: equipment.tools.artisan.concat(equipment.tools.instrument), //choose one
                 skills: ["acrobatics", "athletics", "history", "insight", "religion", "stealth"], //choose two
                 equipment: [["shortsword", randomItem(allSimpleWeapons)], //choose 1
                              ["dungeoneer's pack", "explorer's pack"],
                              ["10 darts"]]},

  {name: "paladin", hitDie: 10, //10 + cons
                    saves: ["wis", "cha"],
                    armor: ["all"],
                    weapons: ["shields", "simple weapons", "martial weapons"],
                    feats: ["Divine Sense", "Lay on Hands"],
                    profBonus: 2,
                    tools: [],
                    skills: ["athletics", "insight", "intimidation", "medicine", "persuasion", "religion"], //choose 2
                    equipment: [[["shield", randomItem(allMartialWeapons)].join(" and "), randomSelectWithDuplicates(2, allMartialWeapons).join(" and ")],// choose 1
                                ["five javelins", randomItem(equipment.weapons.simpleM)], //choose one
                                ["priest's pack", "explorer's pack"],
                                ["chain mail"], ["holy symbol"]]},

  {name: "ranger", hitDie: 10,
                   saves: ["str", "dex"],
                   armor: ["light armor", "medium armor"],
                   weapons: ["shields", "simple weapons", "martial weapons"],
                   feats: ["Favored Enemy", "Natural Explorer"],
                   profBonus: 2,
                   tools: [],
                   skills: ["animal handling", "athletics", "insight", "investigation", "nature", "perception", "stealth", "survival"], //choose 3
                   equipment: [["scale mail", "leather armor"],
                              ["two shortswords", randomSelectWithDuplicates(2,equipment.weapons.simpleM).join(" and ")],
                              ["dungeoneer's pack", "explorer's pack"],
                              ["longbow"], ["quiver of 20 arrows"]]},

  {name: "rogue", hitDie: 8, //8+cons
                  saves: ["dex", "int"],
                  armor: ["light armor"],
                  weapons: ["simple weapons", "hand crossbows", "longswords", "rapiers", "shortswords"],
                  feats: ["Expertise", "Sneak Attack", "Thieves' Cant"],
                  profBonus: 2,
                  tools: ["thieves' tools", "thieves' cant"],
                  skills: ["acrobatics", "athletics", "deception", "insight", "intimidation", "investigation", "perception",
                          "performance","persuasion","sleight of hand","stealth"], //choose 4
                  equipment: [["rapier", "shortsword"],
                              ["shortbow and 20 arrows", "shortsword"],
                              ["burglar's pack", "dungeoneer's pack", "explorer's pack"],
                              ["leather armor"], ["two daggers"], ["thieves' tools"]]},

  {name: "sorceror", hitDie: 6, //6+cons
                     saves: ["con", "cha"],
                     armor: [],
                     weapons: ["daggers", "darts", "slings", "quarterstaffs", "light crossbows"],
                     feats: ["Spellcasting", "Sorcerous Origin"],
                     profBonus: 2,
                     tools: [],
                     skills: ["arcana", "deception", "insight", "intimidation", "persuasion", "religion"], //choose 2
                     equipment: [["light crossbow and 20 bolts", randomItem(allSimpleWeapons)], //choose 1
                                  ["component pouch", "arcane focus"],
                                  ["dungeoneer's pack", "explorer's pack"],
                                  ["two daggers"]],
                     cantrips: 4,
                     spells: 2, //DC: 8+PB+cha; atk = PB + cha
                     ability: "cha",
                     canList: filterSpellsByClass(cantrips, "sorceror"),
                     lvl1List: filterSpellsByClass(lvl1, "sorceror"),
                     slots:2
                     },

  {name: "warlock", hitDie: 8,
                    saves: ["wis", "cha"],
                    armor: ["light armor"],
                    weapons: ["simple weapons"],
                    feats: ["Otherworldly Patron", "Pact Magic"],
                    profBonus: 2,
                    tools: [],
                    skills: ["arcana", "deception" , "history", "intimidation", "investigation", "nature", "religion"], //choose 2
                    equipment: [["light crossbow and 20 bolts", randomItem(allSimpleWeapons)],
                                ["component pouch", "arcane focus"],
                                ["scholar's pack", "dungeoneer's pack"],
                                ["leather armor"], allSimpleWeapons, ["two daggers"]],
                    cantrips: 2,
                    spells: 2, //DC: 8+PB+cha; atk = PB + cha
                    ability: "cha",
                    canList: filterSpellsByClass(cantrips, "warlock"),
                    lvl1List: filterSpellsByClass(lvl1, "warlock"),
                    slots: 1
                    },

  {name: "wizard", hitDie: 6, //6 + con
                   saves: ["int", "wis"],
                   armor: [],
                   weapons: ["daggers", "darts", "slings", "quarterstaffs", "light crossbows"],
                   feats: ["Spellcasting", "Arcane Recovery"],
                   profBonus: 2,
                   tools: [],
                   skills: ["arcana", "history", "insight", "investigation", "medicine", "religion"], //choose 2
                   equipment: [["quarterstaff", "dagger"],
                                ["component pouch", "arcane focus"],
                                ["scholar's pack", "explorer's pack"],
                                ["spellbook"]],
                   cantrips: 2,
                   spells: 6, //DC: 8+PB+int; atk = PB + int
                   ability: "int",
                   canList: filterSpellsByClass(cantrips, "wizard"),
                   lvl1List: filterSpellsByClass(lvl1, "wizard"),
                   slots: 2
                   }
]


// --- UTILITY FUNCTIONS ---
// array -> array
// returns an array of spells that can be used by the given class name
function filterSpellsByClass(array, className) {
  var result = [];

  for (item of array) {
    if (item.classes.includes(className)) {
      result.push(item);
    }
  }
  return result;
}

// array -> Array
// pushes all the values of array2 into array1 and returns array1
function appendAllValues(array1, array2) {
  var item;
  var i;
  for(i=0; i<array2.length; i++) {
    item = array2[i];
    array1.push(item);
  }
  return array1;
}

// int -> int
//rolls a die with the given number of sides a given number of times
function rollDie(times, sides) {
  var total = 0;
  var i;
    for(i = 0; i < times; i++) {
      total = total +  1 + Math.floor(Math.random() * sides);
    }
  return total;
}

// int array -> array
// randomly selects a given number of objects from the given array and returns them as an array of objects without duplicates
function randomSelect(num, array) {
  var output = [];
  var remaining = [];
  var i;
  var j;

  // copies the elements of array into remaining
  for (i=0; i<array.length; i++) {
    remaining.push(array[i]);
  }
  //return remaining;
  //picks random items
  for (j=0; j<num; j++) {
    var index = randomIndex(remaining);
    var item = remaining[index];

    output.push(item);

    //removes the item from the array
    if (index == 0) {
      remaining = remaining.slice(1, remaining.length-1);
    }
    else if (index == remaining.length - 1) {
      remaining = remaining.slice(0, remaining.length-2);
    }
    else {
      var p1 = remaining.slice(0, index - 1);
      var p2 = remaining.slice(index + 1, remaining.length - 1);
      remaining = p1.concat(p2);
    }
  }

  return output;
}

// int array -> array
// randomly selects a given number of objects from the given array and returns them as an array of objects
// allows duplicates
function randomSelectWithDuplicates(num, array) {
  var output = [];
  var i;
  for (i = 0; i<num; i++) {
    var index = randomIndex(array);
    var item = array[index];

    output.push(item);
    }
  return output;
}

// array[T] -> // T
//randomly selects an item from the given array
function randomItem(array) {
  var index = randomIndex(array);
  return array[index];
}

// array -> int
//randomly selects an index from the given Array
function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

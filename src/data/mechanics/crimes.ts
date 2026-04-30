/**
 * A criminal offense recognized by the feudal legal system of Aetheris.
 * Crimes carry a severity rating, a typical punishment, and a bounty
 * range that determines the price placed on the offender's head.
 */
export interface Crime {
  id: string;
  offense: string;
  severity: 'Infraction' | 'Misdemeanor' | 'Felony' | 'Treason';
  typicalPunishment: string;
  /** Minimum bounty posted, in gold. */
  bountyMin: number;
  /** Maximum bounty posted, in gold. -1 indicates an uncapped or priceless bounty. */
  bountyMax: number;
  /** How difficult the crime is to detect or prove. 1 = obvious, 10 = near-impossible. */
  detectionDifficulty: number;
}

/** Master list of all criminal offenses, organized by severity. */
export const CRIMES: Crime[] = [
  // ==========================================
  // INFRACTIONS
  // ==========================================
  {
    id: 'public_intox',
    offense: 'Public Intoxication and Brawling',
    severity: 'Infraction',
    typicalPunishment: 'A night in the gaol and a modest fine.',
    bountyMin: 1,
    bountyMax: 10,
    detectionDifficulty: 1
  },
  {
    id: 'loitering',
    offense: 'Loitering in Restricted Areas',
    severity: 'Infraction',
    typicalPunishment: 'A stern warning and removal by the city watch.',
    bountyMin: 0,
    bountyMax: 5,
    detectionDifficulty: 2
  },
  {
    id: 'petty_theft',
    offense: 'Petty Theft (under 10 Gold)',
    severity: 'Infraction',
    typicalPunishment: 'Return of stolen goods and a public reprimand.',
    bountyMin: 5,
    bountyMax: 15,
    detectionDifficulty: 4
  },
  {
    id: 'public_nuisance',
    offense: 'Disturbing the Peace',
    severity: 'Infraction',
    typicalPunishment: 'A night in the stocks and a small fine.',
    bountyMin: 5,
    bountyMax: 10,
    detectionDifficulty: 1
  },
  {
    id: 'vagrancy',
    offense: 'Vagrancy Without Papers',
    severity: 'Infraction',
    typicalPunishment: 'Temporary detainment and forced registration with the city clerk.',
    bountyMin: 0,
    bountyMax: 5,
    detectionDifficulty: 2
  },
  {
    id: 'illegal_gambling',
    offense: 'Operating an Unlicensed Gambling Den',
    severity: 'Infraction',
    typicalPunishment: 'Confiscation of all wagers and a moderate fine.',
    bountyMin: 10,
    bountyMax: 25,
    detectionDifficulty: 5
  },
  {
    id: 'curfew_violation',
    offense: 'Curfew Violation',
    severity: 'Infraction',
    typicalPunishment: 'Detainment until dawn and a small fine.',
    bountyMin: 2,
    bountyMax: 8,
    detectionDifficulty: 3
  },
  {
    id: 'market_fraud',
    offense: 'Market Fraud (Price Gouging)',
    severity: 'Infraction',
    typicalPunishment: 'Revocation of market stall license for one season.',
    bountyMin: 10,
    bountyMax: 30,
    detectionDifficulty: 5
  },
  {
    id: 'illegal_dumping',
    offense: 'Dumping Waste in Waterways',
    severity: 'Infraction',
    typicalPunishment: 'A fine and mandatory cleanup of the affected area.',
    bountyMin: 5,
    bountyMax: 20,
    detectionDifficulty: 4
  },
  {
    id: 'unlicensed_performance',
    offense: 'Performing Without a Bard\'s License',
    severity: 'Infraction',
    typicalPunishment: 'Confiscation of instruments until the license fee is paid.',
    bountyMin: 5,
    bountyMax: 15,
    detectionDifficulty: 2
  },
  {
    id: 'jaywalking',
    offense: 'Impeding Carriage Traffic',
    severity: 'Infraction',
    typicalPunishment: 'A harsh verbal warning and a 2 gold fine.',
    bountyMin: 0,
    bountyMax: 5,
    detectionDifficulty: 1
  },
  {
    id: 'littering_royal',
    offense: 'Littering on the Royal Mile',
    severity: 'Infraction',
    typicalPunishment: 'One day of street sweeping.',
    bountyMin: 2,
    bountyMax: 10,
    detectionDifficulty: 3
  },
  {
    id: 'noise_complaint_late',
    offense: 'Late Night Musician Disruption',
    severity: 'Infraction',
    typicalPunishment: 'Confiscation of instrument for one week.',
    bountyMin: 5,
    bountyMax: 15,
    detectionDifficulty: 2
  },
  {
    id: 'profanity_public',
    offense: 'Public Profanity Near a Temple',
    severity: 'Infraction',
    typicalPunishment: 'Required attendance at an hour-long sermon.',
    bountyMin: 1,
    bountyMax: 5,
    detectionDifficulty: 1
  },
  {
    id: 'spitting_guard',
    offense: 'Spitting Near a City Guard',
    severity: 'Infraction',
    typicalPunishment: 'Immediate detainment and shoe-shining duty for the guard.',
    bountyMin: 5,
    bountyMax: 10,
    detectionDifficulty: 1
  },
  {
    id: 'unlicensed_mount',
    offense: 'Riding an Unlicensed Mount in the Market',
    severity: 'Infraction',
    typicalPunishment: 'A moderate fine and temporary impounding of the beast.',
    bountyMin: 10,
    bountyMax: 25,
    detectionDifficulty: 2
  },
  {
    id: 'sleeping_public',
    offense: 'Sleeping in a Public Fountain',
    severity: 'Infraction',
    typicalPunishment: 'A bucket of cold water and a vagrancy warning.',
    bountyMin: 0,
    bountyMax: 2,
    detectionDifficulty: 1
  },
  {
    id: 'false_advertising_minor',
    offense: 'Minor False Advertising',
    severity: 'Infraction',
    typicalPunishment: 'Destruction of the offending sign and a fine.',
    bountyMin: 10,
    bountyMax: 30,
    detectionDifficulty: 4
  },
  {
    id: 'unregistered_weapon',
    offense: 'Failure to Peace-Tie a Blade',
    severity: 'Infraction',
    typicalPunishment: 'Forced zip-tie of the weapon by the watch.',
    bountyMin: 5,
    bountyMax: 15,
    detectionDifficulty: 2
  },
  {
    id: 'fire_hazard',
    offense: 'Maintaining an Unsafe Hearth',
    severity: 'Infraction',
    typicalPunishment: 'Mandatory chimney sweep service billed to the offender.',
    bountyMin: 5,
    bountyMax: 20,
    detectionDifficulty: 3
  },
  {
    id: 'illegal_fishing',
    offense: 'Fishing in the King\'s Pond',
    severity: 'Infraction',
    typicalPunishment: 'Breakage of the fishing rod and a fine.',
    bountyMin: 10,
    bountyMax: 20,
    detectionDifficulty: 3
  },
  {
    id: 'public_indecency',
    offense: 'Public Indecency',
    severity: 'Infraction',
    typicalPunishment: 'A night in the stocks and public mockery.',
    bountyMin: 5,
    bountyMax: 15,
    detectionDifficulty: 1
  },
  {
    id: 'unlicensed_familiar',
    offense: 'Unleashed Familiar in the Bazaar',
    severity: 'Infraction',
    typicalPunishment: 'Confiscation of the pet until a license is purchased.',
    bountyMin: 5,
    bountyMax: 25,
    detectionDifficulty: 2
  },
  {
    id: 'counterfeit_copper',
    offense: 'Passing Counterfeit Copper',
    severity: 'Infraction',
    typicalPunishment: 'Nailing the false coins to the offender\'s door as a warning.',
    bountyMin: 2,
    bountyMax: 10,
    detectionDifficulty: 5
  },
  {
    id: 'disobeying_clerk',
    offense: 'Refusal to Cooperate with a Census Clerk',
    severity: 'Infraction',
    typicalPunishment: 'Doubled local taxes for the quarter.',
    bountyMin: 10,
    bountyMax: 30,
    detectionDifficulty: 2
  },

  // ==========================================
  // MISDEMEANORS
  // ==========================================
  {
    id: 'unlicensed_magic',
    offense: 'Unlicensed Arcane Manipulation',
    severity: 'Misdemeanor',
    typicalPunishment: 'Confiscation of arcane foci and a heavy fine to the local mage guild.',
    bountyMin: 50,
    bountyMax: 150,
    detectionDifficulty: 5
  },
  {
    id: 'assault',
    offense: 'Assault on a Civilian',
    severity: 'Misdemeanor',
    typicalPunishment: 'One to six months of hard labor in municipal works.',
    bountyMin: 25,
    bountyMax: 100,
    detectionDifficulty: 3
  },
  {
    id: 'smuggling_low',
    offense: 'Smuggling (Non-Contraband Goods)',
    severity: 'Misdemeanor',
    typicalPunishment: 'Confiscation of goods and triple the import tax as a fine.',
    bountyMin: 50,
    bountyMax: 200,
    detectionDifficulty: 6
  },
  {
    id: 'trespassing',
    offense: 'Trespassing on Noble Grounds',
    severity: 'Misdemeanor',
    typicalPunishment: 'Thirty days imprisonment and a formal written apology to the estate owner.',
    bountyMin: 25,
    bountyMax: 75,
    detectionDifficulty: 4
  },
  {
    id: 'poaching',
    offense: 'Poaching in Royal Forests',
    severity: 'Misdemeanor',
    typicalPunishment: 'Loss of hunting equipment and a season of community service.',
    bountyMin: 30,
    bountyMax: 100,
    detectionDifficulty: 5
  },
  {
    id: 'bribery',
    offense: 'Bribing a City Official',
    severity: 'Misdemeanor',
    typicalPunishment: 'Double the bribe amount as a fine, plus thirty days in the stockade.',
    bountyMin: 50,
    bountyMax: 250,
    detectionDifficulty: 7
  },
  {
    id: 'identity_fraud',
    offense: 'Impersonating a Guild Member',
    severity: 'Misdemeanor',
    typicalPunishment: 'Public branding on the hand and permanent guild blacklisting.',
    bountyMin: 75,
    bountyMax: 200,
    detectionDifficulty: 6
  },
  {
    id: 'illegal_alchemy',
    offense: 'Unlicensed Potion Brewing',
    severity: 'Misdemeanor',
    typicalPunishment: 'Destruction of all stock, confiscation of lab equipment, and a fine.',
    bountyMin: 50,
    bountyMax: 150,
    detectionDifficulty: 5
  },
  {
    id: 'desecration_minor',
    offense: 'Minor Desecration of Holy Ground',
    severity: 'Misdemeanor',
    typicalPunishment: 'Penance assigned by the local clergy and community service at the temple.',
    bountyMin: 25,
    bountyMax: 100,
    detectionDifficulty: 3
  },
  {
    id: 'illegal_arms',
    offense: 'Carrying Prohibited Weapons in City Limits',
    severity: 'Misdemeanor',
    typicalPunishment: 'Confiscation of the weapon and a fine. Repeat offenses lead to imprisonment.',
    bountyMin: 20,
    bountyMax: 80,
    detectionDifficulty: 3
  },
  {
    id: 'extortion',
    offense: 'Extortion and Racketeering',
    severity: 'Misdemeanor',
    typicalPunishment: 'Six months hard labor and repayment of all extorted funds.',
    bountyMin: 100,
    bountyMax: 300,
    detectionDifficulty: 7
  },
  {
    id: 'forgery',
    offense: 'Document Forgery',
    severity: 'Misdemeanor',
    typicalPunishment: 'Loss of the dominant hand\'s index finger and a public shaming.',
    bountyMin: 50,
    bountyMax: 200,
    detectionDifficulty: 7
  },
  {
    id: 'bar_brawl_damage',
    offense: 'Property Damage During a Brawl',
    severity: 'Misdemeanor',
    typicalPunishment: 'Paying restitution plus a week in the stockade.',
    bountyMin: 20,
    bountyMax: 80,
    detectionDifficulty: 2
  },
  {
    id: 'pickpocketing',
    offense: 'Pickpocketing and Cut-Purse Activity',
    severity: 'Misdemeanor',
    typicalPunishment: 'Public flogging and a month of hard labor.',
    bountyMin: 25,
    bountyMax: 100,
    detectionDifficulty: 6
  },
  {
    id: 'smuggling_wine',
    offense: 'Evading Tariffs on Exotic Alcohols',
    severity: 'Misdemeanor',
    typicalPunishment: 'Confiscation of all cargo and a heavy fine.',
    bountyMin: 50,
    bountyMax: 200,
    detectionDifficulty: 6
  },
  {
    id: 'impersonating_guard',
    offense: 'Impersonating the City Watch',
    severity: 'Misdemeanor',
    typicalPunishment: 'Stripped of all armor and banished from the city for a year.',
    bountyMin: 75,
    bountyMax: 250,
    detectionDifficulty: 5
  },
  {
    id: 'illegal_dueling',
    offense: 'Unsanctioned Street Dueling',
    severity: 'Misdemeanor',
    typicalPunishment: 'Three months imprisonment for the victor.',
    bountyMin: 50,
    bountyMax: 150,
    detectionDifficulty: 2
  },
  {
    id: 'black_market_buyer',
    offense: 'Purchasing Known Stolen Goods',
    severity: 'Misdemeanor',
    typicalPunishment: 'Forfeiture of the goods and a fine equal to their value.',
    bountyMin: 30,
    bountyMax: 120,
    detectionDifficulty: 7
  },
  {
    id: 'grave_trespass',
    offense: 'Trespassing in the Catacombs After Dark',
    severity: 'Misdemeanor',
    typicalPunishment: 'Thirty days of grave-digging duty for the church.',
    bountyMin: 40,
    bountyMax: 150,
    detectionDifficulty: 5
  },
  {
    id: 'animal_cruelty',
    offense: 'Cruelty to a Pack Animal or Mount',
    severity: 'Misdemeanor',
    typicalPunishment: 'Confiscation of the animal and a public flogging.',
    bountyMin: 25,
    bountyMax: 100,
    detectionDifficulty: 3
  },
  {
    id: 'unregistered_spell',
    offense: 'Casting Destructive Magic in the Streets',
    severity: 'Misdemeanor',
    typicalPunishment: 'Having the casting hand bound in anti-magic iron for a week.',
    bountyMin: 100,
    bountyMax: 300,
    detectionDifficulty: 2
  },
  {
    id: 'desertion_minor',
    offense: 'Fleeing the City Draft',
    severity: 'Misdemeanor',
    typicalPunishment: 'Forced conscription into the penal legion for one year.',
    bountyMin: 50,
    bountyMax: 200,
    detectionDifficulty: 4
  },
  {
    id: 'forgery_minor',
    offense: 'Forging a Trade Permit',
    severity: 'Misdemeanor',
    typicalPunishment: 'Permanent ban from trading in the city markets.',
    bountyMin: 75,
    bountyMax: 200,
    detectionDifficulty: 7
  },
  {
    id: 'tax_evasion_minor',
    offense: 'Underreporting Merchant Tax',
    severity: 'Misdemeanor',
    typicalPunishment: 'Seizure of inventory to cover the evaded amount plus interest.',
    bountyMin: 50,
    bountyMax: 250,
    detectionDifficulty: 6
  },
  {
    id: 'harassment_noble',
    offense: 'Publicly Insulting a Nobleman',
    severity: 'Misdemeanor',
    typicalPunishment: 'Thirty days in the dungeon and a public, written apology.',
    bountyMin: 50,
    bountyMax: 150,
    detectionDifficulty: 2
  },
  {
    id: 'illegal_potion_sale',
    offense: 'Selling Unverified Healing Potions',
    severity: 'Misdemeanor',
    typicalPunishment: 'Forced consumption of the product and an alchemy ban.',
    bountyMin: 100,
    bountyMax: 250,
    detectionDifficulty: 5
  },
  {
    id: 'blackmail_minor',
    offense: 'Petty Blackmail',
    severity: 'Misdemeanor',
    typicalPunishment: 'Seizure of ill-gotten funds and two months hard labor.',
    bountyMin: 50,
    bountyMax: 150,
    detectionDifficulty: 8
  },

  // ==========================================
  // FELONYS
  // ==========================================
  {
    id: 'grand_larceny',
    offense: 'Grand Larceny',
    severity: 'Felony',
    typicalPunishment: 'Severing of the dominant hand or ten years of hard labor.',
    bountyMin: 100,
    bountyMax: 500,
    detectionDifficulty: 5
  },
  {
    id: 'grave_robbing',
    offense: 'Grave Robbing and Death Magic',
    severity: 'Felony',
    typicalPunishment: 'Exile to the blighted lands or execution by the local clergy.',
    bountyMin: 500,
    bountyMax: 2000,
    detectionDifficulty: 6
  },
  {
    id: 'murder',
    offense: 'Murder',
    severity: 'Felony',
    typicalPunishment: 'Execution by hanging, or life imprisonment in the deepest dungeon.',
    bountyMin: 500,
    bountyMax: 5000,
    detectionDifficulty: 5
  },
  {
    id: 'arson',
    offense: 'Arson of Inhabited Property',
    severity: 'Felony',
    typicalPunishment: 'Branding and twenty years of hard labor rebuilding what was destroyed.',
    bountyMin: 300,
    bountyMax: 1000,
    detectionDifficulty: 4
  },
  {
    id: 'kidnapping',
    offense: 'Kidnapping',
    severity: 'Felony',
    typicalPunishment: 'Life imprisonment or death, depending on the victim\'s social status.',
    bountyMin: 500,
    bountyMax: 3000,
    detectionDifficulty: 6
  },
  {
    id: 'smuggling_high',
    offense: 'Smuggling (Contraband/Weapons)',
    severity: 'Felony',
    typicalPunishment: 'Confiscation of all assets and ten to twenty years of hard labor.',
    bountyMin: 500,
    bountyMax: 2500,
    detectionDifficulty: 7
  },
  {
    id: 'slave_trade',
    offense: 'Slave Trading',
    severity: 'Felony',
    typicalPunishment: 'A life sentence in the most brutal labor camp available.',
    bountyMin: 1000,
    bountyMax: 5000,
    detectionDifficulty: 7
  },
  {
    id: 'piracy',
    offense: 'Piracy on the High Seas',
    severity: 'Felony',
    typicalPunishment: 'Hanging from the yardarm or keel-hauling, per naval tradition.',
    bountyMin: 500,
    bountyMax: 5000,
    detectionDifficulty: 4
  },
  {
    id: 'temple_robbery',
    offense: 'Robbing a Temple or Shrine',
    severity: 'Felony',
    typicalPunishment: 'Execution by the offended deity\'s clergy, or lifelong penance service.',
    bountyMin: 500,
    bountyMax: 3000,
    detectionDifficulty: 5
  },
  {
    id: 'guild_assassination',
    offense: 'Assassination (Non-Political Target)',
    severity: 'Felony',
    typicalPunishment: 'Death by the same method used on the victim, if caught.',
    bountyMin: 1000,
    bountyMax: 10000,
    detectionDifficulty: 9
  },
  {
    id: 'demon_summoning',
    offense: 'Summoning a Fiend or Outsider',
    severity: 'Felony',
    typicalPunishment: 'Execution by burning, followed by scattering of ashes at a crossroads.',
    bountyMin: 2000,
    bountyMax: 10000,
    detectionDifficulty: 6
  },
  {
    id: 'mass_poisoning',
    offense: 'Mass Poisoning (Wells, Food Supply)',
    severity: 'Felony',
    typicalPunishment: 'Forced consumption of the same poison, followed by public execution.',
    bountyMin: 1000,
    bountyMax: 5000,
    detectionDifficulty: 8
  },
  {
    id: 'armed_robbery',
    offense: 'Highway Robbery',
    severity: 'Felony',
    typicalPunishment: 'Hanging at the crossroads where the crime occurred.',
    bountyMin: 500,
    bountyMax: 1500,
    detectionDifficulty: 4
  },
  {
    id: 'manslaughter',
    offense: 'Accidental Manslaughter',
    severity: 'Felony',
    typicalPunishment: 'Brand on the cheek and ten years banishment.',
    bountyMin: 300,
    bountyMax: 1000,
    detectionDifficulty: 3
  },
  {
    id: 'arson_forest',
    offense: 'Starting a Massive Forest Fire',
    severity: 'Felony',
    typicalPunishment: 'Execution by the local druidic assembly.',
    bountyMin: 1000,
    bountyMax: 4000,
    detectionDifficulty: 4
  },
  {
    id: 'mind_control_crime',
    offense: 'Using Enchantment Magic to Coerce',
    severity: 'Felony',
    typicalPunishment: 'Severing of the tongue to prevent vocal casting.',
    bountyMin: 2000,
    bountyMax: 8000,
    detectionDifficulty: 9
  },
  {
    id: 'counterfeiting_gold',
    offense: 'Minting Counterfeit Royal Gold',
    severity: 'Felony',
    typicalPunishment: 'Boiling in oil or pouring molten lead down the throat.',
    bountyMin: 5000,
    bountyMax: 10000,
    detectionDifficulty: 8
  },
  {
    id: 'desecration_major',
    offense: 'Desecrating a High Altar',
    severity: 'Felony',
    typicalPunishment: 'Excommunication and burning at the stake.',
    bountyMin: 1500,
    bountyMax: 5000,
    detectionDifficulty: 3
  },
  {
    id: 'slavery_ring',
    offense: 'Running an Underground Slave Ring',
    severity: 'Felony',
    typicalPunishment: 'Execution and property seizure, all proceeds going to victims.',
    bountyMin: 3000,
    bountyMax: 10000,
    detectionDifficulty: 8
  },
  {
    id: 'dragon_egg_theft',
    offense: 'Theft of a Dragon Egg',
    severity: 'Felony',
    typicalPunishment: 'Being handed over to the enraged dragon mother as tribute.',
    bountyMin: 10000,
    bountyMax: 50000,
    detectionDifficulty: 7
  },
  {
    id: 'demon_pact',
    offense: 'Signing a Warlock Pact with a Fiend',
    severity: 'Felony',
    typicalPunishment: 'Execution by the Inquisition to prevent soul corruption.',
    bountyMin: 5000,
    bountyMax: 15000,
    detectionDifficulty: 9
  },
  {
    id: 'biological_warfare',
    offense: 'Releasing a Plague in the Slums',
    severity: 'Felony',
    typicalPunishment: 'Quarantine with the infected until death, with no magical aid permitted.',
    bountyMin: 5000,
    bountyMax: 20000,
    detectionDifficulty: 8
  },
  {
    id: 'assassination_guild',
    offense: 'Operating an Unlicensed Assassination Ring',
    severity: 'Felony',
    typicalPunishment: 'Death by a licensed assassin.',
    bountyMin: 4000,
    bountyMax: 15000,
    detectionDifficulty: 9
  },
  {
    id: 'extortion_grand',
    offense: 'Extorting an Entire Town',
    severity: 'Felony',
    typicalPunishment: 'Life imprisonment in solitary confinement.',
    bountyMin: 1000,
    bountyMax: 5000,
    detectionDifficulty: 6
  },
  {
    id: 'necromancy_major',
    offense: 'Animating a Horde of Undead',
    severity: 'Felony',
    typicalPunishment: 'Execution, followed by cremation and blessing of the ashes to prevent raising.',
    bountyMin: 3000,
    bountyMax: 12000,
    detectionDifficulty: 5
  },
  {
    id: 'kidnapping_heir',
    offense: 'Kidnapping a Noble Heir',
    severity: 'Felony',
    typicalPunishment: 'Execution by hanging and display of the head on the city walls.',
    bountyMin: 5000,
    bountyMax: 25000,
    detectionDifficulty: 7
  },

  // ==========================================
  // TREASONS
  // ==========================================
  {
    id: 'regicide',
    offense: 'Regicide',
    severity: 'Treason',
    typicalPunishment: 'Public execution by beheading or hanging, followed by immolation.',
    bountyMin: 10000,
    bountyMax: -1,
    detectionDifficulty: 3
  },
  {
    id: 'espionage',
    offense: 'Espionage for a Foreign Power',
    severity: 'Treason',
    typicalPunishment: 'Interrogation through extreme measures, followed by public execution and hanging of the corpse.',
    bountyMin: 5000,
    bountyMax: 20000,
    detectionDifficulty: 9
  },
  {
    id: 'sedition',
    offense: 'Sedition and Inciting Rebellion',
    severity: 'Treason',
    typicalPunishment: 'Imprisonment in an isolation cell until the rebellion is fully suppressed, then execution.',
    bountyMin: 5000,
    bountyMax: 15000,
    detectionDifficulty: 6
  },
  {
    id: 'military_desertion',
    offense: 'Military Desertion During Wartime',
    severity: 'Treason',
    typicalPunishment: 'Summary execution by firing squad or beheading before the assembled regiment.',
    bountyMin: 1000,
    bountyMax: 5000,
    detectionDifficulty: 4
  },
  {
    id: 'royal_impersonation',
    offense: 'Impersonating Royalty or a High Official',
    severity: 'Treason',
    typicalPunishment: 'Tongue removal, branding, and permanent exile under pain of death.',
    bountyMin: 5000,
    bountyMax: 25000,
    detectionDifficulty: 6
  },
  {
    id: 'national_betrayal',
    offense: 'Selling State Secrets',
    severity: 'Treason',
    typicalPunishment: 'Death by the most drawn-out method available to the local executioner.',
    bountyMin: 10000,
    bountyMax: 50000,
    detectionDifficulty: 9
  },
  {
    id: 'coup_attempt',
    offense: 'Attempted Coup Against the Crown',
    severity: 'Treason',
    typicalPunishment: 'Drawn, quartered, and displayed on the city walls as a warning.',
    bountyMin: 25000,
    bountyMax: -1,
    detectionDifficulty: 4
  },
  {
    id: 'harboring_traitors',
    offense: 'Harboring Known Traitors',
    severity: 'Treason',
    typicalPunishment: 'Seizure of all property, imprisonment of entire household, and public trial.',
    bountyMin: 2000,
    bountyMax: 10000,
    detectionDifficulty: 7
  },
  {
    id: 'gate_betrayal',
    offense: 'Opening the City Gates to a Siege Army',
    severity: 'Treason',
    typicalPunishment: 'Execution by impalement outside the betrayed gates.',
    bountyMin: 50000,
    bountyMax: -1,
    detectionDifficulty: 5
  },
  {
    id: 'crown_theft',
    offense: 'Theft of the Crown Jewels',
    severity: 'Treason',
    typicalPunishment: 'Loss of hands followed by a public hanging.',
    bountyMin: 15000,
    bountyMax: 50000,
    detectionDifficulty: 8
  },
  {
    id: 'rebellion_funding',
    offense: 'Funneling Funds to a Rebellion',
    severity: 'Treason',
    typicalPunishment: 'Complete asset seizure and life in the deep mines.',
    bountyMin: 10000,
    bountyMax: 30000,
    detectionDifficulty: 8
  },
  {
    id: 'assassination_prince',
    offense: 'Assassination of the Crown Prince',
    severity: 'Treason',
    typicalPunishment: 'Drawn and quartered in the royal plaza.',
    bountyMin: 100000,
    bountyMax: -1,
    detectionDifficulty: 7
  },
  {
    id: 'alliance_sabotage',
    offense: 'Sabotaging a Peace Treaty',
    severity: 'Treason',
    typicalPunishment: 'Execution by the nation that was wronged by the sabotage.',
    bountyMin: 20000,
    bountyMax: 80000,
    detectionDifficulty: 8
  },
  {
    id: 'giving_secrets',
    offense: 'Selling the Defenses of the Citadel',
    severity: 'Treason',
    typicalPunishment: 'Beheaded and family stripped of all titles and lands.',
    bountyMin: 25000,
    bountyMax: 75000,
    detectionDifficulty: 8
  },
  {
    id: 'cult_infiltration',
    offense: 'Infiltrating the High Council for a Doomsday Cult',
    severity: 'Treason',
    typicalPunishment: 'Execution by the High Cleric\'s radiant fire.',
    bountyMin: 50000,
    bountyMax: 100000,
    detectionDifficulty: 9
  },
  {
    id: 'summon_tarrasque',
    offense: 'Awakening an Apocalyptic Beast',
    severity: 'Treason',
    typicalPunishment: 'There is rarely a city left to punish the offender; if caught, instant death.',
    bountyMin: 500000,
    bountyMax: -1,
    detectionDifficulty: 3
  },
  {
    id: 'blood_magic_royal',
    offense: 'Using Blood Magic on the Royal Bloodline',
    severity: 'Treason',
    typicalPunishment: 'Execution, complete erasure from all historical records.',
    bountyMin: 60000,
    bountyMax: 100000,
    detectionDifficulty: 8
  },
  {
    id: 'usurpation',
    offense: 'Declaring a False Kingship',
    severity: 'Treason',
    typicalPunishment: 'A crown of molten gold poured onto the offender\'s head.',
    bountyMin: 50000,
    bountyMax: 150000,
    detectionDifficulty: 2
  },
  {
    id: 'destroying_leyline',
    offense: 'Severing the Kingdom\'s Central Leyline',
    severity: 'Treason',
    typicalPunishment: 'Banishment to the Astral Void with no tether.',
    bountyMin: 100000,
    bountyMax: -1,
    detectionDifficulty: 5
  },
  {
    id: 'military_mutiny',
    offense: 'Leading a Mutiny in the Royal Navy',
    severity: 'Treason',
    typicalPunishment: 'Hanging from the mast of the flagship.',
    bountyMin: 15000,
    bountyMax: 45000,
    detectionDifficulty: 3
  },
  {
    id: 'poisoning_water_supply',
    offense: 'Poisoning the Capital\'s Aqueducts',
    severity: 'Treason',
    typicalPunishment: 'Drowning in a vat of the same poison.',
    bountyMin: 20000,
    bountyMax: 60000,
    detectionDifficulty: 7
  },
  {
    id: 'heresy_grand',
    offense: 'Declaring War on the Patron Deity of the Realm',
    severity: 'Treason',
    typicalPunishment: 'Handed directly over to the deity\'s avatar for judgment.',
    bountyMin: 50000,
    bountyMax: -1,
    detectionDifficulty: 2
  },
];

import type { VariantDef } from '../inventory/types';

export type BondTarget = 
  | "Family" 
  | "Rival" 
  | "Mentor" 
  | "Lover" 
  | "Organization" 
  | "Deity" 
  | "Relic" 
  | "Location" 
  | "Vengeance" 
  | "Debt";

/**
 * A deeply personal connection or commitment that defines a character's
 * motivations and loyalties. Bonds are first-person narrative statements
 * that tie the character to people, places, organizations, or ideals.
 */
export interface BondDef {
  id: string;
  name: string;
  target: BondTarget;
  variants: VariantDef[];
  mechanicalEffect?: string;
  weight: number;
}

/** Master list of all character bonds, organized by target pillar. */
export const BONDS: BondDef[] = [
  // ==========================================
  // FAMILY
  // ==========================================
  {
    id: 'lost_kin',
    name: 'The Lost Kin',
    target: 'Family',
    variants: [
      { name: 'Abducted Sibling', desc: 'My sibling was taken by raiders. I will burn the world to find them.' },
      { name: 'Missing Parent', desc: 'My father left ten years ago. I am retracing his bloody map.' },
      { name: 'Changeling Child', desc: 'The fey stole my trueborn child. I am hunting the Seelie court.' },
      { name: 'Separated Twin', desc: 'My twin and I were separated. I feel their pain across continents.' },
      { name: 'Lost Heir', desc: 'I must find the bastard child of my uncle to secure our lineage.' },
      { name: 'Indentured Child', desc: 'My parents sold my sibling. I save every copper to buy them back.' },
      { name: 'The Outcast', desc: 'My sibling was exiled for dark magic. I search for them in secret.' },
      { name: 'The Foundling', desc: 'Raised by wolves. I search the lands to find who abandoned me.' },
      { name: 'Prisoner Parent', desc: 'My mother rots in a political prison. I must launch a siege.' },
      { name: 'Amnesiac Kin', desc: 'My sibling wandered into a warzone. I must find them before the enemy does.' },
      { name: 'Sold Niece', desc: 'My brother sold his daughter for gambling debts. I am hunting the buyer.' },
      { name: 'Ghostly Guide', desc: 'The spirit of my sister guides me to our lost brother.' },
      { name: 'Kidnapped Spouse', desc: 'Cultists took my partner. I am tracking their ritual sites.' },
      { name: 'Orphan Maker', desc: 'I orphaned a distant cousin and now I must raise them.' },
      { name: 'Lost at Sea', desc: 'My uncle was swallowed by the ocean. I seek magic to dive the trench.' },
    ],
    mechanicalEffect: 'Tracking-related checks gain +1 when pursuing leads about missing kin.',
    weight: 30,
  },
  {
    id: 'clan_honor',
    name: 'Honor of the Clan',
    target: 'Family',
    variants: [
      { name: 'Stained Crest', desc: 'My grandfather fled a battle. I must perform deeds to cleanse the crest.' },
      { name: 'Usurped House', desc: 'Rivals slaughtered my house. I am the last survivor seeking violent return.' },
      { name: 'Ancestral Debt', desc: 'My family owes unquestioning military service to the monarch. I must serve.' },
      { name: 'Cursed Bloodline', desc: 'I suffer a generational curse. I must find the cure before my children inherit it.' },
      { name: 'Hidden Lineage', desc: 'I am the true heir to a fallen kingdom, hiding my identity.' },
      { name: 'Black Sheep', desc: 'I am a disappointment to my family. I adventure to prove them wrong.' },
      { name: 'Keeper of Forge', desc: 'My family maintained a sacred flame. I seek coal to keep it burning.' },
      { name: 'Dying House', desc: 'Our noble house is bankrupt. I adventure into ruins to refill coffers.' },
      { name: 'Traitor\'s Son', desc: 'My father betrayed the kingdom. I hunt his occult allies to absolve myself.' },
      { name: 'Sibling Rivalry', desc: 'My older sibling is the golden child. I must slay a beast to prove superiority.' },
      { name: 'Relic Guard', desc: 'I protect the ancestral sword until a true hero emerges from our line.' },
      { name: 'Name Reclaimer', desc: 'Our name was stricken from the royal registries. I will have it rewritten.' },
      { name: 'Banner Carrier', desc: 'I carry the shredded banner of our fallen legion. I must plant it in the capital.' },
      { name: 'Oath of Silence', desc: 'I swore not to speak until the man who disgraced my mother is publicly executed.' },
      { name: 'Bastard Pride', desc: 'Unrecognized by my noble father. I will build an empire larger than his.' },
    ],
    mechanicalEffect: 'Reputation gain is doubled when completing faction quests.',
    weight: 25,
  },

  // ==========================================
  // RIVAL
  // ==========================================
  {
    id: 'friendly_competitor',
    name: 'The Friendly Competitor',
    target: 'Rival',
    variants: [
      { name: 'Childhood Spar', desc: 'We trained together. We constantly race to see who can kill the most monsters.' },
      { name: 'Boastful Bard', desc: 'An annoying bard follows me, claiming my heroic deeds as their own.' },
      { name: 'Intellectual Equal', desc: 'A fellow wizard constantly tries to uncover magical secrets before I do.' },
      { name: 'Drinking Buddy', desc: 'We compete primarily in tavern brawls and wooing local nobility.' },
      { name: 'Aristocratic Snob', desc: 'A rich Noble adventurer mocks my peasant adventuring methods constantly.' },
      { name: 'Other Chosen One', desc: 'A prophecy named two heroes. We compete to see who the real one is.' },
      { name: 'Guild Rival', desc: 'We are in the same guild and aggressively undercut each other for bounties.' },
      { name: 'Ex-Lover', desc: 'We broke up horribly but still adventure in the same circles to show off.' },
      { name: 'Sibling-at-Arms', desc: 'They saved my life; I saved theirs. We keep a strict tally.' },
      { name: 'Reformed Thief', desc: 'A thief I arrested turned paladin and tries to out-righteous me.' },
      { name: 'Archery Rival', desc: 'We shoot arrows at the same targets simultaneously causing immense property damage.' },
      { name: 'Mercenary Cap', desc: 'We command rival squads. Every battle is a wager over a cask of ale.' },
      { name: 'Scholar Race', desc: 'We are racing to translate the same ancient tablet. Loser pays translation fees.' },
      { name: 'Climbing Rival', desc: 'We race to the top of any high wall, ignoring the actual quest.' },
      { name: 'Armor Critic', desc: 'We constantly belittle each other’s gear choices in good faith.' },
    ],
    mechanicalEffect: 'Gain 10% bonus experience when competing against a rival NPC in the same zone.',
    weight: 40,
  },
  {
    id: 'bitter_nemesis',
    name: 'The Bitter Nemesis',
    target: 'Rival',
    variants: [
      { name: 'Murderer', desc: 'This warlord slaughtered my village. I will draw steel on sight.' },
      { name: 'Magistrate', desc: 'Legally robbed me of my lands. I seek blackmail to ruin them.' },
      { name: 'Betrayer', desc: 'My former partner stabbed me in the back and left me for dead.' },
      { name: 'Dark Mirror', desc: 'A villain possessing my exact skill set but using it for sadism.' },
      { name: 'Fanatic', desc: 'An inquisitor who believes my existence is a blight and hunts me.' },
      { name: 'Poacher', desc: 'Hunts sacred beasts for profit. I am sworn to execute them.' },
      { name: 'Plague-Doctor', desc: 'Experiments brutally on peasants. I track their chemical runoff.' },
      { name: 'Bounty Placer', desc: 'The person who took the physical bounty to kill my parents.' },
      { name: 'Necromancer', desc: 'Resurrected my lover as a ghoul. I must break their phylactery.' },
      { name: 'Sovereign Assassin', desc: 'A legendary killer marked my name. I am hunting them before they find me.' },
      { name: 'Slaver King', desc: 'Chained my friends and sold them. I am dismantling his network.' },
      { name: 'Traitor Mage', desc: 'Sold our arcane secrets. I must silence him forever.' },
      { name: 'Arsonist', desc: 'Burned my temple to the ground. I will drown him in holy water.' },
      { name: 'Pretender', desc: 'Falsely claimed my royal title. I must expose the fraud.' },
      { name: 'Saboteur', desc: 'Intentionally collapsed the mine on my crew. I am bringing a pickaxe to his skull.' },
    ],
    mechanicalEffect: 'Attack damage increased by 5% against the designated nemesis target.',
    weight: 15,
  },

  // ==========================================
  // MENTOR
  // ==========================================
  {
    id: 'fallen_master',
    name: 'The Fallen Master',
    target: 'Mentor',
    variants: [
      { name: 'Dishonored General', desc: 'Stripped of rank for a crime they did not commit. I seek the true traitor.' },
      { name: 'Mad Archmage', desc: 'Lost their mind to the void. I must find a cure for their insanity.' },
      { name: 'Martyred Priest', desc: 'Sacrificed themselves to let me escape. I carry their holy texts.' },
      { name: 'Fallen Paladin', desc: 'Abandoned an oath and became a Blackguard. I am sworn to put them down.' },
      { name: 'Petrified Monk', desc: 'Turned to stone by a gorgon. I adventure to find basilisk tears.' },
      { name: 'Imprisoned Thief', desc: 'Rots in a maximum security dungeon. I am designing a heist to free them.' },
      { name: 'Cursed Ranger', desc: 'Contracted lycanthropy and fled. I track them to administer a cure.' },
      { name: 'Slain Gladiator', desc: 'Murdered before a championship match. I am hunting the syndicate.' },
      { name: 'Forgotten Hero', desc: 'Memory-wiped by a spell. I am the only one who remembers their legacy.' },
      { name: 'Betrayed Druid', desc: 'Executed for dark magic. I am secretly trying to finish his work.' },
      { name: 'Vampire Tutor', desc: 'Turned into a vampire lord against his will. I must deliver the final stake.' },
      { name: 'Ghost Sensei', desc: 'Murdered by rivals. His spirit trains me through cryptic dreams.' },
      { name: 'Exiled Alchemist', desc: 'Driven out by an angry mob. I am retrieving his hidden formula book.' },
      { name: 'Blinded Sniper', desc: 'Blinded by cruel torture. I act as their eyes while we hunt the torturers.' },
      { name: 'Broken King', desc: 'Dethroned and wandering the wastes. I serve as his sole kingsguard.' },
    ],
    mechanicalEffect: 'Skill experience gain from the mentor’s discipline is increased by 15%.',
    weight: 20,
  },
  {
    id: 'strict_teacher',
    name: 'The Strict Teacher',
    target: 'Mentor',
    variants: [
      { name: 'Swordsman', desc: 'Demands I defect a dragon in unassisted single combat before I graduate.' },
      { name: 'Grand Warlock', desc: 'Demands an escalating tithe of artifacts, threatening to revoke my powers.' },
      { name: 'Cryptic Hermit', desc: 'Speaks entirely in riddles. I adventure simply to figure them out.' },
      { name: 'Father-Figure', desc: 'I failed his final test. I am trying to earn the right to return.' },
      { name: 'Monastic Overseer', desc: 'Sent me into the world to test if my vow of pacifism can hold.' },
      { name: 'Cruel Taskmaster', desc: 'Brutally scarred me in training. I seek to return and beat him.' },
      { name: 'Ghostly Master', desc: 'A dead warlord ghost constantly critiques my swordplay from the grave.' },
      { name: 'Extortionist Mage', desc: 'Holds my magical license hostage. I must surrender 80% of my loot.' },
      { name: 'Perfectionist Maker', desc: 'Shattered my inferior blades. I seek a volcano to forge a perfect weapon.' },
      { name: 'Royal Tutor', desc: 'Expects me to secure a politically advantageous marriage. I ran away.' },
      { name: 'Silence Enforcer', desc: 'Requires ten years of complete silence. I communicate via notes.' },
      { name: 'Starvation Monk', desc: 'Banned me from eating meat. I sneak sausages constantly.' },
      { name: 'Drill Sergeant', desc: 'Ordered me to march across the continent in full plate mail.' },
      { name: 'Pain Guru', desc: 'Teaches that physical suffering brings enlightenment. I am always bruised.' },
      { name: 'Debt Collector Master', desc: 'Charges absurd instructional fees. I am paying off student loans.' },
    ],
    mechanicalEffect: 'Unlock a unique training quest chain with scaling difficulty rewards.',
    weight: 30,
  },

  // ==========================================
  // LOVER
  // ==========================================
  {
    id: 'tragic_romance',
    name: 'The Tragic Romance',
    target: 'Lover',
    variants: [
      { name: 'Nobility', desc: 'In love with a rival house. Discovery means starting a civil war.' },
      { name: 'Forbidden Fae', desc: 'In love with the Seelie court. Searching for a way to break my mortal coil.' },
      { name: 'Cursed Betrothed', desc: 'My partner turns into a monster at night. I seek a disenchantment.' },
      { name: 'Hostage Bride', desc: 'Taken hostage by a neighboring empire. I am infiltrating their court.' },
      { name: 'Ghostly Paramour', desc: 'My true love is an actual ghost. I am searching for a resurrection scroll.' },
      { name: 'Arranged Marriage', desc: 'Fleeing a horrific arranged marriage. I adventure to stay off the grid.' },
      { name: 'Demon Consort', desc: 'Slept with a succubus and now they will not stop ruining my dates.' },
      { name: 'Oblivious Savior', desc: 'Dedicated to a knight who does not know my name. I protect them.' },
      { name: 'Petrified Lover', desc: 'A literal stone statue in my courtyard. I need gorgon blood.' },
      { name: 'Time-Lost Spouse', desc: 'Thrown 500 years into the future. I am seeking chronomantic gates.' },
      { name: 'Amnesiac Love', desc: 'They completely forgot who I am. I recreate our first meeting perfectly.' },
      { name: 'Plague-Ridden', desc: 'Exiled to a leper colony. I am bringing them illegal medicines.' },
      { name: 'Cult Initiate', desc: 'Brainwashed by a doomsday cult. I am planning a violent extraction.' },
      { name: 'Doomed Prophecy', desc: 'Oracles state our union ends the world. We try to outrun destiny.' },
      { name: 'Assassin Contract', desc: 'I was hired to kill them. I faked their death instead.' },
    ],
    mechanicalEffect: 'Morale regeneration is halved, but critical hit chance increases by 3% when HP is below 25%.',
    weight: 15,
  },
  {
    id: 'devoted_partner',
    name: 'The Devoted Partner',
    target: 'Lover',
    variants: [
      { name: 'Dowry', desc: 'Demanded an absurd 10,000 gold dowry. I am adventuring entirely for the coin.' },
      { name: 'Illness Cure', desc: 'Bedridden with a wasting blight. I am exploring deep jungles for the Lotus flower.' },
      { name: 'Shared Dream', desc: 'We are saving up to buy an incredibly expensive coastal tavern.' },
      { name: 'Protecting Village', desc: 'I adventure to draw monsters actively away from the hamlet where they reside.' },
      { name: 'Arcane Conduit', desc: 'Funnels life-force into their binding ring to keep them physically alive.' },
      { name: 'Captive Heart', desc: 'A dragon demands tribute every month, or it will devour my spouse.' },
      { name: 'Reincarnated Soul', desc: 'Certain my companion is my dead spouse reincarnated.' },
      { name: 'Penance Quest', desc: 'Broke their heart through a mistake. Performing impossible labors for forgiveness.' },
      { name: 'War Courier', desc: 'Deployed on a vicious frontline. I cross battlefields just to deliver letters.' },
      { name: 'The Anchor', desc: 'My overwhelming love is the only thing keeping my patron from possessing me.' },
      { name: 'Supply Line', desc: 'My partner runs an orphanage. I funnel all unneeded weapons and gold there.' },
      { name: 'Shield-Mate', desc: 'We fight back to back. I will instinctively take any strike meant for them.' },
      { name: 'Spell-Sharer', desc: 'We share a soul-bond. If I drink a potion, they heal.' },
      { name: 'Jailguard', desc: 'My partner is securely locked in a magic cell to protect the world.' },
      { name: 'Distraction Arc', desc: 'They are performing a massive ritual. I am actively drawing all guards away.' },
    ],
    mechanicalEffect: 'Healing potions are 20% more effective when used on the bonded partner.',
    weight: 25,
  },

  // ==========================================
  // ORGANIZATION
  // ==========================================
  {
    id: 'order_loyalty',
    name: 'Order Loyalty',
    target: 'Organization',
    variants: [
      { name: 'Silver Hand', desc: 'Sworn knight of the Silver Hand. I execute undead abominations without hesitation.' },
      { name: 'Thieves Guild', desc: 'I kick up 20% to the Shadow-Brokers for absolute immunity from guards.' },
      { name: 'Scholars of Truth', desc: 'Prioritize dusty books and old tablets entirely over actual gold.' },
      { name: 'Druidic Circle', desc: 'Bound to protect grottos. I relentlessly sabotage lumber mills.' },
      { name: 'Assassin Creed', desc: 'Follow a strict code of killing. If the guild marks a target, I prioritize it.' },
      { name: 'Bards College', desc: 'Mandated to chronicle epic events. I put myself in lethal danger just to watch.' },
      { name: 'Inquisitorial Seal', desc: 'Posess a badge granting absolute authority to torture cultists. I use it often.' },
      { name: 'Mercenary Company', desc: 'Loyal to the Black Boars. If my party cannot match their pay, I switch sides.' },
      { name: 'Merchant Consortium', desc: 'Appraises all loot efficiently to give the consortium first bidding rights.' },
      { name: 'Cult of the Abyss', desc: 'Secretly laying magical groundwork in every city to summon an elder god.' },
      { name: 'Iron Watch', desc: 'A city guard to the core. I physically try to arrest dungeon monsters for trespassing.' },
      { name: 'Grave Diggers Union', desc: 'Ensures every single corpse receives a legally binding burial, charging fees.' },
      { name: 'King’s Eyes', desc: 'A royal spy mandated to report on the adventuring party’s political leanings.' },
      { name: 'Mage-Hunters', desc: 'Dedicated to tracking down unregistered rogue magic users and breaking their staffs.' },
      { name: 'Ratcatchers', desc: 'A deeply unglamorous guild. I am incredibly defensive heavily about pest control.' },
    ],
    mechanicalEffect: 'Organization vendors offer a 10% discount on all purchases.',
    weight: 35,
  },
  {
    id: 'hunted_deserter',
    name: 'The Hunted Deserter',
    target: 'Organization',
    variants: [
      { name: 'AWOL Soldier', desc: 'Fled a suicidal military charge. The marshals check taverns for my face.' },
      { name: 'Excommunicated Priest', desc: 'Preached heresy against a Pope. Templars have a standing bloody bounty on my head.' },
      { name: 'Burned Spy', desc: 'Government labeled me a traitor after I discovered a royal conspiracy.' },
      { name: 'Fledgling Cultist', desc: 'Realized the cult intended to end the world. Assassins stab at me from shadows.' },
      { name: 'Bankrupt Noble', desc: 'The Iron Bank placed a bounty on me after defaulting on a massive loan.' },
      { name: 'Blacklisted Mage', desc: 'Conducted forbidden necromancy. Banned from major cities employing arcane wards.' },
      { name: 'Rogue Pirate', desc: 'Mutinied against a pirate captain and failed. The armada hunts me ruthlessly.' },
      { name: 'Fugitive Slave', desc: 'Escaped the gladiator pits. Bounty hunters track me rigorously.' },
      { name: 'Oathbreaker', desc: 'Refused an order to slaughter innocents. My former knights consider me a traitor.' },
      { name: 'Marked Informant', desc: 'Snitched on the guild boss. Every pickpocket in the realm wants the price.' },
      { name: 'Failed Assassin', desc: 'Refused to kill a child target. The ledger demands my blood as replacement.' },
      { name: 'Runaway Bride', desc: 'Fled a massive political wedding. Both noble families are sending retrieval squads.' },
      { name: 'Smuggler Escapist', desc: 'Dropped the illicit cargo in the sea. The cartel wants the gold or my life.' },
      { name: 'AWOL Healer', desc: 'Refused to heal a tyrannical warlord. His reavers have tracked me across deserts.' },
      { name: 'Escaped Experiment', desc: 'Broked out of an alchemist vat. They want their biological property back.' },
    ],
    mechanicalEffect: 'Stealth checks in urban areas gain +2, but wanted posters reduce reputation.',
    weight: 15,
  },

  // ==========================================
  // DEITY
  // ==========================================
  {
    id: 'divine_champion',
    name: 'The Chosen Champion',
    target: 'Deity',
    variants: [
      { name: 'Sword of the Sun', desc: 'An angel handed me a glowing sword to purge vampires. I cannot refuse.' },
      { name: 'Oracle Vision', desc: 'Receive blinding migraines showing disasters. Compelled to specifically stop them.' },
      { name: 'Vow of Poverty', desc: 'Sworn entirely to give all excess wealth to the poor.' },
      { name: 'Storm Caller', desc: 'The Sea God demanded I sink a hundred pirate ships. I carve tallies on my staff.' },
      { name: 'Nature Warden', desc: 'Execute anyone using fire magic heavily within fifty miles of the woods.' },
      { name: 'War Anvil', desc: 'Magically forced into a berserker rage witnessing any act of profound cowardice.' },
      { name: 'Moon Dancer', desc: 'Must loudly praise the moon exactly every midnight, ruining party stealth completely.' },
      { name: 'Trickster Pawn', desc: 'My deity actively pranks me, turning my gold into screaming frogs.' },
      { name: 'Judar Scales', desc: 'Divinely compelled to execute thieves, even starving children. It causes immense grief.' },
      { name: 'Forge Spark', desc: 'Commanded to never sleep under a roof I did not build.' },
      { name: 'Silent Vow', desc: 'Commanded by the God of Secrets never to speak truths out loud.' },
      { name: 'Blood Tither', desc: 'The God of Death demands one pint of my own blood safely drained every dawn.' },
      { name: 'Grail Seeker', desc: 'My deity gave me visions of a mythic cup. I ignore all other requests.' },
      { name: 'Plague Eater', desc: 'The Goddess of Mercy forces me to magically absorb the diseases of peasants.' },
      { name: 'Chain Breaker', desc: 'Divinely commanded to shatter every physical chain or locked cage.' },
    ],
    mechanicalEffect: 'Radiant damage dealt is increased by 10%. Necrotic resistance +5.',
    weight: 10,
  },
  {
    id: 'cursed_by_heaven',
    name: 'Cursed by the Gods',
    target: 'Deity',
    variants: [
      { name: 'Betrayer Mark', desc: 'Bear a glowing scar. Good clerics distrust and refuse to heal me.' },
      { name: 'Storm Ire', desc: 'It rains exclusively locally on me, making camping utterly completely miserable.' },
      { name: 'Beast Hunger', desc: 'Cursed with endless gluttony. Must eat three times a normal ration perfectly or starve.' },
      { name: 'Ashen Touch', desc: 'Any non-magical plant I touch instantly withers. Druids efficiently despise me.' },
      { name: 'Truth Hex', desc: 'I vomit blood if I actively attempt to tell a deliberate lie.' },
      { name: 'Magnet Undead', desc: 'Zombies prioritize me in combat exclusively, completely ignoring my party entirely.' },
      { name: 'Gold Rot', desc: 'Physical coin held for exactly over 24 hours turns to lead. I must spend rapidly.' },
      { name: 'Shadowless One', desc: 'I completely cast explicitly no shadow. Peasants correctly assume I am a vampire.' },
      { name: 'Sleepless Curse', desc: 'Require no sleep but forced to experience terrifying auditory hallucinations.' },
      { name: 'Oracle Blindness', desc: 'Blind to anything closer than 10 feet but see miles. Melee combat is awful.' },
      { name: 'Salt Crier', desc: 'Weep solid grains of dry salt instead of pure water.' },
      { name: 'Gravity Spite', desc: 'Float upward into the sky if I do not carry heavy weights.' },
      { name: 'Ash Breather', desc: 'Cough clouds of dense soot instead of normal breath.' },
      { name: 'Mirror Breaker', desc: 'Any mirror I look directly into cracks completely.' },
      { name: 'Echo Thief', desc: 'My voice has no echo, causing a deeply unsettling physical presence.' },
    ],
    mechanicalEffect: 'One random stat is reduced by 2 at dawn. Another random stat increases by 2 at dusk.',
    weight: 10,
  },

  // ==========================================
  // RELIC
  // ==========================================
  {
    id: 'ancestral_weapon',
    name: 'The Bound Heirloom',
    target: 'Relic',
    variants: [
      { name: 'Sentient Sword', desc: 'My sword houses the soul of my grandfather. It critiques my technique telepathically.' },
      { name: 'Cursed Crown', desc: 'A circlet fused to my skull. It grants intelligence but drains stamina.' },
      { name: 'Demon-Core Shield', desc: 'My shield beats like a heart. Blocking damage feeds a trapped demon.' },
      { name: 'Endless Quiver', desc: 'Generates silver arrows. I must kill a beast every day or it shoots me.' },
      { name: 'Sun-Shard Prism', desc: 'Stores daylight. I keep it safely from vampire lords.' },
      { name: 'Executioner Axe', desc: 'Gets heavier for every innocent person I kill. It is currently very light.' },
      { name: 'Weeping Grimoire', desc: 'A spellbook bound in flesh that cries actual tears.' },
      { name: 'Clockwork Heart', desc: 'My heart was replaced with a brass engine. I must wind it every 12 hours.' },
      { name: 'Fallen Monarch Ring', desc: 'Whoever wears the ring is king. Thousands of assassins want my finger.' },
      { name: 'Mirror of Truth', desc: 'Reflects the subjective sins of whoever looks into it and shatters egos.' },
      { name: 'Gorgon Eye Amulet', desc: 'Briefly petrifies my left arm whenever I actively draw a weapon.' },
      { name: 'Dragon-Scale Cloak', desc: 'Makes me completely immune to fire but causes terrifying greed.' },
      { name: 'Kraken Ink-Well', desc: 'Produces infinite ink but all writing eventually curves gracefully into ominous warnings.' },
      { name: 'Lich Phylactery', desc: 'I swallowed it. If I am slain, the lich dies permanently.' },
      { name: 'Fey Lute', desc: 'Playing it causes trees to uproot and violently march on nearby towns.' },
    ],
    mechanicalEffect: 'The bound weapon gains +1 base damage per 10 character levels.',
    weight: 20,
  },
  {
    id: 'the_stolen_treasure',
    name: 'The Stolen Artifact',
    target: 'Relic',
    variants: [
      { name: 'Dragon Eye', desc: 'A gem stolen from my village. The volcano will erupt if unreturned.' },
      { name: 'Holy Grail', desc: 'The supreme relic of my church taken by heathens. It is my crusade.' },
      { name: 'Master Blueprints', desc: 'Rivals stole schematics to a world-ending infernal engine. I must destroy them.' },
      { name: 'The Phylactery', desc: 'A lich stole my soul and bound it into a phylactery across the sea.' },
      { name: 'Royal Seal', desc: 'The King signet ring was stolen on my watch. I cannot return without it.' },
      { name: 'Star-Metal Meteor', desc: 'The raw ore needed to forge my legendary paladin blade was hijacked.' },
      { name: 'City Deed', desc: 'A parchment granting absolute ownership of a metropolis. A thief snatched it.' },
      { name: 'Goddess Tears', desc: 'Three vials of curing water meant for the plague-wards were stolen by mercenaries.' },
      { name: 'Singing Sword', desc: 'An incredibly annoying magical sword was stolen. I hope to never see it again.' },
      { name: 'Last Dragon Egg', desc: 'Taken from the sanctuary I protect. It hatches in one month.' },
      { name: 'Abyssal Key', desc: 'The key to the demon gate was pickpocketed from me in a tavern.' },
      { name: 'Cursed Coin', desc: 'A coin that causes poverty. Someone stole it from me, and I must warn them.' },
      { name: 'Emperor Skull', desc: 'Grave-robbers took the skull of the first emperor. I am a royal retriever.' },
      { name: 'Time Glass', desc: 'An hourglass that reverses time by one hour. The thieves are abusing it.' },
      { name: 'Sun-Sword Hilt', desc: 'Cultists took the hilt. I have the blade. the two pieces must never touch.' },
    ],
    mechanicalEffect: 'Detection radius for the stolen relic increases as character level rises.',
    weight: 20,
  },

  // ==========================================
  // LOCATION
  // ==========================================
  {
    id: 'ruined_homestead',
    name: 'The Ruined Homeland',
    target: 'Location',
    variants: [
      { name: 'Ash-Fields', desc: 'My village was burned. I collect gold to pay a wish-caster to undo it.' },
      { name: 'Flooded City', desc: 'My kingdom sank into the ocean. I seek water-breathing relics to explore ruins.' },
      { name: 'Plagued Valley', desc: 'No crops grow. I search for a mythic druid capable of purifying soil.' },
      { name: 'Fractured Keep', desc: 'My ancestral castle is occupied by a gnoll warband. I am raising an army.' },
      { name: 'Cursed Spire', desc: 'My wizard-tower was locked in a pocket dimension by a rival.' },
      { name: 'Deserted Oasis', desc: 'The tribal well dried up. I track the subterranean water-thieves.' },
      { name: 'Blighted Forest', desc: 'Corrupted treants pushed my elven kin out. I must burn in the infected trees.' },
      { name: 'Frozen Pass', desc: 'Magically-induced winter froze my village. I am hunting the ice-witch.' },
      { name: 'Slaver Bay', desc: 'My coastal town was raided and everyone chained. I track the galleons.' },
      { name: 'Silent Monastery', desc: 'All the monks simply vanished overnight. I search the world for any clue.' },
      { name: 'Shattered Peak', desc: 'My mountain clan was crushed by falling rocks. I seek revenge against the giants.' },
      { name: 'Ghoulish Bog', desc: 'The graveyard sank into the swamp and the dead rose. I must purge my ancestors.' },
      { name: 'Salt-Flats', desc: 'My farmlands were cursed with salt. I search for a way to restore fertility.' },
      { name: 'The Void Crater', desc: 'A meteor struck my city. I am delving into the crater to find survivors.' },
      { name: 'Overgrown Ruins', desc: 'Vines crushed my town in a single night. I hunt the dark dryad responsible.' },
    ],
    mechanicalEffect: 'Crafting costs are reduced by 15% when rebuilding or constructing.',
    weight: 25,
  },
  {
    id: 'the_promised_land',
    name: 'The Promised Land',
    target: 'Location',
    variants: [
      { name: 'Aurathis', desc: 'I map a mythic lost city forged of raw gold. Everyone wants my map.' },
      { name: 'Fountain of Youth', desc: 'Terrified of death, I ruthlessly pursue the legendary healing springs.' },
      { name: 'Astral Gate', desc: 'The world is doomed. I search for a functional gateway to the upper planes.' },
      { name: 'Hollow Earth', desc: 'Convinced a subterranean utopia exists beneath the crust. I map deep caves.' },
      { name: 'Library of Babel', desc: 'I seek a mythic library containing every book ever written.' },
      { name: 'Dragon Graveyard', desc: 'A valley where elder dragons die. I seek the unfathomable wealth hidden there.' },
      { name: 'Isle of Blessed', desc: 'An island where no disease exists. I want to bring my family there.' },
      { name: 'Forge of Maker', desc: 'An abandoned volcano-forge. Only there can I forge the ultimate weapon.' },
      { name: 'Clockwork City', desc: 'A floating citadel governed by constructs. I wish to escape mortal politics.' },
      { name: 'World-Tree Roots', desc: 'The central nexus of druidic magic. I must reach it to plant a seed.' },
      { name: 'The Silent Peak', desc: 'A mountain summit where one can literally speak with the dead.' },
      { name: 'The Endless Tavern', desc: 'A mythic interdimensional pub. I just want a permanently good drink.' },
      { name: 'The Crystal Sea', desc: 'An ocean of liquid glass. I seek the ship capable of sailing it.' },
      { name: 'The Sunken Vault', desc: 'An underwater bank holding the wealth of ten dead empires.' },
      { name: 'The Peaceful Glade', desc: 'A simple clearing untouched by war. I adventure just to afford a house there.' },
    ],
    mechanicalEffect: 'Exploration experience gain is increased by 20%.',
    weight: 20,
  },

  // ==========================================
  // VENGEANCE
  // ==========================================
  {
    id: 'the_blood_debt',
    name: 'The Blood Debt',
    target: 'Vengeance',
    variants: [
      { name: 'Six-Fingers', desc: 'He slaughtered my father. I rehearsed my introduction a thousand times.' },
      { name: 'Traitor General', desc: 'Sold battle-plans to the enemy, killing my unit. I am the survivor.' },
      { name: 'Poisoner', desc: 'An assassin framed me for a monarch murder. I will clear my name.' },
      { name: 'Serial Killer', desc: 'A lunatic targets magic-users. I am acting as bait to draw them out.' },
      { name: 'Raid Leader', desc: 'The orc chieftain burned my farm. I track his warband picking them off.' },
      { name: 'Witch-Hunter', desc: 'Burned my innocent sister at the stake. I will show him real dark magic.' },
      { name: 'Mutineer', desc: 'My first mate threw me overboard. I build a crew to sink his vessel.' },
      { name: 'Arrogant Noble', desc: 'A duke trampled my child with a stagecoach. The law will not touch him.' },
      { name: 'Demon Patron', desc: 'A fiend saved my spouse but took her soul. I level up to kill a god.' },
      { name: 'The Monster', desc: 'A scarred dire-wolf took off my left arm. I will wear its pelt as a cloak.' },
      { name: 'Corrupt Judge', desc: 'Sentenced my innocent brother to hang. I am gathering evidence to hang him.' },
      { name: 'The Torturer', desc: 'He took my eye. I have his name on a bullet and search every tavern.' },
      { name: 'The Guild Master', desc: 'Stole my architectural designs and ruined my life. I am destroying his buildings.' },
      { name: 'The Necro-Thief', desc: 'Stole my grandmother’s corpse for horrific experiments. I am highly incensed.' },
      { name: 'The Betrothed', desc: 'Left me at the altar and stole the dowry. They will pay with interest.' },
    ],
    mechanicalEffect: 'Critical hit damage is increased by 10% against the specific vengeance target.',
    weight: 20,
  },
  {
    id: 'wrongful_imprisonment',
    name: 'Wrongful Imprisonment',
    target: 'Vengeance',
    variants: [
      { name: 'Forgotten Prisoner', desc: 'Rotted in a dungeon for 14 years because my best friend framed me.' },
      { name: 'Scapegoat', desc: 'The guild pinned an assassination on me. I spent a decade in salt mines.' },
      { name: 'Witch-Trial', desc: 'Drowned and survived, forced into hiding. Returning to enact holy fury.' },
      { name: 'Political Exile', desc: 'Banished under false treason charges. Gathering a mercenary army.' },
      { name: 'Asylum Patient', desc: 'Locked in a sanitarium because I saw horrors no one believed existed.' },
      { name: 'Debtor Prison', desc: 'Enslaved by infinite compound interest. I will burn down the Iron Vault.' },
      { name: 'Fae-Trap', desc: 'Trapped in the feywild for 50 years. Hunting the pixie who tricked me.' },
      { name: 'Petrified Victim', desc: 'Turned to stone for a century. Hunting the mage descendants out of spite.' },
      { name: 'Magic-Jar Host', desc: 'A wizard stole my body for 20 years. I got it back. Now I want his.' },
      { name: 'Shanghaied Sailor', desc: 'Forced to row in a galley for four years. Broke my chains to hunt the captain.' },
      { name: 'The Gallery Piece', desc: 'A medusa kept me as lawn art. I broke the curse and seek shattering revenge.' },
      { name: 'The Ice Block', desc: 'Frozen solid by a vindictive cryomancer. The thaw took ten miserable years.' },
      { name: 'The Painting Trap', desc: 'Trapped inside a magical canvas. I seek the painter who locked me in oil.' },
      { name: 'The Pit Fighter', desc: 'Chained and forced to fight for amusement. I am hunting the spectators now.' },
      { name: 'Mind-Wiped', desc: 'My memories were stolen to use me as a mindless drone. I want them back.' },
    ],
    mechanicalEffect: 'Lockpicking and escape checks gain +3. Resistance to fear effects +10%.',
    weight: 15,
  },

  // ==========================================
  // DEBT
  // ==========================================
  {
    id: 'soul_pact',
    name: 'The Sinister Pact',
    target: 'Debt',
    variants: [
      { name: 'Crossroads Demon', desc: 'Traded my soul for musical talent. Ten years are up in two weeks.' },
      { name: 'Warlock Bargain', desc: 'Patron demands a sacrifice every new moon, or my magic turns off and I die.' },
      { name: 'Firstborn Clause', desc: 'A hag claimed our firstborn child. My wife is pregnant. I must kill the hag.' },
      { name: 'Undead Servitude', desc: 'A lich resurrected me. If I stray from the objective, my flesh rots.' },
      { name: 'Arch-Fey Game', desc: 'I owe a favor to the Queen of Air and Darkness. She summmons me frequently.' },
      { name: 'Blood-Bound Oath', desc: 'Swore an oath to protect an annoying prince. If he gets scratched, I feel it tenfold.' },
      { name: 'Vampire Thrall', desc: 'Spared on the condition I act as a daylight spy. If I rebel, he will massacre my town.' },
      { name: 'Ghost Promise', desc: 'Promised to return a sword to a family. An angry ghost haunts my every step.' },
      { name: 'Divine Geas', desc: 'An angel placed a rune on my tongue; retreating from fiends turns me to salt.' },
      { name: 'Shadow Broker', desc: 'Memory erased in exchange for my life. I wake up covered in blood deeply confused.' },
      { name: 'The Devil Coin', desc: 'Whoever holds this coin owes their soul. I am trying to trick a villain into grabbing it.' },
      { name: 'The Genie Trap', desc: 'I wished for power and became bound to the lamp. I serve until I find a replacement.' },
      { name: 'The Blood Rune', desc: 'Carved on my chest. Whenever the dark lord takes damage, I bleed instead.' },
      { name: 'The Mirror Pact', desc: 'My reflection belongs to a demon. I cannot look into mirrors without seeing horrors.' },
      { name: 'The Debt of Sleep', desc: 'I traded my ability to sleep for magical power. I am slowly going completely insane.' },
    ],
    mechanicalEffect: 'Dark magic costs 15% less mana. Healing received from non-dark sources reduced by 10%.',
    weight: 10,
  },
  {
    id: 'monetary_extortion',
    name: 'The Crushing Ledger',
    target: 'Debt',
    variants: [
      { name: 'Syndicate Loan', desc: 'I owe the syndicate 50,000 gold. Bounty hunters break my ribs monthly.' },
      { name: 'Savior Debt', desc: 'A paladin lost an arm saving me. I am sworn to be his literal right hand.' },
      { name: 'Broken Artifact', desc: 'Shattered a priceless vase. I must work off the 100,000 gold debt.' },
      { name: 'The Ransom', desc: 'Pirates hold my daughter hostage. They demand an impossibly rare artifact.' },
      { name: 'Gambling Addict', desc: 'I owe money to every tavern and mayor. I adventure to run from collectors.' },
      { name: 'Resurrection Fee', desc: 'My cleric charged an exorbitant fee for a resurrection. I surrender 90% of my loot.' },
      { name: 'Mercenary Contract', desc: 'Signed a 10-year contract in blood. Breaking it costs my weight in platinum.' },
      { name: 'Orphan Benefactor', desc: 'Secretly fund an orphanage. Must send 500 gold monthly or children hit streets.' },
      { name: 'Dragon Hoard', desc: 'Stole a single gold coin. The dragon wants it back, plus massive interest.' },
      { name: 'Smuggler Loss', desc: 'Dumped illegal cargo to avoid wardens. I owe the warlord the full street value.' },
      { name: 'The Tax Man', desc: 'I owe decades of back taxes to a terrifyingly efficient royal audit office.' },
      { name: 'Blackmail Payoff', desc: 'A spy guild knows my darkest secret. I must leave gold at a dead-drop every week.' },
      { name: 'The Bridge Toll', desc: 'I crossed a troll bridge without paying. The troll clan is now actively suing me.' },
      { name: 'The Bribed Judge', desc: 'I must pay a corrupt magistrate monthly to keep my brother off the gallows.' },
      { name: 'The Shipwreck', desc: 'I crashed a borrowed merchant galleon. I will literally be paying for it forever.' },
    ],
    mechanicalEffect: 'Gold find rate increased by 10%, but 15% of gold is automatically deducted as debt payment.',
    weight: 30,
  }
];

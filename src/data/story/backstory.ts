/**
 * Backstory narrative template banks organized by section (origin, calling,
 * allegiance, present, destiny, closing, attribution, summary) and quality
 * tier (low, mid, high) based on the character's stats.
 */
export interface BackstoryContext {
    name: string;
    race: string;
    role: string;
    level: number;
    age: number;
    region: string;
    guild: string;
    faction: string;
    skills: string[];
    titles: string[];
    specialPowers: string[];
    highestStat: string;
}

export type TemplateFn = (c: BackstoryContext) => string;

// --- ORIGIN ---
export const ORIGIN_LOW: TemplateFn[] = [
    (c) => `Born in a forgettable hamlet in ${c.region}, ${c.name} was the kind of child everyone expected to become a turnip farmer. Fate, or perhaps a clerical error, had other plans.`,
    (c) => `The circumstances of ${c.name}'s birth in ${c.region} were wholly unremarkable. A perfectly average ${c.race} baby, destined for a perfectly average life—until they weren't.`,
    (c) => `Raised on the mean streets of ${c.region}, young ${c.name} learned that the only thing cheaper than talk is a goblin's promise. They weren't the strongest ${c.race}, but they were certainly the fastest runner.`,
    (c) => `There are prophecies of great heroes born during storms. ${c.name} was born on a Tuesday. It was drizzling slightly in ${c.region}.`,
    (c) => `${c.name}'s family in ${c.region} always said they had a face for radio and a brain for... well, they were strong.`,
    (c) => `As a child, ${c.name} was voted "Most Likely to Be Eaten by a Slime" by their peers in ${c.region}. They have so far defied expectations.`,
    (c) => `Born into a family of unsuccessful pie merchants in ${c.region}, ${c.name} sought a life with less dough and more danger.`,
    (c) => `${c.name}'s first memory is falling out of a tree in ${c.region}. It explains a lot about their current problem-solving skills.`,
    (c) => `Nobody in ${c.region} remembers exactly when ${c.name} was born, mostly because the village record keeper was prone to napping.`,
    (c) => `Raised by a single, very tired parent in ${c.region}, ${c.name} learned to be self-sufficient primarily so they could reach the cookie jar.`,
];

export const ORIGIN_MID: TemplateFn[] = [
    (c) => `Born amidst the rolling hills of the ${c.region}, ${c.name} was recognized early on as a prodigy among the ${c.race}. Village elders whispered of a potential that would one day outgrow their small borders, urging them toward a life of significance.`,
    (c) => `The ${c.region} is a harsh mistress, and surviving it as a young ${c.race} required more than just luck. ${c.name} forged a resilience there that has become the bedrock of their character, turning every hardship into a lesson in survival.`,
    (c) => `From humble beginnings in a dusty ${c.region} outpost, ${c.name} rose through sheer determination. While others were content with the status quo, they possessed a quiet, burning intensity that marked them for a path far beyond the horizon.`,
    (c) => `A child of two colliding worlds, ${c.name} was born on the volatile borderlands of ${c.region}. Growing up exposed to diverse cultures and constant skirmishes, they developed a unique adaptability and a broad perspective that few can match.`,
    (c) => `Orphaned by tragedy in a teeming ${c.region} metropolis, ${c.name} was forced to learn the hard lessons of independence before their time. This premature adulthood gifted them with a self-reliance that has become their greatest weapon and strongest shield.`,
    (c) => `The ancient ${c.race} clans of ${c.region} still tell tales of ${c.name}'s grandfather, a local hero. ${c.name} wakes every day with the weight of that legacy, striving tirelessly to ensure the family name remains synonymous with honor and strength.`,
    (c) => `Formal education was a luxury the ${c.region} could not afford ${c.name}, so they became a student of the wild. Reading the winds, the tides, and the tracks of beasts became second nature, granting them wisdom no library could contain.`,
    (c) => `Born under the auspicious light of the Harvest Moon in ${c.region}, ${c.name} has always possessed an uncanny knack for being exactly where they are needed most. Some call it luck; others suspect a subtle, guiding hand of fate.`,
    (c) => `The rigorous, militaristic discipline of their ${c.race} upbringing in ${c.region} instilled in ${c.name} an unshakeable moral compass. It points true north even in the deepest moral grey, guiding their blade and their word alike.`,
    (c) => `Endless conflicts ravaging ${c.region} forced ${c.name}'s family into a nomadic existence. This chaotic, wandering childhood bred a warrior who finds their only true peace in the eye of the storm, perfectly calm amidst the chaos of battle.`,
];

export const ORIGIN_HIGH: TemplateFn[] = [
    (c) => `The winds of ${c.region} whispered the name of ${c.name} centuries before they drew their first breath. Born under the catastrophic sign of the Comet, their arrival was not merely a birth, but a cosmic event marked by omens that silenced the greatest seers.`,
    (c) => `In the deep, sacred heart of ${c.region}, even the most conservative elders fell silent, sensing that ${c.name} carried the weight of an ancient, terrifying prophecy. They knew this child was not meant for a peaceful life, but to be a pivot upon which history would turn.`,
    (c) => `The chronicles of ${c.region} record age after age of heroes, but none like ${c.name}. Fate itself seemed to conspire to carve a path entirely their own, written in the stars with a script that burns the eyes of those who try to read it too closely.`,
    (c) => `${c.name} first drew breath beneath the ancient, starlit skies of ${c.region}, and the ${c.race} elders wept. They recognized a spark in the infant's eyes that burned brighter than the primordial forge-fires of old, promising both salvation and destruction.`,
    (c) => `Destiny did not merely knock on ${c.name}'s door; it battered it down with the force of a hurricane. Born to absolute greatness in ${c.region}, every step of their life has been guided by unseen, divine hands pushing them toward a final, earth-shattering confrontation.`,
    (c) => `When ${c.name} was born in ${c.region}, the local seers were struck blind by the sheer, overwhelming brilliance of their aura. It was a day where the sun seemed dim in comparison, and the gods themselves turned their gaze toward the mortal realm.`,
    (c) => `The blood of the First Kings, thought lost for millennia, flows through ${c.name}'s veins. This royal lineage was a secret kept hidden in the deepest vaults of ${c.region} until the world was ready—or desperate enough—for their return.`,
    (c) => `A celestial alignment unseen since the dawn of creation occurred over ${c.region} on the night of ${c.name}'s birth. The stars aligned to herald the arrival of a soul capable of challenging the very order of the cosmos.`,
    (c) => `Legend says the great elemental spirits of ${c.region} gathered in a physical storm to bless ${c.name}, granting them favor and power far beyond the capacity of any mortal vessel. They are less a ${c.race} and more a conduit for the world's will.`,
    (c) => `Born not of mere chance but of desperate cosmic necessity, ${c.name} entered ${c.region} as the universe's final answer to an encroaching, all-consuming darkness. They are the weapon forged by existence itself to fight the void.`,
];

// --- CALLING ---
export const CALLING_LOW: TemplateFn[] = [
    (c) => `${c.name} became a ${c.role} mostly by accident. They walked into the wrong room during a recruitment drive and were too embarrassed to leave.`,
    (c) => `It wasn't a noble calling that led ${c.name} to become a ${c.role}. It was mostly the need to pay off a substantial bar tab in ${c.region}.`,
    (c) => `Some are born to the blade, some have it thrust upon them. ${c.name} found a sword in a ditch and figured, "How hard can it be?"`,
    (c) => `Trying to impress a romantic interest, ${c.name} claimed to be a ${c.role}. By the time the lie was discovered, they had actually learned a thing or two.`,
    (c) => `A series of poor life choices led ${c.name} to the path of the ${c.role}. It beats farming, but only just.`,
    (c) => `The local ${c.role} guild in ${c.region} offered a free lunch for new recruits. ${c.name} has been stuck there ever since.`,
    (c) => `${c.name} originally wanted to be a bard, but was tone-deaf. Being a ${c.role} allows them to hit things instead of notes.`,
    (c) => `They lost a bet in a ${c.region} tavern. The terms? Become a ${c.role} for a year. That was ten years ago.`,
    (c) => `Mistaking the registry office for a bakery, ${c.name} signed up as a ${c.role}. They stayed for the uniform.`,
    (c) => `${c.name}'s parents told them to get a job or get out. "Adventuring ${c.role}" sounded like the option with the least paperwork.`,
];

export const CALLING_MID: TemplateFn[] = [
    (c) => `It was during a fateful, storm-lashed encounter that ${c.name} fully realized their aptitude as a ${c.role}. What began as raw, unpolished instinct has since been refined into a deadly mastery through years of unrelenting discipline.`,
    (c) => `A simple request to protect a traveling merchant turned into a lifelong odyssey. In the heat of that initial skirmish, the dormant skills of a ${c.role} awakened within ${c.name}, revealing a talent they could no longer ignore.`,
    (c) => `Betrayal sharpens the senses like a whetstone. After being grievously wronged by a trusted ally, ${c.name} swore to never be a victim again, channeling their fury and focus into the rigorous discipline of the ${c.role}.`,
    (c) => `For ${c.name}, becoming a ${c.role} was purely a matter of survival in the unforgiving ${c.region} wilds. What started as desperate self-defense has evolved into a unique, refined fighting style respected by peers and feared by predators.`,
    (c) => `Training under a notoriously strict mentor, ${c.name} embraced the demanding ways of the ${c.role}. The regimen was grueling, breaking them down to build them back up, eventually forging them into a warrior of uncommon capability.`,
    (c) => `The calling of the ${c.role} is an heirloom in their family. ${c.name} took up the mantle to honor a fallen sibling, carrying their memory into every battle and striving to live up to the potential they never reached.`,
    (c) => `Witnessing a gross injustice in the courts of ${c.region}, ${c.name} realized that words were wind, and only as a ${c.role} could they truly force the change the world needed.`,
    (c) => `A chance discovery of an ancient, moldering manual in the ruins of ${c.region} set ${c.name} on the solitary path of the ${c.role}. They are self-taught, their style a unique blend of old-world technique and modern improvisation.`,
    (c) => `Years of loyal service in the ${c.region} militia revealed that ${c.name}'s true talent lay not in formation drilling, but in the specialized, individual arts of the ${c.role}.`,
    (c) => `Inspired by crumbling tapestries and tales of old, ${c.name} left a life of comfort behind to pursue the romantic, dangerous perfection of the ${c.role}'s craft, seeking to embody the ideals of a bygone era.`,
];

export const CALLING_HIGH: TemplateFn[] = [
    (c) => `The path of the ${c.role} did not merely beckon to ${c.name}; it seized them. Witnessing a cataclysmic event that shattered the sky, they dedicated themselves to the discipline with a terrifying ferocity that frightened even their grandmasters.`,
    (c) => `Some say the ${c.role}'s path found ${c.name} through a blinding divine vision. Awakening dormant, god-touched abilities, they became a ${c.role} of exceptional, almost supernatural caliber, wielding power that hums with the song of creation.`,
    (c) => `The dusty, sealed scrolls of a forbidden library in ${c.region} revealed secrets meant only for ${c.name}'s eyes. They took up the mantle not for glory, but to preserve a dying, ancient art that holds the key to the world's survival.`,
    (c) => `It ran in the blood of kings and conquerors. ${c.name}'s ancestors were legendary ${c.role}s, and they have not only met that formidable legacy but completely surpassed it, setting a new standard for generations to come.`,
    (c) => `A near-death experience in the void-touched lands of ${c.region} unlocked something primal and terrifying in ${c.name}. They returned from the brink not just as a survivor, but as a living avatar of the ${c.role}, touched by death itself.`,
    (c) => `The gods themselves whispered the secrets of the ${c.role} into ${c.name}'s ear while they slept, granting them techniques that defy physics and logic.`,
    (c) => `${c.name} does not merely practice the arts of the ${c.role}; they are the living embodiment of its principles. To watch them fight is to watch a fundamental law of the universe in motion.`,
    (c) => `An ancient, sentient artifact reacted to ${c.name}'s touch, instantly granting them lifetimes of ${c.role} combat knowledge, merging their soul with the masters of the past.`,
    (c) => `Marked by a celestial event that turned the moon blood-red, ${c.name} was taken by the High Masters of ${c.region} to be trained as the ultimate ${c.role}, a weapon to kill gods.`,
    (c) => `To describe ${c.name} as a simple ${c.role} is to call a hurricane a breeze. They are a weapon forged by destiny, honed by the cosmos, and unleashed upon a trembling world.`,
];

// --- ALLEGIANCE (FULL) ---
export const ALLEGIANCE_FULL_LOW: TemplateFn[] = [
    (c) => `${c.name} somehow stumbled into the ${c.guild}. They mostly stick around for the free dental and the occasional ${c.faction} banquet leftovers.`,
    (c) => `The ${c.guild} needed a warm body, and ${c.name} was available. Their "alignment" with the ${c.faction} is mostly theoretical, involving a lot of nodding during speeches.`,
    (c) => `Paying dues to the ${c.guild} is a pain, but it keeps the ${c.faction} off ${c.name}'s back. It's a relationship built on bureaucracy and mutual tolerance.`,
    (c) => `Everyone in the ${c.guild} assumes ${c.name} is a deep-cover operative for the ${c.faction}. In reality, they just keep getting lost on the way to the mess hall.`,
    (c) => `${c.name} joined the ${c.guild} on a dare. The ${c.faction} membership was just part of the paperwork they didn't read.`,
    (c) => `The ${c.guild} provides a bunk, and the ${c.faction} provides a cloak. ${c.name} is just happy to be indoors.`,
    (c) => `${c.name} thinks the ${c.faction} motto is catchy, which is the primary reason they stay in the ${c.guild}.`,
    (c) => `They signed a contract with the ${c.guild} while drunk. The ${c.faction} lawyers say it's binding for another decade.`,
    (c) => `Being in the ${c.guild} impresses ${c.name}'s grandmother. The ${c.faction} politics are just background noise.`,
    (c) => `${c.name} wears the ${c.faction} tabard upside down half the time, much to the ${c.guild} master's annoyance.`,
];

export const ALLEGIANCE_FULL_MID: TemplateFn[] = [
    (c) => `Their growing reputation reached the ears of the ${c.guild}, who extended a formal invitation. Within the ranks, ${c.name} found a true purpose, aligning their personal code with the grander ${c.faction} vision.`,
    (c) => `Joining the ${c.guild} was a calculated, strategic decision. The ${c.faction}'s long-term agenda perfectly aligned with ${c.name}'s own beliefs, creating a solid, mutually beneficial partnership.`,
    (c) => `The ${c.guild} recognized a kindred spirit in the fiery heart of ${c.name}, and the ${c.faction} offered a cause worth fighting for. It provides a sense of belonging they had never known.`,
    (c) => `Operating as an enforcer for the ${c.guild} and a covert agent of the ${c.faction}, ${c.name} walks a fine line, balancing strict guild requisitions with delicate political goals.`,
    (c) => `The ${c.faction} needed a weapon, and the ${c.guild} provided ${c.name}. Over time, what began as a transaction has blossomed into a genuine, unshakeable loyalty to the cause.`,
    (c) => `${c.name} serves as a crucial liaison between the ${c.guild} and the ${c.faction}, proving to be a skilled diplomat as much as a fearsome warrior.`,
    (c) => `The ${c.guild} taught ${c.name} the meaning of discipline; the ${c.faction} gave them a direction for their anger. Together, they form the unshakable core of ${c.name}'s identity.`,
    (c) => `Rising rapidly through the ranks of the ${c.guild}, ${c.name} has become a trusted voice within the ${c.faction}'s inner circle, often consulted on matters of state.`,
    (c) => `Deeply believing in the ${c.faction}'s mission to stabilize the chaotic ${c.region}, ${c.name} uses the ${c.guild}'s extensive resources to tirelessly further the cause.`,
    (c) => `Loyalty to the ${c.guild} is paramount, but ${c.name} acknowledges that the ${c.faction} holds the keys to real, lasting change in the world.`,
];

export const ALLEGIANCE_FULL_HIGH: TemplateFn[] = [
    (c) => `In the hallowed halls of the ${c.guild}, ${c.name} is whispered about as a living legend. Their fanatical devotion to the ${c.faction} has become the stuff of myth, inspiring an entire generation of initiates.`,
    (c) => `The ${c.guild} and the ${c.faction} do not control ${c.name}; they unleash them. They are the unstoppable spearhead of the ${c.faction}'s will and the impenetrable shield of the Guild.`,
    (c) => `Bound by a blood oath to the ${c.guild} and by sacred honor to the ${c.faction}, ${c.name} serves two masters with a power that eclipses both, becoming the de facto leader of the alliance.`,
    (c) => `${c.name} is not merely a member; they are a pillar of the institution. Without them, the centuries-old alliance between the ${c.guild} and the ${c.faction} would likely crumble into dust.`,
    (c) => `The ${c.guild} taught ${c.name} how to fight; the ${c.faction} gave them a holy crusade. Now, they are a warrior-philosopher reshaping the world in their own image.`,
    (c) => `When ${c.name} speaks, the High Council of the ${c.guild} listens, and the ${c.faction} commanders obey. They are the architect of the new world order.`,
    (c) => `The ${c.faction} reveres ${c.name} as a living saint of the ${c.guild}, a divine instrument sent to enact their will upon the mortal plane.`,
    (c) => `Enemies of the ${c.faction} tremble at the mere mention of the ${c.guild}, solely because they know it houses the monster known as ${c.name}.`,
    (c) => `${c.name}'s name is etched in the adamantine foundation stones of the ${c.guild} hall, a testament to their eternal, undying service to the ${c.faction}.`,
    (c) => `To challenge the ${c.guild} is to challenge ${c.name}, and the ${c.faction} ensures that such foolishness is a swift death sentence.`,
];

// --- ALLEGIANCE (GUILD aka "WANDERER" usually, but here specifically Guild Only) ---
export const ALLEGIANCE_GUILD_LOW: TemplateFn[] = [
    (c) => `The ${c.guild} lets ${c.name} sleep in the common room, which is better than a ditch. Factions are too much work anyway.`,
    (c) => `${c.name} is technically a member of the ${c.guild}. They pay their dues, eventually, and try not to break too many things.`,
    (c) => `The ${c.guild} keeps ${c.name} around for "deniable assets." Which is a nice way of saying they do the jobs no one else wants.`,
    (c) => `Joining the ${c.guild} seemed like a good way to meet people. So far, ${c.name} has met a lot of angry goblins.`,
    (c) => `Faction politics confuse ${c.name}. The ${c.guild} is simple: do job, get coin, buy ale.`,
    (c) => `${c.name} uses the ${c.guild} membership card primarily to scrape mud off their boots.`,
    (c) => `The ${c.guild} librarian hates ${c.name}. ${c.name} doesn't know why, having never entered the library.`,
    (c) => `Being in the ${c.guild} makes ${c.name} feel important. The other members mostly feel annoyed.`,
    (c) => `${c.name} is the ${c.guild}'s unofficial mascot. It's not a paid position.`,
    (c) => `The only reason ${c.name} hasn't been kicked out of the ${c.guild} is that they make excellent coffee.`,
];

export const ALLEGIANCE_GUILD_MID: TemplateFn[] = [
    (c) => `Word of ${c.name}'s pragmatic exploits caught the attention of the ${c.guild}. They found a network of allies who shared their dedication to professional excellence.`,
    (c) => `The ${c.guild} offered ${c.name} a true home. Among fellow professional warriors, they honed their craft. Faction politics held no appeal — the brotherhood of the guild was family enough.`,
    (c) => `A deep dedication to the craft drew ${c.name} to the ${c.guild}. Here, they found mentors and rivals alike, pushing them to new heights of skill and strategy.`,
    (c) => `For ${c.name}, the ${c.guild} represents a collective of like-minded souls. They find strength in numbers without sacrificing their personal principles for a political cause.`,
    (c) => `The ${c.guild} is a mercenary outfit at heart, and that suits ${c.name} just fine. It's a clean business arrangement: they provide the muscle, the guild provides the contracts.`,
    (c) => `${c.name} has become a fixture at the ${c.guild} hall, known far and wide for their absolute reliability and steady hand in a crisis.`,
    (c) => `The darkest secrets of the ${c.guild} are safe with ${c.name}, who values professional discretion above fleeting glory.`,
    (c) => `Through the vast network of the ${c.guild}, ${c.name} has traveled across the breadth of ${c.region}, seeing sights others only dream of.`,
    (c) => `${c.name} now mentors the younger recruits of the ${c.guild}, passing on hard-won wisdom to the next generation of adventurers.`,
    (c) => `The ${c.guild} provides resources, and ${c.name} provides results. It is a harmonious, effective existence.`,
];

export const ALLEGIANCE_GUILD_HIGH: TemplateFn[] = [
    (c) => `The ${c.guild} does not merely claim ${c.name}; they revere them. A grandmaster of the craft, they stand as a paragon of the guild's highest, most ancient ideals.`,
    (c) => `Efficiency. Power. Mastery. ${c.name} embodies the ${c.guild} in its purest form. They have refused factional power because they are a power unto themselves.`,
    (c) => `Within the ${c.guild}, rank is earned through blood and deeds. ${c.name} has climbed to the absolute peak, earning the fear of enemies and the awe of peers.`,
    (c) => `The ${c.guild} called, and ${c.name} answered. Not for politics, but for access to forbidden, eldritch lore that only the guild's deep archives could provide.`,
    (c) => `Some join for power. ${c.name} *is* the power. The ${c.guild} is merely the vessel through which they reshape the commercial and martial landscape of the world.`,
    (c) => `The Grandmaster of the ${c.guild} bows to ${c.name}, acknowledging a superiority that transcends titles and rules.`,
    (c) => `${c.name} rewrote the ${c.guild}'s code of conduct simply by living it. Their actions are the new standard.`,
    (c) => `Artifacts locked away in the ${c.guild}'s deepest vaults answer only to the touch of ${c.name}, recognizing a master.`,
    (c) => `The ${c.guild} is no longer just an organization; it is the personal army of ${c.name}.`,
    (c) => `Legends of the ${c.guild} begin and end with the name of ${c.name}.`,
];

// --- ALLEGIANCE (NONE) ---
export const ALLEGIANCE_NONE_LOW: TemplateFn[] = [
    (c) => `${c.name} has no friends, no guild, and no money. But hey, total freedom, right?`,
    (c) => `Guilds require "competence" and "dues." ${c.name} prefers to stumble through life unburdened by such expectations.`,
    (c) => `Rejected by the major factions and banned from most respectable guilds, ${c.name} walks the solitary path.`,
    (c) => `A true freelancer, mostly because nobody else will hire them. ${c.name} answers only to their stomach.`,
    (c) => `${c.name} claims to be a "lone wolf." Most people just call them "unemployed."`,
    (c) => `The only thing ${c.name} is loyal to is their next meal. Even that relationship is rocky.`,
    (c) => `${c.name} tried to form a one-person guild once. It disbanded due to internal conflicts.`,
    (c) => `Wandering ${c.region} aimlessly, ${c.name} avoids commitment like the plague.`,
    (c) => `No master, no rules, no idea what they're doing. That's the ${c.name} way.`,
    (c) => `${c.name} is a free spirit, which is another way of saying they are hopelessly lost.`,
];

export const ALLEGIANCE_NONE_MID: TemplateFn[] = [
    (c) => `${c.name} walks their path alone. This independence comes at a steep cost, but grants a freedom most can only dream of.`,
    (c) => `Unbound by oaths or banners, ${c.name} charts their own course. A lone ${c.role}, answerable only to their grim conscience.`,
    (c) => `Trust is a currency ${c.name} spends sparingly. They remain a wildcard in the region's complex politics, owing nothing to anyone.`,
    (c) => `Offers have come from powerful guilds, but ${c.name} values autonomy above all. To belong to a group is to be owned by it.`,
    (c) => `Why complicate life with politics? ${c.name} keeps it simple: a sharp blade, the open road, and the horizon.`,
    (c) => `The solitude of the high road is where ${c.name} finds true clarity. Crowds only bring confusion and deceit.`,
    (c) => `Mercenaries for hire are common, but ${c.name} chooses their contracts with a discerning eye, serving only causes that amuse or enrich them.`,
    (c) => `In the dangerous wilds of ${c.region}, ${c.name} relies on no one but themselves. Reliance on others is a weakness.`,
    (c) => `Allegiances shift like sand in the wind. ${c.name} prefers the solid, unchanging ground of independence.`,
    (c) => `A masterless warrior, ${c.name} serves the realm by serving no one specific lord, acting as a force for balance.`,
];

export const ALLEGIANCE_NONE_HIGH: TemplateFn[] = [
    (c) => `In a world of rigid hierarchies, ${c.name} stands apart as a titan. A true ronin of the spirit, bowing to no king, emperor, or god.`,
    (c) => `The factions are mere puppets. ${c.name} refuses to see the strings. They are a force of nature, uncontrollable and undeniably powerful.`,
    (c) => `A knight without a lord? No, a lord without a kingdom. ${c.name} needs no banner to command respect; their mere presence is enough to silence a room.`,
    (c) => `The solitary road is for the strong. ${c.name} walks it not out of necessity, but out of sheer superiority.`,
    (c) => `History will remember ${c.name} as the One Who Walked Alone. Entire armies have broken against the cliff face of their solitary resolve.`,
    (c) => `${c.name} is a sovereign power of one. Nations negotiate with them as equals, and often with fear.`,
    (c) => `Banners fall and castles crumble, but ${c.name} remains. Unyielding. Unbound. Eternal.`,
    (c) => `To ally with ${c.name} is not to command them, but to pray they choose to share your path for a time.`,
    (c) => `The gods offered ${c.name} a place in the heavens. ${c.name} declined, preferring the untamed freedom of the earth.`,
    (c) => `There is no guild, faction, or empire large enough to hold the ambition of ${c.name}.`,
];

// --- PRESENT ---
export const PRESENT_LOW: TemplateFn[] = [
    (c) => `At level ${c.level}, ${c.name} is surprisingly still alive. They have mastered the art of running away significantly faster than their enemies.`,
    (c) => `${c.name}'s combat style is best described as "panicked flailing." Yet, at ${c.age} cycles, it seems to be working for them.`,
    (c) => `They say practice makes perfect. ${c.name} is still practicing. A lot.`,
    (c) => `Level ${c.level} and ${c.name} still gets nervous around goblins. But they show up, and that's half the battle.`,
    (c) => `Most ${c.role}s at this age have a collection of trophies. ${c.name} has a collection of near-death experiences and IOUs.`,
    (c) => `Currently, ${c.name} is level ${c.level} and trying to figure out which end of the weapon goes in the enemy.`,
    (c) => `At ${c.age} years old, ${c.name} has achieved the impressive feat of not dying yet.`,
    (c) => `${c.name} is level ${c.level}. Their mother is very proud, or at least she pretends to be.`,
    (c) => `The road to level ${c.level} was paved with dignity. ${c.name} tripped over most of it.`,
    (c) => `${c.name} fights with the grace of a drunken cow, but hey, level ${c.level} is level ${c.level}.`,
];

export const PRESENT_MID: TemplateFn[] = [
    (c) => `Now at ${c.age} cycles and level ${c.level}, ${c.name} has become a formidable ${c.role}. ${c.skills.length > 0 ? `Mastery of ${c.skills[0]} speaks to their elite training` : 'Their prowess is evident'}, and they move with the grace of a predator.`,
    (c) => `At level ${c.level}, ${c.name} stands as living proof that greatness is forged in fire. Their journey has been marked by triumph and tragedy, tempering them like steel.`,
    (c) => `The ${c.role} known as ${c.name} commands respect wherever they walk. ${c.age} cycles of hardship have tempered their ambition into cold, hard determination.`,
    (c) => `Time has been a harsh teacher, but a good one. At ${c.age}, ${c.name} moves with the confidence of a seasoned veteran who has seen everything.`,
    (c) => `Level ${c.level} represents a significant milestone. ${c.name} spends their days honing their craft, seeking new challenges that can truly test their limits.`,
    (c) => `With the hard-won experience of level ${c.level}, ${c.name} navigates the dangers of ${c.region} with calculated, lethal precision.`,
    (c) => `${c.name} has seen enough at ${c.age} years to know that every fight could be their last, and they fight with the intensity of a dying sun.`,
    (c) => `Reaching level ${c.level} is no small feat in these times. ${c.name} wears their scars as badges of honor, each one a story of survival.`,
    (c) => `The name ${c.name} is becoming known throughout ${c.region}, drawing both hopeful allies and jealous challengers.`,
    (c) => `At level ${c.level}, ${c.name} has transitioned from a mere survivor to a protector of others, a bulwark against the darkness.`,
];

export const PRESENT_HIGH: TemplateFn[] = [
    (c) => `At level ${c.level}, ${c.name} is less a ${c.role} and more a force of nature. Empires rise and fall at their whim, but they endure.`,
    (c) => `Legends are written by the victors, and ${c.name} holds the quill. With skills that rival the gods, they are a living myth made flesh.`,
    (c) => `The years have turned ${c.name}'s hair silver, but their power is absolute. Level ${c.level} represents a lifetime of gathered sorrow, wisdom, and strength.`,
    (c) => `Kings seek their counsel; monsters flee their shadow. ${c.name} has become a permanent fixture of history itself.`,
    (c) => `At ${c.age} cycles, ${c.name} has learned that the deadliest weapon is the mind. But their actual weapons are also apocalyptic instruments of destruction.`,
    (c) => `Level ${c.level} is a realm few mortals ever reach. ${c.name} walks among the divine as an equal.`,
    (c) => `The mere presence of ${c.name} alters the flow of magic in ${c.region}, bending reality to their will.`,
    (c) => `Time itself seems to bend around ${c.name}, respecting the sheer, overwhelming power of level ${c.level}.`,
    (c) => `At this dizzying height of power, ${c.name} no longer fights enemies; they erase them from existence.`,
    (c) => `The world is fragile in the hands of ${c.name}, who holds the strength of level ${c.level} with a heavy, solemn responsibility.`,
];

// --- DESTINY ---
export const DESTINY_LOW: TemplateFn[] = [
    (c) => `Fate whispers that ${c.name} might one day do something useful. Maybe next Tuesday.`,
    (c) => `The ${c.specialPowers.join(' and ')} they possess is potent, mostly because they haven't figured out how to turn it off yet.`,
    (c) => `Destiny seems to have a sense of humor regarding ${c.name}. They are destined to survive, likely out of sheer stubbornness.`,
    (c) => `If ${c.name} survives the next week, it will be a miracle. But miracles do happen.`,
    (c) => `The universe gave ${c.name} ${c.specialPowers.join(' and ')}. The universe is probably drunk.`,
    (c) => `Perhaps one day ${c.name} will master ${c.specialPowers.join(' and ')}. For now, they just hope not to singe their eyebrows.`,
    (c) => `There is a prophecy about a ${c.race} who trips over their own feet. It might be about ${c.name}.`,
    (c) => `${c.name}'s destiny is vague, irrelevant, and likely involves a lot of potatoes.`,
    (c) => `The stars are silent regarding ${c.name}. They're probably too embarrassed to comment.`,
    (c) => `Armed with ${c.specialPowers.join(' and ')}, ${c.name} is ready to mildly inconvenience evil.`,
];

export const DESTINY_MID: TemplateFn[] = [
    (c) => `The ${c.specialPowers.join(' and ')} flowing in ${c.name}'s veins is no coincidence. Ancient forces have taken notice, and they are watching.`,
    (c) => `Gifted with ${c.specialPowers.join(' and ')}, ${c.name} carries a heavy burden. The path ahead is shrouded in shadow, but they light it with their own power.`,
    (c) => `Scholars seek their counsel regarding the ${c.specialPowers.join(' and ')} they wield. It is both a magnificent gift and a terrible curse.`,
    (c) => `It is said those touched by ${c.specialPowers.join(' and ')} change the world. ${c.name} feels the crushing truth of this daily.`,
    (c) => `A prophecy speaks of a ${c.race} wielding ${c.specialPowers.join(' and ')}. ${c.name} walks a path laid down millennia ago.`,
    (c) => `The ${c.specialPowers.join(' and ')} grows stronger each day. ${c.name} must master it before it consumes them entirely.`,
    (c) => `Darkness gathers on the horizon, and ${c.name}'s ${c.specialPowers.join(' and ')} may be the only light strong enough to pierce it.`,
    (c) => `The fate of ${c.region} is irrevocably tied to the ${c.specialPowers.join(' and ')} that ${c.name} commands.`,
    (c) => `Every step brings ${c.name} closer to the terrible truth behind their ${c.specialPowers.join(' and ')}.`,
    (c) => `${c.name} knows that their ${c.specialPowers.join(' and ')} is a key. They just need to find the lock it opens.`,
];

export const DESTINY_HIGH: TemplateFn[] = [
    (c) => `${c.name} is not just a ${c.role}; they are a harbinger. The ${c.specialPowers.join(' and ')} marks them as the End of an Age and the beginning of another.`,
    (c) => `The universe does not give gifts like ${c.specialPowers.join(' and ')} without demanding a reckoning. ${c.name} *is* the reckoning.`,
    (c) => `Dreams of fire and ash plague ${c.name}... or perhaps they are memories of the future they will inevitably create.`,
    (c) => `To possess ${c.specialPowers.join(' and ')} is to be a god in all but name. ${c.name} walks towards a destiny that will shatter the heavens.`,
    (c) => `The only question remaining is whether ${c.name} will save the world or burn it to ash to build a better one.`,
    (c) => `Reality itself bends to accommodate the ${c.specialPowers.join(' and ')} of ${c.name}.`,
    (c) => `The gods watch with held breath as ${c.name} awakens the true potential of ${c.specialPowers.join(' and ')}.`,
    (c) => `${c.name} is the singularity. The ${c.specialPowers.join(' and ')} is the event horizon of their power.`,
    (c) => `Time, space, and fate—all are clay in the hands of ${c.name} and their ${c.specialPowers.join(' and ')}.`,
    (c) => `The final chapter of history will be written in the blinding light of ${c.name}'s ${c.specialPowers.join(' and ')}.`,
];

// --- CLOSING ---
export const CLOSING_LOW: TemplateFn[] = [
    (c) => `For now, ${c.name} just hopes there's a warm meal at the end of the road. Glory can wait.`,
    (c) => `${c.name}'s story is far from over, mostly because they owe too many people money to die yet.`,
    (c) => `The bard stopped singing about ${c.name} halfway through. It was getting depressing. But ${c.name} keeps walking.`,
    (c) => `History might not remember ${c.name}, but the local tavern keeper certainly will.`,
    (c) => `One foot after the other. That's ${c.name}'s strategy. It hasn't failed them... yet.`,
    (_) => `Maybe tomorrow will be better. Or at least less flammable.`,
    (c) => `${c.name} checks their coin purse. Empty. Time to find another job.`,
    (c) => `The sun sets, and ${c.name} is still alive. A successful day by any metric.`,
    (c) => `${c.name} sighs, adjusts their pack, and keeps moving. There's always another town.`,
    (c) => `Not a hero, not a villain, just ${c.name}. And that's enough for now.`,
];

export const CLOSING_MID: TemplateFn[] = [
    (c) => `What lies ahead remains unwritten. ${c.name} will usually be called upon to face challenges that would break lesser souls.`,
    (c) => `The tale of ${c.name} is far from over. Each day brings new threats, and a seasoned ${c.role} knows complacency is the enemy.`,
    (_) => `So continues the saga. The world is vast, and there are still dragons to slay and secrets to uncover.`,
    (c) => `History will judge ${c.name} by what they became. The ink is still wet on their page of history.`,
    (c) => `From ${c.region} to the ends of the earth, ${c.name} has left footprints others will follow for generations.`,
    (c) => `The journey is the destination, and ${c.name} walks with purpose and resolve.`,
    (c) => `With eyes fixed on the horizon, ${c.name} steps forward into the unknown, ready for anything.`,
    (c) => `The legend grows, one deed at a time. ${c.name} is ready for whatever comes next.`,
    (c) => `Rest is for the weary, and ${c.name} is not tired yet.`,
    (c) => `The world is changing, and ${c.name} changes with it, always adapting, always enduring.`,
];

export const CLOSING_HIGH: TemplateFn[] = [
    (c) => `${c.name} looks to the horizon, not as an adventurer, but as a conqueror of fate. The world holds its breath in anticipation.`,
    (c) => `The fire in ${c.name}'s eyes rivals the stars. As long as they draw breath, the very foundations of reality are in flux.`,
    (c) => `Let the bards sing. ${c.name} has moved beyond song, into the realm of eternal myth.`,
    (c) => `When the sun sets on the age, it will be ${c.name} standing amidst the twilight, sword in hand.`,
    (c) => `The Legend of ${c.name} has only just begun. Gods help whatever stands in their way.`,
    (c) => `Eternity awaits. ${c.name} steps forward to claim their throne among the legends.`,
    (c) => `The silence that follows ${c.name} is not empty; it is full of awe and terror.`,
    (c) => `And so, ${c.name} ascends, leaving the mortal world behind to walk among the stars.`,
    (c) => `There are no more roads to travel, only new worlds to forge. ${c.name} begins their work.`,
    (c) => `Fear not the dark, for ${c.name} is the light that will burn forever.`,
];

export const ATTRIBUTION_LOW: TemplateFn[] = [
    (c) => `— Scribbled on a tavern napkin by ${c.name}, found under a table`,
    (c) => `— Overheard in a crowded market, likely exaggerated by ${c.name}`,
    (_) => `— From a rejected Guild application form, sadly unstamped`,
    (_) => `— Scratched into a wooden post outside a stable, barely legible`,
    (c) => `— Claims made by ${c.name} after their third tankard of ale`,
    (c) => `— A story told by ${c.name}'s mother to anyone who would listen`,
    (_) => `— Rumored among the village children, though adults are skeptical`,
    (c) => `— Found in a diary titled "The Future Legend" by ${c.name}`,
    (c) => `— As bragged about by ${c.name} to a very unimpressed barmaid`,
    (_) => `— Note pinned to a quest board, largely ignored by serious adventurers`,
    (c) => `— Graffiti in a back alley of ${c.region}, undeniably ${c.name}'s handwriting`,
    (_) => `— From a letter sent home, detailing "heroic" deeds`,
    (c) => `— Part of a monologue delivered by ${c.name} to a stray cat`,
    (_) => `— Written on a piece of parchment used to wrap fish`,
    (_) => `— An anecdote shared by the town guard, mostly for a laugh`,
    (c) => `— Fragment of a "memoir" started and abandoned by ${c.name}`,
    (c) => `— Gossip from the local washerwomen about ${c.name}'s "adventures"`,
    (c) => `— A tale ${c.name} insists is true, despite lack of witnesses`,
    (_) => `— Etched into a table at The Rusty Spoon inn`,
    (_) => `— Recovered from the trash bin behind the Adventurer's Guild`,
    (c) => `— A self-proclaimed title that ${c.name} uses when introducing themselves`,
];

export const ATTRIBUTION_MID: TemplateFn[] = [
    (c) => `— Excerpt from the ${c.region} Archives, Entry: ${c.name}`,
    (c) => `— Notes from the ${c.guild !== 'None' ? c.guild : 'Wanderer'}'s Registry: ${c.name}`,
    (c) => `— Documented by the ${c.region} City Watch`,
    (_) => `— From the official logbook of a merchant caravan escort`,
    (_) => `— A recognized account in the Guild's quarterly report`,
    (_) => `— Letter of commendation from a local magistrate`,
    (c) => `— Included in "Notable Figures of the ${c.region}" (local edition)`,
    (c) => `— Verified by the scribes of the ${c.guild !== 'None' ? c.guild : 'Library'}`,
    (_) => `— Recorded testimony from the Battle of the Silent Hill`,
    (_) => `— Inscription on a commemorative plaque in a small village`,
    (_) => `— As detailed in the captain's log of the ship "Sea's Fury"`,
    (c) => `— Field report filed by a ${c.faction} scout`,
    (_) => `— Mentioned in a dispatch to the regional governor`,
    (_) => `— A story traded by veteran mercenaries around a campfire`,
    (_) => `— Footnote in a treatise on modern combat techniques`,
    (_) => `— Preserved in the private collection of a minor noble`,
    (_) => `— Standard entry in the Adventurer's Who's Who`,
    (_) => `— Citation for bravery, signed by the town mayor`,
    (_) => `— Referenced in a bard's ballad, "The Steel and the Storm"`,
    (_) => `— From the case files of the Royal Inquisitor (Case #402)`,
];

export const ATTRIBUTION_HIGH: TemplateFn[] = [
    (_) => `— From The Eternal Chronicles, Vol. IV: The Age of Heroes`,
    (_) => `— Carved into the living rock of the World's Foundation`,
    (_) => `— Whispered with reverence by the clerics of the High Temple`,
    (_) => `— As foretold in the Prophecy of the Seven Stars`,
    (_) => `— Engraved on the Tomb of Kings, a warning to all who follow`,
    (_) => `— The final entry in the Book of Fate, written in gold`,
    (_) => `— Legend spoken by the Elder Dragons to their wyrmlings`,
    (_) => `— Preserved in the Crystal Archives of the Timeless One`,
    (c) => `— From the mythos of ${c.name}, the Unbroken`,
    (_) => `— A sacred text guarded by the Order of the Silent Blade`,
    (_) => `— Etched upon the shield of the First Paladin`,
    (_) => `— Sung by the Celestial Choir at the dawn of the New Age`,
    (_) => `— Recorded on the obsidian pillars of the Nether Realm`,
    (_) => `— The only mortal name spoken by the God of War`,
    (_) => `— Found in the ashes of a destroyed empire, the sole surviving record`,
    (_) => `— A tale that makes even Demon Lords tremble`,
    (_) => `— Inscribed on the sword that severed the Night`,
    (_) => `— From the Secret History of the World, Chapter: "The Ascension"`,
    (_) => `— Remembered by the earth itself, long after cities crumble`,
    (c) => `— The Saga of ${c.name}, Who Defied the Sky`,
];

// --- SUMMARY ---
export const SUMMARY_LOW: TemplateFn[] = [
    (c) => `${c.name}, a level ${c.level} ${c.race} ${c.role} from ${c.region}. ${c.guild !== 'None' ? `Runs with the ${c.guild}.` : 'A wanderer without ties.'} ${c.specialPowers.length > 0 ? `Shows signs of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `A ${c.race} ${c.role} of ${c.level} seasons, ${c.name} hails from ${c.region}. ${c.guild !== 'None' ? `Recently joined the ${c.guild}.` : 'Prefers to work alone.'} ${c.specialPowers.length > 0 ? `Touched by ${c.specialPowers.join(', ')}.` : ''}`.trim(),
    (c) => `${c.name} — ${c.race}, ${c.role}, level ${c.level}. Born somewhere in ${c.region}. ${c.guild !== 'None' ? `Part of the ${c.guild}, mostly for the pay.` : 'No guild, no master.'} ${c.specialPowers.length > 0 ? `Gifted with ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `They call them ${c.name}. Level ${c.level} ${c.race} ${c.role}, from the rough side of ${c.region}. ${c.guild !== 'None' ? `${c.guild} member, for now.` : 'Answers to nobody.'} ${c.specialPowers.length > 0 ? `Blessed — or cursed — with ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `${c.name}: a scrappy level ${c.level} ${c.race} ${c.role} trying to make a name in ${c.region}. ${c.guild !== 'None' ? `Affiliated with the ${c.guild}.` : 'Going it alone.'} ${c.specialPowers.length > 0 ? `Strangely gifted with ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `Just another ${c.race} ${c.role} from ${c.region} — or so ${c.name} would have you believe. Level ${c.level}. ${c.guild !== 'None' ? `Member of the ${c.guild}.` : 'A lone wolf.'} ${c.specialPowers.length > 0 ? `Harbors the power of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `Level ${c.level}. ${c.race}. ${c.role}. ${c.region}. ${c.name} doesn't need a longer introduction. ${c.guild !== 'None' ? `The ${c.guild} vouches for them.` : 'Nobody vouches for them.'} ${c.specialPowers.length > 0 ? `Wielder of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `${c.name} is a ${c.race} ${c.role} (Lv. ${c.level}) who grew up in ${c.region}. ${c.guild !== 'None' ? `Currently serving under the ${c.guild} banner.` : 'Unaffiliated.'} ${c.specialPowers.length > 0 ? `Possesses ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `From the backroads of ${c.region} comes ${c.name}, a level ${c.level} ${c.race} ${c.role}. ${c.guild !== 'None' ? `The ${c.guild} took a chance on them.` : 'Still searching for a place to belong.'} ${c.specialPowers.length > 0 ? `Touched by ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `${c.name}, ${c.race} ${c.role}. Level ${c.level}, out of ${c.region}. ${c.guild !== 'None' ? `Proud member of the ${c.guild}.` : 'A free agent.'} ${c.specialPowers.length > 0 ? `Carries the gift of ${c.specialPowers.join(' and ')}.` : 'Nothing special — yet.'}`.trim(),
];

export const SUMMARY_MID: TemplateFn[] = [
    (c) => `${c.name}, a seasoned level ${c.level} ${c.race} ${c.role} from ${c.region}. ${c.guild !== 'None' ? `A respected operative of the ${c.guild}.` : 'A lone wanderer of growing renown.'} ${c.specialPowers.length > 0 ? `Gifted with ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `Known across ${c.region}, ${c.name} is a level ${c.level} ${c.race} ${c.role} whose reputation precedes them. ${c.guild !== 'None' ? `Key member of the ${c.guild}.` : 'Beholden to none.'} ${c.specialPowers.length > 0 ? `Wields the power of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `${c.name} — level ${c.level} ${c.race} ${c.role}, forged in the fires of ${c.region}. ${c.guild !== 'None' ? `The ${c.guild} considers them indispensable.` : 'Their loyalty is to the road and the blade.'} ${c.specialPowers.length > 0 ? `Marked by ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `A veteran ${c.race} ${c.role} of level ${c.level}, ${c.name} has carved a name into the history of ${c.region}. ${c.guild !== 'None' ? `Trusted ally of the ${c.guild}.` : 'Trusts only their own instincts.'} ${c.specialPowers.length > 0 ? `Bearer of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `Few in ${c.region} haven't heard of ${c.name}, the level ${c.level} ${c.race} ${c.role}. ${c.guild !== 'None' ? `They serve the ${c.guild} with distinction.` : 'Their allegiance is their own.'} ${c.specialPowers.length > 0 ? `Empowered by ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `${c.name}: ${c.race} ${c.role}, level ${c.level}. A name that commands respect in ${c.region}. ${c.guild !== 'None' ? `Senior member of the ${c.guild}.` : 'A masterless blade.'} ${c.specialPowers.length > 0 ? `Touched by the rare gift of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `The ${c.race} ${c.role} called ${c.name} (Lv. ${c.level}) is well-established in ${c.region}. ${c.guild !== 'None' ? `The ${c.guild} relies on them for critical operations.` : 'Operates independently, by choice.'} ${c.specialPowers.length > 0 ? `Commands ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `${c.name}, a battle-tested level ${c.level} ${c.race} ${c.role} from the heart of ${c.region}. ${c.guild !== 'None' ? `Decorated agent of the ${c.guild}.` : 'A mercenary of principle.'} ${c.specialPowers.length > 0 ? `Blessed with ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `At level ${c.level}, ${c.name} stands among the finest ${c.race} ${c.role}s in ${c.region}. ${c.guild !== 'None' ? `The ${c.guild} counts them among their elite.` : 'Walks their own path.'} ${c.specialPowers.length > 0 ? `Channeler of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `From ${c.region} rises ${c.name}, a level ${c.level} ${c.race} ${c.role} whose deeds speak louder than titles. ${c.guild !== 'None' ? `Pillar of the ${c.guild}.` : 'Bound to no banner.'} ${c.specialPowers.length > 0 ? `Infused with ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
];

export const SUMMARY_HIGH: TemplateFn[] = [
    (c) => `${c.name} — the legendary level ${c.level} ${c.race} ${c.role}, whose very name reshapes the fate of ${c.region}. ${c.guild !== 'None' ? `Supreme champion of the ${c.guild}.` : 'Beyond the need for allegiance.'} ${c.specialPowers.length > 0 ? `Master of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `They say the world itself bends around ${c.name}, the level ${c.level} ${c.race} ${c.role} of ${c.region}. ${c.guild !== 'None' ? `The ${c.guild} exists, in part, because of them.` : 'A force unto themselves.'} ${c.specialPowers.length > 0 ? `Harbinger of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `${c.name}: level ${c.level} ${c.race} ${c.role}. A living legend of ${c.region}, spoken of in hushed tones. ${c.guild !== 'None' ? `The ${c.guild}'s greatest weapon.` : 'Answers only to destiny.'} ${c.specialPowers.length > 0 ? `Vessel of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `The chronicles of ${c.region} devote entire chapters to ${c.name}, the level ${c.level} ${c.race} ${c.role}. ${c.guild !== 'None' ? `The ${c.guild} was forever changed by their presence.` : 'No guild could contain them.'} ${c.specialPowers.length > 0 ? `Conduit of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `${c.name}, level ${c.level}. ${c.race}. ${c.role}. Words fail to capture what ${c.region} witnessed when they arrived. ${c.guild !== 'None' ? `The ${c.guild} kneels to their judgment.` : 'Sovereign of their own fate.'} ${c.specialPowers.length > 0 ? `Ordained wielder of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `Where ${c.name} walks, ${c.region} trembles. Level ${c.level} ${c.race} ${c.role} — a title that barely contains them. ${c.guild !== 'None' ? `The soul of the ${c.guild}.` : 'Allegiance is beneath them.'} ${c.specialPowers.length > 0 ? `Ascended through ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `To speak the name ${c.name} is to invoke a legend. Level ${c.level} ${c.race} ${c.role}, born of ${c.region}, shaped by war. ${c.guild !== 'None' ? `The ${c.guild} owes its glory to them.` : 'Beholden to neither king nor god.'} ${c.specialPowers.length > 0 ? `Crowned by ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `${c.name} — ${c.race} ${c.role}, level ${c.level}. The very stars shifted when they were born in ${c.region}. ${c.guild !== 'None' ? `The ${c.guild} was reforged in their image.` : 'A storm that walks alone.'} ${c.specialPowers.length > 0 ? `Embodiment of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `History will remember ${c.name}, the level ${c.level} ${c.race} ${c.role} who changed everything in ${c.region}. ${c.guild !== 'None' ? `The ${c.guild} erected monuments in their honor.` : 'Monuments rise where they walk.'} ${c.specialPowers.length > 0 ? `Transcendent master of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
    (c) => `The myth, the legend, the nightmare — ${c.name}. Level ${c.level} ${c.race} ${c.role} from ${c.region}. ${c.guild !== 'None' ? `Even the ${c.guild} fears what they might become.` : 'Unbound, unchained, unstoppable.'} ${c.specialPowers.length > 0 ? `Avatar of ${c.specialPowers.join(' and ')}.` : ''}`.trim(),
];

// --- FACTION-SPECIFIC BACKSTORY POOLS ---
// These provide faction-flavored fragments that complement the tier-based sections above.

/** Military/guard factions (Royal Guard, Wardens, Sentinels, Champions, etc.) */
export const FACTION_MILITARY_POOL: TemplateFn[] = [
    (c) => `The ${c.faction} recruited ${c.name} after witnessing them hold a bridge alone against a warband. The ${c.guild} filed the paperwork; the scars told the real story.`,
    (c) => `Every morning before dawn, ${c.name} drills with the ${c.faction}'s elite vanguard. The ${c.guild} considers them the finest blade on the roster, though ${c.name} would never say so.`,
    (c) => `${c.name} took the ${c.faction}'s oath of service kneeling in the blood of a fallen comrade. The ${c.guild} gave them a rank; the dead gave them purpose.`,
    (c) => `Duty is not a word to ${c.name} — it is the marrow of their bones. The ${c.faction}'s banner has flown over every battlefield they have survived, and the ${c.guild} ensures their valor is remembered.`,
    (c) => `When the ${c.faction} needed a living shield for their commanding officer, ${c.name} stepped forward without hesitation. The ${c.guild} promoted them on the spot, stinking of gore and grinning through broken teeth.`,
    (c) => `The rigid discipline of the ${c.faction} suits ${c.name} like a fitted gauntlet. Within the ${c.guild}, they have earned the reputation of being incorruptible — a rare and dangerous quality.`,
    (c) => `${c.name} was pulled from the wreckage of a ${c.faction} outpost as the sole survivor. The ${c.guild} rebuilt them, physically and spiritually, into something far more lethal than what the enemy had tried to destroy.`,
    (c) => `The ${c.faction}'s war councils rely on ${c.name}'s tactical instincts. Where the ${c.guild} provides structure, ${c.name} provides the killing edge that turns retreats into routs.`,
    (c) => `Loyalty to the ${c.faction} is carved into ${c.name}'s flesh — literally, in the form of ritual campaign tattoos. Each line represents a siege survived under the ${c.guild}'s banner.`,
    (c) => `They say the ${c.faction}'s enemies have nightmares about ${c.name}. The ${c.guild}'s intelligence officers confirm this is not metaphorical — captured prisoners have woken screaming the name.`,
];

/** Scholarly/arcane factions (Arcanists, Scholars, Mages, Lorekeepers, etc.) */
export const FACTION_ARCANE_POOL: TemplateFn[] = [
    (c) => `The ${c.faction} granted ${c.name} access to the Restricted Archive after they solved a cipher that had baffled the ${c.guild}'s senior scholars for three centuries.`,
    (c) => `${c.name}'s research into the volatile intersection of ley lines and planar boundaries has earned them both acclaim and suspicion within the ${c.faction}. The ${c.guild} watches closely.`,
    (c) => `Within the crystalline lecture halls of the ${c.faction}, ${c.name} is known as 'the Unorthodox.' The ${c.guild} disapproves of their methods but cannot argue with the results.`,
    (c) => `The ${c.faction}'s elders whisper that ${c.name} communes with forces beyond mortal comprehension. The ${c.guild} has assigned two minders to ensure those conversations remain... productive.`,
    (c) => `A catastrophic experiment nearly cost ${c.name} their sanity, but it also unlocked a theorem the ${c.faction} had deemed impossible. The ${c.guild} funded the rebuilding of the wing they destroyed.`,
    (c) => `${c.name} catalogues forbidden grimoires for the ${c.faction}, a task that has left their eyes permanently tinged with an eldritch violet glow. The ${c.guild} pretends not to notice.`,
    (c) => `The ${c.faction}'s annual symposium was disrupted when ${c.name} publicly challenged the Grand Magister's thesis on aetheric resonance. They were correct. The ${c.guild} has never fully forgiven them.`,
    (c) => `Recruitment into the ${c.faction} was not optional for ${c.name}. Their raw, untrained talent was considered too dangerous to leave unmonitored by the ${c.guild}'s containment protocols.`,
    (c) => `${c.name} spends their nights translating dead languages for the ${c.faction}, each decoded passage bringing them closer to a truth that the ${c.guild}'s founders deliberately buried.`,
    (c) => `The ${c.faction}'s wardstones respond to ${c.name}'s presence with a low, harmonic resonance. The ${c.guild}'s abjurers are fascinated; the other students are terrified.`,
];

/** Criminal/shadow factions (Assassins, Marauders, Raiders, Smugglers, etc.) */
export const FACTION_SHADOW_POOL: TemplateFn[] = [
    (c) => `${c.name} doesn't officially exist. The ${c.faction} erased every record of their birth, and the ${c.guild} provided a new name, a new face, and a very sharp blade.`,
    (c) => `Trust is a liability in the ${c.faction}, but ${c.name} has earned something close to it. The ${c.guild} trusts them to complete contracts that would make lesser operatives vomit.`,
    (c) => `The ${c.faction}'s black ledger contains a single word next to ${c.name}'s codename: 'indispensable.' The ${c.guild} accountants translate this as 'too expensive to betray.'`,
    (c) => `${c.name} rose through the ${c.faction}'s ranks by eliminating every predecessor. The ${c.guild} considers this an acceptable form of career advancement.`,
    (c) => `Smuggling contraband through ${c.region}'s most fortified checkpoints is routine for ${c.name}. The ${c.faction} provides the goods; the ${c.guild} provides the alibis.`,
    (c) => `The ${c.faction} found ${c.name} in a prison cell, sentenced to hang at dawn. They offered a reprieve and a purpose. The ${c.guild} offered them the keys to every locked door in the underworld.`,
    (c) => `${c.name}'s knife work is a thing of terrible artistry. The ${c.faction} employs them for jobs requiring a message, not just a body. The ${c.guild} ensures the message is received.`,
    (c) => `Every coin that flows through the ${c.faction}'s territory passes through ${c.name}'s ledger first. The ${c.guild} has learned that their mathematical precision is far deadlier than any poison.`,
    (c) => `The ${c.faction} operates in the shadows, and ${c.name} is the shadow's shadow. The ${c.guild}'s spymasters consider them a ghost — present everywhere, visible nowhere.`,
    (c) => `${c.name} was born in the gutter and raised by the ${c.faction}'s cutthroats. The ${c.guild} polished the rough diamond into a weapon of exquisite, ruthless elegance.`,
];

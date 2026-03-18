export type MediaCategory =
  | "tedx"
  | "tv-show"
  | "dismantle-racism"
  | "podcast"
  | "radio"
  | "interview"
  | "inspiration";

export interface MediaItem {
  id: string;
  title: string;
  category: MediaCategory;
  description: string;
  youtubeId?: string;
  externalUrl?: string;
  date?: string;
  episode?: number;
  tags: string[];
  accessTier: "free" | "premium";
}

export const categoryLabels: Record<MediaCategory, string> = {
  tedx: "TEDx",
  "tv-show": "Sacred Intelligence TV",
  "dismantle-racism": "Dismantle Racism",
  podcast: "Podcast Guest",
  radio: "Radio",
  interview: "Interview",
  inspiration: "Sunday Dose of Inspiration",
};

export const mediaItems: MediaItem[] = [
  // TEDx
  {
    id: "tedx-wounded",
    title: "Wounded by Religion: Healed by the Sacred",
    category: "tedx",
    description:
      "Reverend Dr. Curry's TEDx NewBedford talk exploring how misinterpretations of religious doctrine traumatize individuals and how Sacred Intelligence provides the path to healing.",
    youtubeId: "v6Lrt1A9fLI",
    date: "2017",
    tags: ["wounded by religion", "church hurt", "healing", "tedx"],
    accessTier: "free",
  },

  // Sacred Intelligence TV Episodes
  {
    id: "sitv-ep1-eileen-kaplan",
    title: "Eileen Kaplan — Breast Cancer 'Thriver'",
    category: "tv-show",
    episode: 1,
    description:
      "Eileen Kaplan shares her journey as a breast cancer thriver and the role of Sacred Intelligence in healing.",
    youtubeId: "AjLH7NY9mds",
    tags: ["breast cancer", "healing", "resilience"],
    accessTier: "free",
  },
  {
    id: "sitv-ep2-marilyn-dayton",
    title: "Marilyn Dayton — Domestic Violence Awareness",
    category: "tv-show",
    episode: 2,
    description:
      "Marketing business professional Marilyn Dayton discusses domestic violence awareness and empowerment.",
    youtubeId: "2CGooQ9r6iM",
    tags: ["domestic violence", "awareness", "empowerment"],
    accessTier: "free",
  },
  {
    id: "sitv-ep3-amy-cannatta",
    title: "Amy Cannatta",
    category: "tv-show",
    episode: 3,
    description:
      "Dr. Amy Cannatta joins the show to discuss personal transformation.",
    youtubeId: "tR0hy2uPSh8",
    tags: ["transformation", "chiropractic", "wellness"],
    accessTier: "free",
  },
  {
    id: "sitv-ep4-eileen-kaplan-2",
    title: "Dr. Amy Cannatta — Transitions",
    category: "tv-show",
    episode: 4,
    description:
      "Chiropractor and fashion consultant Dr. Amy Cannatta explores navigating life transitions.",
    youtubeId: "6yLGqOE4MrU",
    tags: ["transitions", "transformation", "wellness"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep5-donald-bliss-pt1",
    title: "Donald Bliss, LCSW — Self Acceptance (Part I)",
    category: "tv-show",
    episode: 5,
    description:
      "Licensed clinical social worker Donald Bliss discusses the journey to self-acceptance.",
    youtubeId: "OcI_hlvqn4U",
    tags: ["self-acceptance", "self-ish", "mental health"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep6-donald-bliss-pt2",
    title: "Donald Bliss, LCSW — Self Acceptance (Part II)",
    category: "tv-show",
    episode: 6,
    description:
      "Part two of the self-acceptance conversation with Donald Bliss, LCSW.",
    youtubeId: "sva2AoSsPQ8",
    tags: ["self-acceptance", "self-ish", "mental health"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep7-marlecia-autrey",
    title: "Marlecia Autrey — Embracing Others Through Self Reflection",
    category: "tv-show",
    episode: 7,
    description:
      "Consultant Marlecia Autrey discusses how self-reflection strengthens our ability to embrace others.",
    youtubeId: "w4bJPkZy7ls",
    tags: ["self-reflection", "shared", "embracing others"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep8-healthy-relationships",
    title: "Developing Healthy Relationships",
    category: "tv-show",
    episode: 8,
    description:
      "An exploration of what it takes to develop and maintain healthy relationships.",
    youtubeId: "y054e5XbiHs",
    tags: ["relationships", "shared", "healthy relationships"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep9-camilla-ross",
    title: "Camilla Ross — Celebrating Your Gifts",
    category: "tv-show",
    episode: 9,
    description:
      "Camilla Ross shares the importance of recognizing and celebrating your unique gifts.",
    youtubeId: "JX9cAe2L5bE",
    tags: ["gifts", "celebration", "self-ish"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep10-maximizing-si",
    title: "Dr. Terrlyn L. Curry Avery — Maximizing Your Sacred Intelligence",
    category: "tv-show",
    episode: 10,
    description:
      "Dr. Curry Avery, Pastologist, discusses how to maximize your Sacred Intelligence for a fulfilling life.",
    youtubeId: "4Zm8dZ_NqpY",
    tags: ["sacred intelligence", "maximizing potential", "pastologist"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep11-dorothy-martin-neville",
    title: "Dr. Dorothy Martin-Neville — Living Your Dreams",
    category: "tv-show",
    episode: 11,
    description:
      "Mentor coach Dr. Dorothy Martin-Neville shares strategies for living your dreams.",
    youtubeId: "ZAWGIOpUztI",
    tags: ["dreams", "coaching", "transformation"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep12-suicide-awareness",
    title: "Josh Rivedal & Camilla Ross — Suicide Awareness and Prevention",
    category: "tv-show",
    episode: 12,
    description:
      "Actor/speaker Josh Rivedal and theater producer Camilla Ross discuss suicide awareness and prevention.",
    youtubeId: "VQzvdzYijw8",
    tags: ["suicide awareness", "prevention", "mental health"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep13-paula-jean-burns",
    title: "Paula Jean Burns — Live Your Life",
    category: "tv-show",
    episode: 13,
    description:
      "The Queen of the HeartVoice Connection, Paula Jean Burns, discusses living your life fully.",
    youtubeId: "p3GOgSexssw",
    tags: ["heart", "voice", "living fully"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep14-kymberley-clemons-jones",
    title: "Kymberley Clemons-Jones — Bouncing Back After Trauma",
    category: "tv-show",
    episode: 14,
    description:
      "Restoration life coach Kymberley Clemons-Jones shares insights on bouncing back after trauma.",
    youtubeId: "p_vJTDxCt4o",
    tags: ["trauma", "resilience", "restoration"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep15-catherine-ewing",
    title: "Catherine Ewing — Emotional Freedom",
    category: "tv-show",
    episode: 15,
    description:
      "Transformational life coach Catherine Ewing explores the path to emotional freedom.",
    youtubeId: "5Z-1H9cvc54",
    tags: ["emotional freedom", "transformation", "coaching"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep16-marie-berry",
    title: "Marie Berry — Managing Your Finances",
    category: "tv-show",
    episode: 16,
    description:
      "Financial consultant Marie Berry discusses managing finances as part of holistic well-being.",
    youtubeId: "EsGd9nnifdo",
    tags: ["finances", "empowerment", "practical tools"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep17-estelle-bogdonoff",
    title: "Estelle Bogdonoff — Achieving Optimal Health",
    category: "tv-show",
    episode: 17,
    description:
      "Health coach Estelle Bogdonoff shares strategies for achieving optimal health.",
    youtubeId: "GRce-0WVRq8",
    tags: ["health", "wellness", "optimal health"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep18-leslie-karen-hammond",
    title: "Leslie Karen Hammond — Overcoming The Fear of Public Speaking",
    category: "tv-show",
    episode: 18,
    description:
      "The Confident Speaking Expert Leslie Karen Hammond discusses overcoming the fear of public speaking.",
    youtubeId: "lSQQu8OWiqg",
    tags: ["public speaking", "confidence", "fear"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep19-jan-hoath",
    title: "Jan Hoath — The Happiness Prism",
    category: "tv-show",
    episode: 19,
    description:
      "Happiness Heroine Jan Hoath explores the happiness prism and finding joy in everyday life.",
    youtubeId: "_pkPVw11iNQ",
    tags: ["happiness", "joy", "well-being"],
    accessTier: "premium",
  },
  {
    id: "sitv-ep20-racism-perspectives",
    title: "Clayton Potter & Khaleed Fields — Black Males' Perspectives on Racism in 2015",
    category: "tv-show",
    episode: 20,
    description:
      "Clayton Potter and Khaleed Fields share their perspectives as Black men navigating racism in America.",
    youtubeId: "x9-STXT98LU",
    tags: ["happiness", "joy", "well-being"],
    accessTier: "premium",
  },

  // Sunday Dose of Inspiration
  {
    id: "sdi-fear-freedom",
    title: "Fear to Freedom",
    category: "inspiration",
    description:
      "A Sunday message on moving from fear-based living to freedom through Sacred Intelligence.",
    youtubeId: "Wd4p1LMzVXQ",
    tags: ["fear", "freedom", "inspiration"],
    accessTier: "free",
  },
  {
    id: "sdi-struggle-optional",
    title: "Struggle Is Optional",
    category: "inspiration",
    description:
      "How to ignore your ego and listen to your Sacred Intelligence.",
    youtubeId: "Xj3GNxqwHfA",
    tags: ["struggle", "ego", "sacred intelligence"],
    accessTier: "free",
  },

  // Dismantle Racism with Rev. Dr. TLC (talkradio.nyc)
  {
    id: "dr-ep1",
    title: "Justice for Life Itself",
    category: "dismantle-racism",
    episode: 1,
    description:
      "Dr. TLC opens the series exploring what it means to pursue justice as a way of life — and how Sacred Intelligence grounds that pursuit.",
    youtubeId: "n-QA_FQFkoI",
    tags: ["justice", "dismantling racism", "sacred intelligence"],
    accessTier: "free",
  },
  {
    id: "dr-ep2",
    title: "Starting With the Self",
    category: "dismantle-racism",
    episode: 2,
    description:
      "The work of dismantling racism begins with self-examination. Dr. TLC guides listeners through the internal work required for external change.",
    youtubeId: "RNjOAI8LG5Q",
    tags: ["self-work", "dismantling racism", "self-ish"],
    accessTier: "free",
  },
  {
    id: "dr-ep3",
    title: "Courtlandt Butts",
    category: "dismantle-racism",
    episode: 3,
    description:
      "A conversation with Courtlandt Butts about navigating race, identity, and the work of dismantling systemic racism.",
    youtubeId: "uFBvhwwW-xY",
    tags: ["identity", "dismantling racism", "conversation"],
    accessTier: "free",
  },
  {
    id: "dr-ep4",
    title: "Aligning With Our Divine Selves",
    category: "dismantle-racism",
    episode: 4,
    description:
      "Exploring how spiritual alignment and Sacred Intelligence create the foundation for dismantling racism from within.",
    youtubeId: "uFNsjSWj62o",
    tags: ["divine", "alignment", "sacred intelligence"],
    accessTier: "premium",
  },
  {
    id: "dr-ep5",
    title: "Racism & Religion",
    category: "dismantle-racism",
    episode: 5,
    description:
      "A deep look at the intersection of racism and religion — how faith has been both weaponized and wielded for liberation.",
    youtubeId: "THeoSe7BNMo",
    tags: ["religion", "racism", "faith"],
    accessTier: "premium",
  },
  {
    id: "dr-ep6",
    title: "Why We Need Black Books",
    category: "dismantle-racism",
    episode: 6,
    description:
      "The importance of Black literature, storytelling, and the written word in dismantling systemic racism.",
    youtubeId: "2Q-dUCJH3ro",
    tags: ["literature", "Black books", "storytelling"],
    accessTier: "premium",
  },
  {
    id: "dr-ep7",
    title: "Menopause Disparity",
    category: "dismantle-racism",
    episode: 7,
    description:
      "How racial disparities manifest in women's health — specifically menopause — and why this matters in the fight for equity.",
    youtubeId: "akLRZwnNo2Q",
    tags: ["health", "women", "disparity"],
    accessTier: "premium",
  },
  {
    id: "dr-ep8",
    title: "Stories Matter",
    category: "dismantle-racism",
    episode: 8,
    description:
      "The narratives we tell shape the world we live in. Dr. TLC explores how stories can either reinforce or dismantle racism.",
    youtubeId: "bTAL9W5zeWU",
    tags: ["storytelling", "narrative", "dismantling racism"],
    accessTier: "premium",
  },
  {
    id: "dr-ep9",
    title: "All That Jazz",
    category: "dismantle-racism",
    episode: 9,
    description:
      "Exploring the role of jazz and Black musical traditions in cultural identity and the dismantling of racism.",
    youtubeId: "N5MbTQsXuTA",
    tags: ["jazz", "music", "culture"],
    accessTier: "premium",
  },
  {
    id: "dr-ep10",
    title: "The Power of Legacy and Culture",
    category: "dismantle-racism",
    episode: 10,
    description:
      "How legacy and culture shape our understanding of race and empower communities to create lasting change.",
    youtubeId: "65eVB_j8qbs",
    tags: ["legacy", "culture", "empowerment"],
    accessTier: "premium",
  },
  {
    id: "dr-ep11",
    title: "From Othering to Honoring",
    category: "dismantle-racism",
    episode: 11,
    description:
      "Moving beyond the dehumanization of 'othering' toward a practice of honoring every person's sacred humanity.",
    youtubeId: "rS3vWo7a2z4",
    tags: ["othering", "honoring", "humanity"],
    accessTier: "premium",
  },
  {
    id: "dr-ep12",
    title: "Coming to the Table",
    category: "dismantle-racism",
    episode: 12,
    description:
      "What it takes to come to the table with honest intention — the difficult conversations that lead to healing.",
    youtubeId: "qOIFyfJS868",
    tags: ["dialogue", "healing", "reconciliation"],
    accessTier: "premium",
  },
  {
    id: "dr-ep13",
    title: "Politics, Race, Sexuality, and More",
    category: "dismantle-racism",
    episode: 13,
    description:
      "An intersectional conversation about how politics, race, and sexuality are deeply connected in the fight for justice.",
    youtubeId: "HKtnVU4HP8o",
    tags: ["politics", "intersectionality", "sexuality"],
    accessTier: "premium",
  },
  {
    id: "dr-ep14",
    title: "The Edge of Everyday",
    category: "dismantle-racism",
    episode: 14,
    description:
      "Racism lives in the everyday — the micro-moments, the systems, the habits. Dr. TLC examines where it hides in plain sight.",
    youtubeId: "NJcMEJ_qTOw",
    tags: ["everyday racism", "microaggressions", "awareness"],
    accessTier: "premium",
  },
  {
    id: "dr-ep15",
    title: "Healing the Wounds of Chattel Slavery",
    category: "dismantle-racism",
    episode: 15,
    description:
      "A powerful exploration of the generational wounds of chattel slavery and the sacred work of healing them.",
    youtubeId: "l91CbuIvlB8",
    tags: ["slavery", "generational trauma", "healing"],
    accessTier: "premium",
  },
  {
    id: "dr-ep16",
    title: "How Do You Reconcile a Lynching?",
    category: "dismantle-racism",
    episode: 16,
    description:
      "Confronting one of the most painful chapters of American history and asking: how do we reconcile what cannot be undone?",
    youtubeId: "yO6uDFy4NwY",
    tags: ["lynching", "history", "reconciliation"],
    accessTier: "premium",
  },
  {
    id: "dr-ep17",
    title: "How to Create a Social Movement",
    category: "dismantle-racism",
    episode: 17,
    description:
      "The blueprint for building a social movement rooted in Sacred Intelligence — how lasting change begins from the inside out.",
    youtubeId: "HhvoozxPNAU",
    tags: ["social movement", "activism", "change"],
    accessTier: "premium",
  },
  {
    id: "dr-ep18",
    title: "Let's Talk Embodiment",
    category: "dismantle-racism",
    episode: 18,
    description:
      "Racism lives in the body. This episode explores how embodiment practices can help release the physical weight of systemic oppression.",
    youtubeId: "kIr3U3rnYqY",
    tags: ["embodiment", "body", "somatic"],
    accessTier: "premium",
  },
  {
    id: "dr-ep19",
    title: "Cross Racial Solidarity",
    category: "dismantle-racism",
    episode: 19,
    description:
      "Building genuine solidarity across racial lines — what it requires, what it costs, and why it matters.",
    youtubeId: "PK7vDtUIB0A",
    tags: ["solidarity", "cross-racial", "unity"],
    accessTier: "premium",
  },
  {
    id: "dr-ep20",
    title: "The Foundation of Racism is Race",
    category: "dismantle-racism",
    episode: 20,
    description:
      "Examining the social construction of race itself — the foundation upon which all racism is built.",
    youtubeId: "alMBPYuAkH4",
    tags: ["race", "social construction", "foundation"],
    accessTier: "premium",
  },
  {
    id: "dr-ep21",
    title: "A Choice to Show Up",
    category: "dismantle-racism",
    episode: 21,
    description:
      "Showing up for the work of dismantling racism is a choice made daily. Dr. TLC explores what that commitment looks like in practice.",
    youtubeId: "vTDKbov_cdQ",
    tags: ["showing up", "commitment", "action"],
    accessTier: "premium",
  },
  {
    id: "dr-ep22",
    title: "What Made Me Who I Am",
    category: "dismantle-racism",
    episode: 22,
    description:
      "A personal exploration of identity formation — the experiences, people, and systems that shape who we become.",
    youtubeId: "AqPz32fWG3M",
    tags: ["identity", "personal story", "formation"],
    accessTier: "premium",
  },
  {
    id: "dr-ep23",
    title: "What Made Me Who I Am (Part 2)",
    category: "dismantle-racism",
    episode: 23,
    description:
      "Continuing the exploration of identity — how understanding our past empowers us to create a different future.",
    youtubeId: "B3lfFJUI2YQ",
    tags: ["identity", "personal story", "formation"],
    accessTier: "premium",
  },
  {
    id: "dr-ep24",
    title: "What Made Me Who I Am (Part 3)",
    category: "dismantle-racism",
    episode: 24,
    description:
      "The concluding part of this identity series — moving from understanding to action.",
    youtubeId: "7dNADktxFFo",
    tags: ["identity", "personal story", "action"],
    accessTier: "premium",
  },
  {
    id: "dr-ep25",
    title: "Race Between Us",
    category: "dismantle-racism",
    episode: 25,
    description:
      "The space that race creates between people — and what it takes to bridge that divide with honesty and love.",
    youtubeId: "PIzSciDrbUA",
    tags: ["race", "divide", "bridging"],
    accessTier: "premium",
  },
  {
    id: "dr-ep26",
    title: "Leveling the Playing Field",
    category: "dismantle-racism",
    episode: 26,
    description:
      "What does equity actually look like? A conversation about leveling the playing field in systems built on inequality.",
    youtubeId: "vWunk1BpYek",
    tags: ["equity", "systems", "justice"],
    accessTier: "premium",
  },
  {
    id: "dr-ep27",
    title: "End Race in America",
    category: "dismantle-racism",
    episode: 27,
    description:
      "A bold conversation about the possibility — and the pathway — to ending the concept of race in America.",
    youtubeId: "_NOHtoJ6Dw4",
    tags: ["race", "America", "vision"],
    accessTier: "premium",
  },
  {
    id: "dr-ep28",
    title: "History, Art, & Education",
    category: "dismantle-racism",
    episode: 28,
    description:
      "How history, art, and education intersect as tools for both perpetuating and dismantling racism.",
    youtubeId: "y5H1WfT-XsU",
    tags: ["history", "art", "education"],
    accessTier: "premium",
  },
  {
    id: "dr-ep29",
    title: "Moving From Not Racist to Anti-Racist",
    category: "dismantle-racism",
    episode: 29,
    description:
      "The crucial shift from passive non-racism to active anti-racism — what it demands and why it matters.",
    youtubeId: "7o1_H1lXx1Q",
    tags: ["anti-racist", "action", "transformation"],
    accessTier: "premium",
  },
  {
    id: "dr-ep30",
    title: "The Race Card",
    category: "dismantle-racism",
    episode: 30,
    description:
      "Unpacking the concept of 'playing the race card' — the dismissal, the reality, and the deeper conversation it silences.",
    youtubeId: "vsQm_Gh0yv0",
    tags: ["race card", "dismissal", "conversation"],
    accessTier: "premium",
  },
  {
    id: "dr-ep31",
    title: "Planting the Seeds of Healing",
    category: "dismantle-racism",
    episode: 31,
    description:
      "Healing from racism is generational work. This episode explores how to plant seeds that future generations will harvest.",
    youtubeId: "Je0EL8PCy1k",
    tags: ["healing", "generational", "seeds"],
    accessTier: "premium",
  },
  {
    id: "dr-ep32",
    title: "A Womanist View of the Bible",
    category: "dismantle-racism",
    episode: 32,
    description:
      "Reading scripture through a womanist lens — how women of color reclaim sacred texts from patriarchal and racist interpretations.",
    youtubeId: "Na-9t_oCid4",
    tags: ["womanist", "Bible", "theology"],
    accessTier: "premium",
  },
  {
    id: "dr-ep33",
    title: "Actions Speak Louder Than Words",
    category: "dismantle-racism",
    episode: 33,
    description:
      "Moving beyond performative allyship into concrete, sustained action that actually dismantles racist systems.",
    youtubeId: "UwhIBJpP8JI",
    tags: ["action", "allyship", "systems"],
    accessTier: "premium",
  },
  {
    id: "dr-ep34",
    title: "Writing a New Story in Mississippi",
    category: "dismantle-racism",
    episode: 34,
    description:
      "Stories of transformation from Mississippi — rewriting the narrative in a state with one of the deepest racial histories in America.",
    youtubeId: "owCWQ2ZjaD8",
    tags: ["Mississippi", "narrative", "transformation"],
    accessTier: "premium",
  },
  {
    id: "dr-ep35",
    title: "How West African Dance Dismantles Racism",
    category: "dismantle-racism",
    episode: 35,
    description:
      "The power of West African dance as cultural reclamation and a living practice of dismantling racism through the body.",
    youtubeId: "7aK9mDG3nnQ",
    tags: ["dance", "West Africa", "culture"],
    accessTier: "premium",
  },
  {
    id: "dr-ep36",
    title: "Diversity, Equity, Inclusion, & Belonging",
    category: "dismantle-racism",
    episode: 36,
    description:
      "Beyond the acronym — what DEI&B actually requires when it is rooted in Sacred Intelligence rather than corporate compliance.",
    youtubeId: "cn6cgxnlXRc",
    tags: ["DEI", "belonging", "equity"],
    accessTier: "premium",
  },
  {
    id: "dr-ep37",
    title: "Affirmative Action, Access, and Opportunity",
    category: "dismantle-racism",
    episode: 37,
    description:
      "Examining affirmative action through the lens of access, opportunity, and the ongoing fight for equity in America.",
    youtubeId: "RfK8WSkZsTI",
    tags: ["affirmative action", "access", "opportunity"],
    accessTier: "premium",
  },
  {
    id: "dr-ep38",
    title: "Celebrating 100 Episodes",
    category: "dismantle-racism",
    episode: 38,
    description:
      "A milestone celebration — reflecting on 100 episodes of conversations, guests, and the growing movement to dismantle racism.",
    youtubeId: "QswO_iZQSik",
    tags: ["milestone", "celebration", "100 episodes"],
    accessTier: "premium",
  },
  {
    id: "dr-ep39",
    title: "Do What You Can",
    category: "dismantle-racism",
    episode: 39,
    description:
      "You do not have to do everything. You do what you can, where you are, with what you have — and that is enough to move the needle.",
    youtubeId: "tnWyp0BC7jI",
    tags: ["action", "empowerment", "do what you can"],
    accessTier: "premium",
  },
  {
    id: "dr-ep40",
    title: "I Thought I Was White",
    category: "dismantle-racism",
    episode: 40,
    description:
      "A provocative conversation about racial identity, passing, and the moment of reckoning when assumptions about race are shattered.",
    youtubeId: "anPz7RR8sAg",
    tags: ["identity", "passing", "reckoning"],
    accessTier: "premium",
  },
  {
    id: "dr-ep41",
    title: "The Impact of Racism on Mental Health",
    category: "dismantle-racism",
    episode: 41,
    description:
      "The psychological toll of racism — how it affects mental health and what healing looks like through a Sacred Intelligence lens.",
    youtubeId: "Fa_IXZaskiI",
    tags: ["mental health", "psychology", "healing"],
    accessTier: "premium",
  },
  {
    id: "dr-ep42",
    title: "The Walls Between Us",
    category: "dismantle-racism",
    episode: 42,
    description:
      "Examining the walls — literal and metaphorical — that racism builds between communities and what it takes to bring them down.",
    youtubeId: "8dASTG5jJnQ",
    tags: ["walls", "division", "community"],
    accessTier: "premium",
  },
  {
    id: "dr-ep43",
    title: "Changing the Narrative of First Generation College Students",
    category: "dismantle-racism",
    episode: 43,
    description:
      "How first-generation college students navigate systems not built for them — and how we rewrite that narrative.",
    youtubeId: "9eo8JKSD-nE",
    tags: ["education", "first generation", "narrative"],
    accessTier: "premium",
  },
  {
    id: "dr-ep44",
    title: "Leading the Charge to Dismantle Racism",
    category: "dismantle-racism",
    episode: 44,
    description:
      "What it means to lead — not follow — in the work of dismantling racism. A call to step into sacred leadership.",
    youtubeId: "-Er6m7515xw",
    tags: ["leadership", "charge", "dismantling racism"],
    accessTier: "premium",
  },
  {
    id: "dr-ep45",
    title: "Legalized Hate",
    category: "dismantle-racism",
    episode: 45,
    description:
      "Examining how hate has been codified into law throughout American history — and the ongoing fight to dismantle legalized racism.",
    youtubeId: "NmjUg2YvbyU",
    tags: ["law", "hate", "systemic racism"],
    accessTier: "premium",
  },
  {
    id: "dr-ep46",
    title: "Healing the Racial Divide Through Music",
    category: "dismantle-racism",
    episode: 46,
    description:
      "Music as medicine — how it bridges racial divides, preserves culture, and opens hearts to the work of healing.",
    youtubeId: "OiqZlK6k9e4",
    tags: ["music", "healing", "culture"],
    accessTier: "premium",
  },

  // Podcast Guest Appearances
  {
    id: "pod-derate-hate",
    title: "Derate The Hate — Episode 276",
    category: "podcast",
    description:
      "Reverend Dr. Curry discusses bridging racial divides through Sacred, Selfish, and Shared Action with host Wilk Wilkinson. She explores how spiritual consciousness and Sacred Intelligence can fuel a movement for unity.",
    externalUrl: "https://deratethehate.com",
    tags: ["dismantling racism", "shared", "unity"],
    accessTier: "free",
  },
  {
    id: "pod-forward-50",
    title: "Forward From 50",
    category: "podcast",
    description:
      "Interviewed by Greg Gerber about stepping fully into your calling after 50. Reverend Dr. Curry discusses how finding purpose after 50 is a widening path, and the importance of boundaries and rest for women and caregivers.",
    tags: ["midlife", "purpose", "boundaries", "women"],
    accessTier: "free",
  },
  {
    id: "pod-mankind",
    title: "The ManKind Podcast — Episode 083",
    category: "podcast",
    description:
      "Hosted by Boysen Hodgson, Dr. TLC explores how spiritual awareness and Sacred Intelligence can dismantle racism. She shares her experience as a Black Woman Pastor in a predominantly white Presbyterian Church, the three pillars of Sacred Intelligence, and how tapping into your sacred purpose empowers change in the world.",
    externalUrl: "https://www.buzzsprout.com/1564787/episodes/11038505",
    tags: ["dismantling racism", "psychology", "leadership", "sacred intelligence", "three pillars"],
    accessTier: "free",
  },
  {
    id: "pod-revelation",
    title: "The Revelation Project — Episode 27",
    category: "podcast",
    description:
      "A discussion about revealing and healing religious wounds, the patriarchy, religious trauma, and how systemic racism and religious wounding both damage the soul.",
    tags: ["religious trauma", "patriarchy", "healing"],
    accessTier: "free",
  },
  {
    id: "pod-midlife-ceo",
    title: "The Midlife CEO Podcast",
    category: "podcast",
    description:
      "Reverend Dr. Curry shares insights on navigating midlife transitions, leadership, and the Sacred Intelligence framework.",
    tags: ["midlife", "leadership", "transformation"],
    accessTier: "free",
  },

  // Radio & Interviews
  {
    id: "radio-voiceamerica",
    title: "VoiceAmerica with Patricia Raskin",
    category: "radio",
    description:
      "Reverend Dr. Curry discusses the importance of the Sacred and the wounds of religion with host Patricia Raskin.",
    tags: ["wounded by religion", "sacred", "radio"],
    accessTier: "free",
  },
  {
    id: "radio-straight-talk",
    title: "Straight Talk Live — WURC-FM",
    category: "radio",
    description:
      "Featured guest on WURC-FM Rust College Public Radio discussing Sacred Intelligence.",
    youtubeId: "abR-7Jfl2Ow",
    tags: ["sacred intelligence", "radio"],
    accessTier: "free",
  },
  {
    id: "radio-america-meditating",
    title: "America Meditating Museum Podcast",
    category: "radio",
    description:
      "Two deep conversations with host Dr. Sister Jenna about meditation, Sacred Intelligence, and spiritual healing.",
    tags: ["meditation", "spirituality", "healing"],
    accessTier: "free",
  },
  {
    id: "interview-sparkle-hour",
    title: "The Sparkle Hour",
    category: "interview",
    description:
      "An open conversation with Nicole Lewis-Keeber and Michelle Lewis about the unique challenges of being a woman pastor.",
    tags: ["women", "ministry", "challenges"],
    accessTier: "free",
  },
  {
    id: "interview-from-this-corner",
    title: "From This Corner TV",
    category: "interview",
    description:
      "Guest television appearance discussing Sacred Intelligence and the transformation journey.",
    youtubeId: "o8qFIQFShA4",
    tags: ["television", "sacred intelligence"],
    accessTier: "free",
  },
  {
    id: "radio-dismantle-racism",
    title: "Dismantle Racism with Rev. Dr. TLC",
    category: "radio",
    description:
      "Reverend Dr. Curry's own radio show on talkradio.nyc using historical narratives and in-depth conversations to educate the public on systemic hate and how to move from 'not racist' to 'anti-racist'.",
    tags: ["dismantling racism", "anti-racist", "radio show"],
    accessTier: "free",
  },

  // Sermons & Speaking
  {
    id: "sermon-unity-church-dc",
    title: "Do You REALLY Want What You Say You Want?",
    category: "inspiration",
    description:
      "Dr. Curry Avery's sermon at Unity Church of DC challenging listeners to align their actions with their deepest desires.",
    externalUrl: "https://www.youtube.com/watch?v=QyiptyeDRvI",
    tags: ["sermon", "purpose", "alignment", "unity church"],
    accessTier: "free",
  },
];

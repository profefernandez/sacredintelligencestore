import type { Product, Category } from "@/lib/types";

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const mockCategories: Category[] = [
  {
    id: "cat-books",
    name: "Books & Guides",
    slug: "books-guides",
    description: "Award-winning works for Sacred, Self~ish, and Shared transformation.",
    sort_order: 1,
    status: "published",
  },
  {
    id: "cat-digital",
    name: "Digital Collection",
    slug: "digital-collection",
    description: "Meditations, courses, and downloadable resources.",
    sort_order: 2,
    status: "published",
  },
  {
    id: "cat-workshops",
    name: "Workshops & Retreats",
    slug: "workshops-retreats",
    description: "Live workshops, retreats, and recorded sessions for deeper healing.",
    sort_order: 3,
    status: "published",
  },
];

// ---------------------------------------------------------------------------
// Individual named exports
// ---------------------------------------------------------------------------

export const mockBookProduct: Product = {
  id: "prod-book-sacred",
  name: "Sacred Intelligence: The Essence of Sacred, Selfish, and Shared Relationships",
  slug: "sacred-intelligence-book",
  description:
    "The book that started it all. Rev. Dr. Terrlyn L. Curry Avery introduces the Sacred Intelligence framework — a transformative approach to understanding your Sacred, Self~ish, and Shared relationships. NYC Big Book Award 2025 — Distinguished Favorite.",
  price: 2495,
  images: [
    {
      id: "img-book-sacred",
      url: "/images/book-sacred.jpg",
      alt: "Sacred Intelligence book cover — Healing from Within",
      width: 600,
      height: 900,
    },
  ],
  category: mockCategories[0],
  product_type: "book",
  pillar_tag: "sacred",
  stripe_price_id: "price_placeholder_book_sacred",
  featured: true,
  status: "published",
  sort_order: 1,
};

export const mockAlbumProduct: Product = {
  id: "prod-album-meditations",
  name: "Dismantling Racism: The Meditations",
  slug: "dismantling-racism-meditations",
  description:
    "A 9-track guided meditation album by Rev. Dr. Terrlyn L. Curry Avery. Each meditation corresponds to a chapter of Dismantling Racism, guiding you through awakening, knowing presence, divine wisdom, and beloved spirit. 55 minutes of transformative practice.",
  price: 1499,
  images: [
    {
      id: "img-album-meditations",
      url: "/images/album-dismantling-racism-meditations.jpg",
      alt: "Dismantling Racism: The Meditations album cover",
      width: 600,
      height: 600,
    },
  ],
  category: mockCategories[1],
  product_type: "album",
  pillar_tag: "shared",
  stripe_price_id: "price_placeholder_album_meditations",
  featured: true,
  status: "published",
  sort_order: 2,
};

// ---------------------------------------------------------------------------
// Full product array
// ---------------------------------------------------------------------------

export const mockProducts: Product[] = [
  // Book — Sacred Intelligence (flagship)
  mockBookProduct,

  // Book — Quieting, Confidence & Strength
  {
    id: "prod-book-quieting",
    name: "Quieting, Confidence & Strength: Prayers to Elevate, Enrich & Expand Your Relationships",
    slug: "quieting-confidence-strength",
    description:
      "The sacred practice of becoming still. A collection of prayers and reflections to deepen your relationship with yourself, others, and the Divine. NYC Big Book Award — Distinguished Favorite in Spirituality.",
    price: 1895,
    images: [
      {
        id: "img-book-quieting",
        url: "/images/book-quieting.jpg",
        alt: "Quieting, Confidence & Strength book cover",
        width: 600,
        height: 900,
      },
    ],
    category: mockCategories[0],
    product_type: "book",
    pillar_tag: "sacred",
    stripe_price_id: "price_placeholder_book_quieting",
    featured: false,
    status: "published",
    sort_order: 3,
  },

  // Book — Dismantling Racism
  {
    id: "prod-book-dismantling",
    name: "Dismantling Racism: Healing Separation From the Inside Out",
    slug: "dismantling-racism-book",
    description:
      "A Sacred Intelligence journey of faith. Rev. Dr. Curry Avery provides a framework for understanding and dismantling racism through spiritual and psychological transformation. NYC Big Book Award 2025 — Distinguished Favorite in Racism.",
    price: 2495,
    images: [
      {
        id: "img-book-dismantling",
        url: "/images/book-dismantling-racism.jpg",
        alt: "Dismantling Racism book cover",
        width: 600,
        height: 900,
      },
    ],
    category: mockCategories[0],
    product_type: "book",
    pillar_tag: "shared",
    stripe_price_id: "price_placeholder_book_dismantling",
    featured: true,
    status: "published",
    sort_order: 4,
  },

  // Album — Dismantling Racism: The Meditations
  mockAlbumProduct,

  // Document — B.R.E.A.T.H. Guide
  {
    id: "prod-doc-breath",
    name: "The B.R.E.A.T.H. Guide: A Downloadable Practice",
    slug: "breath-guide",
    description:
      "A beautifully designed PDF guide walking you through the B.R.E.A.T.H. methodology — Being present, Recognizing triggers, Embracing emotions, Asking for guidance, Taking action, and Healing forward.",
    price: 995,
    images: [
      {
        id: "img-doc-breath",
        url: "/images/doc-breath-guide.jpg",
        alt: "B.R.E.A.T.H. Guide cover",
        width: 600,
        height: 800,
      },
    ],
    category: mockCategories[1],
    product_type: "document",
    pillar_tag: "sacred",
    stripe_price_id: "price_placeholder_doc_breath",
    preview_content: "Chapter 1: Being Present — Before you can breathe, you must stop...",
    featured: false,
    status: "published",
    sort_order: 5,
  },

  // Merchandise — Journal
  {
    id: "prod-merch-journal",
    name: "Sacred Intelligence Reflection Journal",
    slug: "sacred-intelligence-journal",
    description:
      "A premium hardcover journal with guided prompts rooted in the Sacred, Self~ish, and Shared framework. Designed for daily reflection, intention-setting, and spiritual growth.",
    price: 3495,
    compare_price: 3995,
    images: [
      {
        id: "img-merch-journal",
        url: "/images/merch-journal.jpg",
        alt: "Sacred Intelligence reflection journal",
        width: 600,
        height: 600,
      },
    ],
    category: mockCategories[0],
    product_type: "merchandise",
    pillar_tag: "none",
    stripe_price_id: "price_placeholder_merch_journal",
    featured: true,
    status: "published",
    sort_order: 6,
  },

  // Workshop — Healing Through Sacred Intelligence
  {
    id: "prod-workshop-healing",
    name: "Healing Through Sacred Intelligence: Live Workshop",
    slug: "healing-through-sacred-intelligence",
    description:
      "A transformational two-hour live workshop with Dr. TLC. Explore the intersection of healing and intelligence through guided exercises, breathwork, and community dialogue. Includes recording access for 30 days.",
    price: 9700,
    images: [
      {
        id: "img-workshop-healing",
        url: "/images/workshop-healing.jpg",
        alt: "Dr. TLC leading a healing workshop",
        width: 800,
        height: 500,
      },
    ],
    category: mockCategories[2],
    product_type: "workshop",
    pillar_tag: "sacred",
    stripe_price_id: "price_placeholder_workshop_healing",
    presenter_name: "Rev. Dr. Terrlyn L. Curry Avery",
    presenter_image: {
      id: "img-drtlc",
      url: "/images/dr-tlc-presenter.jpg",
      alt: "Rev. Dr. Terrlyn L. Curry Avery",
      width: 400,
      height: 400,
    },
    featured: true,
    status: "published",
    sort_order: 7,
  },

  // Video — B.R.E.A.T.H. Course
  {
    id: "prod-video-breath",
    name: "The B.R.E.A.T.H. Methodology: Video Course",
    slug: "breath-methodology-course",
    description:
      "A six-module video course teaching the complete B.R.E.A.T.H. methodology. Each module includes video instruction from Dr. TLC, guided practice sessions, and downloadable worksheets.",
    price: 14900,
    images: [
      {
        id: "img-video-breath",
        url: "/images/video-breath-course.jpg",
        alt: "B.R.E.A.T.H. Methodology video course thumbnail",
        width: 800,
        height: 450,
      },
    ],
    category: mockCategories[2],
    product_type: "video",
    pillar_tag: "sacred",
    stripe_price_id: "price_placeholder_video_breath",
    preview_content: "Module 1: Being Present — The foundation of all healing begins with...",
    featured: false,
    status: "published",
    sort_order: 8,
  },

  // Workshop — SANKOFA Ghana Retreat
  {
    id: "prod-workshop-sankofa",
    name: "SANKOFA: Moving From History to Healing — Ghana Retreat",
    slug: "sankofa-ghana-retreat",
    description:
      "A transformative 10-day journey to Ghana with Rev. Dr. TLC. Reflect, connect, and heal through guided exercises, thought-provoking conversations, and powerful tools for dismantling racism. October 27 – November 6, 2026 · Limited to 5–10 travelers. $500 deposit to reserve.",
    price: 1099700,
    images: [
      {
        id: "img-workshop-sankofa",
        url: "/images/workshop-sankofa-ghana.jpg",
        alt: "SANKOFA Ghana retreat — a journey of healing",
        width: 800,
        height: 500,
      },
    ],
    category: mockCategories[2],
    product_type: "workshop",
    pillar_tag: "shared",
    stripe_price_id: "price_placeholder_workshop_sankofa",
    presenter_name: "Rev. Dr. Terrlyn L. Curry Avery",
    presenter_image: {
      id: "img-drtlc-sankofa",
      url: "/images/dr-tlc-presenter.jpg",
      alt: "Rev. Dr. Terrlyn L. Curry Avery",
      width: 400,
      height: 400,
    },
    featured: true,
    status: "published",
    sort_order: 9,
  },
];

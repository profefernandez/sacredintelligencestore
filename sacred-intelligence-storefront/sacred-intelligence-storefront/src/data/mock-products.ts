import type { Product, Category } from "@/lib/types";

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const mockCategories: Category[] = [
  {
    id: "cat-books",
    name: "Books & Guides",
    slug: "books-guides",
    description: "Written works for Sacred, Self-ish, and Shared transformation.",
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
    name: "Workshops & Sessions",
    slug: "workshops-sessions",
    description: "Live and recorded workshops for deeper healing.",
    sort_order: 3,
    status: "published",
  },
];

// ---------------------------------------------------------------------------
// Individual named exports
// ---------------------------------------------------------------------------

export const mockBookProduct: Product = {
  id: "prod-book-sacred",
  name: "Sacred Intelligence: The Power of Your Divine Connection",
  slug: "sacred-intelligence-book",
  description:
    "Discover how to access your divine connection and activate the Sacred pillar of your life. Dr. TLC guides you through practices that awaken your spiritual intelligence and deepen your relationship with the Divine.",
  price: 2495,
  images: [
    {
      id: "img-book-sacred",
      url: "/images/book-sacred.jpg",
      alt: "Sacred Intelligence book cover",
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
  id: "prod-album-stillness",
  name: "Sacred Stillness: Guided Meditations",
  slug: "sacred-stillness-album",
  description:
    "A collection of guided meditations designed to help you quiet the noise, reconnect with your Sacred self, and find stillness in a world of chaos. Each track is rooted in the Sacred Intelligence framework.",
  price: 1499,
  images: [
    {
      id: "img-album-stillness",
      url: "/images/album-sacred-stillness.jpg",
      alt: "Sacred Stillness meditation album cover",
      width: 600,
      height: 600,
    },
  ],
  category: mockCategories[1],
  product_type: "album",
  pillar_tag: "sacred",
  stripe_price_id: "price_placeholder_album_stillness",
  featured: true,
  status: "published",
  sort_order: 2,
};

// ---------------------------------------------------------------------------
// Full product array — one per type minimum
// ---------------------------------------------------------------------------

export const mockProducts: Product[] = [
  // Book — Sacred pillar
  mockBookProduct,

  // Book — Self-ish pillar
  {
    id: "prod-book-selfish",
    name: "The Self-ish Journey: Reclaiming Your Right to You",
    slug: "selfish-journey-book",
    description:
      "Learn why putting yourself first is not selfish — it is Self-ish. This book walks you through setting boundaries, practicing radical self-love, and building an unshakeable relationship with yourself.",
    price: 2495,
    images: [
      {
        id: "img-book-selfish",
        url: "/images/book-selfish.jpg",
        alt: "The Self-ish Journey book cover",
        width: 600,
        height: 900,
      },
    ],
    category: mockCategories[0],
    product_type: "book",
    pillar_tag: "selfish",
    stripe_price_id: "price_placeholder_book_selfish",
    featured: false,
    status: "published",
    sort_order: 3,
  },

  // Album
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
    sort_order: 4,
  },

  // Merchandise — Journal
  {
    id: "prod-merch-journal",
    name: "Sacred Intelligence Reflection Journal",
    slug: "sacred-intelligence-journal",
    description:
      "A premium hardcover journal with guided prompts rooted in the Sacred, Self-ish, and Shared framework. Designed for daily reflection, intention-setting, and spiritual growth.",
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
    sort_order: 5,
  },

  // Workshop
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
    sort_order: 6,
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
    sort_order: 7,
  },

  // Workshop — ANKOFA Ghana Retreat
  {
    id: "prod-workshop-ankofa",
    name: "ANKOFA: Moving From History to Healing — Ghana Retreat",
    slug: "ankofa-ghana-retreat",
    description:
      "A transformative 10-day journey to Ghana with Rev. Dr. TLC. Reflect, connect, and heal through guided exercises, thought-provoking conversations, and powerful tools for dismantling racism. October 27 – November 6, 2026 · Limited to 5–10 travelers.",
    price: 1099700,
    images: [
      {
        id: "img-workshop-ankofa",
        url: "/images/workshop-ankofa-ghana.jpg",
        alt: "ANKOFA Ghana retreat — a journey of healing",
        width: 800,
        height: 500,
      },
    ],
    category: mockCategories[2],
    product_type: "workshop",
    pillar_tag: "shared",
    stripe_price_id: "price_placeholder_workshop_ankofa",
    presenter_name: "Rev. Dr. Terrlyn L. Curry Avery",
    presenter_image: {
      id: "img-drtlc-ankofa",
      url: "/images/dr-tlc-presenter.jpg",
      alt: "Rev. Dr. Terrlyn L. Curry Avery",
      width: 400,
      height: 400,
    },
    featured: true,
    status: "published",
    sort_order: 8,
  },
];

import { createDirectus, rest, readItems, readSingleton, createItem } from "@directus/sdk";
import type {
  Product,
  Category,
  BlogPost,
  SiteSettings,
} from "@/lib/types";

/** Customer record — managed by Dr. TLC in Directus */
export interface Customer {
  id?: string;
  email: string;
  name?: string;
  stripe_customer_id?: string;
  access_tier: "public" | "free-email" | "premium";
  subscribed_at?: string;
  purchases?: string[];
  notes?: string;
  status: "active" | "inactive";
}

/** Order record — synced from Stripe webhooks */
export interface Order {
  id?: string;
  customer_email: string;
  stripe_session_id: string;
  items: string;
  total_cents: number;
  status: "completed" | "refunded" | "pending";
  created_at?: string;
}

interface DirectusSchema {
  products: Product[];
  categories: Category[];
  blog_posts: BlogPost[];
  site_settings: SiteSettings;
  customers: Customer[];
  orders: Order[];
}

const directusUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

const directus = createDirectus<DirectusSchema>(directusUrl).with(rest());

export default directus;

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await directus.request(
      readItems("products", {
        filter: { status: { _eq: "published" } },
        sort: ["sort_order"],
      })
    );
    return products as Product[];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
    const products = await directus.request(
      readItems("products", {
        filter: {
          slug: { _eq: slug },
          status: { _eq: "published" },
        },
        limit: 1,
      })
    );
    return (products as Product[])[0] ?? null;
  } catch (error) {
    console.error(`Failed to fetch product by slug "${slug}":`, error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await directus.request(
      readItems("categories", {
        filter: { status: { _eq: "published" } },
        sort: ["sort_order"],
      })
    );
    return categories as Category[];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await directus.request(
      readItems("products", {
        filter: {
          status: { _eq: "published" },
          featured: { _eq: true },
        },
        sort: ["sort_order"],
      })
    );
    return products as Product[];
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
    return [];
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await directus.request(
      readItems("blog_posts", {
        filter: { status: { _eq: "published" } },
        sort: ["-published_date"],
      })
    );
    return posts as BlogPost[];
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const posts = await directus.request(
      readItems("blog_posts", {
        filter: {
          slug: { _eq: slug },
          status: { _eq: "published" },
        },
        limit: 1,
      })
    );
    return (posts as BlogPost[])[0] ?? null;
  } catch (error) {
    console.error(`Failed to fetch blog post by slug "${slug}":`, error);
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const settings = await directus.request(
      readSingleton("site_settings")
    );
    return settings as SiteSettings;
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Customer Management — Dr. TLC manages these in Directus admin panel
// ---------------------------------------------------------------------------

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  try {
    const customers = await directus.request(
      readItems("customers", {
        filter: { email: { _eq: email } },
        limit: 1,
      })
    );
    return (customers as Customer[])[0] ?? null;
  } catch (error) {
    console.error(`[API_ERROR] getCustomerByEmail "${email}":`, error);
    return null;
  }
}

export async function createCustomer(data: Omit<Customer, "id">): Promise<Customer | null> {
  try {
    const customer = await directus.request(
      createItem("customers", data)
    );
    return customer as Customer;
  } catch (error) {
    console.error("[API_ERROR] createCustomer:", error);
    return null;
  }
}

export async function getOrders(email: string): Promise<Order[]> {
  try {
    const orders = await directus.request(
      readItems("orders", {
        filter: { customer_email: { _eq: email } },
        sort: ["-created_at"],
      })
    );
    return orders as Order[];
  } catch (error) {
    console.error(`[API_ERROR] getOrders "${email}":`, error);
    return [];
  }
}

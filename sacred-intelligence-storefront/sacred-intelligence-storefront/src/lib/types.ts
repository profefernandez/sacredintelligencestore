export type ProductType = "book" | "album" | "document" | "merchandise" | "workshop" | "video";
export type PillarTag = "sacred" | "selfish" | "shared" | "none";
export type ProductStatus = "draft" | "published";
export type FulfillmentStatus = "unfulfilled" | "shipped" | "delivered";
export type PaymentStatus = "paid" | "pending" | "failed";
export type ShowOn = "storefront" | "main-site" | "both";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_price?: number;
  images: ProductImage[];
  category: Category;
  product_type: ProductType;
  pillar_tag: PillarTag;
  stripe_price_id: string;
  preview_content?: string;
  presenter_image?: ProductImage;
  featured: boolean;
  status: ProductStatus;
  sort_order: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: ProductImage;
  sort_order: number;
  status: ProductStatus;
}

export interface Order {
  id: string;
  stripe_session_id: string;
  customer_email: string;
  items: OrderItem[];
  total: number;
  payment_status: PaymentStatus;
  fulfillment_status: FulfillmentStatus;
  shipping_address?: ShippingAddress;
  tracking_number?: string;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  product_type: ProductType;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image?: ProductImage;
  category: string;
  tags: string[];
  author: string;
  published_date: string;
  seo_title?: string;
  seo_description?: string;
  show_on: ShowOn;
  status: ProductStatus;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  body: string;
  seo_title?: string;
  seo_description?: string;
  status: ProductStatus;
}

export interface SiteSettings {
  store_name: string;
  hero_heading: string;
  hero_subtext: string;
  hero_image?: ProductImage;
  announcement_bar_text?: string;
  social_links: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface SocialPost {
  id: string;
  platform: "instagram" | "facebook" | "twitter";
  content: string;
  image?: ProductImage;
  scheduled_date: string;
  status: "draft" | "ready";
}

export interface CartItem {
  product: Product;
  quantity: number;
}

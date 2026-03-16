import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

interface CheckoutItem {
  stripe_price_id: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body as { items: CheckoutItem[] };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const MAX_QUANTITY = 99;
    for (const item of items) {
      if (!item.stripe_price_id || !item.quantity || item.quantity < 1) {
        return NextResponse.json(
          { error: "Invalid cart item" },
          { status: 400 }
        );
      }
      if (item.quantity > MAX_QUANTITY) {
        return NextResponse.json(
          { error: `Quantity cannot exceed ${MAX_QUANTITY}` },
          { status: 400 }
        );
      }
      if (!/^price_/.test(item.stripe_price_id)) {
        return NextResponse.json(
          { error: "Invalid price identifier" },
          { status: 400 }
        );
      }
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        price: item.stripe_price_id,
        quantity: item.quantity,
      })),
      success_url: `${baseUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

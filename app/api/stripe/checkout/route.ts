import Stripe from "stripe";

export const runtime = "nodejs";

type CheckoutPayload = {
  paymentType?: string;
  amount?: string;
  businessName?: string;
  email?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CheckoutPayload;
    const amount = Number(payload.amount);
    const amountInCents = Math.round(amount * 100);

    if (!payload.businessName?.trim()) {
      return Response.json({ error: "Business name is required." }, { status: 400 });
    }

    if (!payload.email?.trim() || !/^\S+@\S+\.\S+$/.test(payload.email)) {
      return Response.json({ error: "Valid email is required." }, { status: 400 });
    }

    if (!Number.isFinite(amount) || amountInCents < 100) {
      return Response.json({ error: "Amount must be at least $1." }, { status: 400 });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return Response.json(
        { error: "Stripe is not configured." },
        { status: 500 },
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      request.headers.get("origin") ||
      "http://localhost:3000";

    const stripe = new Stripe(secretKey);
    const paymentType = payload.paymentType?.trim() || "Project payment";
    const businessName = payload.businessName.trim();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: payload.email.trim(),
      success_url: `${siteUrl}/payments?status=success`,
      cancel_url: `${siteUrl}/payments?status=cancelled`,
      metadata: {
        businessName,
        paymentType,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountInCents,
            product_data: {
              name: `YB Visuals ${paymentType}`,
              description: `${businessName} payment. Include restaurant/business name in payment memo.`,
            },
          },
        },
      ],
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return Response.json(
      { error: "Could not start Stripe checkout." },
      { status: 500 },
    );
  }
}

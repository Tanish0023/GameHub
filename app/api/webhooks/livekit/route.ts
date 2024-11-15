import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = await headers();
  const authorization = headerPayload.get("Authorization");

  if (!authorization) {
    return new NextResponse("No authorization header", { status: 400 });
  }

  const event = receiver.receive(body, authorization);
  
  if (event.event === "ingress_started") {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo!.ingressId,
      },
      data: {
        isLive: true,
      },
    });

    // Assuming you want to return a success response after updating
    return new NextResponse(JSON.stringify({ message: "Stream marked live" }), {
      status: 200,
    });
  }

  if (event.event === "ingress_ended") {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: false,
      },
    });

    // Assuming you want to return a success response after updating
    return new NextResponse(JSON.stringify({ message: "Stream marked ended" }), {
      status: 200,
    });
  }

  // If none of the events match, you can return a different response
  return new NextResponse(JSON.stringify({ message: "Unknown event" }), {
    status: 400,
  });
}
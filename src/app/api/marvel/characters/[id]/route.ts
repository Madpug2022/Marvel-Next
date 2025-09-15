import {
  getMarvelAuthParams,
  marvelUrl,
  privateKey,
  publicKey,
} from "@/app/api/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!publicKey || !privateKey) {
    return NextResponse.json(
      { error: "Marvel API keys not configured" },
      { status: 500 }
    );
  }

  if (!id) {
    return NextResponse.json(
      { error: "Character ID is required" },
      { status: 400 }
    );
  }

  try {
    const authParams = getMarvelAuthParams();
    const authQuery = new URLSearchParams(authParams).toString();
    const url = `${marvelUrl}/characters/${id}?${authQuery}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Marvel API error:", response.status, errorText);
      throw new Error(`Marvel API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching character:", error);
    return NextResponse.json(
      { error: "Failed to fetch character" },
      { status: 500 }
    );
  }
}

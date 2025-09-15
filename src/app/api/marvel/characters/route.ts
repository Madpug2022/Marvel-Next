import { NextRequest, NextResponse } from "next/server";
import {
  getMarvelAuthParams,
  marvelUrl,
  privateKey,
  publicKey,
} from "../../utils/auth";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit") || "50";
  const name = searchParams.get("name");

  if (!publicKey || !privateKey) {
    return NextResponse.json(
      { error: "Marvel API keys not configured" },
      { status: 500 }
    );
  }

  try {
    const authParams = getMarvelAuthParams();
    const authQuery = new URLSearchParams(authParams).toString();

    let url: string;

    if (name) {
      url = `${marvelUrl}/characters?nameStartsWith=${encodeURIComponent(
        name
      )}&${authQuery}`;
    } else {
      url = `${marvelUrl}/characters?limit=${limit}&${authQuery}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Marvel API error:", response.status, errorText);
      throw new Error(`Marvel API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching characters:", error);
    return NextResponse.json(
      { error: "Failed to fetch characters" },
      { status: 500 }
    );
  }
}

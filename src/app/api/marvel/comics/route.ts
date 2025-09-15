import { NextRequest, NextResponse } from "next/server";
import { getMarvelAuthParams, privateKey, publicKey } from "../../utils/auth";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const collectionURI = searchParams.get("collectionURI");

  if (!collectionURI) {
    return NextResponse.json(
      { error: "collectionURI is required" },
      { status: 400 }
    );
  }

  if (!publicKey || !privateKey) {
    return NextResponse.json(
      { error: "Marvel API keys not configured" },
      { status: 500 }
    );
  }

  try {
    const authParams = getMarvelAuthParams();
    const authQuery = new URLSearchParams(authParams).toString();

    const separator = collectionURI.includes("?") ? "&" : "?";
    const url = `${collectionURI}${separator}${authQuery}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Marvel API error:", response.status, errorText);
      throw new Error(`Marvel API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching comics:", error);
    return NextResponse.json(
      { error: "Failed to fetch comics" },
      { status: 500 }
    );
  }
}

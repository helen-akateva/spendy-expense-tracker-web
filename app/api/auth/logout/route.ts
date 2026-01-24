import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { spendiApi } from "../../api";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const sessionId = cookieStore.get("sessionId")?.value;

    await spendiApi.post(
      "/auth/logout",
      {},
      {
        headers: {
          Cookie: [
            accessToken && `accessToken=${accessToken}`,
            refreshToken && `refreshToken=${refreshToken}`,
            sessionId && `sessionId=${sessionId}`,
          ]
            .filter(Boolean)
            .join("; "),
        },
      },
    );

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("sessionId");

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 },
    );
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { generateMission } from "@/lib/ai/generateMission";

export async function POST(req: Request) {
  try {
    const { goal } = await req.json();

    if (!goal) {
      return NextResponse.json(
        {
          error: "Goal is required",
        },
        {
          status: 400,
        }
      );
    }

    const mission =
      await generateMission(goal);

    return NextResponse.json(
      mission
    );
  } catch (error: any) {
    console.error(
      "GEMINI ERROR:"
    );

    console.error(error);

    return NextResponse.json(
        {
          error:
            error?.message ||
            JSON.stringify(error),
        },
        {
          status: 500,
        }
      );
  }
}
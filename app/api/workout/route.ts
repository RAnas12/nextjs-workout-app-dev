import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, userId } = await req.json();

  if (!name)
    return NextResponse.json(
      { message: "The workout do not have a name" },
      { status: 400 }
    );
  if (!userId)
    return NextResponse.json(
      { message: "Error with the user information" },
      { status: 400 }
    );

  const workout = await prisma.workout.create({
    data: {
      name: name,
      userId: userId,
    },
  });
  return NextResponse.json(workout.id);
}

export async function PUT(req: NextRequest) {
  const { name, id } = await req.json();

  if (!name)
    return NextResponse.json(
      { message: "The workout do not have a name" },
      { status: 400 }
    );
  if (!id)
    return NextResponse.json(
      { message: "Error with the workout information" },
      { status: 400 }
    );

  const workout = await prisma.workout.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
  return NextResponse.json(workout.name);
}

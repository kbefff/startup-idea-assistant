// src/app/idea/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateStartupIdea } from '@/lib/generateStartupIdea';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { domain, trend, audience } = body;

  const result = await generateStartupIdea({ domain, trend, audience });

  return NextResponse.json(result);
}

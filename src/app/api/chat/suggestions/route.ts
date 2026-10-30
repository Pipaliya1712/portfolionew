import { NextResponse } from 'next/server';
export async function POST() { return NextResponse.json({ suggestions: ['Explore AI engineering', 'Show relevant projects', 'Discuss a project'] }); }

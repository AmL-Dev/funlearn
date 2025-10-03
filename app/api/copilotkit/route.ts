import { NextRequest, NextResponse } from 'next/server';

// Simple ADK agent integration endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward request to ADK agent
    const adkResponse = await fetch(process.env.ADK_AGENT_URL + '/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ADK_API_KEY || ""}`,
      },
      body: JSON.stringify(body),
    });

    if (!adkResponse.ok) {
      throw new Error(`ADK agent error: ${adkResponse.statusText}`);
    }

    const result = await adkResponse.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('ADK integration error:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with ADK agent' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: "ok", 
    message: "FunLearn Kids ADK Agent is running",
    agent: "funlearn_agent",
    adkAgentUrl: process.env.ADK_AGENT_URL || "Not configured"
  });
}

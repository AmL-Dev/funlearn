import { NextRequest, NextResponse } from 'next/server';

// ADK Agent integration for processing uploaded lessons
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const grade = formData.get('grade') as string;
    
    if (!file || !grade) {
      return NextResponse.json(
        { error: 'File and grade are required' },
        { status: 400 }
      );
    }

    // Convert file to base64 for ADK agent processing
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    
    // Prepare data for ADK agent
    const lessonData = {
      file: {
        name: file.name,
        type: file.type,
        size: file.size,
        content: base64,
      },
      grade: parseInt(grade),
      timestamp: new Date().toISOString(),
    };

    // Call ADK agent to process the lesson
    const adkResponse = await fetch(process.env.ADK_AGENT_URL + '/process-lesson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ADK_API_KEY}`,
      },
      body: JSON.stringify(lessonData),
    });

    if (!adkResponse.ok) {
      throw new Error(`ADK agent error: ${adkResponse.statusText}`);
    }

    const processedLesson = await adkResponse.json();

    // Return processed lesson data
    return NextResponse.json({
      success: true,
      lessonId: processedLesson.lessonId,
      games: processedLesson.games,
      content: processedLesson.content,
      grade: grade,
      message: 'Lesson processed successfully by ADK agent!',
    });

  } catch (error) {
    console.error('Error processing lesson:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process lesson',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Lesson processing endpoint is ready',
    adkAgentUrl: process.env.ADK_AGENT_URL || 'Not configured',
  });
}

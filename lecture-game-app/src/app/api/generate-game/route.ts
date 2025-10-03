import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { lectureContent } = await request.json();

    if (!lectureContent) {
      return NextResponse.json(
        { error: 'No lecture content provided' },
        { status: 400 }
      );
    }

    // Call the FastAPI backend to generate the game
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    
    try {
      const response = await fetch(`${backendUrl}/agents/root_agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `Generate a JavaScript educational game based on this lecture content: ${lectureContent}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Backend agent request failed');
      }

      const data = await response.json();
      
      // Extract the JavaScript code from the agent's response
      let gameScript = '';
      if (data.response && typeof data.response === 'string') {
        // Try to extract JavaScript code from the response
        const jsMatch = data.response.match(/```javascript([\s\S]*?)```/) || 
                       data.response.match(/```js([\s\S]*?)```/) ||
                       data.response.match(/```([\s\S]*?)```/);
        
        if (jsMatch) {
          gameScript = jsMatch[1].trim();
        } else {
          // If no code blocks found, try to extract the first function-like code
          const functionMatch = data.response.match(/(function|const|let).*?\{[\s\S]*?\}/);
          if (functionMatch) {
            gameScript = functionMatch[0];
          } else {
            // Fallback to a simple template game
            gameScript = generateFallbackGameScript(lectureContent);
          }
        }
      } else {
        // Fallback to a simple template game
        gameScript = generateFallbackGameScript(lectureContent);
      }

      return NextResponse.json({
        gameScript,
        message: 'Game generated successfully',
        source: 'backend'
      });
    } catch (backendError) {
      console.warn('Backend integration failed, using fallback:', backendError);
      // Fallback to generated script if backend is not available
      const gameScript = generateFallbackGameScript(lectureContent);
      
      return NextResponse.json({
        gameScript,
        message: 'Game generated using fallback generator',
        source: 'fallback'
      });
    }
  } catch (error) {
    console.error('Error generating game:', error);
    return NextResponse.json(
      { error: 'Failed to generate game' },
      { status: 500 }
    );
  }
}

function generateFallbackGameScript(content: string): string {
  // Extract key concepts and create questions
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const questions = sentences.slice(0, 5).map((sentence, index) => {
    const words = sentence.trim().split(' ');
    const keyWord = words[Math.floor(Math.random() * words.length)];
    const incomplete = sentence.replace(keyWord, '_____');
    
    return {
      question: `Question ${index + 1}: Fill in the blank in this sentence from the lecture: "${incomplete}"`,
      answer: keyWord,
      wrongAnswers: [
        words[Math.floor(Math.random() * words.length)],
        words[Math.floor(Math.random() * words.length)],
        words[Math.floor(Math.random() * words.length)]
      ].filter(w => w !== keyWord && w.length > 2).slice(0, 3)
    };
  });

  return `
    let currentQuestion = 0;
    let score = 0;
    const questions = ${JSON.stringify(questions)};
    
    function initGame() {
      document.body.innerHTML = '<div class="game-container"><h1>🎓 Lecture Quiz Game</h1><div class="score">Score: ' + score + '/' + questions.length + '</div><div id="question-container"><div class="question" id="question-text"></div><div class="answer-buttons" id="answer-buttons"></div><button class="hidden" id="next-btn" onclick="nextQuestion()">Next Question</button></div><div id="results-container" class="hidden"><h2>🎉 Quiz Complete!</h2><div class="score">Final Score: ' + score + '/' + questions.length + '</div><button onclick="restartGame()">Play Again</button></div></div>';
      showQuestion();
    }
    
    function showQuestion() {
      if (currentQuestion >= questions.length) {
        showResults();
        return;
      }
      
      const q = questions[currentQuestion];
      document.getElementById('question-text').textContent = q.question;
      
      const buttonsContainer = document.getElementById('answer-buttons');
      buttonsContainer.innerHTML = '';
      
      // Shuffle answers
      const allAnswers = [q.answer, ...q.wrongAnswers].sort(() => Math.random() - 0.5);
      
      allAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer, q.answer);
        buttonsContainer.appendChild(button);
      });
    }
    
    function checkAnswer(selected, correct) {
      const buttons = document.getElementById('answer-buttons').children;
      
      for (let button of buttons) {
        button.disabled = true;
        if (button.textContent === correct) {
          button.style.background = 'rgba(76, 175, 80, 0.8)';
        } else if (button.textContent === selected && selected !== correct) {
          button.style.background = 'rgba(244, 67, 54, 0.8)';
        }
      }
      
      if (selected === correct) {
        score++;
        document.querySelector('.score').textContent = 'Score: ' + score + '/' + questions.length;
      }
      
      document.getElementById('next-btn').classList.remove('hidden');
    }
    
    function nextQuestion() {
      currentQuestion++;
      document.getElementById('next-btn').classList.add('hidden');
      showQuestion();
    }
    
    function showResults() {
      document.getElementById('question-container').classList.add('hidden');
      document.getElementById('results-container').classList.remove('hidden');
    }
    
    function restartGame() {
      currentQuestion = 0;
      score = 0;
      document.getElementById('results-container').classList.add('hidden');
      initGame();
    }
    
    // Initialize the game when the page loads
    initGame();
  `;
}

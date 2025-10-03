'use client';

import { useState, useRef } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [gameScript, setGameScript] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid PDF file');
    }
    setFile(event.target.files?.[0] || null);
  };

  const handleExtractText = async () => {
    if (!file) return;

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to extract text from PDF');
      }

      const data = await response.json();
      setExtractedText(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateGame = async () => {
    if (!extractedText) return;

    setIsUploading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lectureContent: extractedText }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate game');
      }

      const data = await response.json();
      setGameScript(data.gameScript);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            📚 Lecture Game Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload a PDF of your lecture and transform it into an interactive JavaScript game!
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* File Upload Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📄 Step 1: Upload Lecture PDF
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                {file ? `Selected: ${file.name}` : 'Choose PDF File'}
              </button>
              {file && (
                <button
                  onClick={handleExtractText}
                  disabled={isUploading}
                  className="ml-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
                >
                  {isUploading ? 'Extracting...' : 'Extract Text'}
                </button>
              )}
            </div>
            {error && (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            )}
          </div>

          {/* Extracted Text Section */}
          {extractedText && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                📝 Step 2: Extracted Lecture Content
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-wrap text-sm">
                  {extractedText.substring(0, 1000)}
                  {extractedText.length > 1000 && '...'} 
                  {extractedText.length > 1000 && (
                    <span className="text-gray-500">{'(Preview - full text loaded)'}</span>
                  )}
                </p>
              </div>
              <button
                onClick={handleGenerateGame}
                disabled={isUploading}
                className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors font-medium"
              >
                {isUploading ? 'Generating Game...' : '🎮 Generate Game'}
              </button>
            </div>
          )}

          {/* Game Display Section */}
          {gameScript && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                🎮 Step 3: Your Interactive Game
              </h2>
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800">Game Preview</h3>
                </div>
                <div className="h-96">
                  <iframe
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Lecture Game</title>
                          <style>
                            body {
                              margin: 0;
                              padding: 20px;
                              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                              color: white;
                              min-height: 100vh;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              overflow: hidden;
                            }
                            .game-container {
                              text-align: center;
                              max-width: 400px;
                              width: 100%;
                            }
                            button {
                              background: rgba(255,255,255,0.2);
                              border: 2px solid rgba(255,255,255,0.3);
                              color: white;
                              padding: 12px 24px;
                              border-radius: 8px;
                              cursor: pointer;
                              font-size: 16px;
                              margin: 8px;
                              transition: all 0.3s ease;
                            }
                            button:hover {
                              background: rgba(255,255,255,0.3);
                              transform: translateY(-2px);
                            }
                            .score {
                              font-size: 24px;
                              margin: 20px 0;
                            }
                            .question {
                              font-size: 18px;
                              margin: 20px 0;
                              line-height: 1.6;
                            }
                            .answer-buttons {
                              display: flex;
                              flex-direction: column;
                              gap: 10px;
                              margin: 20px 0;
                            }
                            .hidden {
                              display: none;
                            }
                          </style>
                        </head>
                        <body>
                          <script>
                            ${gameScript}
                          </script>
                        </body>
                      </html>
                    `}
                    className="w-full h-full border-0"
                    title="Lecture Game"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm">
          <p>Powered by AI • Transform lectures into interactive learning experiences</p>
        </footer>
      </div>
    </div>
  );
}
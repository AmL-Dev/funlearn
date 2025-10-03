'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { PlayIcon, TrophyIcon, StarIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'

export default function Play() {
  const searchParams = useSearchParams()
  const [selectedGrade, setSelectedGrade] = useState('')
  const [currentGame, setCurrentGame] = useState('')
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    const grade = searchParams.get('grade')
    if (grade) {
      setSelectedGrade(grade)
    }
  }, [searchParams])

  // Add a loading state to prevent premature rendering
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const games = [
    {
      id: 'math-quiz',
      title: 'Math Magic Quiz! ✨',
      description: 'Test your math skills with fun questions!',
      grade: '1-3',
      icon: '🧮',
      color: 'from-pink-400 to-red-400'
    },
    {
      id: 'word-puzzle',
      title: 'Word Adventure! 📚',
      description: 'Solve word puzzles and learn new vocabulary!',
      grade: '2-4',
      icon: '🔤',
      color: 'from-blue-400 to-purple-400'
    },
    {
      id: 'science-fun',
      title: 'Science Explorer! 🔬',
      description: 'Discover amazing science facts through games!',
      grade: '3-5',
      icon: '⚗️',
      color: 'from-green-400 to-teal-400'
    },
    {
      id: 'memory-game',
      title: 'Memory Challenge! 🧠',
      description: 'Test your memory with fun matching games!',
      grade: '1-5',
      icon: '🎯',
      color: 'from-yellow-400 to-orange-400'
    }
  ]

  const startGame = (gameId: string) => {
    setCurrentGame(gameId)
    setScore(0)
    setGameComplete(false)
  }

  const endGame = () => {
    setCurrentGame('')
    setGameComplete(true)
  }

  const addScore = () => {
    setScore(score + 10)
  }

  // Show loading while client-side hydration happens
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Loading... ⏳
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Getting ready for your games!
          </p>
        </div>
      </div>
    )
  }

  // If no grade is selected after client-side hydration, redirect to home
  if (!selectedGrade) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Oops! 🚫
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            You need to choose your grade first!
          </p>
          <Link 
            href="/" 
            className="bg-green-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-green-600"
          >
            ← Go Back to Choose Grade
          </Link>
        </div>
      </div>
    )
  }

  if (currentGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
        {/* Game Header */}
        <div className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-purple-600">
                {games.find(g => g.id === currentGame)?.title}
              </h1>
              <div className="flex items-center space-x-6">
                <div className="bg-green-100 px-4 py-2 rounded-lg">
                  <span className="text-green-800 font-semibold">Grade {selectedGrade}</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600">
                  ⭐ Score: {score}
                </div>
                <button
                  onClick={endGame}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl text-lg font-semibold"
                >
                  End Game
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            {currentGame === 'math-quiz' && (
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Math Quiz Time! 🧮</h2>
                <div className="text-6xl mb-8">2 + 3 = ?</div>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {[4, 5, 6, 7].map((answer) => (
                    <button
                      key={answer}
                      onClick={() => answer === 5 ? addScore() : null}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-2xl text-2xl font-bold shadow-lg transform hover:scale-105 transition-all"
                    >
                      {answer}
                    </button>
                  ))}
                </div>
                <p className="text-lg text-gray-600 mt-6">
                  Click the correct answer to earn points! 🎯
                </p>
              </div>
            )}

            {currentGame === 'word-puzzle' && (
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Word Puzzle! 🔤</h2>
                <div className="text-4xl mb-8 font-mono tracking-widest">
                  C _ T
                </div>
                <p className="text-xl text-gray-600 mb-8">What animal is this? (Hint: It says "meow")</p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {['DOG', 'CAT', 'BAT', 'RAT'].map((word) => (
                    <button
                      key={word}
                      onClick={() => word === 'CAT' ? addScore() : null}
                      className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-2xl text-2xl font-bold shadow-lg transform hover:scale-105 transition-all"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentGame === 'science-fun' && (
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Science Fun! 🔬</h2>
                <div className="text-3xl mb-8">What do plants need to grow?</div>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {['Water', 'Ice Cream', 'Candy', 'Pizza'].map((option) => (
                    <button
                      key={option}
                      onClick={() => option === 'Water' ? addScore() : null}
                      className="bg-teal-500 hover:bg-teal-600 text-white p-6 rounded-2xl text-xl font-bold shadow-lg transform hover:scale-105 transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentGame === 'memory-game' && (
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Memory Game! 🧠</h2>
                <div className="text-2xl mb-8">Remember this sequence:</div>
                <div className="text-6xl mb-8">🍎 🍌 🍊</div>
                <div className="text-xl text-gray-600 mb-8">
                  Now click the fruits in the same order!
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  {['🍎', '🍌', '🍊'].map((fruit, index) => (
                    <button
                      key={index}
                      onClick={() => addScore()}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-6 rounded-2xl text-4xl shadow-lg transform hover:scale-105 transition-all"
                    >
                      {fruit}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="text-4xl">🎓</div>
                <span className="ml-3 text-2xl font-bold text-purple-600">FunLearn Kids</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-lg">Step 3: Play Games</span>
              <div className="bg-green-100 px-4 py-2 rounded-lg">
                <span className="text-green-800 font-semibold">Grade {selectedGrade}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Step 3: Let's Play Games! 🎮
          </h1>
          <p className="text-2xl text-gray-700">
            Awesome! Now let's play some fun games for Grade {selectedGrade}!
          </p>
        </div>

        {/* Grade Display */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            You're playing as Grade {selectedGrade}! 🎯
          </h2>
          <p className="text-xl text-gray-600">
            Choose any game below to start learning and having fun!
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className={`bg-gradient-to-r ${game.color} rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition-all cursor-pointer`}
              onClick={() => startGame(game.id)}
            >
              <div className="text-8xl mb-4">{game.icon}</div>
              <h3 className="text-3xl font-bold text-white mb-4">{game.title}</h3>
              <p className="text-xl text-white mb-4">{game.description}</p>
              <div className="bg-white bg-opacity-20 rounded-2xl p-4">
                <p className="text-lg text-white font-semibold">
                  Perfect for Grades {game.grade}
                </p>
              </div>
              <button className="mt-6 bg-white text-gray-800 px-8 py-3 rounded-2xl text-xl font-bold shadow-lg hover:bg-gray-100 transition-colors">
                Play Now! 🚀
              </button>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-16 bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            How to Play! 🎯
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-6xl mb-4">1️⃣</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Choose Your Grade</h3>
              <p className="text-gray-600">Select the grade that matches your level</p>
            </div>
            <div>
              <div className="text-6xl mb-4">2️⃣</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pick a Game</h3>
              <p className="text-gray-600">Click on any game that looks fun to you!</p>
            </div>
            <div>
              <div className="text-6xl mb-4">3️⃣</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Play & Learn</h3>
              <p className="text-gray-600">Answer questions and earn stars! ⭐</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-xl text-lg font-semibold inline-flex items-center"
            >
              ← Back to Home
            </Link>
            <Link 
              href={`/upload?grade=${selectedGrade}`}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl text-lg font-semibold inline-flex items-center"
            >
              Upload More Lessons 📤
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

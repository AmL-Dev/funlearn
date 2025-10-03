'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PlayIcon, UploadIcon, StarIcon, BookOpenIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const [selectedGrade, setSelectedGrade] = useState('')
  const [showNextSteps, setShowNextSteps] = useState(false)

  const handleGradeSelect = (grade: number) => {
    setSelectedGrade(grade.toString())
    setShowNextSteps(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-4xl">🎓</div>
              <span className="ml-3 text-2xl font-bold text-purple-600">FunLearn Kids</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-lg">Step 1: Choose Grade</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            Welcome to
            <span className="text-purple-600"> FunLearn!</span>
          </h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-4xl mx-auto">
            Let's start your learning adventure! First, tell us what grade you're in! 🌟
          </p>
          
          {/* Grade Selection */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Step 1: Choose Your Grade! 🎯</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {[1, 2, 3, 4, 5].map((grade) => (
                <button
                  key={grade}
                  onClick={() => handleGradeSelect(grade)}
                  className={`px-8 py-6 rounded-3xl text-3xl font-bold shadow-2xl transform hover:scale-105 transition-all ${
                    selectedGrade === grade.toString()
                      ? 'bg-yellow-400 text-gray-800 scale-110'
                      : 'bg-white text-gray-700 hover:bg-yellow-100'
                  }`}
                >
                  Grade {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          {showNextSteps && (
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Great! You're in Grade {selectedGrade}! 🎉
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Now let's upload your lesson and turn it into fun games!
              </p>
              
              <div className="flex justify-center">
                <Link 
                  href={`/upload?grade=${selectedGrade}`}
                  className="bg-purple-500 text-white px-8 py-4 rounded-2xl text-2xl font-bold hover:bg-purple-600 flex items-center justify-center shadow-xl transform hover:scale-105 transition-all"
                >
                  📤 Step 2: Upload Lesson
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            How It Works! 🚀
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">📤</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">1. Upload</h3>
              <p className="text-lg text-gray-600">
                Upload your lesson files (PDF, images, or videos) and we'll turn them into fun games!
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">2. Play</h3>
              <p className="text-lg text-gray-600">
                Play interactive games based on your lessons - quizzes, puzzles, and more!
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">3. Learn & Win</h3>
              <p className="text-lg text-gray-600">
                Earn stars and badges as you learn! The more you play, the smarter you get!
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Recent Activities 🌟
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Math Magic! ✨</h3>
              <p className="text-gray-600">Uploaded by: Sarah (Grade 3)</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span className="ml-2 text-gray-600">5 stars earned!</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Science Adventure! 🔬</h3>
              <p className="text-gray-600">Uploaded by: Alex (Grade 4)</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">⭐⭐⭐⭐</span>
                <span className="ml-2 text-gray-600">4 stars earned!</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-lg">Made with ❤️ for kids who love to learn!</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

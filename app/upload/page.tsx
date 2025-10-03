'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CloudArrowUpIcon, DocumentIcon, PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/outline'

export default function Upload() {
  const searchParams = useSearchParams()
  const [selectedGrade, setSelectedGrade] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState('')

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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setUploadStatus('')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !selectedGrade) {
      setUploadStatus('Please select a file!')
      return
    }
    
    setUploadStatus('🤖 AI is processing your lesson...')
    
    try {
      // Create FormData for the API call
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('grade', selectedGrade)
      
      // Call our API route which integrates with ADK agent
      const response = await fetch('/api/process-lesson', {
        method: 'POST',
        body: formData,
      })
      
      const result = await response.json()
      
      if (result.success) {
        setUploadStatus(`✅ ${result.message} Generated ${result.games?.length || 0} games!`)
        setSelectedFile(null)
      } else {
        setUploadStatus(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('❌ Upload failed. Please try again.')
    }
  }

  // Show loading while client-side hydration happens
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Loading... ⏳
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Getting ready for your lesson!
          </p>
        </div>
      </div>
    )
  }

  // If no grade is selected after client-side hydration, redirect to home
  if (!selectedGrade) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Oops! 🚫
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            You need to choose your grade first!
          </p>
          <Link 
            href="/" 
            className="bg-purple-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-purple-600"
          >
            ← Go Back to Choose Grade
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
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
              <span className="text-gray-600 text-lg">Step 2: Upload Lesson</span>
              <div className="bg-purple-100 px-4 py-2 rounded-lg">
                <span className="text-purple-800 font-semibold">Grade {selectedGrade}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Step 2: Upload Your Lesson! 📤
          </h1>
          <p className="text-2xl text-gray-700">
            Great! Now let's upload your lesson for Grade {selectedGrade}! Our AI will turn it into fun games! 🤖
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Grade Display */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              You're in Grade {selectedGrade}! 🎯
            </h2>
            <p className="text-xl text-gray-600">
              Perfect! Now let's upload your lesson file.
            </p>
          </div>

          {/* File Upload */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Choose Your File! 📁
            </h2>
            
            <div className="border-4 border-dashed border-purple-300 rounded-3xl p-12 text-center hover:border-purple-500 transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.mp4,.mov,.avi"
                onChange={handleFileSelect}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <CloudArrowUpIcon className="h-20 w-20 text-purple-500 mb-4" />
                <p className="text-2xl font-semibold text-gray-700 mb-2">
                  Click to choose a file
                </p>
                <p className="text-lg text-gray-500 mb-4">
                  PDF, Images, or Videos work great!
                </p>
                <div className="flex justify-center space-x-8 text-4xl">
                  <DocumentIcon className="h-12 w-12 text-red-500" />
                  <PhotoIcon className="h-12 w-12 text-green-500" />
                  <VideoCameraIcon className="h-12 w-12 text-blue-500" />
                </div>
              </label>
            </div>

            {selectedFile && (
              <div className="mt-6 bg-green-100 border-2 border-green-300 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-2">Selected File:</h3>
                <p className="text-lg text-green-700">📄 {selectedFile.name}</p>
                <p className="text-sm text-green-600">
                  Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div className="text-center">
            <button
              onClick={handleUpload}
              disabled={!selectedFile}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white px-12 py-4 rounded-2xl text-2xl font-bold shadow-xl transform hover:scale-105 transition-all disabled:transform-none disabled:cursor-not-allowed"
            >
              🤖 Upload & AI Creates Games!
            </button>
          </div>

          {/* Status Message */}
          {uploadStatus && (
            <div className={`mt-6 p-4 rounded-2xl text-center text-lg font-semibold ${
              uploadStatus.includes('✅') 
                ? 'bg-green-100 text-green-800' 
                : uploadStatus.includes('Please select')
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {uploadStatus}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-12 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-yellow-800 mb-4 text-center">
              How to Upload! 📝
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-2">1️⃣</div>
                <p className="text-lg text-yellow-700">Choose your grade level</p>
              </div>
              <div>
                <div className="text-4xl mb-2">2️⃣</div>
                <p className="text-lg text-yellow-700">Select a file to upload</p>
              </div>
              <div>
                <div className="text-4xl mb-2">3️⃣</div>
                <p className="text-lg text-yellow-700">Click upload and start playing!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Step */}
        <div className="text-center mt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-xl text-lg font-semibold inline-flex items-center"
            >
              ← Back to Home
            </Link>
            <Link 
              href={`/play?grade=${selectedGrade}`}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-semibold inline-flex items-center"
            >
              Next: Play Games 🎮
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

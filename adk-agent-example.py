"""
FunLearn Kids ADK Agent Example
This is a sample ADK agent that processes uploaded lessons and generates educational games.
"""

from flask import Flask, request, jsonify
import base64
import json
from typing import Dict, List, Any

app = Flask(__name__)

class FunLearnAgent:
    def __init__(self):
        self.processed_lessons = {}
        self.game_templates = {
            'math': {
                'quiz': 'Create a math quiz with {difficulty} level questions',
                'puzzle': 'Generate a math puzzle for grade {grade}',
                'memory': 'Create a memory game with numbers'
            },
            'reading': {
                'vocabulary': 'Generate vocabulary games for grade {grade}',
                'comprehension': 'Create reading comprehension questions',
                'word_puzzle': 'Make a word puzzle game'
            },
            'science': {
                'exploration': 'Create science exploration activities',
                'experiment': 'Design simple experiments for grade {grade}',
                'facts': 'Generate fun science facts quiz'
            }
        }
    
    def process_lesson(self, lesson_data: Dict[str, Any]) -> Dict[str, Any]:
        """Process uploaded lesson and generate educational games"""
        try:
            file_info = lesson_data['file']
            grade = lesson_data['grade']
            
            # Extract content based on file type
            content_type = file_info['type']
            content = self._extract_content(file_info, content_type)
            
            # Analyze content to determine subject and difficulty
            subject = self._analyze_subject(content)
            difficulty = self._determine_difficulty(grade)
            
            # Generate games based on content
            games = self._generate_games(subject, grade, difficulty, content)
            
            # Create lesson ID
            lesson_id = f"lesson_{len(self.processed_lessons) + 1}"
            
            # Store processed lesson
            self.processed_lessons[lesson_id] = {
                'id': lesson_id,
                'grade': grade,
                'subject': subject,
                'content': content,
                'games': games,
                'timestamp': lesson_data['timestamp']
            }
            
            return {
                'lessonId': lesson_id,
                'games': games,
                'content': {
                    'subject': subject,
                    'difficulty': difficulty,
                    'summary': f"Grade {grade} {subject} lesson with {len(games)} games"
                }
            }
            
        except Exception as e:
            raise Exception(f"Error processing lesson: {str(e)}")
    
    def _extract_content(self, file_info: Dict, content_type: str) -> str:
        """Extract text content from uploaded file"""
        if content_type.startswith('text/'):
            # Handle text files
            return base64.b64decode(file_info['content']).decode('utf-8')
        elif content_type == 'application/pdf':
            # Handle PDF files (simplified - in production, use proper PDF parsing)
            return f"PDF content from {file_info['name']} - Grade appropriate content"
        elif content_type.startswith('image/'):
            # Handle images (simplified - in production, use OCR)
            return f"Image content from {file_info['name']} - Visual learning material"
        else:
            return f"Content from {file_info['name']} - Educational material"
    
    def _analyze_subject(self, content: str) -> str:
        """Analyze content to determine subject"""
        content_lower = content.lower()
        
        if any(word in content_lower for word in ['math', 'number', 'add', 'subtract', 'multiply']):
            return 'math'
        elif any(word in content_lower for word in ['read', 'word', 'story', 'book', 'letter']):
            return 'reading'
        elif any(word in content_lower for word in ['science', 'experiment', 'nature', 'animal', 'plant']):
            return 'science'
        else:
            return 'general'
    
    def _determine_difficulty(self, grade: int) -> str:
        """Determine difficulty based on grade level"""
        if grade <= 2:
            return 'beginner'
        elif grade <= 4:
            return 'intermediate'
        else:
            return 'advanced'
    
    def _generate_games(self, subject: str, grade: int, difficulty: str, content: str) -> List[Dict]:
        """Generate educational games based on content"""
        games = []
        
        if subject in self.game_templates:
            templates = self.game_templates[subject]
            
            for game_type, template in templates.items():
                games.append({
                    'id': f"{subject}_{game_type}_{grade}",
                    'type': game_type,
                    'title': f"{subject.title()} {game_type.title()} Game",
                    'description': template.format(grade=grade, difficulty=difficulty),
                    'difficulty': difficulty,
                    'grade': grade,
                    'instructions': f"Complete this {subject} activity for grade {grade}!"
                })
        
        # Add general games if no specific subject games
        if not games:
            games.append({
                'id': f"general_quiz_{grade}",
                'type': 'quiz',
                'title': f"Grade {grade} Learning Quiz",
                'description': f"Test your knowledge with grade {grade} questions",
                'difficulty': difficulty,
                'grade': grade,
                'instructions': f"Answer questions based on your uploaded lesson!"
            })
        
        return games

# Initialize the agent
agent = FunLearnAgent()

@app.route('/process-lesson', methods=['POST'])
def process_lesson():
    """Endpoint to process uploaded lessons"""
    try:
        lesson_data = request.get_json()
        result = agent.process_lesson(lesson_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'agent': 'FunLearn Kids ADK Agent',
        'processed_lessons': len(agent.processed_lessons)
    })

@app.route('/lessons', methods=['GET'])
def get_lessons():
    """Get all processed lessons"""
    return jsonify({
        'lessons': list(agent.processed_lessons.values())
    })

if __name__ == '__main__':
    print("🤖 FunLearn Kids ADK Agent starting...")
    print("📚 Ready to process lessons and generate games!")
    app.run(host='0.0.0.0', port=8000, debug=True)

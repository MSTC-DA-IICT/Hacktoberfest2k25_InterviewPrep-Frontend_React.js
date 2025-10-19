/**
 * QUESTION CARD COMPONENT - Displays a single question
 *
 * HACKTOBERFEST TODO:
 * This is a reusable component to display question information in a card format.
 *
 * CONTRIBUTOR TASKS:
 * 1. Accept question data as props
 * 2. Display:
 *    - Question text
 *    - Company name
 *    - Topic/tags
 *    - Job role
 *    - Difficulty level (with color coding)
 *    - Upvote count and button
 *    - Time posted (relative time like "2 days ago")
 * 3. Add click handler to navigate to question details
 * 4. Style difficulty badges with different colors
 * 5. Add hover effects
 * 6. Make responsive
 *
 * PROPS:
 * - question: Question object
 * - onUpvote: Function to handle upvote (optional)
 * - showActions: Boolean to show/hide action buttons
 */

import { Link } from 'react-router-dom';
// TODO: Import date utility function
// import { formatRelativeTime } from '../utils/dateUtils';

/**
 * TODO: IMPLEMENT QUESTION CARD COMPONENT
 *
 * Props:
 * - question: {
 *     _id, questionText, company, topic, role, difficulty,
 *     upvotes, createdAt, updatedAt
 *   }
 * - onUpvote: (questionId) => void
 * - showActions: boolean
 *
 * Features:
 * 1. Difficulty badge with colors:
 *    - Easy: green
 *    - Medium: yellow
 *    - Hard: red
 * 2. Upvote button (heart or arrow icon)
 * 3. Clickable card that links to question details
 * 4. Responsive layout
 * 5. Hover animations
 *
 * EXAMPLE STRUCTURE:
 * <div className="card">
 *   <DifficultyBadge />
 *   <QuestionText />
 *   <CompanyAndTopic />
 *   <Footer>
 *     <Upvotes />
 *     <TimePosted />
 *   </Footer>
 * </div>
 */

const QuestionCard = ({ question, onUpvote, showActions = true }) => {
  // TODO: Implement difficulty color mapping
  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Hard: 'bg-red-100 text-red-800',
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  // Implement upvote handler
  const handleUpvote = (e) => {
    e.preventDefault(); // Prevent navigation when clicking upvote
    e.stopPropagation(); // Prevent event bubbling
    if (onUpvote) {
      onUpvote(question._id);
    }
  };

  // TODO: Format relative time (e.g., "2 days ago")
  const formatTime = (date) => {
    // Implement relative time formatting
    // For now, return placeholder
    return new Date(date).toLocaleDateString();
  };

  return (
    <Link to={`/questions/${question._id}`} className="block">
      <div className="card hover:scale-105 transform transition-all duration-200">
        {/* Header with Difficulty Badge */}
        <div className="flex justify-between items-start mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          {/* TODO: Add upvote button */}
          {showActions && (
            <button
              onClick={handleUpvote}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition"
            >
              {/* Heart icon */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold">{question.upvotes || 0}</span>
            </button>
          )}
        </div>

        {/* Question Text */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">{question.questionText}</h3>

        {/* Tags/Metadata */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {question.company}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
            {question.topic}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
            {question.role}
          </span>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t">
          <span>Posted {formatTime(question.createdAt)}</span>
          {/* TODO: Add view count or comment count if available */}
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;

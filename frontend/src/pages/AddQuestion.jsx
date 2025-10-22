/**
 * ADD QUESTION PAGE - Form to submit a new question
 *
 * HACKTOBERFEST TODO:
 * This page allows authenticated users to submit new interview questions.
 *
 * CONTRIBUTOR TASKS:
 * 1. Create form with fields:
 *    - Question text (textarea, min 10 characters)
 *    - Company (input or select)
 *    - Topic (input or select)
 *    - Role (input or select)
 *    - Difficulty (select: Easy/Medium/Hard)
 * 2. Implement form validation
 * 3. Handle form submission
 * 4. Show success/error messages
 * 5. Redirect to questions page on success
 * 6. Make form user-friendly with hints
 *
 * VALIDATION:
 * - All fields required
 * - Question text minimum 10 characters
 * - Trim whitespace
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createQuestion } from '../api/questionApi';

/**
 * TODO: IMPLEMENT ADD QUESTION PAGE
 *
 * State:
 * - formData: { questionText, company, topic, role, difficulty }
 * - loading: boolean
 * - errors: object with field errors
 *
 * Functions:
 * 1. handleChange() - Update form data
 * 2. validateForm() - Validate all fields
 * 3. handleSubmit() - Submit form to API
 *
 * Validation rules:
 * - questionText: required, min 10 characters
 * - company: required, not empty
 * - topic: required, not empty
 * - role: required, not empty
 * - difficulty: required, one of Easy/Medium/Hard
 */

const AddQuestion = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    questionText: '',
    company: '',
    topic: '',
    role: '',
    difficulty: '',
  });
  const [errors, setErrors] = useState({});

  // TODO: Implement handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // TODO: Implement form validation
  const validateForm = () => {
    const newErrors = {};

    // Trim whitespace and validate questionText
    const trimmedQuestionText = formData.questionText.trim();
    if (!trimmedQuestionText) {
      newErrors.questionText = 'Question is required';
    } else if (trimmedQuestionText.length < 10) {
      newErrors.questionText = 'Question must be at least 10 characters long';
    }

    // Validate company
    const trimmedCompany = formData.company.trim();
    if (!trimmedCompany) {
      newErrors.company = 'Company is required';
    }

    // Validate topic
    const trimmedTopic = formData.topic.trim();
    if (!trimmedTopic) {
      newErrors.topic = 'Topic is required';
    }

    // Validate role
    const trimmedRole = formData.role.trim();
    if (!trimmedRole) {
      newErrors.role = 'Job role is required';
    }

    // Validate difficulty
    if (!formData.difficulty) {
      newErrors.difficulty = 'Difficulty level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // TODO: Implement handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    // TODO: Call createQuestion API
    try {
      // Placeholder
      toast.error('API not implemented yet');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Submit Interview Question</h1>
        <p className="text-gray-600">Share a question you were asked during an interview to help the community</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {/* Question Text */}
        <div className="mb-6">
          <label htmlFor="questionText" className="block text-sm font-semibold text-gray-700 mb-2">
            Question <span className="text-red-500">*</span>
          </label>
          <textarea
            id="questionText"
            name="questionText"
            rows={4}
            className={`input-field ${errors.questionText ? 'border-red-500' : ''}`}
            placeholder="Enter the interview question..."
            value={formData.questionText}
            onChange={handleChange}
          />
          {errors.questionText && <p className="text-red-500 text-sm mt-1">{errors.questionText}</p>}
          <p className="text-gray-500 text-sm mt-1">Minimum 10 characters</p>
        </div>

        {/* Company */}
        <div className="mb-6">
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className={`input-field ${errors.company ? 'border-red-500' : ''}`}
            placeholder="e.g., Google, Amazon, Microsoft"
            value={formData.company}
            onChange={handleChange}
          />
          {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
        </div>

        {/* Topic */}
        <div className="mb-6">
          <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-2">
            Topic <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            className={`input-field ${errors.topic ? 'border-red-500' : ''}`}
            placeholder="e.g., Arrays, System Design, JavaScript"
            value={formData.topic}
            onChange={handleChange}
          />
          {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
        </div>

        {/* Role */}
        <div className="mb-6">
          <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
            Job Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="role"
            name="role"
            className={`input-field ${errors.role ? 'border-red-500' : ''}`}
            placeholder="e.g., SDE, Data Analyst, Frontend Developer"
            value={formData.role}
            onChange={handleChange}
          />
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-700 mb-2">
            Difficulty Level <span className="text-red-500">*</span>
          </label>
          <select
            id="difficulty"
            name="difficulty"
            className={`input-field ${errors.difficulty ? 'border-red-500' : ''}`}
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? 'Submitting...' : 'Submit Question'}
          </button>
          <button type="button" onClick={() => navigate('/questions')} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;

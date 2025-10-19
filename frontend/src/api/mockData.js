/**
 * MOCK DATA FOR DEVELOPMENT
 * 
 * This file provides mock data to test the frontend without a backend server.
 * Remove this file when the actual backend API is implemented.
 */

export const mockQuestions = [
  {
    _id: '1',
    questionText: 'What is the difference between var, let, and const in JavaScript?',
    company: 'Google',
    topic: 'JavaScript',
    role: 'Frontend Developer',
    difficulty: 'Medium',
    upvotes: 42,
    createdAt: '2024-10-15T10:30:00Z',
    updatedAt: '2024-10-15T10:30:00Z'
  },
  {
    _id: '2',
    questionText: 'Explain the concept of closures in JavaScript with an example.',
    company: 'Meta',
    topic: 'JavaScript',
    role: 'Full Stack Developer',
    difficulty: 'Hard',
    upvotes: 38,
    createdAt: '2024-10-14T14:20:00Z',
    updatedAt: '2024-10-14T14:20:00Z'
  },
  {
    _id: '3',
    questionText: 'What is React Virtual DOM and how does it work?',
    company: 'Netflix',
    topic: 'React',
    role: 'Frontend Developer',
    difficulty: 'Medium',
    upvotes: 56,
    createdAt: '2024-10-13T09:15:00Z',
    updatedAt: '2024-10-13T09:15:00Z'
  },
  {
    _id: '4',
    questionText: 'How do you implement authentication in a React application?',
    company: 'Airbnb',
    topic: 'React',
    role: 'Frontend Developer',
    difficulty: 'Hard',
    upvotes: 73,
    createdAt: '2024-10-12T16:45:00Z',
    updatedAt: '2024-10-12T16:45:00Z'
  },
  {
    _id: '5',
    questionText: 'What are React Hooks and why were they introduced?',
    company: 'Uber',
    topic: 'React',
    role: 'Frontend Developer',
    difficulty: 'Easy',
    upvotes: 29,
    createdAt: '2024-10-11T11:30:00Z',
    updatedAt: '2024-10-11T11:30:00Z'
  },
  {
    _id: '6',
    questionText: 'Explain the difference between SQL and NoSQL databases.',
    company: 'Amazon',
    topic: 'Database',
    role: 'Backend Developer',
    difficulty: 'Medium',
    upvotes: 45,
    createdAt: '2024-10-10T13:20:00Z',
    updatedAt: '2024-10-10T13:20:00Z'
  },
  {
    _id: '7',
    questionText: 'What is RESTful API design and what are its principles?',
    company: 'Microsoft',
    topic: 'API Design',
    role: 'Backend Developer',
    difficulty: 'Medium',
    upvotes: 51,
    createdAt: '2024-10-09T15:10:00Z',
    updatedAt: '2024-10-09T15:10:00Z'
  },
  {
    _id: '8',
    questionText: 'How do you optimize database queries for better performance?',
    company: 'Oracle',
    topic: 'Database',
    role: 'Database Administrator',
    difficulty: 'Hard',
    upvotes: 67,
    createdAt: '2024-10-08T12:00:00Z',
    updatedAt: '2024-10-08T12:00:00Z'
  }
];

export const mockCategories = {
  companies: ['Google', 'Meta', 'Netflix', 'Airbnb', 'Uber', 'Amazon', 'Microsoft', 'Oracle'],
  topics: ['JavaScript', 'React', 'Database', 'API Design', 'Node.js', 'Python', 'System Design'],
  roles: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Database Administrator', 'DevOps Engineer']
};

/**
 * Mock API functions that simulate server responses
 */
export const mockGetAllQuestions = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredQuestions = [...mockQuestions];

      // Filter by company
      if (filters.company) {
        filteredQuestions = filteredQuestions.filter(q => 
          q.company.toLowerCase().includes(filters.company.toLowerCase())
        );
      }

      // Filter by topic
      if (filters.topic) {
        filteredQuestions = filteredQuestions.filter(q => 
          q.topic.toLowerCase().includes(filters.topic.toLowerCase())
        );
      }

      // Filter by role
      if (filters.role) {
        filteredQuestions = filteredQuestions.filter(q => 
          q.role.toLowerCase().includes(filters.role.toLowerCase())
        );
      }

      // Filter by difficulty
      if (filters.difficulty) {
        filteredQuestions = filteredQuestions.filter(q => 
          q.difficulty === filters.difficulty
        );
      }

      // Sort questions
      if (filters.sort) {
        switch (filters.sort) {
          case 'latest':
            filteredQuestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case 'oldest':
            filteredQuestions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
          case 'upvotes':
            filteredQuestions.sort((a, b) => b.upvotes - a.upvotes);
            break;
          default:
            // Default to latest
            filteredQuestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
      }

      resolve({
        success: true,
        questions: filteredQuestions,
        total: filteredQuestions.length
      });
    }, 500); // Simulate network delay
  });
};

export const mockGetCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        ...mockCategories
      });
    }, 300);
  });
};

export const mockSearchQuestions = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const searchResults = mockQuestions.filter(q => 
        q.questionText.toLowerCase().includes(keyword.toLowerCase()) ||
        q.company.toLowerCase().includes(keyword.toLowerCase()) ||
        q.topic.toLowerCase().includes(keyword.toLowerCase())
      );

      resolve({
        success: true,
        questions: searchResults,
        total: searchResults.length
      });
    }, 400);
  });
};
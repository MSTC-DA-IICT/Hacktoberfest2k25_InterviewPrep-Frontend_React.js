/* eslint-disable no-unused-vars */
/**
 * QUESTIONS PAGE - Browse all questions with filters
 *
 * HACKTOBERFEST TODO:
 * This page displays all questions with filtering and sorting options.
 *
 * CONTRIBUTOR TASKS:
 * 1. Fetch all questions from API
 * 2. Implement filter by:
 *    - Company
 *    - Topic
 *    - Role
 *    - Difficulty
 * 3. Implement search functionality
 * 4. Implement sorting (latest, oldest, most upvoted)
 * 5. Implement pagination or infinite scroll
 * 6. Display questions using QuestionCard component
 * 7. Add loading and error states
 * 8. Make responsive with sidebar filters
 *
 * FEATURES:
 * - Search bar
 * - Filter sidebar/dropdown
 * - Sort options
 * - Question grid/list
 * - Pagination
 */

import { useState, useEffect, useCallback } from 'react';
// Import API functions
import { getAllQuestions, getCategories, searchQuestions } from '../api/questionApi';
import QuestionCard from '../components/QuestionCard';
// import Loading from '../components/Loading';

/**
 * TODO: IMPLEMENT QUESTIONS PAGE
 *
 * State to manage:
 * - questions: Array of questions
 * - filters: { company, topic, role, difficulty, sort }
 * - searchQuery: string
 * - loading: boolean
 * - error: string
 * - pagination: { page, limit, total }
 * - categories: { companies, topics, roles }
 *
 * Functions:
 * 1. fetchQuestions() - Fetch questions with filters
 * 2. fetchCategories() - Fetch filter options
 * 3. handleFilterChange() - Update filters
 * 4. handleSearch() - Search questions
 * 5. handleSort() - Sort questions
 * 6. handlePageChange() - Pagination
 *
 * LAYOUT:
 * <div>
 *   <SearchBar />
 *   <div className="flex">
 *     <FilterSidebar />
 *     <QuestionGrid />
 *   </div>
 *   <Pagination />
 * </div>
 */

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState('');

  const [filters, setFilters] = useState({
    company: '',
    topic: '',
    role: '',
    difficulty: '',
    sort: 'latest',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState({
    companies: [],
    topics: [],
    roles: [],
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

const fetchQuestions = useCallback(async () => {
  setLoading(true);
  setError('');
  try {
    const queryParams = {};
    if (filters.company) queryParams.company = filters.company;
    if (filters.topic) queryParams.topic = filters.topic;
    if (filters.role) queryParams.role = filters.role;
    if (filters.difficulty) queryParams.difficulty = filters.difficulty;
    if (filters.sort) queryParams.sort = filters.sort;

    const questionData = await getAllQuestions(queryParams);
    setQuestions(questionData.questions || questionData || []);
  } catch (err) {
    setError('Failed to load questions. Please try again later.');
    console.error('Error fetching questions:', err);
  } finally {
    setLoading(false);
  }
}, [filters]);

  // Fetch questions on mount and when filters change
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  //Fetch categories function for filters
  const fetchCategories = async () => {
    setCategoriesLoading(true);
    setCategoriesError('');
    try {
      const categoriesData = await getCategories();

      setCategories({
        companies: categoriesData.companies || [],
        topics: categoriesData.topics || [],
        roles: categoriesData.roles || [],
      })
    }
    catch (err) {
      setCategoriesError('Failed to load filter options. Please try again later.');
      console.error('Error fetching categories:', err);
    }
    finally {
      setCategoriesLoading(false); // This ensures loading stops even if error occurs
    }
  }

  // Handle search functionality
  const handleSearch = useCallback(async () => {
    if (searchQuery.trim()) {
      setLoading(true);
      setError('');
      try {
        const response = await searchQuestions(searchQuery);
        setQuestions(response.questions || []);
      } catch (err) {
        setError('Failed to search questions. Please try again later.');
        console.error('Error searching questions:', err);
      } finally {
        setLoading(false);
      }
    } else {
      // If search is empty, fetch all questions with current filters
      fetchQuestions();
    }
  }, [searchQuery, fetchQuestions]);

  // Debounce search queries
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      handleSearch();
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, handleSearch]);

  // Fetch categories for filters
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Interview Questions</h1>
        <p className="text-gray-600">Browse and search through community-sourced interview questions</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        {/* TODO: Implement search input */}
        <input
          type="text"
          placeholder="Search questions, companies, or topics..."
          className="input-field"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters and Sort */}
      <div className="mb-6 flex flex-wrap gap-4">
        {/* TODO: Implement filter dropdowns */}
        <select
          className="px-4 py-2 border rounded-lg"
          value={filters.company}
          onChange={(e) => handleFilterChange('company', e.target.value)}
        >
          <option value="">All Companies</option>
          {categories.companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 border rounded-lg"
          value={filters.topic}
          onChange={(e) => handleFilterChange('topic', e.target.value)}
        >
          <option value="">All Topics</option>
          {categories.topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 border rounded-lg"
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        >
          <option value="">All Roles</option>
          {categories.roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 border rounded-lg"
          value={filters.difficulty}
          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          className="px-4 py-2 border rounded-lg"
          value={filters.sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Questions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading questions...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No questions found. Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
              onUpvote={(questionId) => {
                // TODO: Implement upvote functionality
                console.log('Upvote question:', questionId);
              }}
              showActions={true}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {/* TODO: Implement pagination controls */}
      <div className="mt-8 flex justify-center">
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">Previous</button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">2</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">3</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Questions;

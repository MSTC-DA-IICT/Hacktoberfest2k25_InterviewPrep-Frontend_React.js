/**
 * HOME PAGE - Landing page
 *
 * HACKTOBERFEST TODO:
 * This is the main landing page of the application.
 *
 * CONTRIBUTOR TASKS:
 * 1. Create hero section with:
 *    - App title and tagline
 *    - Brief description
 *    - Call-to-action buttons
 * 2. Add features section highlighting key features
 * 3. Show recent/trending questions
 * 4. Add statistics (total questions, companies, topics)
 * 5. Make responsive and attractive
 *
 * SECTIONS:
 * - Hero section
 * - Features/Benefits
 * - Recent questions preview
 * - Statistics
 * - Call to action
 */

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllQuestions, searchQuestions } from '../api/questionApi';
import QuestionCard from '../components/QuestionCard';
import toast from 'react-hot-toast';
import { Search } from 'lucide-react';

const Home = () => {
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchRecentQuestions = async () => {
    setLoading(true);
    try {
      const response = await getAllQuestions({ 
        sort: 'latest', 
        limit: 6 
      });
      
      setRecentQuestions(response.questions || []);
    } catch (error) {
      console.error('Error fetching recent questions:', error);
      toast.error('Failed to load recent questions');
      setRecentQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentQuestions();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to questions page with search query
      navigate(`/questions?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to InterviewPrep</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            A community-sourced interview question bank where students share real questions from their internship and
            placement interviews.
          </p>
          
          {/* Search Bar in Hero */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search interview questions, companies, or topics..."
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition"
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex justify-center gap-4">
            <Link to="/questions" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Browse Questions
            </Link>
            <Link to="/submit" className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition border-2 border-white">
              Submit Question
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use InterviewPrep?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transform transition duration-300">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Vast Question Bank</h3>
              <p className="text-gray-600">
                Access thousands of real interview questions from top companies
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transform transition duration-300">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold mb-2">Company-Specific</h3>
              <p className="text-gray-600">
                Filter questions by company, role, and difficulty level
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transform transition duration-300">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Community-Driven</h3>
              <p className="text-gray-600">
                Built by students, for students. Everyone can contribute.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transform transition duration-300">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">Topic-wise Practice</h3>
              <p className="text-gray-600">
                Practice questions categorized by topic and difficulty to strengthen weak areas.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transform transition duration-300">
              <div className="text-4xl mb-4">🔖</div>
              <h3 className="text-xl font-semibold mb-2">Bookmark Questions</h3>
              <p className="text-gray-600">
                Save your favorite interview questions to revisit anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Questions Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Questions</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="ml-4 text-gray-600">Loading questions...</p>
            </div>
          ) : recentQuestions.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentQuestions.map((question) => (
                  <QuestionCard 
                    key={question._id} 
                    question={question}
                    showActions={true}
                  />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link 
                  to="/questions" 
                  className="text-primary-600 hover:underline font-semibold text-lg"
                >
                  View All Questions →
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p className="text-lg mb-4">No questions available yet</p>
              <Link 
                to="/submit" 
                className="text-primary-600 hover:underline font-semibold"
              >
                Be the first to submit a question! →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-100">Questions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-primary-100">Topics</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Preparing?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community and access thousands of interview questions
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-3">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

// /**
//  * HOME PAGE - Landing page
//  *
//  * HACKTOBERFEST TODO:
//  * This is the main landing page of the application.
//  *
//  * CONTRIBUTOR TASKS:
//  * 1. Create hero section with:
//  *    - App title and tagline
//  *    - Brief description
//  *    - Call-to-action buttons
//  * 2. Add features section highlighting key features
//  * 3. Show recent/trending questions
//  * 4. Add statistics (total questions, companies, topics)
//  * 5. Make responsive and attractive
//  *
//  * SECTIONS:
//  * - Hero section
//  * - Features/Benefits
//  * - Recent questions preview
//  * - Statistics
//  * - Call to action
//  */

// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// // TODO: Import API functions
// import { getAllQuestions } from '../api/questionApi';
// import QuestionCard from '../components/QuestionCard';
// import toast from 'react-hot-toast';

// /**
//  * TODO: IMPLEMENT HOME PAGE
//  *
//  * Features:
//  * 1. Hero section with CTA
//  * 2. Fetch and display recent questions
//  * 3. Show statistics
//  * 4. Features grid
//  * 5. Responsive design
//  *
//  * EXAMPLE STRUCTURE:
//  * <div>
//  *   <HeroSection />
//  *   <FeaturesSection />
//  *   <RecentQuestions />
//  *   <Statistics />
//  *   <CTASection />
//  * </div>
//  */

// const Home = () => {
//   const [recentQuestions, setRecentQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // TODO: Fetch recent questions on mount

//   const fetchRecentQuestions = async () => {
//     setLoading(true);
//     try {
//       const response = await getAllQuestions({ 
//         sort: 'latest', 
//         limit: 6 
//       });
      
//       setRecentQuestions(response.questions || []);
//     } catch (error) {
//       console.error('Error fetching recent questions:', error);
//       toast.error('Failed to load recent questions');
//       setRecentQuestions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRecentQuestions();
//   }, []);

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-5xl font-bold mb-6">Welcome to InterviewPrep</h1>
//           <p className="text-xl mb-8 max-w-2xl mx-auto">
//             A community-sourced interview question bank where students share real questions from their internship and
//             placement interviews.
//           </p>
//           <div className="flex justify-center gap-4">
//             <Link to="/questions" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
//               Browse Questions
//             </Link>
//             <Link to="/submit" className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition border-2 border-white">
//               Submit Question
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Why Use InterviewPrep?</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {/* TODO: Add feature cards */}
//             <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transform transition duration-300">
//               <div className="text-4xl mb-4">📚</div>
//               <h3 className="text-xl font-semibold mb-2">Vast Question Bank</h3>
//               <p className="text-gray-600">
//                 Access thousands of real interview questions from top companies
//               </p>
//             </div>
//             <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transform transition duration-300">
//               <div className="text-4xl mb-4">🏢</div>
//               <h3 className="text-xl font-semibold mb-2">Company-Specific</h3>
//               <p className="text-gray-600">
//                 Filter questions by company, role, and difficulty level
//               </p>
//             </div>
//             <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transform transition duration-300">
//               <div className="text-4xl mb-4">🤝</div>
//               <h3 className="text-xl font-semibold mb-2">Community-Driven</h3>
//               <p className="text-gray-600">
//                 Built by students, for students. Everyone can contribute.
//               </p>
//             </div>
//             <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transform transition duration-300">
//               <div className="text-4xl mb-4">🧠</div>
//               <h3 className="text-xl font-semibold mb-2">Topic-wise Practice</h3>
//               <p className="text-gray-600">
//                 Practice questions categorized by topic and difficulty to strengthen weak areas.
//               </p>
//             </div>
//             <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transform transition duration-300">
//               <div className="text-4xl mb-4">🔖</div>
//               <h3 className="text-xl font-semibold mb-2">Bookmark Questions</h3>
//               <p className="text-gray-600">
//                 Save your favorite interview questions to revisit anytime.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Recent Questions Preview */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Recent Questions</h2>
//           {/* TODO: Display recent questions using QuestionCard */}
//           {
//             loading ? (
//                <div className="flex justify-center items-center py-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
//         <p className="ml-4 text-gray-600">Loading questions...</p>
//       </div>
//             ) : recentQuestions.length > 0 ? (
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {recentQuestions.map((question) => (
//           <QuestionCard 
//             key={question._id} 
//             question={question}
//             showActions={true}
//           />
//         ))}
//       </div>
//             ) : (
//               <div className="text-center text-gray-500 col-span-full py-8">
//         <p className="text-lg mb-4">No questions available yet</p>
//         <Link 
//           to="/submit" 
//           className="text-primary-600 hover:underline font-semibold"
//         >
//           Be the first to submit a question! →
//         </Link>
//       </div>
//             )
//           }
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* Placeholder */}
//             <div className="text-center text-gray-500 col-span-full py-8">
//               <p>Questions will appear here once implemented</p>
//               <Link to="/questions" className="text-primary-600 hover:underline mt-2 inline-block">
//                 View All Questions →
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Statistics Section */}
//       <section className="py-16 bg-primary-600 text-white">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-3 gap-8 text-center">
//             {/* TODO: Fetch and display real statistics */}
//             <div>
//               <div className="text-4xl font-bold mb-2">500+</div>
//               <div className="text-primary-100">Questions</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold mb-2">50+</div>
//               <div className="text-primary-100">Companies</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold mb-2">20+</div>
//               <div className="text-primary-100">Topics</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-4">Ready to Start Preparing?</h2>
//           <p className="text-xl text-gray-600 mb-8">
//             Join our community and access thousands of interview questions
//           </p>
//           <Link to="/register" className="btn-primary text-lg px-8 py-3">
//             Get Started Free
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

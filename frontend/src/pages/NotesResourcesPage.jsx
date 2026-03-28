import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Book, ChevronDown, ChevronUp, ExternalLink, Download } from 'lucide-react';
import './NotesResourcesPage.css';

function NotesResourcesPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState(null);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const categories = {
    Frontend: {
      color: '#06b6d4',
      icon: '🎨',
      topics: [
        {
          title: 'HTML Fundamentals',
          points: [
            'Semantic HTML tags and accessibility (a11y)',
            'Meta tags and SEO optimization',
            'Form elements and validation',
            'Canvas and SVG for graphics',
            'Web APIs and DOM manipulation'
          ]
        },
        {
          title: 'CSS Advanced',
          points: [
            'Flexbox and CSS Grid layouts',
            'Responsive design and media queries',
            'CSS animations and transitions',
            'CSS custom properties (variables)',
            'Box model and positioning'
          ]
        },
        {
          title: 'JavaScript Essentials',
          points: [
            'Closures and scope chain',
            'Promises and async/await',
            'Event loop and callback queue',
            'Prototypal inheritance',
            'ES6+ features (arrow functions, destructuring, spread)'
          ]
        },
        {
          title: 'React Deep Dive',
          points: [
            'Virtual DOM and reconciliation',
            'Hooks (useState, useEffect, useContext)',
            'Component lifecycle and optimization',
            'State management patterns',
            'React Router and navigation'
          ]
        }
      ]
    },
    Backend: {
      color: '#f59e0b',
      icon: '⚙️',
      topics: [
        {
          title: 'RESTful APIs',
          points: [
            'HTTP methods and status codes',
            'Request/response structure',
            'API versioning strategies',
            'Authentication (JWT, OAuth)',
            'Error handling and validation'
          ]
        },
        {
          title: 'Database Design',
          points: [
            'Relational vs NoSQL databases',
            'Normalization and schema design',
            'Indexing for performance',
            'Transactions and ACID properties',
            'Query optimization'
          ]
        },
        {
          title: 'Server Architecture',
          points: [
            'Middleware and request pipeline',
            'Caching strategies',
            'Load balancing and scalability',
            'Microservices patterns',
            'Message queues (RabbitMQ, Kafka)'
          ]
        },
        {
          title: 'Security Best Practices',
          points: [
            'SQL injection and XSS prevention',
            'CORS and same-origin policy',
            'Rate limiting and DDoS protection',
            'Secure password storage',
            'Environment variables and secrets'
          ]
        }
      ]
    },
    DSA: {
      color: '#10b981',
      icon: '📊',
      topics: [
        {
          title: 'Arrays and Strings',
          points: [
            'Two-pointer technique',
            'Sliding window problems',
            'Binary search and variants',
            'String manipulation algorithms',
            'Prefix sum and difference arrays'
          ]
        },
        {
          title: 'Trees and Graphs',
          points: [
            'DFS and BFS traversals',
            'Binary search trees (BST)',
            'Balanced trees (AVL, Red-Black)',
            'Graph representation and algorithms',
            'Shortest path (Dijkstra, Bellman-Ford)'
          ]
        },
        {
          title: 'Dynamic Programming',
          points: [
            'Memoization vs tabulation',
            'Longest common subsequence',
            'Coin change and knapsack problems',
            'State definition and transitions',
            'Optimization techniques'
          ]
        },
        {
          title: 'Sorting and Searching',
          points: [
            'Quick sort, merge sort complexity',
            'Heap and priority queues',
            'Counting sort and radix sort',
            'Selection algorithm (Kth element)',
            'Time and space complexity analysis'
          ]
        }
      ]
    },
    Java: {
      color: '#ef4444',
      icon: '☕',
      topics: [
        {
          title: 'Object-Oriented Programming',
          points: [
            'Encapsulation with access modifiers',
            'Inheritance and polymorphism',
            'Abstract classes vs interfaces',
            'Method overloading and overriding',
            'Composition over inheritance'
          ]
        },
        {
          title: 'Collections Framework',
          points: [
            'List, Set, Map interfaces',
            'ArrayList vs LinkedList performance',
            'HashSet vs TreeSet characteristics',
            'HashMap vs ConcurrentHashMap',
            'Iterators and fail-fast behavior'
          ]
        },
        {
          title: 'Concurrency',
          points: [
            'Threads and runnable interface',
            'Synchronized methods and blocks',
            'Volatile keyword and memory visibility',
            'ExecutorService and thread pools',
            'Locks and concurrent collections'
          ]
        },
        {
          title: 'Java 8+ Features',
          points: [
            'Lambda expressions and functional interfaces',
            'Streams API (map, filter, reduce)',
            'Optional class and null handling',
            'Default methods in interfaces',
            'Method references and function composition'
          ]
        }
      ]
    },
    Python: {
      color: '#3b82f6',
      icon: '🐍',
      topics: [
        {
          title: 'Core Concepts',
          points: [
            'Variables and data types',
            'Lists, tuples, sets, dictionaries',
            'String formatting and manipulation',
            'Lambda functions and comprehensions',
            'Generators and iterators'
          ]
        },
        {
          title: 'OOP in Python',
          points: [
            '__init__ constructor and self parameter',
            'Class and instance variables',
            'Inheritance and MRO (Method Resolution Order)',
            'Magic methods (__str__, __len__)',
            'Decorators for class and function enhancement'
          ]
        },
        {
          title: 'Advanced Features',
          points: [
            'Context managers (with statement)',
            'Metaclasses and descriptors',
            'Exception handling and custom exceptions',
            'Asyncio for asynchronous programming',
            'Type hints and mypy'
          ]
        },
        {
          title: 'Common Libraries',
          points: [
            'NumPy for numerical computing',
            'Pandas for data manipulation',
            'Django and Flask frameworks',
            'Requests for HTTP operations',
            'SQLAlchemy ORM'
          ]
        }
      ]
    },
    'Data Analyst': {
      color: '#8b5cf6',
      icon: '📈',
      topics: [
        {
          title: 'SQL Fundamentals',
          points: [
            'SELECT, WHERE, ORDER BY, GROUP BY',
            'JOINs (INNER, LEFT, RIGHT, FULL)',
            'Aggregation functions (COUNT, SUM, AVG)',
            'Subqueries and window functions',
            'Indexes and query optimization'
          ]
        },
        {
          title: 'Data Manipulation',
          points: [
            'INSERT, UPDATE, DELETE operations',
            'Transactions and rollback',
            'Normalization and schema design',
            'Data types and constraints',
            'ETL processes'
          ]
        },
        {
          title: 'Advanced Analytics',
          points: [
            'Window functions (ROW_NUMBER, RANK)',
            'Pivot tables and crosstabs',
            'Common table expressions (CTE)',
            'Statistical analysis',
            'Time series analysis'
          ]
        },
        {
          title: 'Best Practices',
          points: [
            'Query performance tuning',
            'Database design principles',
            'Data quality and validation',
            'Backup and recovery strategies',
            'Security and access control'
          ]
        }
      ]
    },
    'Full Stack': {
      color: '#06b6d4',
      icon: '🔗',
      topics: [
        {
          title: 'Architecture Patterns',
          points: [
            'MVC, MVVM, and clean architecture',
            'RESTful vs GraphQL APIs',
            'Monolithic vs microservices',
            'Event-driven architecture',
            'SOLID principles'
          ]
        },
        {
          title: 'DevOps & Deployment',
          points: [
            'Docker and containerization',
            'Kubernetes orchestration basics',
            'CI/CD pipelines and automation',
            'Cloud platforms (AWS, Azure, GCP)',
            'Infrastructure as Code (IaC)'
          ]
        },
        {
          title: 'Performance & Optimization',
          points: [
            'Caching strategies (Redis, Memcached)',
            'Database query optimization',
            'Frontend optimization (minification)',
            'Load balancing techniques',
            'Monitoring and logging'
          ]
        },
        {
          title: 'Security',
          points: [
            'HTTPS and SSL/TLS',
            'SQL injection prevention',
            'Cross-Site Scripting (XSS) protection',
            'Authentication and authorization',
            'API rate limiting and throttling'
          ]
        }
      ]
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/notes-resources/${category}`);
  };

  return (
    <div className="notes-resources-page">
      <div className="notes-container">
        {/* Header */}
        <div className="notes-header">
          <div className="header-icon">
            <Book size={48} />
          </div>
          <h1>📚 Notes & Resources</h1>
          <p>Comprehensive study materials for every interview category</p>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {Object.entries(categories).map(([categoryName, categoryData]) => (
            <div key={categoryName} className="category-card" onClick={() => handleCategoryClick(categoryName)}>
              <div 
                className="category-header"
                style={{ '--accent-color': categoryData.color }}
              >
                <div className="header-content">
                  <span className="category-icon">{categoryData.icon}</span>
                  <h2>{categoryName}</h2>
                </div>
                <button className="toggle-btn">
                  <ChevronDown size={24} />
                </button>
              </div>

              <div className="category-content-preview">
                {categoryData.topics.slice(0, 2).map((topic, idx) => (
                  <div key={idx} className="topic-section">
                    <h3>{topic.title}</h3>
                    <ul>
                      {topic.points.slice(0, 2).map((point, pIdx) => (
                          <li key={pIdx}>
                            <span className="bullet">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: 'center', padding: '15px', borderTop: '1px solid rgba(71, 85, 105, 0.5)' }}>
                  <button style={{
                    background: `linear-gradient(135deg, ${categoryData.color}, #06b6d4)`,
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                  }}>
                    View Full Explanations →
                  </button>
                </div>
            </div>
          ))}
        </div>

        {/* Quick Tips Section */}
        <div className="tips-section">
          <h2>💡 Study Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>📖 Read & Review</h3>
              <p>Go through each topic systematically. Don't rush through the material.</p>
            </div>
            <div className="tip-card">
              <h3>✍️ Practice Coding</h3>
              <p>Implement the concepts you learn. Practice coding regularly on platforms like LeetCode.</p>
            </div>
            <div className="tip-card">
              <h3>🎯 Take Notes</h3>
              <p>Write down key concepts and examples. This helps in retention and quick revision.</p>
            </div>
            <div className="tip-card">
              <h3>⏰ Time Management</h3>
              <p>Allocate time based on your weak areas. Keep revising regularly.</p>
            </div>
            <div className="tip-card">
              <h3>🤝 Discuss & Learn</h3>
              <p>Talk about concepts with peers. Teaching others helps you learn better.</p>
            </div>
            <div className="tip-card">
              <h3>🧪 Mock Interviews</h3>
              <p>Use the mock interview feature to practice. Review feedback and improve.</p>
            </div>
          </div>
        </div>

        {/* Resources Links */}
        <div className="resources-section">
          <h2>🔗 External Resources</h2>
          <div className="resources-grid">
            <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer" className="resource-card">
              <ExternalLink size={20} />
              <h3>MDN Web Docs</h3>
              <p>Comprehensive web development documentation</p>
            </a>
            <a href="https://www.geeksforgeeks.org" target="_blank" rel="noopener noreferrer" className="resource-card">
              <ExternalLink size={20} />
              <h3>GeeksforGeeks</h3>
              <p>Tutorials for DSA, Java, Python, and more</p>
            </a>
            <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="resource-card">
              <ExternalLink size={20} />
              <h3>LeetCode</h3>
              <p>Practice coding problems and improve</p>
            </a>
            <a href="https://www.youtube.com/c/apnacollegde" target="_blank" rel="noopener noreferrer" className="resource-card">
              <ExternalLink size={20} />
              <h3>Apna College</h3>
              <p>Free coding tutorials and interviews</p>
            </a>
            <a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer" className="resource-card">
              <ExternalLink size={20} />
              <h3>Coursera</h3>
              <p>Online courses from top universities</p>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="resource-card">
              <ExternalLink size={20} />
              <h3>GitHub</h3>
              <p>Explore open source projects and code</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesResourcesPage;

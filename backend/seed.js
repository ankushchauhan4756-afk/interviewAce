import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Question from './src/models/Question.js';

dotenv.config();

// Sample questions organized by category
const sampleQuestions = [
  // Frontend (5 questions)
  { 
    title: 'Explain Closure in JavaScript', 
    description: 'What is a closure and how does it work? Provide examples.', 
    difficulty: 'Easy', 
    category: 'Frontend', 
    tags: ['JavaScript', 'Functions', 'Scope'], 
    solution: 'A closure is a function that has access to variables in its outer scope even after the outer function has returned.',
    solutionCode: `function outer() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2`,
    testCases: [
      { input: 'outer()()', output: '1', difficulty: 'Easy' },
      { input: 'outer()()', output: '1', difficulty: 'Easy' }
    ]
  },
  { 
    title: 'Difference between var, let, and const', 
    description: 'Explain the differences between var, let, and const in JavaScript.', 
    difficulty: 'Easy', 
    category: 'Frontend', 
    tags: ['JavaScript', 'Variables'], 
    solution: 'var is function-scoped, let and const are block-scoped. const cannot be reassigned.',
    solutionCode: `// var - function scoped
var x = 1;
if (true) {
  var x = 2;
}
console.log(x); // 2

// let - block scoped  
let y = 1;
if (true) {
  let y = 2;
}
console.log(y); // 1

// const - block scoped, immutable
const z = 1;
// z = 2; // Error`,
    testCases: []
  },
  { 
    title: 'What is Event Delegation?', 
    description: 'Explain event delegation in JavaScript and provide use cases.', 
    difficulty: 'Medium', 
    category: 'Frontend', 
    tags: ['JavaScript', 'DOM', 'Events'], 
    solution: 'Event delegation is leveraging event bubbling to handle events on multiple elements using a single listener.',
    solutionCode: `// Without delegation
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// With delegation (more efficient)
document.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    handleClick(e);
  }
});`,
    testCases: []
  },
  { 
    title: 'Difference between Promise and Async/Await', 
    description: 'Compare promises and async/await and when to use each.', 
    difficulty: 'Medium', 
    category: 'Frontend', 
    tags: ['JavaScript', 'Async'], 
    solution: 'Async/await is syntactic sugar over promises. Both handle asynchronous operations but async/await is more readable.',
    solutionCode: `// Promise approach
function getData() {
  return fetch('/api/data')
    .then(res => res.json())
    .catch(err => console.error(err));
}

// Async/await approach
async function getData() {
  try {
    const res = await fetch('/api/data');
    return res.json();
  } catch (err) {
    console.error(err);
  }
}`,
    testCases: []
  },
  { 
    title: 'Implement Debounce Function', 
    description: 'Write a debounce function that delays function execution.', 
    difficulty: 'Hard', 
    category: 'Frontend', 
    tags: ['JavaScript', 'Optimization'], 
    solution: 'Debounce delays execution until after a cooldown period with no new calls.',
    solutionCode: `function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const handleSearch = debounce((term) => {
  console.log('Searching for:', term);
}, 300);

handleSearch('react');
handleSearch('react-native'); // First call is cancelled`,
    testCases: []
  },

  // Backend (5 questions)
  { 
    title: 'What is REST API?', 
    description: 'Explain REST API concepts, principles, and HTTP methods.', 
    difficulty: 'Easy', 
    category: 'Backend', 
    tags: ['API', 'REST', 'HTTP'], 
    solution: 'REST (Representational State Transfer) is an architectural style using HTTP for CRUD operations on resources.',
    solutionCode: `// REST API example
app.get('/users/:id', (req, res) => {  // Read
  res.json({ user: getUserById(req.params.id) });
});

app.post('/users', (req, res) => {  // Create
  const newUser = createUser(req.body);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {  // Update
  const updated = updateUser(req.params.id, req.body);
  res.json(updated);
});

app.delete('/users/:id', (req, res) => {  // Delete
  deleteUser(req.params.id);
  res.status(204).send();
});`,
    testCases: []
  },
  { 
    title: 'Difference between SQL and NoSQL', 
    description: 'Compare relational and non-relational databases.', 
    difficulty: 'Easy', 
    category: 'Backend', 
    tags: ['Database', 'SQL', 'NoSQL'], 
    solution: 'SQL is relational with fixed schema. NoSQL is flexible with dynamic schema.',
    solutionCode: `// SQL - Fixed schema
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

// NoSQL - Flexible schema  
db.users.insertOne({
  _id: ObjectId(),
  name: 'John',
  email: 'john@example.com',
  profile: { age: 25 }
});`,
    testCases: []
  },
  { 
    title: 'How does Authentication Work?', 
    description: 'Explain JWT, sessions, and OAuth authentication methods.', 
    difficulty: 'Medium', 
    category: 'Backend', 
    tags: ['Security', 'Authentication'], 
    solution: 'JWT tokens are stateless, sessions are stateful. OAuth is third-party authentication.',
    solutionCode: `// JWT approach
const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1h' });
res.json({ token });

// Mock verification
function verifyJWT(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

// Session approach
req.session.userId = user._id;
// Verify: const userId = req.session.userId;`,
    testCases: []
  },
  { 
    title: 'What is Middleware?', 
    description: 'Explain middleware in Express.js and its role.', 
    difficulty: 'Medium', 
    category: 'Backend', 
    tags: ['Express', 'Middleware'], 
    solution: 'Middleware are functions that process requests/responses. They can modify or end the cycle.',
    solutionCode: `// Custom middleware
function logger(req, res, next) {
  console.log(req.method, req.url);
  next(); // Pass to next middleware
}

// Using middleware
app.use(logger);
app.use(express.json());

app.get('/data', (req, res) => {
  res.json({ data: 'value' });
});`,
    testCases: []
  },
  { 
    title: 'Implement Pagination in API', 
    description: 'How to implement pagination for large datasets?', 
    difficulty: 'Hard', 
    category: 'Backend', 
    tags: ['Database', 'Performance'], 
    solution: 'Use limit and offset parameters to query specific data chunks efficiently.',
    solutionCode: `// Pagination logic
app.get('/items', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const items = db.items
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  
  const total = db.items.count();
  
  res.json({
    items,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page
  });
});`,
    testCases: []
  },

  // Full Stack (4 questions)
  { 
    title: 'Explain MVC Architecture', 
    description: 'What is MVC and how does it work in full-stack applications?', 
    difficulty: 'Medium', 
    category: 'Full Stack', 
    tags: ['Architecture', 'Design Pattern'], 
    solution: 'MVC separates Model (data), View (UI), and Controller (logic) for organized development.',
    solutionCode: `// Model - Data layer
class UserModel {
  getuser(id) { return db.users.findById(id); }
}

// View - UI layer (React component)
function UserView({ user }) {
  return <div>{user.name}</div>;
}

// Controller - Business logic
class UserController {
  getUser(req, res) {
    const user = UserModel.getUser(req.params.id);
    res.json(user);
  }
}`,
    testCases: []
  },
  { 
    title: 'Difference between Frontend and Backend Validation', 
    description: 'When and why use validation on each side?', 
    difficulty: 'Medium', 
    category: 'Full Stack', 
    tags: ['Validation', 'Security'], 
    solution: 'Frontend is for UX, backend is for security. Always validate on both.',
    solutionCode: `// Frontend validation (UX)
function validateEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

// Backend validation (Security)
app.post('/register', (req, res) => {
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  // Never trust client input!
  createUser(req.body);
});`,
    testCases: []
  },
  { 
    title: 'How to Handle CORS in Web Applications?', 
    description: 'Explain CORS and how to enable it.', 
    difficulty: 'Medium', 
    category: 'Full Stack', 
    tags: ['Web Security', 'HTTP'], 
    solution: 'CORS allows cross-origin requests. Use appropriate headers or CORS middleware.',
    solutionCode: `// Using CORS middleware
import cors from 'cors';

app.use(cors());

// Or with options
app.use(cors({
  origin: 'https://frontend.com',
  credentials: true,
  methods: ['GET', 'POST']
}));

// Manual headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  next();
});`,
    testCases: []
  },
  { 
    title: 'Explain the Complete Request-Response Cycle', 
    description: 'Describe flow from browser request to server response.', 
    difficulty: 'Hard', 
    category: 'Full Stack', 
    tags: ['HTTP', 'Web'], 
    solution: 'Browser request → Server processes → DB query → Response sent → Browser renders.',
    solutionCode: `// Complete cycle
// 1. Browser sends request
// GET /api/users/123 HTTP/1.1

// 2. Server receives (middleware process)
app.use(authenticate);
app.use(cors);

// 3. Route matches
app.get('/users/:id', (req, res) => {
  // 4. Query database
  const user = db.users.findById(req.params.id);
  
  // 5. Send response  
  res.json({ success: true, user });
});

// 6. Browser receives and renders`,
    testCases: []
  },

  // Data Analyst (4 questions)
  { 
    title: 'What is Data Normalization?', 
    description: 'Explain database normalization and its forms.', 
    difficulty: 'Easy', 
    category: 'Data Analyst', 
    tags: ['Database', 'Data Design'], 
    solution: 'Normalization organizes data to reduce redundancy. Forms: 1NF, 2NF, 3NF.',
    solutionCode: `// Before normalization (redundant)
students = [
  { id: 1, name: 'John', courses: 'Math, Science' },
  { id: 2, name: 'Jane', courses: 'Math, English' }
]

// After normalization (1NF)
students = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
]
enrollments = [
  { studentId: 1, course: 'Math' },
  { studentId: 1, course: 'Science' },
  { studentId: 2, course: 'Math' },
  { studentId: 2, course: 'English' }
]`,
    testCases: []
  },
  { 
    title: 'Difference between JOIN types in SQL', 
    description: 'Explain INNER, LEFT, RIGHT, and FULL OUTER JOINs.', 
    difficulty: 'Easy', 
    category: 'Data Analyst', 
    tags: ['SQL', 'Database'], 
    solution: 'INNER: common records, LEFT: all left, RIGHT: all right, FULL: all records.',
    solutionCode: `-- INNER JOIN (common records)
SELECT u.id, u.name, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.userId;

-- LEFT JOIN (all from left)
SELECT u.id, u.name, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.userId;

-- FULL OUTER JOIN (all records)
SELECT u.id, u.name, o.amount  
FROM users u
FULL OUTER JOIN orders o ON u.id = o.userId;`,
    testCases: []
  },
  { 
    title: 'How to Optimize Database Queries?', 
    description: 'Explain indexing, query optimization techniques.', 
    difficulty: 'Medium', 
    category: 'Data Analyst', 
    tags: ['Database', 'Performance'], 
    solution: 'Use indexes, avoid SELECT *, limit results, analyze execution plans.',
    solutionCode: `-- Create index for faster queries
CREATE INDEX idx_email ON users(email);

-- Bad query (full scan)
SELECT * FROM orders;

-- Optimized query
SELECT id, amount, userId FROM orders
WHERE status = 'completed'
LIMIT 100;

-- Use EXPLAIN to analyze
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';`,
    testCases: []
  },
  { 
    title: 'Write Query to Find Top 5 Customers', 
    description: 'Query to get top 5 customers by revenue.', 
    difficulty: 'Medium', 
    category: 'Data Analyst', 
    tags: ['SQL'], 
    solution: 'Use GROUP BY, SUM, and ORDER BY with LIMIT.',
    solutionCode: `SELECT 
  c.id,
  c.name,
  SUM(o.amount) as total_revenue,
  COUNT(o.id) as order_count
FROM customers c
JOIN orders o ON c.id = o.customerId
GROUP BY c.id, c.name
ORDER BY total_revenue DESC
LIMIT 5;`,
    testCases: []
  },

  // DSA (5 questions)
  { 
    title: 'Two Sum Problem', 
    description: 'Given array of integers, find two numbers that add up to target.', 
    difficulty: 'Easy', 
    category: 'DSA', 
    tags: ['Array', 'Hash Table'], 
    solution: 'Use hash map to store numbers. For each number, check if complement exists.',
    solutionCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    testCases: [
      { input: '[2, 7, 11, 15], target: 9', output: '[0, 1]', difficulty: 'Easy' },
      { input: '[3, 2, 4], target: 6', output: '[1, 2]', difficulty: 'Easy' },
      { input: '[2, 5, 5, 11], target: 10', output: '[1, 2]', difficulty: 'Medium' }
    ],
    timeComplexity: { optimal: 'O(n)', bruteForce: 'O(n²)' },
    spaceComplexity: { optimal: 'O(n)', bruteForce: 'O(1)' }
  },
  { 
    title: 'Reverse an Array', 
    description: 'Reverse an array in-place.', 
    difficulty: 'Easy', 
    category: 'DSA', 
    tags: ['Array'], 
    solution: 'Use two pointers at start and end, swap elements moving towards center.',
    solutionCode: `function reverseArray(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}`,
    testCases: [
      { input: '[1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]', difficulty: 'Easy' },
      { input: '[10, 20]', output: '[20, 10]', difficulty: 'Easy' }
    ],
    timeComplexity: { optimal: 'O(n)', bruteForce: 'O(n)' },
    spaceComplexity: { optimal: 'O(1)', bruteForce: 'O(1)' }
  },
  { 
    title: 'Binary Search', 
    description: 'Find target in sorted array using binary search.', 
    difficulty: 'Medium', 
    category: 'DSA', 
    tags: ['Search', 'Array'], 
    solution: 'Divide search space in half each iteration.',
    solutionCode: `function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    testCases: [
      { input: '[-1, 0, 3, 5, 9, 12], target: 9', output: '4', difficulty: 'Medium' },
      { input: '[-1, 0, 3, 5, 9, 12], target: 13', output: '-1', difficulty: 'Medium' }
    ],
    timeComplexity: { optimal: 'O(log n)', bruteForce: 'O(n)' },
    spaceComplexity: { optimal: 'O(1)', bruteForce: 'O(1)' }
  },
  { 
    title: 'Longest Substring Without Repeating', 
    description: 'Find longest substring without repeating characters.', 
    difficulty: 'Medium', 
    category: 'DSA', 
    tags: ['String', 'Sliding Window'], 
    solution: 'Use sliding window with hash map to track character positions.',
    solutionCode: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let maxLen = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1);
    }
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    testCases: [
      { input: '"abcabcbb"', output: '3', difficulty: 'Medium' },
      { input: '"bbbbb"', output: '1', difficulty: 'Medium' },
      { input: '"pwwkew"', output: '3', difficulty: 'Medium' }
    ],
    timeComplexity: { optimal: 'O(n)', bruteForce: 'O(n²)' }
  },
  { 
    title: 'Merge k Sorted Lists', 
    description: 'Merge multiple sorted linked lists into one sorted list.', 
    difficulty: 'Hard', 
    category: 'DSA', 
    tags: ['Linked List'], 
    solution: 'Use min heap or divide and conquer approach.',
    solutionCode: `function mergeKLists(lists) {
  if (lists.length === 0) return null;
  
  return merge(lists, 0, lists.length - 1);
  
  function merge(lists, left, right) {
    if (left === right) return lists[left];
    if (left > right) return null;
    
    const mid = Math.floor((left + right) / 2);
    const l1 = merge(lists, left, mid);
    const l2 = merge(lists, mid + 1, right);
    
    return mergeTwoLists(l1, l2);
  }
  
  function mergeTwoLists(l1, l2) {
    const dummy = new ListNode();
    let current = dummy;
    
    while (l1 && l2) {
      if (l1.val <= l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }
    
    current.next = l1 || l2;
    return dummy.next;
  }
}`,
    testCases: [
      { input: '[[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]', difficulty: 'Hard' }
    ],
    timeComplexity: { optimal: 'O(n log k)', bruteForce: 'O(n²)' }
  },

  // System Design (2 questions)
  { 
    title: 'Design a URL Shortener', 
    description: 'Design system like bit.ly that converts long URLs to short ones.', 
    difficulty: 'Hard', 
    category: 'System Design', 
    tags: ['System Design'], 
    solution: 'Use hash function, database for mapping, cache for frequently used URLs.',
    solutionCode: `class URLShortener {
  constructor() {
    this.urlMap = new Map(); // short -> long
    this.reverseMap = new Map(); // long -> short
    this.counter = 0;
  }
  
  shorten(longUrl) {
    if (this.reverseMap.has(longUrl)) {
      return this.reverseMap.get(longUrl);
    }
    
    const shortUrl = this.encode(this.counter++);
    this.urlMap.set(shortUrl, longUrl);
    this.reverseMap.set(longUrl, shortUrl);
    
    return shortUrl;
  }
  
  expand(shortUrl) {
    return this.urlMap.get(shortUrl) || null;
  }
  
  encode(num) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    while (num > 0) {
      result = chars[num % 62] + result;
      num = Math.floor(num / 62);
    }
    return result;
  }
}`,
    testCases: []
  },
  { 
    title: 'Design a Chat Application', 
    description: 'Design a real-time chat system.', 
    difficulty: 'Hard', 
    category: 'System Design', 
    tags: ['System Design', 'Real-time'], 
    solution: 'Use WebSockets, message queues, distributed caching, microservices.',
    solutionCode: `// Backend with WebSocket
const io = require('socket.io')(3001);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('send_message', (data) => {
    // Broadcast to room
    io.to(data.roomId).emit('receive_message', {
      from: socket.id,
      message: data.message,
      timestamp: new Date()
    });
    
    // Store in database
    Message.create({
      userId: data.userId,
      roomId: data.roomId,
      text: data.message
    });
  });
  
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
  });
});`,
    testCases: []
  }
];

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🧹 Clearing existing questions...');
    await Question.deleteMany({});

    console.log('📝 Seeding sample questions...');
    const result = await Question.insertMany(sampleQuestions);
    console.log(`✅ ${result.length} questions seeded successfully`);

    const byCategory = {};
    sampleQuestions.forEach(q => {
      byCategory[q.category] = (byCategory[q.category] || 0) + 1;
    });
    
    console.log('📊 Questions by category:');
    Object.entries(byCategory).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} questions`);
    });

    console.log('✨ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();

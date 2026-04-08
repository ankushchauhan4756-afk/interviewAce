import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace';

const questions = [
  {
    title: 'Explain Closure in JavaScript',
    description: 'What is a closure and how does it work? Provide examples.',
    difficulty: 'Easy',
    category: 'Frontend',
    tags: ['JavaScript', 'Functions', 'Scope'],
    solution: 'A closure is a function that has access to variables in its outer scope even after the outer function has returned.',
    solutionCode: `function outer() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}`
  },
  {
    title: 'Difference between var, let, and const',
    description: 'Explain the differences between var, let, and const in JavaScript.',
    difficulty: 'Easy',
    category: 'Frontend',
    tags: ['JavaScript', 'Variables'],
    solution: 'var is function-scoped, let and const are block-scoped. const cannot be reassigned.',
    solutionCode: `var x = 1;\nlet y = 1;\nconst z = 1;`
  },
  {
    title: 'What is Event Delegation?',
    description: 'Explain event delegation in JavaScript and provide use cases.',
    difficulty: 'Medium',
    category: 'Frontend',
    tags: ['JavaScript', 'DOM', 'Events'],
    solution: 'Event delegation leverages event bubbling to handle events on multiple elements using a single listener.',
    solutionCode: `document.addEventListener('click', (e) => {\n  if (e.target.matches('button')) {\n    handleClick(e);\n  }\n});`
  },
  {
    title: 'What is REST API?',
    description: 'Explain REST API concepts, principles, and HTTP methods.',
    difficulty: 'Easy',
    category: 'Backend',
    tags: ['API', 'REST', 'HTTP'],
    solution: 'REST is an architectural style using HTTP for CRUD operations on resources.',
    solutionCode: `GET /users - Read\nPOST /users - Create\nPUT /users/:id - Update\nDELETE /users/:id - Delete`
  },
  {
    title: 'Explain Middleware in Express.js',
    description: 'What is middleware and how does it work in Express?',
    difficulty: 'Medium',
    category: 'Backend',
    tags: ['Express', 'Middleware', 'Node.js'],
    solution: 'Middleware are functions that have access to request, response, and next middleware. They can modify request/response or end the cycle.',
    solutionCode: `app.use((req, res, next) => {\n  console.log('Request:', req.method);\n  next();\n});`
  },
  {
    title: 'What is MongoDB Indexing?',
    description: 'Explain database indexing and its importance.',
    difficulty: 'Hard',
    category: 'Backend',
    tags: ['MongoDB', 'Database', 'Performance'],
    solution: 'Indexing improves query performance by creating data structures that allow faster data retrieval.',
    solutionCode: `db.users.createIndex({ email: 1 });\ndb.users.find({ email: 'test@example.com' }); // Faster with index`
  },
  {
    title: 'What is SQL vs NoSQL?',
    description: 'Compare relational and non-relational databases.',
    difficulty: 'Medium',
    category: 'Backend',
    tags: ['Database', 'SQL', 'NoSQL'],
    solution: 'SQL is structured with predefined schemas. NoSQL is flexible with dynamic schemas. Choose based on data type and requirements.',
    solutionCode: `// SQL: Fixed schema\nCREATE TABLE users (id INT, name VARCHAR);\n\n// NoSQL: Flexible\ndb.users.insertOne({ name: 'John', age: 25 });`
  },
  {
    title: 'Explain CORS',
    description: 'What is Cross-Origin Resource Sharing and how to handle it?',
    difficulty: 'Medium',
    category: 'Full Stack',
    tags: ['CORS', 'Security', 'HTTP'],
    solution: 'CORS allows requests from different origins. Enable with appropriate headers and middleware.',
    solutionCode: `app.use(cors({\n  origin: 'https://example.com',\n  credentials: true\n}));`
  },
  {
    title: 'What is JWT Authentication?',
    description: 'Explain JWT tokens and how authentication works.',
    difficulty: 'Hard',
    category: 'Full Stack',
    tags: ['JWT', 'Authentication', 'Security'],
    solution: 'JWT (JSON Web Tokens) are stateless tokens containing encoded claims. Server signs token, client sends it with requests.',
    solutionCode: `const token = jwt.sign({ id: user._id }, SECRET);\nconst decoded = jwt.verify(token, SECRET);`
  },
  {
    title: 'What is React Hooks?',
    description: 'Explain React Hooks and their advantages.',
    difficulty: 'Medium',
    category: 'Frontend',
    tags: ['React', 'Hooks', 'State'],
    solution: 'Hooks let you use state and other features in functional components. useState, useEffect, useContext are common.',
    solutionCode: `const [count, setCount] = useState(0);\nuseEffect(() => { console.log(count); }, [count]);`
  }
];

const seedDatabase = async () => {
  let client;
  try {
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('interviewace');
    const collection = db.collection('questions');
    
    // Clear existing questions
    const deleteResult = await collection.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing questions`);
    
    // Insert new questions
    const result = await collection.insertMany(questions);
    console.log(`✅ Successfully seeded ${result.insertedIds.length} questions!`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
};

seedDatabase();

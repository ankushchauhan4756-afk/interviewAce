import express from 'express';
import LibraryQuestion from '../models/LibraryQuestion.js';
import Question from '../models/Question.js';
import { LIBRARY_SEED_DATA, extractKeyPoints } from '../utils/librarySeedData.js';

const router = express.Router();

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin-123-change-in-production';

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};

/**
 * POST /api/admin/seed - Seed question library for all 8 categories
 */
router.post('/seed', verifyAdmin, async (req, res) => {
  try {
    const existingCount = await LibraryQuestion.countDocuments();
    if (existingCount > 0) {
      await LibraryQuestion.deleteMany({});
    }

    let totalAdded = 0;
    for (const [course, topics] of Object.entries(LIBRARY_SEED_DATA)) {
      for (const [topic, questions] of Object.entries(topics)) {
        const questionsToInsert = questions.map((item, index) => ({
          course,
          topic,
          question: item.q,
          answer: item.a,
          difficulty: ['Easy', 'Medium', 'Hard'][index % 3],
          tags: [topic, course, ['Easy', 'Medium', 'Hard'][index % 3].toLowerCase()],
          isImportant: Math.random() < 0.25,
          views: 0,
          keyPoints: extractKeyPoints(item.a)
        }));

        await LibraryQuestion.insertMany(questionsToInsert);
        totalAdded += questionsToInsert.length;
      }
    }

    res.json({
      success: true,
      message: `Successfully seeded ${totalAdded} library questions across ${Object.keys(LIBRARY_SEED_DATA).length} categories.`,
      totalAdded
    });
  } catch (error) {
    console.error('Library seed error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * GET /api/admin/status - Check database status
 */
router.get('/status', async (req, res) => {
  try {
    const count = await LibraryQuestion.countDocuments();
    res.json({
      success: true,
      database: 'Connected',
      totalQuestions: count,
      isEmpty: count === 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/admin/seed-questions - Seed interview questions
 */
router.post('/seed-questions', verifyAdmin, async (req, res) => {
  try {
    const count = await Question.countDocuments();
    if (count > 0) {
      return res.status(400).json({
        success: false,
        message: `Question database already has ${count} questions. Clean first if needed.`
      });
    }

    const sampleQuestions = [
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
        solutionCode: `document.addEventListener('click', (e) => {\nif (e.target.matches('button')) {\nhandleClick(e);\n}\n});`
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
        solution: 'Middleware are functions with access to request, response, and next middleware. They can modify request/response.',
        solutionCode: `app.use((req, res, next) => {\nconsole.log('Request:', req.method);\nnext();\n});`
      },
      {
        title: 'What is MongoDB Indexing?',
        description: 'Explain database indexing and its importance.',
        difficulty: 'Hard',
        category: 'Backend',
        tags: ['MongoDB', 'Database', 'Performance'],
        solution: 'Indexing improves query performance by creating data structures that allow faster data retrieval.',
        solutionCode: `db.users.createIndex({ email: 1 });\ndb.users.find({ email: 'test' }); // Faster`
      },
      {
        title: 'What is SQL vs NoSQL?',
        description: 'Compare relational and non-relational databases.',
        difficulty: 'Medium',
        category: 'Backend',
        tags: ['Database', 'SQL', 'NoSQL'],
        solution: 'SQL is structured with predefined schemas. NoSQL is flexible. Choose based on data type.',
        solutionCode: `// SQL: Fixed schema\nCREATE TABLE users (id INT, name VARCHAR);\n// NoSQL: Flexible\ndb.users.insertOne({});`
      },
      {
        title: 'Explain CORS',
        description: 'What is Cross-Origin Resource Sharing and how to handle it?',
        difficulty: 'Medium',
        category: 'Full Stack',
        tags: ['CORS', 'Security', 'HTTP'],
        solution: 'CORS allows requests from different origins. Enable with appropriate headers.',
        solutionCode: `app.use(cors({\norigin: 'https://example.com',\ncredentials: true\n}));`
      },
      {
        title: 'What is JWT Authentication?',
        description: 'Explain JWT tokens and how authentication works.',
        difficulty: 'Hard',
        category: 'Full Stack',
        tags: ['JWT', 'Authentication', 'Security'],
        solution: 'JWT tokens are stateless tokens containing encoded claims. Server signs, client sends with requests.',
        solutionCode: `const token = jwt.sign({ id: user._id }, SECRET);\nconst decoded = jwt.verify(token, SECRET);`
      },
      {
        title: 'What is React Hooks?',
        description: 'Explain React Hooks and their advantages.',
        difficulty: 'Medium',
        category: 'Frontend',
        tags: ['React', 'Hooks', 'State'],
        solution: 'Hooks let you use state in functional components. useState, useEffect, useContext are common.',
        solutionCode: `const [count, setCount] = useState(0);\nuseEffect(() => { console.log(count); }, [count]);`
      }
    ];

    const result = await Question.insertMany(sampleQuestions);
    res.json({
      success: true,
      message: `Successfully seeded ${result.length} interview questions!`,
      count: result.length
    });
  } catch (error) {
    console.error('Questions seed error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;

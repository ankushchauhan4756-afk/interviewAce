import mongoose from 'mongoose';
import Question from './src/models/Question.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleQuestions = [
  // Frontend Questions - Easy
  {
    title: "What is HTML?",
    description: "Explain what HTML is and why it's used in web development. What does HTML stand for?",
    difficulty: "Easy",
    category: "Frontend",
    tags: ["html", "beginner", "web"],
    examples: [
      {
        input: "What does HTML do?",
        output: "HTML provides structure to web pages using semantic elements"
      }
    ],
    solution: "HTML stands for HyperText Markup Language. It's used to create the structure of web pages using elements and tags.",
    solutionCode: "<!DOCTYPE html>\n<html>\n  <head><title>Page</title></head>\n  <body><h1>Hello</h1></body>\n</html>",
    constraints: "Explain semantic HTML and common tags",
    testCases: []
  },
  
  // Frontend Questions - Medium
  {
    title: "Explain React Hooks",
    description: "What are React Hooks? Name some common hooks and explain why they were introduced.",
    difficulty: "Medium",
    category: "Frontend",
    tags: ["react", "hooks", "state-management"],
    examples: [
      {
        input: "What does useState do?",
        output: "useState is a hook that allows you to add state to functional components"
      }
    ],
    solution: "React Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, useContext. They were introduced to encourage code reuse and simpler components.",
    solutionCode: "const [count, setCount] = useState(0);\nuseEffect(() => { /* effect */ }, [dependencies]);",
    constraints: "Explain at least 3 common hooks",
    testCases: []
  },

  // Frontend Questions - Hard
  {
    title: "Explain React Virtual DOM",
    description: "What is the Virtual DOM? How does React use it for performance optimization? Explain the reconciliation algorithm.",
    difficulty: "Hard",
    category: "Frontend",
    tags: ["react", "dom", "performance", "advanced"],
    examples: [
      {
        input: "How does React update the DOM efficiently?",
        output: "React uses Virtual DOM and diffing algorithm to batch updates and minimize actual DOM changes"
      }
    ],
    solution: "The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React creates a new Virtual DOM tree after each state change, compares (diffs) it with the previous one, and updates only the changed parts in the real DOM. This process is called reconciliation.",
    solutionCode: "// React's reconciliation algorithm\nfunction reconcile(oldVNode, newVNode) {\n  if (oldVNode.type !== newVNode.type) return create(newVNode);\n  if (typeof newVNode === 'string') return update(oldVNode, newVNode);\n  updateProps(oldVNode.props, newVNode.props);\n  reconcileChildren(oldVNode.children, newVNode.children);\n}",
    constraints: "Explain diffing and its time complexity",
    testCases: []
  },

  // Backend Questions - Easy
  {
    title: "What is REST API?",
    description: "Explain what a REST API is. What does REST stand for? Give examples of HTTP methods.",
    difficulty: "Easy",
    category: "Backend",
    tags: ["api", "rest", "http"],
    examples: [
      {
        input: "What does POST do?",
        output: "POST is used to create a new resource on the server"
      }
    ],
    solution: "REST stands for Representational State Transfer. A REST API uses HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources identified by URLs. It's a simple and scalable way to build web services.",
    solutionCode: "GET /api/users - Retrieve all users\nPOST /api/users - Create new user\nPUT /api/users/:id - Update user\nDELETE /api/users/:id - Delete user",
    constraints: "Explain HTTP methods and status codes",
    testCases: []
  },

  // Backend Questions - Medium
  {
    title: "Explain Middleware",
    description: "What is middleware in web frameworks? Give examples of common middleware. How do you build custom middleware?",
    difficulty: "Medium",
    category: "Backend",
    tags: ["middleware", "express", "backend"],
    examples: [
      {
        input: "What does middleware do?",
        output: "Middleware intercepts requests and responses to perform operations or pass control to the next middleware"
      }
    ],
    solution: "Middleware are functions that have access to the request (req), response (res), and next middleware function. They can modify requests/responses, perform logging, validation, authentication, etc. Middleware is executed in the order it's defined.",
    solutionCode: "app.use((req, res, next) => {\n  console.log('Middleware executed');\n  next(); // Pass control to next middleware\n});",
    constraints: "Explain the next() function and middleware chain",
    testCases: []
  },

  // Backend Questions - Hard
  {
    title: "Design a URL Shortener System",
    description: "How would you design a URL shortener service like bit.ly? Discuss database schema, URL generation, and scalability.",
    difficulty: "Hard",
    category: "Backend",
    tags: ["system-design", "scalability", "database"],
    examples: [
      {
        input: "How would you generate unique short codes?",
        output: "Use base62 encoding or pseudorandom generation with collision handling"
      }
    ],
    solution: "Design considerations: 1) Database schema with originalUrl, shortCode, createdAt fields. 2) Generate short codes using base conversion or random generation. 3) Handle collisions with retry logic. 4) Add TTL for URL expiration. 5) Use caching (Redis) for frequently accessed URLs. 6) Partition data by region for scalability.",
    solutionCode: "// URL Shortener design\nSchema: { id, originalUrl, shortCode, createdAt, expiresAt, hitCount }\nFunction: generateShortCode() -> base62(hash(timestamp + random))\nCache: Redis for lookup optimization\nIndex: shortCode for O(1) lookup",
    constraints: "Consider scale, caching strategy, and database optimization",
    testCases: []
  },

  // DSA Questions - Easy
  {
    title: "Reverse a String",
    description: "Write a function to reverse a string. What are the time and space complexities?",
    difficulty: "Easy",
    category: "DSA",
    tags: ["strings", "arrays", "algorithm"],
    examples: [
      {
        input: "\"hello\"",
        output: "\"olleh\""
      }
    ],
    solution: "There are multiple approaches: 1) Using built-in methods like split, reverse, join. 2) Using a loop to iterate backwards. 3) Using recursion. All have O(n) time complexity.",
    solutionCode: "// Approach 1: Built-in\nconst reverse = (str) => str.split('').reverse().join('');\n\n// Approach 2: Loop\nconst reverse = (str) => {\n  let result = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    result += str[i];\n  }\n  return result;\n};",
    constraints: "Explain both approaches and their complexities",
    timeComplexity: { optimal: "O(n)", bruteForce: "O(n)" },
    spaceComplexity: { optimal: "O(n)", bruteForce: "O(n)" },
    testCases: []
  },

  // DSA Questions - Medium
  {
    title: "Two Sum Problem",
    description: "Given an array of integers and a target, find two numbers that add up to the target. Return their indices.",
    difficulty: "Medium",
    category: "DSA",
    tags: ["arrays", "hashmap", "algorithm"],
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1] because nums[0] + nums[1] = 2 + 7 = 9"
      }
    ],
    solution: "Use a HashMap to store values and their indices. For each number, check if (target - number) exists in the map. Time: O(n), Space: O(n).",
    solutionCode: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}",
    constraints: "Cannot use same element twice. Assume exactly one solution exists.",
    timeComplexity: { optimal: "O(n)", bruteForce: "O(n²)" },
    spaceComplexity: { optimal: "O(n)", bruteForce: "O(1)" },
    testCases: []
  },

  // DSA Questions - Hard
  {
    title: "Merge K Sorted Lists",
    description: "Given K sorted linked lists, merge them into one sorted linked list. Optimize for time complexity.",
    difficulty: "Hard",
    category: "DSA",
    tags: ["linked-lists", "heap", "algorithm"],
    examples: [
      {
        input: "[[1,4,5], [1,3,4], [2,6]]",
        output: "[1,1,2,1,3,4,4,5,6]"
      }
    ],
    solution: "Approach 1 (Brute force): Merge lists one by one O(nk)². Approach 2 (Heap): Use min-heap to always pick smallest element. O(nk logk). Approach 3 (Divide & Conquer): Recursively merge pairs O(nk log k).",
    solutionCode: "// Min-Heap approach\nconst mergeKLists = (lists) => {\n  const minHeap = new MinPriorityQueue();\n  lists.forEach(list => {\n    while (list) {\n      minHeap.enqueue(list.val);\n      list = list.next;\n    }\n  });\n  const newList = new ListNode();\n  let current = newList;\n  while (!minHeap.isEmpty()) {\n    current.next = new ListNode(minHeap.dequeue());\n    current = current.next;\n  }\n  return newList.next;\n};",
    constraints: "Optimize for space complexity, handle empty lists",
    timeComplexity: { optimal: "O(nk log k)", bruteForce: "O((nk)²)" },
    spaceComplexity: { optimal: "O(k)", bruteForce: "O(nk)" },
    testCases: []
  },

  // Python Questions - Medium
  {
    title: "Explain Decorators in Python",
    description: "What are Python decorators? How do they work? Give an example of creating a custom decorator.",
    difficulty: "Medium",
    category: "Python",
    tags: ["python", "decorators", "functions"],
    examples: [
      {
        input: "How do you apply a decorator?",
        output: "@decorator_name applied above function definition"
      }
    ],
    solution: "Decorators are functions that modify or enhance other functions or classes without changing their source code. They use closures and higher-order functions. Syntax: @decorator_name above function definition.",
    solutionCode: "def my_decorator(func):\n  def wrapper(*args, **kwargs):\n    print('Before function call')\n    result = func(*args, **kwargs)\n    print('After function call')\n    return result\n  return wrapper\n\n@my_decorator\ndef hello():\n  print('Hello')",
    constraints: "Explain closures and function objects",
    testCases: []
  },

  // Full Stack Question
  {
    title: "Explain Full Stack Development",
    description: "What is full stack development? What skills do you need? What's the difference between frontend and backend?",
    difficulty: "Easy",
    category: "Full Stack",
    tags: ["fullstack", "development", "web"],
    examples: [
      {
        input: "What does a full stack developer do?",
        output: "Works on both frontend (UI) and backend (server, database)"
      }
    ],
    solution: "Full stack development involves working on both client-side (frontend) and server-side (backend) technologies. Frontend: HTML, CSS, JavaScript, frameworks. Backend: Node.js, Python, databases, APIs. DevOps: deployment, CI/CD.",
    solutionCode: "Frontend: React, Vue, Angular, HTML, CSS\nBackend: Node.js, Python, Java, Ruby\nDatabase: MongoDB, PostgreSQL, MySQL\nDevOps: Docker, Kubernetes, AWS",
    constraints: "Explain the responsibilities of each layer",
    testCases: []
  },

  // Data Analyst Question
  {
    title: "Explain SQL Joins",
    description: "What are the different types of SQL joins? When would you use each one? Give examples.",
    difficulty: "Medium",
    category: "Data Analyst",
    tags: ["sql", "database", "joins"],
    examples: [
      {
        input: "What does INNER JOIN do?",
        output: "Returns records that have matching values in both tables"
      }
    ],
    solution: "SQL Joins combine rows from multiple tables: 1) INNER JOIN - matching records only. 2) LEFT JOIN - all from left table + matches from right. 3) RIGHT JOIN - all from right table + matches from left. 4) FULL OUTER JOIN - all records from both tables. 5) CROSS JOIN - cartesian product.",
    solutionCode: "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id;\nSELECT * FROM users LEFT JOIN orders ON users.id = orders.user_id;\nSELECT * FROM users FULL OUTER JOIN orders ON users.id = orders.user_id;",
    constraints: "Explain performance implications of different joins",
    testCases: []
  },

  // Java Questions
  {
    title: "Explain OOP principles in Java",
    description: "List the four major Object-Oriented Programming principles and describe how Java implements each one.",
    difficulty: "Easy",
    category: "Java",
    tags: ["java", "oop", "basics"],
    examples: [
      {
        input: "What is inheritance?",
        output: "Process by which one class acquires properties of another class"
      }
    ],
    solution: "OOP principles are Encapsulation, Inheritance, Polymorphism, Abstraction. In Java: Encapsulation via private fields and getters/setters; Inheritance via extends; Polymorphism via method overriding and interfaces; Abstraction via abstract classes/interfaces.",
    solutionCode: "class Animal { void speak() {} } class Dog extends Animal { void speak() { System.out.println('Bark'); }}",
    constraints: "Include Java keywords and example usage",
    testCases: []
  },
  {
    title: "Describe Java Streams API",
    description: "What is the Streams API in Java and how is it used for processing collections?",
    difficulty: "Medium",
    category: "Java",
    tags: ["java", "streams", "functional"],
    examples: [
      {
        input: "java.util.List<Integer> nums = Arrays.asList(1,2,3,4);",
        output: "nums.stream().filter(n -> n % 2 == 0).collect(Collectors.toList());"
      }
    ],
    solution: "Java Streams allow functional-style operations on collections. They support map/filter/reduce, are lazy, and can be sequential or parallel.",
    solutionCode: "List<Integer> evens = nums.stream().filter(n -> n % 2 == 0).collect(Collectors.toList());",
    constraints: "Explain intermediate and terminal operations",
    testCases: []
  },

  // Python Questions
  {
    title: "Explain Python List Comprehension",
    description: "What is list comprehension in Python? Give an example for filtering even numbers.",
    difficulty: "Easy",
    category: "Python",
    tags: ["python", "list", "comprehension"],
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[n for n in nums if n % 2 == 0]"
      }
    ],
    solution: "List comprehension provides concise syntax for creating lists. E.g., [n for n in nums if n%2==0] creates even list items.",
    solutionCode: "evens = [n for n in nums if n % 2 == 0]",
    constraints: "Explain readability and performance benefits",
    testCases: []
  },
  {
    title: "What is a Python generator?",
    description: "Describe generators in Python and how they are different from lists.",
    difficulty: "Medium",
    category: "Python",
    tags: ["python", "generator", "iterators"],
    examples: [
      {
        input: "def gen(): yield 1; yield 2",
        output: "for x in gen(): print(x)"
      }
    ],
    solution: "Generators use yield to produce values lazily, saving memory compared to lists. They are iterators and compute values on demand.",
    solutionCode: "def gen():\n  for i in range(3):\n    yield i",
    constraints: "Mention __iter__ and __next__",
    testCases: []
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace');
    console.log('✅ Connected to MongoDB');

    // Clear existing questions
    const deletedCount = await Question.deleteMany({});
    console.log(`🗑️  Deleted ${deletedCount.deletedCount} existing questions`);

    // Insert sample questions
    const result = await Question.insertMany(sampleQuestions);
    console.log(`✅ Successfully seeded ${result.length} interview questions!`);
    
    console.log('\n📊 Questions by Category:');
    const categories = await Question.collection.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();
    
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} questions`);
    });

    mongoose.connection.close();
    console.log('\n🎉 Database seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

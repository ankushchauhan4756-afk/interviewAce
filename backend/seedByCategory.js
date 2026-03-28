import mongoose from 'mongoose';
import Question from './src/models/Question.js';
import dotenv from 'dotenv';

dotenv.config();

const categoryQuestions = {
  Frontend: [
    {
      title: "What is HTML and its purpose?",
      description: "Explain HTML, its role in web development, and basic structure",
      difficulty: "Easy",
      category: "Frontend",
      tags: ["html", "basics"],
      examples: [{ input: "Basic HTML doc", output: "<!DOCTYPE html> structure" }],
      solution: "HTML provides structure to web pages",
      solutionCode: "<!DOCTYPE html>\n<html>\n<head><title>Page</title></head>\n<body></body>\n</html>"
    },
    {
      title: "Explain CSS Box Model",
      description: "What is the CSS box model and how does it work?",
      difficulty: "Easy",
      category: "Frontend",
      tags: ["css", "boxmodel"],
      examples: [{ input: "Box property", output: "Content→Padding→Border→Margin" }],
      solution: "Content inside, then padding, border, and margin outside",
      solutionCode: ".box { padding: 10px; border: 1px solid; margin: 20px; }"
    },
    {
      title: "What are CSS Flexbox basics?",
      description: "Explain flexbox and its main properties",
      difficulty: "Easy",
      category: "Frontend",
      tags: ["css", "flexbox", "layout"],
      examples: [{ input: "Flexbox container", output: "flex-direction, justify-content, align-items" }],
      solution: "Flexbox is a layout model for responsive design",
      solutionCode: ".flex { display: flex; justify-content: center; align-items: center; }"
    },
    {
      title: "Explain JavaScript closures",
      description: "What are closures in JavaScript and why are they useful?",
      difficulty: "Medium",
      category: "Frontend",
      tags: ["javascript", "closure", "scope"],
      examples: [{ input: "Outer function returns inner", output: "Inner accesses outer scope" }],
      solution: "Closures allow inner functions to access outer scope even after execution",
      solutionCode: "function outer() {\n  let count = 0;\n  return () => ++count;\n}"
    },
    {
      title: "What are React Hooks?",
      description: "Explain useState, useEffect and custom hooks",
      difficulty: "Medium",
      category: "Frontend",
      tags: ["react", "hooks", "state"],
      examples: [{ input: "useState for state", output: "const [state, setState] = useState()" }],
      solution: "Hooks let you use state in functional components",
      solutionCode: "const [count, setCount] = useState(0);\nuseEffect(() => { }, []);"
    },
    {
      title: "Explain event delegation",
      description: "What is event delegation and when to use it?",
      difficulty: "Medium",
      category: "Frontend",
      tags: ["javascript", "events", "dom"],
      examples: [{ input: "Attach to parent", output: "Handles child events via bubbling" }],
      solution: "Attach listener to parent instead of multiple children, events bubble",
      solutionCode: "parent.addEventListener('click', (e) => { if(e.target.matches('.child')) {} });"
    },
    {
      title: "What is the DOM and how to manipulate it?",
      description: "Explain Document Object Model and methods to interact with it",
      difficulty: "Easy",
      category: "Frontend",
      tags: ["dom", "javascript"],
      examples: [{ input: "Select element", output: "document.getElementById, querySelector" }],
      solution: "DOM is tree structure of HTML, manipulate with JS methods",
      solutionCode: "document.getElementById('id').textContent = 'text';\ndocument.querySelector('.class').style.color = 'red';"
    },
    {
      title: "Explain async/await in JavaScript",
      description: "What are async/await and how do they improve promise handling?",
      difficulty: "Medium",
      category: "Frontend",
      tags: ["javascript", "async", "promises"],
      examples: [{ input: "async function", output: "await pauses execution" }],
      solution: "Async/await is syntactic sugar over promises for cleaner code",
      solutionCode: "async function fetch() {\n  const data = await fetchData();\n  return data;\n}"
    },
    {
      title: "What is responsive design?",
      description: "Explain responsive design principles and media queries",
      difficulty: "Easy",
      category: "Frontend",
      tags: ["css", "responsive", "design"],
      examples: [{ input: "Mobile first", output: "@media (max-width: 768px)" }],
      solution: "Design that adapts to different screen sizes",
      solutionCode: "@media (max-width: 768px) {\n  .container { width: 100%; }\n}"
    },
    {
      title: "Explain CSS Grid layout",
      description: "What is CSS Grid and how does it differ from Flexbox?",
      difficulty: "Medium",
      category: "Frontend",
      tags: ["css", "grid", "layout"],
      examples: [{ input: "Grid 2D layout", output: "grid-template-columns, grid-row, grid-column" }],
      solution: "Grid is 2D layout, flexbox is 1D",
      solutionCode: ".grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }"
    },
    {
      title: "What are JavaScript promises?",
      description: "Explain promises, their states, and handling with then/catch",
      difficulty: "Medium",
      category: "Frontend",
      tags: ["javascript", "promises", "async"],
      examples: [{ input: "Promise states", output: "Pending → Fulfilled/Rejected" }],
      solution: "Promises handle async operations with then, catch, finally",
      solutionCode: "new Promise((resolve, reject) => {\n  resolve(value);\n}).then(res => res).catch(err => err);"
    },
    {
      title: "Explain component lifecycle in React",
      description: "What are React component lifecycle methods and hooks?",
      difficulty: "Medium",
      category: "Frontend",
      tags: ["react", "lifecycle", "hooks"],
      examples: [{ input: "Class component lifecycle", output: "Mount → Update → Unmount" }],
      solution: "Lifecycle methods: componentDidMount, componentDidUpdate, componentWillUnmount",
      solutionCode: "useEffect(() => { /* mount */ return () => { /* unmount */ }; }, []);"
    },
    {
      title: "What is state management in React?",
      description: "Explain state, props, and context API",
      difficulty: "Medium",
      category: "Frontend",
      tags: ["react", "state", "context"],
      examples: [{ input: "Prop drilling problem", output: "Use Context API to avoid" }],
      solution: "Manage component state with useState, pass with props, share with Context",
      solutionCode: "const [state, setState] = useState(); <Context.Provider value={{state}}>"
    },
    {
      title: "Explain var, let, and const in JavaScript",
      description: "What are the differences between var, let, and const?",
      difficulty: "Easy",
      category: "Frontend",
      tags: ["javascript", "variables", "scope"],
      examples: [{ input: "var vs let scope", output: "var: function-scoped, let: block-scoped" }],
      solution: "var hoisted, function-scoped; let/const block-scoped, const no reassign",
      solutionCode: "var x; // function scope\nlet y; // block scope\nconst z; // no reassign"
    },
    {
      title: "What are template literals?",
      description: "Explain template literals and interpolation in JavaScript",
      difficulty: "Easy",
      category: "Frontend",
      tags: ["javascript", "strings", "syntax"],
      examples: [{ input: "Backticks `${var}`", output: "Embed variables in strings" }],
      solution: "Template literals use backticks and allow ${} interpolation",
      solutionCode: "const name = 'John';\nconst msg = `Hello, ${name}!`;"
    }
  ],
  Backend: [
    {
      title: "What is REST API?",
      description: "Explain REST architecture, HTTP methods, and status codes",
      difficulty: "Easy",
      category: "Backend",
      tags: ["api", "rest", "http"],
      examples: [{ input: "HTTP methods", output: "GET, POST, PUT, DELETE, PATCH" }],
      solution: "REST uses HTTP methods on resources identified by URLs",
      solutionCode: "GET /users - list\nPOST /users - create\nPUT /users/:id - update\nDELETE /users/:id - delete"
    },
    {
      title: "Explain middleware concept",
      description: "What is middleware and how does it work in web frameworks?",
      difficulty: "Medium",
      category: "Backend",
      tags: ["middleware", "request", "express"],
      examples: [{ input: "Middleware chain", output: "req → middleware1 → middleware2 → handler" }],
      solution: "Middleware functions process requests/responses, call next() to continue",
      solutionCode: "app.use((req, res, next) => {\n  console.log('middleware');\n  next();\n});"
    },
    {
      title: "What is authentication vs authorization?",
      description: "Explain the difference and how JWT works",
      difficulty: "Medium",
      category: "Backend",
      tags: ["security", "auth", "jwt"],
      examples: [{ input: "Auth: verify user", output: "AuthZ: check permissions" }],
      solution: "Authentication verifies who you are, Authorization checks what you can do",
      solutionCode: "JWT: header.payload.signature encoded in token"
    },
    {
      title: "Explain SQL basics",
      description: "What is SQL and basic CRUD operations?",
      difficulty: "Easy",
      category: "Backend",
      tags: ["sql", "database"],
      examples: [{ input: "CRUD ops", output: "CREATE, READ, UPDATE, DELETE" }],
      solution: "SQL for database queries: SELECT, INSERT, UPDATE, DELETE",
      solutionCode: "SELECT * FROM users;\nINSERT INTO users VALUES(...);\nUPDATE users SET name='John';\nDELETE FROM users;"
    },
    {
      title: "What is MongoDB and NoSQL?",
      description: "Explain document-based databases vs relational",
      difficulty: "Easy",
      category: "Backend",
      tags: ["mongodb", "nosql", "database"],
      examples: [{ input: "JSON documents", output: "Flexible schema, no tables" }],
      solution: "MongoDB stores JSON documents, flexible schema unlike relational DB",
      solutionCode: "db.users.find({ name: 'John' });\ndb.users.insertOne({ name: 'Jane' });"
    },
    {
      title: "Explain database indexing",
      description: "What are indexes and how do they improve query performance?",
      difficulty: "Medium",
      category: "Backend",
      tags: ["database", "index", "performance"],
      examples: [{ input: "Index field", output: "Faster lookup, slower insert" }],
      solution: "Indexes speed up queries but slow down inserts/updates",
      solutionCode: "CREATE INDEX idx_email ON users(email);\ndb.users.find({ email: 'test@test.com' }); // Fast"
    },
    {
      title: "What is caching and Redis?",
      description: "Explain caching strategies and Redis use cases",
      difficulty: "Medium",
      category: "Backend",
      tags: ["cache", "redis", "performance"],
      examples: [{ input: "Store frequently accessed", output: "In-memory for speed" }],
      solution: "Redis in-memory cache speeds up data retrieval",
      solutionCode: "redis.set('user:1', data);\nredis.get('user:1');"
    },
    {
      title: "Explain environment variables",
      description: "Why use .env files and how to configure them?",
      difficulty: "Easy",
      category: "Backend",
      tags: ["config", "security", "env"],
      examples: [{ input: ".env file", output: "DB_URL=..., API_KEY=..." }],
      solution: "Store sensitive config in .env, load with process.env",
      solutionCode: "require('dotenv').config();\nconst dbUrl = process.env.DB_URL;"
    },
    {
      title: "What are HTTP status codes?",
      description: "Explain common HTTP status codes and their meanings",
      difficulty: "Easy",
      category: "Backend",
      tags: ["http", "status", "api"],
      examples: [{ input: "Status codes", output: "200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Error" }],
      solution: "2xx Success, 3xx Redirect, 4xx Client Error, 5xx Server Error",
      solutionCode: "200 OK, 201 Created, 204 No Content\n400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found\n500 Internal Server Error, 503 Service Unavailable"
    },
    {
      title: "Explain error handling in backend",
      description: "How to properly handle and return errors in APIs?",
      difficulty: "Medium",
      category: "Backend",
      tags: ["error", "validation", "api"],
      examples: [{ input: "Try-catch", output: "Catch errors, log, return status with message" }],
      solution: "Try-catch blocks, validation, consistent error responses",
      solutionCode: "try {\n  // code\n} catch(err) {\n  res.status(500).json({ error: err.message });\n}"
    },
    {
      title: "What is an ORM?",
      description: "Explain Object-Relational Mapping and tools like Mongoose, Sequelize",
      difficulty: "Medium",
      category: "Backend",
      tags: ["orm", "database", "abstraction"],
      examples: [{ input: "ORM models", output: "Map DB tables to JS objects" }],
      solution: "ORM abstracts database operations into object methods",
      solutionCode: "const user = new User({ name: 'John' });\nawait user.save();"
    },
    {
      title: "Explain API rate limiting",
      description: "Why implement rate limiting and common strategies?",
      difficulty: "Medium",
      category: "Backend",
      tags: ["api", "security", "ratelimit"],
      examples: [{ input: "Limit requests", output: "Per user, per IP, per route" }],
      solution: "Rate limiting prevents abuse by limiting requests in time window",
      solutionCode: "app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));"
    },
    {
      title: "What is API versioning?",
      description: "Why version APIs and common approaches?",
      difficulty: "Easy",
      category: "Backend",
      tags: ["api", "versioning", "design"],
      examples: [{ input: "/v1/users", output: "Backward compatibility" }],
      solution: "Version APIs in URL or headers to maintain compatibility",
      solutionCode: "GET /api/v1/users\nGET /api/v2/users (different structure)"
    },
    {
      title: "Explain transaction concept",
      description: "What are database transactions and ACID properties?",
      difficulty: "Medium",
      category: "Backend",
      tags: ["database", "transaction", "acid"],
      examples: [{ input: "All or nothing", output: "Atomic, Consistent, Isolated, Durable" }],
      solution: "Transactions ensure data integrity with ACID properties",
      solutionCode: "BEGIN TRANSACTION;\nUPDATE account1;\nUPDATE account2;\nCOMMIT; /* or ROLLBACK */"
    },
    {
      title: "What is load balancing?",
      description: "Explain load balancing and scalability strategies",
      difficulty: "Medium",
      category: "Backend",
      tags: ["scalability", "loadbalance", "devops"],
      examples: [{ input: "Distribute requests", output: "Round-robin, least-conn, hash" }],
      solution: "Load balancers distribute traffic across multiple servers",
      solutionCode: "nginx, HAProxy distribute requests by round-robin or algorithm"
    }
  ],
  DSA: [
    {
      title: "Reverse a string",
      description: "Write function to reverse a string. O(n) time, O(n) space.",
      difficulty: "Easy",
      category: "DSA",
      tags: ["string", "array"],
      examples: [{ input: "\"hello\"", output: "\"olleh\"" }],
      solution: "Use split-reverse-join or loop backwards",
      solutionCode: "const reverse = (s) => s.split('').reverse().join('');\n// or loop backwards"
    },
    {
      title: "Find maximum element in array",
      description: "Find max element with single pass. O(n) time, O(1) space.",
      difficulty: "Easy",
      category: "DSA",
      tags: ["array", "search"],
      examples: [{ input: "[3,1,4,1,5]", output: "5" }],
      solution: "Iterate once, track max value",
      solutionCode: "let max = arr[0];\nfor(let x of arr) max = Math.max(max, x);"
    },
    {
      title: "Two Sum problem",
      description: "Find two numbers that sum to target. O(n) optimal solution.",
      difficulty: "Medium",
      category: "DSA",
      tags: ["array", "hashmap"],
      examples: [{ input: "[2,7,11], target=9", output: "[0,1]" }],
      solution: "Use HashMap to store values seen, check complement exists",
      solutionCode: "const map = new Map();\nfor(let i=0; i<nums.length; i++) {\n  const comp = target - nums[i];\n  if(map.has(comp)) return [map.get(comp), i];\n  map.set(nums[i], i);\n}"
    },
    {
      title: "Palindrome check",
      description: "Check if string is palindrome. Handle case, spaces, punctuation.",
      difficulty: "Easy",
      category: "DSA",
      tags: ["string"],
      examples: [{ input: "\"race car\"", output: "true" }],
      solution: "Clean string, compare forward and backward",
      solutionCode: "const s = str.toLowerCase().replace(/[^a-z0-9]/g, '');\nreturn s === s.split('').reverse().join('');"
    },
    {
      title: "Binary search",
      description: "Search in sorted array. O(log n) time vs O(n) linear.",
      difficulty: "Medium",
      category: "DSA",
      tags: ["search", "divide-conquer"],
      examples: [{ input: "[1,3,5,7], target=5", output: "2" }],
      solution: "Divide search space by half each iteration",
      solutionCode: "let left=0, right=arr.length-1;\nwhile(left<=right) {\n  const mid = (left+right)>>1;\n  if(arr[mid]===target) return mid;\n  if(arr[mid]<target) left=mid+1;\n  else right=mid-1;\n}"
    },
    {
      title: "Merge sorted arrays",
      description: "Merge two sorted arrays into one. O(n+m) time.",
      difficulty: "Easy",
      category: "DSA",
      tags: ["array", "merge"],
      examples: [{ input: "[1,3] [2,4]", output: "[1,2,3,4]" }],
      solution: "Two pointer approach to merge",
      solutionCode: "let i=0,j=0,result=[];\nwhile(i<a.length&&j<b.length)\nresult.push(a[i]<b[j]?a[i++]:b[j++]);\nreturn [...result,...a.slice(i),...b.slice(j)];"
    },
    {
      title: "Remove duplicates from array",
      description: "Remove duplicate elements. Maintain order, O(n) time.",
      difficulty: "Easy",
      category: "DSA",
      tags: ["array", "hashset"],
      examples: [{ input: "[1,2,2,3,1]", output: "[1,2,3]" }],
      solution: "Use Set or HashMap to track seen elements",
      solutionCode: "return [...new Set(arr)]; // or use for loop with Set"
    },
    {
      title: "Bubble sort implementation",
      description: "Implement bubble sort. O(n²) time but simple.",
      difficulty: "Easy",
      category: "DSA",
      tags: ["sort", "array"],
      examples: [{ input: "[3,1,2]", output: "[1,2,3]" }],
      solution: "Compare adjacent elements, swap if needed",
      solutionCode: "for(let i=0; i<arr.length; i++) {\n  for(let j=0; j<arr.length-i-1; j++) {\n    if(arr[j]>arr[j+1]) [arr[j],arr[j+1]]=[arr[j+1],arr[j]];\n  }\n}"
    },
    {
      title: "Fibonacci sequence",
      description: "Generate nth Fibonacci. Compare recursive, iterative, memoization.",
      difficulty: "Easy",
      category: "DSA",  
      tags: ["recursion", "dp"],
      examples: [{ input: "5", output: "5 (after 1,1,2,3)" }],
      solution: "Iterative O(n) time is best, avoid pure recursion O(2^n)",
      solutionCode: "let a=0,b=1;\nfor(let i=1; i<n; i++) [a,b]=[b,a+b];\nreturn b;"
    },
    {
      title: "Reverse array",
      description: "Reverse array in place. O(n) time, O(1) space.",
      difficulty: "Easy",
      category: "DSA",
      tags: ["array"],
      examples: [{ input: "[1,2,3]", output: "[3,2,1]" }],
      solution: "Swap elements from ends moving toward center",
      solutionCode: "let l=0,r=arr.length-1;\nwhile(l<r) [arr[l++],arr[r--]]=[arr[r],arr[l]];"
    },
    {
      title: "Longest substring without repeating",
      description: "Find longest substring with unique chars. O(n) sliding window.",
      difficulty: "Medium",
      category: "DSA",
      tags: ["string", "sliding-window"],
      examples: [{ input: "\"abcabcbb\"", output: "3 (\"abc\")" }],
      solution: "Use sliding window with HashMap tracking char positions",
      solutionCode: "const map = new Map();\nlet left=0, maxLen=0;\nfor(let right=0; right<s.length; right++) {\n  if(map.has(s[right])) left=Math.max(left, map.get(s[right])+1);\n  map.set(s[right], right);\n  maxLen = Math.max(maxLen, right-left+1);\n}"
    },
    {
      title: "Check balanced parentheses",
      description: "Verify parentheses are balanced. Use stack O(n) time.",
      difficulty: "Easy",
      category: "DSA",
      tags: ["string", "stack"],
      examples: [{ input: "\"()[]{}\"", output: "true" }],
      solution: "Use stack to match opening/closing pairs",
      solutionCode: "const stack = [];\nconst pairs = {')':'(', '}':'{', ']':'['};\nfor(let c of s) {\n  if(pairs[c]) { if(!stack.length || stack.pop() !== pairs[c]) return false; }\n  else stack.push(c);\n}\nreturn !stack.length;"
    },
    {
      title: "Tree depth calculation",
      description: "Calculate max depth of binary tree. DFS or BFS approach.",
      difficulty: "Medium",
      category: "DSA",
      tags: ["tree", "dfs", "recursion"],
      examples: [{ input: "Binary tree", output: "Max depth (levels from root)" }],
      solution: "Recursively traverse left/right subtrees, return max depth",
      solutionCode: "const maxDepth = (node) => {\n  if(!node) return 0;\n  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));\n}"
    },
    {
      title: "Merge K sorted lists",
      description: "Merge multiple sorted linked lists. O(nk log k) with heap.",
      difficulty: "Hard",
      category: "DSA",
      tags: ["list", "heap", "divide-conquer"],
      examples: [{ input: "[[1,4],[2,3]]", output: "[1,2,3,4]" }],
      solution: "Use min-heap to always merge smallest element",
      solutionCode: "// Use priority queue: O(nk log k)\nconst minHeap = new MinPriorityQueue();\nlists.forEach(list => { while(list) { minHeap.enqueue(list.val); list=list.next; } });"
    },
    {
      title: "Letter combinations of phone number",
      description: "Generate all letter combinations mapped to digits 2-9",
      difficulty: "Medium",
      category: "DSA",
      tags: ["string", "backtrack", "combination"],
      examples: [{ input: "\"23\"", output: "[\"ad\",\"ae\",\"af\",\"bd\",...]" }],
      solution: "Use backtracking to generate all combinations",
      solutionCode: "const map = {'2':'abc', '3':'def', ...};\nfunction backtrack(idx, path) {\n  if(idx===digits.length) result.push(path);\n  for(let c of map[digits[idx]]) backtrack(idx+1, path+c);\n}"
    },
    {
      title: "Maximum subarray sum",
      description: "Find contiguous subarray with max sum. Kadane's algorithm O(n).",
      difficulty: "Medium",
      category: "DSA",
      tags: ["array", "dp"],
      examples: [{ input: "[-2,1,-3,4,-1,2]", output: "6 ([4,-1,2])" }],
      solution: "Kadane's: track max ending here and global max",
      solutionCode: "let maxEnd=0, maxGlobal=arr[0];\nfor(let i=1; i<arr.length; i++) {\n  maxEnd = Math.max(arr[i], maxEnd+arr[i]);\n  maxGlobal = Math.max(maxGlobal, maxEnd);\n}"
    }
  ],
  Java: [
    {
      title: "OOP principles in Java",
      description: "Explain encapsulation, inheritance, polymorphism, abstraction",
      difficulty: "Easy",
      category: "Java",
      tags: ["oop", "basics"],
      examples: [{ input: "4 OOP principles", output: "Encapsulation, Inheritance, Polymorphism, Abstraction" }],
      solution: "E: private fields; I: extends; P: method override; A: abstract classes",
      solutionCode: "class Animal { void speak() {} }\nclass Dog extends Animal { void speak() { System.out.println(\"Bark\"); } }"
    },
    {
      title: "What is a constructor?",
      description: "Explain constructors and constructor overloading in Java",
      difficulty: "Easy",
      category: "Java",
      tags: ["java", "constructor"],
      examples: [{ input: "Constructor call", output: "new ClassName() initializes object" }],
      solution: "Constructor initializes object state, can be overloaded",
      solutionCode: "class User {\n  User() { this.id = -1; }\n  User(String name) { this.name = name; }\n}"
    },
    {
      title: "Explain Java collections",
      description: "List, Set, Map, Queue interfaces and implementations",
      difficulty: "Medium",
      category: "Java",
      tags: ["collections", "data-structures"],
      examples: [{ input: "Collection types", output: "ArrayList, HashSet, HashMap, LinkedList" }],
      solution: "List: ordered, duplicates allowed. Set: unique. Map: key-value",
      solutionCode: "List<String> list = new ArrayList<>();\nSet<Integer> set = new HashSet<>();\nMap<String,Integer> map = new HashMap<>();"
    },
    {
      title: "What is Exception handling?",
      description: "Try-catch-finally, checked vs unchecked exceptions",
      difficulty: "Medium",
      category: "Java",
      tags: ["exception", "error-handling"],
      examples: [{ input: "Try-catch", output: "Handle errors gracefully" }],
      solution: "Try-catch for error handling, finally for cleanup",
      solutionCode: "try { risky(); } catch(Exception e) { handle(e); } finally { cleanup(); }"
    },
    {
      title: "Explain Streams API",
      description: "Functional operations on collections: map, filter, reduce",
      difficulty: "Medium",
      category: "Java",
      tags: ["streams", "functional"],
      examples: [{ input: "Stream operations", output: "filter, map, reduce, collect" }],
      solution: "Streams allow functional-style operations on collections",
      solutionCode: "list.stream().filter(x -> x > 5).map(x -> x * 2).collect(toList());"
    },
    {
      title: "What are generics in Java?",
      description: "Explain generic types, type parameters, wildcards",
      difficulty: "Medium",
      category: "Java",
      tags: ["generics", "type-safety"],
      examples: [{ input: "Generic class", output: "class Box<T> prevents type errors" }],
      solution: "Generics enable type-safe collections and reusable code",
      solutionCode: "class Box<T> { T value; }\nBox<String> box = new Box<>();"
    },
    {
      title: "Explain threads and concurrency",
      description: "Thread creation, synchronization, race conditions",
      difficulty: "Medium",
      category: "Java",
      tags: ["threading", "concurrency"],
      examples: [{ input: "Multiple threads", output: "Concurrent execution, synchronize access" }],
      solution: "Threads for parallel execution, synchronized for thread-safe access",
      solutionCode: "Thread t = new Thread(() -> { }); t.start();\nsynchronized(obj) { /* critical */ }"
    },
    {
      title: "What is polymorphism?",
      description: "Method overloading, method overriding, dynamic dispatch",
      difficulty: "Medium",
      category: "Java",
      tags: ["polymorphism", "oop"],
      examples: [{ input: "Same method name", output: "Different implementations based on type" }],
      solution: "Overload: same name, different params. Override: subclass changes parent method",
      solutionCode: "// Overload: add(int, int), add(double, double)\n// Override: subclass changes parent method"
    },
    {
      title: "What is an interface?",
      description: "Explain interfaces, abstract methods, default methods",
      difficulty: "Easy",
      category: "Java",
      tags: ["interface", "oop"],
      examples: [{ input: "Interface contract", output: "Defines methods classes must implement" }],
      solution: "Interface defines contract, implementing class provides implementation",
      solutionCode: "interface Animal { void speak(); }\nclass Dog implements Animal { public void speak() { } }"
    },
    {
      title: "Explain static keyword",
      description: "Static fields, methods, blocks, and their usage",
      difficulty: "Easy",
      category: "Java",
      tags: ["static", "keyword"],
      examples: [{ input: "Static field", output: "Shared across all instances" }],
      solution: "Static belongs to class, not instance. Shared by all objects",
      solutionCode: "static int count; // shared\nstatic void method() { } // call via class"
    },
    {
      title: "What is inheritance?",
      description: "Class hierarchy, super keyword, method resolution",
      difficulty: "Easy",
      category: "Java",
      tags: ["inheritance", "oop"],
      examples: [{ input: "child extends parent", output: "Inherits fields and methods" }],
      solution: "Child class inherits from parent, extends keyword",
      solutionCode: "class Dog extends Animal { }\nsuper.method(); // call parent method"
    },
    {
      title: "Explain setter and getter methods",
      description: "Encapsulation via accessors, mutators, and property patterns",
      difficulty: "Easy",
      category: "Java",
      tags: ["encapsulation", "oop"],
      examples: [{ input: "Getter/Setter", output: "Control field access" }],
      solution: "Getters return field values, setters modify them with validation",
      solutionCode: "public String getName() { return name; }\npublic void setName(String n) { this.name = n; }"
    },
    {
      title: "What is a lambda expression?",
      description: "Lambda syntax, functional interfaces, use cases",
      difficulty: "Medium",
      category: "Java",
      tags: ["lambda", "functional"],
      examples: [{ input: "(x, y) -> x + y", output: "Returns sum without boilerplate" }],
      solution: "Lambda provides concise syntax for single-method interfaces",
      solutionCode: "Comparator<Integer> cmp = (a, b) -> a - b;\nlist.forEach(x -> System.out.println(x));"
    },
    {
      title: "What is access modifiers?",
      description: "Public, private, protected, package-private visibility rules",
      difficulty: "Easy",
      category: "Java",
      tags: ["access", "encapsulation"],
      examples: [{ input: "Access levels", output: "public > protected > default > private" }],
      solution: "Control visibility: public (all), protected (subclass), private (this class)",
      solutionCode: "public int id; // accessible everywhere\nprivate String secret; // only this class"
    }
  ],
  Python: [
    {
      title: "What are decorators in Python?",
      description: "Function decorators, syntax, practical examples",
      difficulty: "Medium",
      category: "Python",
      tags: ["decorators", "functions"],
      examples: [{ input: "@decorator", output: "Modifies function behavior" }],
      solution: "Decorators wrap functions using closures to add functionality",
      solutionCode: "def decorator(func):\n  def wrapper(*args, **kwargs):\n    return func(*args, **kwargs)\n  return wrapper"
    },
    {
      title: "List comprehension in Python",
      description: "Syntax, filtering, nested comprehensions",
      difficulty: "Easy",
      category: "Python",
      tags: ["list", "comprehension"],
      examples: [{ input: "[x*2 for x in range(5)]", output: "[0,2,4,6,8]" }],
      solution: "List comprehension creates lists concisely",
      solutionCode: "squares = [x**2 for x in range(10)];\nevens = [x for x in range(10) if x%2==0];"
    },
    {
      title: "What are generators?",
      description: "Yield keyword, memory efficiency, lazy evaluation",
      difficulty: "Medium",
      category: "Python",
      tags: ["generator", "iterator"],
      examples: [{ input: "def gen(): yield x", output: "Produces values on demand" }],
      solution: "Generators use yield for lazy evaluation, memory efficient",
      solutionCode: "def gen():\n  for i in range(3):\n    yield i\nfor x in gen(): print(x)"
    },
    {
      title: "Explain Python classes",
      description: "Class definition, __init__, instance/class variables",
      difficulty: "Easy",
      category: "Python",
      tags: ["class", "oop"],
      examples: [{ input: "class Dog", output: "def __init__(self): self.name" }],
      solution: "Classes define object structure, __init__ is constructor",
      solutionCode: "class Dog:\n  def __init__(self, name):\n    self.name = name"
    },
    {
      title: "What are lambda functions?",
      description: "Anonymous functions, syntax, use cases",
      difficulty: "Easy",
      category: "Python",
      tags: ["lambda", "functions"],
      examples: [{ input: "lambda x: x*2", output: "Anonymous function doubling input" }],
      solution: "Lambda creates small anonymous functions",
      solutionCode: "f = lambda x: x**2\nresult = f(5) # 25\nmap(lambda x: x*2, [1,2,3]) # [2,4,6]"
    },
    {
      title: "What is Python *args and **kwargs?",
      description: "Variable positional and keyword arguments",
      difficulty: "Medium",
      category: "Python",
      tags: ["functions", "args"],
      examples: [{ input: "def func(*args, **kwargs)", output: "Accept any number of arguments" }],
      solution: "*args for positional tuple, **kwargs for keyword dict",
      solutionCode: "def func(*args, **kwargs):\n  for arg in args: print(arg)\n  for k,v in kwargs.items(): print(k,v)"
    },
    {
      title: "Explain Python inheritance",
      description: "Class hierarchy, super(), method resolution order",
      difficulty: "Medium",
      category: "Python",
      tags: ["oop", "inheritance"],
      examples: [{ input: "class Dog(Animal)", output: "Inherits from Animal" }],
      solution: "Use class name(parent) to inherit, super() for parent access",
      solutionCode: "class Dog(Animal):\n  def __init__(self, name):\n    super().__init__()\n    self.name = name"
    },
    {
      title: "What are context managers (with statement)?",
      description: "Resource management, __enter__, __exit__ methods",
      difficulty: "Medium",
      category: "Python",
      tags: ["context", "resource"],
      examples: [{ input: "with open('file')", output: "Auto handles close" }],
      solution: "Context managers ensure cleanup via __enter__/__exit__",
      solutionCode: "with open('file.txt') as f:\n  data = f.read() # auto closes"
    },
    {
      title: "Explain list, tuple, dict differences",
      description: "Mutable vs immutable, ordered vs unordered, use cases",
      difficulty: "Easy",
      category: "Python",
      tags: ["data-structures"],
      examples: [{ input: "list mutable", output: "tuple immutable, dict key-value" }],
      solution: "List: ordered mutable [], Tuple: ordered immutable (), Dict: key-value {}",
      solutionCode: "lst = [1,2,3]; tpl = (1,2,3); dct = {'a':1, 'b':2}"
    },
    {
      title: "What are exceptions and try-except?",
      description: "Handle errors, custom exceptions, finally block",
      difficulty: "Easy",
      category: "Python",
      tags: ["exception", "error"],
      examples: [{ input: "try-except-finally", output: "Error handling and cleanup" }],
      solution: "Try-except catches exceptions, finally runs always",
      solutionCode: "try:\n  risky()\nexcept ValueError:\n  handle()\nfinally:\n  cleanup()"
    },
    {
      title: "Explain Python slicing",
      description: "String/list slicing syntax, negative indices, step",
      difficulty: "Easy",
      category: "Python",
      tags: ["string", "list"],
      examples: [{ input: "s[1:4:2]", output: "Every 2nd char from index 1 to 4" }],
      solution: "Slicing: [start:end:step], negative for reverse indexing",
      solutionCode: "s = 'hello'\ns[1:4] # 'ell'\ns[::2] # 'hlo' (every 2nd)\ns[::-1] # 'olleh' (reversed)"
    },
    {
      title: "What is a dictionary comprehension?",
      description: "Dict comprehension syntax and use cases",
      difficulty: "Easy",
      category: "Python",
      tags: ["dict", "comprehension"],
      examples: [{ input: "{x: x**2 for x in range(5)}", output: "{0:0, 1:1, 2:4...}" }],
      solution: "Dict comprehension creates dicts concisely",
      solutionCode: "squares = {x: x**2 for x in range(5)}\nfiltered = {k:v for k,v in dict.items() if v>0}"
    },
    {
      title: "Explain imports in Python",
      description: "Import vs from-import, modules, packages",
      difficulty: "Easy",
      category: "Python",
      tags: ["import", "module"],
      examples: [{ input: "import math", output: "math.sqrt()" }],
      solution: "import loads module, from imports specific items",
      solutionCode: "import math\nfrom os import path\nfrom datetime import datetime as dt"
    },
    {
      title: "What is a set in Python?",
      description: "Set operations, unique elements, set comprehension",
      difficulty: "Easy",
      category: "Python",
      tags: ["set", "data-structure"],
      examples: [{ input: "{1,2,2,3}", output: "{1,2,3} (unique only)" }],
      solution: "Sets contain unique elements, support union/intersection/difference",
      solutionCode: "s = {1,2,3}\ns.add(4)\ns2 = s | {4,5} # union\ns2 = s & {2,3} # intersection"
    }
  ],
  "Full Stack": [
    {
      title: "What is full stack development?",
      description: "Frontend, backend, database, DevOps responsibilities",
      difficulty: "Easy",
      category: "Full Stack",
      tags: ["fullstack", "overview"],
      examples: [{ input: "Full stack layers", output: "Frontend (UI), Backend (API), Database, DevOps" }],
      solution: "Full stack covers entire application: frontend, backend, database, deployment",
      solutionCode: "Frontend: React, Vue\nBackend: Node, Python\nDatabase: MongoDB, PostgreSQL\nDevOps: Docker, K8s"
    },
    {
      title: "Explain MVC architecture",
      description: "Model-View-Controller pattern and its benefits",
      difficulty: "Medium",
      category: "Full Stack",
      tags: ["architecture", "design"],
      examples: [{ input: "Separation of concerns", output: "Model, View, Controller" }],
      solution: "MVC separates data (Model), UI (View), logic (Controller)",
      solutionCode: "Model: database/data logic\nView: UI templates\nController: request handler"
    },
    {
      title: "What is RESTful API design?",
      description: "REST principles, resource-oriented, stateless operations",
      difficulty: "Medium",
      category: "Full Stack",
      tags: ["api", "rest"],
      examples: [{ input: "Resource URLs", output: "/api/users, /api/users/{id}" }],
      solution: "RESTful APIs use URLs as resources, HTTP methods for operations",
      solutionCode: "GET /api/users - list\nPOST /api/users - create\nPUT /api/users/{id} - update\nDELETE /api/users/{id} - delete"
    },
    {
      title: "Explain client-server architecture",
      description: "Request-response flow, separation of concerns",
      difficulty: "Easy",
      category: "Full Stack",
      tags: ["architecture"],
      examples: [{ input: "Client makes request", output: "Server responds with data" }],
      solution: "Client sends request to server, server processes and responds",
      solutionCode: "Client: browser/app\nServer: API/backend\nCommunication: HTTP/WebSocket"
    },
    {
      title: "What is API versioning strategy?",
      description: "Backward compatibility, versioning approaches",
      difficulty: "Medium",
      category: "Full Stack",
      tags: ["api", "design"],
      examples: [{ input: "/api/v1 vs /api/v2", output: "Different endpoints for versions" }],
      solution: "Version APIs in URL or header to manage breaking changes",
      solutionCode: "GET /api/v1/users\nGET /api/v2/users (different structure)"
    },
    {
      title: "Explain database normalization",
      description: "1NF, 2NF, 3NF, avoiding redundancy",
      difficulty: "Medium",
      category: "Full Stack",
      tags: ["database", "design"],
      examples: [{ input: "Normalize tables", output: "Remove redundancy, improve integrity" }],
      solution: "Normalization reduces data duplication and improves consistency",
      solutionCode: "1NF: atomic values\n2NF: eliminate partial dependencies\n3NF: eliminate transitive dependencies"
    },
    {
      title: "What is authentication workflow?",
      description: "User login flow, tokens, session handling",
      difficulty: "Medium",
      category: "Full Stack",
      tags: ["security", "auth"],
      examples: [{ input: "Login credentials", output: "Generate JWT token" }],
      solution: "Authenticate user, generate token, validate on each request",
      solutionCode: "Login: POST /login returns JWT\nClient stores token\nAPI validates token in Authorization header"
    },
    {
      title: "Explain CORS and security",
      description: "Cross-origin requests, CORS configuration, CSRF protection",
      difficulty: "Medium",
      category: "Full Stack",
      tags: ["security", "cors"],
      examples: [{ input: "Access-Control headers", output: "Allow/deny cross-origin requests" }],
      solution: "CORS controls cross-domain requests, CSRF prevents unauthorized actions",
      solutionCode: "app.use(cors({ origin: 'http://localhost:3000' }));"
    },
    {
      title: "What is environment-based configuration?",
      description: "Development, staging, production configurations",
      difficulty: "Easy",
      category: "Full Stack",
      tags: ["config", "devops"],
      examples: [{ input: ".env files", output: "Different config per environment" }],
      solution: "Use environment variables for environment-specific config",
      solutionCode: "Dev: DB_URL=localhost\nProd: DB_URL=production-server\nConfig via .env file"
    },
    {
      title: "Explain CI/CD pipeline",
      description: "Continuous Integration, Continuous Deployment, automation",
      difficulty: "Medium",
      category: "Full Stack",
      tags: ["devops", "ci-cd"],
      examples: [{ input: "Code commit", output: "Auto-test, auto-deploy" }],
      solution: "CI/CD automates testing and deployment on code changes",
      solutionCode: "GitHub Actions: test on commit, deploy on merge\nJenkins, GitLab CI alternative"
    },
    {
      title: "What are microservices?",
      description: "Monolithic vs microservices, distributed systems",
      difficulty: "Hard",
      category: "Full Stack",
      tags: ["architecture", "microservices"],
      examples: [{ input: "Separate services", output: "User service, Order service, Payment service" }],
      solution: "Microservices break app into independent deployable services",
      solutionCode: "Auth service, User service, Product service communicate via APIs"
    }
  ],
  "Data Analyst": [
    {
      title: "What are SQL joins?",
      description: "INNER, LEFT, RIGHT, OUTER joins with examples",
      difficulty: "Easy",
      category: "Data Analyst",
      tags: ["sql", "join"],
      examples: [{ input: "Match records", output: "INNER JOIN, LEFT JOIN, etc" }],
      solution: "Joins combine tables: INNER (matching), LEFT (all left), RIGHT (all right), FULL (all)",
      solutionCode: "SELECT * FROM users LEFT JOIN orders ON users.id = orders.user_id;"
    },
    {
      title: "Explain GROUP BY and aggregates",
      description: "GROUP BY clause, COUNT, SUM, AVG, MAX, MIN",
      difficulty: "Easy",
      category: "Data Analyst",
      tags: ["sql", "aggregate"],
      examples: [{ input: "Count per category", output: "GROUP BY category, COUNT(*)" }],
      solution: "GROUP BY groups rows, aggregates summarize each group",
      solutionCode: "SELECT category, COUNT(*), AVG(price) FROM products GROUP BY category;"
    },
    {
      title: "What is HAVING clause?",
      description: "Filter groups after aggregation, HAVING vs WHERE",
      difficulty: "Medium",
      category: "Data Analyst",
      tags: ["sql", "filter"],
      examples: [{ input: "Group having count > 5", output: "Filter aggregated results" }],
      solution: "HAVING filters groups after GROUP BY, WHERE filters before",
      solutionCode: "SELECT category, COUNT(*) FROM products GROUP BY category HAVING COUNT(*) > 5;"
    },
    {
      title: "Explain window functions",
      description: "ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD",
      difficulty: "Hard",
      category: "Data Analyst",
      tags: ["sql", "window"],
      examples: [{ input: "Rank employees by salary", output: "RANK() OVER (ORDER BY salary)" }],
      solution: "Window functions perform calculation across set of rows",
      solutionCode: "SELECT name, salary, RANK() OVER (ORDER BY salary DESC) FROM employees;"
    },
    {
      title: "What is a subquery?",
      description: "Nested queries, WHERE subqueries, FROM subqueries",
      difficulty: "Medium",
      category: "Data Analyst",
      tags: ["sql", "subquery"],
      examples: [{ input: "Query in query", output: "SELECT * FROM (...)" }],
      solution: "Subquery executes first, result used in outer query",
      solutionCode: "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders);"
    },
    {
      title: "Explain UNION and UNION ALL",
      description: "Combine results from multiple queries",
      difficulty: "Easy",
      category: "Data Analyst",
      tags: ["sql", "union"],
      examples: [{ input: "Combine queries", output: "UNION removes duplicates, UNION ALL keeps them" }],
      solution: "UNION combines results, UNION ALL includes duplicates",
      solutionCode: "SELECT name FROM users UNION SELECT name FROM customers;"
    },
    {
      title: "What is normalization?",
      description: "Database normalization forms 1NF, 2NF, 3NF",
      difficulty: "Medium",
      category: "Data Analyst",
      tags: ["database", "design"],
      examples: [{ input: "Eliminate redundancy", output: "Normalize tables" }],
      solution: "Normalization reduces redundancy and improves data integrity",
      solutionCode: "1NF: atomic values\n2NF: no partial dependencies\n3NF: no transitive dependencies"
    },
    {
      title: "Explain indexes in SQL",
      description: "Index types, performance impact, when to use",
      difficulty: "Medium",
      category: "Data Analyst",
      tags: ["database", "index"],
      examples: [{ input: "Find email quickly", output: "CREATE INDEX on email column" }],
      solution: "Indexes speed up queries but slow down inserts/updates",
      solutionCode: "CREATE INDEX idx_email ON users(email);\nSELECT * FROM users WHERE email='test@test.com';"
    },
    {
      title: "What are views in SQL?",
      description: "Virtual tables, stored queries, benefits",
      difficulty: "Easy",
      category: "Data Analyst",
      tags: ["sql", "view"],
      examples: [{ input: "Virtual table", output: "SELECT from another table/query" }],
      solution: "Views are stored queries providing data abstraction",
      solutionCode: "CREATE VIEW user_orders AS SELECT u.name, o.total FROM users u JOIN orders o;"
    },
    {
      title: "Explain transactions and ACID",
      description: "Atomicity, Consistency, Isolation, Durability",
      difficulty: "Hard",
      category: "Data Analyst",
      tags: ["database", "transaction"],
      examples: [{ input: "All or nothing", output: "BEGIN, COMMIT, ROLLBACK" }],
      solution: "Transactions ensure data integrity with ACID properties",
      solutionCode: "BEGIN; UPDATE account1; UPDATE account2; COMMIT; /* or ROLLBACK */"
    },
    {
      title: "What is data warehousing?",
      description: "Data warehouse vs database, OLAP vs OLTP",
      difficulty: "Hard",
      category: "Data Analyst",
      tags: ["datawarehouse", "analytics"],
      examples: [{ input: "Analytics on historical data", output: "Data warehouse stores aggregated data" }],
      solution: "DW stores historical data for analytics, DB for transactional operations",
      solutionCode: "DW: denormalized, OLAP\nDB: normalized, OLTP"
    },
    {
      title: "Explain pivot tables in SQL",
      description: "PIVOT clause, rotating rows to columns",
      difficulty: "Hard",
      category: "Data Analyst",
      tags: ["sql", "pivot"],
      examples: [{ input: "Transpose data", output: "Rows become columns" }],
      solution: "PIVOT rotates row data into columns for crosstab",
      solutionCode: "SELECT * FROM sales PIVOT (SUM(amount) FOR month IN ('Jan','Feb','Mar'));"
    },
    {
      title: "What are NULL values and operations?",
      description: "IS NULL, COALESCE, handling missing data",
      difficulty: "Easy",
      category: "Data Analyst",
      tags: ["sql", "null"],
      examples: [{ input: "Check null", output: "IS NULL, NOT NULL" }],
      solution: "NULL represents missing data, use IS NULL, COALESCE for defaults",
      solutionCode: "SELECT * FROM users WHERE phone IS NULL;\nSELECT name, COALESCE(phone, 'N/A') FROM users;"
    },
    {
      title: "Explain string functions in SQL",
      description: "CONCAT, SUBSTRING, UPPER, LOWER, TRIM",
      difficulty: "Easy",
      category: "Data Analyst",
      tags: ["sql", "string"],
      examples: [{ input: "Manipulate strings", output: "CONCAT, SUBSTRING, UPPER" }],
      solution: "String functions manipulate text: CONCAT, SUBSTRING, UPPER, LOWER, TRIM",
      solutionCode: "SELECT UPPER(name), SUBSTRING(email, 1, 5), CONCAT(first,' ',last) FROM users;"
    }
  ]
};

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace');
    console.log('✅ Connected to MongoDB');

    // Clear existing questions
    const deletedCount = await Question.deleteMany({});
    console.log(`🗑️  Deleted ${deletedCount.deletedCount} existing questions`);

    // Flatten all questions across all categories
    let totalQuestions = [];
    for (const [category, questions] of Object.entries(categoryQuestions)) {
      totalQuestions = totalQuestions.concat(questions);
    }

    // Insert all questions
    const result = await Question.insertMany(totalQuestions);
    console.log(`\n✅ Successfully seeded ${result.length} interview questions!`);
    
    // Display summary
    console.log('\n📊 Questions by Category:');
    const categories = await Question.collection.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();
    
    let totalCount = 0;
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} questions`);
      totalCount += cat.count;
    });

    console.log(`\n📈 Total Questions Seeded: ${totalCount}`);
    console.log('\n✨ All categories now have distinct questions!');

    mongoose.connection.close();
    console.log('\n🎉 Database seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

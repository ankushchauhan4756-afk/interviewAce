import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ArrowLeft, Bookmark, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import './NotesDetailPage.css';

function NotesDetailPage() {
  const { category } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const categoryData = {
    Frontend: {
      color: '#06b6d4',
      icon: '🎨',
      topics: [
        {
          title: 'HTML Fundamentals',
          explained: [
            {
              subtopic: 'Semantic HTML',
              content: 'Semantic HTML uses meaningful tags that describe the purpose of content. Examples: <article>, <section>, <nav>, <header>, <footer>. Benefits: Better SEO, improved accessibility (a11y), cleaner code structure, helps screen readers understand content.'
            },
            {
              subtopic: 'Meta Tags & SEO',
              content: 'Meta tags provide metadata about HTML documents. Important tags: <meta name="viewport"> for responsive design, <meta name="description"> for search results, <meta name="keywords"> for SEO. Open Graph tags for social sharing: og:title, og:image, og:description.'
            },
            {
              subtopic: 'Form Elements & Validation',
              content: 'HTML5 forms include input types: text, email, password, number, date, checkbox, radio, select, textarea. Validation attributes: required, pattern, min, max, minlength, maxlength. Custom validation using HTML5 API: checkValidity(), setCustomValidity(). Always validate on server side too.'
            },
            {
              subtopic: 'Canvas & SVG',
              content: 'Canvas: Pixel-based drawing using JavaScript. Good for animations, games, complex graphics. SVG: Vector-based, scalable, resolution-independent. Good for logos, icons, diagrams. Canvas is more performant for complex animations, SVG is better for web-based graphics and animations.'
            },
            {
              subtopic: 'Web APIs & DOM',
              content: 'DOM (Document Object Model) is the interface to HTML. Key APIs: querySelector(), getElementById(), createElement(), appendChild(), addEventListener(). Event handling: click, mouseover, change, input, submit. Best practices: Use event delegation, avoid inline handlers, use modern event listener APIs.'
            }
          ]
        },
        {
          title: 'CSS Advanced',
          explained: [
            {
              subtopic: 'Flexbox Layout',
              content: 'Flexbox is a one-dimensional layout mechanism. Container properties: display: flex, flex-direction, justify-content, align-items, gap. Item properties: flex (shorthand for flex-grow, flex-shrink, flex-basis), align-self, order. Perfect for: navbars, centering, responsive layouts.'
            },
            {
              subtopic: 'CSS Grid',
              content: 'Grid is a two-dimensional layout mechanism. Container: display: grid, grid-template-columns, grid-template-rows, gap. Grid functions: fr (fraction), repeat(), auto-fit, auto-fill, minmax(). Placement: grid-column, grid-row, grid-auto-flow. Use Grid for complex layouts, Flexbox for simple linear layouts.'
            },
            {
              subtopic: 'Responsive Design',
              content: 'Mobile-first approach: Start with mobile styles, then add media queries for larger screens. Media queries: @media (min-width: 768px), (max-width: 480px). Viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1">. Relative units: %, em, rem, vh, vw instead of px.'
            },
            {
              subtopic: 'Animations & Transitions',
              content: 'Transitions: transition property, duration, timing-function, delay. Timing functions: ease, ease-in, ease-out, linear, cubic-bezier(). Animations: @keyframes, animation-name, duration, iteration-count, direction. Performance: Use transform and opacity for smooth animations, avoid animating layout properties.'
            },
            {
              subtopic: 'CSS Custom Properties',
              content: 'CSS Variables defined with --: :root { --primary-color: #10b981; }. Usage: color: var(--primary-color). Fallback: color: var(--primary-color, blue). Scope: Can be global or local. Dynamic changes with JavaScript: element.style.setProperty("--variable-name", "value").'
            }
          ]
        },
        {
          title: 'JavaScript Essentials',
          explained: [
            {
              subtopic: 'Closures & Scope Chain',
              content: 'Closure: Function that has access to outer function\'s variables. Example: function outer() { const x = 1; return function inner() { console.log(x); } }. Scope Chain: Local → Parent → Global scope. Lexical scoping: Inner functions can access outer variables. Key concept for callbacks, event handlers, data privacy.'
            },
            {
              subtopic: 'Promises & Async/Await',
              content: 'Promise: Object for asynchronous operations. States: Pending, Fulfilled, Rejected. Syntax: new Promise((resolve, reject) => {}). .then(), .catch(), .finally(). Async/Await: Syntactic sugar for promises. Function marked with async returns Promise. await pauses execution, cleaner error handling with try/catch.'
            },
            {
              subtopic: 'Event Loop & Callback Queue',
              content: 'Event Loop: Checks call stack and message queue. Execution: Synchronous code → Microtask queue (promises) → Macrotask queue (setTimeout, I/O). Microtasks run before macrotasks. Understanding this prevents race conditions and unexpected behavior in async code.'
            },
            {
              subtopic: 'Prototypal Inheritance',
              content: 'Every object has a [[Prototype]] (accessible via __proto__ or Object.getPrototypeOf()). Prototype chain: Object → property lookup → check __proto__. Constructor functions: function MyClass() {}; new MyClass(). Object.create() for explicit prototype setting. Modern approach: ES6 classes as syntactic sugar.'
            },
            {
              subtopic: 'ES6+ Modern Features',
              content: 'Arrow functions: () => {}. No this binding, shorter syntax. Destructuring: const { name } = obj; const [a, b] = array;. Spread operator: ...array, ...obj. Template literals: `Hello ${name}`. let/const instead of var. Classes: class MyClass { constructor() {} }. Modules: import/export.'
            }
          ]
        },
        {
          title: 'React Deep Dive',
          explained: [
            {
              subtopic: 'Virtual DOM & Reconciliation',
              content: 'Virtual DOM: In-memory representation of real DOM. React creates virtual tree, compares with previous (diffing), updates real DOM efficiently. Reconciliation algorithm: Keys help React identify which items changed. Lists: Always use stable keys (IDs), not array indices. Prevents bugs with form state, animations.'
            },
            {
              subtopic: 'Hooks (Fundamentals)',
              content: 'useState: Manage state. const [count, setCount] = useState(0);. useEffect: Side effects & cleanup. Dependencies array controls when effect runs. useContext: Access context without prop drilling. Rules: Only call hooks at top level, not in loops/conditions.'
            },
            {
              subtopic: 'Component Lifecycle & Optimization',
              content: 'Class components: componentDidMount, componentDidUpdate, componentWillUnmount. Functional components use hooks instead. useMemo: Memoize expensive calculations. useCallback: Memoize functions. React.memo: Prevent re-renders if props haven\'t changed. Profiler API for performance analysis.'
            },
            {
              subtopic: 'State Management Patterns',
              content: 'Prop drilling: Pass props through many levels. Context API: Reduces prop drilling. Redux/Zustand: Centralized global state. Local state: useState for component-specific data. Lifting state up: Move state to common parent. Key: Keep state close to where it\'s used.'
            },
            {
              subtopic: 'React Router Navigation',
              content: 'BrowserRouter: Wraps app. Routes, Route: Define page components. Link: Navigate without page reload. useNavigate(): Programmatic navigation. useParams(): Get URL parameters. useLocation(): Get current location. Dynamic routes: /user/:id matches /user/123 etc.'
            }
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
          explained: [
            {
              subtopic: 'HTTP Methods & Status Codes',
              content: 'GET: Retrieve data. POST: Create resource. PUT: Replace entire resource. PATCH: Partial update. DELETE: Remove resource. Status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error). Idempotent: GET, PUT, DELETE (safe to repeat). Non-idempotent: POST, PATCH.'
            },
            {
              subtopic: 'Request/Response Structure',
              content: 'Request: Method, URL, Headers, Body. Common headers: Content-Type, Authorization, User-Agent. Response: Status code, Headers, Body. REST should return appropriate status codes. Response format: Usually JSON. Request validation: Check content-type, validate body schema, sanitize inputs.'
            },
            {
              subtopic: 'API Versioning Strategies',
              content: 'URL versioning: /api/v1/users, /api/v2/users. Header versioning: Accept: application/json; version=1. Query string: /api/users?version=1. Deprecation: Announce changes, support old version for period. Breaking changes: New major version. Non-breaking: Add new fields, deprecate old ones gradually.'
            },
            {
              subtopic: 'Authentication (JWT, OAuth)',
              content: 'JWT (JSON Web Token): Header.Payload.Signature. No server-side session storage. Payload contains user data, claims. OAuth: Delegate authentication to provider (Google, GitHub). Authorization flows: Implicit, Authorization Code, Client Credentials. Always use HTTPS for tokens.'
            },
            {
              subtopic: 'Error Handling & Validation',
              content: 'Consistent error format: { error: "message", code: "ERROR_CODE" }. HTTP status codes indicate error type. Validation: Server-side only, never trust client. Libraries: Joi, Yup for schema validation. Input sanitization: Prevent SQL injection, XSS. Meaningful error messages: Help clients debug without exposing internals.'
            }
          ]
        },
        {
          title: 'Database Design',
          explained: [
            {
              subtopic: 'Relational vs NoSQL',
              content: 'Relational (SQL): Structured data, ACID properties, tables, relationships. Examples: PostgreSQL, MySQL. NoSQL: Flexible schema, horizontal scaling, documents. Examples: MongoDB, DynamoDB. Relational: Best for structured data, complex queries. NoSQL: Best for large-scale, flexible data, high throughput.'
            },
            {
              subtopic: 'Normalization & Schema',
              content: 'Normalization: Organize data to reduce redundancy. 1NF: No repeating groups. 2NF: Remove partial dependencies. 3NF: Remove transitive dependencies. Denormalization: Intentional redundancy for performance. Careful: Can cause consistency issues. Schema design: Choose appropriate data types, set constraints.'
            },
            {
              subtopic: 'Indexing Performance',
              content: 'Index: Faster lookups, slower writes. B-tree indexes: Default, ordered. Hash indexes: Fast exact lookups, no range. Composite index: Multiple columns. Query optimization: EXPLAIN ANALYZE. Index on frequently queried, filtered columns. Avoid indexing low cardinality columns.'
            },
            {
              subtopic: 'ACID Properties',
              content: 'Atomicity: All or nothing. Consistency: Database rules maintained. Isolation: Concurrent transactions don\'t interfere. Durability: Committed data persists. Transaction: BEGIN, COMMIT, ROLLBACK. Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable.'
            },
            {
              subtopic: 'Query Optimization',
              content: 'SELECT what you need, not *. JOIN efficiently, avoid N+1 queries. WHERE before JOIN, filter early. LIMIT result set. Analyze query plan: EXPLAIN. Connection pooling: Reduce overhead. Caching: Cache frequent queries. Monitor slow queries: Identify bottlenecks.'
            }
          ]
        },
        {
          title: 'Server Architecture',
          explained: [
            {
              subtopic: 'Middleware & Request Pipeline',
              content: 'Middleware: Functions that process requests. Chain: Request → Middleware1 → Middleware2 → Route Handler → Response. Express: app.use(middleware). Authentication middleware: Check tokens. Logging middleware: Record requests. CORS middleware: Handle cross-origin. Order matters: Earlier middlewares execute first.'
            },
            {
              subtopic: 'Caching Strategies',
              content: 'Client-side: Browser caching, ETags. Server-side: Cache expensive operations. In-memory: Redis. Database query caching. CDN: Content Delivery Network for static files. Cache invalidation: Time-based, event-based. Cache headers: Cache-Control, ETag, Last-Modified.'
            },
            {
              subtopic: 'Load Balancing & Scalability',
              content: 'Horizontal scaling: Add more servers. Vertical scaling: Bigger server (limited). Load balancer: Distribute traffic. Session management: Sticky sessions or shared cache. Database replication: Master-Slave. Database sharding: Partition data. Auto-scaling: Cloud services adjust based on load.'
            },
            {
              subtopic: 'Microservices Pattern',
              content: 'Monolith vs Microservices: Single vs multiple independent services. Benefits: Scalability, independent deployment, team autonomy. Challenges: Complexity, distributed systems issues, data consistency. Service discovery: How services find each other. API Gateway: Single entry point. Event-driven: Pub/sub for service communication.'
            },
            {
              subtopic: 'Message Queues (RabbitMQ, Kafka)',
              content: 'Asynchronous processing: Queue jobs, process later. RabbitMQ: Reliable, complex routing. Kafka: High throughput, streaming. Use cases: Email sending, image processing, log aggregation. Benefits: Decouple services, improve reliability, handle traffic spikes.'
            }
          ]
        },
        {
          title: 'Security Best Practices',
          explained: [
            {
              subtopic: 'SQL Injection Prevention',
              content: 'SQL Injection: Attacker modifies SQL query through input. Example: username = "admin\" --" bypasses authentication. Prevention: Parameterized queries, prepared statements. ORMs: Prevent by default. Input validation: Whitelist valid patterns. Never concatenate user input into queries.'
            },
            {
              subtopic: 'XSS Protection',
              content: 'Cross-Site Scripting: Inject JavaScript into pages. Stored XSS: Save malicious script in DB. Reflected XSS: URL parameter contains script. DOM-based XSS: JavaScript writes to DOM. Prevention: Sanitize output, HTML encode, CSP headers. Content-Security-Policy: Restrict script sources.'
            },
            {
              subtopic: 'CORS & Same-Origin Policy',
              content: 'Same-Origin Policy: Browser restricts cross-origin requests. Origin: Scheme + Domain + Port. CORS headers: Access-Control-Allow-Origin, Access-Control-Allow-Methods. Preflight requests: OPTIONS method before actual request. Credentials: Cookies sent only with same-origin by default.'
            },
            {
              subtopic: 'Secure Password Storage',
              content: 'Never store plain passwords. Hash: One-way, cannot be reversed. Bcrypt, Argon2: Slow, resistant to brute force. Salt: Random data added to password. Hashing password: bcrypt.hash(password, 10). Comparison: bcrypt.compare(plainPassword, hashedPassword).'
            },
            {
              subtopic: 'Environment Variables & Secrets',
              content: 'Never commit secrets to version control. .env file: Local development. Environment variables: Production via host OS. Services: AWS Secrets Manager, HashiCorp Vault. Access control: Principle of least privilege. Rotate secrets: Change periodically. Audit: Log who accessed what and when.'
            }
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
          explained: [
            {
              subtopic: 'Two-Pointer Technique',
              content: 'Two pointers: Start and end moving towards each other. Use case: Sorted array, find pairs. Example: Two Sum II. Remove Duplicates: Move slow pointer for unique elements. Container With Most Water: Track maximum area while moving pointers. Reverse: Swap elements from ends to middle.'
            },
            {
              subtopic: 'Sliding Window',
              content: 'Fixed window: Maintain window of size k. Variable window: Expand and contract. Example: Longest Substring Without Repeating Characters. Maximum Subarray Sum of size k. Pattern: Expand right, grow window. When condition fails, shrink from left. Calculate result as you go. Time: O(n), not O(n²).'
            },
            {
              subtopic: 'Binary Search',
              content: 'Sorted array: Time O(log n). Template: left, right, mid = left + (right - left) / 2. Three types: Finding element, first occurrence, last occurrence. Variations: Search in rotated array, Find peak element, Median of sorted arrays. Condition: left <= right or left < right depends on problem.'
            },
            {
              subtopic: 'String Manipulation',
              content: 'Palindrome: Check from ends. Anagram: Sort or count characters. Pattern matching: Regex or manual. Subsequence vs Substring: Subsequence need not be contiguous. String matching algorithms: KMP, Rabin-Karp. Trie: Efficient string searching. String compression: RLE (Run-Length Encoding).'
            },
            {
              subtopic: 'Prefix Sum & Difference Arrays',
              content: 'Prefix sum: cumsum[i] = array[0] + ... + array[i]. Query range sum: O(1). Range update difference array: Mark start and end. Apply differences cumulatively. Useful for: Range sum queries, range updates, contribution to subsets.'
            }
          ]
        },
        {
          title: 'Trees and Graphs',
          explained: [
            {
              subtopic: 'DFS & BFS Traversals',
              content: 'DFS (Depth-First Search): Stack or recursion. Preorder, Inorder, Postorder for trees. Use: Topological sort, connected components, paths. BFS (Breadth-First Search): Queue. Level-order traversal. Use: Shortest path unweighted, level-order. DFS: O(V+E) space O(h) height. BFS: O(V) space.'
            },
            {
              subtopic: 'Binary Search Trees',
              content: 'Properties: Left < Parent < Right. Search: O(log n) average, O(n) worst. Insert/Delete: Maintain order. Self-balancing trees: AVL, Red-Black prevent O(n) worst case. Inorder traversal: Sorted order. Problems: Validate BST, Lowest Common Ancestor, Closest values.'
            },
            {
              subtopic: 'Balanced Trees (AVL, Red-Black)',
              content: 'AVL: Height difference max 1. Rotations: Left, Right, Left-Right, Right-Left. Red-Black: Nodes colored red/black, properties maintained. Both aim: O(log n) operations. Trade-off: Rotation overhead vs guaranteed O(log n). Red-Black: Faster insertions. AVL: Faster lookups.'
            },
            {
              subtopic: 'Graph Algorithms',
              content: 'Adjacency list/matrix: Graph representation. Connected components: DFS/BFS. Cycle detection: DFS (back edge). Topological sort: DFS with finish times. Shortest path unweighted: BFS. Weighted: Dijkstra, Bellman-Ford. All pairs: Floyd-Warshall.'
            },
            {
              subtopic: 'Shortest Path Algorithms',
              content: 'Dijkstra: Greedy, non-negative weights, O(E log V) with min-heap. Bellman-Ford: Allows negative weights, O(VE). Detects negative cycles. Difference: Dijkstra single-source, Floyd-Warshall all-pairs. Use Dijkstra unless negative weights.'
            }
          ]
        },
        {
          title: 'Dynamic Programming',
          explained: [
            {
              subtopic: 'Memoization vs Tabulation',
              content: 'Memoization: Top-down, recursion with caching. Start from goal, break into subproblems. Store computed results. Tabulation: Bottom-up, iterative, build table from base cases. No recursion overhead. Memoization: Natural for problem statement. Tabulation: Better space optimization.'
            },
            {
              subtopic: 'Longest Common Subsequence',
              content: 'LCS: Longest sequence common to both strings. DP[i][j] = length of LCS of first i and j characters. If match: DP[i-1][j-1] + 1. Else: max(DP[i-1][j], DP[i][j-1]). Space: Can optimize to 1D array. Use: Diff algorithms, version control.'
            },
            {
              subtopic: 'Coin Change & Knapsack',
              content: 'Coin Change: Minimum coins for amount. DP[i] = min coins for amount i. Unbounded: Use coins multiple times. 0/1 Knapsack: Select items, maximize value, capacity limit. DP[w] = max value with weight capacity w. Bounded: Limited quantity of each item.'
            },
            {
              subtopic: 'State Definition & Transitions',
              content: 'Identify: What is one state? What subproblems? DP[i] = optimal solution for state i. Transition: How does state i relate to previous states? Base case: DP[0], DP[1]. Relation: Express DP[i] in terms of previous states. Carefully design state space reduces complexity.'
            },
            {
              subtopic: 'Optimization Techniques',
              content: 'Space optimization: 1D DP instead of 2D if only previous row needed. Pruning: Skip impossible states. Early termination: Found solution. Bitmasking: Subset enumeration. Digit DP: Digits of number. Matrix exponentiation: Optimize recurrence.'
            }
          ]
        },
        {
          title: 'Sorting and Searching',
          explained: [
            {
              subtopic: 'Quick Sort, Merge Sort',
              content: 'Quick Sort: Average O(n log n), worst O(n²). Partition around pivot. In-place, good cache locality. Random pivot selection improves average case. Merge Sort: O(n log n) guaranteed. Stable, predictable. Requires O(n) extra space (in-place version complex).'
            },
            {
              subtopic: 'Heap & Priority Queues',
              content: 'Heap: Complete binary tree. Min-heap: Parent ≤ Children. Max-heap: Parent ≥ Children. Arrays: Index formulas - left = 2i + 1, right = 2i + 2, parent = (i-1)/2. Operations: Insert O(log n), Delete min O(log n). Heapify: Make array into heap O(n).'
            },
            {
              subtopic: 'Counting Sort & Radix Sort',
              content: 'Counting Sort: O(n + k) where k is range. Only for non-negative integers. Stable version: Count cumulative. Radix Sort: Sort by digits, uses counting sort. Time: O(d * (n + k)) where d is digits. Use for: Large number of small range integers.'
            },
            {
              subtopic: 'Selection Algorithm (Kth Element)',
              content: 'Find kth smallest/largest without full sort. Quick Select: Average O(n), worst O(n²). Median of medians: O(n) guaranteed. Partition around pivot, recurse on relevant side. K-th largest in stream: Min-heap of size k.'
            },
            {
              subtopic: 'Time & Space Complexity',
              content: 'Time: Operations count as n grows. Space: Memory used including input. Big-O: Upper bound. Big-Omega: Lower bound. Big-Theta: Tight bound. Master theorem: Solve T(n) = aT(n/b) + f(n). Compare O(n log n) algorithms: Merge(stable) vs Quick(in-place).'
            }
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
          explained: [
            {
              subtopic: 'Encapsulation',
              content: 'Bundle data and methods together. Access modifiers: public, private, protected, package-private. Getters/setters control access. Benefits: Data hiding, validation, flexibility. Example: private int age with public getAge() and setAge(int). Prevents direct modification, ensures consistency.'
            },
            {
              subtopic: 'Inheritance',
              content: 'Child class inherits parent properties/methods. Extends keyword: class Child extends Parent {}. Constructor chaining: super(). Method overriding: Child replaces parent method. super.method() calls parent version. Single inheritance in Java (extends one). Multiple inheritance via interfaces.'
            },
            {
              subtopic: 'Polymorphism',
              content: 'Many forms. Compile-time (overloading): Same name, different signatures. Runtime (overriding): Parent reference to child object, method resolution at runtime. Classic example: Animal[] with Dog, Cat objects. Benefits: Flexibility, extensibility, loose coupling.'
            },
            {
              subtopic: 'Method Overloading vs Overriding',
              content: 'Overloading: Same name, different parameters. Same class or parent-child, compile-time binding. Overriding: Same name/signature in child. Different return type allowed (covariant). Must be same or compatible signature. @Override annotation recommended.'
            },
            {
              subtopic: 'Composition over Inheritance',
              content: 'Favor has-a over is-a. Example: Car has Engine not Car extends Engine. Compositional design: More flexible, reusable, avoids fragile base class problem. Inheritance: Should be vertical, meaningful hierarchy. Composition: Better encapsulation.'
            }
          ]
        },
        {
          title: 'Collections Framework',
          explained: [
            {
              subtopic: 'List, Set, Map Interfaces',
              content: 'List: Ordered, allows duplicates. ArrayList, LinkedList. Set: Unique elements, no order guarantee. HashSet, TreeSet. Map: Key-value pairs, unique keys. HashMap, TreeMap. Implementations: Synchronized versions vs concurrent versions.'
            },
            {
              subtopic: 'ArrayList vs LinkedList',
              content: 'ArrayList: Dynamic array. Get O(1), Insert/Delete O(n). Good for: Frequent reads. LinkedList: Doubly linked list. Get O(n), Insert/Delete O(1) at ends. Good for: Frequent insertions/deletions. Memory: ArrayList uses less, LinkedList has pointer overhead.'
            },
            {
              subtopic: 'HashSet vs TreeSet',
              content: 'HashSet: Hash table, O(1) average operations. No order. TreeSet: Red-Black tree, O(log n). Sorted order. Null: HashSet allows one, TreeSet does not (unless custom comparator). Choose: HashSet for speed, TreeSet for ordered iteration.'
            },
            {
              subtopic: 'HashMap vs ConcurrentHashMap',
              content: 'HashMap: Not thread-safe. Better performance single-threaded. ConcurrentHashMap: Segment-based locking, thread-safe. Concurrent readers and writers. Collections.synchronizedMap(): Locks entire map, slower. Use ConcurrentHashMap for multi-threaded: Better performance than synchronized.'
            },
            {
              subtopic: 'Iterators & Fail-Fast',
              content: 'Iterator: Safe way to traverse. hasNext(), next(), remove(). Fail-fast: Iterator throws ConcurrentModificationException if underlying collection modified. Causes: Add, remove during iteration (different from iterator.remove()). Solutions: Iterator.remove(), ConcurrentHashMap, CopyOnWriteArrayList.'
            }
          ]
        },
        {
          title: 'Concurrency',
          explained: [
            {
              subtopic: 'Threads & Runnable',
              content: 'Thread: Lightweight process. Extend Thread class or implement Runnable. Preferred: Implement Runnable (single inheritance). start() vs run(): start() creates new thread, run() runs in current thread. Thread.sleep(): Pause execution. Thread.join(): Wait for completion.'
            },
            {
              subtopic: 'Synchronized Methods & Blocks',
              content: 'synchronized: Ensures only one thread executes at a time. Synchronized method: Locks object. Synchronized block: Lock specific object. Overhead: Reduced concurrency. Fine-grained locking: Synchronized block on specific fields. Avoid: Synchronizing entire method if small portion needs protection.'
            },
            {
              subtopic: 'Volatile Keyword',
              content: 'Volatile variables: Thread visibility, no caching. Memory barrier: Changes immediately visible to other threads. Prevents: Instruction reordering. NOT substitution for synchronization (no atomicity). Use: Flags, counters small enough. For compound operations: Use synchronized or AtomicInteger.'
            },
            {
              subtopic: 'ExecutorService & Thread Pools',
              content: 'ExecutorService: Manages thread pool. Executors.newFixedThreadPool(n): n threads. newCachedThreadPool(): Dynamic sizing. submit(Callable/Runnable): Queue task. shutdown(): Stop accepting tasks. awaitTermination(timeout, TimeUnit): Wait for completion. Benefits: Reuse threads, easy cancellation.'
            },
            {
              subtopic: 'Locks & Concurrent Collections',
              content: 'Lock interface: ReentrantLock, more flexible than synchronized. lock(), unlock(), tryLock(). Condition objects: wait/notify mechanism. ReadWriteLock: Multiple readers, single writer. CopyOnWriteArrayList, ConcurrentHashMap: Thread-safe, high concurrency. Choose: Based on read/write ratio.'
            }
          ]
        },
        {
          title: 'Java 8+ Features',
          explained: [
            {
              subtopic: 'Lambda Expressions',
              content: 'Lambda: (params) -> body. Functional programming syntax. Works with functional interfaces (one abstract method). Benefits: Shorter code, cleaner. Examples: (x) -> x * 2, (a, b) -> a + b. Type inference: Compiler deduces parameter types. Stateless better: Avoid side effects.'
            },
            {
              subtopic: 'Streams API',
              content: 'Streams: Process data declaratively. Lazy evaluation: Operations don\'t execute until terminal operation. Intermediate: filter(), map(), sorted(). Terminal: forEach(), collect(), reduce(), count(). Benefits: Concise, chainable, parallelizable. Collectors: toList(), toSet(), groupingBy(), joining().'
            },
            {
              subtopic: 'Optional Class',
              content: 'Optional<T>: Wrapper for nullable values. isPresent(), get(), orElse(), orElseThrow(), ifPresent(). Prevents NullPointerException. Chainable: Optional.of().map().filter().orElse(). Best practice: Don\'t call get() without checking isPresent(). Use map, filter, orElse chain instead.'
            },
            {
              subtopic: 'Default Methods in Interfaces',
              content: 'Default methods: Implementations in interfaces. Backward compatible: Existing classes not forced to override. Syntax: default returnType methodName() {}. Multiple inheritance of methods: Potential conflicts resolved by explicit override. Use: Add methods to interfaces without breaking existing code.'
            },
            {
              subtopic: 'Method References & Function Composition',
              content: 'Method references: System.out::println, String::valueOf. Shorthand for lambda calling one method. Types: Static, instance, constructor. Functional composition: Function.compose(), andThen(). Chain transformations. Example: Function<Integer, Integer> double_and_add = x -> x * 2.andThen(x -> x + 1).'
            }
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
          explained: [
            {
              subtopic: 'Variables & Data Types',
              content: 'Dynamic typing: var = value infers type. Types: int, float, str, bool, list, tuple, dict, set. Type checking: isinstance(var, int). Mutable: list, dict, set. Immutable: int, float, str, tuple. Memory: Small integer caching -5 to 256. Everything is object.'
            },
            {
              subtopic: 'Collections',
              content: 'List: Ordered, mutable []. Tuple: Ordered, immutable (). Set: Unique, unordered {}. Dict: Key-value pairs {key: value}. Operations: append(), extend(), pop(), update(). Slicing: list[start:end:step]. Comprehensions: [x for x in range(10) if x % 2 == 0].'
            },
            {
              subtopic: 'String Operations',
              content: 'Strings: Immutable, enclosed in quotes. Methods: split(), join(), strip(), replace(), find(). Formatting: f-strings (f"{var}"), %, format(). Slicing: str[1:5] substring. In operator: "a" in "abc" returns True. String methods return new strings.'
            },
            {
              subtopic: 'Lambda & Comprehensions',
              content: 'Lambda: Anonymous functions. lambda x: x * 2. Use with map(), filter(). List comprehension: [x * 2 for x in range(5)]. Dict comprehension: {x: x**2 for x in range(5)}. Readable: Preferred over lambda for simple operations. Generator expression: (x for x in range(1000000)) lazy.'
            },
            {
              subtopic: 'Generators & Iterators',
              content: 'Iterator: object with __iter__() and __next__(). for loop uses iterators implicitly. Generator: Function with yield. Returns generator object, lazy evaluation. Memory efficient: Yield one at a time. Generator expression: (x for x in range(10)). StopIteration: Signals end.'
            }
          ]
        },
        {
          title: 'OOP in Python',
          explained: [
            {
              subtopic: '__init__ Constructor',
              content: '__init__(self, ...): Initializes object. Called on instantiation. self: Reference to instance. Example: def __init__(self, name): self.name = name. Can have default parameters. Name mangling: __var becomes _ClassName__var (private).'
            },
            {
              subtopic: 'Class & Instance Variables',
              content: 'Instance variables: self.var = value, unique per object. Class variables: Defined on class, shared all instances. Modification: Instance variable shadows class variable. Access: self.var (instance first), ClassName.var (class). Useful: Counters, constants on class level.'
            },
            {
              subtopic: 'Inheritance & MRO',
              content: 'Inheritance: class Child(Parent):. MRO (Method Resolution Order): C3 linearization. super(): Call parent method. super().__init__(). Multiple inheritance: class Child(Parent1, Parent2). MRO: C3 algorithm determines order. Check: ClassName.__mro__'
            },
            {
              subtopic: 'Magic Methods',
              content: '__str__: String representation. __len__: Length operator. __eq__: Equality. __lt__: Less than (comparisons). __add__: Addition operator. __getitem__, __setitem__: Indexing. __call__: Callable object. Operator overloading: Define behaviors for operators.'
            },
            {
              subtopic: 'Decorators',
              content: 'Decorators: Wrapper functions, modify behavior. @ syntax: @decorator. Example: @property converts method to attribute. @staticmethod: No self, callable on class. @classmethod: cls parameter, operate on class. Stacking: Multiple decorators, execute bottom to top.'
            }
          ]
        },
        {
          title: 'Advanced Features',
          explained: [
            {
              subtopic: 'Context Managers',
              content: 'with statement: Automatic resource management. __enter__(): Acquire resource. __exit__(): Release resource. Example: with open(file) as f: (auto closes). Useful: Database connections, locks, temporary changes. contextlib: @contextmanager decorator for easy creation.'
            },
            {
              subtopic: 'Metaclasses & Descriptors',
              content: 'Metaclass: Class of class. Controls class creation. type: Default metaclass. Custom: Define __new__, __init__. Descriptors: Control attribute access. __get__, __set__, __delete__. Property: Built-in descriptor. Advanced: Usually not needed, complex.'
            },
            {
              subtopic: 'Exception Handling',
              content: 'try/except/else/finally: Structure. Multiple except blocks. Catch specific exceptions not bare except. else: Runs if no exception. finally: Always runs. raise: Throw exception. Custom exceptions: Inherit from Exception. Best practice: Catch specific exceptions.'
            },
            {
              subtopic: 'Asyncio',
              content: 'async def: Asynchronous function, returns coroutine. await: Wait for coroutine. asyncio.run(): Run async function. asyncio.gather(): Run multiple concurrently. Event loop: Executes coroutines. Benefits: High concurrency, efficient I/O. Not true parallelism (GIL).'
            },
            {
              subtopic: 'Type Hints',
              content: 'def func(x: int) -> str: Parameter and return types. Checked by mypy (static type checker). Optional[T]: Can be T or None. List[int]: List of integers. Dict[str, int]: String keys, int values. Improves: Readability, catch type errors early.'
            }
          ]
        },
        {
          title: 'Common Libraries',
          explained: [
            {
              subtopic: 'NumPy',
              content: 'Numerical computing. ndarrays: N-dimensional arrays, efficient. Broadcasting: Operations on different shapes. Functions: mean(), std(), sum(), etc. Linear algebra: numpy.linalg. Random: numpy.random. Vectorized: Fast operations on arrays vs loops.'
            },
            {
              subtopic: 'Pandas',
              content: 'Data manipulation. DataFrame: 2D tabular data. Series: 1D labeled array. Loading: read_csv(), read_excel(). Operations: groupby(), merge(), pivot_table(). Cleaning: fillna(), drop(), duplicates. Visualization: plot() method. Index: Row and column labels.'
            },
            {
              subtopic: 'Django & Flask',
              content: 'Django: Full-featured framework. ORM, admin panel, migrations. Flask: Lightweight, micro framework. Minimal, extensible. Routing: @app.route(). Models: Define data. Views: Handle requests. Templates: HTML rendering. Middleware: Request processing.'
            },
            {
              subtopic: 'Requests HTTP',
              content: 'HTTP library. requests.get(), .post(), .put(), .delete(). URL and headers: params, headers dicts. Timeout: requests.timeout=(connect, read). Response: .json(), .text, .status_code. Sessions: requests.Session() reuses connection. Error handling: .raise_for_status().'
            },
            {
              subtopic: 'SQLAlchemy ORM',
              content: 'Object-Relational Mapping. Define models: class User(Base). Relationships: relationship(), foreign keys. Querying: session.query().filter().all(). Insert: session.add(), session.commit(). Benefits: Database agnostic, type safety. Migrations: Alembic.'
            }
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
          explained: [
            {
              subtopic: 'SELECT, WHERE, ORDER BY, GROUP BY',
              content: 'SELECT: Specify columns or *. WHERE: Filter rows. Conditions: =, !=, >, <, BETWEEN, IN, LIKE. ORDER BY: Sort ASC (default) or DESC. GROUP BY: Aggregate rows. Often with: COUNT, SUM, AVG, MIN, MAX. HAVING: Filter groups (like WHERE but for groups). Execution order matters.'
            },
            {
              subtopic: 'JOINs',
              content: 'INNER JOIN: Common rows both tables. LEFT JOIN: All left, matching right. RIGHT JOIN: All right, matching left. FULL OUTER JOIN: All rows both tables. CROSS JOIN: Cartesian product. Self join: Table joined to itself. Join condition: ON clause. Null values from no match.'
            },
            {
              subtopic: 'Aggregation Functions',
              content: 'COUNT(): Number of rows (counts non-NULL). SUM(): Total of numeric column. AVG(): Average. MIN/MAX(): Minimum/maximum value. GROUP_CONCAT: Concatenate values. DISTINCT: Unique values. NULL handling: COUNT(*) vs COUNT(column). Often with GROUP BY.'
            },
            {
              subtopic: 'Subqueries & CTEs',
              content: 'Subquery: Query within query. IN, EXISTS, comparison. Can return scalar, row, table. CTE (Common Table Expression): WITH clause. Named subquery, referenced multiple times. Readable: Better than nested subqueries. Recursive CTE: For hierarchical data.'
            },
            {
              subtopic: 'Window Functions',
              content: 'ROW_NUMBER(): Unique rownum (1,2,3...). RANK(): Gaps on ties (1,1,3). DENSE_RANK(): No gaps (1,1,2). PARTITION BY: Divide rows into groups. ORDER BY: Order within partition. Over clause: OVER (PARTITION BY ... ORDER BY ...). Analytics: Running totals, previous row.'
            }
          ]
        },
        {
          title: 'Data Manipulation',
          explained: [
            {
              subtopic: 'INSERT, UPDATE, DELETE',
              content: 'INSERT: Add rows. INSERT ... VALUES () or SELECT from another table. UPDATE: Modify rows. SET column = value. WHERE specifies rows (omit affects all). DELETE: Remove rows. WHERE essential (prevent accidents). Transactions: Rollback on error.'
            },
            {
              subtopic: 'Transactions',
              content: 'ACID: Atomicity, Consistency, Isolation, Durability. BEGIN: Start transaction. COMMIT: Save changes. ROLLBACK: Undo changes. Savepoint: Partial rollback. Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable. Trade-off: Isolation vs Concurrency.'
            },
            {
              subtopic: 'Normalization',
              content: '1NF: Atomic values, no repeating groups. 2NF: No partial dependencies. 3NF: No transitive dependencies. BCNF: Stricter than 3NF. Boyce-Codd: Every determinant candidate key. Denormalization: Intentional redundancy for performance. Balance: Normalization vs query efficiency.'
            },
            {
              subtopic: 'Data Types & Constraints',
              content: 'Types: INT, VARCHAR, DATE, DECIMAL, BOOLEAN. Constraints: PRIMARY KEY (unique, not null), FOREIGN KEY, UNIQUE, NOT NULL, DEFAULT, CHECK. Relationships: Primary key in one table, foreign key in another. Referential integrity: Prevented by FK constraints.'
            },
            {
              subtopic: 'ETL Processes',
              content: 'Extract: Retrieve from source (database, API, file). Transform: Clean, convert, aggregate. Load: Insert to target database. Data quality: Validation, deduplication. Incremental vs full load. Scheduling: Regular execution. Tools: SQL, Python, Talend, Apache.'
            }
          ]
        },
        {
          title: 'Advanced Analytics',
          explained: [
            {
              subtopic: 'Window Functions (Advanced)',
              content: 'LAG(), LEAD(): Access previous/next row. FIRST_VALUE(), LAST_VALUE(): First/last in window. NTILE(n): Divide into n buckets. Cumulative sum: SUM() OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW). Useful: Trends, comparisons, calculations.'
            },
            {
              subtopic: 'Pivot Tables',
              content: 'PIVOT: Convert rows to columns. UNPIVOT (reverse). Useful: Transform data from tall to wide. Aggregation: Each cell contains aggregate function. Excel-like: Pivot tables in SQL. Syntax: varies by database (MySQL vs SQL Server vs PostgreSQL).'
            },
            {
              subtopic: 'Common Table Expressions',
              content: 'WITH clause: Define temporary named result set. WITH cte AS (SELECT ...) SELECT * FROM cte. Recursive CTE: FOR hierarchical/recursive queries. Multiple CTEs: Comma-separate. Benefits: Readability, reusability, recursion support.'
            },
            {
              subtopic: 'Statistical Analysis',
              content: 'STDDEV, VARIANCE: Spread of data. PERCENTILE: Nth percentile value. Correlation: Relationship between variables. Regression: Predict value from other variables. Distributions: Normal, Poisson. Hypothesis testing: Null hypothesis, p-value.'
            },
            {
              subtopic: 'Time Series Analysis',
              content: 'Time-indexed data. Moving average: SIZE window. Trends: Increasing/decreasing pattern. Seasonality: Repeating patterns. Forecasting: Predict future values. SQL: LAG/LEAD for period comparisons. DATE functions: Extract year, month, day.'
            }
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
          explained: [
            {
              subtopic: 'MVC, MVVM, Clean Architecture',
              content: 'MVC: Model (data), View (UI), Controller (logic). MVVM: Model, ViewModel (presentation logic), View. Clean Architecture: Core business → Use cases → Interface adapters → Frameworks. Dependency: Inward, not outward. Benefits: Separation of concerns, testability, maintainability.'
            },
            {
              subtopic: 'RESTful vs GraphQL',
              content: 'REST: Resource-based, CRUD operations, HTTP methods. Stateless, cacheable. GraphQL: Query language for APIs. Client specifies needed data. Reduces over/under fetching. GraphQL complexity: N+1 query problem. Choose: REST simpler, GraphQL flexible.'
            },
            {
              subtopic: 'Monolithic vs Microservices',
              content: 'Monolith: Single codebase, single deployment. Simpler development, harder scaling. Microservices: Independent services, separate databases. Scalability, flexibility, complexity. Trade-off: Development vs operational complexity. Data consistency challenges.'
            },
            {
              subtopic: 'Event-Driven Architecture',
              content: 'Events: Something happened. Producers: Emit events. Consumers: React to events. Pub-Sub: Multiple subscribers to topic. Event sourcing: Store events as single source of truth. Eventual consistency: Changes propagate slowly. Use: Decoupling, real-time updates.'
            },
            {
              subtopic: 'SOLID Principles',
              content: 'Single: One responsibility. Open/Closed: Extend, not modify. Liskov: Substitute subtypes. Interface Segregation: Specific interfaces. Dependency Inversion: Depend on abstractions. Benefits: Maintainability, flexibility, scalability. Apply: Class/module design.'
            }
          ]
        },
        {
          title: 'DevOps & Deployment',
          explained: [
            {
              subtopic: 'Docker Containerization',
              content: 'Container: Isolated environment, includes app and dependencies. Dockerfile: BUILD instructions. Images: Libraries, binaries. Containers: Running instances. Advantages: Consistency, portability, lightweight. Docker Compose: Multi-container applications. Registry: Store/share images.'
            },
            {
              subtopic: 'Kubernetes Orchestration',
              content: 'Kubernetes: Container orchestration. Clusters: Master and worker nodes. Pods: Smallest deployable unit (containers). Services: Network access to pods. Deployments: Manage replica sets. YAML manifests: Define infrastructure. Scaling: Auto-scaling on demand. Self-healing.'
            },
            {
              subtopic: 'CI/CD Pipelines',
              content: 'CI: Continuous Integration. Automate build, test on every commit. CD: Continuous Delivery/Deployment. Automate release. Tools: Jenkins, GitLab CI, GitHub Actions. Stages: Checkout, build, test, deploy. Benefits: Fast feedback, reduced errors, frequent releases.'
            },
            {
              subtopic: 'Cloud Platforms',
              content: 'AWS: EC2 (VMs), S3 (storage), RDS (database), Lambda (serverless). Azure: Similar Microsoft cloud. GCP: Google Cloud. Services: IaaS, PaaS, SaaS. Managed services: Less operational burden. Scaling: Auto-adjust resources. Cost: Pay per use.'
            },
            {
              subtopic: 'Infrastructure as Code',
              content: 'IaC: Define infrastructure in code. Tools: Terraform, CloudFormation, Ansible. Version control: Track changes. Reproducible: Consistent environments. Automation: Deploy with code. Benefits: Scalability, disaster recovery, documentation.'
            }
          ]
        },
        {
          title: 'Performance & Optimization',
          explained: [
            {
              subtopic: 'Caching Strategies',
              content: 'Redis: In-memory cache. Memcached: Distributed memory. Cache busting: Invalidation strategies. TTL: Time-to-live. Patterns: Cache aside, write-through. Frontend: Browser caching. Database: Query result caching. API caching: HTTP caching headers.'
            },
            {
              subtopic: 'Database Query Optimization',
              content: 'Indexes: Speed up queries on indexed columns. Query plans: EXPLAIN, ANALYZE. Avoid: SELECT *, N+1 queries. Joins: Efficient over multiple queries. Aggregation: Denormalization for reporting. Sharding: Distribute data. Replication: Read replicas.'
            },
            {
              subtopic: 'Frontend Optimization',
              content: 'Minification: Remove unnecessary characters. Compression: Gzip CSS, JS. Bundling: Combine files. Code splitting: Load on demand. Lazy loading: Images deferred. CDN: Serve from edge locations. Asset optimization: Images, fonts. Lighthouse: Performance audit tool.'
            },
            {
              subtopic: 'Load Balancing',
              content: 'Round-robin: Distribute requests equally. Weighted: Adjust distribution. Least connections: Route to least busy. Session affinity: Sticky sessions. Health checks: Remove bad instances. Global load balancing: Across regions. Tools: nginx, HAProxy, cloud LB.'
            },
            {
              subtopic: 'Monitoring & Logging',
              content: 'Monitoring: Track metrics (CPU, memory, latency, error rate). Alerting: Notify on thresholds. Logging: Centralized logs (ELK, Splunk). Tracing: Request flow across services. Dashboards: Visualize metrics. Metrics: Prometheus, Grafana. APM: Application Performance Monitoring.'
            }
          ]
        },
        {
          title: 'Security',
          explained: [
            {
              subtopic: 'HTTPS & SSL/TLS',
              content: 'HTTPS: Encrypted HTTP. SSL/TLS: Cryptographic protocols. Certificates: Prove identity. Self-signed: Testing only. CA: Trusted authority issues certificates. Let\'s Encrypt: Free certificates. Handshake: Establish secure connection. Key exchange: Symmetric encryption after handshake.'
            },
            {
              subtopic: 'SQL Injection Prevention',
              content: 'Attack: Modify query via input. Example: "admin" -- bypasses password check. Prevention: Parameterized queries, prepared statements. Input validation: Whitelist. Escaping: Database-specific. ORM: Built-in protection. Never concatenate user input to queries.'
            },
            {
              subtopic: 'XSS Protection',
              content: 'Cross-Site Scripting: Inject JavaScript. Stored: Saved in DB. Reflected: In URL. DOM-based: JavaScript writes to DOM. Prevention: Sanitize output, encode HTML. CSP headers: Restrict script sources. React, Vue: Auto escape by default in templates.'
            },
            {
              subtopic: 'Authentication & Authorization',
              content: 'Authentication: Verify who you are (login). Authorization: What you can do (roles). JWT: Stateless tokens. OAuth: Delegate authentication. Sessions: Server-side storage. Multi-factor (MFA): Extra security layer. Passwords: Hash with bcrypt, salt. API keys: For service-to-service.'
            },
            {
              subtopic: 'API Rate Limiting',
              content: 'Rate limiting: Limit requests per time. Per IP or user. Prevent: Brute force, DDoS. Throttling: Gradual slowdown. Quota: Hard limit. Algorithms: Leaky bucket, token bucket. Tools: nginx, API gateway. Response: 429 Too Many Requests. Reset: Time window.'
            }
          ]
        }
      ]
    }
  };

  if (!categoryData[category]) {
    return (
      <div className="detail-page not-found">
        <h1>Category Not Found</h1>
        <button onClick={() => navigate('/notes-resources')} className="back-btn">
          Go Back
        </button>
      </div>
    );
  }

  const data = categoryData[category];

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="notes-detail-page">
      <button onClick={() => navigate('/notes-resources')} className="back-btn">
        <ArrowLeft size={20} /> Back to Notes
      </button>

      <div className="detail-container">
        {/* Header */}
        <div className="detail-header" style={{ borderColor: data.color }}>
          <span className="icon">{data.icon}</span>
          <h1>{category}</h1>
          <p>Comprehensive explanations and key concepts</p>
        </div>

        {/* Topics */}
        <div className="topics-container">
          {data.topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="topic-card">
              <h2 className="topic-title" style={{ borderLeftColor: data.color }}>
                {topic.title}
              </h2>

              <div className="explanations">
                {topic.explained.map((item, itemIdx) => (
                  <div key={itemIdx} className="explanation-block">
                    <div className="subtitle-header">
                      <h3>{item.subtopic}</h3>
                    </div>

                    <p className="explanation-text">{item.content}</p>

                    <button
                      className={`copy-btn ${copiedIndex === `${topicIdx}-${itemIdx}` ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(item.content, `${topicIdx}-${itemIdx}`)}
                    >
                      {copiedIndex === `${topicIdx}-${itemIdx}` ? (
                        <>
                          <Check size={16} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} /> Copy Text
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Summary */}
        <div className="summary-section">
          <h2>📌 Quick Summary</h2>
          <div className="summary-grid">
            <div className="summary-card">
              <h4>Topics Covered</h4>
              <p>{data.topics.length} main topics with detailed explanations</p>
            </div>
            <div className="summary-card">
              <h4>Total Subtopics</h4>
              <p>{data.topics.reduce((sum, t) => sum + t.explained.length, 0)} key concepts explained</p>
            </div>
            <div className="summary-card">
              <h4>Study Tip</h4>
              <p>Read, copy important notes, and practice regularly for better retention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesDetailPage;

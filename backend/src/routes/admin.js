import express from 'express';
import LibraryQuestion from '../models/LibraryQuestion.js';
import Question from '../models/Question.js';
import { SAMPLE_QUESTIONS, extractKeyPoints } from '../../seedData.js';

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
 * POST /api/admin/seed - Seed database with comprehensive questions
 */
router.post('/seed', verifyAdmin, async (req, res) => {
  try {
    const count = await LibraryQuestion.countDocuments();
    if (count > 0) {
      await LibraryQuestion.deleteMany({}); // Clear existing for fresh seed
    }

    const comprehensiveData = {
      'Full Stack': {
        'HTML': [
          { q: 'What is semantic HTML?', a: 'Using meaningful tags like <header>, <nav>, <article> describe content purpose for accessibility and SEO.' },
          { q: 'Difference between <div> and <span>', a: '<div> is block-level, <span> is inline. Use <div> for layouts, <span> for text styling.' },
          { q: 'What are data attributes?', a: 'Store custom data in HTML elements using data-* syntax. Accessed via element.dataset.attributeName.' },
          { q: 'How to embed images?', a: 'Use <img src="path" alt="description">. Always include alt text for accessibility and SEO.' },
          { q: 'What is the meta viewport tag?', a: '<meta name="viewport" content="width=device-width, initial-scale=1"> Essential for responsive design.' },
          { q: 'Explain HTML forms', a: '<form> contains input, textarea, select. Use POST for sensitive data, GET for queries.' },
          { q: 'What is DOCTYPE?', a: '<!DOCTYPE html> declares HTML version. Must be first line. Tells browser to render in standards mode.' },
          { q: 'Difference between id and class', a: 'id: unique identifier for one element. class: for multiple elements. id has higher CSS specificity.' },
          { q: 'What is accessibility (a11y)?', a: 'Making websites usable for everyone. Use semantic HTML, alt text, proper labels, ARIA attributes.' },
          { q: 'Explain canvas element', a: '<canvas> allows drawing graphics with JavaScript. Used for animations, games, charts.' },
          { q: 'What is iframe?', a: '<iframe src="page.html"></iframe> embeds another HTML document. Used for videos, maps, ads.' },
          { q: 'HTML5 form input types', a: 'text, email, password, number, date, time, range, color, file, checkbox, radio types available.' },
          { q: 'Difference between <strong> and <b>', a: '<strong> semantic importance, <b> visual only. Use <strong> for accessibility.' },
          { q: 'What is the label element?', a: '<label for="id"> associates text with form input. Improves accessibility and clickable area.' },
          { q: 'HTTP methods in forms', a: 'GET: data in URL (visible, limited). POST: data in body (hidden, larger). Use POST for sensitive data.' },
          { q: 'What is HTML validation?', a: 'Built-in form validation: required, type, pattern. Client-side validation reduces server load.' },
          { q: 'Responsive images', a: 'Use srcset with multiple sizes. Use <picture> for art direction. Media queries for responsive design.' },
          { q: 'Difference between <article> and <section>', a: '<article>: independent content. <section>: thematic grouping. <section> more generic.' },
          { q: 'What is time element?', a: '<time datetime="2024-01-15"> provides machine-readable time for search engines and accessibility.' },
          { q: 'Microdata and schema', a: 'itemscope, itemtype, itemprop. Helps search engines understand content structure.' },
          { q: 'Keyboard navigation', a: 'Using tabindex attribute. Tab key moves through focusable elements. Essential for accessibility.' },
          { q: 'HTML5 structural elements', a: '<header>, <nav>, <main>, <article>, <section>, <aside>, <footer> provide semantic meaning.' },
          { q: 'What are void elements?', a: 'Self-closing tags: <img>, <input>, <br>, <hr>, <meta>. Do not have closing tags.' },
          { q: 'Explain main element', a: '<main> wraps primary content. Only one per page. Marks main content area for accessibility.' },
          { q: 'What is figure element?', a: '<figure> wraps image with caption. <figcaption> describes it. Semantic way to group visuals.' }
        ],
        'CSS': [
          { q: 'What is CSS Box Model?', a: 'Content → Padding → Border → Margin. Each layer can be styled independently.' },
          { q: 'Margin vs Padding', a: 'Padding: space INSIDE border. Margin: space OUTSIDE border. Different locations, different uses.' },
          { q: 'CSS specificity', a: 'Inline (1000) > ID (100) > Class (10) > Element (1). Higher specificity wins.' },
          { q: 'Display none vs visibility hidden', a: 'display: none removes from layout. visibility: hidden hides but reserves space.' },
          { q: 'CSS cascade', a: 'Later rules override earlier with same specificity. Top to bottom priority.' },
          { q: 'What is Flexbox?', a: 'Layout model for 1D (row/column). flex-direction, justify-content, align-items properties.' },
          { q: 'Explain CSS Grid', a: '2D layout system. grid-template rows/columns. Complex layouts easier than Flexbox.' },
          { q: 'CSS positioning types', a: 'static (default), relative (offset), absolute (removed from flow), fixed, sticky (hybrid).' },
          { q: 'What are media queries?', a: '@media (max-width: 768px) { }. Responsive design based on device properties.' },
          { q: 'Pseudo-classes vs pseudo-elements', a: 'Pseudo-classes (:hover, :focus) select element states. Pseudo-elements (::before, ::after) create virtual elements.' },
          { q: 'CSS transitions', a: 'Smooth animation: transition: property duration timing delay. Example: width 0.3s ease-in-out.' },
          { q: 'What are animations?', a: '@keyframes define steps. animation property applies. More control than transitions.' },
          { q: 'z-index property', a: 'Controls stacking order of positioned elements. Higher on top. Works only with positioned elements.' },
          { q: 'Relative vs absolute positioning', a: 'relative: offset from normal, reserves space. absolute: relative to parent, removed from flow.' },
          { q: 'CSS custom properties', a: '--color-primary: blue; use var(--color-primary). Define once, reuse everywhere.' },
          { q: 'CSS inheritance', a: 'Some properties inherit (color, font). Others do not (margin, border). Override with inherit keyword.' },
          { q: 'Stacking context', a: 'Creates layering hierarchy. z-index only works within same stacking context.' },
          { q: 'rem vs em units', a: 'em: relative to element font-size. rem: relative to root font-size. rem more predictable.' },
          { q: 'What are gradients?', a: 'linear-gradient, radial-gradient: smooth color transitions between colors.' },
          { q: 'CSS preprocessors', a: 'SASS/LESS extend CSS with variables, nesting, functions. Compile to CSS.' },
          { q: 'Float vs Flexbox', a: 'float: older method, complex clearing. flexbox: modern, simpler. Use flexbox.' },
          { q: 'CSS counters', a: 'Automatic numbering: counter-reset, counter-increment. Custom lists without numbers.' },
          { q: 'Explain transforms', a: 'rotate, scale, skew, translate: 2D and 3D. Does not affect layout.' },
          { q: 'box-sizing property', a: 'border-box: includes padding/border in width. content-box: does not. border-box easier.' },
          { q: 'Overflow property', a: 'visible (default), hidden, scroll, auto. Controls overflow content, scrollable containers.' }
        ],
        'JavaScript': [
          { q: 'var vs let vs const', a: 'var: function-scoped, hoisted. let/const: block-scoped. const prevents reassignment.' },
          { q: 'What are closures?', a: 'Function accessing outer scope variables after function returns. Used for data privacy.' },
          { q: 'Event delegation', a: 'Attach listener to parent, events bubble up. Efficient for dynamic elements.' },
          { q: 'Async code patterns', a: 'Callbacks, promises, async/await. Async/await most readable and modern.' },
          { q: 'What are promises?', a: 'Pending → Fulfilled/Rejected. then, catch, finally methods. Async operation representation.' },
          { q: 'Async/await syntax', a: 'async function returns promise. await pauses until promise settles. Try/catch for errors.' },
          { q: 'Event loop explanation', a: 'Call stack → callback queue → event loop. Explains asynchronous behavior in JavaScript.' },
          { q: '== vs ===', a: '==: loose equality with coercion. ===: strict equality. Always use strict (===).' },
          { q: 'What is this keyword?', a: 'Refers to execution context. Value depends on function call method.' },
          { q: 'Prototypal inheritance', a: 'Objects inherit from prototypes. Prototype chain for property lookup.' },
          { q: 'Destructuring in JavaScript', a: 'Extract values: const {x} = obj; const [a, b] = arr. Cleaner syntax.' },
          { q: 'map vs filter vs reduce', a: 'map: transform. filter: select. reduce: accumulate to single value.' },
          { q: 'Arrow functions', a: '=> syntax. No own this. No arguments object. Great for callbacks.' },
          { q: 'call vs apply vs bind', a: 'call(this, arg1). apply(this, [args]). bind(this) returns new function.' },
          { q: 'Hoisting in JavaScript', a: 'var hoisted with undefined. let/const without. Functions fully hoisted.' },
          { q: 'null vs undefined', a: 'undefined: uninitialized. null: intentional absence. undefined == null but !== null.' },
          { q: 'Template literals', a: 'Backticks allow interpolation: `Hello ${name}`. Multi-line strings supported.' },
          { q: 'Spread operator', a: '... expands iterable. {...obj} copies object. [...arr] copies array. Merge objects/arrays.' },
          { q: 'Higher-order functions', a: 'Function taking/returning functions. map, filter, setTimeout examples.' },
          { q: 'forEach vs map', a: 'forEach returns undefined. map returns new array. Use map to transform data.' },
          { q: 'What is AJAX?', a: 'Asynchronous HTTP requests without page reload. Use fetch, XMLHttpRequest, axios.' },
          { q: 'Fetch API usage', a: 'fetch(url).then(res => res.json()). Returns promise. Modern XMLHttpRequest replacement.' },
          { q: 'Web storage options', a: 'localStorage: persistent. sessionStorage: session-only. Store key-value pairs.' },
          { q: 'slice vs splice', a: 'slice: non-destructive. splice: modifies original array. Slice for copying.' },
          { q: 'Event bubbling vs capturing', a: 'Bubbling: inner to outer. Capturing: outer to inner. addEventListener 3rd param controls.' }
        ]
      },
      'Frontend': {
        'React': [
          { q: 'What is React?', a: 'Library for building UIs with reusable components. Virtual DOM for performance optimization.' },
          { q: 'Functional vs class components', a: 'Functional: simpler, use hooks. Class: use this, lifecycle. Functional is modern.' },
          { q: 'useState hook', a: 'const [state, setState] = useState(initial). Manage functional component state.' },
          { q: 'useEffect hook', a: 'Perform side effects. Runs after render. Dependency array controls execution.' },
          { q: 'Props vs state', a: 'Props: from parent, immutable. State: component manages, mutable, causes re-render.' },
          { q: 'Key prop in lists', a: 'Unique identifier. Helps React track changes. Critical for performance and state.' },
          { q: 'Controlled components', a: 'Component state manages form values. Predictable, easier to validate.' },
          { q: 'Uncontrolled components', a: 'DOM manages form data. Use useRef to access values.' },
          { q: 'Context API', a: 'Share state without prop drilling. createContext, Provider, useContext.' },
          { q: 'Custom hooks', a: 'Reusable logic functions starting with "use". Extract component logic.' },
          { q: 'React.memo optimization', a: 'Prevent re-renders of functional components when props unchanged.' },
          { q: 'useMemo hook', a: 'Memoize computed values. Prevents unnecessary recalculations on every render.' },
          { q: 'useCallback hook', a: 'Memoize function callbacks. Prevents child re-renders unnecessarily.' },
          { q: 'Explain useReducer', a: 'Complex state management. Reducer function takes state/action. Better than useState for logic.' },
          { q: 'React fragments', a: '<></> or <React.Fragment>. Return multiple elements without wrapper div.' },
          { q: 'Conditional rendering', a: 'if/else, ternary, &&, switch. Show/hide UI based on state.' },
          { q: 'Higher-order components (HOC)', a: 'Function taking component, returning enhanced component. Reuse logic.' },
          { q: 'Render props pattern', a: 'Component receives function as prop. Function receives data. Flexible composition.' },
          { q: 'What are Portals?', a: 'ReactDOM.createPortal(component, element). Render outside parent hierarchy.' },
          { q: 'Lazy loading in React', a: 'React.lazy() with Suspense. Load component when needed. Improves performance.' },
          { q: 'Error boundaries', a: 'Catch child errors. componentDidCatch method. Prevents entire app crash.' },
          { q: 'React Strict Mode', a: '<React.StrictMode> wrapper. Development only. Highlights potential problems.' },
          { q: 'useRef hook', a: 'Returns mutable ref object. Persists across renders. Access DOM, store mutable values.' },
          { q: 'JSX syntax', a: 'JavaScript XML. Looks like HTML but JavaScript. Babel transpiles to React.createElement().' },
          { q: 'Virtual DOM explanation', a: 'In-memory UI representation. Diffing algorithm. Only changed parts updated in real DOM.' }
        ],
        'TypeScript': [
          { q: 'What is TypeScript?', a: 'Superset of JavaScript with static typing. Compiles to JavaScript. Catches errors early.' },
          { q: 'Basic types in TypeScript', a: 'number, string, boolean, any, unknown, never, void, array, tuple, enum.' },
          { q: 'Interfaces in TypeScript', a: 'Define object shape. Properties, methods. Used for type checking.' },
          { q: 'Types vs Interfaces', a: 'Both define shapes. Types: unions, primitives. Interfaces: extensible, declaration merging.' },
          { q: 'Generics in TypeScript', a: 'Generic types: <T>. Used in functions, classes, interfaces. Flexible, type-safe.' },
          { q: 'Enums in TypeScript', a: 'Named constants. numeric or string-based. Useful for fixed set of values.' },
          { q: 'Union types', a: 'type A = string | number. Variable can be one of types.' },
          { q: 'Intersection types', a: 'type C = A & B. Combines all properties from both types.' },
          { q: 'Type narrowing', a: 'Refining variable type using typeof, instanceof, type guards.' },
          { q: 'Decorators in TypeScript', a: 'Functions modifying class/property behavior. @decorator syntax. Experimental feature.' },
          { q: 'Modules in TypeScript', a: 'import/export for code organization. Namespace for grouping.' },
          { q: 'Abstract classes', a: 'Cannot instantiate directly. Base class for others. declare abstract methods.' },
          { q: 'Access modifiers', a: 'public (default), private, protected. Control property/method visibility.' },
          { q: 'Readonly properties', a: 'readonly keyword. Cannot modify after initialization. Immutable by default.' },
          { q: 'TypeScript utility types', a: 'Partial, Required, Readonly, Record, Pick, Omit, Extract, Exclude.' }
        ]
      },
      'Backend': {
        'Node.js': [
          { q: 'What is Node.js?', a: 'JavaScript runtime for server-side. Event-driven, asynchronous, great for I/O operations.' },
          { q: 'Event loop in Node.js', a: 'Checks timers, pending callbacks, I/O operations in cycles.' },
          { q: 'Modules in Node.js', a: 'Reusable code blocks. require/module.exports or import/export.' },
          { q: 'require vs import', a: 'require: CommonJS, synchronous. import: ES6, asynchronous. import is modern.' },
          { q: 'What is NPM?', a: 'Node Package Manager. Repository of packages. npm install for dependencies.' },
          { q: 'package.json file', a: 'Project metadata, dependencies, version, scripts. npm init to create.' },
          { q: 'Callbacks in Node.js', a: 'Function passed as argument called later. Can lead to callback hell.' },
          { q: 'What is Express.js?', a: 'Popular Node.js framework. Routing, middleware, server creation simplified.' },
          { q: 'Middleware in Express', a: 'Functions with access to request, response, next. Execute in order.' },
          { q: 'REST API basics', a: 'GET (read), POST (create), PUT (update), DELETE (delete), PATCH (partial update).' },
          { q: 'PUT vs PATCH', a: 'PUT: replace entire resource. PATCH: partial update of resource.' },
          { q: 'JWT authentication', a: 'JSON Web Tokens: Header.Payload.Signature. Stateless token authentication.' },
          { q: 'What is CORS?', a: 'Cross-Origin Resource Sharing. Allows requests from different origins.' },
          { q: 'Streams in Node.js', a: 'Handle data in chunks. Efficient for large files. fs.createReadStream().' },
          { q: 'Error handling in Express', a: 'Middleware with 4 params (err, req, res, next). Async/await with try/catch.' },
          { q: 'HTTP status codes', a: '2xx success, 3xx redirect, 4xx client error, 5xx server error.' },
          { q: 'What is logging?', a: 'Record application events. Winston, Morgan popular. debug, info, warn, error levels.' },
          { q: 'Environment variables', a: 'Store config: .env file with dotenv package. process.env to access.' },
          { q: 'Async patterns', a: 'Callbacks, promises, async/await. async/await most readable.' },
          { q: 'File operations', a: 'fs.readFile() async, fs.readFileSync() sync. Async for performance.' },
          { q: 'Express routing', a: 'app.get, app.post, app.put, app.delete. Route to handlers.' },
          { q: 'Request body parsing', a: 'app.use(express.json()) for JSON, express.urlencoded() for forms.' },
          { q: 'Cookie handling', a: 'Send set-cookie header. Parse cookies with cookie-parser middleware.' },
          { q: 'Session management', a: 'Store user state: sessions, JWT, localStorage. Maintain authentication.' },
          { q: 'Database connection pooling', a: 'Reuse connections. Improve performance. Better resource management.' }
        ],
        'MongoDB': [
          { q: 'What is MongoDB?', a: 'NoSQL document database. Flexible schema. Store data as BSON (Binary JSON).' },
          { q: 'Comparing SQL and NoSQL', a: 'SQL: structured, ACID. NoSQL: flexible, eventual consistency. Choose based on needs.' },
          { q: 'BSON in MongoDB', a: 'Binary JSON. Extends JSON with binary types. ObjectId, Date, Binary, Code.' },
          { q: 'MongoDB collections', a: 'Equivalent to SQL tables. Contain documents. Schema-less but can enforce.' },
          { q: 'MongoDB documents', a: 'Equivalent to SQL rows. JSON-like structure. Have _id field (unique).' },
          { q: 'Indexing in MongoDB', a: 'Faster queries. db.collection.createIndex(). Single field, compound, text indexes.' },
          { q: 'MongoDB aggregation pipeline', a: '$match, $group, $project, $lookup. Complex data processing.' },
          { q: 'ObjectId in MongoDB', a: 'Unique identifier for documents. 12-byte value: timestamp + machine + counter.' },
          { q: 'Mongoose library', a: 'MongoDB object modeling. Schemas, validation, hooks. Easier MongoDB usage.' },
          { q: 'Mongoose schemas', a: 'Define document structure. field names, types, validation. Schema → Model.' },
          { q: 'Query operators', a: '$eq, $ne, $gt, $gte, $lt, $lte, $in, $nin, $and, $or.' },
          { q: 'MongoDB transactions', a: 'ACID transactions across documents/collections. Multi-document transactions.' },
          { q: 'Replication in MongoDB', a: 'Replica sets for redundancy. Primary writes, secondary reads. High availability.' },
          { q: 'Sharding in MongoDB', a: 'Horizontal scaling. Partition data across multiple servers based on shard key.' },
          { q: 'Backup and restore', a: 'mongodump creates backup. mongorestore restores data. Atlas has automatic backups.' }
        ]
      },
      'Full Stack': {
        'System Design': [
          { q: 'What is scalability?', a: 'System able to handle growth. Horizontal (add servers) or vertical (better hardware) scaling.' },
          { q: 'Load balancing', a: 'Distribute traffic across servers. Round-robin, least connection, IP hash algorithms.' },
          { q: 'Caching strategies', a: 'Cache frequently accessed data. Redis, Memcached. Improve response times.' },
          { q: 'Database sharding', a: 'Partition data across multiple databases. Horizontal scaling, speed improvement.' },
          { q: 'Microservices architecture', a: 'Small, independent services. Own database, communication via API. Easy scaling.' },
          { q: 'API design best practices', a: 'Versioning, pagination, error handling, documentation. RESTful conventions.' },
          { q: 'Security best practices', a: 'HTTPS, authentication, authorization, input validation, SQL injection prevention.' },
          { q: 'Performance optimization', a: 'Caching, CDN, minification, lazy loading, database indexing, query optimization.' },
          { q: 'Testing strategies', a: 'Unit, integration, end-to-end tests. Automated testing, coverage measurement.' },
          { q: 'Deployment strategies', a: 'Blue-green, canary, rolling updates. Zero-downtime deployment, rollback capability.' },
          { q: 'Monitoring and logging', a: 'Track application health. Log errors, API responses. Alert on issues.' },
          { q: 'Rate limiting', a: 'Limit requests per time period. Prevent abuse, protect from DDoS attacks.' },
          { q: 'Authentication methods', a: 'username/password, OAuth, JWT, session-based. Choose based on security needs.' },
          { q: 'Authorization systems', a: 'Role-based (RBAC), attribute-based (ABAC). Control resource access.' },
          { q: 'API pagination', a: 'Limit results: limit, offset or cursor-based. Improve performance with large datasets.' },
          { q: 'Database optimization', a: 'Indexing, query optimization, denormalization. Faster queries, reduced load.' },
          { q: 'CDN usage', a: 'Content Delivery Network. Cache static assets globally. Faster downloads, reduced latency.' },
          { q: 'Message queues', a: 'Async task processing: RabbitMQ, Apache Kafka. Decouple services, improve reliability.' },
          { q: 'Service discovery', a: 'Services find other services dynamically. Consul, Eureka. Handle service location.' },
          { q: 'API versioning', a: 'Maintain backward compatibility. URL versioning (/v1, /v2) or header-based. Plan ahead.' },
          { q: 'Rate limiting strategies', a: 'Token bucket, sliding window, fixed window. Different algorithms for different needs.' },
          { q: 'Vertical scaling limits', a: 'Single machine has physical limits. Expensive, harder to scale beyond limits.' },
          { q: 'Horizontal scaling benefits', a: 'Add more machines incrementally. Better resilience, easier to scale.' },
          { q: 'Single point of failure', a: 'One critical component failure breaks system. Use redundancy, failover mechanisms.' },
          { q: 'Fault tolerance design', a: 'System continues operating despite failures. Replication, failover, redundancy.' }
        ],
        'DevOps': [
          { q: 'What is DevOps?', a: 'Combine development and operations. CI/CD, automation, collaboration. Faster releases.' },
          { q: 'Docker basics', a: 'Containerization: package app with dependencies. Dockerfile defines image. docker run executes.' },
          { q: 'Docker containers vs VMs', a: 'Containers: share OS kernel, lightweight. VMs: full OS, heavier but isolated.' },
          { q: 'Docker images', a: 'Blueprint for containers. Layers: base, changes. docker build creates image from Dockerfile.' },
          { q: 'Docker registry', a: 'Repository of images. Docker Hub public, private registries available.' },
          { q: 'Docker networks', a: 'bridge (isolated), host (host network), overlay (swarm). Container communication.' },
          { q: 'Docker volumes', a: 'Persistent storage. Named volumes or bind mounts. Survive container deletion.' },
          { q: 'Docker Compose', a: 'Multi-container orchestration. docker-compose.yml defines services, networks, volumes.' },
          { q: 'Kubernetes basics', a: 'Container orchestration. Manage deployment, scaling, networking of containers.' },
          { q: 'Kubernetes pods', a: 'Smallest unit. One or more containers. Shared storage, networking.' },
          { q: 'Kubernetes services', a: 'Expose pod functionality. ClusterIP, NodePort, LoadBalancer types.' },
          { q: 'CI/CD pipelines', a: 'Continuous Integration: test on commit. Continuous Deployment: auto-deploy on success.' },
          { q: 'Git workflows', a: 'Main, develop, feature branches. Pull requests for code review. Merge strategies.' },
          { q: 'Infrastructure as Code', a: 'Terraform, CloudFormation define infrastructure. Version controlled, reproducible.' },
          { q: 'Cloud platforms', a: 'AWS, GCP, Azure. Compute, storage, databases, networking services.' },
          { q: 'Container registry', a: 'Docker Hub, AWS ECR, Google GCR, Azure ACR. Store and manage container images.' },
          { q: 'Deployment pipeline', a: 'Build → Test → Staging → Production. Automated stages, quality gates.' },
          { q: 'Rollback strategies', a: 'Revert to previous version on failure. Blue-green enables instant rollback.' },
          { q: 'Monitoring tools', a: 'Prometheus, Grafana, ELK stack. Real-time metrics, dashboards, alerts.' },
          { q: 'Log aggregation', a: 'Centralized logging from multiple services. ELK, Splunk, CloudWatch.' },
          { q: 'Health checks', a: 'Regular endpoint checks. Auto-restart unhealthy containers/servers.' },
          { q: 'Secrets management', a: 'Store sensitive data: passwords, API keys. HashiCorp Vault, AWS Secrets Manager.' },
          { q: 'Configuration management', a: 'Ansible, Chef, Puppet. Version-controlled, repeatable infrastructure changes.' },
          { q: 'IaC benefits', a: 'Reproducibility, version control, faster provisioning, disaster recovery.' },
          { q: 'Zero-downtime deployment', a: 'Deploy without service interruption. Load balancing, health checks, rolling updates.' }
        ]
      },
      'DSA': {
        'Algorithms': [
          { q: 'What is Big O notation?', a: 'Describes algorithm time/space complexity. O(1), O(n), O(n²), O(log n), O(n log n) common.' },
          { q: 'Time vs space complexity', a: 'Time: how many operations. Space: how much memory. Both important for optimization.' },
          { q: 'Sorting algorithms', a: 'Bubble, selection, insertion, merge, quick, heap. Different trade-offs: time, space, stability.' },
          { q: 'Merge sort explanation', a: 'Divide and conquer. O(n log n) time. Stable, predictable. Requires extra space.' },
          { q: 'Quick sort algorithm', a: 'Partition-based. Average O(n log n), worst O(n²). In-place, fast in practice.' },
          { q: 'Binary search', a: 'O(log n) on sorted array. Compare middle element,divide search space in half.' },
          { q: 'Linear search', a: 'O(n) complexity. Simple but slow for large datasets. Used when unsorted.' },
          { q: 'DFS vs BFS', a: 'DFS: depth-first, uses stack/recursion. BFS: breadth-first, uses queue. Different use cases.' },
          { q: 'Recursion basics', a: 'Function calling itself. Base case prevents infinite loop. Common in tree/graph algorithms.' },
          { q: 'Dynamic programming', a: 'Solve overlapping subproblems. Memoization (top-down) or tabulation (bottom-up).' },
          { q: 'Greedy algorithms', a: 'Local optimal choice at each step. Works for some problems: coin change with certain denominations.' },
          { q: 'Backtracking algorithm', a: 'Explore all possibilities, abandon unpromising branches. N-queens, sudoku solver.' },
          { q: 'Dijkstra algorithm', a: 'Shortest path in weighted graph. Greedy approach, works with non-negative weights.' },
          { q: 'Floyd-Warshall algorithm', a: 'All-pairs shortest path. O(n³) time. Works with negative weights.' },
          { q: 'Topological sort', a: 'Linear ordering of DAG vertices. For dependency resolution, task scheduling.' }
        ],
        'Data Structures': [
          { q: 'What is array?', a: 'Ordered collection of elements. Fixed size, indexed access O(1), insertion O(n).' },
          { q: 'What is linked list?', a: 'Sequential elements with pointers. Dynamic size, O(1) insertion, O(n) access.' },
          { q: 'Stack data structure', a: 'LIFO (Last In First Out). Push, pop, peek. Used for recursion, undo, expression evaluation.' },
          { q: 'Queue data structure', a: 'FIFO (First In First Out). Enqueue, dequeue. Used for BFS, scheduling, buffering.' },
          { q: 'Binary search tree', a: 'Ordered tree. Left < parent < right. O(log n) search average, O(n) worst.' },
          { q: 'Hash table/map', a: 'Key-value pairs. O(1) average lookup. Collisions handled by chaining or probing.' },
          { q: 'Heap data structure', a: 'Specialized tree. Min-heap, max-heap. Used for priority queues, heapsort.' },
          { q: 'Graph representation', a: 'Adjacency matrix or list. Matrix: O(n²) space, fast lookup. List: O(n+m) space.' },
          { q: 'Trie data structure', a: 'Prefix tree for strings. Efficient string search, autocomplete. O(m) per lookup.' },
          { q: 'Union-Find (Disjoint Set)', a: 'Track connectivity, connected components. Union by rank, path compression optimizations.' },
          { q: 'Set data structure', a: 'Unique elements. No duplicates. Hash-based or tree-based implementations.' },
          { q: 'String operations', a: 'Substring search (KMP, Rabin-Karp), pattern matching, string manipulation.' },
          { q: 'Tree traversals', a: 'Inorder, preorder, postorder (DFS). Level-order (BFS). Different order outputs.' },
          { q: 'Balanced trees', a: 'AVL, Red-Black trees. Self-balancing, O(log n) operations. Complex but predictable performance.' },
          { q: 'Segment tree', a: 'Range query data structure. Build O(n), query O(log n), update O(log n).' }
        ]
      },
      'Java': {
        'Collections': [
          { q: 'What are Java collections?', a: 'Framework of interfaces and classes for data structures. ArrayList, HashMap, HashSet.' },
          { q: 'List interface', a: 'Ordered collection. ArrayList (dynamic array), LinkedList (doubly linked). Allows duplicates.' },
          { q: 'Set interface', a: 'No duplicates. HashSet (unordered), TreeSet (sorted), LinkedHashSet (order preserved).' },
          { q: 'Map interface', a: 'Key-value pairs. HashMap (unordered), TreeMap (sorted), LinkedHashMap (order preserved).' },
          { q: 'Iterator vs forEach', a: 'Iterator: explicit control, can remove during iteration. forEach: cleaner syntax, cannot modify.' },
          { q: 'Comparable vs Comparator', a: 'Comparable: natural order, implements compareTo(). Comparator: custom order, separate class.' },
          { q: 'HashMap collisions', a: 'Multiple keys hash to same value. Separate chaining (linked list) or open addressing.' },
          { q: 'ArrayList vs LinkedList', a: 'ArrayList: O(1) access, O(n) insertion. LinkedList: O(n) access, O(1) insertion.' },
          { q: 'Thread-safe collections', a: 'Vector (legacy), ConcurrentHashMap, Collections.synchronizedList(). For multi-threaded access.' },
          { q: 'Stream API', a: 'Functional programming style. filter, map, reduce operations on collections. Lazy evaluation.' },
          { q: 'Lambda expressions', a: '(args) -> expression syntax. Define anonymous functions. Used with functional interfaces.' },
          { q: 'Queue interface', a: 'FIFO operations. PriorityQueue (sorted), Deque (double-ended). add, remove, poll, peek.' },
          { q: 'Collection sorting', a: 'Collections.sort() or stream.sorted(). Custom Comparator or natural order.' },
          { q: 'Equals and hashCode', a: 'Override both for collections. hashCode() consistent with equals(). Critical for HashMap, HashSet.' },
          { q: 'Unmodifiable collections', a: 'Collections.unmodifiableList(), unmodifiableMap(). Throws UnsupportedOperationException on modification.' }
        ],
        'Multithreading': [
          { q: 'What is a thread?', a: 'Lightweight process. Shares memory, concurrent execution. reduce latency, improve responsiveness.' },
          { q: 'Creating threads', a: 'Extend Thread or implement Runnable. start() calls run(). Preferred: implement Runnable.' },
          { q: 'Thread lifecycle', a: 'New → Runnable → Running → Blocked → Terminated. Managed by JVM scheduler.' },
          { q: 'Synchronization', a: 'synchronized keyword. Ensures only one thread accesses critical section. Prevents race conditions.' },
          { q: 'Volatile keyword', a: 'Ensures visibility of changes across threads. No caching, always read from memory.' },
          { q: 'Thread communication', a: 'wait(), notify(), notifyAll() for coordination. Object-level locks.' },
          { q: 'Deadlock prevention', a: 'Acquire locks in order, timeout on waits, use tryLock(). Avoid circular dependencies.' },
          { q: 'Executor framework', a: 'Manage thread pools efficiently. ExecutorService with fixed/cached/scheduled pools.' },
          { q: 'Callable and Future', a: 'Callable: returns value, throws checked exceptions. Future: get result, isDone(), cancel().' },
          { q: 'ConcurrentModificationException', a: 'Modifying collection while iterating. Use Iterator, concurrent collections, or copy.' },
          { q: 'ThreadPool best practices', a: 'Appropriate size based on workload. Monitor queue, thread count, rejection policy.' },
          { q: 'Lock interface', a: 'java.util.concurrent.locks. More flexible than synchronized. tryLock, timeout, multiple conditions.' },
          { q: 'ReentrantLock', a: 'Re-entrant lock implementation. Same thread can acquire multiple times. Supports fairness.' },
          { q: 'Atomic classes', a: 'AtomicInteger, AtomicLong. Atomic operations without synchronization. Lower contention.' },
          { q: 'CountDownLatch', a: 'Synchronization aid. Threads wait for count to reach zero. One-time use.' }
        ]
      },
      'Python': {
        'Basics': [
          { q: 'Python data types', a: 'int, float, str, bool, list, tuple, dict, set. Dynamic typing, flexible.' },
          { q: 'List vs Tuple', a: 'List: mutable (modify after creation). Tuple: immutable. Use tuple for fixed data.' },
          { q: 'Dictionary operations', a: 'Key-value pairs. d[key], d.get(key), d.keys(), d.values(), d.items().' },
          { q: 'String operations', a: 'Immutable. Concatenation, slicing, formatting with f-strings. Common methods: split, join, replace.' },
          { q: 'List comprehension', a: '[x for x in iterable if condition]. Concise way to create lists from other iterables.' },
          { q: 'Lambda functions', a: 'lambda args: expression. Anonymous functions. Used with map, filter, sorted.' },
          { q: 'Map, filter, reduce', a: 'map: apply function to each element. filter: select elements. reduce: accumulate.' },
          { q: '*args and **kwargs', a: '*args: variable positional arguments (tuple). **kwargs: variable keyword arguments (dict).' },
          { q: 'Python decorators', a: '@functools wraps function. Modify behavior. Common: @property, @staticmethod, @classmethod.' },
          { q: 'Context managers', a: 'with statement. Ensure resource cleanup. __enter__ and __exit__ methods.' },
          { q: 'Generators and yield', a: 'Generator function yields values lazily. Memory efficient for large datasets.' },
          { q: 'Exception handling', a: 'try/except/finally/else. Catch specific exceptions, custom exceptions, ensure cleanup.' },
          { q: 'Module and package', a: 'Module: Python file. Package: directory with __init__.py. Organize code into namespaces.' },
          { q: 'Virtual environment', a: 'Isolated Python environment. virtualenv, venv. Install packages per project, avoid conflicts.' },
          { q: 'PEP 8 style guide', a: '4-space indentation, lowercase with underscores, max 79 characters per line. Python conventions.' }
        ]
      }
    }
    };

    let totalAdded = 0;
    for (const [course, topics] of Object.entries(comprehensiveData)) {
      for (const [topic, questions] of Object.entries(topics)) {
        const questionsToInsert = questions.map((item, index) => ({
          course,
          topic,
          question: item.q,
          answer: item.a,
          difficulty: ['Easy', 'Medium', 'Hard'][index % 3],
          tags: [topic, course, (['Easy', 'Medium', 'Hard'][index % 3]).toLowerCase()],
          isImportant: Math.random() < 0.2,
          views: 0,
          keyPoints: item.a.split('. ').slice(0, 3).map(k => k.trim()).filter(k => k.length > 10),
        }));
        
        await LibraryQuestion.insertMany(questionsToInsert);
        totalAdded += questionsToInsert.length;
      }
    }

    res.json({
      success: true,
      message: `Successfully seeded ${totalAdded} comprehensive questions!`,
      count: totalAdded
    });
  } catch (error) {
    console.error('Comprehensive seed error:', error);
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

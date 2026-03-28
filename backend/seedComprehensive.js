import mongoose from 'mongoose';
import LibraryQuestion from './src/models/LibraryQuestion.js';
import dotenv from 'dotenv';

dotenv.config();

const COMPREHENSIVE_QUESTIONS = {
  'Full Stack': {
    'HTML': {
      questions: [
        { q: 'What is semantic HTML?', a: 'Using meaningful tags like <header>, <nav>, <article>, <section> that describe content purpose for better accessibility and SEO.' },
        { q: 'Difference between <div> and <span>', a: '<div> is block-level (full width), <span> is inline. Use <div> for layouts, <span> for inline text styling.' },
        { q: 'What are data attributes?', a: 'Store custom data in HTML elements using data-* syntax. Accessed in JS via element.dataset.attributeName.' },
        { q: 'How to embed images?', a: 'Use <img src="path" alt="description">. Always include alt text for accessibility and SEO.' },
        { q: 'What is the meta viewport tag?', a: '<meta name="viewport" content="width=device-width, initial-scale=1"> - Essential for responsive design on mobile.' },
        { q: 'Explain HTML forms', a: '<form> contains <input>, <textarea>, <select>, <button>. Use method="POST" for sensitive data, GET for queries.' },
        { q: 'What is DOCTYPE?', a: '<!DOCTYPE html> declares HTML version. Must be first line. Tells browser to render in standards mode.' },
        { q: 'Difference between id and class', a: 'id: unique identifier for one element. class: for multiple elements. id has higher specificity in CSS.' },
        { q: 'What is accessibility (a11y)?', a: 'Making websites usable for everyone including disabled users. Use semantic HTML, alt text, proper labels, ARIA.' },
        { q: 'Explain canvas element', a: '<canvas> allows drawing graphics with JavaScript. Used for animations, games, charts. Requires JS to draw.' },
        { q: 'What is iframe?', a: '<iframe src="page.html"></iframe> embeds another HTML document. Used for embedding videos, maps, ads.' },
        { q: 'HTML5 form input types', a: 'text, email, password, number, date, time, range, color, file, submit, checkbox, radio, url, tel, search.' },
        { q: 'Difference between <strong> and <b>', a: '<strong> indicates semantic importance (screen readers emphasize). <b> is visual only. Use <strong>.' },
        { q: 'What is the label element?', a: '<label for="id"> associates text with form input. Improves accessibility and clickable area. Best practice.' },
        { q: 'Explain HTTP methods in forms', a: 'GET: sends data in URL (visible, limited size). POST: sends in body (hidden, larger). Use POST for sensitive data.' },
        { q: 'What is HTML validation?', a: 'Built-in form validation: required, type, pattern. Reduces server load, improves UX with client-side checks.' },
        { q: 'How to create responsive images?', a: 'Use srcset attribute with multiple image sizes. Use <picture> for art direction. Media queries for responsive.' },
        { q: 'Difference between <article> and <section>', a: '<article>: independent, reusable content block. <section>: thematic grouping. <section> more generic.' },
        { q: 'What is the time element?', a: '<time datetime="2024-01-15">January 15</time>. Provides machine-readable time for search engines and accessibility.' },
        { q: 'Explain microdata and schema', a: 'microdata adds semantic info: itemscope, itemtype, itemprop. Helps search engines understand content structure.' },
        { q: 'What is keyboard navigation?', a: 'Using tabindex attribute and semantic elements. Tab key moves through focusable elements in order. Essential for accessibility.' },
        { q: 'HTML5 structural elements', a: '<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>. Provide semantic meaning to document structure.' },
        { q: 'What are void elements?', a: 'Self-closing tags: <img>, <input>, <br>, <hr>, <meta>. Don\'t have closing tags.' },
        { q: 'Explain the main element', a: '<main> wraps primary content. Only one per page. Improves accessibility by marking main content area.' },
        { q: 'What is the figure element?', a: '<figure> wraps image/diagram with caption. <figcaption> describes it. Semantic way to group visuals.' },
        { q: 'How to create navigation?', a: '<nav> contains navigation links. Use <ul> and <li> for semantic list. Improves accessibility.' },
        { q: 'What is the details element?', a: '<details><summary>Click</summary>Content</details>. Creates expandable/collapsible content without JavaScript.' },
        { q: 'Explain the progress element', a: '<progress value="70" max="100"></progress>. Shows progress bar visually. Semantic for progress indication.' },
        { q: 'What is the output element?', a: '<output></output> displays calculation/form result. Used with <input>. Semantic for output values.' },
        { q: 'How to add comments in HTML?', a: '<!-- This is a comment -->. Not visible to users. Use for notes, debugging.' }
      ]
    },
    'CSS': {
      questions: [
        { q: 'What is CSS Box Model?', a: 'Content → Padding → Border → Margin. Each layer can be styled. Controls element spacing.' },
        { q: 'Margin vs Padding difference', a: 'Padding: space INSIDE border. Margin: space OUTSIDE border. Both create space but different locations.' },
        { q: 'What is CSS specificity?', a: 'Determines rule priority: Inline (1000) > ID (100) > Class (10) > Element (1). Higher specificity wins.' },
        { q: 'Display none vs visibility hidden', a: 'display: none removes from layout. visibility: hidden hides but reserves space. Different effects.' },
        { q: 'Explain CSS cascade', a: 'Later rules override earlier with same specificity. Browser defaults < Author styles < Inline. Top to bottom.' },
        { q: 'What is Flexbox?', a: 'Layout model for 1D (row/column). Properties: flex-direction, justify-content, align-items. Great for components.' },
        { q: 'Explain CSS Grid', a: '2D layout system. Define grid-template rows/columns. grid-column, grid-row for placement. Complex layouts.' },
        { q: 'CSS positioning types', a: 'static (default), relative (offset), absolute (removed from flow), fixed (viewport), sticky (hybrid).' },
        { q: 'What are media queries?', a: '@media (max-width: 768px) { }. Responsive design technique. Apply styles based on device properties.' },
        { q: 'Pseudo-classes vs pseudo-elements', a: 'Pseudo-classes (:hover, :focus) select elements in state. Pseudo-elements (::before, ::after) create virtual elements.' },
        { q: 'Explain CSS transitions', a: 'Smooth animation between 2 states: transition: property duration timing delay. Example: width 0.3s ease' },
        { q: 'What are animations?', a: '@keyframes define animation steps. animation property applies it. More control than transitions.' },
        { q: 'What is z-index?', a: 'Controls stacking order of positioned elements. Higher z-index on top. Only works with positioned elements.' },
        { q: 'Relative vs absolute positioning', a: 'relative: offset from normal position, reserves space. absolute: positioned relative to parent, removed from flow.' },
        { q: 'CSS custom properties (variables)', a: '--color-primary: blue; use with var(--color-primary). Define once, reuse. Better maintenance.' },
        { q: 'What is CSS inheritance?', a: 'Some properties inherit (color, font). Others don\'t (margin, border). Override with \'inherit\' keyword.' },
        { q: 'Stacking context in CSS', a: 'Creates layering hierarchy. z-index only within same stacking context. Created by positioning, opacity.' },
        { q: 'rem vs em units', a: 'em: relative to element\'s font-size. rem: relative to root font-size. rem more predictable for responsive.' },
        { q: 'What are gradients?', a: 'linear-gradient, radial-gradient: smooth color transitions. Syntax: direction, colors, percentages.' },
        { q: 'Explain CSS preprocessors', a: 'SASS/LESS extend CSS with variables, nesting, functions. Compile to CSS. Better maintainability.' },
        { q: 'Float vs Flexbox layouts', a: 'float: older method, complex clearing. flexbox: modern, simpler, better alignment. Use flexbox.' },
        { q: 'What are CSS counters?', a: 'Automatic numbering: counter-reset, counter-increment. Used for custom lists without numbers.' },
        { q: 'Explain transforms', a: 'rotate, scale, skew, translate: transform element. 2D and 3D available. Doesn\'t affect layout.' },
        { q: 'box-sizing property', a: 'border-box: includes padding/border in width. content-box (default) doesn\'t. border-box easier for sizing.' },
        { q: 'Overflow property', a: 'visible (default), hidden, scroll, auto. Controls overflow content. Useful for scrollable containers.' },
        { q: 'What are CSS filters?', a: 'blur, brightness, contrast, grayscale, hue-rotate, opacity, saturate, sepia. Non-destructive effects.' },
        { q: 'align-items vs justify-content', a: 'justify-content: main axis (horizontal). align-items: cross axis (vertical). Depends on flex-direction.' },
        { q: 'What is responsive design?', a: 'Design adapts to different screen sizes. Media queries, flexible grids, flexible images. Mobile-first.' },
        { q: 'BEM naming convention', a: 'Block__Element--Modifier. Improves CSS organization and reusability. Clear naming structure.' },
        { q: 'What is CSS specificity war?', a: 'Avoid increasing specificity unnecessarily. Use lower specificity selectors. !important is last resort.' }
      ]
    },
    'JavaScript': {
      questions: [
        { q: 'var vs let vs const', a: 'var: function-scoped, let/const: block-scoped. var hoisted fully, let/const hoisted but not initialized. const prevents reassignment.' },
        { q: 'What are closures?', a: 'Function accessing outer scope variables even after function returns. Used for data privacy, callbacks.' },
        { q: 'Event delegation', a: 'Attach listener to parent instead of multiple children. Events bubble up. Efficient for dynamic elements.' },
        { q: 'Sync vs async code', a: 'Sync: blocks execution. Async: doesn\'t block. Use callbacks, promises, async/await.' },
        { q: 'What are promises?', a: 'Pending → Fulfilled/Rejected. Methods: then, catch, finally. Represents eventual completion of async operation.' },
        { q: 'Explain async/await', a: 'Syntactic sugar over promises. async function returns promise. await pauses until promise settles.' },
        { q: 'What is event loop?', a: 'Checks call stack and callback queue. If stack empty, moves callback to stack. Explains async behavior.' },
        { q: '== vs ===', a: '== loose equality (type coercion). === strict equality (no coercion). Always use ===.' },
        { q: 'What is this keyword?', a: 'Refers to object context. In method: object, in function: global/undefined. Arrow functions inherit parent\'s this.' },
        { q: 'Prototypal inheritance', a: 'Objects inherit from prototypes. Prototype chain: object → prototype → Object.prototype. Methods inherited.' },
        { q: 'What is destructuring?', a: 'Extract values from objects/arrays: const {name} = obj; const [a, b] = arr. Cleaner assignment.' },
        { q: 'map vs filter vs reduce', a: 'map: transform elements. filter: select elements. reduce: accumulate to single value. Array methods.' },
        { q: 'Arrow functions', a: '=> syntax. No own this (inherit parent\'s). No arguments object. No prototype. Great for callbacks.' },
        { q: 'call vs apply vs bind', a: 'call(this, arg1, arg2). apply(this, [args]). bind(this) returns new function. Set function\'s this.' },
        { q: 'What is hoisting?', a: 'Variables/functions moved to scope top. var hoisted with undefined, let/const without. Functions fully hoisted.' },
        { q: 'null vs undefined', a: 'undefined: uninitialized. null: intentional absence. undefined == null, but undefined !== null.' },
        { q: 'Template literals', a: 'Backticks allow interpolation: `Hello ${name}`. Supports multi-line strings.' },
        { q: 'Spread operator', a: '... expands iterable. Objects: {...obj}. Arrays: [...arr]. Useful for copying, merging.' },
        { q: 'Higher-order functions', a: 'Function that takes/returns functions. Examples: map, filter, setTimeout, decorators.' },
        { q: 'forEach vs map', a: 'forEach returns undefined, used for side effects. map returns new array. Use map to transform data.' },
        { q: 'What is AJAX?', a: 'Asynchronous HTTP requests without page reload. Use fetch API, XMLHttpRequest, axios.' },
        { q: 'Explain fetch API', a: 'fetch(url).then(res => res.json()). Returns promise. Modern replacement for XMLHttpRequest.' },
        { q: 'Web storage options', a: 'localStorage: persistent. sessionStorage: session-only. Both store key-value pairs as strings.' },
        { q: 'slice vs splice', a: 'slice: non-destructive. splice: modifies original. slice for copying, splice for modification.' },
        { q: 'Event bubbling vs capturing', a: 'Bubbling: inner to outer. Capturing: outer to inner. addEventListener 3rd param controls.' },
        { q: 'What is JSON?', a: 'JSON.stringify(obj) converts to string. JSON.parse(str) converts to object. Data storage/transmission.' },
        { q: 'Regular expressions', a: '/pattern/flags. Methods: test, exec, match, replace. Flags: i, g, m (case, global, multiline).' },
        { q: 'Object.keys vs Object.values vs Object.entries', a: 'keys: array of keys. values: array. entries: [key, value] pairs.' },
        { q: 'What is typeof?', a: 'Returns type: "string", "number", "boolean", "object", "undefined", "function", "symbol".' },
        { q: 'Error handling', a: 'try/catch/finally. throw new Error(). Different types: TypeError, ReferenceError, SyntaxError.' }
      ]
    },
    'React': {
      questions: [
        { q: 'What is React?', a: 'JavaScript library for building UIs with components. Virtual DOM for performance. Declarative, component-based.' },
        { q: 'Functional vs class components', a: 'Functional: simpler, use hooks. Class: use this, lifecycle. Functional is modern approach.' },
        { q: 'What are hooks?', a: 'Functions using React features in functional components. useState, useEffect, useContext, useReducer.' },
        { q: 'Explain useState', a: 'const [state, setState] = useState(initial). State updates trigger re-render. Functional component state.' },
        { q: 'What is useEffect?', a: 'Side effects hook. Runs after render. Dependency array controls: [] once, [dep] when dep changes.' },
        { q: 'Controlled vs uncontrolled', a: 'Controlled: React manages state. Uncontrolled: DOM manages (useRef). Controlled more predictable.' },
        { q: 'What is prop drilling?', a: 'Passing props through many levels. Avoid with Context API, Redux. Verbose, hard to refactor.' },
        { q: 'Explain Context API', a: 'createContext creates context. Provider wraps components. useContext returns value. Avoids prop drilling.' },
        { q: 'What is the key prop?', a: 'Unique identifier for list items. Helps React identify changes. Improves performance, fixes state issues.' },
        { q: 'State vs props', a: 'State: component manages, mutable. Props: passed from parent, immutable. State causes re-render.' },
        { q: 'What is JSX?', a: 'JavaScript XML syntax. Looks like HTML but JavaScript. Babel transpiles to React.createElement().' },
        { q: 'Explain virtual DOM', a: 'React\'s in-memory representation of UI. Compared for changes (diffing). Only changed parts updated.' },
        { q: 'What is react-router?', a: 'Client-side routing library. Routes, Link, Navigate components. SPA navigation without page reload.' },
        { q: 'Lifting state up', a: 'Moving state to common parent component. Necessary when siblings need shared state.' },
        { q: 'What are HOCs?', a: 'Function taking component, returning enhanced component. Reuse component logic. Advanced pattern.' },
        { q: 'useCallback vs useMemo', a: 'useCallback: memoizes function. useMemo: memoizes value. Prevents child re-renders.' },
        { q: 'What is useReducer?', a: 'Complex state management. Reducer function takes state/action. Better than useState for complex logic.' },
        { q: 'Explain fragments', a: '<></> or <React.Fragment>. Return multiple elements without wrapper div. Cleaner DOM.' },
        { q: 'Conditional rendering', a: 'Render based on conditions: if/else, ternary, &&, switch. Show/hide UI based on state.' },
        { q: 'Render props pattern', a: 'Component receives function as prop. Function receives state/methods. Advanced composition.' },
        { q: 'What are Portals?', a: 'ReactDOM.createPortal(component, element). Render outside parent hierarchy. Modals, tooltips.' },
        { q: 'Lazy loading', a: 'React.lazy() with Suspense. Load component when needed. Improves initial load performance.' },
        { q: 'Error boundaries', a: 'Class components catching child errors. componentDidCatch method. Prevents entire app crash.' },
        { q: 'Strict mode', a: '<React.StrictMode> wrapper. Highlights problems: side effects, legacy APIs. Development only.' },
        { q: 'Performance optimization', a: 'React.memo, useMemo, useCallback, code splitting, lazy loading, keys in lists.' },
        { q: 'Compound component pattern', a: 'Components work together, sharing implicit state. Flexible, intuitive API.' },
        { q: 'Refs and state', a: 'State: value, causes re-render, rendering. Refs: direct DOM access, no re-render, forms/focus.' },
        { q: 'What are custom hooks?', a: 'Reusable logic functions starting with "use". Extract component logic. Share stateful logic.' },
        { q: 'Explain useRef', a: 'Returns mutable ref object: useRef(null). Persists across renders. Accessing ref.current. DOM access.' },
        { q: 'Memoization in React', a: 'Prevent unnecessary re-renders: React.memo for components, useMemo for values, useCallback for functions.' }
      ]
    }
  },
  'Frontend': {
    'JavaScript': [
      { q: 'var vs let vs const', a: 'var is function-scoped, let/const are block-scoped. var hoisted completely, let/const hoisted but not initialized.' },
      { q: 'What are closures?', a: 'Function ability to access variables from outer scope. Used for data privacy and callbacks.' },
      { q: 'Event delegation', a: 'Attach event listener to parent instead of children. Events bubble up. Efficient for dynamic elements.' },
      { q: 'Async/await vs promises', a: 'async/await is syntactic sugar for promises. Cleaner code, easier error handling.' },
      { q: 'What is the event loop?', a: 'Handles execution of async code. Call stack → callback queue → event loop.' },
      { q: '== vs === in JavaScript', a: '== loose equality with type coercion. === strict equality. Always use ===.' },
      { q: 'What is this keyword?', a: 'Refers to execution context. Value depends on how function is called.' },
      { q: 'Prototypal inheritance', a: 'Objects inherit from prototypes. Prototype chain for property lookup.' },
      { q: 'Destructuring in JavaScript', a: 'Extract values: const {x} = obj; const [a, b] = arr. Cleaner syntax.' },
      { q: 'map vs filter vs reduce', a: 'map transforms, filter selects, reduce accumulates. Common array methods.' }
    ],
    'React': [
      { q: 'What is React?', a: 'JavaScript library for building UIs with reusable components. Virtual DOM for performance.' },
      { q: 'useState hook', a: 'const [state, setState] = useState(initial). Manage functional component state.' },
      { q: 'useEffect hook', a: 'Perform side effects. Run after render. Dependency array controls when it runs.' },
      { q: 'Props vs state', a: 'Props: passed from parent, immutable. State: component manages, mutable.' },
      { q: 'Key prop in lists', a: 'Identifies list items. Helps React track changes. Critical for performance.' },
      { q: 'Controlled components', a: 'Component state manages form values. Predictable, easier to validate.' },
      { q: 'Uncontrolled components', a: 'Form data managed by DOM. Use refs to access values.' },
      { q: 'Context API', a: 'Share state without prop drilling. useContext hook to access values.' },
      { q: 'Custom hooks', a: 'Reusable component logic. Functions starting with "use". Create with useState/useEffect.' },
      { q: 'Performance optimization', a: 'React.memo, useMemo, useCallback, code splitting, lazy loading.' }
    ]
  },
  'Backend': {
    'Node.js': [
      { q: 'What is Node.js?', a: 'JavaScript runtime for server-side. Event-driven, asynchronous, great for I/O.' },
      { q: 'Event loop in Node.js', a: 'Continuously checks for timers, pending callbacks, I/O operations.' },
      { q: 'Modules in Node.js', a: 'Reusable code blocks. require/module.exports or import/export.' },
      { q: 'require vs import', a: 'require: CommonJS, synchronous. import: ES6, asynchronous. import is modern.' },
      { q: 'What is NPM?', a: 'Node Package Manager. Repository of JavaScript packages. npm install for dependencies.' },
      { q: 'Callbacks in Node.js', a: 'Function passed as argument called later. Can lead to callback hell.' },
      { q: 'What is Express.js?', a: 'Popular Node.js framework. Routing, middleware, simplified server creation.' },
      { q: 'Middleware in Express', a: 'Functions with access to request, response, next. Execute in order.' },
      { q: 'REST APIs', a: 'Architectural style: HTTP methods for operations. GET, POST, PUT, DELETE.' },
      { q: 'Difference between PUT and PATCH', a: 'PUT: replace entire resource. PATCH: partial update.' },
      { q: 'JWT authentication', a: 'JSON Web Tokens: Header.Payload.Signature. Stateless authentication.' },
      { q: 'What is CORS?', a: 'Cross-Origin Resource Sharing. Allows requests from different origins.' },
      { q: 'Streams in Node.js', a: 'Handle data in chunks. Efficient for large files. fs.createReadStream().' },
      { q: 'Error handling in Express', a: 'Middleware with 4 params (err, req, res, next). Async/await with try/catch.' },
      { q: 'HTTP status codes', a: '2xx success, 3xx redirect, 4xx client error, 5xx server error.' },
      { q: 'What is logging?', a: 'Record application events. Winston, Morgan popular. Debug, info, warn, error levels.' },
      { q: 'Environment variables', a: 'Store config outside code: .env file with dotenv package.' },
      { q: 'Async patterns', a: 'Callbacks, promises, async/await. Async/await most readable.' },
      { q: 'File operations', a: 'fs.readFile() async, fs.readFileSync() sync. Async for performance.' },
      { q: 'Process object', a: 'process.env for environment variables, process.argv for arguments.' }
    ]
  },
  'Java': {
    'OOP': [
      { q: 'Four pillars of OOP', a: 'Encapsulation, Abstraction, Inheritance, Polymorphism.' },
      { q: 'What is encapsulation?', a: 'Bundle data with methods. Use access modifiers (private, protected, public).' },
      { q: 'Explain inheritance', a: 'Extend existing class properties/methods. Use "extends" keyword. Reuse code.' },
      { q: 'Abstract class vs interface', a: 'Abstract: can have state and methods. Interface: contracts. Class extends abstract, implements interface.' },
      { q: 'What is polymorphism?', a: 'Objects behave differently in different contexts. Method overloading and overriding.' },
      { q: 'Method overloading', a: 'Same name, different parameters. Compile-time polymorphism.' },
      { q: 'Method overriding', a: 'Parent method redefined in child class. Runtime polymorphism.' },
      { q: 'Access modifiers in Java', a: 'public, protected, default, private. Control visibility and access.' },
      { q: 'super keyword', a: 'Reference to parent class. super() calls parent constructor.' },
      { q: 'this keyword', a: 'Reference to current object. this() calls overloaded constructor.' }
    ]
  },
  'Python': {
    'Basics': [
      { q: 'What are data types in Python?', a: 'int, float, string, list, tuple, dict, set, bool. Dynamically typed.' },
      { q: 'List vs tuple', a: 'List: mutable [], modify elements. Tuple: immutable (), fixed.' },
      { q: 'Does Python have a dictionary?', a: 'Yes, key-value pairs: {key: value}. Access via key.' },
      { q: 'List comprehensions', a: '[x for x in range(10) if x % 2 == 0]. Concise way to create lists.' },
      { q: 'What are decorators?', a: '@decorator syntax. Function taking function, returning enhanced function.' },
      { q: '*args vs **kwargs', a: '*args: variable positional args. **kwargs: variable keyword args.' },
      { q: 'Explain lambda functions', a: 'Anonymous function: lambda x: x * 2. Used with map, filter, sorted.' },
      { q: 'What are generators?', a: 'Function with yield. Yields values one at a time. Memory efficient.' },
      { q: 'Context managers in Python', a: 'with statement: with open(file) as f:. __enter__ and __exit__ methods.' },
      { q: 'Try-except in Python', a: 'Error handling: try, except, else, finally blocks.' }
    ]
  },
  'DSA': {
    'Arrays': [
      { q: 'What is an array?', a: 'Contiguous memory, fixed size. Access O(1), insert/delete O(n), search O(n).' },
      { q: 'Binary search', a: 'Search in sorted array: O(log n). Divide interval in half.' },
      { q: 'Dynamic arrays', a: 'Arrays that grow as needed (ArrayList). Amortized O(1) insertion.' },
      { q: 'Array time complexity', a: 'Access O(1), insert/delete O(n), search O(n) unsorted, O(log n) sorted.' },
      { q: 'Array rotation', a: 'Rotate by k positions: [1,2,3,4,5] → [4,5,1,2,3]. Solutions: reversal, circular shift.' },
      { q: 'Subarray vs subsequence', a: 'Subarray: contiguous. Subsequence: non-contiguous, maintains order.' },
      { q: 'Two-pointer technique', a: 'Two pointers moving in opposite directions. Useful for sorted arrays.' },
      { q: 'Sliding window technique', a: 'Maintain window of elements. Slide across array: O(n) instead of O(n²).' },
      { q: 'Prefix sum', a: 'Pre-compute sum of elements 0 to i. Optimize range sum queries.' },
      { q: 'Array partitioning', a: 'Rearrange around pivot. Used in quicksort.' }
    ]
  },
  'System Design': {
    'Fundamentals': [
      { q: 'What is scalability?', a: 'System ability to handle increasing load. Vertical (bigger machine), horizontal (more machines).' },
      { q: 'What is load balancing?', a: 'Distribute traffic across servers. Round-robin, least connections, IP hash.' },
      { q: 'Explain caching', a: 'Store frequently accessed data. Redis, Memcached. LRU, TTL strategies.' },
      { q: 'CAP theorem', a: 'Consistency, Availability, Partition tolerance: choose 2 of 3.' },
      { q: 'SQL vs NoSQL', a: 'SQL: relational, ACID. NoSQL: flexible, BASE. Choice depends on use case.' },
      { q: 'Database indexing', a: 'Create index on columns for faster lookup: O(log n). Trade-off: slower writes.' },
      { q: 'Database replication', a: 'Copy data across servers. Master-slave: writes master, reads slave.' },
      { q: 'Database sharding', a: 'Partition data across servers. Horizontal partitioning. Improves scalability.' },
      { q: 'What are message queues?', a: 'RabbitMQ, Kafka. Decouple components. Producer-consumer pattern.' },
      { q: 'Microservices architecture', a: 'Break app into independent services. Each service owns data. Scalable, complex.' }
    ]
  },
  'Data Analyst': {
    'SQL': [
      { q: 'What is SQL?', a: 'Structured Query Language. Query databases. SELECT, INSERT, UPDATE, DELETE.' },
      { q: 'SELECT statement', a: 'SELECT column FROM table WHERE condition ORDER BY. DISTINCT, LIMIT.' },
      { q: 'SQL joins', a: 'INNER, LEFT, RIGHT, FULL, CROSS. Combine tables based on conditions.' },
      { q: 'WHERE vs HAVING', a: 'WHERE: filters rows. HAVING: filters after GROUP BY.' },
      { q: 'GROUP BY clause', a: 'Group rows by column. Use with aggregate functions.' },
      { q: 'Aggregate functions', a: 'COUNT, SUM, AVG, MIN, MAX. Operate on column values.' },
      { q: 'Subqueries', a: 'Query within query: SELECT * FROM (SELECT ...) AS temp.' },
      { q: 'UNION vs UNION ALL', a: 'UNION: removes duplicates. UNION ALL: keeps duplicates.' },
      { q: 'CTE (Common Table Expression)', a: 'WITH clause: WITH temp AS (SELECT ...) SELECT * FROM temp.' },
      { q: 'Correlated subquery', a: 'Subquery references outer query. Slower than joins usually.' }
    ]
  }
};

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing questions
    await LibraryQuestion.deleteMany({});
    console.log('🗑️  Cleared existing questions');

    let totalAdded = 0;

    // Seed questions
    for (const [course, topics] of Object.entries(COMPREHENSIVE_QUESTIONS)) {
      for (const [topic, obj] of Object.entries(topics)) {
        const questions = Array.isArray(obj) ? obj : obj.questions || [];
        
        const questionsToInsert = questions.map((qObj, idx) => {
          const difficulties = ['Easy', 'Medium', 'Hard'];
          const difficulty = difficulties[idx % 3];
          const isImportant = idx % 5 === 0; // 20% important

          return {
            course,
            topic,
            question: qObj.q,
            answer: qObj.a,
            difficulty,
            tags: [topic, course, difficulty.toLowerCase()],
            isImportant,
            views: 0,
            keyPoints: extractKeyPoints(qObj.a),
          };
        });

        await LibraryQuestion.insertMany(questionsToInsert);
        console.log(`✅ Added ${questionsToInsert.length} questions for ${course}/${topic}`);
        totalAdded += questionsToInsert.length;
      }
    }

    console.log(`\n🎉 Successfully seeded ${totalAdded} questions!`);
    
    // Show statistics
    const stats = await LibraryQuestion.aggregate([
      {
        $group: {
          _id: '$course',
          count: { $sum: 1 },
          topics: { $addToSet: '$topic' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    console.log('\n📊 Database Statistics:');
    stats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} questions, ${stat.topics.length} topics`);
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

function extractKeyPoints(answer) {
  const sentences = answer.split('. ').slice(0, 3);
  return sentences.map(s => s.trim()).filter(s => s.length > 15);
}

seedDatabase();

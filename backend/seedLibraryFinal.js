import mongoose from 'mongoose';
import LibraryQuestion from './src/models/LibraryQuestion.js';
import dotenv from 'dotenv';

dotenv.config();

const SAMPLE_QUESTIONS = {
  'Full Stack': {
    'HTML': [
      { q: 'What is semantic HTML and why is it important?', a: 'Semantic HTML uses meaningful tags like <header>, <nav>, <article> instead of generic divs. It improves accessibility, SEO, and code readability.' },
      { q: 'Explain the difference between <div> and <span>', a: '<div> is a block-level element (takes full width), <span> is inline (only takes necessary space). Use <div> for layout structure, <span> for styling inline text.' },
      { q: 'What are HTML5 semantic elements?', a: 'Elements like <header>, <nav>, <main>, <article>, <section>, <aside>, <footer> provide semantic meaning to page structure, improving accessibility and SEO.' },
      { q: 'How do you make hyperlinks in HTML?', a: 'Use the <a> tag with href attribute: <a href="url">Link text</a>. Use target="_blank" to open in new tab.' },
      { q: 'What is the purpose of the meta tag?', a: 'Meta tags provide metadata about HTML document: charset, viewport, description, keywords. Essential for responsive design and SEO.' },
      { q: 'Difference between id and class attributes', a: 'id uniquely identifies ONE element, class identifies MULTIPLE elements. id used for single elements, class for styling groups.' },
      { q: 'What is DOCTYPE and why is it important?', a: 'DOCTYPE declares which version of HTML is used. <!DOCTYPE html> tells browser to render in standards mode. Must be first declaration.' },
      { q: 'Explain HTML form elements and their purposes', a: '<input>, <textarea>, <select>, <button> collect user data. Each has different purposes: text input, multi-line text, dropdowns, buttons.' },
      { q: 'What are data attributes and how to use them?', a: 'data-* attributes store custom data: <div data-user="john">. Access via element.dataset.user in JavaScript.' },
      { q: 'Difference between <strong> and <b> tags', a: '<strong> indicates semantic importance (screen readers emphasize), <b> is visual only. Use <strong> for semantic meaning.' },
      { q: 'What are HTML entities?', a: 'HTML entities represent special characters: &nbsp; (space), &lt; (<), &gt; (>), &amp; (&), &quot; (")' },
      { q: 'Explain the difference between block and inline elements', a: 'Block elements take full width (<div>, <p>, <header>). Inline elements take only needed space (<span>, <a>, <b>).' },
      { q: 'What is accessibility and why is it important in HTML?', a: 'Accessibility makes websites usable for everyone including disabled users. Use semantic HTML, alt text, proper labels, ARIA attributes.' },
      { q: 'How to embed images in HTML?', a: 'Use <img> tag: <img src="image.jpg" alt="description" width="100" height="100">. Always include alt text for accessibility.' },
      { q: 'What is the <canvas> element used for?', a: '<canvas> allows drawing graphics via JavaScript. Used for animations, games, charts. Requires JavaScript to draw.' },
      { q: 'Explain the <iframe> tag and its use cases', a: '<iframe> embeds another HTML document: <iframe src="page.html"></iframe>. Used for embedding videos, maps, ads.' },
      { q: 'What are HTML5 form input types?', a: 'text, email, password, number, date, time, range, color, file, submit, reset, search, tel, url' },
      { q: 'How to create lists in HTML?', a: '<ul> unordered list, <ol> ordered list, <dl> definition list. Each item in <li>. <dl> uses <dt> (term) and <dd> (definition).' },
      { q: 'What is the purpose of the <label> element?', a: '<label> associates text with form input. Improves usability and accessibility. Use for attribute: <label for="email">Email:</label><input id="email">' },
      { q: 'Explain HTTP methods used in HTML forms', a: 'GET sends data in URL (visible, limited size). POST sends in body (hidden, larger size). Use POST for sensitive data.' },
      { q: 'What is HTML5 validation?', a: 'Built-in form validation: required, type checking, pattern matching. Reduces server load, improves UX.' },
      { q: 'How to create responsive images?', a: '<img srcset> attribute with multiple image sizes. Use <picture> element for art direction. CSS media queries.' },
      { q: 'What is the viewport meta tag?', a: '<meta name="viewport" content="width=device-width, initial-scale=1">. Essential for responsive design on mobile devices.' },
      { q: 'Explain the difference between <article> and <section>', a: '<article> independent content block (reusable). <section> thematic grouping of content. <section> more generic.' },
      { q: 'What is the purpose of the <time> element?', a: '<time datetime="2024-01-15">January 15</time>. Provides machine-readable time. Useful for search engines and accessibility.' },
      { q: 'How to create a contact form?', a: 'Use <form> with <input>, <textarea>, <button>. Include name attribute for form submission. Add validation and labels.' },
      { q: 'What is the <figure> and <figcaption> element used for?', a: '<figure> wraps an image/diagram with related content. <figcaption> describes it. Semantic way to group visuals with captions.' },
      { q: 'Explain the purpose of alt text in images', a: 'Alt text describes image for accessibility (screen readers), SEO, and displays when image fails to load.' },
      { q: 'What are microdata and schema markup?', a: 'Microdata adds semantic information: itemscope, itemtype, itemprop. Helps search engines understand content. Example: Product schema.' },
      { q: 'How to implement keyboard navigation in HTML?', a: 'Use tabindex attribute, semantic HTML elements have default order. Use <label> properly. Test with Tab key.' }
    ],
    'CSS': [
      { q: 'What is the CSS Box Model?', a: 'Content → Padding → Border → Margin. Controls spacing around elements. Each layer can be styled independently.' },
      { q: 'Explain the difference between margin and padding', a: 'Padding: space INSIDE element border. Margin: space OUTSIDE element border. Both create space but in different areas.' },
      { q: 'What is CSS specificity?', a: 'Hierarchy: Inline (1000) > ID (100) > Class/Attribute (10) > Element (1). Higher specificity overrides lower specificity.' },
      { q: 'Difference between display: none and visibility: hidden', a: 'display: none removes element from layout. visibility: hidden hides but reserves space.' },
      { q: 'What is the CSS cascade?', a: 'Later rules override earlier rules of same specificity. Browser defaults < Author styles < Inline. Read top to bottom.' },
      { q: 'Explain CSS Flexbox', a: 'Layout model for 1D (row/column). flex-direction, justify-content, align-items. Great for components, navigation.' },
      { q: 'What is CSS Grid layout?', a: '2D layout system. Define rows/columns with grid-template. grid-column, grid-row for placement. Complex layouts.' },
      { q: 'Explain positioning in CSS', a: 'static (default), relative (offset from normal), absolute (removed from flow), fixed (viewport), sticky (hybrid).' },
      { q: 'What are CSS media queries?', a: '@media (max-width: 768px) { }. Responsive design technique. Apply styles based on device properties.' },
      { q: 'Difference between pseudo-classes and pseudo-elements', a: 'Pseudo-classes (:hover, :focus) select elements in state. Pseudo-elements (::before, ::after) create virtual elements.' },
      { q: 'What are CSS transitions?', a: 'Smooth animation between 2 states: transition: property duration timing-function delay. Example: width 0.3s ease' },
      { q: 'Explain CSS animations', a: '@keyframes define animation steps. animation property applies it: animation: name duration timing iteration. More control than transitions.' },
      { q: 'What is the z-index property?', a: 'Controls stacking order of positioned elements. Higher z-index appears on top. Only works with positioned elements.' },
      { q: 'Difference between relative and absolute positioning', a: 'relative: positioned relative to normal position, reserves space. absolute: positioned relative to parent, removed from flow.' },
      { q: 'What are CSS variables (custom properties)?', a: '--color-primary: blue; use with var(--color-primary). Define once, reuse everywhere. Easier maintenance and theming.' },
      { q: 'Explain CSS inheritance', a: 'Some properties inherit from parent (color, font). Others don\'t (margin, padding, border). Override with \'inherit\' keyword.' },
      { q: 'What is the CSS stacking context?', a: 'Creates layering hierarchy for positioning. z-index only works within same stacking context. Created by positioning, opacity, etc.' },
      { q: 'Difference between rem and em units', a: 'em: relative to element\'s font-size. rem: relative to root (html) font-size. rem more predictable for responsive design.' },
      { q: 'What are CSS gradients?', a: 'linear-gradient, radial-gradient create smooth color transitions. Used for backgrounds without images. Syntax: direction, colors, percentages.' },
      { q: 'Explain CSS preprocessors (SASS/LESS)', a: 'Extend CSS with variables, nesting, functions. Compile to regular CSS. Better maintainability and code reuse.' },
      { q: 'What is CSS specificity and how to calculate it?', a: 'Inline (1000) > ID (100) > Class/Attribute (10) > Element (1). Example: ! important (11000) overrides all.' },
      { q: 'Difference between float and flexbox for layouts', a: 'float: older method, complex clearing. flexbox: modern, simpler, better for alignment. Use flexbox for new projects.' },
      { q: 'What are CSS counters?', a: 'Automatic numbering: counter-reset, counter-increment, content: counter(). Used for custom lists without numbers.' },
      { q: 'Explain CSS transforms', a: 'Transform element: rotate, scale, skew, translate. 2D and 3D. Doesn\'t affect layout. Great for animations.' },
      { q: 'What is the CSS box-sizing property?', a: 'border-box includes padding/border in width. content-box (default) doesn\'t. border-box easier for sizing.' },
      { q: 'Explain overflow property', a: 'visible (default), hidden, scroll, auto. Controls overflow content. Useful for scrollable containers.' },
      { q: 'What are CSS filters?', a: 'blur, brightness, contrast, grayscale, hue-rotate, opacity, saturate, sepia. Non-destructive image effects.' },
      { q: 'Difference between align-items and justify-content in flexbox', a: 'justify-content: main axis alignment. align-items: cross axis alignment. Main/cross depends on flex-direction.' },
      { q: 'What is responsive design?', a: 'Design adapts to different screen sizes. Uses media queries, flexible grids, flexible images. Mobile-first approach.' },
      { q: 'Explain CSS naming conventions (BEM, OOCSS)', a: 'BEM: Block__Element--Modifier. OOCSS: Object-Oriented CSS. Improves organization and reusability.' }
    ]
  },
  'Frontend': {
    'JavaScript': [
      { q: 'What is the difference between var, let, and const?', a: 'var is function-scoped, let/const are block-scoped. var hoisted completely, let/const hoisted but not initialized (temporal dead zone). const prevents reassignment.' },
      { q: 'Explain closures in JavaScript', a: 'Function ability to access variables from outer scope even after function returns. Used for data privacy, callbacks.' },
      { q: 'What is event delegation?', a: 'Attaching event listener to parent instead of multiple children. Events bubble up. Efficient for dynamic elements.' },
      { q: 'Difference between synchronous and asynchronous code', a: 'Sync blocks execution. Async doesn\'t. Use callbacks, promises, async/await for async operations.' },
      { q: 'What are promises and their states?', a: 'Promise represents eventual completion. Pending → Fulfilled/Rejected. Methods: then, catch, finally.' },
      { q: 'Explain async/await', a: 'Syntactic sugar over promises. async function returns promise. await pauses execution until promise settles. Cleaner than .then()' },
      { q: 'What is the event loop?', a: 'Continuously checks call stack and callback queue. If stack empty, moves callback to stack. Explains async behavior.' },
      { q: 'Difference between == and ===', a: '== loose equality (type coercion). === strict equality (no coercion). Always use === in JavaScript.' },
      { q: 'What is the this keyword?', a: 'Refers to object context. In method: object, in function: global/undefined (strict), arrow functions inherit parent\'s this.' },
      { q: 'Explain prototypal inheritance', a: 'Objects inherit from prototypes. Prototype chain: object → prototype → Object.prototype. Methods inherited, not copied.' },
      { q: 'What is destructuring?', a: 'Extract values from objects/arrays easily: const {name} = obj; const [a, b] = arr; Cleaner variable assignment.' },
      { q: 'Difference between map, filter, and reduce', a: 'map: transforms each element. filter: returns elements satisfying condition. reduce: accumulates to single value.' },
      { q: 'What are arrow functions and their differences?', a: '=> syntax. No own this (inherit parent\'s). No arguments object. No prototype. Great for callbacks.' },
      { q: 'Explain the call, apply, and bind methods', a: 'All set function\'s this. call(this, arg1, arg2). apply(this, [args]). bind(this) returns new function.' },
      { q: 'What is hoisting?', a: 'Variables/functions moved to top of scope. var hoisted with undefined, let/const hoisted without initialization, functions fully hoisted.' },
      { q: 'Difference between null and undefined', a: 'undefined: uninitialized variable. null: intentional absence of value. null == undefined (loose), null !== undefined (strict).' },
      { q: 'What are template literals?', a: 'Backticks allow string interpolation: `Hello ${name}`. Supports multi-line strings.' },
      { q: 'Explain spread operator', a: '... expands iterable. Objects: {...obj}. Arrays: [...arr]. Useful for copying, merging.' },
      { q: 'What is a higher-order function?', a: 'Function that takes/returns functions. Examples: map, filter, setTimeout, event listeners, decorators.' },
      { q: 'Difference between forEach and map', a: 'forEach returns undefined, used for side effects. map returns new array. Use map to transform data.' },
      { q: 'What is AJAX and how to implement it?', a: 'Asynchronous HTTP requests without page reload. Use XMLHttpRequest, fetch API, or axios. Update DOM dynamically.' },
      { q: 'Explain the fetch API', a: 'Modern AJAX: fetch(url).then(res => res.json()). Returns promise. Use async/await for cleaner code.' },
      { q: 'What are web storage options?', a: 'localStorage: persistent storage. sessionStorage: session-only. Both store key-value pairs as strings.' },
      { q: 'Difference between slice and splice', a: 'slice: non-destructive, returns new array. splice: modifies original array. slice for copying, splice for modification.' },
      { q: 'What is event bubbling and capturing?', a: 'Bubbling: inner element events bubble to parent. Capturing: outer to inner. addEventListener 3rd param controls phase.' },
      { q: 'Explain JSON and how to parse/stringify', a: 'JSON.stringify(obj) converts to string, JSON.parse(str) converts to object. For data storage and transmission.' },
      { q: 'What are regular expressions?', a: 'Pattern matching: /pattern/flags. Methods: test, exec, match, replace. Flags: i (case insensitive), g (global), m (multiline).' },
      { q: 'Difference between Object.keys(), Object.values(), Object.entries()', a: 'keys: array of keys. values: array of values. entries: array of [key, value] pairs.' },
      { q: 'What is the typeof operator?', a: 'Returns type string: "string", "number", "boolean", "object", "undefined", "function", "symbol", "bigint".' },
      { q: 'Explain error handling in JavaScript', a: 'try/catch/finally blocks. throw new Error(). Different error types: TypeError, ReferenceError, SyntaxError.' }
    ],
    'React': [
      { q: 'What is React and why use it?', a: 'JavaScript library for building UIs with components. Virtual DOM for performance. Declarative, component-based, easy to learn.' },
      { q: 'Explain functional vs class components', a: 'Functional: simpler, use hooks for state. Class: use this, lifecycle methods. Functional is modern approach.' },
      { q: 'What are hooks and commonly used ones?', a: 'Functions to use React features in functional components. useState (state), useEffect (side effects), useContext, useReducer, useRef.' },
      { q: 'Explain useState hook', a: 'const [state, setState] = useState(initial). State updates trigger re-render. Functional equivalent of this.setState.' },
      { q: 'What is useEffect and its dependency array?', a: 'Side effects hook. Runs after render. Dependency array controls when it runs: [] once, [dep] when dep changes, omit to run every render.' },
      { q: 'Difference between controlled and uncontrolled components', a: 'Controlled: component state managed by React. Uncontrolled: state managed by DOM (useRef). Controlled more predictable.' },
      { q: 'What is prop drilling and how to avoid it?', a: 'Passing props through many levels. Avoid with Context API, Redux, or component composition. Problems: verbose, hard to refactor.' },
      { q: 'Explain React Context API', a: 'createContext creates context. Provider wraps components. useContext returns value. Avoids prop drilling.' },
      { q: 'What is the key prop and why is it important?', a: 'Unique identifier for list items. Helps React identify which items changed. Improves performance and fixes state issues.' },
      { q: 'Difference between state and props', a: 'State: component manages itself, mutable, causes re-render. Props: passed from parent, immutable, read-only.' },
      { q: 'What is JSX and how does it work?', a: 'JavaScript XML syntax. Looks like HTML but JavaScript. Babel transpiles to React.createElement() calls.' },
      { q: 'Explain virtual DOM', a: 'React\'s in-memory representation of UI. Compared with real DOM for changes (diffing). Only changed parts updated. Much faster.' },
      { q: 'What is the react-router library used for?', a: 'Client-side routing. Routes, Link, Navigate components manage navigation without page reload. Single Page Applications.' },
      { q: 'Explain lifting state up', a: 'Moving state to common parent component. Necessary when siblings need shared state. Props pass state down, callbacks pass data up.' },
      { q: 'What are higher-order components (HOC)?', a: 'Function taking component and returning enhanced component. Used for reusing component logic. Pattern for cross-cutting concerns.' },
      { q: 'Difference between useCallback and useMemo', a: 'useCallback memoizes function. useMemo memoizes value. Prevents unnecessary child re-renders and recalculations.' },
      { q: 'What is useReducer hook?', a: 'Complex state management. Reducer function takes state and action, returns new state. Better than useState for complex logic.' },
      { q: 'Explain React fragments', a: '<></> or <React.Fragment>. Return multiple elements without wrapper div. Cleaner DOM.' },
      { q: 'What is conditional rendering?', a: 'Render components based on conditions: if/else, ternary, &&, switch. Show/hide UI based on state.' },
      { q: 'Explain render props pattern', a: 'Component receives function as prop that returns JSX. Function receives state/methods. Advanced pattern for component composition.' },
      { q: 'What are React Portals?', a: 'Render component outside parent DOM hierarchy: ReactDOM.createPortal(component, element). Used for modals, tooltips.' },
      { q: 'Difference between onChange and onInput events', a: 'onInput fires on every input change. onChange fires when input value actually changes (after blur on inputs). Similar in most cases.' },
      { q: 'What is lazy loading in React?', a: 'React.lazy() with Suspense. Load component only when needed. Improves initial load performance.' },
      { q: 'Explain error boundaries', a: 'Class components catching child errors: componentDidCatch, static getDerivedStateFromError. Prevent entire app crash.' },
      { q: 'What is strict mode in React?', a: '<React.StrictMode> wrapper. Highlights potential problems: side effects in render, legacy APIs. Development only.' },
      { q: 'Explain React performance optimization techniques', a: 'React.memo, useMemo, useCallback, code splitting, lazy loading, keys in lists. Profiler tool for identifying bottlenecks.' },
      { q: 'What is compound component pattern?', a: 'Components work together, sharing implicit state. Example: <Select> with <Option>. Flexible and intuitive API.' },
      { q: 'Difference between refs and state', a: 'State: value, causes re-render, use for rendering. Refs: direct DOM access, doesn\'t cause re-render, use for form focus, animations.' },
      { q: 'What is custom hooks?', a: 'Reusable logic functions starting with "use". Extract component logic. Share stateful logic between components.' },
      { q: 'Explain useRef hook', a: 'Returns mutable ref object: const ref = useRef(null). Persists across renders. Accessing ref.current. Used for DOM access.' }
    ]
  },
  'Backend': {
    'Node.js': [
      { q: 'What is Node.js and why use it?', a: 'JavaScript runtime outside browser. Great for I/O heavy applications. Single-threaded, event-driven, asynchronous. NPM ecosystem.' },
      { q: 'Explain the Node.js event loop', a: 'Continuously checks timers, pending callbacks, poll phase, check phase, close phase. Handles async operations efficiently.' },
      { q: 'What are modules in Node.js?', a: 'Reusable code blocks. require/module.exports (CommonJS) or import/export (ES6). Each file is module with own scope.' },
      { q: 'Difference between require and import', a: 'require: CommonJS, synchronous, dynamic. import: ES6, asynchronous, static. import is modern standard.' },
      { q: 'What is NPM?', a: 'Node Package Manager. Repository of JavaScript packages. npm install for dependencies, package.json for metadata.' },
      { q: 'Explain callback functions', a: 'Function passed as argument, called later. Callback hell when too nested. Solution: promises, async/await.' },
      { q: 'What is Express.js?', a: 'Popular Node.js framework. Routing, middleware, template engines. Simplifies server creation.' },
      { q: 'Explain middleware in Express', a: 'Functions with access to request, response, next. Execute in order. Can modify request, response, or end flow.' },
      { q: 'What are REST APIs?', a: 'Architectural style: HTTP methods for operations. GET (read), POST (create), PUT (update), DELETE. Stateless, cacheable.' },
      { q: 'Difference between PUT and PATCH', a: 'PUT: replace entire resource. PATCH: partial update. PUT idempotent, PATCH may not be.' },
      { q: 'What is authentication?', a: 'Verify user identity. Methods: basic auth, tokens (JWT), OAuth. Secure communication essential.' },
      { q: 'Explain JWT tokens', a: 'JSON Web Tokens: Header.Payload.Signature. Stateless authentication. Sent in Authorization header.' },
      { q: 'What is CORS?', a: 'Cross-Origin Resource Sharing. Allows requests from different origins. Send CORS headers: Access-Control-Allow-Origin.' },
      { q: 'Explain streams in Node.js', a: 'Handle data in chunks. Readable, writable, duplex, transform. Efficient for large files. fs.createReadStream().' },
      { q: 'What is the package.json file?', a: 'Project metadata: name, version, dependencies, scripts, license. Crucial for project management.' },
      { q: 'Difference between dependencies and devDependencies', a: 'dependencies: needed for runtime. devDependencies: only for development. Install with npm install --save vs --save-dev.' },
      { q: 'What are environment variables?', a: 'Store configuration outside code: database URL, API keys, ports. Use .env file with dotenv package.' },
      { q: 'Explain error handling in Express', a: 'Middleware with 4 parameters (err, req, res, next). Async/await with try/catch. Send appropriate HTTP status.' },
      { q: 'What is logging and why important?', a: 'Record application events. Debugging, monitoring, analysis. Winston, Morgan popular loggers. Different levels: error, warn, info, debug.' },
      { q: 'Explain HTTP status codes', a: '2xx success, 3xx redirect, 4xx client error, 5xx server error. 200 OK, 404 Not Found, 500 Server Error, 403 Forbidden.' },
      { q: 'What is a reverse proxy?', a: 'Server forwarding requests to backend servers. Nginx, Apache. Load balancing, caching, security.' },
      { q: 'Difference between synchronous and asynchronous file operations', a: 'Sync blocks execution: fs.readFileSync(). Async doesn\'t: fs.readFile() with callback. Use async for better performance.' },
      { q: 'What is clustering in Node.js?', a: 'Use multiple processes for CPU cores. cluster module forks child processes. Improves performance on multi-core systems.' },
      { q: 'Explain the buffer class', a: 'Store binary data: Buffer.from(), Buffer.alloc(). Useful for file/network operations. toString(), toJSON() methods.' },
      { q: 'What is the event emitter?', a: 'EventEmitter class: on (listen), emit (trigger), once. Core for Node.js. Publish-subscribe pattern.' },
      { q: 'Difference between process.env and process.argv', a: 'process.env: environment variables. process.argv: command line arguments. process.env used for config.' },
      { q: 'What are signals in Node.js?', a: 'OS signals: SIGTERM, SIGKILL, SIGINT. Graceful shutdown: process.on("SIGTERM"). Cleanup before exit.' },
      { q: 'Explain child processes in Node.js', a: 'spawn, exec, execFile, fork. Run separate processes. exec for shell commands, fork for Node.js programs.' },
      { q: 'What is the purpose of process.nextTick()?', a: 'Execute callback in next iteration of event loop phase. Higher priority than setImmediate(). Useful for deferring execution.' },
      { q: 'Difference between setImmediate() and setTimeout()', a: 'setImmediate(): check phase of event loop. setTimeout(): timer phase. setImmediate runs sooner in most cases.' }
    ]
  },
  'Java': {
    'OOP': [
      { q: 'What are the four pillars of OOP?', a: 'Encapsulation: bundling data with methods. Abstraction: hiding complex details. Inheritance: extending existing classes. Polymorphism: objects multiple forms.' },
      { q: 'Explain encapsulation in Java', a: 'Bundle data (variables) with methods. Use access modifiers (private, protected, public). Getter/setter methods control access.' },
      { q: 'What is inheritance and why use it?', a: 'Extend existing class properties/methods. Reuse code, establish hierarchy. Use "extends" keyword. Single inheritance in Java.' },
      { q: 'Difference between abstract class and interface', a: 'Abstract: can have state, methods. Interface: contracts only (Java 8+: default methods). Class extends abstract, implements interface.' },
      { q: 'What is polymorphism?', a: 'Objects behave differently in different contexts. Method overloading (same name, different params). Method overriding (parent method redefined).' },
      { q: 'Explain method overloading and overriding', a: 'Overloading: same method name, different params (compile-time). Overriding: parent method redefined in child (runtime).' },
      { q: 'What are access modifiers in Java?', a: 'public: everywhere. protected: package + subclasses. default: package only. private: class only.' },
      { q: 'Explain the super keyword', a: 'Reference to parent class. super() calls parent constructor. super.method() calls parent method.' },
      { q: 'What is the this keyword in Java?', a: 'Reference to current object. Call overloaded constructor: this(). Access current object variables.' },
      { q: 'What is a final keyword used for?', a: 'final class: cannot be extended. final method: cannot be overridden. final variable: cannot be changed (constant).' },
      { q: 'Explain static keyword in Java', a: 'Belongs to class, not instance. Static variables shared by all objects. Static methods called without object: ClassName.method().' },
      { q: 'What is method resolution order?', a: 'Order Java searches for method: current class → parent class → grandparent. Important for multiple inheritance (interfaces).' },
      { q: 'Difference between class and object', a: 'Class: blueprint, template. Object: instance of class. Class abstract, object concrete.' },
      { q: 'What is constructor in Java?', a: 'Special method called when object created. Same name as class. No return type. Initialize object state.' },
      { q: 'Explain constructor overloading', a: 'Multiple constructors, different parameters. Allows flexible object creation. Use this() to call other constructors.' },
      { q: 'What is the default constructor?', a: 'No-argument constructor provided by Java if none defined. Initializes variables to default values (int: 0, boolean: false).' },
      { q: 'Difference between copy constructor and clone()', a: 'Copy constructor: manually copy fields. clone(): Object method, creates shallow copy. clone() requires Cloneable interface.' },
      { q: 'What are inner classes?', a: 'Classes inside classes. Static inner: no access to outer state. Non-static inner: access to outer. Used for grouping.' },
      { q: 'Explain anonymous inner classes', a: 'Class without name, created inline. Useful for event listeners, callbacks. Extends class or implements interface inline.' },
      { q: 'What is composition vs inheritance?', a: 'Composition: "has-a" relationship (HAS object). Inheritance: "is-a" relationship (IS type). Composition often better for flexibility.' }
    ]
  },
  'Python': {
    'Basics': [
      { q: 'What is Python and why use it?', a: 'High-level, interpreted language. Easy to learn syntax, readable code. Great for web, data science, automation. Large community.' },
      { q: 'What are the data types in Python?', a: 'int, float, string, list, tuple, dictionary, set, boolean. Dynamically typed, no declaration needed.' },
      { q: 'Difference between list and tuple', a: 'List: mutable [], can modify. Tuple: immutable (), fixed. Tuple faster, use when data shouldn\'t change.' },
      { q: 'What is a dictionary in Python?', a: 'Key-value pairs: {key: value}. Mutable, unordered. Access via key: dict[key]. Similar to hash map.' },
      { q: 'Explain list comprehensions', a: '[x for x in range(10) if x % 2 == 0]. Concise way to create lists. More readable than loops.' },
      { q: 'What are decorators in Python?', a: '@decorator syntax. Function taking function, returning enhanced function. Used for logging, authentication, caching.' },
      { q: 'Difference between args and kwargs', a: '*args: variable positional args (tuple). **kwargs: variable keyword args (dict). Unpacking with * and **.' },
      { q: 'What is a lambda function?', a: 'Anonymous function: lambda x: x * 2. Concise one-liner. Used with map, filter, sorted.' },
      { q: 'Explain generators in Python', a: 'Function with yield: yields values one at a time. Memory efficient for large datasets. Generator expression: (x for x in range(10)).' },
      { q: 'What are context managers in Python?', a: 'with statement: with open(file) as f:. Ensures setup/teardown. Custom: __enter__ and __exit__ methods.' },
      { q: 'Difference between * and ** operators', a: '*: unpack iterables/variable args. **: unpack dictionaries/keyword args. *args, **kwargs in functions.' },
      { q: 'What is try-except in Python?', a: 'Error handling: try block (code), except (handle error), else (if no error), finally (always run).' },
      { q: 'Explain modules and packages in Python', a: 'Module: .py file. Package: folder with __init__.py. import module or from package import item.' },
      { q: 'What is __name__ == "__main__"?', a: 'Checks if script run directly or imported. Allows script as module and executable.' },
      { q: 'Difference between append and extend', a: 'append: adds element. extend: adds iterable elements. append([1,2]) adds list, extend([1,2]) adds 1,2.' },
      { q: 'What are set operations in Python?', a: 'union (|), intersection (&), difference (-), symmetric_difference (^). Set: unique, unordered elements.' },
      { q: 'Explain string formatting in Python', a: 'f-strings: f"Hello {name}". .format(): "Hello {}".format(name). % operator: "Hello %s" % name.' },
      { q: 'What is slicing in Python?', a: 'list[start:end:step]. Returns new sequence. start inclusive, end exclusive. Negative indices go backwards.' },
      { q: 'Difference between shallow and deep copy', a: 'Shallow: copies top level, nested objects referenced. Deep: copies everything recursively. copy.deepcopy().' },
      { q: 'What are class methods and static methods?', a: '@classmethod: receives class parameter. @staticmethod: no class/self. Use staticmethod for utility functions.' }
    ]
  },
  'DSA': {
    'Arrays': [
      { q: 'What is an array and basic operations?', a: 'Contiguous memory, fixed size (in most languages). Operations: access O(1), insert O(n), delete O(n), search O(n).' },
      { q: 'Explain binary search and when to use it', a: 'Search in sorted array: O(log n). Divide search interval in half. Only on sorted data.' },
      { q: 'What are dynamic arrays and how do they work?', a: 'Arrays that grow as needed (ArrayList, Vector). Allocate extra space, copy when full. Amortized O(1) insertion.' },
      { q: 'Explain time complexity of array operations', a: 'Access: O(1). Insert/delete: O(n). Search: O(n) unsorted, O(log n) sorted. Space: O(n).' },
      { q: 'What is array rotation?', a: 'Rotate array by k positions: [1,2,3,4,5] rotate 2 = [4,5,1,2,3]. Solutions: reversal, or circular shift.' },
      { q: 'Explain array partitioning', a: 'Rearrange elements around pivot. Used in quicksort. Partition into smaller, equal, larger elements.' },
      { q: 'What is a subarray and subsequence?', a: 'Subarray: contiguous elements. Subsequence: non-contiguous, maintains order. Subarray specific, subsequence flexible.' },
      { q: 'Explain prefix and suffix arrays', a: 'Prefix[i]: aggregate of elements 0 to i. Suffix[i]: aggregate of elements i to n. Pre-computing for optimization.' },
      { q: 'What is the two-pointer technique?', a: 'Two pointers moving: opposite directions or same direction. Useful for sorted arrays: merge, palindrome check.' },
      { q: 'Explain sliding window technique', a: 'Maintain fixed/variable window of elements. Slide window across array: remove left, add right. O(n) instead of O(n²).' }
    ]
  },
  'System Design': {
    'Fundamentals': [
      { q: 'What are system design fundamentals?', a: 'Scalability, load balancing, caching, databases, queues, indexing, replication, partitioning, security.' },
      { q: 'Explain vertical and horizontal scaling', a: 'Vertical: bigger machine (limited). Horizontal: more machines (better). Horizontal scalable but complex.' },
      { q: 'What is load balancing?', a: 'Distribute traffic across servers. Round-robin, least connections, IP hash. Nginx, HAProxy common.' },
      { q: 'Explain caching strategies', a: 'LRU, LFU, FIFO, TTL. Redis, Memcached. Cache apart, cache aside patterns.' },
      { q: 'What are databases CAP theorem?', a: 'Consistency, Availability, Partition tolerance. Choose 2 of 3. SQL: CA, NoSQL: AP typically.' },
      { q: 'Difference between SQL and NoSQL', a: 'SQL: relational, structured, ACID. NoSQL: document/key-value, flexible, BASE. Choice depends on use case.' },
      { q: 'What is database indexing?', a: 'Create index on columns for faster lookup: O(log n). Trade-off: slower writes, uses space.' },
      { q: 'Explain database replication', a: 'Copy data across servers. Master-slave: writes master, reads slave. Improves availability, read performance.' },
      { q: 'What is database sharding?', a: 'Partition data across servers. Horizontal partitioning. Distribute by key. Improves scalability, complex queries harder.' },
      { q: 'Explain queues in system design', a: 'Message broker: RabbitMQ, Kafka. Decouple components, async processing. Producer-consumer pattern.' }
    ]
  },
  'Data Analyst': {
    'SQL': [
      { q: 'What is SQL?', a: 'Structured Query Language. Query databases, manipulate data. SELECT, INSERT, UPDATE, DELETE. Works with relational databases.' },
      { q: 'Explain SELECT statement', a: 'Retrieve data: SELECT column FROM table WHERE condition ORDER BY column. DISTINCT removes duplicates. LIMIT number of rows.' },
      { q: 'What are SQL joins?', a: 'INNER: matching rows. LEFT: all left rows. RIGHT: all right rows. FULL: all rows. CROSS: all combinations.' },
      { q: 'Explain WHERE vs HAVING', a: 'WHERE: filters rows before aggregation. HAVING: filters after GROUP BY aggregation. Use HAVING for group conditions.' },
      { q: 'What are aggregate functions?', a: 'COUNT, SUM, AVG, MIN, MAX. Operate on column values. Usually with GROUP BY.' },
      { q: 'Explain GROUP BY clause', a: 'Group rows by column value: SELECT department, COUNT(*) FROM employees GROUP BY department.' },
      { q: 'What is a subquery?', a: 'Query within query: SELECT * FROM (SELECT ...) AS subquery. Nesting queries for complex logic.' },
      { q: 'Difference between UNION and UNION ALL', a: 'UNION: combines results, removes duplicates. UNION ALL: keeps duplicates. UNION slower due to sorting.' },
      { q: 'What is a CTE (Common Table Expression)?', a: 'WITH clause: WITH temp AS (SELECT ...) SELECT * FROM temp. Reusable query blocks, improves readability.' },
      { q: 'Explain correlated subquery', a: 'Subquery references outer query. Executes for each row. Slower than joins usually. SELECT * FROM t1 WHERE EXISTS (SELECT 1 FROM t2 WHERE t1.id = t2.id).' }
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

    // Seed questions for each course and topic
    for (const [course, topics] of Object.entries(SAMPLE_QUESTIONS)) {
      for (const [topic, questions] of Object.entries(topics)) {
        const questionsToInsert = [];

        for (let i = 0; i < questions.length; i++) {
          const { q, a } = questions[i];
          const difficulties = ['Easy', 'Medium', 'Hard'];
          const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
          const isImportant = Math.random() < 0.2; // 20% important

          questionsToInsert.push({
            course,
            topic,
            question: q,
            answer: a,
            difficulty,
            tags: [topic, course, difficulty.toLowerCase()],
            isImportant,
            views: 0,
            keyPoints: extractKeyPoints(a),
          });
        }

        await LibraryQuestion.insertMany(questionsToInsert);
        console.log(`✅ Added ${questionsToInsert.length} questions for ${course}/${topic}`);
        totalAdded += questionsToInsert.length;
      }
    }

    console.log(`\n🎉 Successfully seeded ${totalAdded} questions!`);
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

function extractKeyPoints(answer) {
  // Extract bullet points from answer text
  const keywords = answer.split('. ').slice(0, 3);
  return keywords.map(k => k.trim()).filter(k => k.length > 10);
}

seedDatabase();

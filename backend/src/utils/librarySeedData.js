export const LIBRARY_SEED_DATA = {
  'Full Stack': {
    'HTML': [
      {
        q: 'What is semantic HTML and why is it important?',
        a: 'Semantic HTML uses meaningful tags like header, nav, article, section and footer to convey structure. It improves accessibility, SEO, and makes code easier to maintain.'
      },
      {
        q: 'What is the difference between div and span?',
        a: 'div is a block-level element that starts on a new line and takes full width. span is inline and only takes the width of its content. Use div for layout and span for inline text styling.'
      },
      {
        q: 'How do you create a form in HTML?',
        a: 'Use the form element with input, select, textarea, and button elements. Set the action and method attributes to define where and how data is submitted.'
      },
      {
        q: 'What is the purpose of the meta viewport tag?',
        a: 'The meta viewport tag controls layout on mobile browsers. It ensures responsive pages render correctly by setting width=device-width and initial-scale=1.'
      }
    ],
    'CSS': [
      {
        q: 'What is the CSS box model?',
        a: 'The CSS box model includes content, padding, border, and margin. Understanding it helps control layout and spacing around elements.'
      },
      {
        q: 'What is the difference between margin and padding?',
        a: 'Padding is space inside the border, around the content. Margin is space outside the border, between elements.'
      },
      {
        q: 'How does CSS specificity work?',
        a: 'Specificity is calculated from selectors: inline styles > IDs > classes/attributes > elements. Higher specificity rules override lower ones.'
      },
      {
        q: 'What is flexbox used for?',
        a: 'Flexbox is used to build one-dimensional layouts. It helps align items horizontally or vertically and control space distribution.'
      }
    ]
  },
  'Frontend': {
    'JavaScript': [
      {
        q: 'What is the difference between var, let, and const?',
        a: 'var is function-scoped and hoisted with undefined. let and const are block-scoped, and const cannot be reassigned.'
      },
      {
        q: 'What are closures in JavaScript?',
        a: 'Closures are functions that capture variables from their outer scope. They allow data to persist between function calls.'
      },
      {
        q: 'Explain async/await.',
        a: 'async/await is syntactic sugar over promises. async functions return promises and await pauses execution until the promise resolves.'
      },
      {
        q: 'What is event delegation?',
        a: 'Event delegation attaches a listener to a parent element and handles events for child elements through event bubbling. It improves performance and simplifies dynamic content.'
      }
    ],
    'React': [
      {
        q: 'What are React hooks?',
        a: 'Hooks are functions like useState and useEffect that let functional components manage state and side effects.'
      },
      {
        q: 'What is the difference between props and state?',
        a: 'Props are passed from parent to child and are read-only. State is managed inside a component and can change over time.'
      },
      {
        q: 'What is JSX?',
        a: 'JSX is a syntax extension for JavaScript that looks like HTML. It is compiled to React.createElement calls.'
      },
      {
        q: 'How does useEffect work?',
        a: 'useEffect runs side effects after rendering. The dependency array controls when it re-runs.'
      }
    ]
  },
  'Backend': {
    'Node.js': [
      {
        q: 'What is Node.js?',
        a: 'Node.js is a JavaScript runtime that executes code outside the browser. It is built on Chrome V8 and is event-driven and non-blocking.'
      },
      {
        q: 'What is Express.js?',
        a: 'Express is a web framework for Node.js that simplifies routing, middleware, and request handling.'
      },
      {
        q: 'What is middleware in Express?',
        a: 'Middleware are functions that run during request processing. They can modify req/res or end the request lifecycle.'
      },
      {
        q: 'What is a REST API?',
        a: 'A REST API uses HTTP methods to perform operations on resources. It is stateless and uses URLs to identify resources.'
      }
    ],
    'Database': [
      {
        q: 'What is the difference between SQL and NoSQL?',
        a: 'SQL databases use structured schemas and relations. NoSQL databases are schema-less and better for flexible, document or key-value data.'
      },
      {
        q: 'What is indexing in databases?',
        a: 'Indexing speeds up lookups by creating a data structure for faster retrieval at the cost of write overhead.'
      },
      {
        q: 'What is a primary key?',
        a: 'A primary key uniquely identifies records in a table or collection.'
      },
      {
        q: 'What is connection pooling?',
        a: 'Connection pooling reuses database connections to reduce overhead for repeated queries.'
      }
    ]
  },
  'Java': {
    'OOP': [
      {
        q: 'What are the four pillars of OOP?',
        a: 'Encapsulation, Abstraction, Inheritance, and Polymorphism.'
      },
      {
        q: 'What is inheritance?',
        a: 'Inheritance allows a class to extend another class and reuse its behavior.'
      },
      {
        q: 'What is polymorphism?',
        a: 'Polymorphism means objects can be treated as instances of their parent type, allowing methods to behave differently.'
      },
      {
        q: 'What is encapsulation?',
        a: 'Encapsulation hides internal state and exposes behavior through methods.'
      }
    ]
  },
  'Python': {
    'Basics': [
      {
        q: 'What is Python used for?',
        a: 'Python is used for web development, automation, data science, scripting, and more because of its readability and libraries.'
      },
      {
        q: 'What are lists and tuples?',
        a: 'Lists are mutable, tuples are immutable. Both store ordered collections of items.'
      },
      {
        q: 'What is a dictionary?',
        a: 'A dictionary stores key-value pairs and provides fast lookups by key.'
      },
      {
        q: 'What is a Python function?',
        a: 'A function is a reusable block of code defined with def and called by name with arguments.'
      }
    ]
  },
  'Data Analyst': {
    'SQL': [
      {
        q: 'What is SQL?',
        a: 'SQL is a language for querying and manipulating relational databases.'
      },
      {
        q: 'What is a JOIN?',
        a: 'JOIN combines rows from two tables based on a related column.'
      },
      {
        q: 'What is GROUP BY?',
        a: 'GROUP BY aggregates rows with the same values into summary rows.'
      },
      {
        q: 'What is a subquery?',
        a: 'A subquery is a query nested inside another query, used for complex filters and calculations.'
      }
    ],
    'Data Visualization': [
      {
        q: 'What is a dashboard?',
        a: 'A dashboard visualizes key metrics and trends in a single view for quick insights.'
      },
      {
        q: 'What chart should you use for trends?',
        a: 'Use a line chart for time-series trends and a bar chart for category comparisons.'
      },
      {
        q: 'What is a KPI?',
        a: 'A KPI is a measurable value that shows how effectively an objective is being achieved.'
      },
      {
        q: 'Why is storytelling important in dashboards?',
        a: 'Storytelling helps users understand the insights and take action from the data.'
      }
    ]
  },
  'DSA': {
    'Arrays': [
      {
        q: 'What is an array?',
        a: 'An array is an ordered collection of elements with indexed access.'
      },
      {
        q: 'What is binary search?',
        a: 'Binary search finds an item in a sorted array in O(log n) time by halving the search range.'
      },
      {
        q: 'What is a two-pointer technique?',
        a: 'Two pointers are used to traverse an array from both ends or at different speeds to solve problems efficiently.'
      },
      {
        q: 'What is an array rotation?',
        a: 'Array rotation moves elements by a fixed offset. It can be achieved by reversing parts of the array.'
      }
    ]
  },
  'System Design': {
    'Fundamentals': [
      {
        q: 'What is scalability?',
        a: 'Scalability is the ability of a system to handle increasing load by adding resources.'
      },
      {
        q: 'What is load balancing?',
        a: 'Load balancing distributes traffic across multiple servers to improve availability and performance.'
      },
      {
        q: 'What is caching?',
        a: 'Caching stores frequently accessed data closer to the application to reduce latency and load.'
      },
      {
        q: 'What is sharding?',
        a: 'Sharding splits a database into smaller partitions across multiple servers for scalability.'
      }
    ]
  }
};

export const extractKeyPoints = (answer) => {
  return answer
    .split('. ')
    .slice(0, 3)
    .map((text) => text.trim())
    .filter((text) => text.length > 10);
};

export const createLibrarySeedDocuments = () => {
  const documents = [];

  for (const [course, topics] of Object.entries(LIBRARY_SEED_DATA)) {
    for (const [topic, questions] of Object.entries(topics)) {
      questions.forEach((item, index) => {
        const difficulties = ['Easy', 'Medium', 'Hard'];
        const difficulty = difficulties[index % difficulties.length];
        documents.push({
          course,
          topic,
          question: item.q,
          answer: item.a,
          difficulty,
          tags: [topic, course, difficulty.toLowerCase()],
          isImportant: Math.random() < 0.25,
          views: 0,
          keyPoints: extractKeyPoints(item.a)
        });
      });
    }
  }

  return documents;
};

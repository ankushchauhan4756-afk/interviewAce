import mongoose from 'mongoose';
import dotenv from 'dotenv';
import LibraryQuestion from './src/models/LibraryQuestion.js';

dotenv.config();

const SAMPLE_QUESTIONS = {
  'Full Stack': {
    'HTML': [
      {
        question: 'What is semantic HTML?',
        answer: 'Semantic HTML refers to using HTML tags that clearly describe their meaning to both the browser and the developer. Tags like <header>, <nav>, <section>, <article>, <footer> provide meaning about the content they contain.'
      },
      {
        question: 'What is the difference between <div> and <span>?',
        answer: '<div> is a block-level element that takes up the full width available, while <span> is an inline element that takes only as much width as necessary. Use <div> for large content blocks and <span> for small inline text.'
      },
      {
        question: 'What are attributes in HTML?',
        answer: 'Attributes provide additional information about elements. They are always included in the opening tag and come in name-value pairs (name="value"). Common attributes include id, class, style, src, href, alt, title, etc.'
      },
      {
        question: 'What is the purpose of the meta tag?',
        answer: 'Meta tags provide metadata about an HTML document. They are placed in the <head> section and include information like character set, viewport settings for responsive design, author, and description for SEO.'
      },
      {
        question: 'Explain the difference between id and class attributes.',
        answer: 'An id is unique within a document and used once per element, while a class can be used multiple times. id has higher specificity than class in CSS. Use id for unique elements and class for reusable styles.'
      },
      {
        question: 'What is the HTML5 doctype?',
        answer: 'The HTML5 doctype is <!DOCTYPE html>. It tells the browser that the page is an HTML5 document. Unlike older versions, HTML5 doctype is simple and case-insensitive.'
      },
      {
        question: 'What are data attributes?',
        answer: 'Data attributes (data-*) allow you to store custom data private to the page or application. They are stored in the element and can be accessed via JavaScript using dataset property or getAttribute() method.'
      },
      {
        question: 'What is the difference between <strong> and <b> tags?',
        answer: '<strong> indicates content is of strong semantic importance, while <b> is used to bold text without semantic meaning. Screen readers emphasize <strong>, making it better for accessibility.'
      },
      {
        question: 'What is the purpose of the alt attribute in <img>?',
        answer: 'The alt attribute provides alternative text for an image if it cannot be displayed. It\'s important for accessibility (screen readers) and SEO. Good alt text describes the image concisely.'
      },
      {
        question: 'What is form validation in HTML5?',
        answer: 'HTML5 provides built-in form validation using attributes like required, type="email", type="number", min, max, pattern, etc. Browsers validate input before submission without JavaScript.'
      },
      {
        question: 'What are void elements in HTML?',
        answer: 'Void elements are self-closing tags that don\'t have closing tags. Examples include <br>, <hr>, <img>, <input>, <link>, <meta>. They cannot have any content.'
      },
      {
        question: 'Explain the difference between <section> and <article> tags.',
        answer: '<section> is a generic container for related content, while <article> is specifically for self-contained content like blog posts. <article> can contain multiple <section> elements and vice versa.'
      },
      {
        question: 'What is the purpose of the <canvas> element?',
        answer: '<canvas> is used for drawing graphics on the fly via JavaScript. It provides a container for graphics and uses scripts to draw on it. Commonly used for animations, games, and data visualization.'
      },
      {
        question: 'What is an iframe and when should it be used?',
        answer: 'An iframe (<iframe>) embeds another HTML page within the current page. Use cases include embedding videos, maps, or external content. It creates a separate browsing context with its own DOM.'
      },
      {
        question: 'What is the difference between <figure> and <figcaption>?',
        answer: '<figure> is a container for self-contained content like images or diagrams, while <figcaption> provides a caption for the <figure> element. Together they improve semantic meaning and accessibility.'
      },
      {
        question: 'What are template literals in HTML?',
        answer: 'Template literals allow you to embed expressions inside strings using backticks and ${} syntax in JavaScript. They make it easier to create dynamic HTML strings compared to concatenation.'
      },
      {
        question: 'What is the <progress> element used for?',
        answer: 'The <progress> element displays the progress of a task (like file download). It has a value attribute (current) and max attribute (total). Visual representation depends on browser.'
      },
      {
        question: 'Explain the difference between <label> and placeholder.',
        answer: '<label> is clickable text associated with form elements via the for attribute, improving accessibility. Placeholder is temporary hint text inside an input that disappears when typing. Labels are better for accessibility.'
      },
      {
        question: 'What is the purpose of the <noscript> tag?',
        answer: '<noscript> contains content to be displayed only if JavaScript is disabled in the browser. Useful for showing fallback content or messages asking users to enable JavaScript.'
      },
      {
        question: 'What are microdata in HTML?',
        answer: 'Microdata is a specification for embedding machine-readable metadata within HTML. It uses attributes like itemscope, itemtype, and itemprop to provide semantic meaning to data for search engines.'
      },
      {
        question: 'What is the <details> element?',
        answer: '<details> creates a disclosure widget where content is hidden by default. The <summary> child element provides the label. Users can click to expand/collapse the details.'
      },
      {
        question: 'Explain the difference between <input type="radio"> and <input type="checkbox">.',
        answer: 'Radio buttons allow selecting only one option from multiple choices, while checkboxes allow selecting multiple options. Radio buttons have the same name, checkboxes may have different names.'
      },
      {
        question: 'What is the purpose of the <mark> tag?',
        answer: 'The <mark> tag highlights or marks text for reference or notation purposes. It\'s often used for search results highlighting or to draw attention to specific portions of text.'
      },
      {
        question: 'What is the difference between GET and POST forms?',
        answer: 'GET appends form data to the URL, is less secure, has length limits, and is used for retrieving data. POST sends data in the request body, is more secure, has no length limits, and is used for submitting data.'
      },
      {
        question: 'What is the <time> element used for?',
        answer: 'The <time> element semantically marks up dates and times. It has a datetime attribute that machines can parse. Useful for dates, times, durations, and improving SEO.'
      },
      {
        question: 'Explain the purpose of the <output> element.',
        answer: 'The <output> element represents the result of a calculation or user action. Common in forms where JavaScript updates its content based on input values, like showing calculated results.'
      },
      {
        question: 'What is accessibility in HTML?',
        answer: 'Accessibility means making web content usable by everyone, including people with disabilities. In HTML, it involves using semantic tags, alt text, labels, proper heading hierarchy, and ARIA attributes.'
      },
      {
        question: 'What is the difference between <article>, <aside>, <nav>, and <header>?',
        answer: '<article>: self-contained content; <aside>: tangentially related content; <nav>: navigation links; <header>: introductory content/navigation. Each has specific semantic purpose.'
      },
      {
        question: 'What are custom data attributes and how do you access them?',
        answer: 'Custom data attributes (data-*) store custom data in HTML. Access them via JavaScript using element.dataset.attributeName or element.getAttribute("data-attributeName").'
      }
    ],
    'CSS': [
      {
        question: 'What is the CSS Box Model?',
        answer: 'The CSS Box Model consists of four parts: Content (actual content), Padding (space inside border), Border (around padding), and Margin (space outside border). Understanding this model is crucial for layout and spacing.'
      },
      {
        question: 'Explain the difference between margin and padding.',
        answer: 'Padding is the space inside an element\'s border, affecting the space around content. Margin is the space outside an element\'s border, affecting the space between elements.'
      },
      {
        question: 'What is CSS specificity?',
        answer: 'Specificity determines which CSS rule is applied when multiple rules target the same element. Inline styles (1000) > IDs (100) > Classes/Pseudo-classes (10) > Elements (1). Higher specificity wins.'
      },
      {
        question: 'What are CSS selectors?',
        answer: 'CSS selectors are patterns used to select the elements you want to style. Types include: Element selectors, Class selectors, ID selectors, Attribute selectors, and Pseudo-selectors.'
      },
      {
        question: 'Explain CSS flexbox layout.',
        answer: 'Flexbox is a one-dimensional layout method for arranging items in rows or columns. It uses display: flex on container and properties like justify-content, align-items, flex-direction to arrange items flexibly.'
      },
      {
        question: 'What is CSS Grid?',
        answer: 'CSS Grid is a two-dimensional layout system using rows and columns. Use display: grid on container and define grid-template-rows/columns. Items automatically place on grid lines.'
      },
      {
        question: 'What is the difference between relative and absolute positioning?',
        answer: 'Relative positioning positions an element relative to its normal position without removing it from document flow. Absolute positioning removes it from document flow and positions relative to nearest positioned ancestor.'
      },
      {
        question: 'What are CSS media queries?',
        answer: 'Media queries apply different CSS rules based on device characteristics like screen width, height, and orientation. Essential for responsive design: @media (max-width: 600px) { ... }'
      },
      {
        question: 'Explain CSS transitions vs animations.',
        answer: 'Transitions smoothly change property values over time in response to triggers (hover, click). Animations change properties over specified time and are self-triggering. Animations offer more control.'
      },
      {
        question: 'What is the "cascade" in CSS?',
        answer: 'The cascade determines which rule applies when multiple rules target the same element. Later rules override earlier ones if they have same specificity. Specificity and order matter.'
      },
      {
        question: 'What are CSS pseudo-classes and pseudo-elements?',
        answer: 'Pseudo-classes (::hover, ::visited) target element states. Pseudo-elements (::before, ::after) target specific parts of elements. Pseudo-classes use single colon, pseudo-elements use double colon.'
      },
      {
        question: 'What is the difference between display: none and visibility: hidden?',
        answer: 'display: none removes element from document flow, not taking up space. visibility: hidden hides element but keeps the space it would occupy.'
      },
      {
        question: 'Explain the stacking context in CSS.',
        answer: 'Stacking context determines which elements appear on top when overlapping. Created by properties like z-index, opacity < 1, transform, etc. Elements within stacking context have independent z-index ordering.'
      },
      {
        question: 'What are CSS preprocessors?',
        answer: 'CSS preprocessors like SASS/SCSS, LESS, Stylus extend CSS with variables, functions, nesting, and mixins. They compile to regular CSS. They improve code organization and reusability.'
      },
      {
        question: 'What is CSS inheritance?',
        answer: 'Inheritance means child elements automatically inherit certain CSS properties from parents. Properties like color, font-size, font-family inherit. Layout properties like margin, padding do not inherit.'
      },
      {
        question: 'Explain the difference between inline, block, and inline-block display.',
        answer: 'Block elements take full width and start on new lines (div, p). Inline elements take only needed width and flow with text (span, a). Inline-block combines both: flows inline but respects width/height.'
      },
      {
        question: 'What is the z-index property?',
        answer: 'z-index controls stacking order of positioned elements. Higher value appears on top. Only works on positioned elements (relative, absolute, fixed). Default is 0.'
      },
      {
        question: 'Explain CSS floats and why they became less popular.',
        answer: 'Floats remove elements from document flow, making adjacent elements wrap around them. Historically used for layouts. Less popular now due to flexbox and grid being more intuitive and powerful.'
      },
      {
        question: 'What are CSS variables (custom properties)?',
        answer: 'CSS variables store reusable values like colors or sizes. Define with --variable-name: value. Access with var(--variable-name). Can be scoped to selectors or root.'
      },
      {
        question: 'Explain the CSS overflow property.',
        answer: 'Overflow controls how content behaves when it exceeds container size. Values: visible (default), hidden (clips), scroll (adds scrollbars), auto (scrollbars when needed).'
      },
      {
        question: 'What is the difference between rem and em units?',
        answer: 'em is relative to parent font-size. rem (root em) is relative to root (html) font-size. rem is more predictable for consistent sizing across nested elements.'
      },
      {
        question: 'Explain the difference between justify-content and align-items in flexbox.',
        answer: 'justify-content aligns items along main axis (horizontal by default). align-items aligns items along cross axis (vertical by default).'
      },
      {
        question: 'What is the CSS cursor property?',
        answer: 'The cursor property changes the mouse cursor appearance. Values include pointer, default, text, move, wait, help, etc. Improves UX by indicating actionable elements.'
      },
      {
        question: 'Explain CSS opacity vs color transparency.',
        answer: 'Opacity affects entire element and its children equally (0-1). Color transparency affects only that color property using rgba/hsla. Children don\'t inherit opacity.'
      },
      {
        question: 'What are CSS transforms?',
        answer: 'Transforms modify element appearance without affecting document flow. Types: translate, rotate, scale, skew. Can be 2D or 3D. Often combined with transitions/animations.'
      },
      {
        question: 'Explain the CSS background shorthand property.',
        answer: 'background combines background-color, background-image, background-position, background-repeat, etc. Order matters. Example: background: url(img.jpg) center/cover no-repeat #fff;'
      },
      {
        question: 'What is the difference between box-sizing: border-box and content-box?',
        answer: 'content-box (default): width/height only include content. border-box: width/height include content, padding, and border. border-box simplifies layout calculations.'
      },
      {
        question: 'Explain CSS gradients.',
        answer: 'Gradients create smooth transitions between colors. Linear: left/top to right/bottom. Radial: circular gradient. Conic: rotational. Use background: linear-gradient(color1, color2);'
      },
      {
        question: 'What is the CSS filter property?',
        answer: 'Filter property applies graphical effects like blur, brightness, contrast, grayscale, hue-rotate, saturate, sepia. Example: filter: blur(5px) brightness(1.2);'
      }
    ]
  },
  'Frontend': {
    'JavaScript': [
      {
        question: 'What are the different data types in JavaScript?',
        answer: 'JavaScript has primitive types: String, Number, Boolean, Undefined, Null, Symbol, BigInt. And Object types: Object, Array, Function, Date, RegExp. Use typeof operator to check types.'
      },
      {
        question: 'Explain hoisting in JavaScript.',
        answer: 'Hoisting moves declarations to top of scope during compilation. var hoists with undefined value. let/const hoist but aren\'t initialized (temporal dead zone). Functions hoist entirely.'
      },
      {
        question: 'What is the difference between let, const, and var?',
        answer: 'var: function-scoped, redeclarable, hoisted. let: block-scoped, not redeclarable, temporal dead zone. const: block-scoped, not redeclarable, must be initialized, reference can\'t change.'
      }
    ],
    'React': [
      {
        question: 'What is React?',
        answer: 'React is a JavaScript library for building user interfaces with reusable components. It uses virtual DOM for efficient updates and follows a declarative programming style.'
      }
    ]
  },
  'Backend': {
    'Node.js': [
      {
        question: 'What is Node.js?',
        answer: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine, allowing server-side JavaScript execution. It\'s event-driven, non-blocking, and great for building scalable applications.'
      }
    ]
  },
  'Java': {
    'Basics': [
      {
        question: 'What is a class in Java?',
        answer: 'A class is a blueprint for creating objects. It defines variables (properties) and methods (behaviors). Objects are instances of classes.'
      }
    ]
  },
  'Python': {
    'Basics': [
      {
        question: 'What are decorators in Python?',
        answer: 'Decorators are functions that modify other functions or classes. They use @decorator syntax. Useful for logging, timing, caching, etc. They return a wrapped version of the function.'
      }
    ]
  },
  'Data Analyst': {
    'SQL': [
      {
        question: 'What is a database index?',
        answer: 'An index is a database structure that improves query performance by allowing faster lookups. Indexed columns are sorted separately, enabling binary search. Trade-off: slower writes but faster reads.'
      }
    ]
  },
  'DSA': {
    'Arrays': [
      {
        question: 'What are arrays in data structures?',
        answer: 'Arrays are ordered collections of elements stored in contiguous memory. Fast access O(1) by index. Fixed size (in some languages) or dynamic. Used as basis for many other data structures.'
      }
    ]
  },
  'System Design': {
    'Fundamentals': [
      {
        question: 'What is scalability in system design?',
        answer: 'Scalability is a system\'s ability to handle increased load. Vertical scaling: more resources to one machine. Horizontal scaling: more machines. Design systems to scale horizontally for flexibility.'
      }
    ]
  }
};

// Add more questions to fill 30 per topic
function generateQuestionsForTopic(course, topic, baseQuestions) {
  const questions = [];
  const baseCount = baseQuestions.length;

  for (let i = 0; i < 30; i++) {
    if (i < baseCount) {
      questions.push({
        course,
        topic,
        question: baseQuestions[i].question,
        answer: baseQuestions[i].answer,
        difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
        keyPoints: [],
        tags: [topic, course],
        isImportant: Math.random() > 0.8
      });
    } else {
      const qIndex = i % baseCount;
      questions.push({
        course,
        topic,
        question: baseQuestions[qIndex].question + ` (Variation ${Math.floor(i / baseCount) + 1})`,
        answer: baseQuestions[qIndex].answer,
        difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
        keyPoints: [],
        tags: [topic, course],
        isImportant: Math.random() > 0.8
      });
    }
  }

  return questions;
}

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewAce');
    console.log('✅ Connected to MongoDB');

    // Check if questions already exist
    const count = await LibraryQuestion.countDocuments();
    if (count > 0) {
      console.log(`✅ Database already has ${count} questions. Skipping seed.`);
      await mongoose.connection.close();
      return;
    }

    let totalQuestions = 0;

    for (const [course, topics] of Object.entries(SAMPLE_QUESTIONS)) {
      for (const [topic, baseQuestions] of Object.entries(topics)) {
        const questions = generateQuestionsForTopic(course, topic, baseQuestions);
        await LibraryQuestion.insertMany(questions);
        totalQuestions += questions.length;
        console.log(`✅ Added ${questions.length} questions for ${course}/${topic}`);
      }
    }

    console.log(`\n🎉 Successfully seeded ${totalQuestions} questions!`);
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();

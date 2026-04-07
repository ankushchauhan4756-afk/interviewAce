export const SAMPLE_QUESTIONS = {
  'Full Stack': {
    'HTML': [
      { q: 'What is semantic HTML and why is it important?', a: 'Semantic HTML uses meaningful tags like <header>, <nav>, <article> instead of generic divs. It improves accessibility, SEO, and code readability.' },
      { q: 'Explain the difference between <div> and <span>', a: '<div> is a block-level element (takes full width), <span> is inline (only takes necessary space). Use <div> for layout structure, <span> for styling inline text.' },
      { q: 'What are HTML5 semantic elements?', a: 'Elements like <header>, <nav>, <main>, <article>, <section>, <aside>, <footer> provide semantic meaning to page structure, improving accessibility and SEO.' },
      { q: 'How do you make hyperlinks in HTML?', a: 'Use the <a> tag with href attribute: <a href="url">Link text</a>. Use target="_blank" to open in new tab.' },
      { q: 'What is the purpose of the meta tag?', a: 'Meta tags provide metadata about HTML document: charset, viewport, description, keywords. Essential for responsive design and SEO.' },
    ],
    'CSS': [
      { q: 'What is the CSS Box Model?', a: 'Content → Padding → Border → Margin. Controls spacing around elements. Each layer can be styled independently.' },
      { q: 'Explain the difference between margin and padding', a: 'Padding: space INSIDE element border. Margin: space OUTSIDE element border. Both create space but in different areas.' },
      { q: 'What is CSS specificity?', a: 'Hierarchy: Inline (1000) > ID (100) > Class/Attribute (10) > Element (1). Higher specificity overrides lower specificity.' },
    ]
  },
  'Frontend': {
    'JavaScript': [
      { q: 'What is the difference between var, let, and const?', a: 'var is function-scoped, let/const are block-scoped. var hoisted completely, let/const hoisted but not initialized (temporal dead zone). const prevents reassignment.' },
      { q: 'Explain closures in JavaScript', a: 'Function ability to access variables from outer scope even after function returns. Used for data privacy, callbacks.' },
      { q: 'What is event delegation?', a: 'Attaching event listener to parent instead of multiple children. Events bubble up. Efficient for dynamic elements.' },
    ],
    'React': [
      { q: 'What is React and why use it?', a: 'JavaScript library for building UIs with components. Virtual DOM for performance. Declarative, component-based, easy to learn.' },
      { q: 'Explain functional vs class components', a: 'Functional: simpler, use hooks for state. Class: use this, lifecycle methods. Functional is modern approach.' },
      { q: 'What are hooks and commonly used ones?', a: 'Functions to use React features in functional components. useState (state), useEffect (side effects), useContext, useReducer, useRef.' },
    ]
  }
};

export function extractKeyPoints(answer) {
  const keywords = answer.split('. ').slice(0, 3);
  return keywords.map(k => k.trim()).filter(k => k.length > 10);
}

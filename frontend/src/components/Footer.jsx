import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>InterviewAce</h4>
          <p>Ace your interviews with AI-powered practice and personalized feedback.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/practice">Practice</a></li>
            <li><a href="/mock-interview">Mock Interview</a></li>
            <li><a href="/resume-analyzer">Resume Analyzer</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} InterviewAce. All rights reserved.</p>
        <p>Made with ❤️ to help you succeed</p>
      </div>
    </footer>
  );
}

export default Footer;

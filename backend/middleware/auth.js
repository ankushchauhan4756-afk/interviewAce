import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token
 */
export const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization required'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

/**
 * Middleware for error handling
 */
export const errorHandler = (error, req, res, next) => {
  console.error('Error:', error);
  
  const status = error.status || 500;
  const message = error.message || 'Internal server error';

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { error: error.stack })
  });
};

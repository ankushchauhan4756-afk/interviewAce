#!/bin/bash

# InterviewAce Bootstrap Script
# This script sets up the entire project for development

set -e  # Exit on error

echo "🚀 InterviewAce Bootstrap Script"
echo "=================================="
echo ""

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js $(node -v)"
echo "✅ npm $(npm -v)"
echo ""

# Backend setup
echo "📦 Setting up Backend..."
cd backend

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Backend package.json not found!"
    exit 1
fi

# Install dependencies
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "⚠️  Please update .env file with your configuration:"
        echo "   - MONGODB_URI"
        echo "   - JWT_SECRET"
    fi
fi

cd ..
echo "✅ Backend setup complete"
echo ""

# Frontend setup
echo "📦 Setting up Frontend..."
cd frontend

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Frontend package.json not found!"
    exit 1
fi

# Install dependencies
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "⚠️  Please update .env file with your configuration:"
        echo "   - VITE_API_BASE_URL"
    fi
fi

cd ..
echo "✅ Frontend setup complete"
echo ""

echo "🎉 Setup Complete!"
echo ""
echo "📝 Configuration Required:"
echo "   1. Update backend/.env with MongoDB URI and JWT_SECRET"
echo "   2. Update frontend/.env with VITE_API_BASE_URL"
echo ""
echo "📊 Database Setup:"
echo "   cd backend && node seed.js"
echo ""
echo "🚀 Start Development:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: cd frontend && npm run dev"
echo ""
echo "🌐 Open Browser:"
echo "   http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "   - Quick Start: QUICK_START.md"
echo "   - Complete Setup: SETUP.md"
echo "   - Deployment: DEPLOYMENT.md"

#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Preparing Dental Website for Production Deployment...\n');

// Install backend dependencies
console.log('📦 Installing backend dependencies...');
process.chdir(path.join(__dirname, 'dental-backend'));
execSync('npm install', { stdio: 'inherit' });

// Install frontend dependencies
console.log('\n📦 Installing frontend dependencies...');
process.chdir(path.join(__dirname, 'dental-frontend'));
execSync('npm install', { stdio: 'inherit' });

// Create production environment templates
console.log('\n🔧 Creating environment templates...');

const backendEnvTemplate = `# Production Environment Variables
NODE_ENV=production
PORT=5000

# Database (from Railway PostgreSQL)
DB_HOST=your-railway-db-host
DB_PORT=5432
DB_NAME=railway
DB_USERNAME=postgres
DB_PASSWORD=your-railway-db-password

# Security (MUST be 32+ characters)
JWT_SECRET=your-production-jwt-secret-key-32-chars-minimum
JWT_EXPIRES_IN=7d

# CORS (update after frontend deployment)
FRONTEND_URL=https://your-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
`;

const frontendEnvTemplate = `# Production Environment Variables
REACT_APP_API_URL=https://your-backend-railway-url.up.railway.app/api
`;

// Write templates
process.chdir(path.join(__dirname, 'dental-backend'));
fs.writeFileSync('.env.template', backendEnvTemplate);

process.chdir(path.join(__dirname, 'dental-frontend'));
fs.writeFileSync('.env.production.template', frontendEnvTemplate);

console.log('\n✅ All dependencies installed successfully!');
console.log('✅ Environment templates created!');

console.log('\n🚀 PRODUCTION DEPLOYMENT STEPS:');
console.log('1. 📄 See DEPLOY_TO_PRODUCTION.md for 60-second deploy guide');
console.log('2. 🗄️ Set up Railway PostgreSQL database');
console.log('3. 🚀 Deploy backend to Railway');
console.log('4. 🎨 Deploy frontend to Vercel');
console.log('5. 🧪 Test your live system');

console.log('\n📖 Detailed guides:');
console.log('• DEPLOY_TO_PRODUCTION.md - Quick start (60 seconds)');
console.log('• SETUP_GUIDE.md - Complete production guide');

console.log('\n🎯 Your dental website is ready for LIVE deployment! 🏥');

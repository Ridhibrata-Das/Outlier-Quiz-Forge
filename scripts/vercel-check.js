const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
}

// Function to run a command and return its output
function runCommand(command) {
  try {
    return execSync(command, { stdio: 'pipe' }).toString()
  } catch (error) {
    return error.message
  }
}

// Function to check if a file exists
function fileExists(filePath) {
  return fs.existsSync(path.join(process.cwd(), filePath))
}

// Function to log with color
function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset)
}

// Main check function
async function runVercelChecks() {
  log('\n🔍 Running Vercel-like checks...\n', 'blue')

  // 1. Check for required files
  log('📁 Checking required files...', 'blue')
  const requiredFiles = ['package.json', 'next.config.js', '.babelrc', 'postcss.config.js']

  requiredFiles.forEach(file => {
    if (fileExists(file)) {
      log(`✅ ${file} exists`, 'green')
    } else {
      log(`❌ ${file} is missing`, 'red')
    }
  })

  // 2. Check for build errors
  log('\n🔨 Checking build process...', 'blue')
  try {
    const buildOutput = runCommand('npm run build')
    if (buildOutput.includes('error')) {
      log('❌ Build errors found:', 'red')
      console.log(buildOutput)
    } else {
      log('✅ Build completed successfully', 'green')
    }
  } catch (error) {
    log('❌ Build failed:', 'red')
    console.error(error)
  }

  // 3. Check for ESLint errors
  log('\n🔍 Checking ESLint...', 'blue')
  try {
    const lintOutput = runCommand('npx eslint src/**/*.{js,jsx}')
    if (lintOutput.includes('error')) {
      log('❌ ESLint errors found:', 'red')
      console.log(lintOutput)
    } else {
      log('✅ No ESLint errors', 'green')
    }
  } catch (error) {
    log('❌ ESLint check failed:', 'red')
    console.error(error)
  }

  // 4. Check for TypeScript errors
  log('\n📝 Checking TypeScript...', 'blue')
  if (fileExists('tsconfig.json')) {
    try {
      const tsOutput = runCommand('npx tsc --noEmit')
      if (tsOutput.includes('error')) {
        log('❌ TypeScript errors found:', 'red')
        console.log(tsOutput)
      } else {
        log('✅ No TypeScript errors', 'green')
      }
    } catch (error) {
      log('❌ TypeScript check failed:', 'red')
      console.error(error)
    }
  } else {
    log('ℹ️ TypeScript not configured', 'yellow')
  }

  // 5. Check for dependencies
  log('\n📦 Checking dependencies...', 'blue')
  try {
    const auditOutput = runCommand('npm audit')
    if (auditOutput.includes('critical') || auditOutput.includes('high')) {
      log('❌ Security vulnerabilities found:', 'red')
      console.log(auditOutput)
    } else {
      log('✅ No critical security vulnerabilities', 'green')
    }
  } catch (error) {
    log('❌ Dependency check failed:', 'red')
    console.error(error)
  }

  log('\n✨ Vercel-like checks completed!\n', 'blue')
}

// Run the checks
runVercelChecks().catch(console.error)

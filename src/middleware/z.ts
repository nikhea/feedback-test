Project Structure:
```
middleware-project/
│
├── src/
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── localization.ts
│   │   ├── logging.ts
│   │   └── api-protection.ts
│   │
│   └── middleware.ts
│
├── next.config.js
├── tsconfig.json
└── package.json
```

1. `/src/middleware/auth.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'

export function authMiddleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')
  if (!authToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = ['/dashboard', '/profile', '/settings']
  return protectedRoutes.some(route => pathname.startsWith(route))
}

export function validateToken(token: string): boolean {
  // Implement more robust token validation
  // This is a placeholder - replace with actual JWT or session validation
  return token === 'valid-token'
}
```

2. `/src/middleware/localization.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'

export function localizationMiddleware(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  const lang = acceptLanguage?.split(',')[0] || 'en'
  
  const response = NextResponse.next()
  response.headers.set('x-lang', lang)
  
  return response
}

export function isLocalizationRoute(pathname: string): boolean {
  const localizationRoutes = ['/blog', '/products', '/docs']
  return localizationRoutes.some(route => pathname.startsWith(route))
}

export function normalizeLanguageCode(lang: string): string {
  // Normalize language codes
  const languageMap: { [key: string]: string } = {
    'en-US': 'en',
    'en-GB': 'en',
    'es-ES': 'es',
    'fr-FR': 'fr'
  }
  return languageMap[lang] || lang.split('-')[0]
}
```

3. `/src/middleware/logging.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'

export function loggingMiddleware(request: NextRequest) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers),
    ip: request.ip
  }, null, 2))
  
  return NextResponse.next()
}

export function logRequest(request: NextRequest, additionalInfo?: Record<string, any>) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
    ...additionalInfo
  }
  
  // In a production app, replace with proper logging service
  console.log(JSON.stringify(logEntry, null, 2))
}
```

4. `/src/middleware/api-protection.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { validateToken } from './auth'

const protectedPaths = [
  '/api/admin', 
  '/api/users', 
  '/api/sensitive-data',
  '/api/billing'
]

export function isProtectedApiRoute(pathname: string): boolean {
  return protectedPaths.some(path => pathname.startsWith(path))
}

export function handleProtectedApiRoute(request: NextRequest): NextResponse | null {
  const authToken = request.cookies.get('authToken')?.value

  if (!authToken) {
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        message: 'Authentication required' 
      }),
      { 
        status: 401, 
        headers: { 'content-type': 'application/json' } 
      }
    )
  }

  if (!validateToken(authToken)) {
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        message: 'Invalid or expired token' 
      }),
      { 
        status: 403, 
        headers: { 'content-type': 'application/json' } 
      }
    )
  }

  return null // Allows the request to proceed
}
```

5. `/src/middleware.ts`:
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { authMiddleware, isProtectedRoute } from './middleware/auth'
import { loggingMiddleware } from './middleware/logging'
import { localizationMiddleware, isLocalizationRoute } from './middleware/localization'
import { isProtectedApiRoute, handleProtectedApiRoute } from './middleware/api-protection'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Apply logging middleware to all routes
  loggingMiddleware(request)

  // Check if the request is for a protected API route
  if (pathname.startsWith('/api/') && isProtectedApiRoute(pathname)) {
    const apiResponse = handleProtectedApiRoute(request)
    if (apiResponse) return apiResponse
  }

  // Apply authentication middleware to protected routes
  if (isProtectedRoute(pathname)) {
    const authResponse = authMiddleware(request)
    if (authResponse.status !== 200) return authResponse
  }

  // Apply localization middleware to specific routes
  if (isLocalizationRoute(pathname)) {
    return localizationMiddleware(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
```

6. `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middleware: true,
  },
  // Other configuration options
}

module.exports = nextConfig
```

7. `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

8. `package.json` (partial example):
```json
{
  "name": "nextjs-middleware-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^13.x.x",
    "react": "^18.x.x",
    "react-dom": "^18.x.x"
  },
  "devDependencies": {
    "@types/node": "^18.x.x",
    "@types/react": "^18.x.x",
    "typescript": "^4.x.x"
  }
}
```
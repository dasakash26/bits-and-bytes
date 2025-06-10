import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding React Server Components: A Deep Dive",
    slug: "understanding-react-server-components-deep-dive",
    excerpt:
      "React Server Components represent a paradigm shift in how we think about server-side rendering. Unlike traditional SSR, RSCs allow you to write components that run exclusively on the server, reducing bundle size and improving performance.",
    author: "Dan Abramov",
    date: "2024-01-15",
    readTime: "12 min read",
    category: "React",
    tags: ["React", "SSR", "Performance", "Frontend"],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    likeCount: 342,
    commentCount: 28,
    viewCount: 5420,
    content: `# Understanding React Server Components: A Deep Dive

React Server Components (RSCs) represent one of the most significant architectural changes in React since hooks. They fundamentally alter how we think about the boundary between client and server, offering unprecedented opportunities for performance optimization and developer experience improvements.

## What Are React Server Components?

React Server Components are a new type of component that **runs exclusively on the server**. Unlike traditional server-side rendering (SSR), where components are rendered to HTML on the server and then hydrated on the client, RSCs never ship to the client bundle.

### Key Differences from Traditional SSR

- **No hydration**: RSCs don't need to be hydrated on the client
- **Zero bundle impact**: The code for RSCs never reaches the browser
- **Direct data access**: Can directly access databases, file systems, and other server resources
- **Automatic serialization**: React handles serializing the component tree

## The Architecture

RSCs introduce a new mental model where your React tree can contain both server and client components:

\`\`\`jsx
// ServerComponent.js (runs on server)
import { ClientComponent } from './ClientComponent'
import { db } from './database'

export default async function ServerComponent() {
  const posts = await db.posts.findMany()
  
  return (
    <div>
      <h1>Latest Posts</h1>
      {posts.map(post => (
        <ClientComponent key={post.id} post={post} />
      ))}
    </div>
  )
}
\`\`\`

\`\`\`jsx
// ClientComponent.js (runs on client)
'use client'
import { useState } from 'react'

export function ClientComponent({ post }) {
  const [liked, setLiked] = useState(false)
  
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={() => setLiked(!liked)}>
        {liked ? '❤️' : '🤍'}
      </button>
    </article>
  )
}
\`\`\`

## Performance Benefits

### Bundle Size Reduction

One of the most immediate benefits is the dramatic reduction in bundle size. Consider this comparison:

**Traditional Approach:**
- Database ORM: ~50KB
- Utility libraries: ~30KB
- Server-side logic: ~20KB
- **Total client bundle increase: ~100KB**

**With RSCs:**
- All server dependencies: **0KB** (server-only)
- Only client interactions bundled

### Improved Time to Interactive (TTI)

RSCs can significantly improve TTI by:

1. **Reducing JavaScript parsing time**
2. **Eliminating waterfall requests** for data
3. **Streaming content** as it becomes available

## Data Fetching Patterns

### Direct Database Access

\`\`\`jsx
// posts/page.js
import { prisma } from '@/lib/prisma'

export default async function PostsPage() {
  // This runs on the server - no API route needed!
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
\`\`\`

### Parallel Data Fetching

\`\`\`jsx
async function Dashboard() {
  // These fetch in parallel!
  const [user, posts, analytics] = await Promise.all([
    getUser(),
    getPosts(),
    getAnalytics()
  ])

  return (
    <div>
      <UserProfile user={user} />
      <PostsList posts={posts} />
      <AnalyticsDashboard data={analytics} />
    </div>
  )
}
\`\`\`

## Advanced Patterns

### Composition with Suspense

RSCs work beautifully with React Suspense for granular loading states:

\`\`\`jsx
export default function Page() {
  return (
    <div>
      <Suspense fallback={<PostsSkeleton />}>
        <PostsList />
      </Suspense>
      <Suspense fallback={<CommentsSkeleton />}>
        <CommentsList />
      </Suspense>
    </div>
  )
}
\`\`\`

### Streaming Responses

RSCs enable streaming, where different parts of your page can load and display as soon as their data is ready:

\`\`\`jsx
// This component streams in when user data is ready
async function UserProfile({ userId }) {
  const user = await fetchUser(userId) // Fast query
  
  return (
    <div>
      <h1>{user.name}</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <UserPosts userId={userId} /> {/* Slower query, streams later */}
      </Suspense>
    </div>
  )
}
\`\`\`

## Migration Strategies

### Incremental Adoption

You don't need to rewrite everything at once:

1. **Start with leaf components** that only display data
2. **Move data fetching** from \`useEffect\` to server components
3. **Gradually eliminate** client-side API calls

### Component Boundary Rules

Remember these key rules when designing your component tree:

- **Server components can import and render other server components**
- **Server components can pass data to client components as props**
- **Client components cannot import server components**
- **Use the "use client" directive** to mark client boundaries

## Common Pitfalls and Solutions

### Pitfall 1: Trying to Use Client APIs in Server Components

\`\`\`jsx
// ❌ This won't work
export default function ServerComponent() {
  const [count, setCount] = useState(0) // Error!
  return <div>{count}</div>
}

// ✅ This works
'use client'
export default function ClientComponent() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}
\`\`\`

### Pitfall 2: Passing Non-Serializable Props

\`\`\`jsx
// ❌ Functions can't be serialized
<ClientComponent onSubmit={handleSubmit} />

// ✅ Use a client component wrapper instead
function ServerComponent() {
  return <ClientWrapper />
}

function ClientWrapper() {
  const handleSubmit = () => { /* ... */ }
  return <ClientComponent onSubmit={handleSubmit} />
}
\`\`\`

## Real-World Performance Impact

In production applications, teams have reported:

- **30-50% reduction** in client bundle size
- **20-40% improvement** in First Contentful Paint (FCP)
- **15-25% improvement** in Time to Interactive (TTI)
- **Significantly reduced** Cumulative Layout Shift (CLS)

## The Future of RSCs

React Server Components are still evolving, with exciting developments on the horizon:

- **Better dev tools** for debugging server/client boundaries
- **Improved caching strategies** for server-rendered content
- **Enhanced streaming capabilities** with selective hydration
- **Tighter integration** with meta-frameworks like Next.js and Remix

## Conclusion

React Server Components represent a fundamental shift toward a more efficient, performant web. By moving computation back to the server where appropriate, we can deliver faster, more responsive applications while maintaining the developer experience we love about React.

The key is understanding when to use server components versus client components, and designing your application architecture with clear boundaries between server and client concerns.

As the ecosystem continues to mature, RSCs will likely become the default way to build React applications, making today's learning investment crucial for future-ready development skills`,
  },
  {
    id: 2,
    title: "Building Type-Safe APIs with tRPC and TypeScript",
    slug: "building-type-safe-apis-trpc-typescript",
    excerpt:
      "tRPC provides end-to-end type safety for your API without code generation. Learn how to build scalable, type-safe APIs that automatically sync types between your frontend and backend.",
    author: "Theo Browne",
    date: "2024-01-10",
    readTime: "15 min read",
    category: "Backend",
    tags: ["TypeScript", "tRPC", "API", "Fullstack"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    likeCount: 286,
    commentCount: 34,
    viewCount: 4230,
    content: `# Building Type-Safe APIs with tRPC and TypeScript

In the modern web development landscape, maintaining type safety across your entire stack can be challenging. Enter tRPC (TypeScript Remote Procedure Call), a library that provides end-to-end type safety from your backend to your frontend without code generation.

## What is tRPC?

tRPC allows you to easily build & consume fully typesafe APIs without schemas or code generation. It leverages TypeScript's powerful type system to provide compile-time guarantees that your API calls will work correctly.

### Key Benefits

- **End-to-end type safety**: Share types between client and server
- **No code generation**: Types are inferred automatically
- **Excellent DX**: Autocomplete, refactoring, and error catching
- **Framework agnostic**: Works with any frontend/backend setup
- **Lightweight**: Minimal runtime overhead

## Setting Up Your First tRPC API

Let's build a simple blog API to demonstrate tRPC's capabilities.

### Server Setup

First, install the necessary dependencies:

\`\`\`bash
npm install @trpc/server @trpc/client @trpc/react-query @trpc/next
npm install zod  # For input validation
\`\`\`

Create your tRPC router:

\`\`\`typescript
// server/trpc.ts
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

// Initialize tRPC
const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure

// Define your API schema
export const appRouter = router({
  // Get all posts
  getPosts: publicProcedure
    .query(async () => {
      // This would typically come from a database
      return [
        { id: 1, title: 'Hello tRPC', content: 'This is my first post!' },
        { id: 2, title: 'Type Safety', content: 'tRPC is amazing!' },
      ]
    }),
  
  // Get a single post
  getPost: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .query(async ({ input }) => {
      // Find post by ID
      const post = await findPostById(input.id)
      if (!post) {
        throw new Error('Post not found')
      }
      return post
    }),
  
  // Create a new post
  createPost: publicProcedure
    .input(z.object({
      title: z.string().min(1),
      content: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      // Create post in database
      const newPost = await createPost(input)
      return newPost
    }),
})

export type AppRouter = typeof appRouter
\`\`\`

### Next.js API Integration

Create an API handler for Next.js:

\`\`\`typescript
// pages/api/trpc/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next'
import { appRouter } from '../../../server/trpc'

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}), // Context will be covered later
})
\`\`\`

### Client Setup

Set up the tRPC client:

\`\`\`typescript
// utils/trpc.ts
import { createTRPCNext } from '@trpc/next'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../server/trpc'

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
    }
  },
  ssr: false, // Enable if you want SSR
})
\`\`\`

Wrap your app with the tRPC provider:

\`\`\`typescript
// pages/_app.tsx
import type { AppType } from 'next/app'
import { trpc } from '../utils/trpc'

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)
\`\`\`

## Using tRPC in Your Components

Now you can use your API with full type safety:

\`\`\`typescript
// components/PostList.tsx
import { trpc } from '../utils/trpc'

export function PostList() {
  const { data: posts, isLoading, error } = trpc.getPosts.useQuery()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      {posts?.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}
\`\`\`

\`\`\`typescript
// components/CreatePost.tsx
import { useState } from 'react'
import { trpc } from '../utils/trpc'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  
  const utils = trpc.useContext()
  const createPost = trpc.createPost.useMutation({
    onSuccess: () => {
      // Invalidate and refetch posts
      utils.getPosts.invalidate()
      setTitle('')
      setContent('')
    }
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createPost.mutate({ title, content })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post content"
        required
      />
      <button type="submit" disabled={createPost.isLoading}>
        {createPost.isLoading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  )
}
\`\`\`

## Advanced Patterns

### Context and Authentication

tRPC's context feature allows you to share data across procedures:

\`\`\`typescript
// server/context.ts
import { inferAsyncReturnType } from '@trpc/server'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import jwt from 'jsonwebtoken'

export async function createContext({ req }: CreateNextContextOptions) {
  // Get user from JWT token
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
        return await getUserById(decoded.userId)
      } catch {
        return null
      }
    }
    return null
  }

  const user = await getUserFromHeader()

  return {
    user,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
\`\`\`

Create protected procedures:

\`\`\`typescript
// server/trpc.ts
import { initTRPC, TRPCError } from '@trpc/server'
import type { Context } from './context'

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

// Protected procedure that requires authentication
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  })
})

export const appRouter = router({
  // Public endpoint
  getPosts: publicProcedure.query(() => { /* ... */ }),
  
  // Protected endpoint
  createPost: protectedProcedure
    .input(z.object({
      title: z.string(),
      content: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      // ctx.user is guaranteed to exist here
      return await createPost({
        ...input,
        authorId: ctx.user.id,
      })
    }),
})
\`\`\`

### Input Validation with Zod

tRPC integrates seamlessly with Zod for robust input validation:

\`\`\`typescript
const PostInput = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title too long'),
  content: z.string()
    .min(10, 'Content must be at least 10 characters')
    .max(5000, 'Content too long'),
  tags: z.array(z.string()).optional(),
  published: z.boolean().default(false),
})

export const appRouter = router({
  createPost: protectedProcedure
    .input(PostInput)
    .mutation(async ({ input, ctx }) => {
      // input is fully typed and validated!
      return await createPost({
        ...input,
        authorId: ctx.user.id,
      })
    }),
})
\`\`\`

### Error Handling

tRPC provides structured error handling:

\`\`\`typescript
import { TRPCError } from '@trpc/server'

export const appRouter = router({
  deletePost: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const post = await findPostById(input.id)
      
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        })
      }
      
      if (post.authorId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only delete your own posts',
        })
      }
      
      await deletePost(input.id)
      return { success: true }
    }),
})
\`\`\`

Handle errors on the client:

\`\`\`typescript
const deletePost = trpc.deletePost.useMutation({
  onError: (error) => {
    if (error.data?.code === 'NOT_FOUND') {
      toast.error('Post not found')
    } else if (error.data?.code === 'FORBIDDEN') {
      toast.error('You cannot delete this post')
    } else {
      toast.error('An unexpected error occurred')
    }
  },
  onSuccess: () => {
    toast.success('Post deleted successfully')
    utils.getPosts.invalidate()
  }
})
\`\`\`

## Performance Optimizations

### Request Batching

tRPC automatically batches requests made within a short time window:

\`\`\`typescript
// These calls will be batched into a single HTTP request
const posts = trpc.getPosts.useQuery()
const categories = trpc.getCategories.useQuery()
const user = trpc.getUser.useQuery()
\`\`\`

### Optimistic Updates

Implement optimistic updates for better UX:

\`\`\`typescript
const likePost = trpc.likePost.useMutation({
  onMutate: async ({ postId }) => {
    // Cancel outgoing refetches
    await utils.getPost.cancel({ id: postId })
    
    // Snapshot the previous value
    const previousPost = utils.getPost.getData({ id: postId })
    
    // Optimistically update
    utils.getPost.setData({ id: postId }, (old) => {
      if (!old) return old
      return {
        ...old,
        likes: old.likes + 1,
        isLiked: true,
      }
    })
    
    return { previousPost }
  },
  onError: (err, { postId }, context) => {
    // Rollback on error
    utils.getPost.setData({ id: postId }, context?.previousPost)
  },
  onSettled: (data, error, { postId }) => {
    // Always refetch after error or success
    utils.getPost.invalidate({ id: postId })
  },
})
\`\`\`

## Testing tRPC APIs

tRPC procedures are just functions, making them easy to test:

\`\`\`typescript
// __tests__/api.test.ts
import { appRouter } from '../server/trpc'

describe('tRPC API', () => {
  it('should create a post', async () => {
    const ctx = {
      user: { id: 1, name: 'Test User' }
    }
    
    const caller = appRouter.createCaller(ctx)
    
    const result = await caller.createPost({
      title: 'Test Post',
      content: 'This is a test post',
    })
    
    expect(result).toMatchObject({
      title: 'Test Post',
      content: 'This is a test post',
      authorId: 1,
    })
  })
})
\`\`\`

## Deployment Considerations

### Environment Setup

\`\`\`typescript
// server/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
})

export const env = envSchema.parse(process.env)
\`\`\`

### Production Optimizations

1. **Enable request batching** for reduced network overhead
2. **Implement proper caching** strategies
3. **Use connection pooling** for database connections
4. **Monitor performance** with APM tools

## Conclusion

tRPC revolutionizes API development by providing end-to-end type safety without the complexity of code generation. It seamlessly bridges the gap between your frontend and backend, catching errors at compile time and providing an exceptional developer experience.

Key takeaways:

- **Type safety**: Catch API errors before they reach production
- **Developer experience**: Excellent autocomplete and refactoring support
- **Performance**: Built-in optimizations like request batching
- **Flexibility**: Works with any database or framework
- **Testing**: Easy to test due to functional approach

As TypeScript continues to dominate the web development landscape, tRPC positions itself as an essential tool for building robust, type-safe applications that scale.`,
  },
  {
    id: 3,
    title: "Modern CSS: Container Queries and the Future of Responsive Design",
    slug: "modern-css-container-queries-responsive-design",
    excerpt:
      "Container queries allow components to respond to their container's size rather than the viewport. This revolutionary CSS feature enables truly modular, responsive components.",
    author: "Una Kravets",
    date: "2024-01-08",
    readTime: "8 min read",
    category: "CSS",
    tags: ["CSS", "Responsive Design", "Web Standards", "Frontend"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    likeCount: 198,
    commentCount: 15,
    viewCount: 3120,
    content: `# Modern CSS: Container Queries and the Future of Responsive Design

For over a decade, responsive web design has relied on media queries that respond to viewport dimensions. But what if our components could respond to their own container size instead? Enter container queries—a revolutionary CSS feature that's changing how we think about responsive design.

## The Problem with Media Queries

Traditional responsive design has a fundamental limitation:

\`\`\`css
/* This only knows about the viewport */
@media (max-width: 768px) {
  .card {
    flex-direction: column;
  }
}
\`\`\`

But what if that same card component needs to behave differently when it's in a sidebar versus the main content area? Media queries can't help us here because they don't know about the component's context.

## Enter Container Queries

Container queries solve this by allowing elements to respond to their containing block's size:

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (max-width: 400px) {
  .card {
    flex-direction: column;
  }
  
  .card-image {
    width: 100%;
  }
}
\`\`\`

## Setting Up Container Queries

### Basic Syntax

First, establish a containment context:

\`\`\`css
.container {
  container-type: inline-size; /* width-based queries */
  /* or */
  container-type: size; /* width and height queries */
  /* or */
  container-type: normal; /* no containment */
}
\`\`\`

Then query the container:

\`\`\`css
@container (min-width: 400px) {
  .child-element {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
\`\`\`

### Named Containers

For complex layouts, name your containers:

\`\`\`css
.sidebar {
  container-name: sidebar;
  container-type: inline-size;
}

.main-content {
  container-name: main;
  container-type: inline-size;
}

@container sidebar (max-width: 300px) {
  .widget {
    padding: 0.5rem;
  }
}

@container main (min-width: 600px) {
  .widget {
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
\`\`\`

## Real-World Examples

### Responsive Card Component

Let's build a card that adapts to any container:

\`\`\`html
<div class="card-container">
  <article class="card">
    <img src="image.jpg" alt="" class="card-image">
    <div class="card-content">
      <h2 class="card-title">Article Title</h2>
      <p class="card-description">Article description...</p>
      <div class="card-actions">
        <button>Read More</button>
        <button>Share</button>
      </div>
    </div>
  </article>
</div>
\`\`\`

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Default: horizontal layout */
.card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.card-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.card-content {
  flex: 1;
}

/* Small container: vertical layout */
@container card (max-width: 400px) {
  .card {
    flex-direction: column;
  }
  
  .card-image {
    width: 100%;
    height: 200px;
  }
  
  .card-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .card-actions button {
    flex: 1;
  }
}

/* Tiny container: minimal layout */
@container card (max-width: 250px) {
  .card {
    padding: 0.5rem;
  }
  
  .card-title {
    font-size: 1rem;
  }
  
  .card-description {
    display: none; /* Hide description in very small containers */
  }
}
\`\`\`

### Responsive Navigation

Create a navigation that adapts based on available space:

\`\`\`css
.nav-container {
  container-type: inline-size;
  container-name: navigation;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
  list-style: none;
}

/* Medium container: show some links */
@container navigation (max-width: 600px) {
  .nav-links li:nth-child(n+4) {
    display: none;
  }
  
  .nav-more {
    display: block;
  }
}

/* Small container: hamburger menu */
@container navigation (max-width: 400px) {
  .nav-links {
    display: none;
  }
  
  .nav-hamburger {
    display: block;
  }
}
\`\`\`

## Advanced Techniques

### Container Query Units

Container queries introduce new units:

- **cqw**: 1% of container's width
- **cqh**: 1% of container's height  
- **cqi**: 1% of container's inline size
- **cqb**: 1% of container's block size
- **cqmin**: smaller of cqi or cqb
- **cqmax**: larger of cqi or cqb

\`\`\`css
.responsive-text {
  font-size: clamp(1rem, 4cqi, 3rem);
  padding: 2cqi;
}

.dynamic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20cqi, 1fr));
  gap: 2cqi;
}
\`\`\`

### Style Queries (Future)

Style queries will allow querying CSS properties:

\`\`\`css
/* Future syntax */
@container style(--theme: dark) {
  .button {
    background: #333;
    color: white;
  }
}
\`\`\`

## Design Patterns

### The Switcher Pattern

Automatically switch between horizontal and vertical layouts:

\`\`\`css
.switcher {
  container-type: inline-size;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.switcher > * {
  flex-grow: 1;
  flex-basis: calc((30rem - 100%) * 999);
}

@container (max-width: 30rem) {
  .switcher {
    flex-direction: column;
  }
}
\`\`\`

### The Pancake Stack

Stack items vertically with a flexible middle:

\`\`\`css
.pancake-container {
  container-type: size;
  min-height: 300px;
}

.pancake {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.pancake-middle {
  flex: 1;
}

@container (max-height: 200px) {
  .pancake {
    justify-content: center;
  }
  
  .pancake-header,
  .pancake-footer {
    display: none;
  }
}
\`\`\`

## Performance Considerations

### Layout Containment

Container queries work best with proper containment:

\`\`\`css
.container {
  container-type: inline-size;
  contain: layout style; /* Optimize performance */
}
\`\`\`

### Avoiding Layout Thrashing

Be careful not to create circular dependencies:

\`\`\`css
/* ❌ Don't do this - can cause infinite loops */
.container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .container {
    width: 300px; /* This changes the container size! */
  }
}
\`\`\`

## Browser Support and Fallbacks

Container queries have excellent modern browser support, but provide fallbacks:

\`\`\`css
/* Fallback styles */
.card {
  display: block;
}

/* Progressive enhancement */
@supports (container-type: inline-size) {
  .card-container {
    container-type: inline-size;
  }
  
  .card {
    display: flex;
  }
  
  @container (max-width: 400px) {
    .card {
      flex-direction: column;
    }
  }
}
\`\`\`

## Tools and Resources

### Development Tools

1. **Chrome DevTools**: Container query support in Elements panel
2. **Firefox DevTools**: Container debugging features
3. **Polyfills**: Limited support via JavaScript

### CSS Frameworks

Many frameworks are adding container query support:

\`\`\`css
/* Tailwind CSS example */
<div class="@container">
  <div class="@lg:flex @lg:gap-4">
    <!-- Content adapts to container, not viewport -->
  </div>
</div>
\`\`\`

## Best Practices

### 1. Start with Content

Design components based on their content needs, not arbitrary breakpoints:

\`\`\`css
@container (max-width: 25ch) {
  .article-meta {
    flex-direction: column;
  }
}
\`\`\`

### 2. Use Semantic Naming

Name containers based on their purpose:

\`\`\`css
.product-card-container {
  container-name: product-card;
  container-type: inline-size;
}
\`\`\`

### 3. Combine with Media Queries

Use both for comprehensive responsive design:

\`\`\`css
/* Global layout changes */
@media (max-width: 768px) {
  .main-layout {
    grid-template-columns: 1fr;
  }
}

/* Component-level changes */
@container sidebar (max-width: 300px) {
  .widget {
    padding: 0.5rem;
  }
}
\`\`\`

## The Future of Responsive Design

Container queries represent a paradigm shift toward:

- **Component-driven responsive design**
- **Truly reusable UI components**
- **Intrinsic web design principles**
- **Container-aware design systems**

## Conclusion

Container queries mark the beginning of a new era in responsive design. By allowing components to respond to their immediate context rather than the global viewport, we can create more resilient, reusable, and intuitive user interfaces.

The shift from viewport-based to container-based responsive design will:

- **Simplify component development**
- **Improve design system consistency**
- **Enable truly modular CSS architecture**
- **Reduce the complexity of responsive layouts**

As browser support continues to improve and developer adoption grows, container queries will become as fundamental to web development as flexbox and grid are today.`,
  },
  {
    id: 4,
    title: "Database Indexing Strategies for Million+ Record Tables",
    slug: "database-indexing-strategies-million-records",
    excerpt:
      "Learn advanced indexing techniques, query optimization, and database design patterns that can handle massive scale. Real-world examples from production systems processing billions of records.",
    author: "Kelsey Hightower",
    date: "2024-01-05",
    readTime: "18 min read",
    category: "Database",
    tags: ["Database", "PostgreSQL", "Performance", "Backend"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    likeCount: 425,
    commentCount: 52,
    viewCount: 6830,
    content: `# Database Indexing Strategies for Million+ Record Tables

As web applications grow, so do their databases. Handling millions or even billions of records is not uncommon. However, with great data comes great responsibility... and complexity. Proper indexing is crucial to ensure your database remains performant at scale.

## Why Indexing Matters

Without proper indexing, queries can become slow and unwieldy. Consider this example:

\`\`\`sql
SELECT * FROM posts WHERE author_id = 12345;
\`\`\`

If the \`posts\` table has no index on \`author_id\`, this query will result in a full table scan, which is slow and resource-intensive.

## Types of Indexes

### 1. B-Tree Indexes

The default and most common type of index. It maintains a sorted tree structure, allowing for fast lookups, additions, and deletions.

- **Use Cases**: Equality and range queries.
- **Limitations**: Not ideal for very large text fields.

### 2. Hash Indexes

These use a hash table where the keys are the indexed columns. They are very fast for equality comparisons.

- **Use Cases**: Fast lookups by exact match.
- **Limitations**: Cannot be used for range queries, and the hash table can consume a lot of memory.

### 3. GiST Indexes

Generalized Search Tree indexes are flexible and can be used for various data types, including geometric data.

- **Use Cases**: Full-text search, spatial data.
- **Limitations**: More complex and slower to update than B-Tree indexes.

### 4. GIN Indexes

Generalized Inverted Indexes are used for values that contain multiple components, like arrays.

- **Use Cases**: Full-text search, JSONB columns in PostgreSQL.
- **Limitations**: Slower to insert and update.

### 5. SP-GiST Indexes

Space-Partitioned Generalized Search Tree indexes are useful for data that is naturally hierarchical or multi-dimensional.

- **Use Cases**: Geometric data, hierarchical data.
- **Limitations**: More complex to maintain.

## When to Index

Not every column needs an index. Consider indexing:

- Columns used in \`WHERE\` clauses.
- Columns used in \`JOIN\` conditions.
- Columns used in \`ORDER BY\` and \`GROUP BY\` clauses.
- Foreign keys.

## When Not to Index

Avoid indexing:

- Columns with low cardinality (e.g., boolean flags).
- Columns that are frequently updated.
- Very large text fields.

## Indexing Strategies

### 1. Start with the Basics

Ensure that all foreign keys and columns used in \`WHERE\` clauses are indexed.

### 2. Analyze Query Performance

Use tools like PostgreSQL's \`EXPLAIN\` to analyze query performance and adjust indexes accordingly.

### 3. Consider Partial Indexes

If you often query a subset of data, consider a partial index:

\`\`\`sql
CREATE INDEX idx_active_users ON users (last_login)
WHERE active = true;
\`\`\`

### 4. Use Composite Indexes Wisely

If you often query multiple columns together, a composite index can be beneficial:

\`\`\`sql
CREATE INDEX idx_post_author_date ON posts (author_id, created_at);
\`\`\`

### 5. Regularly Monitor and Maintain

Regularly check index usage and query performance. Remove or adjust indexes that are not being used or are slowing down write operations.

## Real-World Example: Optimizing a Blog Platform

Imagine we have a simple blog platform with the following tables:

- \`users\`: Stores user information.
- \`posts\`: Stores blog posts.
- \`comments\`: Stores comments on posts.

### Initial Setup

Without any indexes, a query to fetch a user's posts might look like this:

\`\`\`sql
SELECT * FROM posts WHERE author_id = 12345;
\`\`\`

This will be slow if the \`posts\` table has millions of records.

### Adding Indexes

1. **Index the foreign key**:

\`\`\`sql
CREATE INDEX idx_posts_author_id ON posts (author_id);
\`\`\`

2. **Analyze query performance**:

Use \`EXPLAIN\` to check if the query uses the index.

3. **Adjust based on findings**:

If the query is still slow, consider other indexes or query optimizations.

## Common Mistakes

1. **Over-Indexing**: Adding too many indexes can slow down \`INSERT\`, \`UPDATE\`, and \`DELETE\` operations.
2. **Under-Indexing**: Not having indexes on columns that are frequently queried can lead to poor performance.
3. **Ignoring Composite Indexes**: Forgetting to create composite indexes for columns that are often queried together.

## Conclusion

Proper indexing is crucial for maintaining database performance as your data grows. By understanding the different types of indexes and when to use them, you can ensure that your database remains responsive and efficient.

Regularly monitor your database performance and be prepared to adjust your indexing strategy as your application and data evolve.`,
  },
  {
    id: 5,
    title: "Machine Learning in JavaScript: TensorFlow.js in Production",
    slug: "machine-learning-javascript-tensorflow-production",
    excerpt:
      "Explore how to deploy machine learning models directly in the browser using TensorFlow.js. From image classification to real-time prediction, discover the possibilities of client-side ML.",
    author: "Cassie Kozyrkov",
    date: "2024-01-03",
    readTime: "14 min read",
    category: "AI/ML",
    tags: ["JavaScript", "Machine Learning", "TensorFlow", "AI"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    likeCount: 312,
    commentCount: 19,
    viewCount: 4560,
    content: `# Machine Learning in JavaScript: TensorFlow.js in Production

Machine learning is no longer confined to Python and server-side implementations. With TensorFlow.js, you can bring powerful ML capabilities directly to the browser, enabling real-time predictions, client-side privacy, and reduced server load.

## Getting Started

1. **Install TensorFlow.js**:

\`\`\`bash
npm install @tensorflow/tfjs
\`\`\`

2. **Load a Pre-trained Model**:

\`\`\`javascript
const model = await tf.loadGraphModel('model.json');
\`\`\`

3. **Make Predictions**:

\`\`\`javascript
const inputTensor = tf.tensor2d([inputData], [1, inputSize]);
const prediction = model.predict(inputTensor);
\`\`\`

TensorFlow.js opens up new possibilities for deploying machine learning models in web applications, providing flexibility and power to developers.`,
  },
  // 10 New High-Quality Blog Posts
  {
    id: 6,
    title: "WebAssembly: Bringing Near-Native Performance to the Web",
    slug: "webassembly-near-native-performance-web",
    excerpt:
      "Discover how WebAssembly is revolutionizing web performance by allowing languages like Rust, C++, and Go to run at near-native speeds in the browser. Learn when and how to use WASM in your projects.",
    author: "Lin Clark",
    date: "2024-01-20",
    readTime: "16 min read",
    category: "Performance",
    tags: ["WebAssembly", "Performance", "Rust", "C++", "Web Standards"],
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
    likeCount: 389,
    commentCount: 31,
    viewCount: 5890,
    content: `# WebAssembly: Bringing Near-Native Performance to the Web

WebAssembly (WASM) represents a paradigm shift in web development, enabling developers to run code written in languages like Rust, C++, and Go at near-native speeds in the browser.

## What is WebAssembly?

WebAssembly is a binary instruction format designed as a portable compilation target for programming languages. It runs alongside JavaScript and can be called from JavaScript, creating powerful hybrid applications.

## Key Benefits

- **Performance**: Near-native execution speed
- **Language Choice**: Use any language that compiles to WASM
- **Security**: Runs in a sandboxed environment
- **Portability**: Works across all modern browsers

## Getting Started with Rust and WASM

\`\`\`rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}
\`\`\`

WebAssembly opens up new possibilities for computationally intensive web applications while maintaining the security and portability of the web platform.`,
  },
  {
    id: 7,
    title: "Advanced Git Workflows: Mastering Large-Scale Collaboration",
    slug: "advanced-git-workflows-large-scale-collaboration",
    excerpt:
      "Learn sophisticated Git strategies used by major tech companies. From Git hooks to advanced branching strategies, discover how to manage complex codebases with hundreds of developers.",
    author: "Scott Chacon",
    date: "2024-01-18",
    readTime: "13 min read",
    category: "DevOps",
    tags: ["Git", "DevOps", "Collaboration", "Version Control", "Workflow"],
    image:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop",
    likeCount: 267,
    commentCount: 22,
    viewCount: 4120,
    content: `# Advanced Git Workflows: Mastering Large-Scale Collaboration

Managing code across hundreds of developers requires sophisticated Git workflows. This guide explores advanced strategies used by major tech companies to maintain code quality and development velocity.

## Enterprise Git Strategies

### GitFlow for Release Management

\`\`\`bash
# Initialize GitFlow
git flow init

# Start a new feature
git flow feature start user-authentication

# Finish the feature
git flow feature finish user-authentication
\`\`\`

## Advanced Git Hooks

Pre-commit hooks ensure code quality before commits reach the repository, while post-receive hooks can trigger automated deployments and notifications.

This comprehensive approach to Git workflows enables teams to scale effectively while maintaining code quality and development velocity.`,
  },
  {
    id: 8,
    title: "Micro-Frontends: Scaling Frontend Architecture for Enterprise",
    slug: "micro-frontends-scaling-architecture-enterprise",
    excerpt:
      "Explore how micro-frontends enable independent teams to build and deploy frontend applications at scale. Learn architectural patterns, integration strategies, and real-world implementation approaches.",
    author: "Cam Jackson",
    date: "2024-01-16",
    readTime: "20 min read",
    category: "Architecture",
    tags: [
      "Micro-frontends",
      "Architecture",
      "React",
      "Module Federation",
      "Enterprise",
    ],
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
    likeCount: 456,
    commentCount: 38,
    viewCount: 7240,
    content: `# Micro-Frontends: Scaling Frontend Architecture for Enterprise

As organizations grow, so does the complexity of their frontend applications. Micro-frontends offer a solution by breaking down monolithic frontend applications into smaller, manageable pieces.

## What Are Micro-Frontends?

Micro-frontends extend the microservices concept to frontend development, allowing teams to:
- Work independently on different parts of an application
- Use different technologies and frameworks
- Deploy features independently
- Scale development teams effectively

## Implementation with Module Federation

\`\`\`javascript
// webpack.config.js - Host application
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        header: 'header@http://localhost:3001/remoteEntry.js',
      },
    }),
  ],
};
\`\`\`

Micro-frontends enable organizations to scale their frontend development effectively while maintaining team autonomy and technological diversity.`,
  },
  {
    id: 9,
    title: "Serverless at Scale: AWS Lambda Performance Optimization",
    slug: "serverless-scale-aws-lambda-performance-optimization",
    excerpt:
      "Master advanced serverless patterns for high-scale applications. Learn cold start optimization, memory management, and architectural patterns that work at enterprise scale.",
    author: "Jeremy Daly",
    date: "2024-01-14",
    readTime: "17 min read",
    category: "Serverless",
    tags: ["AWS", "Lambda", "Serverless", "Performance", "Cloud"],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    likeCount: 378,
    commentCount: 29,
    viewCount: 5670,
    content: `# Serverless at Scale: AWS Lambda Performance Optimization

Serverless computing has revolutionized application deployment, but scaling serverless to enterprise levels requires deep understanding of performance optimization and architectural patterns.

## Cold Start Optimization

\`\`\`javascript
// Minimize initialization code
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const result = await dynamodb.get({
    TableName: 'MyTable',
    Key: { id: event.id }
  }).promise();
  
  return {
    statusCode: 200,
    body: JSON.stringify(result.Item)
  };
};
\`\`\`

## Memory and CPU Optimization

Memory allocation directly affects CPU allocation in Lambda. Understanding this relationship is crucial for performance optimization.

Serverless at scale requires careful attention to performance, cost, and reliability. These patterns enable building robust, efficient serverless applications.`,
  },
  {
    id: 10,
    title: "GraphQL Federation: Building Distributed Graph APIs",
    slug: "graphql-federation-distributed-graph-apis",
    excerpt:
      "Learn how to build scalable GraphQL architectures using federation. Discover how to compose multiple GraphQL services into a unified graph while maintaining team autonomy.",
    author: "Apollo Team",
    date: "2024-01-12",
    readTime: "19 min read",
    category: "GraphQL",
    tags: ["GraphQL", "Federation", "Microservices", "API", "Apollo"],
    image:
      "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=400&fit=crop",
    likeCount: 334,
    commentCount: 27,
    viewCount: 4890,
    content: `# GraphQL Federation: Building Distributed Graph APIs

GraphQL Federation enables organizations to build a unified graph from multiple GraphQL services, allowing teams to work independently while providing clients with a single API.

## Understanding Federation

\`\`\`graphql
# Users service schema
type User @key(fields: "id") {
  id: ID!
  name: String!
  email: String!
}

# Posts service schema
extend type User @key(fields: "id") {
  posts: [Post!]!
}
\`\`\`

## Gateway Configuration

\`\`\`javascript
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'users', url: 'http://localhost:4001' },
      { name: 'posts', url: 'http://localhost:4002' },
    ],
  }),
});
\`\`\`

Federation enables building scalable, distributed graph APIs while maintaining team autonomy and service boundaries.`,
  },
  {
    id: 11,
    title: "Cybersecurity for Developers: Secure Coding Practices",
    slug: "cybersecurity-developers-secure-coding-practices",
    excerpt:
      "Essential security practices every developer must know. From input validation to authentication, learn how to build secure applications and protect against common vulnerabilities.",
    author: "Troy Hunt",
    date: "2024-01-25",
    readTime: "22 min read",
    category: "Security",
    tags: [
      "Security",
      "OWASP",
      "Authentication",
      "Encryption",
      "Best Practices",
    ],
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    likeCount: 512,
    commentCount: 45,
    viewCount: 8940,
    content: `# Cybersecurity for Developers: Secure Coding Practices

Security isn't an afterthought—it's a fundamental aspect of software development. This comprehensive guide covers essential security practices that every developer should implement from day one.

## Input Validation and Sanitization

\`\`\`javascript
const validator = require('validator');

class InputValidator {
  static validateEmail(email) {
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email format');
    }
    return validator.normalizeEmail(email);
  }
  
  static sanitizeInput(input) {
    return xss(input, { whiteList: { p: [], br: [] } });
  }
}
\`\`\`

## SQL Injection Prevention

\`\`\`javascript
// ✅ Using parameterized queries
const getUserById = (id) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  return db.query(query, [id]);
};
\`\`\`

Security is everyone's responsibility. By implementing these practices, developers can build applications that protect user data and maintain trust.`,
  },
  {
    id: 12,
    title: "Kubernetes in Production: Best Practices and Patterns",
    slug: "kubernetes-production-best-practices-patterns",
    excerpt:
      "Master Kubernetes for production environments. Learn about resource management, security hardening, monitoring, and deployment strategies that scale from startups to enterprises.",
    author: "Kelsey Hightower",
    date: "2024-01-23",
    readTime: "25 min read",
    category: "DevOps",
    tags: [
      "Kubernetes",
      "DevOps",
      "Production",
      "Container Orchestration",
      "Cloud Native",
    ],
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop",
    likeCount: 445,
    commentCount: 39,
    viewCount: 6780,
    content: `# Kubernetes in Production: Best Practices and Patterns

Running Kubernetes in production requires careful planning, robust security practices, and comprehensive monitoring. This guide covers battle-tested patterns from real-world deployments.

## Resource Management

\`\`\`yaml
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: app
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
\`\`\`

## Security Hardening

\`\`\`yaml
apiVersion: v1
kind: Pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
  - name: app
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
\`\`\`

## Monitoring and Observability

Implementing comprehensive monitoring with Prometheus, Grafana, and distributed tracing ensures production reliability and performance visibility.

These patterns enable organizations to run Kubernetes reliably at scale while maintaining security and operational excellence.`,
  },
  {
    id: 13,
    title: "Real-Time Applications with WebSockets and Socket.IO",
    slug: "real-time-applications-websockets-socketio",
    excerpt:
      "Build interactive real-time applications using WebSockets and Socket.IO. Learn about connection management, scaling strategies, and implementing features like chat, live updates, and collaborative editing.",
    author: "Guillermo Rauch",
    date: "2024-01-21",
    readTime: "16 min read",
    category: "Real-time",
    tags: ["WebSockets", "Socket.IO", "Real-time", "Node.js", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    likeCount: 298,
    commentCount: 24,
    viewCount: 4560,
    content: `# Real-Time Applications with WebSockets and Socket.IO

Real-time functionality has become essential for modern web applications. From chat applications to live dashboards, WebSockets and Socket.IO provide the foundation for interactive experiences.

## WebSocket Fundamentals

\`\`\`javascript
// Client-side WebSocket
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = (event) => {
  console.log('Connected to WebSocket server');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateUI(data);
};
\`\`\`

## Socket.IO Server Setup

\`\`\`javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
\`\`\`

## Scaling Real-Time Applications

Using Redis adapter for horizontal scaling across multiple server instances ensures reliable message delivery in distributed environments.

Real-time features enhance user engagement and enable new types of collaborative applications that weren't possible with traditional HTTP polling.`,
  },
  {
    id: 14,
    title: "State Management Evolution: From Redux to Zustand and Beyond",
    slug: "state-management-evolution-redux-zustand-beyond",
    excerpt:
      "Explore the evolution of state management in React applications. Compare Redux, Zustand, Jotai, and other modern solutions to choose the right tool for your project's needs.",
    author: "Mark Erikson",
    date: "2024-01-19",
    readTime: "18 min read",
    category: "React",
    tags: ["React", "State Management", "Redux", "Zustand", "Jotai"],
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
    likeCount: 367,
    commentCount: 33,
    viewCount: 5240,
    content: `# State Management Evolution: From Redux to Zustand and Beyond

State management in React has evolved significantly over the years. From the early days of passing props down component trees to sophisticated global state solutions, let's explore the current landscape.

## The Redux Era

\`\`\`javascript
// Classic Redux setup
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const store = createStore(counterReducer);
\`\`\`

## Modern Zustand Approach

\`\`\`javascript
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// Usage in component
function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
}
\`\`\`

## Atomic State with Jotai

\`\`\`javascript
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count}
    </button>
  );
}
\`\`\`

Each state management solution has its strengths. Choose based on your application's complexity, team preferences, and performance requirements.`,
  },
  {
    id: 15,
    title: "Progressive Web Apps: Building App-Like Experiences",
    slug: "progressive-web-apps-building-app-like-experiences",
    excerpt:
      "Learn how to build Progressive Web Apps that provide native app-like experiences on the web. Covers service workers, caching strategies, offline functionality, and app installation.",
    author: "Jake Archibald",
    date: "2024-01-17",
    readTime: "21 min read",
    category: "PWA",
    tags: ["PWA", "Service Workers", "Offline", "Web Standards", "Mobile"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    likeCount: 289,
    commentCount: 26,
    viewCount: 4320,
    content: `# Progressive Web Apps: Building App-Like Experiences

Progressive Web Apps (PWAs) bridge the gap between web and native applications, providing app-like experiences through modern web technologies.

## Service Worker Registration

\`\`\`javascript
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('SW registered:', registration);
    })
    .catch((error) => {
      console.log('SW registration failed:', error);
    });
}
\`\`\`

## Caching Strategies

\`\`\`javascript
// sw.js - Service Worker
const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
\`\`\`

## Web App Manifest

\`\`\`json
{
  "name": "My Progressive Web App",
  "short_name": "MyPWA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
\`\`\`

PWAs enable web applications to provide native app-like experiences while maintaining the reach and accessibility of the web platform.`,
  },
];

export default blogPosts;

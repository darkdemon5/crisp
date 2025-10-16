const Easy = [
  {
    "question": "What is the difference between let, const, and var in JavaScript?",
    "options": [
      "They are identical ways to declare variables",
      "`let` and `const` are block-scoped while `var` is function-scoped",
      "`const` allows reassignment but `let` does not",
      "`var` and `const` are block-scoped while `let` is global"
    ],
    "answer": "`let` and `const` are block-scoped while `var` is function-scoped"
  },
  {
    "question": "In React, what are props and how are they different from state?",
    "options": [
      "Props are mutable data used for UI updates",
      "Props are immutable inputs passed from parent; state is internal component data",
      "Both props and state are mutable",
      "Props are stored in Redux, state is local"
    ],
    "answer": "Props are immutable inputs passed from parent; state is internal component data"
  },
  {
    "question": "What does useState do in React?",
    "options": [
      "Fetches data from an API",
      "Creates a local state variable and a setter function",
      "Defines a class component",
      "Sets up global state management"
    ],
    "answer": "Creates a local state variable and a setter function"
  },
  {
    "question": "What is the purpose of package.json in a Node.js project?",
    "options": [
      "Stores environment variables",
      "Defines project metadata and dependency list",
      "Holds the compiled source code",
      "Runs the Node.js runtime"
    ],
    "answer": "Defines project metadata and dependency list"
  },
  {
    "question": "How do you import and export modules in Node.js?",
    "options": [
      "Using `#include` and `export` keywords",
      "ESM uses `import/export`, CommonJS uses `require/module.exports`",
      "By linking HTML files together",
      "Modules are imported automatically"
    ],
    "answer": "ESM uses `import/export`, CommonJS uses `require/module.exports`"
  },
  {
    "question": "What is the difference between synchronous and asynchronous code in JavaScript?",
    "options": [
      "Synchronous blocks execution until finished; asynchronous runs without blocking",
      "Asynchronous is faster in all cases",
      "Synchronous always uses Promises",
      "There is no difference"
    ],
    "answer": "Synchronous blocks execution until finished; asynchronous runs without blocking"
  },
  {
    "question": "What is JSX in React and why is it used?",
    "options": [
      "A server configuration format",
      "A syntax extension that allows writing HTML in JavaScript",
      "A JSON parser for React",
      "A CSS-in-JS framework"
    ],
    "answer": "A syntax extension that allows writing HTML in JavaScript"
  },
  {
    "question": "In Node.js, what does npm install --save do?",
    "options": [
      "Deletes node_modules",
      "Installs a package and adds it to dependencies in package.json",
      "Creates a new Node project",
      "Runs a package"
    ],
    "answer": "Installs a package and adds it to dependencies in package.json"
  }
]
const Medium = [
  {
    "question": "How does the React Virtual DOM work and why is it efficient?",
    "options": [
      "It directly manipulates the real DOM on every change",
      "It keeps an in-memory DOM and updates only changed parts of the real DOM",
      "It replaces the real DOM entirely",
      "It compiles HTML into JavaScript"
    ],
    "answer": "It keeps an in-memory DOM and updates only changed parts of the real DOM"
  },
  {
    "question": "How would you set up routing in a React app?",
    "options": [
      "Using React Router with BrowserRouter, Routes, and Route components",
      "By manually tracking window.location",
      "By importing routes from Node.js",
      "React does not support routing"
    ],
    "answer": "Using React Router with BrowserRouter, Routes, and Route components"
  },
  {
    "question": "What is middleware in Express.js?",
    "options": [
      "A function that handles requests before they reach the route handler",
      "A React hook for API calls",
      "A MongoDB schema",
      "An HTML template engine"
    ],
    "answer": "A function that handles requests before they reach the route handler"
  },
  {
    "question": "How would you handle form validation in React?",
    "options": [
      "Using controlled components and validation logic or libraries like Formik/Yup",
      "By using Node.js validators",
      "By disabling submit button permanently",
      "React does not support form validation"
    ],
    "answer": "Using controlled components and validation logic or libraries like Formik/Yup"
  },
  {
    "question": "How would you secure API routes in Node.js + Express?",
    "options": [
      "By disabling CORS",
      "By using authentication middleware like JWT or sessions",
      "By moving routes to frontend",
      "By using HTTP instead of HTTPS"
    ],
    "answer": "By using authentication middleware like JWT or sessions"
  },
  {
    "question": "What is CORS and how would you enable it in Express?",
    "options": [
      "Cross-Origin Resource Sharing; enable with the cors middleware package",
      "Client Origin Request Service; enable via database",
      "Core Object Resource Syntax; enable in React Router",
      "A Node.js logging feature"
    ],
    "answer": "Cross-Origin Resource Sharing; enable with the cors middleware package"
  },
  {
    "question": "How do you connect a React frontend with a Node.js backend?",
    "options": [
      "By using API calls (fetch/axios) from React to Express endpoints",
      "By importing React into Node.js",
      "By running both on the same port",
      "By embedding Node.js into React components"
    ],
    "answer": "By using API calls (fetch/axios) from React to Express endpoints"
  },
  {
    "question": "What is the difference between REST and GraphQL?",
    "options": [
      "REST returns fixed data structures, GraphQL allows clients to specify needed fields",
      "REST is used only in frontend, GraphQL only in backend",
      "GraphQL uses HTTP while REST does not",
      "They are identical protocols"
    ],
    "answer": "REST returns fixed data structures, GraphQL allows clients to specify needed fields"
  }
]

const Hard = [
  {
    "question": "How does server-side rendering (SSR) with Next.js differ from client-side rendering in React?",
    "options": [
      "SSR renders pages on the server before sending HTML to client",
      "SSR only works with Vue.js",
      "Client-side rendering runs faster always",
      "SSR requires no React components"
    ],
    "answer": "SSR renders pages on the server before sending HTML to client"
  },
  {
    "question": "How would you implement JWT-based authentication in a full-stack app?",
    "options": [
      "Generate tokens on login and verify them on protected routes using middleware",
      "Store passwords directly in frontend state",
      "Use cookies without verification",
      "JWTs are not used for authentication"
    ],
    "answer": "Generate tokens on login and verify them on protected routes using middleware"
  },
  {
    "question": "How would you optimize a large React app for performance?",
    "options": [
      "By using code-splitting, memoization, lazy loading, and React.memo",
      "By using more class components",
      "By disabling caching",
      "By reducing component count"
    ],
    "answer": "By using code-splitting, memoization, lazy loading, and React.memo"
  },
  {
    "question": "What are React hooks rules and how does useEffect dependency array affect re-renders?",
    "options": [
      "Hooks must run at top level and dependencies control when effects run",
      "Hooks can run conditionally inside loops",
      "Dependency array has no effect",
      "Hooks work only in class components"
    ],
    "answer": "Hooks must run at top level and dependencies control when effects run"
  },
  {
    "question": "How would you design a scalable folder structure for a Node.js + React project?",
    "options": [
      "Separate concerns: src/components, src/pages, src/server, src/utils",
      "Put all files in one folder",
      "Randomly organize by file type",
      "Use a single index.js for everything"
    ],
    "answer": "Separate concerns: src/components, src/pages, src/server, src/utils"
  },
  {
    "question": "How do you implement real-time communication between React and Node.js?",
    "options": [
      "Using WebSockets or libraries like Socket.io",
      "By reloading the page repeatedly",
      "By sending emails",
      "By using localStorage"
    ],
    "answer": "Using WebSockets or libraries like Socket.io"
  },
  {
    "question": "If your Node.js API becomes slow under high traffic, how would you diagnose and fix it?",
    "options": [
      "Profile CPU and memory, optimize DB queries, use clustering and caching",
      "Add more console.log statements",
      "Reinstall Node.js",
      "Restart the server frequently"
    ],
    "answer": "Profile CPU and memory, optimize DB queries, use clustering and caching"
  },
  {
    "question": "How would you handle file uploads from React to Node.js securely?",
    "options": [
      "Use multipart/form-data with multer and store files in cloud storage like Firebase or AWS S3",
      "Convert files to JSON",
      "Send base64 in URL",
      "Save files directly in frontend"
    ],
    "answer": "Use multipart/form-data with multer and store files in cloud storage like Firebase or AWS S3"
  }
]


export const questionBank = { Easy, Medium, Hard };

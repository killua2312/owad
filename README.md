## Project OWAD

#### Overview
A Proof of Concept (PoC) OTT streaming platform with integrated ads.

#### Technical Stack

##### Backend
  - **Runtime Environment**: Node.js with Express.js
  - **Database**: MongoDB with Mongoose ODM
  - **Authentication**: JWT(JSON Web Tokens)
  - **Security**: bcrypt for password hashing
  - **Environment Management**: dotenv

##### Frontend
  - **Framework**: Next.js 14.0.4 (React 18)
  - **UI Components**: Shadcn/ui
  - **Styling**: Tailwind CSS
  - **Media Playback**: react-player
  - **Icons**: react-icons, lucide-react

#### Core Features

##### 1. Authentication System
  - Implemented secure user authentication using JWT
  - Role-based access control (User and Hunter roles)
  - Password encryption using bcrypt
  - Frontend authentication state management using Zustand

##### 2. Content Management
  - CRUD operations for media content
  - Role-based content management (Hunter role required)
  - Structured media scheme with:
    - Title, release date, rating
    - Genre classification
    - Content Summary
    - Thumbnail and video URLs
  - Media validation and error handling

##### 3. Video Player Integration
  - Custom vidoe player implementation with ad support
  - Scheduled advertisement system
  - Ad tracking and management
  - Seamless playback controls
  - Responsive design for various screen sizes

#### Architecture
##### Backend Architecture

###### Controllers:

  - MediaController: Handles media content operations
  - UserController: Manages user operations and authentication
  - WalletController: Handles wallet transactions


###### Middleware:

  - authenticationToken: JWT verification
  - isAdmin: Role-based access control
  - Error handling middleware


###### Models:

  - User: Username, email, password, role
  - Media: Content metadata and URLs
  - Wallet: User balance and transaction data



##### Frontend Architecture

###### Pages:

  - Home: Main content display
  - Authentication (Login/Signup)
  - Wallet management
  - Media upload (restricted to Hunter role)
  - Video player


###### Components:

  - Navbar: Navigation and user status
  - MediaList: Content display
  - Custom UI components using Radix primitives
  - Video player with ad integration


###### State Management:

  - Authentication state
  - Wallet state
  - Media state



#### Security Features

  - JWT-based authentication
  - Password hashing with bcrypt
  - Protected API endpoints
  - Role-based access control
  - CORS configuration
  - Secure password validation
  - Token-based API requests

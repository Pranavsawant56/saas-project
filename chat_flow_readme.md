# Project README & User Flow

## Overview
This is a modern, full-stack website template platform featuring a secure authentication system, personalized user experience, and a responsive frontend built with Next.js.

## Chat & User Flow Analysis
The "Chatflow" describes how a user interacts with the system from guest to authenticated user.

1. **Guest Visit**:
   - User lands on the homepage.
   - `Herobanner` displays promotional content and a `Sign up` section.
   - `Header` shows a generic `Sign Up` button.
   
2. **Authentication Flow**:
   - User clicks `Sign Up` -> Navigates to `/auth/signup`.
   - User submits form -> Backend saves user and sets a secure Cookie.
   - User is redirected to `/` -> `AuthContext` updates, Header replaces button with Profile Icon.
   
3. **Authenticated Experience**:
   - `Herobanner` now shows "Welcome back, [User Name]".
   - Promotional "Get started" boxes are hidden or replaced with personalized links.
   - User can access `/profile` via the Header Icon.

4. **Profile & Logout**:
   - User visits `/profile` to view account details.
   - User clicks `Log Out` -> Backend expires the cookie.
   - User redirected to `/auth/login` -> UI reverts to Guest state.

## Setup Instructions
1. **Backend**:
   - Navigate to `/backend`.
   - Ensure `.env` contains correct `MONGO_URI` and `JWT_SECRET`.
   - Run `npm install` and `npm start`.
2. **Frontend**:
   - Navigate to `/frontend`.
   - Run `npm install` and `npm run dev`.
   - Ensure backend is running on port 8000 for API requests.

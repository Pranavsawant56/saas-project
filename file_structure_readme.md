# Project File Structure - Multi-Template Project

This document provides a full list of all source files and important configurations in the project (excluding dependencies and build artifacts).

## Root Documentation
- backend_overview.txt
- chat_flow_readme.md
- documentation_prompt.txt
- frontend_overview.txt
- project_blueprint.txt
- file_structure_readme.md

## Backend (Express/Node.js)
- backend/.env
- backend/index.js
- backend/package.json
- backend/config/db.js
- backend/controllers/authController.js
- backend/controllers/templateController.js
- backend/controllers/userController.js
- backend/middleware/authMiddleware.js
- backend/models/Template.js
- backend/models/User.js
- backend/models/UserTemplate.js
- backend/routes/authRoutes.js
- backend/routes/templateRoutes.js
- backend/routes/userRoutes.js
- backend/utils/jwt.js

## Frontend (Next.js)
- frontend/package.json
- frontend/next.config.mjs
- frontend/postcss.config.mjs
- frontend/jsconfig.json
- frontend/eslint.config.mjs
- frontend/src/app/globals.css
- frontend/src/app/layout.js
- frontend/src/app/page.js
- frontend/src/app/favicon.ico
- frontend/src/app/auth/login/page.js
- frontend/src/app/auth/signup/page.js
- frontend/src/app/contact/page.js
- frontend/src/app/profile/page.js
- frontend/src/app/templates/page.js
- frontend/src/components/About.js
- frontend/src/components/Costumer.js
- frontend/src/components/Footer.js
- frontend/src/components/Header.js
- frontend/src/components/Herobanner.js
- frontend/src/components/Services.js
- frontend/src/context/AuthContext.js

## Public Assets
- frontend/public/hero-banner.png
- frontend/public/hero-new.png
- frontend/public/tekunik.png
- frontend/public/favicon.ico
- frontend/public/globe.svg
- frontend/public/next.svg
- frontend/public/vercel.svg
- frontend/public/window.svg

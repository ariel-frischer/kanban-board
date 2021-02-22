# Quick Kanban Style MERN Project

- Using React Beautiful DND ported into Typescript + MUI
- Please note, the status of posts are correctly saved, but not the order inside the status column.

## Getting Started

1. Unzip the repo/clone.
2. Project requires docker (docker-compose), lerna (monorepo management tool), node
(npm)
3. Run docker-compose up to create local mongo with included credentials
4. Run lerna bootstrap to install all required packages for backend/frontend
5. Run lerna run start to stand up backend/frontend services (These instructions did not work for my frontend. I had to separately use `npm run start:frontend` and `npm run start:backend`.)

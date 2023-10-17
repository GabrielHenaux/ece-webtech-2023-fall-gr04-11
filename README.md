# Welcome to our Lab 4 for the ECE Web Technologies Course!

This README will guide you through the initialization and basic usage of our React and Next.js based blogging website lab. We've utilized the best practices and tools to make it user-friendly and easy to understand.

## Table of Contents

1. [Installation](#installation)
2. [Starting the App](#starting-the-app)
3. [Structure](#structure)
    - [Website Skeleton](#website-skeleton)
    - [Dynamic Routes](#dynamic-routes)
4. [Next.js & React Basics](#nextjs--react-basics)
5. [Known Issues](#known-issues)
6. [Contributions](#contributions)

## Installation

1. Make sure you have [Node.js](https://nodejs.org/) and [`npx`](https://www.npmjs.com/package/npx) installed.
2. Clone this repository.
3. Navigate to the `app` directory inside the project via command line.
4. Run `npm install` to fetch all the necessary dependencies.

## Starting the App

1. Inside the `app` directory, execute `npm run dev` to initialize the development server.
2. Open a browser and visit `http://localhost:3000`.

## Structure

### Website Skeleton

- **Home Page (`/`)**: Displays the main content of the website.
- **About Page (`/about`)**: Detailed information about the website or the organization.
- **Contacts Page (`/contacts`)**: Provides contact details and possibly a contact form.
- **Articles Page (`/articles`)**: Lists all articles with a brief description and a link to each.

### Dynamic Routes

- **Article Page (`/articles/:articleId`)**: Displays the content of an article based on its unique ID.

## Next.js & React Basics

- **React Components**: Essential building blocks of the React App. More info [here](https://reactjs.org/docs/components-and-props.html).
- **Next.js Pages**: Every file inside the `pages` directory becomes a route. Further details [here](https://nextjs.org/docs/basic-features/pages).
- **Next.js Routing**: Linking between pages is simple with the `Link` component. Learn more [here](https://nextjs.org/docs/routing/introduction).

## Known Issues

- Styling is minimal as we'll be integrating with the Tailwind CSS framework in the future labs.
- The data used in articles is dummy data and will be replaced with actual content in subsequent labs.

## Contributions

This lab was crafted with dedication by Gabriel, Tanguy, and Mathéo for the ECE Web Technologies Course. Dive in and enjoy exploring the world of React and Next.js with us!

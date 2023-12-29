# Blogging application - ECE Webtech project
### Ferrari News : The most easily accessible news about the legendary Italian car manufacturer

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deliverables](#deliverables)
- [Authors](#authors)
- [Evaluation](#evaluation)
- [Miscellaneous](#miscellaneous)
- [Contributing](#contributing)

## Introduction

Ferrari News is a specialized blogging platform for Ferrari enthusiasts that brings the thrill and prestige of the Ferrari brand into the digital space. Our platform allows users to share and engage with content centered around their passion for Ferrari cars, from historical models to the latest releases.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed the latest version of [Node.js and npm](https://nodejs.org/).
- You have a basic understanding of JavaScript and React concepts.
- You have access to a terminal on your local machine.

## Installation

To install Ferrari News, follow these steps:

1. Clone the repository from GitHub:
   ```bash
   git clone https://github.com/GabrielHenaux/ece-webtech-2023-fall-gr04-11.git
    ```
2. Navigate to the project directory:
    ```bash
    cd ferrari-news
    ```
3. Install the required libraries and dependencies:

    ```bash
    npm install
    ```

## Usage

To run Ferrari News locally:

1. Start the development server:
   ```bash
   npm run dev
    ```
2. Open your browser and navigate to `http://localhost:3000`.
To view the deployed version on Vercel, simply visit the provided Vercel URL in the Deliverables section.


This section provides simple instructions for running the application on a local machine and for accessing the deployed version. 

## Deliverables 

- Vercel URL: *https://ferrari-news.vercel.app*
- Supabase project URL: *[Insert your Supabase URL here]*

## Authors

- Mathéo GONNET, SI gr04
- Gabriel HENAUX, SI gr04
- Tanguy GONNET, SI gr04

## Evaluation

### Mandatory Tasks

#### Naming convention
  - Grade: 2/2
  - Comments: Ensured consistency in naming conventions across the codebase by following community best practices.
  - Task feedback: This task was straightforward and crucial for maintaining code readability.

#### Project structure
  - Grade: 2/2
  - Comments: The project structure was inspired by our team's passion for Ferrari and automobiles, reflecting a theme that resonates throughout the application.
  - Task feedback: The clear separation of directories facilitated an organized development process.

#### Git usage
  - Grade: 2/2
  - Comments: Used Conventional Commits to maintain a clean Git history, ensuring good commit messages with appropriate tags like feat, fix, and style.
  - Task feedback: Effective strategy that promoted collaborative development and easy tracking of changes.

#### Code quality
  - Grade: 3.5/4
  - Comments: Maintained high code quality with extensive comments and visibility, with occasional manual adjustments for clarity.
  - Task feedback: Manual review complemented automated formatting tools, reinforcing the code's maintainability.

#### Design, UX, and content
  - Grade: 3.5/4
  - Comments: The design balanced visual aesthetics with user experience, emphasizing intuitive navigation and responsive design.
  - Task feedback: The design process was enjoyable with the help of tailwindcss and the Unsplash API.

#### Home page
  - Grade: 2/2
  - Comments: The home page serves as the gateway to the Ferrari experience, with engaging elements like a search bar and a carousel of popular articles, which spotlight the community's favorite content.
  - Task feedback: Designing the home page was a creative process that blended informational content with interactive elements to captivate users upon arrival.

#### Navigation
  - Grade: 2/2
  - Comments: The navigation bar was designed to be intuitive and accessible, with clear labels and a layout that users can navigate with ease, reflecting the simplicity and elegance of a Ferrari's design.
  - Task feedback: Creating a navigation bar that was both functional and fit the application's theme was straightforward and fulfilling, as it directly influences the user experience.

#### Login and profile page
  - Grade: 4/4
  - Comments: The integration of GitHub OAuth2 for authentication was meticulously executed, offering users a seamless login experience and a profile page rich in personal detail and customization options.
  - Task feedback: The complexity of OAuth2 integration was a technical hurdle, but overcoming it was rewarding and provided a secure and user-centric feature.

#### Post creation and display
  - Grade: 6/6
  - Comments: The post creation interface is user-friendly and streamlined, with the inclusion of a rich text editor and the Unsplash API integration, which allows for a wide selection of high-quality images to accompany user content.
  - Task feedback: The ease of use and practicality of the post creation process was a significant win for the platform, encouraging user engagement and content sharing.

#### Comment creation and display
  - Grade: 4/4
  - Comments: Implemented a robust comment system that empowers users to participate in discussions while ensuring only the comment authors can delete their entries, promoting responsible engagement.
  - Task feedback: Establishing a comment system that upholds user rights and fosters community interaction was a complex yet necessary feature for the platform's social aspect.

#### Post modification and removal
  - Grade: 4/4
  - Comments: Integrated stringent server-side checks with RLS and additional conditional logic in the code to ensure that post modifications and deletions were securely gated behind user authentication and authorization.
  - Task feedback: Crafting these security measures was intricate work that involved careful consideration of potential vulnerabilities and user permissions.

#### Search
  - Grade: 6/6
  - Comments: Implemented a sophisticated full-text search functionality leveraging Supabase's indexing, which allows users to efficiently search for content by keywords in titles and categories.
  - Task feedback: This feature's implementation was technically challenging but significantly amplifies the application's usability and user satisfaction.

#### Use an external API
  - Grade: 2/2
  - Comments: The integration of the Unsplash API was executed flawlessly, enriching posts with visually stunning imagery and enhancing the aesthetic appeal of the content.
  - Task feedback: The process was smooth and showcased the potential of third-party APIs to elevate the quality of user-generated content.

#### Resource access control
  - Grade: 2/6
  - Comments: While setting up RLS posed several challenges, including unexpected behaviors, we doubled down on security by implementing additional checks within the application logic to ensure robust access control.
  - Task feedback: The task was arduous and highlighted the importance of thorough testing and validation to achieve a secure data access model.

#### Account settings
  - Grade: 3/4
  - Comments: Users can tailor their experience on the platform by editing personal settings, enhancing the application's personalization.
  - Task feedback: Determining which settings to include required us to prioritize features that would most directly impact the user experience.

#### WYSIWYG integration
  - Grade: 0/2
  - Comments: Due to time constraints, the WYSIWYG editor was not implemented, which would have allowed for enriched content creation.
  - Task feedback: The absence of this feature was felt, as it would have provided users with enhanced content editing capabilities.

#### Gravatar integration
  - Grade: 0/2
  - Comments: The Gravatar integration was not completed, which would have added a personalized touch to user profiles and comments.
  - Task feedback: Implementing this feature would have fostered a stronger sense of community by visually identifying users.

#### Light/dark mode
  - Grade: 2/2
  - Comments: Successfully implemented a light/dark mode toggle feature, allowing users to select their preferred theme for an optimal reading experience. This feature was integrated thoughtfully, considering the design consistency across the platform and enhancing accessibility.
  - Task feedback: Adding this functionality was a valuable learning experience in user interface customization. It required careful planning to ensure that the visual transition between modes was seamless and did not detract from the content or user experience.


### Bonus Tasks

#### LIKE Feature
  - Grade: 1/1
  - Comments: The LIKE feature is tied to a robust database schema that ensures each user can like an article only once, promoting fair engagement across the platform.
  - Task feedback: This feature plays a significant role in community building, as it provides a simple yet effective way for users to engage with content.

#### Carousel Implementation
  - Grade: 1/1
  - Comments: Implemented a dynamic carousel using a well-regarded npm package, which cycles through the most-liked articles, highlighting popular content and enhancing user engagement.
  - Task feedback: The carousel adds an interactive and visually engaging element to the homepage, greatly contributing to the overall user experience.

## Miscellaneous

### Course Feedback

The course provided a comprehensive introduction to modern web technologies. The hands-on approach with labs and projects like this one was highly beneficial. However, the course could benefit from more real-world case studies and examples, particularly focusing on the deployment and scaling of web applications.

### Project Reuse

- [X] We authorize the professors to use our project as an example for the next year students.

---
## Contributing

*This project was realized as part of the 2023 Web Course at the ECE Engineering School.*


For any modifications or improvements to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeatureName`).
6. Open a Pull Request for review and potential merging into the main project.

We appreciate your contributions to enhance and expand the capabilities of Ferrari News!

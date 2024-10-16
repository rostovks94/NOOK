# NOOK Decor
Welcome to NOOK Decor, an interactive web application where users can explore and engage with curated interior decor styles. This project is a DEMO version and not a fully realized product, meant to showcase core features and functionality. It was developed as part of the Co.Lab program, a collaborative learning experience that emphasizes building real-world projects with cross-functional teams.

## Project Overview
NOOK Decor is a user-friendly platform focused on bringing inspirational interior designs to users. It allows you to explore different moodboards, each showcasing a unique style. The application offers features like moodboard previews, image interactions, and more.

This project was developed during the Co.Lab program, where collaboration with designers, product managers, and other developers was a key part of the development process.

## Features
- Browse curated interior decor moodboards;
- Dynamic image loading based on moodboard selection;
- User interactions such as viewing and engaging with moodboards

## Technologies Used
**Frontend:**
React: A powerful JavaScript library for building user interfaces
TypeScript: Strongly-typed JavaScript to ensure type safety
CSS Modules: For modular and maintainable styles
Netlify: Deployed on Netlify for quick and easy static hosting
React Router: Used for handling navigation between components
**Backend:**
The backend API, which handles authentication and data retrieval, was not developed by me but is fully integrated into the project. This backend provides the necessary endpoints for managing data in the application.

## Getting Started
To run this project locally:

1. Clone the repository:

Copy code
```bash 
git clone https://github.com/rostovks94/NOOK.git```
Install dependencies:
bash
Copy code
npm install
Run the project in development mode:
bash
Copy code
```bash npm run dev
Open your browser and navigate to http://localhost:3000.
For production, the project is deployed on Netlify.

Backend Information
The backend was developed separately and provides the core API for data interactions in this project. Authentication and data management are fully handled by the existing backend.

Backend features include:

Authentication (using Firebase)
Database integration for decor content and user data (MongoDB)
Please note that while the backend was not developed by me, I have fully integrated it into this project to handle frontend functionality.

Production Link
The application is live and can be accessed at NOOK Decor on Netlify.

Repository
You can find the full source code for this project on GitHub: NOOK Decor Repository.

Disclaimer
This is a DEMO version of the NOOK Decor application and is not a fully realized product. Some features may be incomplete, and the current state is designed to demonstrate core functionalities only. Future updates may expand upon these features.

Takeaways
During the development of NOOK Decor, several key takeaways emerged:

Frontend-Backend Integration: Seamless integration with a separately developed backend was a crucial learning experience. Handling API interactions, especially in a demo product, required clear communication between the frontend and backend layers.

Dynamic Component Rendering: Implementing dynamic moodboard previews with images and styles based on user interaction was a challenge that helped improve understanding of conditional rendering in React.

Modular CSS: Utilizing CSS Modules enabled better organization of styles and minimized class name conflicts, making the project easier to maintain and expand in the future.

TypeScript Benefits: Using TypeScript provided strong type checking, reducing potential runtime errors and improving the overall reliability of the code.

Deployment on Netlify: Hosting the project on Netlify facilitated quick deployments and testing of live versions, which is especially beneficial for iterating on a demo product.

Conclusion
NOOK Decor serves as a strong foundation for a future interior design platform. While this demo version highlights core features such as moodboard previews and user interactions, there is significant potential for future development. The project, developed as part of the Co.Lab program, demonstrates solid frontend and backend integration, scalable design principles, and a flexible foundation for adding new features. Moving forward, expanding on user interactions, refining the design, and incorporating more dynamic backend features could elevate the platform to a fully-fledged product.

Contributing
Contributions are welcome! If you'd like to contribute, feel free to submit a pull request or report an issue.

License
This project is licensed under the MIT License - see the LICENSE file for details.

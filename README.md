# Course Mate Wolfie

This application is designed to help students easily view their expected letter grades without the need to re-calculate every time. The user-friendly interface and integrated features ensure that students can manage their courses and assignments efficiently.

## Features

- **Login and Sign-Up**: Secure login and sign-up pages to manage user accounts.
![Login Screen](https://github.com/hkwak60/CourseMateWolfie/blob/main/CourseMateWolfie/public/0.Login.png?raw=true)
- **Grade Evaluation**: Easily add courses and view expected grades based on the entered data.
![Grade Eval](https://github.com/hkwak60/CourseMateWolfie/blob/main/CourseMateWolfie/public/1.GradeDetails.png?raw=true)
![Grade Eval](https://github.com/hkwak60/CourseMateWolfie/blob/main/CourseMateWolfie/public/2.EstimatedGrades.png?raw=true)
- **To-Do List**: Manage tasks and keep track of due dates.
![Grade Eval](https://github.com/hkwak60/CourseMateWolfie/blob/main/CourseMateWolfie/public/3.AddingTodo.png?raw=true)
- **Course Details**: View and edit detailed course information.
![Grade Eval](https://github.com/hkwak60/CourseMateWolfie/blob/main/CourseMateWolfie/public/5.CourseInfo.png?raw=true)
- **User-Specific Data**: Each user can only view and manage their own data.
![Grade Eval](https://github.com/hkwak60/CourseMateWolfie/blob/main/CourseMateWolfie/public/6.AllCoursesWithInfo.png?raw=true)

## Prerequisites

To run this application, you need to have the following installed:

- Node.js
- npm (Node Package Manager)
- MySQL

## Setup Instructions

1. **Database Setup**:

   - Use the 'database.sql' file to create and configure the MySQL database.
   - Execute the SQL script to set up the required tables and initial data.

2. **Backend Setup**:

   - Navigate to the server directory.
   - Install necessary dependencies by running:
     npm install
   - Start the server using:
     nodemon server.js

3. **Frontend Setup**:
   - Navigate to the client directory.
   - Install necessary dependencies by running:
     npm install
   - Start the client using:
     npm run dev

## Usage

Once the server and client are running, open your browser and navigate to the application's URL. Follow the on-screen instructions to sign up, log in, add courses, view grades, manage tasks, and more.

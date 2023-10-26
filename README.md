# Objective
   The objective of this game is to create a language learning game that helps users improve their language proficiency through interactive exercises and activities. The 
   game includes frontend UI components, backend logic for scoring, and a database to store user progress and language data.

# Features
1. User Registration and Authentication:
   Users should be able to register and log in to access the quiz and track their progress.
2. User Dashboard:
   Users have a personalized dashboard where they can see their progress, choose a language, and start quizzes.
3. Language Selection: Allow users to select from multiple languages, which will determine the language in which questions are presented.
4. Quiz Generation: Questions should be categorized based on their difficulty levels (1 to 5). You'll need a database of questions tagged with their difficulty levels and 
   languages.

5. Quiz Mechanics: Present questions one at a time to the user.After the user answers a question, provide immediate feedback on whether the answer was correct or wrong.
   Adjust the next question's difficulty level based on the user's previous performance. For example, if they answer correctly, increase the difficulty; if they answer 
   incorrectly, decrease it.
   
6. Progress Tracking: Maintained a database of user progress, including the number of quizzes taken, questions answered correctly, and overall performance.
   Allow users to view their progress and statistics on their dashboard.
7. Leaderboard: Create a leaderboard to encourage healthy competition among users.Leaderboard rankings is based on criteria like the overall scores.
8. Scoring System: Designed a scoring system that reflects the user's overall performance and encourages them to continue improving.
9. Reset Progress: Give users the option to reset their progress if they wish to start over.




# Frontend Development
  frontend is developed using React.Js (create-react-app)

# Backend Development
  backend is developed using Node.Js & Express.Js 

# Database Development
  MongoDB is used to store question and user related data including profiles and performance report.

# Hosting & Deployment
  Frontend is hosted on Netlify and Backend is on render
  Deployed Link : https://learnlingo.netlify.app/



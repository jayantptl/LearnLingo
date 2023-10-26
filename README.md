# Objective
The objective of this game is to create a language learning game that helps users improve their language proficiency through interactive exercises and activities. The game should include frontend UI components, backend
logic for scoring, and a database to store user progress and language data.

# Features
1. User Registration and Authentication:
   Users should be able to register and log in to access the quiz and track their progress.
2. User Dashboard:
   Users have a personalized dashboard where they can see their progress, choose a language, and start quizzes.
   Language Selection:

Allow users to select from multiple languages, which will determine the language in which questions are presented.
Quiz Generation:

Questions should be categorized based on their difficulty levels (1 to 5). You'll need a database of questions tagged with their difficulty levels and languages.
When a user starts a quiz, the system should dynamically generate questions based on the user's chosen language and the difficulty level.
For dynamic question generation, you can use an algorithm that selects questions based on the user's performance, previous answers, or other factors.
Quiz Mechanics:

Present questions one at a time to the user.
After the user answers a question, provide immediate feedback on whether the answer was correct or wrong.
Adjust the next question's difficulty level based on the user's previous performance. For example, if they answer correctly, increase the difficulty; if they answer incorrectly, decrease it.
Track the time taken to answer each question, as this can be a factor in scoring.
Progress Tracking:

Maintain a database of user progress, including the number of quizzes taken, questions answered correctly, and overall performance.
Allow users to view their progress and statistics on their dashboard.
Leaderboard:

Create a leaderboard to encourage healthy competition among users.
Leaderboard rankings can be based on criteria like the number of quizzes completed, average scores, or other relevant metrics.
Scoring System:

Design a scoring system that reflects the user's overall performance and encourages them to continue improving.
Reset Progress:

Give users the option to reset their progress if they wish to start over.




# Frontend Development
This contains an interactive and user-friendly quiz for multiple languages that user can select. Quiz contains multiple excercises and each question in a quiz is feed dynamicly
on the basis of the response of the current question whether correct or wrong. Questions are divided into difficulty scale of 1 to 5. Each excercise provides question to the user according to their 
difficulty level and it increases or decreases as they perform. Users can see their overall progress and reset it in the dashboard. Leaderboard is created, fostering
healthy competition and encouraging engagement.

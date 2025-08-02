PE03- Analysis report

# Input
The user interacts with the app by typing a task into the input field and clicking the "Add Task" button. Each task is added to a dynamic list. Users can also delete a task by clicking the “Delete” button next to it.

# Process
The app is built with React and uses the `useState` hook to manage the list of tasks. When a new task is submitted, it is added to the tasks array using the `setTasks` function. When the delete button is clicked, the task is removed from the list using `filter`.

# Output
The final result is a simple, responsive ToDo List App where users can add and remove tasks in real-time. The interface updates instantly as users interact with the app, and the layout is styled with CSS for readability and clarity.


PE02- Analysis report 

# Input
The user interacts with the app by selecting a movie genre from a dropdown menu. They can also click on any movie card to see a quick alert with the movie’s title. There’s no typing involved, just simple clicks to explore the content.

# Process
This app was built using React with functional components and the useState hook. The movie list is stored in an array, and it gets filtered based on the selected genre. JSX is used to display the content on the screen. When the user changes the genre, only the matching movies are shown. Clicking a movie triggers a small alert to show the title. Styling is added with basic CSS to keep the layout clean and easy to read.

# Output
The final result is a user-friendly web page that shows a list of movies. It updates right away when the user selects a genre, and alerts appear when clicking a movie. Everything works smoothly and looks neat!


PE01- Analysis report 

# Input
The user doesn’t enter anything manually, but the app is already set up to display a simple resume page. It pulls data from the component code written in JavaScript.

# Process
The React app compiles the Resume component and applies styles using CSS. It processes how each section (like name, contact info, and skills) appears on the page using React’s structure.

# Output
The final output is a clean, styled resume shown on a web page. When the user opens the app in a browser, they can see the resume layout immediately with no interaction required.

#Pokedex FrontEnd
Developed using [Svelte](https://svelte.dev/)

Simple UI with 2 sides, the left one shows a list of pokemons after loading from server plus 2 buttons 
to navigate between pages and the right side shows the detail of the pokemon after is clicked from the list on the left.

#####Deploy instructions
######Heroku:
1. This project is recognized as a node application by Heroku, so it's a little easier to deploy. Only the option 
*--host 0.0.0.0* was added to the *start* command in the *package.json* file.

1. As the platform requirements we need to specify that we have a web type project, so we create a ***Procfile*** 
with the information. The format is ```<type>: command to run the application```
1. In Heroku website:
    1. Access your account.
    1. Create a new app.
    1. Connect the app to Github repository.
    1. Use manual deploy to deploy the current state of the master branch 
    (remember to have this branch in a running state)

Editing the package.json and creating the Procfile is one time task only.

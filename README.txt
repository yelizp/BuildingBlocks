This application is based on the screencast from CodeSchool:"Build an Express.js App With TDD". 

NOTES for self:

- If you're not going to include your node_modules files on the Git repository, then it is a safer way to run:
$ npm shrinkwrap 
This command will lock all the dependencies with their currently used versions, so that even if the dependent library versions change, npm install will 
install the libraries with the versions as in the npm-shrinkwrap.json file.
Beware that you need to run shrinkwrap whenever you add a new package that you'll need in production. For dev env you don't need to run, eg. supertest.

- Add the node_modules folder to .gitignore
$ echo 'node_modules' >> .gitignore

- To run our tests, we're gonna use 2 libraries:
    supertest
    mocha
    
- Express team follows a convention. They create a folder bin and inside this folder there is a file called www.
This is an executable file, which starts our server. Run 
$ chmod +x bin/www
to make this file executable.

This application is based on the screencast from CodeSchool:"Build an Express.js App With TDD". 

NOTES for self:

- If you're not going to include your node_modules files on the Git repository, then it is a safer way to run:
$ npm shrinkwrap 
This command will lock all the dependencies with their currently used versions, so that even if the dependent library versions change, npm install will 
install the libraries with the versions as in the npm-shrinkwrap.json file.

- Add the node_modules folder to .gitignore
$ echo 'node_modules' >> .gitignore
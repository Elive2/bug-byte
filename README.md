#### Bug-Byte

TODO FOR FINAL DEMO
[x] - fix login on non incognito borwser
[x] - logout button
[x] - make severity and type not numbers
[x] - make details button reveal details
[x] - make delte button work 
[x] - make elements responsive, ie bug should appere immidietly after being created
[ ] - bug form validation
[ ] - filter pending bugs by not completed
[x] - client can view status of bug
[x] - add style to login
[x] - Testers?
[x] - test sessions and login more
[x] - history
[x] - reports
[x] - dev page is showing bugs that havent been assigned
[x] - REPORT IS IN LANDSCAPE BY DEFAULT, change this, or float report middle
[ ] - tester bug not showing up
[ ] - setup make command
[ ] - installation guide and finalize readme
[ ] - depoloy to server and verify everything


EXTRA
[ ] - implement drag and drop for manager
[no] - add super user
[no] - footer

TODO For final Report
[ ] - Suggested Changes
[ ] - Description of system implemented

## Installation Guide
There are two ways to install our system on an apache server with php5:

1. The easy way
	Our system comes pre-built and bundled in the dist directory. To deploy to a server simply visit the dist folder
	on a php compliant server. This method will use the API and database for the SCU user eyale

2. From Source
	Our system can be built from the 'src' by any machine with npm by simply running the following command:
```
		make bug-byte
```
	This make command will invoke our npm deploy build command found in package.json. This will set all api urls relative
	to the current directory, assemble and bundle all dependencies and output it into the 'dist' directory. It will also create the sql database tables needed. You

## Project File Structure
Our system follows the standard react projects structure. All the javascript source files are found in the 'src'
directory, and grouped into 'Components' and 'Containers'. Each of our dashboards is served via a php page which
containts html code and a <div> element for react to attach to. client.js, manager.js, and dev.js are where the 
React Attachment occurs and each of these files renders the respective dashboard component. When we
build our application, weback bundles all the javascript and dependencies and places the output in the 'dist'
directory. The backend, api, and jasvascript bundles can be found in the 'dist' and this file is simply copied to
our production server for deployment.

## Development Workflow
```
 //get the correct version of all dependencies
 npm install
 
 //build the app in development mode, output is placed in the dist/ directory
 //API and database points to local host
 npm run build

 //copy everything in the dist directory to htdocs in XAMPP
 npm run serve

 //visit http://localhost in your browser to view the app

 //visit http://localhost/phpmyadmin to view the mysql admin tool
```
## build for production
```
 //build the app in production mode, output is placed in dist/ directory
 npm run prod

 //ssh into you design center server
 ssh -l <username> linux.scudc.scu.edu

 //cd into the git repo
 cd /webpages/eyale/coen174/bug-byte

 //pull the latest build
 git pull

 //copy files from the dist directory into bug-byte
 cp -r /webpages/eyale/coen174/bug-byte/dist/* /webpages/eyale/bug-byte/

 //change the file permissions to give full rwx to everyone
 chmod 777 /webpages/eyale/bug-byte/*
```
## Install and configure XAMPP
```
 //Visit the XAMPP website and install the 5.6.38 / PHP 5.6.38 version for mac
 
 //follow setup to install at the default folder, Applications
 
 //open the application manager and start the server

 //copy files into the htdocs folder, the root of the XAMPP server
 npm run serve
 ```

## SQL Notes:
```
 To create the database for xammp, visit localhost/phpmyadmin and import the .sql files from /database

 To create the database from command line
 mysql -u username -p database_name < bug_byte_dev.sql

 DB credentials should not be stored directly in the PHP script, Instead they
 are stored in an environment variable which I still have to figure out
 or possibly a .ini file that can be parsed by the php

 The only thing to be wary of is running an untrustworthy child process which
 may access all the environment varaibles of its parent, to make this safe run the
 child process with 'env -i' to clear the environment
```
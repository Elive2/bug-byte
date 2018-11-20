# Bug-Byte

TODO FOR FINAL DEMO
[x] - fix login on non incognito borwser
[x] - logout button
[x] - make severity and type not numbers
[?] - make details button reveal details
[ ] - make delte button work 
[ ] - make elements responsive, ie bug should appere immidietly after being created
[ ] - bug form validation
[ ] - client can view status of bug
[ ] - add style to login
[ ] - Testers?
[ ] - test sessions and login more
[ ] - history and reports
[ ] - setup make command
[ ] - installation guide
[ ] - depoloy to server and verify everything

EXTRA
[ ] - implement drag and drop for manager
[ ] - add super user
[ ] - footer

TODO For final Report
[ ] - Suggested Changes
[ ] - Description of system implemented

## Development Workflow

* //get the correct version of all dependencies
* npm install
* 
* //build the app in development mode, output is placed in the dist/ directory
* //API and database points to local host
* npm run build
*
* //copy everything in the dist directory to htdocs in XAMPP
* npm run serve
*
* //visit http://localhost in your browser to view the app
*
* //visit http://localhost/phpmyadmin to view the mysql admin tool

## build for production

* //build the app in production mode, output is placed in dist/ directory
* npm run prod
*
* //ssh into you design center server
* ssh -l <username> linux.scudc.scu.edu
*
* //cd into the git repo
* cd /webpages/eyale/coen174/bug-byte
*
* //pull the latest build
* git pull
*
* //copy files from the dist directory into bug-byte
* cp -r /webpages/eyale/coen174/bug-byte/dist/* /webpages/eyale/bug-byte/
*
* //change the file permissions to give full rwx to everyone
* chmod 777 /webpages/eyale/bug-byte/*

## Install and configure XAMPP

* Visit the XAMPP website and install the 5.6.38 / PHP 5.6.38 version for mac
* 
* follow setup to install at the default folder, Applications
* 
* open the application manager and start the server
* 

## SQL Notes:

* To create the database for xammp, visit localhost/phpmyadmin and import the .sql file
*
* To create the database from command line
* mysql -u username -p database_name < bug_byte_dev.sql
*
* DB credentials should not be stored directly in the PHP script, Instead they
* are stored in an environment variable which I still have to figure out
* or possibly a .ini file that can be parsed by the php
*
* The only thing to be wary of is running an untrustworthy child process which
* may access all the environment varaibles of its parent, to make this safe run the
* child process with 'env -i' to clear the environment

## User Table:

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bugs` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`username`, `password`, `bugs`) VALUES
('test@scu.edu', 'test', 0);
COMMIT;

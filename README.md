# Bug-Byte

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
* npm run build
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

## PHP Backend API Notes
*
*  We dont use a php microframework to handle our routes and such. Instead we expect each request for bugs to
*  be either a GET or POST to bugs.php. 

*  A GET simply returns all bugs.. will eventually need to filter
*
*  A POST must take the format:
*
*  {
	method: post,
	body: {
		action: <form | update | delete>
		data: {
			//the data needed for the form. update, or delete
	    }
	}
   }
*
*  
*
*
* Advanatages of the method: Less code, no hassle setting up and learning framework
* Disadvantages: Security Holes?? Coustom Middleware

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



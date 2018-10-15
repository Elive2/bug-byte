# bug-byte
COEN 174

Start MySQL CLI on DC server:

mysql -h dbserver.engr.scu.edu -p -u eyale sdb_eyale
password: tenspot10

show tables;

#the bugs table was created with this command
CREATE TABLE bugs_dev (Name varchar(255), Type int, Severity int, Description text, Program varchar(255), Browser int, FirstName varchar(255), LastName varchar(255), DateTime datetime); 

#insert a single entry into the bugs 
insert into bugs_dev (Name, Type, Severity, Description, Program, Browser, FirstName, LastName) values ("ecampus class not visible", 0, 2, "couldn't find class on ecampus", "ecampus", 0, "Eli", "Yale");




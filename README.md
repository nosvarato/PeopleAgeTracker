# People Age Tracker
## Quick Summary

This is a small person age tracking web app done in React.Js with a C# api using EF Core, the sample code is using an in memory database which can be easily switch to any that EF core supports, ie MSSQL, mysql, postgress.

The app was done in .Net 6 as a best pratice is to use the Latest LTS build when it becomes available for longer running production apps as a pose to using just the latest none LTS build which has a shorted support period.

I started with Visual Studio 2022 built in templates which does alot of the initial setup and configs.

## Deployemnt

As it's completely build inside Visual Studio 2022 deployment is made easier by using the built in "Publishing" inside Visual Studio which includes
* Azure
* Docker
* IIS
* Folder

It's also easy to change the OS target to either Windows, Linux or ARM depending on requirements

## EF Core 

With EF core and Linq queries can be writen quickly and securely

Table structure is as follows (All contained in the Person Class)
* int PersonId
* string FirstName
* string LastName
* DateTime DOB
* DateTime DateCreated (Updated by the DBContext on record Create)
* DateTime DateModified (Updated by the DBContext on record Update)

## Testing

There is a live version of the app running at
https://peopleagetracker20220509224835.azurewebsites.net/

and although not best practice in production the API is also available at 
https://peopleagetracker20220509224835.azurewebsites.net/Swagger

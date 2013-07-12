#Alexandria

A HTML5 library application.

##Features

- Creating books
- Reviewing books
- Requesting, Transfering books to colleagues.

## Dependencies

- RequireJS
- BackboneJS
- UnderscoreJS
- Twitter Bootstrap

##Getting started
Within ```Database.config``` a connection string needs to be added to reference a SQL Server database.

The location is indicated by ```-- CONNECTION STRING GOES HERE --``` and should be populated with a correct connection string like this:
```XML
    data source=127.0.0.1;initial catalog=Alexandria;persist security info=True;
    user id=ExampleUser;password=ExamplePassword;
    MultipleActiveResultSets=True;App=EntityFramework
```

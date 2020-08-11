# Bookworm

BookWorm is a web app for users to catalog their book collection and track their reading progress. Users can search for books using Google Books and add a volume or series to their wishlist, collection, or an ordered queue. Users can track their collection and reading progress in the stats component.

## Getting Started

Clone this repository and navigate into the client folder

```
cd Bookworm/Bookworm/client
```

### Prerequisites

Install React.js, reactstrap, and Bootstrap

```
npm install react
npm install --save bootstrap
npm install --save reactstrap react react-dom
```

Follow this link and download SQL Server Express https://www.microsoft.com/en-us/sql-server/sql-server-downloads

### Firebase authentication

Follow this link and create a firebase project https://firebase.google.com/

Follow this link and sign up for Google Books API credentials https://developers.google.com/

Open VS Code from the client directory

```
code .
```

Create an .env.local file and insert the Firebase Web API key and Google Books API key

```
REACT_APP_API_KEY=your-firebase-web-api-key
REACT_APP_GOOGLE_API_KEY=your-googlebooks-api-key
```

Open Visual Studio from the base directory of the project

```
cd Bookworm
start Bookworm.sln
```

Put the firebase project ID in appsettings.json

```
"FirebaseProjectId": "your-firebase-project-id"
```

Copy the SQL script in the base directory

Open the SQL Server Object Explorer in Visual Studio and connect to localhost\SQLEXPRESS

Run the script as a query to create the database

## Deployment

Start the API in Visual Studio

Start the react app from the client folder

```
npm start
```

Register as a new user to start using Bookworm. There is no seed data in the SQL script, so you will need to start in the explore component and add books to your collection, wishlist, and queue from there.

## Authors

* **Billy Blackman** [billyblackman](https://github.com/billyblackman)

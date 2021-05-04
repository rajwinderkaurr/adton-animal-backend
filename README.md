# Aston Animal Sanctury
![Animal Sanctury Logo](/assets/images/project_logo.png)

<div style="text-align:center; font-size: 30px;"><span>For</h2></span></div>

![Aston Logo](/assets/images/aston_logo.png)

# About the project

This project is part of the Aston Animal Sanctury backend, made forby Rajwinder Singh of Aston University. Copying this project is strictly prohibited, and this is private property. Public only for marking purposes by the professor.

# Project Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/8dafc65f-fe23-4b9a-83d4-c74cfdf0eb40/deploy-status)](https://app.netlify.com/sites/aston-animal/deploys) 

Above is the badge linking to the app's deployment. See the status here.

# Replicating the project

To replicate the repo, follow the given steps:

## Clone the Repo

To clone the repo, use
```bash
git clone https://github.com/rajwinderkaurr/aston-animal-backend.git
```
## Setup Environment

Change to the directory:
```
cd aston-animal-backend
```

## Adding `.env` file

Add the `.env` file in base directory with configurations like this
```
PORT = 4030                         # Port hte app will be running on
MONGO_URL = <your MongoDB URI>      # Mongo Db url from atlas or server

ACCESS_TOKEN_SECRET = <secret>      # Randomly generated ~30 length string
REFRESH_TOKEN_SECRET = <secret>     # Randomly generated ~70 length string
```

## Starting the server

To run the backend server, type in the terminal
```bash
node app.js
```

## Testing the backend

To test if the backend is correctly working, first run the app. Then a message in the terminal window saying 
```Server started at port <PORT>```
will appear. Note the port number, and type in the browser window:

```
http://localhost:<PORT>/
```
If you get a JSON file presenting:
```
{ "messages": "Congrats! Server started. Use the front end to query..." }
```

# That's it!

We've successfully started the NodeJS server. Now, we only have to get the frontend from my repositories, and configure it to run with the backend

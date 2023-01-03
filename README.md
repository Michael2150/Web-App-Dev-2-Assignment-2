
# Project Title

A brief description of what this project does and who it's for

# Assignment 2 - Web API.

Name: Michael Gerber (20093265)

## Features.

[A bullet-point list of the ADDITIONAL features/endpoints you have implemented in the API **THAT WERE NOT IN THE LABS** ]. 

 + I implemented sorting when retreiving movies/tv-shows.
 + I implemented filtering by genre when retreiving movies/tv-shows.
 + I implemented paging when retreiving movies/tv-shows. You can also specify the amount of results per page.
 + 

## Installation Requirements
The directory is split in 2x the `movies-api` folder and the `movies-app` folder. The following commands are run from the repo's root folder.

### 1) Movies API:
Running the API
```bat
cd .\movies-api\
npm install
npm start
```

Seeding the database can be done by calling the following endpoint
```bat
http://{host}/api/sync?pages={number_of_pages}
```

### 2) Movies app:
Running the app
```bat
cd .\movies-app\
npm install
npm start
```

## API Configuration
Both the App and Api requires their own `.env` file in the folder. The files should be as follows.

`.\movies-api\.env`
```bat
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=YourMongoURL
SEED_DB=true
SECRET=YourJWTSecret
REACT_APP_TMDB_KEY=
```

`.\movies-app\.env`
```bat
REACT_APP_TMDB_KEY=
REACT_APP_LOCAL_API_KEY=
FAST_REFRESH=false
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| Users |   |   |   |  |
| api/users | N/A | Authenticate or Create a user | N/A | N/A
| Movies |   |   |   |  |
| /api/movies/discover |Gets a list of discover movies | N/A | N/A | N/A 
| /api/movies/upcoming |Gets a list of upcoming movies | N/A | N/A | N/A 
| /api/movies/popular |Gets a list of popular movies | N/A | N/A | N/A 
| /api/movies/{{MovieID}} | Get the movie from the id provided | N/A | N/A | N/A 
| /api/movies/genres | Get a list of the genres used by the movies | N/A | N/A | N/A 
| /api/movies/{{MovieID}}/images | Gets a list of images from the movie from the id provided | N/A | N/A | N/A 
| TV-Shows |   |   |   |  |
| /api/tv/discover |Gets a list of discover tv-shows | N/A | N/A | N/A 
| /api/tv/upcoming |Gets a list of upcoming tv-shows | N/A | N/A | N/A 
| /api/tv/popular |Gets a list of popular tv-shows | N/A | N/A | N/A 
| /api/tv/{{TVShowID}} | Get the tv-show from the id provided | N/A | N/A | N/A 
| /api/tv/genres | Get a list of the genres used by the tv-shows | N/A | N/A | N/A 
| /api/tv/{{TVShowID}}/images | Gets a list of images from the tv-show from the id provided | N/A | N/A | N/A 
| Sync |   |   |   |  |
| /api/sync | N/A | Syncs pages of data from the TMDB api into the local API.  | N/A | N/A

More documentation can be found here: https://documenter.getpostman.com/view/8789361/2s8Z6yVXoF


## Security and Authentication
I used passport authentication. 

## Extra features

I used mongoose aggregation pipelines to sort and filter data being retreived.

## Independent learning.

I had to do research on the functions I can use in the aggregation pipeline to only return the data I needed.
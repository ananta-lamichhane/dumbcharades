# DumbCharades
An application for playing dumb  charades game. 

## How to play?
[This blog](https://blog.venuelook.com/how-to-play-dumb-charades.html) does a very good job at explaining the basics of Dumb Charades.

## Getting Started
1. Clone this repo.
2. Install npm packages.
3. Start the server locally.

## Hosting on GitHub Pages.

## Movies API
I'm using an API backend to fetch the name of the movies to be presented. If you plan on building your own API, the API should have an endpoint e.g. <yourAPI.com>/movies
and should provide a JSON data with the following format:
```javascript
{
  "title": "Ghulam (film)", 
  "poster_path": "https://upload.wikimedia.org/220px-Ghulam%28Movie%29_Poster.jpg", 
  "year": "1998", 
  "genre": "Action|Crime|Drama", 
  "actors": "Aamir Khan|Rani Mukerji|Anil Rajput|"
}
```
Notice that the multiple values within a key, e.g., genre, actors, etc. are separated by a |.

## Using a csv file with a list of movies (Work in Progress)
If you don't want to use an elaborate API backend, you should be able to upload a csv file with a list of movies.

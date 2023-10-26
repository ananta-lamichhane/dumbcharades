import { hindiMovies, nepaliMovies, englishMovies } from "../data/films"


const allMovies = hindiMovies.concat(nepaliMovies).concat(englishMovies)
async function fetchMovie(url){
    const response = await fetch(url, {headers: {
      'x-api-key': 'xISumFnoBJ3cvS3ltGb0k2K8ESsVy34C3hIYCrzl'
    }})
    const respJSON = response.json()
    return respJSON
  
  }

  // get a random index of the lenght of array and select a random index
function getRandomMovie(){
    let randomidx = Math.floor(Math.random()*(allMovies.length))
    return (allMovies[randomidx])
  }


function JSONPruner(JSONdata){
    console.log(JSONdata)
    let outputArr = []
    for(let i=0; i<JSONdata.length; i++){
      let currObj = JSONdata[i]
      let title = currObj.title
      outputArr.push(title)
    }

    console.log(outputArr)

  
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //  credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
export {fetchMovie, JSONPruner, postData,  getRandomMovie}
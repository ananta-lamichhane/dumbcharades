import {
  hindiMovies,
  nepaliMovies,
  englishMovies,
  hindi_nsfw,
  nepali_nsfw,
  enlish_nsfw,
} from "../data/films"

function getMoviesByLanguage(
  languages = { hindi: true, nepali: true, english: true },
  includeNsfw = false
) {
  let selectedMovies = []

  if (languages.hindi) {
    selectedMovies = selectedMovies.concat(hindiMovies)
    if (includeNsfw) {
      selectedMovies = selectedMovies.concat(hindi_nsfw)
    }
  }
  if (languages.nepali) {
    selectedMovies = selectedMovies.concat(nepaliMovies)
    if (includeNsfw) {
      selectedMovies = selectedMovies.concat(nepali_nsfw)
    }
  }
  if (languages.english) {
    selectedMovies = selectedMovies.concat(englishMovies)
    if (includeNsfw) {
      selectedMovies = selectedMovies.concat(enlish_nsfw)
    }
  }

  return selectedMovies.length > 0
    ? selectedMovies
    : hindiMovies.concat(nepaliMovies).concat(englishMovies)
}

async function fetchMovie(url){
    const response = await fetch(url, {headers: {
      'x-api-key': 'xISumFnoBJ3cvS3ltGb0k2K8ESsVy34C3hIYCrzl'
    }})
    const respJSON = response.json()
    return respJSON
  
  }

  // get a random index of the length of array and select a random index
function getRandomMovie(languages, includeNsfw = false){
  const moviePool = getMoviesByLanguage(languages, includeNsfw)
    let randomidx = Math.floor(Math.random()*(moviePool.length))
    return (moviePool[randomidx])
  }

function getTeamNextMemberName(members = [], currentIndex = 0) {
  if (members.length === 0) {
    return "-"
  }
  const nextIndex = (currentIndex + 1) % members.length
  return members[nextIndex]
}

function getCurrentPlayerName(gameConfig, gameScores) {
  const memberKey = gameScores.currentTeam === "team1" ? "team1Members" : "team2Members"
  const indexKey = gameScores.currentTeam === "team1" ? "team1MemberIndex" : "team2MemberIndex"
  const members = gameConfig[memberKey] || []
  const currentIndex = gameScores[indexKey] || 0
  return members[currentIndex] || "-"
}

function advanceTurnState(gameScores, gameConfig) {
  const nextState = { ...gameScores }

  if (nextState.currentTeam === "team1") {
    const teamSize = Math.max((gameConfig.team1Members || []).length, 1)
    nextState.team1MemberIndex = (nextState.team1MemberIndex + 1) % teamSize
    nextState.currentTeam = "team2"
  } else {
    const teamSize = Math.max((gameConfig.team2Members || []).length, 1)
    nextState.team2MemberIndex = (nextState.team2MemberIndex + 1) % teamSize
    nextState.currentTeam = "team1"
  }

  return nextState
}

function advanceMemberForTeam(gameScores, gameConfig, team) {
  const nextState = { ...gameScores }

  if (team === "team1") {
    const teamSize = Math.max((gameConfig.team1Members || []).length, 1)
    nextState.team1MemberIndex = (nextState.team1MemberIndex + 1) % teamSize
  } else {
    const teamSize = Math.max((gameConfig.team2Members || []).length, 1)
    nextState.team2MemberIndex = (nextState.team2MemberIndex + 1) % teamSize
  }

  return nextState
}

function getUpcomingTurns(gameConfig, gameScores, count = 3) {
  const turns = []
  let cursorState = { ...gameScores }

  for (let i = 0; i < count; i++) {
    cursorState = advanceTurnState(cursorState, gameConfig)
    const teamName = gameConfig[`${cursorState.currentTeam}Name`]
    const memberList =
      cursorState.currentTeam === "team1" ? gameConfig.team1Members : gameConfig.team2Members
    const memberIndex =
      cursorState.currentTeam === "team1" ? cursorState.team1MemberIndex : cursorState.team2MemberIndex

    turns.push({
      team: cursorState.currentTeam,
      teamName,
      memberName: memberList[memberIndex] || "-",
    })
  }

  return turns
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
export {
  fetchMovie,
  JSONPruner,
  postData,
  getRandomMovie,
  getTeamNextMemberName,
  getCurrentPlayerName,
  advanceTurnState,
  advanceMemberForTeam,
  getUpcomingTurns,
}
import { Card, CardHeader, Heading, CardFooter,
        CardBody, Text, Button, SimpleGrid, HStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { HiStar } from "react-icons/hi"
import { englishMovies, Films, nepaliMovies } from "../../data/films"

//pull this from form later
const allMovies = Films.concat(nepaliMovies).concat(englishMovies)
const TimerCard = (props) =>{
  let localStorageGameState = JSON.parse(localStorage.getItem('gameScores'))
  const GAMETIME=props.gameData["timeFirst"]
  const PASSTIME=props.gameData["timePassed"]
  const [counter, setCounter] = useState(props.gameData["timeFirst"])
  const [pause, setPause] = useState(true)
  const[counterId, setCounterId] = useState()

  // if the localstorage is populated, use it to set the initial values 
  // for scores, current team and next movie
  const[gameState, setGameState] = useState({
    "team1Score": localStorageGameState?localStorageGameState['team1Score']:0,
    "team2Score":localStorageGameState?localStorageGameState['team2Score']:0,
    "currentTeam": localStorageGameState?localStorageGameState['currentTeam']:'team1',
    "nextMovie": localStorageGameState?localStorageGameState['nextMovie']:getRandomMovie()
  })
  const [passed, setPassed] = useState()                               
  function startTimer(){
    let c = counter
    const id = setInterval(()=>{
    if(c <1){
      stopTimer()
    }else{
      setCounter(counter => (counter-1));
      c--
    }
    }, 1000);
    setCounterId(id)
  }
  
  // get a random index of the lenght of array and select a random index
  function getRandomMovie(){
    let randomidx = Math.floor(Math.random()*(allMovies.length))
    return (allMovies[randomidx])
  }


  function stopTimer(){
    clearInterval(counterId);
  }
  function toggleTimer(){
    console.log(pause);
    if(pause){
      setPause(false)
      startTimer();
    } else {
      setPause(true)
      stopTimer();
    }
  }
  
  function resetCounter(timeInSec){
    setCounter((timeInSec))
    setPause(true)
   
  }

  useEffect(() => {
    // send the gamestate data to the parent element (scoreCard)
    // each time game State is changed.
    props.parentCallback(gameState)
  },[gameState]);

  

  return(
    <div>
    <SimpleGrid templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
    <Card size={"sm"}>
      <CardHeader>
        <Heading fontSize={"6xl"} size='lg'> {
          counter
        } </Heading>
      </CardHeader>
      <CardBody>
        <Text>Time is running out.</Text>
      </CardBody>
      
    </Card>
    {
    <Card>
      <CardHeader>
        <Text fontSize={"2xl"}>Admin Controls</Text>
      </CardHeader>
      <CardBody>
        <Text fontSize={"2xl"}>{gameState["nextMovie"]}</Text>
     
        <HStack>
        <Button onClick={()=>{
         toggleTimer()
          }}>{pause?"Start":"Pause"}</Button>
        <Button onClick={()=>{
          resetCounter(GAMETIME)

          }}>Reset</Button>
        <Button onClick={()=>{
         
          let newScore = 0
          let addScore = 0
          if(passed){
            addScore = parseInt(props.gameData["passedPts"])
            setPassed(false)
          }else{
            addScore= parseInt(props.gameData["correctPts"])
          }
          if(gameState["currentTeam"] === "team1"){
            newScore = (gameState["team1Score"] + addScore)
            let nextMovie = getRandomMovie()
            setGameState(gameState =>({
              ...gameState,
              ["team1Score"]: newScore,
              ["currentTeam"]: "team2",
              ["nextMovie"]: nextMovie
            }
            ))
          }else{

            newScore = gameState["team2Score"] + addScore
            setGameState(gameState =>({
              ...gameState,
              ["team2Score"]: newScore,
              ["currentTeam"]: "team1",
              ["nextMovie"]: getRandomMovie()
            }
            ))
          }
          
          resetCounter(GAMETIME)
          stopTimer()

        }}>Correct Answer</Button>
        <Button onClick={()=>{
          resetCounter(PASSTIME)
          stopTimer()
          setPassed(true)
          
          
          if(gameState["currentTeam"] === "team1"){
           
            setGameState(gameState =>({
              ...gameState,
              ["currentTeam"]: "team2"
            }
            ))
            setPassed(true)
          }else{
            setGameState(gameState =>({
              ...gameState,
              ["currentTeam"]: "team1"
            }
            ))
            setPassed(true)
          }  

        }}>Pass</Button>
        <Button onClick={
          ()=>{
            if(gameState["currentTeam"] === "team1"){
           
              setGameState(gameState =>({
                ...gameState,
                ["currentTeam"]: "team2"
              }
              ))
             
            }else{
              setGameState(gameState =>({
                ...gameState,
                ["currentTeam"]: "team1"
              }
              ))
             
            } 
          }
        }>Toggle Team</Button>
        </HStack>


      </CardBody>
    </Card>
    }
    </SimpleGrid>
    </div>
)
}

export {TimerCard}
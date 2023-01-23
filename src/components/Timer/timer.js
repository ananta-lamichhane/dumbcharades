import { Card, CardHeader, Heading, CardFooter,
        CardBody, Text, Button, SimpleGrid, HStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { HiStar } from "react-icons/hi"
import { Films } from "../../data/films"

//pull this from form later

const TimerCard = (props) =>{
  const GAMETIME=props.gameData["timeFirst"]
  const PASSTIME=props.gameData["timePassed"]
  const [counter, setCounter] = useState(props.gameData["timeFirst"])
  const [pause, setPause] = useState(true)
  const[counterId, setCounterId] = useState()
  const[gameState, setGameState] = useState({
                                       "team1Score": 0,
                                       "team2Score":0,
                                       "currentTeam": "team1",
                                       "nextMovie": getRandomMovie()
                                    })
  const [passed, setPassed] = useState(false)                               
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
  
  function getRandomMovie(){
    let randomidx = Math.floor(Math.random()*(Films.length))
    return (Films[randomidx])
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
    props.parentCallback(gameState)
  },[gameState]);

  

  return(
    <div>
    <SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
    <Card>
      <CardHeader>
        <Heading fontSize={"6xl"} size='lg'> {
          counter
        } </Heading>
      </CardHeader>
      <CardBody>
        <Text>Time is running out.</Text>
      </CardBody>
      <CardFooter>
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
            setGameState(gameState =>({
              ...gameState,
              ["team1Score"]: newScore,
              ["currentTeam"]: "team2",
              ["nextMovie"]: getRandomMovie()
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

      </CardFooter>
    </Card>
    </SimpleGrid>
    </div>
)
}

export {TimerCard}
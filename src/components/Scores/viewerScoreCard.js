import { Card, CardHeader, Heading, CardFooter,
    CardBody, Text, Button,  Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TimerCard } from "../Timer/timer"
import {FaCrown} from "react-icons/fa"
import { postData } from "../../utils/utils"


const ViewerScoreCard = (props) =>{

// keep track of the state of the game, i.e. scores, who's next, passed question or not, etc.
const [gameState, setGameState] = useState()
// fetch and save the name of the next movie to be shown



// callback function to be sent as a prop to the child component (TimerCard)
function handleGameState(gameData){
 //save the game state as sent by the child component
 //  console.log(gameData)
   setGameState(gameData)
   localStorage.setItem('gameScores', JSON.stringify(gameData))
   postData('https://dc.api.anantalc.com/scores', gameData).then(
     resp => {
       console.log(resp)
     }
   )
}



useEffect(() => {
 fetch
/*   fetchMovie(API_URL).then(data => {
   console.log("next movie" + data)
   setNextMovie(data.title)
   setMovieRating(parseInt(data.rating))
 })
*/

   // re-render this component upon the change in gameState, i.e., whenever new info is sent
   // by the child component
 },[gameState]);

 

return(

   <Flex margin={"5px"}  direction={{ base: 'column', md: 'row' }}>
   <Card minWidth={"100px"} padding={{base: "10", md: "10"}}
     borderColor={gameState?.currentTeam==="team1"?"red":"black"} 
     borderWidth={gameState?.currentTeam==="team1"?"5px":"0px"}
     width={{base: "100%", md: "33%"}}
     size="lg" variant="elevated">
     <CardHeader padding={"0"}>
       <Heading fontSize={"3xl"}> {props.formData["team1Name"]} </Heading>
     </CardHeader>
     <CardBody padding={{base: "10", md: "10"}}>
       <Text fontSize={"xl"}>Score</Text>
       <Text fontSize={"3xl"}>{gameState?gameState["team1Score"]:""}</Text>
     </CardBody>
     {/* <CardFooter>
       <Button>View here</Button>
     </CardFooter> */}
     
   </Card>
   {/*
     !props.demoMode && <TimerCard parentCallback={handleGameState} gameData={props.formData}/>
    */}
   
   <Card 
     minWidth={"100px"} 
     borderColor={gameState?.currentTeam==="team2"?"red":"black"}  
     borderWidth={gameState?.currentTeam==="team2"?"5px":"0px"} 
     width={{base: "100%", md: "33%"}}
     variant="elevated">
     <CardHeader padding={"0px"}>
       <Heading fontSize={"3xl"}> {props.formData["team2Name"]}</Heading>

     </CardHeader>
     <CardBody padding={"0px"}>
       <Text fontSize={"xl"}>Score</Text>
       <Text fontSize={"3xl"}>{gameState?gameState["team2Score"]: ""}</Text>
     </CardBody>
{/*       <CardFooter>
       <Button color={"blue.400"}>View here</Button>
     </CardFooter> */}
   </Card>

   </Flex>

)
}

export {ViewerScoreCard}
import { Card, CardHeader, Heading, CardFooter,
     CardBody, Text, Button, SimpleGrid, HStack, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TimerCard } from "../Timer/timer"
import {FaCrown} from "react-icons/fa"
import { fetchMovie } from "../../utils/utils"


const API_URL = 'https://6zqcjcgnb5.execute-api.us-east-1.amazonaws.com/dev/movie'

const ScoreCard = (props) =>{

// keep track of the state of the game, i.e. scores, who's next, passed question or not, etc.
const [gameState, setGameState] = useState()
const [movieRating, setMovieRating] = useState(0)
// fetch and save the name of the next movie to be shown
const [nextMovie, setNextMovie] = useState()


// callback function to be sent as a prop to the child component (TimerCard)
function handleGameState(gameData){
  //save the game state as sent by the child component
    console.log(gameData)
    setGameState(gameData)
    localStorage.setItem('gameScores', JSON.stringify(gameData))
}



useEffect(() => {
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

    <Flex>
    <Card width={"33.33%"}  colorScheme={"facebook"} size="lg" variant="elevated">
      <CardHeader>
        <Heading fontSize={"3xl"}> {props.formData["team1Name"]} </Heading>
        <Heading fontSize={"3xl"}>{gameState &&gameState["currentTeam"]==="team1"? <FaCrown size={"50"}/>:""}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Score: {gameState?gameState["team1Score"]:""}.</Text>
      </CardBody>
      <CardFooter>
        <Button>View here</Button>
      </CardFooter>
    </Card>
    <TimerCard width={"33.33%"} parentCallback={handleGameState} gameData={props.formData}/>
    <Card width={"33.33%"} colorScheme={"facebook"} size="lg" variant="elevated">
      <CardHeader>
        <Heading fontSize={"3xl"}> {props.formData["team2Name"]}</Heading>
        <Heading size={'sm'}>{gameState && gameState["currentTeam"]==="team2"?<FaCrown size={"50"}/>:""}</Heading>

      </CardHeader>
      <CardBody>
        <Text>Score: {gameState?gameState["team2Score"]: ""}</Text>
      </CardBody>
      <CardFooter>
        <Button color={"blue.400"}>View here</Button>
      </CardFooter>
    </Card>

    </Flex>

)
}

export {ScoreCard}
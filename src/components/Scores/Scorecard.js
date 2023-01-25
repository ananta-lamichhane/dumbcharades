import { Card, CardHeader, Heading, CardFooter,
     CardBody, Text, Button, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TimerCard } from "../Timer/timer"
import {FaCrown} from "react-icons/fa"



const ScoreCard = (props) =>{

// keep track of the state of the game, i.e. scores, who's next, passed question or not, etc.
const [gameState, setGameState] = useState()

// fetch and save the name of the next movie to be shown
const [nextMovie, setNextMovie] = useState()


// callback function to be sent as a prop to the child component (TimerCard)
function handleGameState(gameData){
  //save the game state as sent by the child component
    console.log(gameData)
    setGameState(gameData)
}


useEffect(() => {
// use Fetch API to do a get call to the API Gateway in order to fetch the next movie
// the header x-api-key is required by AWS API Gateway in order to authenticate against
// the API
fetch('https://6zqcjcgnb5.execute-api.us-east-1.amazonaws.com/dev/movie', {headers: {
      'x-api-key': 'xISumFnoBJ3cvS3ltGb0k2K8ESsVy34C3hIYCrzl'
    }})
  .then((response) => response.json()) // convert the response to json
  .then((data) => setNextMovie(data.title)) // set title of the response as nextMovie (title)


    // re-render this component upon the change in gameState, i.e., whenever new info is sent
    // by the child component
  },[gameState]);

  

return(
    <div>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(600px, 1fr))'>
    <Card>
      <CardHeader>
        <Heading size='lg'> {props.formData["team1Name"]} </Heading>
        <Heading size={'sm'}>{gameState &&gameState["currentTeam"]==="team1"? <FaCrown size={"50"}/>:""}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Score: {gameState?gameState["team1Score"]:""}.</Text>
      </CardBody>
      <CardFooter>
        <Button>View here</Button>
      </CardFooter>
    </Card>
    <TimerCard parentCallback={handleGameState} gameData={props.formData}/>
    <Card colorScheme={"facebook"} size="lg" variant="elevated">
      <CardHeader>
        <Heading size='lg'> {props.formData["team2Name"]}</Heading>
        <Heading size={'sm'}>{gameState && gameState["currentTeam"]==="team2"?<FaCrown size={"50"}/>:""}</Heading>

      </CardHeader>
      <CardBody>
        <Text>Score: {gameState?gameState["team2Score"]: ""}</Text>
      </CardBody>
      <CardFooter>
        <Button color={"blue.400"}>View here</Button>
      </CardFooter>
    </Card>
  </SimpleGrid>

    <Text fontSize={"6xl"}>Next Movie: {gameState && nextMovie}</Text>
  
  </div>
)
}

export {ScoreCard}
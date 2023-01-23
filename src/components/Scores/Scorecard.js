import { Card, CardHeader, Heading, CardFooter,
     CardBody, Text, Button, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TimerCard } from "../Timer/timer"

const ScoreCard = (props) =>{
const [gameState, setGameState] = useState()
const [nextMovie, setNextMovie] = useState()



function handleGameState(gameData){
    console.log(gameData)
    setGameState(gameData)
}
useEffect(() => {
fetch('https://6zqcjcgnb5.execute-api.us-east-1.amazonaws.com/dev/movie', {headers: {
      'x-api-key': 'xISumFnoBJ3cvS3ltGb0k2K8ESsVy34C3hIYCrzl'
    }})
  .then((response) => response.json())
  .then((data) => setNextMovie(data.title))


    
  },[gameState]);

  

return(
    <div>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(600px, 1fr))'>
    <Card>
      <CardHeader>
        <Heading size='lg'> {props.formData["team1Name"]} </Heading>
        <Heading size={'sm'}>{gameState &&gameState["currentTeam"]==="team1"?"(**)":""}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Score: {gameState?gameState["team1Score"]:""}.</Text>
      </CardBody>
      <CardFooter>
        <Button>View here</Button>
      </CardFooter>
    </Card>
    <TimerCard parentCallback={handleGameState} gameData={props.formData}/>
    <Card>
      <CardHeader>
        <Heading size='lg'> {props.formData["team2Name"]}</Heading>
        <Heading size={'sm'}>{gameState && gameState["currentTeam"]==="team2"?"(**)":""}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Score: {gameState?gameState["team2Score"]: ""}</Text>
      </CardBody>
      <CardFooter>
        <Button>View here</Button>
      </CardFooter>
    </Card>
  </SimpleGrid>

    <Text fontSize={"6xl"}>Next Movie: {gameState && nextMovie}</Text>
  
  </div>
)
}

export {ScoreCard}
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { Logo } from './Logo'
import { useState } from 'react'

export const NewForm = (props) => {

  // placeholder to save the form data
  const [formData, setFormData] = useState({
    "team1Name": "",
    "team2Name": "",
    "numQuestions": 0,
    "correctPts": 0,
    "passedPts": 0,
    "timeFirst":0,
    "timePassed":0
  })

  
 
// whenever a Input field changes, i.e, new character is added, a character
// is deleted, etc, change the formData object accordingly
  function setInputOnchange(event, k){
    setFormData(formData=>({
      ...formData,
      [k]:event.target.value
    }))
  }



  return(
  <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
    <Stack spacing="8">
      <Stack spacing="6">
        <Logo />
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={useBreakpointValue({ base: 'sm', md: 'sm' })}>
            Create a New Game
          </Heading>
        </Stack>
      </Stack>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
        boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl >
              <FormLabel htmlFor="team-1-name">Team 1 Name</FormLabel>
              <Input  onChange={(event)=>{setInputOnchange(event,"team1Name")}} id="team-1-name" type="text" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="team-2-name">Team 2 Name</FormLabel>
              <Input onChange={(event)=>{setInputOnchange(event,"team2Name")}} id="team-2-name" type="text" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="no-of-ques">Number of Questions</FormLabel>
              <Input onChange={(event)=>{setInputOnchange(event,"numQuestions")}}  id="no-of-ques" type="text" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="points">Points for correct answer</FormLabel>
              <Input onChange={(event)=>{setInputOnchange(event,"correctPts")}}  id="points" type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="points-passed">Points for passed question</FormLabel>
              <Input onChange={(event)=>{setInputOnchange(event,"passedPts")}}  id="points-passed" type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="time-first">Time for regular question (seconds)</FormLabel>
              <Input onChange={(event)=>{setInputOnchange(event,"timeFirst")}}  id="time-first" type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="time-passed">Time for passed questions (seconds)</FormLabel>
              <Input onChange={(event)=>{setInputOnchange(event,"timePassed")}}  id="time-passed" type="text" />
            </FormControl>
            
          </Stack>
          <Stack spacing="6">
            <Button onClick={()=>{props.parentCallback(formData)}} variant="primary">Submit</Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Container>
  )
  }

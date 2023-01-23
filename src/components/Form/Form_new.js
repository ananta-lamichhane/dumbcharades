import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  omitThemingProps,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { Logo } from './Logo'
import { OAuthButtonGroup } from './OAuthButtonGroup'
import { PasswordField } from './PasswordField'
import { useState } from 'react'

export const NewForm = (props) => {

  const [formData, setFormData] = useState({
    "team1Name": "",
    "team2Name": "",
    "numQuestions": 0,
    "correctPts": 0,
    "passedPts": 0,
    "timeFirst":0,
    "timePassed":0
  })

  
 

  function setInputOnchange(event, k){
    setFormData(formData=>({
      ...formData,
      [k]:event.target.value
    }))
  }

  function onFormSubmit(data){
    console.log(data)
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
              <Input placeholder='val' onChange={(event)=>{setInputOnchange(event,"team1Name")}} id="team-1-name" type="text" />
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
              <FormLabel htmlFor="time-first">Time for regular question</FormLabel>
              <Input onChange={(event)=>{setInputOnchange(event,"timeFirst")}}  id="time-first" type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="time-passed">Time for passed question</FormLabel>
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

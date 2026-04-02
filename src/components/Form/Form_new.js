import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
  Stack,
  VStack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { Logo } from './Logo'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { HiPlus, HiX } from 'react-icons/hi'

export const NewForm = (props) => {

  const [formData, setFormData] = useState({
    team1Name: '',
    team2Name: '',
    team1Members: [''],
    team2Members: [''],
    languages: {
      hindi: true,
      nepali: true,
      english: true,
    },
    includeNsfw: false,
    numQuestions: 0,
    correctPts: 10,
    passedPts: -5,
    timeFirst: 60,
    timePassed: 30,
    uuid: uuidv4(),
  })
  const [errorMsg, setErrorMsg] = useState('')

  function setInputOnchange(event, k) {
    setFormData((prev) => ({
      ...prev,
      [k]: event.target.value,
    }))
  }

  function updateTeamMember(teamKey, index, value) {
    setFormData((prev) => {
      const updated = [...prev[teamKey]]
      updated[index] = value
      return {
        ...prev,
        [teamKey]: updated,
      }
    })
  }

  function addTeamMember(teamKey) {
    setFormData((prev) => {
      if (prev[teamKey].length >= 32) {
        return prev
      }
      return {
        ...prev,
        [teamKey]: [...prev[teamKey], ''],
      }
    })
  }

  function removeTeamMember(teamKey, index) {
    setFormData((prev) => {
      if (prev[teamKey].length <= 1) {
        return prev
      }
      return {
        ...prev,
        [teamKey]: prev[teamKey].filter((_, memberIdx) => memberIdx !== index),
      }
    })
  }

  function toggleLanguage(name, checked) {
    setFormData((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [name]: checked,
      },
    }))
  }

  function normalizeMembers(members) {
    return members.map((member) => member.trim()).filter((member) => member.length > 0)
  }

  function handleSubmit() {
    const team1Members = normalizeMembers(formData.team1Members)
    const team2Members = normalizeMembers(formData.team2Members)
    const selectedLanguageCount = Object.values(formData.languages).filter(Boolean).length

    if (!formData.team1Name.trim() || !formData.team2Name.trim()) {
      setErrorMsg('Please provide both team names.')
      return
    }

    if (team1Members.length < 1 || team2Members.length < 1) {
      setErrorMsg('Each team needs at least one member.')
      return
    }

    if (team1Members.length > 32 || team2Members.length > 32) {
      setErrorMsg('Each team can have at most 32 members.')
      return
    }

    if (selectedLanguageCount < 1) {
      setErrorMsg('Select at least one movie language.')
      return
    }

    setErrorMsg('')
    props.parentCallback({
      ...formData,
      team1Name: formData.team1Name.trim(),
      team2Name: formData.team2Name.trim(),
      team1Members,
      team2Members,
      numQuestions: Number(formData.numQuestions),
      correctPts: Number(formData.correctPts),
      passedPts: Number(formData.passedPts),
      timeFirst: Number(formData.timeFirst),
      timePassed: Number(formData.timePassed),
      uuid: formData.uuid,
    })
  }

  function TeamMembersInput({ teamLabel, teamKey }) {
    return (
      <FormControl>
        <FormLabel>{teamLabel} Members ({formData[teamKey].length}/32)</FormLabel>
        <VStack align="stretch" spacing={2} maxH="220px" overflowY="auto">
          {formData[teamKey].map((memberName, idx) => (
            <HStack key={`${teamKey}-${idx}`}>
              <Input
                value={memberName}
                onChange={(event) => updateTeamMember(teamKey, idx, event.target.value)}
                placeholder={`Member ${idx + 1}`}
                type="text"
              />
              <IconButton
                aria-label={`Remove ${teamLabel} member ${idx + 1}`}
                icon={<HiX />}
                onClick={() => removeTeamMember(teamKey, idx)}
                isDisabled={formData[teamKey].length <= 1}
              />
            </HStack>
          ))}
        </VStack>
        <Button
          mt={2}
          leftIcon={<HiPlus />}
          onClick={() => addTeamMember(teamKey)}
          isDisabled={formData[teamKey].length >= 32}
          variant="outline"
          width="100%"
        >
          Add {teamLabel} Member
        </Button>
      </FormControl>
    )
  }

  return (
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
          {errorMsg && (
            <Alert status="error">
              <AlertIcon />
              <Text>{errorMsg}</Text>
            </Alert>
          )}
          <Stack spacing="5">
            <FormControl >
              <FormLabel htmlFor="team-1-name">Team 1 Name</FormLabel>
              <Input  onChange={(event)=>{setInputOnchange(event,"team1Name")}} id="team-1-name" type="text" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="team-2-name">Team 2 Name</FormLabel>
              <Input onChange={(event)=>{setInputOnchange(event,"team2Name")}} id="team-2-name" type="text" />
            </FormControl>

            <TeamMembersInput teamLabel="Team 1" teamKey="team1Members" />
            <TeamMembersInput teamLabel="Team 2" teamKey="team2Members" />

            <FormControl>
              <FormLabel>Movie Languages</FormLabel>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Checkbox
                  isChecked={formData.languages.hindi}
                  onChange={(event) => toggleLanguage('hindi', event.target.checked)}
                >
                  Hindi
                </Checkbox>
                <Checkbox
                  isChecked={formData.languages.nepali}
                  onChange={(event) => toggleLanguage('nepali', event.target.checked)}
                >
                  Nepali
                </Checkbox>
                <Checkbox
                  isChecked={formData.languages.english}
                  onChange={(event) => toggleLanguage('english', event.target.checked)}
                >
                  English
                </Checkbox>
                <Checkbox
                  isChecked={formData.includeNsfw}
                  onChange={(event) => {
                    setFormData((prev) => ({
                      ...prev,
                      includeNsfw: event.target.checked,
                    }))
                  }}
                >
                  NSFW
                </Checkbox>
              </Stack>
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
            <Button onClick={handleSubmit} colorScheme="blue">Start Game</Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Container>
  )
  }

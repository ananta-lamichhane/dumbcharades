import { Badge, Card, CardBody, CardHeader, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { TimerCard } from "../Timer/timer";
import { getRandomMovie, getTeamNextMemberName } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";

const ScoreCard = (props) => {
  const localStorageGameState = JSON.parse(localStorage.getItem("gameScores"));

  const [gameState, setGameState] = useState({
    team1Score: localStorageGameState ? localStorageGameState.team1Score : 0,
    team2Score: localStorageGameState ? localStorageGameState.team2Score : 0,
    currentTeam: localStorageGameState ? localStorageGameState.currentTeam : "team1",
    team1MemberIndex: localStorageGameState ? localStorageGameState.team1MemberIndex : 0,
    team2MemberIndex: localStorageGameState ? localStorageGameState.team2MemberIndex : 0,
    nextMovie: localStorageGameState
      ? localStorageGameState.nextMovie
      : getRandomMovie(props.formData.languages, props.formData.includeNsfw),
    isStealTurn: localStorageGameState ? Boolean(localStorageGameState.isStealTurn) : false,
    passedFromTeam: localStorageGameState ? localStorageGameState.passedFromTeam || null : null,
    uuid: localStorageGameState ? localStorageGameState.uuid : uuidv4(),
  });

  function handleGameState(gameData) {
    setGameState(gameData);
    localStorage.setItem("gameScores", JSON.stringify(gameData));
  }

  const currentTeamPlayer = useMemo(() => {
    if (gameState.currentTeam === "team1") {
      return props.formData.team1Members[gameState.team1MemberIndex];
    }
    return props.formData.team2Members[gameState.team2MemberIndex];
  }, [gameState, props.formData]);

  return (
    <Flex margin="5px" direction={{ base: "column", md: "row" }} gap={3}>
      <Card
        minWidth="100px"
        padding={{ base: "10", md: "12" }}
        bgGradient="linear(to-br, pink.100, orange.100)"
        borderColor={gameState.currentTeam === "team1" ? "pink.500" : "orange.200"}
        borderWidth={gameState.currentTeam === "team1" ? "5px" : "2px"}
        boxShadow={gameState.currentTeam === "team1" ? "0 0 0 4px rgba(236,72,153,0.2)" : "md"}
        width={{ base: "100%", md: "33%" }}
        size="lg"
        variant="elevated"
        borderRadius="2xl"
      >
        <CardHeader padding="0" pb={2}>
          <VStack align="start" spacing={1}>
            <Heading fontSize={{ base: "3xl", md: "4xl" }} lineHeight="1">
              {props.formData.team1Name}
            </Heading>
            <Badge colorScheme="pink" fontSize="sm" px={2} py={1} borderRadius="full">
              Team 1
            </Badge>
          </VStack>
        </CardHeader>
        <CardBody padding={{ base: "10", md: "10" }}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
            Score
          </Text>
          <Text fontSize={{ base: "6xl", md: "7xl" }} fontWeight="black" lineHeight="1" color="pink.700">
            {gameState.team1Score}
          </Text>
          <Text mt={2} fontWeight="semibold">
            Playing: {props.formData.team1Members[gameState.team1MemberIndex]}
          </Text>
          <Text>
            Next: {getTeamNextMemberName(props.formData.team1Members, gameState.team1MemberIndex)}
          </Text>
        </CardBody>
      </Card>

      <TimerCard
        parentCallback={handleGameState}
        gameData={props.formData}
        initialGameState={gameState}
        currentTeamPlayer={currentTeamPlayer}
      />

      <Card
        minWidth="100px"
        padding={{ base: "10", md: "12" }}
        bgGradient="linear(to-br, blue.100, cyan.100)"
        borderColor={gameState.currentTeam === "team2" ? "blue.500" : "cyan.200"}
        borderWidth={gameState.currentTeam === "team2" ? "5px" : "2px"}
        boxShadow={gameState.currentTeam === "team2" ? "0 0 0 4px rgba(59,130,246,0.2)" : "md"}
        width={{ base: "100%", md: "33%" }}
        variant="elevated"
        borderRadius="2xl"
      >
        <CardHeader padding="0" pb={2}>
          <VStack align="start" spacing={1}>
            <Heading fontSize={{ base: "3xl", md: "4xl" }} lineHeight="1">
              {props.formData.team2Name}
            </Heading>
            <Badge colorScheme="blue" fontSize="sm" px={2} py={1} borderRadius="full">
              Team 2
            </Badge>
          </VStack>
        </CardHeader>
        <CardBody padding={{ base: "10", md: "10" }}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
            Score
          </Text>
          <Text fontSize={{ base: "6xl", md: "7xl" }} fontWeight="black" lineHeight="1" color="blue.700">
            {gameState.team2Score}
          </Text>
          <Text mt={2} fontWeight="semibold">
            Playing: {props.formData.team2Members[gameState.team2MemberIndex]}
          </Text>
          <Text>
            Next: {getTeamNextMemberName(props.formData.team2Members, gameState.team2MemberIndex)}
          </Text>
        </CardBody>
      </Card>
    </Flex>
  );
};

export { ScoreCard };
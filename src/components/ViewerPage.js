import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getCurrentPlayerName, getUpcomingTurns } from "../utils/utils";

const GAME_CONFIG_KEY = "gameConfig";
const GAME_SCORES_KEY = "gameScores";

function TeamViewerCard({ title, score, isActive, playerName, colorTheme }) {
  return (
    <Card
      width={{ base: "100%", md: "50%" }}
      borderWidth={isActive ? "5px" : "2px"}
      borderColor={isActive ? "green.500" : "gray.200"}
      bgGradient={
        colorTheme === "warm"
          ? "linear(to-br, pink.100, orange.100)"
          : "linear(to-br, blue.100, cyan.100)"
      }
      boxShadow={isActive ? "0 0 0 4px rgba(34,197,94,0.2)" : "md"}
      borderRadius="2xl"
    >
      <CardHeader>
        <Heading size="lg">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text fontSize={{ base: "6xl", md: "7xl" }} lineHeight="1" fontWeight="black">
          {score}
        </Text>
        <Text mt={2} fontSize="lg" fontWeight="semibold">Playing: {playerName}</Text>
      </CardBody>
    </Card>
  );
}

function ViewerPage() {
  const [gameConfig, setGameConfig] = useState(null);
  const [gameScores, setGameScores] = useState(null);

  function normalizeConfig(config) {
    const team1Members = Array.isArray(config.team1Members) && config.team1Members.length > 0
      ? config.team1Members
      : ["Team 1 Player 1"];
    const team2Members = Array.isArray(config.team2Members) && config.team2Members.length > 0
      ? config.team2Members
      : ["Team 2 Player 1"];

    return {
      ...config,
      team1Members,
      team2Members,
    };
  }

  function loadFromStorage() {
    const config = localStorage.getItem(GAME_CONFIG_KEY);
    const scores = localStorage.getItem(GAME_SCORES_KEY);

    setGameConfig(config ? normalizeConfig(JSON.parse(config)) : null);
    setGameScores(scores ? JSON.parse(scores) : null);
  }

  useEffect(() => {
    loadFromStorage();
    const intervalId = setInterval(loadFromStorage, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const upcomingTurns = useMemo(() => {
    if (!gameConfig || !gameScores) {
      return [];
    }
    return getUpcomingTurns(gameConfig, gameScores, 3);
  }, [gameConfig, gameScores]);

  if (!gameConfig || !gameScores) {
    return (
      <VStack p={8} spacing={5}>
        <Heading size="lg">Viewer</Heading>
        <Text>No active game found. Start a game from the controller page.</Text>
        <Button as={RouterLink} to="/" colorScheme="blue">
          Go to Controller
        </Button>
      </VStack>
    );
  }

  const currentPlayer = getCurrentPlayerName(gameConfig, gameScores);

  return (
    <Box p={{ base: 4, md: 6 }}>
      <HStack justifyContent="space-between" mb={6}>
        <Heading size={{ base: "md", md: "lg" }}>Live Viewer</Heading>
        <HStack>
          <Button as={RouterLink} to="/" variant="outline" colorScheme="blue">
            Controller
          </Button>
          <Button onClick={loadFromStorage} variant="outline">
            Refresh
          </Button>
        </HStack>
      </HStack>

      <Card mb={4}>
        <CardBody>
          <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="semibold">
            Current Turn: {gameConfig[`${gameScores.currentTeam}Name`]} - {currentPlayer}
          </Text>
        </CardBody>
      </Card>

      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <TeamViewerCard
          title={gameConfig.team1Name}
          score={gameScores.team1Score}
          isActive={gameScores.currentTeam === "team1"}
          playerName={gameConfig.team1Members[gameScores.team1MemberIndex]}
          colorTheme="warm"
        />
        <TeamViewerCard
          title={gameConfig.team2Name}
          score={gameScores.team2Score}
          isActive={gameScores.currentTeam === "team2"}
          playerName={gameConfig.team2Members[gameScores.team2MemberIndex]}
          colorTheme="cool"
        />
      </Flex>

      <Card mt={6}>
        <CardHeader>
          <Heading size="md">Upcoming 3 Turns</Heading>
        </CardHeader>
        <CardBody>
          <List spacing={2}>
            {upcomingTurns.map((turn, idx) => (
              <ListItem key={`${turn.team}-${turn.memberName}-${idx}`}>
                <Text>
                  {idx + 1}. {turn.teamName} - {turn.memberName}
                </Text>
              </ListItem>
            ))}
          </List>
        </CardBody>
      </Card>
    </Box>
  );
}

export { ViewerPage };

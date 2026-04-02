import { Card, CardBody, CardHeader, Divider, VStack, Text, Button, HStack, Heading } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { HiCheck, HiPause, HiPlay, HiStop, HiX } from "react-icons/hi";
import { advanceMemberForTeam, advanceTurnState, getRandomMovie } from "../../utils/utils";

const TimerCard = (props) => {
  const localStorageGameState = JSON.parse(localStorage.getItem("gameScores"));
  const GAMETIME = Number(props.gameData.timeFirst);
  const PASSTIME = Number(props.gameData.timePassed);
  const [counter, setCounter] = useState(GAMETIME);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const [gameState, setGameState] = useState({
    team1Score: localStorageGameState ? localStorageGameState.team1Score : props.initialGameState.team1Score,
    team2Score: localStorageGameState ? localStorageGameState.team2Score : props.initialGameState.team2Score,
    currentTeam: localStorageGameState ? localStorageGameState.currentTeam : props.initialGameState.currentTeam,
    team1MemberIndex: localStorageGameState
      ? localStorageGameState.team1MemberIndex
      : props.initialGameState.team1MemberIndex,
    team2MemberIndex: localStorageGameState
      ? localStorageGameState.team2MemberIndex
      : props.initialGameState.team2MemberIndex,
    nextMovie: localStorageGameState
      ? localStorageGameState.nextMovie
      : getRandomMovie(props.gameData.languages, props.gameData.includeNsfw),
    isStealTurn: localStorageGameState ? Boolean(localStorageGameState.isStealTurn) : false,
    passedFromTeam: localStorageGameState ? localStorageGameState.passedFromTeam || null : null,
    uuid: localStorageGameState ? localStorageGameState.uuid : uuidv4(),
  });

  const activeMembers =
    gameState.currentTeam === "team1" ? props.gameData.team1Members : props.gameData.team2Members;
  const activeMemberIndex =
    gameState.currentTeam === "team1" ? gameState.team1MemberIndex : gameState.team2MemberIndex;
  const activePlayer = activeMembers[activeMemberIndex] || "-";

  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }

  function startTimer() {
    if (timerRef.current) {
      return;
    }
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          stopTimer();
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);
  }

  function resetCounter() {
    setCounter(GAMETIME);
    stopTimer();
  }

  function toggleTimer() {
    if (isRunning) {
      stopTimer();
      return;
    }
    startTimer();
  }

  function completeTurn(scoreDelta = 0) {
    setGameState((prevState) => {
      const updated = {
        ...prevState,
        team1Score:
          prevState.currentTeam === "team1" ? prevState.team1Score + scoreDelta : prevState.team1Score,
        team2Score:
          prevState.currentTeam === "team2" ? prevState.team2Score + scoreDelta : prevState.team2Score,
      };

      const advanced = advanceTurnState(updated, props.gameData);
      return {
        ...advanced,
        nextMovie: getRandomMovie(props.gameData.languages, props.gameData.includeNsfw),
        isStealTurn: false,
        passedFromTeam: null,
      };
    });

    resetCounter();
  }

  function startStealTurn() {
    setGameState((prevState) => {
      const previousTeam = prevState.currentTeam;
      const nextTeam = previousTeam === "team1" ? "team2" : "team1";
      const advancedPreviousTeam = advanceMemberForTeam(prevState, props.gameData, previousTeam);

      return {
        ...advancedPreviousTeam,
        currentTeam: nextTeam,
        isStealTurn: true,
        passedFromTeam: previousTeam,
      };
    });

    stopTimer();
    setCounter(PASSTIME);
  }

  function resolveStealTurn(stealCorrect) {
    setGameState((prevState) => {
      const stealPoints = stealCorrect ? Number(props.gameData.passedPts) : 0;
      const withScore = {
        ...prevState,
        team1Score:
          prevState.currentTeam === "team1"
            ? prevState.team1Score + stealPoints
            : prevState.team1Score,
        team2Score:
          prevState.currentTeam === "team2"
            ? prevState.team2Score + stealPoints
            : prevState.team2Score,
      };

      // Stealing team keeps next regular turn, but move to their next member.
      const advancedStealTeam = advanceMemberForTeam(withScore, props.gameData, prevState.currentTeam);

      return {
        ...advancedStealTeam,
        isStealTurn: false,
        passedFromTeam: null,
        nextMovie: getRandomMovie(props.gameData.languages, props.gameData.includeNsfw),
      };
    });

    stopTimer();
    setCounter(GAMETIME);
  }

  function skipToNextPlayerSameTeam() {
    setGameState((prevState) => {
      const advancedSameTeam = advanceMemberForTeam(prevState, props.gameData, prevState.currentTeam);
      return {
        ...advancedSameTeam,
        nextMovie: getRandomMovie(props.gameData.languages, props.gameData.includeNsfw),
      };
    });

    stopTimer();
    setCounter(gameState.isStealTurn ? PASSTIME : GAMETIME);
  }

  function toggleCurrentTeamOnly() {
    setGameState((prevState) => ({
      ...prevState,
      currentTeam: prevState.currentTeam === "team1" ? "team2" : "team1",
    }));
  }

  function handleTimerElapsed() {
    if (gameState.isStealTurn) {
      // Steal timeout counts as wrong steal: no points, stealing team keeps next turn.
      resolveStealTurn(false);
      return;
    }

    // Normal turn timeout behaves like pass.
    startStealTurn();
  }

  useEffect(() => {
    props.parentCallback(gameState);
  }, [gameState, props.parentCallback]);

  useEffect(() => {
    if (counter === 0) {
      handleTimerElapsed();
    }
  }, [counter]);

  useEffect(() => {
    return () => stopTimer();
  }, []);

  return (
    <VStack width={{ base: "100%", md: "33%" }}>
      <Card padding="5px" minWidth="100px" width="100%">
        <CardHeader>
          <Heading fontSize="6xl" size="lg">
            {counter}
          </Heading>
          <Text mt={2}>
            Current Turn: {props.gameData[`${gameState.currentTeam}Name`]} - {activePlayer}
          </Text>
          {gameState.isStealTurn && (
            <Text color="orange.600" fontWeight="semibold">
              Steal Turn (Reduced Time)
            </Text>
          )}
        </CardHeader>
        <CardBody>
          <Button margin="5px" variant="outline" onClick={toggleTimer}>
            {isRunning ? <HiPause size="40px" /> : <HiPlay size="40px" />}
          </Button>
          <Button margin="5px" onClick={resetCounter}>
            <HiStop size="40px" />
          </Button>
        </CardBody>
      </Card>

      <Card padding="5px" minWidth="100px" width="100%">
        <CardHeader>
          <Text fontSize="xl">Movie</Text>
        </CardHeader>
        <CardBody>
          <Text fontSize="4xl">{gameState.nextMovie}</Text>
          <Divider />
          <VStack marginTop="10px">
            <HStack>
              <Button
                leftIcon={<HiCheck />}
                colorScheme="green"
                onClick={() => {
                  if (gameState.isStealTurn) {
                    resolveStealTurn(true);
                    return;
                  }
                  completeTurn(Number(props.gameData.correctPts));
                }}
              >
                {gameState.isStealTurn ? "Steal Correct" : "Correct"}
              </Button>

              <Button
                leftIcon={<HiX />}
                colorScheme={gameState.isStealTurn ? "red" : "yellow"}
                onClick={() => {
                  if (gameState.isStealTurn) {
                    resolveStealTurn(false);
                    return;
                  }
                  startStealTurn();
                }}
              >
                {gameState.isStealTurn ? "Steal Wrong" : "Pass"}
              </Button>
            </HStack>

            <Button
              variant="outline"
              onClick={() => {
                skipToNextPlayerSameTeam();
              }}
            >
              Skip Player
            </Button>

            <Button variant="outline" colorScheme="purple" onClick={toggleCurrentTeamOnly}>
              Toggle Team
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export { TimerCard };
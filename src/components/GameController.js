import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { NewForm } from "./Form/Form_new";
import { ScoreCard } from "./Scores/Scorecard";

const GAME_CONFIG_KEY = "gameConfig";
const GAME_SCORES_KEY = "gameScores";

function normalizeConfig(config) {
  const team1Name = (config.team1Name || "Team 1").trim();
  const team2Name = (config.team2Name || "Team 2").trim();
  const team1Members = Array.isArray(config.team1Members)
    ? config.team1Members.filter((member) => String(member).trim())
    : [];
  const team2Members = Array.isArray(config.team2Members)
    ? config.team2Members.filter((member) => String(member).trim())
    : [];

  return {
    ...config,
    team1Name,
    team2Name,
    team1Members: team1Members.length > 0 ? team1Members : [`${team1Name} Player 1`],
    team2Members: team2Members.length > 0 ? team2Members : [`${team2Name} Player 1`],
    languages: {
      hindi: config.languages?.hindi ?? true,
      nepali: config.languages?.nepali ?? true,
      english: config.languages?.english ?? true,
    },
    includeNsfw: config.includeNsfw ?? false,
  };
}

function GameController() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  function handleFormSubmit(data) {
    const normalized = normalizeConfig(data);
    localStorage.setItem(GAME_CONFIG_KEY, JSON.stringify(normalized));
    localStorage.removeItem(GAME_SCORES_KEY);
    setFormData(normalized);
    setFormSubmitted(true);
  }

  function handleResetGame() {
    localStorage.removeItem(GAME_CONFIG_KEY);
    localStorage.removeItem(GAME_SCORES_KEY);
    setFormData(null);
    setFormSubmitted(false);
  }

  useEffect(() => {
    const gameConfigData = localStorage.getItem(GAME_CONFIG_KEY);
    if (gameConfigData) {
      const normalized = normalizeConfig(JSON.parse(gameConfigData));
      localStorage.setItem(GAME_CONFIG_KEY, JSON.stringify(normalized));
      setFormData(normalized);
      setFormSubmitted(true);
    }
  }, []);

  return (
    <Box p={{ base: 4, md: 6 }}>
      <HStack justifyContent="space-between" mb={4}>
        <Heading size={{ base: "md", md: "lg" }}>Dumb Charades</Heading>
        <HStack>
          <Button as={RouterLink} to="/viewer" colorScheme="blue" variant="outline">
            Open Viewer
          </Button>
          {formSubmitted && (
            <Button onClick={handleResetGame} colorScheme="red" variant="outline">
              Restart Game
            </Button>
          )}
        </HStack>
      </HStack>

      <VStack align="stretch" spacing={4}>
        {!formSubmitted ? (
          <NewForm parentCallback={handleFormSubmit} />
        ) : (
          <ScoreCard formData={formData} />
        )}
      </VStack>
    </Box>
  );
}

export { GameController };

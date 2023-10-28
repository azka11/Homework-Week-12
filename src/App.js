import * as React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ChakraProvider,
  Button,
  SimpleGrid,
  Box,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";

import ColorChangingButton from "./colorChange";

function Board() {
  const [squares, setSquare] = React.useState(Array(9).fill(null));
  const [scoreX, setScoreX] = React.useState(0);
  const [scoreO, setScoreO] = React.useState(0);
  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) {
      return;
    }
    const newSquare = [...squares];
    newSquare[square] = calculateNextValue(squares);

    if (calculateWinner(newSquare)) {
      calculateNextValue(squares) === "X"
        ? setScoreX(scoreX + 1)
        : setScoreO(scoreO + 1);
    }

    setSquare(newSquare);
  }

  function restart() {
    setSquare(Array(9).fill(null));
    setScoreX(0);
    setScoreO(0);
  }

  function nextGame() {
    setSquare(Array(9).fill(null));
  }

  function renderSquare(i) {
    return (
      <ColorChangingButton value={squares[i]} onClick={() => selectSquare(i)} />
    );
  }

  return (
    <Card
      h="calc(100vh)"
      background="url(https://wallpapercave.com/wp/8eo35Xc.jpg)"
    >
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem align="start" pt="30%" colSpan={1}>
          <Box
            w="35%"
            borderRadius="xl"
            border="4px"
            textColor="white"
            bg="blue.800"
            textAlign="center"
            mb="4"
            fontWeight="bold"
          >
            <Box fontSize="25px">PLAYER X :</Box>
            <Box fontSize="25px">{scoreX} WINS</Box>
          </Box>
          <Box
            w="35%"
            borderRadius="xl"
            border="4px"
            textColor="white"
            bg="blue.800"
            textAlign="center"
            fontWeight="bold"
          >
            <Box fontSize="25px">PLAYER O : </Box>
            <Box fontSize="25px">{scoreO} WINS</Box>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <CardHeader marginLeft="30px">
            <Heading
              textAlign="center"
              fontSize="40px"
              as="b"
              textColor="white"
            >
              {calculateStatus(
                calculateWinner(squares),
                squares,
                calculateNextValue(squares)
              )}
            </Heading>
          </CardHeader>

          <CardBody w="50%" alignSelf="center">
            <SimpleGrid columns="3" spacing="6">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}

              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}

              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </SimpleGrid>
          </CardBody>

          <CardFooter alignSelf="center">
            <Button
              colorScheme="orange"
              textColor="white"
              fontSize="30px"
              size="lg"
              mr="5"
              onClick={nextGame}
            >
              NEXT GAME
            </Button>
            <Button
              colorScheme="orange"
              textColor="white"
              fontSize="30px"
              size="lg"
              onClick={restart}
            >
              RESTART
            </Button>
          </CardFooter>
        </GridItem>
      </Grid>
    </Card>
  );
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `WINNER : ${winner}`
    : squares.every(Boolean)
    ? `DRAW : There are no winners`
    : `NEXT PLAYER : ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <ChakraProvider>
      <Game />
    </ChakraProvider>
  );
}

export default App;

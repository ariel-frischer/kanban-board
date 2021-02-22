import React from "react";
import "./App.css";
import Board from "./components/board";
import { authorQuoteMap } from "./data";
import {
  Card,
  CardContent,
  colors,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      padding: 20,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    header: { color: colors.blue[700], margin: 30, fontWeight: 700 },
    card: {
      height: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 0,
      backgroundColor: colors.blue[200],
    },
  };
});

function App() {
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" className={classes.header}>
            Ariel's Kanban Board
          </Typography>
        </CardContent>
      </Card>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Container className={classes.container}>
        <Board initial={authorQuoteMap} />
      </Container>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/board";
import { authorQuoteMap, statusQuoteMap } from "./data";
import {
  Card,
  CardContent,
  colors,
  Container,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import useFetch from "./hooks/useFetch";
import { QuoteMap } from "./types";

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
  const [quoteData, setQuoteData] = useState(statusQuoteMap);

  // Useful Custom Hook for fetching data
  const { status, data, error } = useFetch<QuoteMap>(
    `${axios.defaults.baseURL}/getQuotes`
  );

  const renderData = () => {
    if (error) {
      if (error === "Request failed with status code 502") {
        return (
          <div>
            <p>Please drag and drop to add all quotes into the db.</p>
            <Board initial={quoteData} />;
          </div>
        );
      } else {
        return <p>An Error Occurred: {error}, please refresh your browser.</p>;
      }
    } else if (status === "fetching") {
      return <LinearProgress></LinearProgress>;
    } else if (data) {
      return <Board initial={data} />;
    } else {
      return <p>No quotes saved in db yet, please drag and drop some cards.</p>;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      {console.log("data", data)}
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" className={classes.header}>
            Ariel's Kanban Board
          </Typography>
        </CardContent>
      </Card>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Container className={classes.container}>{renderData()}</Container>
    </div>
  );
}

export default App;

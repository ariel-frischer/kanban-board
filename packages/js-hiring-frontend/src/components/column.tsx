import React, { Component } from "react";
import styled from "@emotion/styled";
// import { colors } from "@atlaskit/theme";
import { grid, borderRadius } from "../constants";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  colors,
  Paper,
  Typography,
} from "@material-ui/core";
import { Quote } from "../types";
import { Title } from "./title";
import QuoteList from "./quote-list";
import { STATUS } from "../data";
// import { Draggable } from "../../../src";
// import type { DraggableProvided, DraggableStateSnapshot } from "../../../src";
// import QuoteList from "../primatives/quote-list";
// import Title from "../primatives/title";
// import type { Quote } from "../types";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

type HeaderProps = { isDragging: boolean };
const Header = styled.div<HeaderProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
    isDragging ? colors.blue[400] : colors.blue[100]};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.blue[300]};
  }
`;

type Props = {
  title: string;
  quotes: Quote[];
  status: string;
  // description: string[];
  index: number;
  isScrollable?: boolean;
  isCombineEnabled?: boolean;
  useClone?: boolean;
};

export default class Column extends Component<Props> {
  render() {
    const {
      title,
      status,
      quotes,
      index,
      isScrollable,
      isCombineEnabled,
    } = this.props;
    return (
      <Draggable draggableId={title} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            {/* <Paper {...provided.dragHandleProps}>
              <Typography variant="h6">{`${title}`}</Typography>
              {quotes.map((quote) => {
                return (
                  <Card
                    style={{ width: 200, height: 200 }}
                    aria-label={`${title} quote list`}
                  >
                    <CardContent>
                      <Typography variant="body1">{`${quote.author}`}</Typography>
                      <Typography variant="body1">{`${quote.content}`}</Typography>
                      <Typography variant="body1">{`${quote.id}`}</Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </Paper> */}

            <Header isDragging={snapshot.isDragging}>
              <Title
                // isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
                aria-label={`${status} quote list`}
              >
                {status}
              </Title>
            </Header>
            <QuoteList
              listId={title}
              listType="QUOTE"
              style={{
                backgroundColor: snapshot.isDragging ? colors.green[50] : null,
              }}
              quotes={quotes}
              internalScroll={this.props.isScrollable}
              isCombineEnabled={Boolean(this.props.isCombineEnabled)}
              useClone={Boolean(this.props.useClone)}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}

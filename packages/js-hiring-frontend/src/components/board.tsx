import React, { Component } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
// import { colors } from "@atlaskit/theme";

import Column from "./column";
import reorder, { reorderQuoteMap } from "../reorder";
import {
  DragDropContext,
  DraggableLocation,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";
import { Quote, QuoteMap } from "../types";
import { colors } from "@material-ui/core";
import axios from "axios";
import { parseQuoteMap } from "../data";
// import { Container } from "@material-ui/core";
// import { DragDropContext, Droppable } from '../../../src';

type parentContainerProps = { height: React.CSSProperties["height"] };

const ParentContainer = styled.div<parentContainerProps>`
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  background-color: "white";
  /* like display:flex but will allow bleeding over the window width */
  display: inline-flex;
`;

type Props = {
  initial: QuoteMap;
  // initial: ColumnData[];
  withScrollableColumns?: boolean;
  isCombineEnabled?: boolean;
  containerHeight?: string;
  useClone?: boolean;
};

type State = {
  columns: QuoteMap;
  ordered: string[];
};

export default class Board extends Component<Props, State> {
  static defaultProps = {
    isCombineEnabled: false,
  };

  state: State = {
    columns: this.props.initial,
    ordered: Object.keys(this.props.initial),
  };

  // boardRef: ?HTMLElement;

  onDragEnd = async (result: DropResult) => {
    // if (result.combine) {
    //   if (result.type === "COLUMN") {
    //     const shallow: string[] = [...this.state.ordered];
    //     shallow.splice(result.source.index, 1);
    //     this.setState({ ordered: shallow });
    //     return;
    //   }

    //   const column: Quote[] = this.state.columns[result.source.droppableId];
    //   const withQuoteRemoved: Quote[] = [...column];
    //   withQuoteRemoved.splice(result.source.index, 1);
    //   const columns: QuoteMap = {
    //     ...this.state.columns,
    //     [result.source.droppableId]: withQuoteRemoved,
    //   };
    //   this.setState({ columns });
    //   return;
    // }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const ordered: string[] = reorder(
        this.state.ordered,
        source.index,
        destination.index
      );

      this.setState({
        ordered,
      });

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: this.state.columns,
      source,
      destination,
    });

    this.setState({
      columns: data.quoteMap,
    });

    try {
      const response = await axios.post("/updateQuotes", {
        quotes: JSON.stringify(parseQuoteMap(data.quoteMap)),
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const columns: QuoteMap = this.state.columns;
    const ordered: string[] = this.state.ordered;
    const {
      containerHeight,
      useClone,
      isCombineEnabled,
      withScrollableColumns,
    } = this.props;

    const board = (
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={Boolean(containerHeight)}
        isCombineEnabled={isCombineEnabled}
      >
        {(provided: DroppableProvided) => (
          <Container
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {ordered.map((key: string, index: number) => (
              <Column
                key={key}
                index={index}
                status={key}
                title={key}
                quotes={columns[key]}
                isScrollable={withScrollableColumns}
                isCombineEnabled={isCombineEnabled}
                useClone={useClone}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );

    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {containerHeight ? (
            <ParentContainer height={containerHeight}>{board}</ParentContainer>
          ) : (
            board
          )}
        </DragDropContext>
        <Global
          styles={css`
            body {
              background: #5b84b1ff;
            }
          `}
        />
      </React.Fragment>
    );
  }
}

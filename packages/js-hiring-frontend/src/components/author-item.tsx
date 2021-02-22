import React, { Component } from "react";
import styled from "@emotion/styled";
import { grid } from "../constants";
import { colors } from "@material-ui/core";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { Author } from "../types";

const Avatar = styled.img<any>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-right: ${grid}px;
  border-color: ${({ isDragging }) =>
    isDragging ? colors.green[50] : colors.common.white};
  border-style: solid;
  border-width: ${grid}px;
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px ${colors.common.white[200]}` : "none"};

  &:focus {
    /* disable standard focus color */
    outline: none;

    /* use our own awesome one */
    border-color: ${({ isDragging }) =>
      isDragging ? colors.green[50] : colors.blue[200]};
  }
`;

type Props = {
  author: Author;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
};

export default class AuthorItem extends Component<Props> {
  render() {
    const author: Author = this.props.author;
    const provided: DraggableProvided = this.props.provided;
    const snapshot: DraggableStateSnapshot = this.props.snapshot;

    return (
      <Avatar
        ref={(ref: any) => provided.innerRef(ref)}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        src={author.avatarUrl}
        alt={author.name}
        isDragging={snapshot.isDragging}
      />
    );
  }
}

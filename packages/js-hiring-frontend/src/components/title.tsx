import styled from "@emotion/styled";
import { colors } from "@material-ui/core";
import { grid } from "../constants";

export const Title = styled.h4`
  padding: ${grid}px;
  color: ${colors.blue[100]}
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;

  &:focus {
    outline: 2px solid ${colors.pink[300]};
    outline-offset: 2px;
  }
`;

export default Title;

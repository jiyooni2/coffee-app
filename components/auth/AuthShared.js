import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 4px 8px;
  width: 100%;
  color: white;
  margin-bottom: 8px;
  border-radius: 4px;
  margin-bottom: ${(props) => (props.lastOne ? "10px" : "5px")};
`;

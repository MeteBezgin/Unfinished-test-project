import styled from "styled-components";

export const ImageBlockWrapper = styled.div`
  padding: 2em;
  background: ${({ theme }) => theme.bg};
  margin: 1em;
  min-width: 20%;
  max-width: 30%;
  max-height: max-content;
`;

export const Image = styled.img`
  padding: 1em;
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

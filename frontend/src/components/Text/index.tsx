import styled from "styled-components";

export const Title = styled.h2`
  font-size: 2em;
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0;
`;

export const Subtitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 0;
`;

export const Body = styled.p`
  font-size: 0.8em;
  text-align: left;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 2%;
`;

export const TextBlockWrapper = styled.section`
  padding: 2em;
  background: ${({ theme }) => theme.bg};
  margin: 1em;
  min-width: 20%;
  max-height: fit-content;
  max-width: 30%;
`;

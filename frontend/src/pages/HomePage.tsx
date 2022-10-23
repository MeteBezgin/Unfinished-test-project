import axios from "axios";
import { useEffect, useState } from "react";
import { StyledButton } from "../components/Button";
import { Image, ImageBlockWrapper } from "../components/Image";
import { Body, Subtitle, TextBlockWrapper, Title } from "../components/Text";
import { ImageBlock, TextBlock } from "../types";

const HomePage: React.FC = () => {
  const [imageData, setImageData] = useState<ImageBlock[]>([]);
  const [textData, setTextData] = useState<TextBlock[]>([]);

  const fetchData = async () => {
    // This doesn't check the instance where one of these requests fail I didn't have time.
    Promise.all([
      axios.get("/api/images/all"),
      axios.get("/api/texts/all"),
    ]).then(([imageRes, textRes]) => {
      setImageData(imageRes.data);
      setTextData(textRes.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",

          padding: 40,
          paddingTop: 40,
        }}
      >
        <StyledButton>Add Text Block</StyledButton>
        <StyledButton>Add Image Block</StyledButton>
      </div>
      <Title
        style={{
          paddingTop: 40,
        }}
      >
        Text Blocks
      </Title>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: "5em",
          flexWrap: "wrap",
        }}
      >
        {textData &&
          textData.map((textBlock) => {
            return (
              <TextBlockWrapper>
                <Title>Test Block Title</Title>
                <Subtitle>Test Block Subtitle</Subtitle>
              </TextBlockWrapper>
            );
          })}

        <TextBlockWrapper>
          <Title>Test Block Title</Title>
          <Subtitle>Test Block Subtitle</Subtitle>
        </TextBlockWrapper>
        <TextBlockWrapper>
          <Title>Test Block Title</Title>
          <Subtitle>Test Block Subtitle</Subtitle>
          <Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus,
            tellus eget imperdiet pretium, augue ex imperdiet mi, nec ultrices
            arcu arcu at arcu.
          </Body>
        </TextBlockWrapper>
        <TextBlockWrapper>
          <Title>Test Block Title</Title>
          <Subtitle>Test Block Subtitle</Subtitle>
        </TextBlockWrapper>
      </div>
      <Title
        style={{
          paddingTop: 20,
        }}
      >
        Image Blocks
      </Title>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: "5em",
          flexWrap: "wrap",
        }}
      >
        {imageData &&
          imageData.map((imageBlock) => {
            return (
              <TextBlockWrapper>
                <Title>Test Block Title</Title>
                <Subtitle>Test Block Subtitle</Subtitle>
              </TextBlockWrapper>
            );
          })}

        <ImageBlockWrapper>
          <Title>Test Image Title</Title>
          <Subtitle>Test Image Subtitle</Subtitle>
          <Image src="src/assets/valuecase_logo.png" />
        </ImageBlockWrapper>
      </div>
    </>
  );
};

export default HomePage;

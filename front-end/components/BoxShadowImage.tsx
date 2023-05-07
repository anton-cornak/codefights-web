import Image from "next/image";
import styled from "styled-components";

interface RegistrationImageProps {
  alt: string;
  src: string;
  width: number;
  height: number;
  layout?: "responsive" | "fixed" | "intrinsic" | "fill";
}

const ImageWrapper = styled.div`
  margin: 32px auto;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(2, 2, 2, 0.929), 0 6px 20px 0 rgba(14, 12, 12, 0.929);
  border-radius: 5px;
  width: fit-content;
`;

const BoxShadowImage = ({ alt, src, width, height }:RegistrationImageProps) => {
  return (
    <ImageWrapper>
      <Image
        alt={alt}
        src={`/${src}`}
        width={width}
        height={height}
        quality={70}
      />
    </ImageWrapper>
  );
};

export default BoxShadowImage;

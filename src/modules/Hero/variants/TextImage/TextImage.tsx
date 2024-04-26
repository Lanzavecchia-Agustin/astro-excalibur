import { type FC } from "react";
import * as S from "./styled";
import { Button } from "@components/Button";
import { FadeIn } from "@utils/animations/FadeIn";
import type { ImageProps } from "@static/images";

export type TextImageProps = {
    title: string;
    paragraph: string;
    buttons: {
        text: string;
        link: string;
        variant?: "primary" | "secondary";
    }[];
    image: ImageProps;
};

export const TextImage: FC<TextImageProps> = ({
    title,
    paragraph,
    buttons,
    image,
}) => {
    return (
        <S.TextImageStyled>
            <FadeIn delay={0.2}>
                <S.TextImageContent>
                    <h1 dangerouslySetInnerHTML={{ __html: title }} />
                    <p dangerouslySetInnerHTML={{ __html: paragraph }} />

                    {buttons && buttons.length > 0 && (
                        <S.ButtonsWrapper>
                            {buttons.map((button, index) => {
                                return (
                                    <Button
                                        key={index}
                                        link={button.link}
                                        variant={button.variant}
                                    >
                                        {button.text}
                                    </Button>
                                );
                            })}
                        </S.ButtonsWrapper>
                    )}
                </S.TextImageContent>
            </FadeIn>
            <FadeIn>
                <S.TextImageFigure>
                    <S.TextImage
                        srcLocal={image.srcLocal}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                    />
                </S.TextImageFigure>
            </FadeIn>
        </S.TextImageStyled>
    );
};

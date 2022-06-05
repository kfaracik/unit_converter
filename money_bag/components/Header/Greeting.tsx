import React, { FunctionComponent } from "react";
import { StyleProp, TextStyle } from "react-native";
import styled from "styled-components/native";

// custom components
import { colors } from "../colors";
import RegularText from "../Text/RegularText";
import SmallText from "../Text/SmallText";

const StyleView = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center
`;

interface GreetingProps {
    mainText: string;
    subText: string;
    mainTextStyles?: StyleProp<TextStyle>;
    subTextStyle?: StyleProp<TextStyle>;
}

const Greeting: FunctionComponent<GreetingProps> = (props) => {
    return (
        <StyleView>
            <RegularText
                textStyle={[
                    {
                    color: colors.secondary,
                    fontSize: 22,
                    },
                    props.mainTextStyles,
                ]}
            >
                {props.mainText}
            </RegularText>
            <SmallText
                textStyle={[
                    {
                        color: colors.graydark,
                    },
                    props.subTextStyle,
                ]}
            >
                {props.subText}
            </SmallText>
        </StyleView>
    );
};

export default Greeting;
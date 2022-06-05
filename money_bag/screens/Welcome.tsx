import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// custom component
import { colors } from "../components/colors";
import { Container } from "../components/shared";
import BigText from "../components/Text/BigText";
import SmallText from "../components/Text/SmallText";
import RegularButton from "../components/Buttons/RegularButton";

const WelcomeContainer = styled(Container)`
    background-color: ${colors.secondary};
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

const TopImage = styled.Image`
    width: 100%;
    height: 100%;
    resize-mode: stretch;
`;

const TopSection = styled.View`
    width: 100%;
    flex: 1;
    max-height: 55%;
`;

const BottomSection = styled.View`
    width: 100%;
    padding: 25px;
    flex: 1;
    max-height: 55%;
    justify-content: flex-end;
`;

// image
import background from "./../assets/bgs/background_v1.png";

const Welcome: FunctionComponent = () => {
    return (
        <>
            <StatusBar style="light" />

            <WelcomeContainer>
                <TopSection>
                    <TopImage source={background} />
                </TopSection>
                <BottomSection>
                    <BigText textStyle={{ width: "70%", marginBottom: 25 }}>
                        Best way to track your money
                    </BigText>
                    <SmallText textStyle={{ width: "70%", marginBottom: 25 }}>
                        Best payment method, connects your money to your friends, family.
                    </SmallText>
                    <RegularButton onPress={() => {}}>
                        Get started
                    </RegularButton>
                </BottomSection>
            </WelcomeContainer>
        </>
    );
};

export default Welcome;
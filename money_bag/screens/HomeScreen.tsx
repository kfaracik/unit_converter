import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// custom component
import { colors } from "../components/colors";
import { Container } from "../components/shared";

// TODO!!
const HomeContainter = styled(Container)`
    background-color: ${colors.graylight};
    width: 100%;
    flex: 1;
`;

const HomeScreen: FunctionComponent = () => {
    return (
        <HomeContainter>
            <StatusBar style="dark" />
        </HomeContainter>
    );
};

export default HomeScreen;
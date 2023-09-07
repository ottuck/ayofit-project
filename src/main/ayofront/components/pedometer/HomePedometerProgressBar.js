import React, { useContext } from "react";
import { Text, View, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { PedometerContext } from "../../store/PedometerContext";
import {
  StepProgressContainer,
  StepProgressBar,
  StepProgressText,
  StepsHighlightText,
  StepKcalText,
  StepsText,
} from "../../components/nutriDetail/StyledComponents";
import { GlobalStyles } from "../UI/styles";

// Pedometer Progress Bar Component
const HomePedometerProgressBar = React.memo(() => {
  const { steps, goal, calculateCaloriesBurned } = useContext(PedometerContext);

  return (
    <StepProgressContainer>
      <View>
        <FontAwesome5
          name="running"
          size={36}
          color={GlobalStyles.colors.primary500}
          style={{
            alignSelf: "flex-start",
            left: `${Math.min(((steps * 0.8) / goal) * 100 - 5, 75.5)}%`,
          }}
        />
        <StepProgressBar progress={steps / goal} width={326} height={6.2} />
      </View>
      <StepProgressText>
        <StepKcalText>{calculateCaloriesBurned(steps)} kcal</StepKcalText>
        <Text>
          <StepsHighlightText>{steps}</StepsHighlightText>
          <StepsText> / {goal} Steps</StepsText>
        </Text>
      </StepProgressText>

      {steps >= goal && (
        <FontAwesome5
          name="flag-checkered"
          size={24}
          color="tomato"
          style={{
            position: "absolute",
            top: 5,
            right: 10,
          }}
        />
      )}
    </StepProgressContainer>
  );
});

export default HomePedometerProgressBar;

import React, { useContext, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { PedometerContext } from "./PedometerContext"; // PedometerContext 경로에 맞게 수정

const PedometerRefreshControl = () => {
  const { steps, updateStepsOnServer } = useContext(PedometerContext);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);

    // 현재 걸음수 업데이트 요청
    await updateStepsOnServer(steps);

    // 업데이트 후에 필요한 작업 수행

    setRefreshing(false);
  };

  return <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />;
};

export default PedometerRefreshControl;

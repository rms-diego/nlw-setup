import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#09090A",
      }}
    >
      <ActivityIndicator color={"#4C1D95"} />
    </View>
  );
}

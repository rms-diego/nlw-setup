import { ScrollView, View } from "react-native";

export function Habit() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsHorizontalScrollIndicator={false}></ScrollView>
    </View>
  );
}

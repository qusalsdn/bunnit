import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          switch (route.name) {
            case "index":
              iconName = "home-outline";
              break;
            case "calendar":
              iconName = "calendar-outline";
              break;
            case "library":
              iconName = "library-outline";
              break;
            case "mypage":
              iconName = "person-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "HOME" }} />
      <Tabs.Screen name="calendar" options={{ title: "CALENDAR" }} />
      <Tabs.Screen name="library" options={{ title: "LIBRARY" }} />
      <Tabs.Screen name="mypage" options={{ title: "MY PAGE" }} />
    </Tabs>
  );
}

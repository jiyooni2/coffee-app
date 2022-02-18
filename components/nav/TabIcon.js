import { Ionicons } from "@expo/vector-icons";

function TabIcon({ iconName, color, focused }) {
  return (
    <Ionicons
      name={focused ? iconName : iconName + "-outline"}
      color={color}
      size={focused ? 22 : 20}
    />
  );
}

export default TabIcon;

import { ActivityIndicator, Text, View, ViewStyle } from "react-native";
import { ProgressComponent } from "@react-stateless-dialog/core/lib/progress-manager/models/progress-component";

const VIEW_STYLE: ViewStyle = {
  backgroundColor: "#a0a0a0",
  justifyContent: "center",
  alignItems: "center",
  padding: 50,
  borderRadius: 12,
};

export const DefaultProgressComponent: ProgressComponent = (props) => {
  const { message } = props;

  return (
    <View style={VIEW_STYLE}>
      <ActivityIndicator size="large" color="white" />
      {message && (
        <Text style={{ marginTop: 15, color: "white" }}>{message}</Text>
      )}
    </View>
  );
};

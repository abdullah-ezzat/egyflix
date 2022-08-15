import React from "react";
import { TouchableOpacity } from "react-native";

import StyledText from "./text";

function Link({ title, color, size, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledText color={color} size={size}>
        {title}
      </StyledText>
    </TouchableOpacity>
  );
}

export default Link;

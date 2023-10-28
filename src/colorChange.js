import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

function ColorChangingButton({ value, onClick }) {
  let colorScheme;

  if (value === "X") {
    colorScheme = "red";
  } else if (value === "O") {
    colorScheme = "green";
  } else {
    colorScheme = "blue";
  }

  return (
    <Button
      size="md"
      fontSize="60px"
      paddingBottom="5px"
      height="90px"
      width="90px"
      border="2px"
      borderColor="light.500"
      colorScheme={colorScheme}
      className="square"
      onClick={onClick}
    >
      {value}
    </Button>
  );
}

export default ColorChangingButton;

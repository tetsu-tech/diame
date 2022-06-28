import React from "react";
import { Checkfield } from "./components/CheckField";
import { ChakraProvider } from "@chakra-ui/react";

export default function App() {
  return (
    <ChakraProvider>
      <Checkfield />
    </ChakraProvider>
  );
}

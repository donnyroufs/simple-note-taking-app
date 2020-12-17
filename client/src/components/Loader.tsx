import { Center, Spinner } from "@chakra-ui/react";

export const Loader: React.FC<{}> = () => {
  return (
    <Center h="100vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};

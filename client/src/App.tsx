import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import { DeleteModal } from "./components/DeleteModal";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <DeleteModal isOpen={isOpen} onClose={onClose} />
      <Container mt={12} display="flex" maxW="140ch">
        <Box flex={1} mr={16}>
          <Heading size="1xl" mb={10}>
            Categories
          </Heading>
          <List spacing={3} mb={6}>
            <ListItem
              bgColor="gray.100"
              p={4}
              borderRadius={9}
              _hover={{ bgColor: "gray.200" }}
              cursor="pointer"
            >
              Starcraft 2
            </ListItem>
            <ListItem
              bgColor="gray.100"
              p={4}
              borderRadius={9}
              _hover={{ bgColor: "gray.200" }}
              cursor="pointer"
            >
              Leaguedex
            </ListItem>
          </List>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AddIcon color="gray.300" />}
            />
            <Input placeholder="add new category" variant="ghost" />
          </InputGroup>
        </Box>
        <Box flex={2}>
          <Flex as="header" justify="space-between" align="center" mb={6}>
            <Heading size="1xl">Content</Heading>
            <Button
              variant="solid"
              colorScheme="pink"
              leftIcon={<DeleteIcon />}
              onClick={onOpen}
            >
              Delete
            </Button>
          </Flex>
          <Textarea placeholder="Start writing..." minH={400} />
        </Box>
      </Container>
    </>
  );
};

export default App;

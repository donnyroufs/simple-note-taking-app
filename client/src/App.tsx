import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { DeleteModal } from "./components/DeleteModal";
import Socket, { waitForConnection } from "./utils/socket";
import { useDebounce } from "use-debounce";
import { Loader } from "./components/Loader";
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
  Text,
} from "@chakra-ui/react";

interface Note {
  id: number;
  category: string;
  content: string;
}

enum Status {
  typing,
  synced,
}

const App = () => {
  const [active, setActive] = useState<Note | null>(null); // useLocalStorage
  const [notes, setNotes] = useState<Note[]>([]);
  const [value, setValue] = useState<string>(""); // add debounce

  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<Status>(Status.synced);

  const [categoryValue, setCategoryValue] = useState<string>("");
  const mounted = useRef(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [debouncedValue] = useDebounce(value, 600);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    waitForConnection().then((socket) => {
      socket.on("notes", (notes: any) => {
        if (notes.length > 0) {
          setValue(notes[0].content);
        }
        setNotes(notes);
        if (notes.length > 0) {
          setActive(notes[0]);
        }
        setLoading(false);
      });

      socket.on("updated-content", () => {
        setStatus(Status.synced);
      });

      socket.on("created-category", (data: any) => {
        setNotes((curr) => [data, ...curr]);
        setCategoryValue("");
      });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }

    if (!active) return;

    Socket.emit("changed-content", {
      category: active.category,
      content: debouncedValue.trim().length <= 0 ? "" : debouncedValue,
    });
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    if (active == null) return;

    textAreaRef.current?.focus();

    setValue(active.content);
  }, [active]);

  function createNewCategory(e: React.FormEvent) {
    e.preventDefault();

    if (categoryValue.length <= 0) return;
    console.log("emitting new category: ", categoryValue);
    Socket.emit("create-category", { category: categoryValue });
  }

  function destroyCategory() {
    if (!active) return;
    Socket.emit("destroy-category", { id: active.id });
    setNotes((curr) => curr.filter((n) => n.id !== active.id));
    onClose();
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <DeleteModal isOpen={isOpen} onClose={onClose} onYes={destroyCategory} />
      <Container mt={12} display="flex" maxW="140ch">
        <Box flex={1} mr={16}>
          <Heading size="1xl" mb={10}>
            Categories
          </Heading>
          <List spacing={3} mb={6}>
            {notes.map((note) => (
              <ListItem
                onClick={() => {
                  const _note = notes.find((n) => n.id === note.id);
                  if (!_note) return;

                  setActive(_note);
                }}
                bgColor={
                  active && note.id === active.id ? "gray.200" : "gray.100"
                }
                p={4}
                borderRadius={9}
                _hover={{ bgColor: "gray.200" }}
                cursor="pointer"
                key={note.id}
              >
                {note.category}
              </ListItem>
            ))}
          </List>
          <InputGroup as="form" onSubmit={createNewCategory}>
            <InputLeftElement
              pointerEvents="none"
              children={<AddIcon color="gray.300" />}
            />
            <Input
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
              placeholder="add new category"
              variant="ghost"
            />
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
          <Textarea
            ref={textAreaRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (status !== Status.typing) {
                setStatus(Status.typing);
              }
              setNotes((curr) =>
                curr.map((n) => {
                  if (active && n.id === active.id) {
                    return {
                      ...n,
                      content: e.target.value,
                    };
                  }

                  return n;
                })
              );
            }}
            placeholder="Start writing..."
            minH={400}
          />
          <Text
            fontWeight="bold"
            fontSize="xs"
            color="gray.500"
            align="right"
            mt="6"
            textTransform="uppercase"
            letterSpacing={0.6}
          >
            {status === Status.synced && "Up to date"}
            {status === Status.typing && "Editing..."}
          </Text>
        </Box>
      </Container>
    </>
  );
};

export default App;

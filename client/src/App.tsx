import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import Socket, { waitForConnection } from "./utils/socket";
import { Events, Note, Status } from "./common/index";
import {
  DeleteModal,
  Loader,
  Header,
  CategorySection,
  ContentSection,
} from "./components";
import { Container, useDisclosure } from "@chakra-ui/react";

const App = () => {
  const [active, setActive] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<Status>(Status.synced);

  const [categoryValue, setCategoryValue] = useState<string>("");

  const [value, setValue] = useState<string>("");
  const [debouncedValue] = useDebounce(value, 600);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const mounted = useRef(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    waitForConnection().then((socket) => {
      socket.on(Events.getNotes, (notes: any) => {
        if (notes.length > 0) {
          setValue(notes[0].content);
        }
        setNotes(notes);
        if (notes.length > 0) {
          setActive(notes[0]);
        }
        setLoading(false);
      });

      socket.on(Events.updatedContent, () => {
        setStatus(Status.synced);
      });

      socket.on(Events.createdCategory, (data: any) => {
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

    Socket.emit(Events.changedContent, {
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

  function destroyCategory() {
    if (!active) return;
    Socket.emit(Events.destroyCategory, { id: active.id });
    setNotes((curr) => curr.filter((n) => n.id !== active.id));
    onClose();
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
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
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* refactor with a portal */}
      <DeleteModal isOpen={isOpen} onClose={onClose} onYes={destroyCategory} />

      <Header />
      <Container mt={12} display="flex" maxW="1200px">
        <CategorySection
          active={active}
          categoryValue={categoryValue}
          notes={notes}
          setActive={setActive}
          setCategoryValue={setCategoryValue}
        />
        <ContentSection
          handleChange={handleChange}
          onOpen={onOpen}
          status={status}
          textAreaRef={textAreaRef}
          value={value}
        />
      </Container>
    </>
  );
};

export default App;

import { useEffect, useRef } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Categories, AddCategory } from "./components/index";
import { Events, Note } from "../../common";
import Socket from "../../utils/socket";

interface ICategorySectionProps {
  setCategoryValue: React.Dispatch<React.SetStateAction<string>>;
  categoryValue: string;
  setActive: React.Dispatch<React.SetStateAction<Note | null>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  notes: Note[];
  active: Note | null;
  debouncedValue: string;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

export const CategorySection: React.FC<ICategorySectionProps> = ({
  setCategoryValue,
  categoryValue,
  debouncedValue,
  notes,
  setActive,
  active,
  setValue,
  textAreaRef,
}) => {
  const mounted = useRef(false);

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
    if (active === null) return;

    textAreaRef.current?.focus();

    setValue(active.content);
  }, [active, setValue, textAreaRef]);

  function createNewCategory(e: React.FormEvent) {
    e.preventDefault();

    if (categoryValue.length <= 0) return;
    Socket.emit(Events.createCategory, { category: categoryValue });
  }

  function handleSetActive(note: Note) {
    const _note = notes.find((n) => n.id === note.id);
    if (!_note) return;

    setActive(_note);
  }

  return (
    <Box flex={1} mr={16}>
      <Heading size="1xl" mb={10}>
        Categories
      </Heading>
      <Categories
        active={active}
        handleSetActive={handleSetActive}
        notes={notes}
      />
      <AddCategory
        categoryValue={categoryValue}
        createNewCategory={createNewCategory}
        setCategoryValue={setCategoryValue}
      />
    </Box>
  );
};

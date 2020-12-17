import { Box, Heading } from "@chakra-ui/react";
import { Categories, AddCategory } from "./components/index";
import { Events, Note } from "../../common";
import Socket from "../../utils/socket";

interface ICategorySectionProps {
  setCategoryValue: React.Dispatch<React.SetStateAction<string>>;
  categoryValue: string;
  setActive: React.Dispatch<React.SetStateAction<Note | null>>;
  notes: Note[];
  active: Note | null;
}

export const CategorySection: React.FC<ICategorySectionProps> = ({
  setCategoryValue,
  categoryValue,
  notes,
  setActive,
  active,
}) => {
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

import { ListItem } from "@chakra-ui/react";
import { Note } from "../../../../common";

interface ICategoryProps {
  handleSetActive: (note: Note) => void;
  active: Note | null;
  note: Note;
}

export const Category: React.FC<ICategoryProps> = ({
  handleSetActive,
  active,
  note,
}) => {
  return (
    <ListItem
      onClick={() => handleSetActive(note)}
      bgColor={active && note.id === active.id ? "gray.200" : "gray.100"}
      p={4}
      borderRadius={9}
      _hover={{ bgColor: "gray.200" }}
      cursor="pointer"
      key={note.id}
    >
      {note.category}
    </ListItem>
  );
};

export default Category;

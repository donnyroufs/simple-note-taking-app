import { List, ListItem } from "@chakra-ui/react";
import { Note } from "../../../../common";

interface ICategoriesProps {
  notes: Note[];
  handleSetActive: (note: Note) => void;
  active: Note | null;
}

export const Categories: React.FC<ICategoriesProps> = ({
  notes,
  handleSetActive,
  active,
}) => {
  return (
    <List spacing={3} mb={6}>
      {notes.map((note) => (
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
      ))}
    </List>
  );
};

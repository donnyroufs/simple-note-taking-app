import { List } from "@chakra-ui/react";
import { Note } from "../../../../common";
import Category from "../category/Category";

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
        <Category
          note={note}
          handleSetActive={handleSetActive}
          active={active}
        />
      ))}
    </List>
  );
};

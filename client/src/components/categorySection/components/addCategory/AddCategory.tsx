import { AddIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";

interface IAddCategoryProps {
  createNewCategory: (e: React.FormEvent<HTMLDivElement>) => void;
  setCategoryValue: React.Dispatch<React.SetStateAction<string>>;
  categoryValue: string;
}

export const AddCategory: React.FC<IAddCategoryProps> = ({
  createNewCategory,
  categoryValue,
  setCategoryValue,
}) => {
  return (
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
  );
};

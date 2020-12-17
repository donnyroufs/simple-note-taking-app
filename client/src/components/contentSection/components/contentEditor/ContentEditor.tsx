import { Textarea } from "@chakra-ui/react";

interface IContentEditorProps {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ContentEditor: React.FC<IContentEditorProps> = ({
  textAreaRef,
  value,
  handleChange,
}) => {
  return (
    <Textarea
      ref={textAreaRef}
      value={value}
      onChange={handleChange}
      placeholder="Start writing..."
      minH={400}
    />
  );
};

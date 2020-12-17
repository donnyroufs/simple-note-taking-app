import { ContentEditor, ContentStatus } from "./components/index";
import { Note, Status } from "../../common/index";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";

interface IContentSectionProps {
  onOpen: () => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  active: Note | null;
  status: Status;
}

export const ContentSection: React.FC<IContentSectionProps> = ({
  onOpen,
  textAreaRef,
  value,
  status,
  setValue,
  setNotes,
  setStatus,
  active,
}) => {
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

  return (
    <Box flex={2}>
      <Flex as="header" justify="space-between" align="center" mb={6}>
        <Heading size="1xl">Content</Heading>
        <Button
          variant="solid"
          colorScheme="pink"
          leftIcon={<DeleteIcon />}
          onClick={onOpen}
          pb="0.2rem"
        >
          Delete
        </Button>
      </Flex>
      <ContentEditor
        handleChange={handleChange}
        value={value}
        textAreaRef={textAreaRef}
      />
      <ContentStatus status={status} />
    </Box>
  );
};

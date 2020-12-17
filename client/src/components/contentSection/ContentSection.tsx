import { ContentEditor, ContentStatus } from "./components/index";
import { Status } from "../../common/index";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";

interface IContentSectionProps {
  onOpen: () => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  status: Status;
}

export const ContentSection: React.FC<IContentSectionProps> = ({
  onOpen,
  textAreaRef,
  value,
  handleChange,
  status,
}) => {
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

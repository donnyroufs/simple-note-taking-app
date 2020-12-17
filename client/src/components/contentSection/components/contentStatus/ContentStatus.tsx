import { Status } from "../../../../common";
import { Text } from "@chakra-ui/react";

interface IContentStatusProps {
  status: Status;
}

export const ContentStatus: React.FC<IContentStatusProps> = ({ status }) => {
  return (
    <Text
      fontWeight="bold"
      fontSize="xs"
      color="gray.500"
      align="right"
      mt="6"
      textTransform="uppercase"
      letterSpacing={0.6}
    >
      {status === Status.synced && "Up to date"}
      {status === Status.typing && "Editing..."}
    </Text>
  );
};

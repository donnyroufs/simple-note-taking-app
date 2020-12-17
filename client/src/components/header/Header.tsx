import { Flex, Box, Heading } from "@chakra-ui/react"

export const Header: React.FC<{}> = () => {
  return (
      <Flex as="header" align="center" justify="center" py={12}>
        <Box maxW="1200px" w="100%" ml={8}>
          <Heading fontSize="2xl" color="blue.500">
            NTaker
          </Heading>
        </Box>
      </Flex>
  )
}
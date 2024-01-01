import { Avatar, Box, Button, Divider, Flex, Heading, Input, InputGroup, InputRightAddon, Spinner, Stack, Text } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { useState } from 'react'
import { IUserSearch } from '@/types/UserProps'
import { useNavigate } from 'react-router-dom';
import useSearch from '../hook/useSearch';

export default function Search() {
  const { users, isLoading } = useSearch();
  const [ filter, setFilter ] = useState<string>('');
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/`);
  }

  if (isLoading) return <Spinner />

  const result = filter.length > 0
  ? users.filter((user: IUserSearch) => `${user.username} ${user.fullname}`.toLowerCase().includes(filter.toLowerCase()))
  : null;

  return (
    <Box borderX={"1px"} borderColor={"gray.500"} h={"100vh"}>
      <Button
        onClick={handleNavigate}
        colorScheme={"green"}
        rounded={"full"}
        p={5}
        m={"4"}
        gap={2}
      >
        <BiArrowBack size={20} /> Search
      </Button>
      <Stack>
        <InputGroup size="sm" px={4}>
          <Input
            rounded="md"
            placeholder="Search user..."
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
          <InputRightAddon
            children="Username or Fullname"
            bgColor="gray.700"
            rounded="md"
          />
        </InputGroup>
      </Stack>

      <Box maxW="full" mx="auto" p="2rem">
        {result ? (
          result.map((user: IUserSearch) => (
            <Box key={user.id}>
              <Flex gap="4" py="1rem">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar src={user.photo_profile} size="sm" />
                  <Box>
                    <Heading size="sm">{user.fullname}</Heading>
                    <Text fontSize="xs" color="whiteAlpha.600">
                      @{user.username}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Divider variant="dashed" colorScheme="green" />
            </Box>
          ))
          ) : (
          <Box display="flex" minH="sm" alignItems="center" justifyContent="center">
            <Text fontSize={"lg"} textAlign="center">Start searching a user</Text>
          </Box>
        )}
      {result?.length === 0 && (
        <Box display="flex" minH="sm" alignItems="center" justifyContent="center">
        <Text textAlign="center">User Not Found</Text>
      </Box>
      )}
      </Box>
    </Box>
  )
}

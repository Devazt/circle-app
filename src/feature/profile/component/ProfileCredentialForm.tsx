import { useForm } from "react-hook-form";
import FormRow from "@/components/FormRow";
import { Box, Button, Flex, Input, Stack } from "@chakra-ui/react";
import useUpdateCredential from "../hook/useUpdateCredential";
import FormProfile from "./FormProfile";
import { useProfileCard } from "../hook/useProfileCard";
import Spinner from "@/components/Spinner";

export default function ProfileCredentialForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { form, setForm, updateUser, isUpdating } = useUpdateCredential();

  function onSubmit({ password }: any) {
    setForm({ ...form, password });
    updateUser();
  }

  const { profile, isLoading } = useProfileCard();
  if (isLoading) return <Spinner />;

  return (
    <Stack w={"full"} alignItems={"center"}>
      <Flex direction={"column"} gap={4}>
        <Box p={4} borderBottom={"1px"} borderColor={"gray.500"}>
          <FormProfile
            photo_profile={profile.photo_profile}
            username={profile.username}
            fullname={profile.fullname}
            bio={profile.bio}
          />
        </Box>
      </Flex>
      <Box
        w={"400px"}
        display={"flex"}
        flexDirection="column"
        bgColor="gray.700"
        rounded="xl"
        px="5"
        py="9"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRow
            label="New password (min 8 chars)"
            error={errors?.password?.message?.toString()}
          >
            <Input
              type="password"
              isDisabled={isUpdating}
              id="password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
          </FormRow>
          <FormRow
            label="Confirm new password"
            error={errors?.passwordConfirm?.message?.toString()}
          >
            <Input
              type="password"
              id="passwordConfirm"
              isDisabled={isUpdating}
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  getValues().password === value || "Passwords do not match",
              })}
            />
          </FormRow>
          <Box
            mt="20px"
            display="flex"
            justifyContent="space-between"
            maxW="11rem"
          >
            <Button onClick={reset} type="reset">
              Cancel
            </Button>
            <Button type="submit" isLoading={isUpdating} colorScheme="green">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Stack>
  );
}

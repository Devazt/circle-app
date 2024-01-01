import { useForm } from "react-hook-form";
import { useUpdateProfile } from "../hook/useUpdateProfile";
import { Box, Button, Image, Input, Stack } from "@chakra-ui/react";
import FormRow from "@/components/FormRow";

export default function FormProfile({
  photo_profile,
  username,
  fullname,
  bio,
}: any) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const { form, setForm, updateUser, isUpdating } = useUpdateProfile();

  function onSubmit({ username, fullname, bio }: any) {
    setForm({ ...form, username, fullname, bio });
    updateUser();
  }

  return (
    <Stack w={"full"} alignItems={"center"}>
      <Box
        w="400px"
        display={"flex"}
        flexDirection="column"
        bgColor="gray.700"
        rounded="xl"
        px="5"
        py="9"
      >
        <Box display="flex" justifyContent="center">
          <Image
            h="140px"
            w="auto"
            objectFit="cover"
            rounded="full"
            src={photo_profile}
            border="4px"
            borderColor="green.400"
          />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRow
            label="Fullname"
            error={errors?.fullname?.message?.toString()}
          >
            <Input
              defaultValue={fullname}
              type="text"
              isDisabled={isUpdating}
              id="fullname"
              {...register("fullname", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow
            label="Username"
            error={errors?.username?.message?.toString()}
          >
            <Input
              defaultValue={username}
              type="text"
              id="username"
              isDisabled={isUpdating}
              {...register("username", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Bio" error={errors?.bio?.message?.toString()}>
            <Input
              defaultValue={bio}
              type="text"
              id="bio"
              isDisabled={isUpdating}
              {...register("bio", {
                required: "This field is required",
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

import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";

type FormRowProps = {
  label?: string;
  error?: string;
  children: React.ReactNode;
};

function FormRow({ label, error, children }: FormRowProps) {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      {error && <FormHelperText color="red.500">{error}</FormHelperText>}
    </FormControl>
  );
}

export default FormRow;

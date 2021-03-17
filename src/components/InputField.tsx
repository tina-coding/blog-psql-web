import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type ConsumerProps = Record<'name' | 'label', string>;
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & ConsumerProps & { textarea?: boolean };

const InputField: React.FC<InputFieldProps> = ({label, size: _, textarea = false, ...props}) => {
	const [field, { error }] = useField(props);

	const InputField = textarea ? Textarea : Input;
	return (
    <FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<InputField
				{...field}
				{...props}
				id={field.name}
      />
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

export default InputField;
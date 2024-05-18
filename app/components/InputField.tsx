import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { Form, useField } from "formik";
import React, { InputHTMLAttributes } from "react";


interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label?: string,
    placeholder?: string
}

const InputField: React.FC<InputFieldProps> = (props) => {
    const [field, { error }] = useField(props);
    const label = props.label || props.name;
    const placeholder = props.placeholder || props.label;
    const type = props.type || "text";

    return (
        <>
            <FormControl isInvalid={!!error}>
                <FormLabel htmlFor={field.name}>{label}</FormLabel>
                <Input {...field} id={field.name} placeholder={placeholder} type={type} />
                {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
            </FormControl>
        </>
    );
};

export default InputField;
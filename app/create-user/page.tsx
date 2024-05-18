"use client";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useMutation } from "urql";
import { toErrorsMap } from "../lib/utils/toErrorMap";
import { useRouter } from "next/navigation";
import { useCreateUserMutation } from "../lib/graphql/generated/graphql";


interface CreateUserProps { };

const CreateUser: React.FC<CreateUserProps> = ({ }) => {
    const [, createUser] = useCreateUserMutation();
    const router = useRouter();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const res = await createUser(values as any);
                    if (res.data?.createUser.errors)
                        setErrors(toErrorsMap(res.data.createUser.errors));
                    else if (res.data?.createUser.user)
                        router.push("/");
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name="username" />
                        <Box mt={4}> <InputField name="password" type="password" /></Box>
                        <Button
                            mt={4}
                            colorScheme='teal'
                            isLoading={isSubmitting}
                            type='submit'
                        >
                            create user
                        </Button>
                    </Form>
                )}

            </Formik>
        </Wrapper>
    );
};

export default CreateUser;
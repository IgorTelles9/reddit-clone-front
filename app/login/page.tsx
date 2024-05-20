"use client";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useLoginMutation } from "../lib/graphql/generated/graphql";
import { toErrorsMap } from "../lib/utils/toErrorMap";

interface LoginProps { };

const Login: React.FC<LoginProps> = ({ }) => {
    const [login] = useLoginMutation();
    const router = useRouter();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ usernameOrEmail: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const res = await login({ variables: { ...values }, refetchQueries: ["Me"] });
                    if (res.data?.login.errors)
                        setErrors(toErrorsMap(res.data.login.errors));
                    else if (res.data?.login.user) {
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Box p={4}>
                        <Form>
                            <InputField name="usernameOrEmail" label="username or email" placeholder="username/email" />
                            <InputField name="password" type="password" />
                            <Button
                                mt={4}
                                colorScheme='teal'
                                isLoading={isSubmitting}
                                type='submit'
                            >
                                login
                            </Button>
                        </Form>
                    </Box>
                )}

            </Formik>
        </Wrapper>
    );
};

export default Login;
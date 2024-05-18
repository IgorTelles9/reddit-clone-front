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
    const [, login] = useLoginMutation();
    const router = useRouter();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const res = await login(values as any);
                    if (res.data?.login.errors)
                        setErrors(toErrorsMap(res.data.login.errors));
                    else if (res.data?.login.user) {
                        console.log(res.data.login.user);
                        router.push("/");
                    }
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
                            login
                        </Button>
                    </Form>
                )}

            </Formik>
        </Wrapper>
    );
};

export default Login;
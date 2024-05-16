"use client";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";

interface RegisterProps { };

const Register: React.FC<RegisterProps> = ({ }) => {
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values) => console.log(values)}
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
                            register
                        </Button>
                    </Form>
                )}

            </Formik>
        </Wrapper>
    );
};

export default Register;
"use client";
import { EmailIcon } from "@chakra-ui/icons";
import { Button, useToast, UseToastOptions } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../lib/graphql/generated/graphql";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
    const [forgotPassword] = useForgotPasswordMutation();
    const toast = useToast();
    const toastOptions: UseToastOptions = {
        title: "Email sent.",
        description:
            "If you have an account, you will receive an email with a link to reset your password.",
        status: "success",
        duration: 6000,
        isClosable: true,
    };
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ usernameOrEmail: "" }}
                onSubmit={async (values) => {
                    await forgotPassword({
                        variables: { ...values },
                        refetchQueries: ["Me"],
                    }).then(() => toast(toastOptions));
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="usernameOrEmail"
                            label="username or email"
                            placeholder="username/email"
                        />
                        <Button
                            leftIcon={<EmailIcon />}
                            mt={4}
                            colorScheme="teal"
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            send password reset
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default ForgotPassword;

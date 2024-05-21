"use client";
import InputField from "@/app/components/InputField";
import Wrapper from "@/app/components/Wrapper";
import { useChangePasswordMutation } from "@/app/lib/graphql/generated/graphql";
import { toErrorsMap } from "@/app/lib/utils/toErrorMap";
import { Box, Button, Flex, Link, useToast, UseToastOptions } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChangePassword({ params }: { params: { token: string } }) {
    const router = useRouter();
    const [changePassword] = useChangePasswordMutation();
    const toast = useToast();
    const toastOptions: UseToastOptions = {
        title: "Link Expired!",
        description:
            "Your password reset link has expired. You'll be redirected to the forgot password page.",
        status: "loading",
        colorScheme: "red",
        duration: 6000,
        isClosable: true,
        onCloseComplete: () => router.push("/forgot-password"),
    };

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ token: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const res = await changePassword({
                        variables: { token: params.token, password: values.password },
                        refetchQueries: ["Me"],
                    });
                    if (res.data?.changePassword.errors) {
                        const errorMap = toErrorsMap(res.data.changePassword.errors);
                        if ("token" in errorMap) toast(toastOptions);
                        setErrors(errorMap);
                    } else if (res.data?.changePassword.user) router.push("/");
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="password"
                            label="new password"
                            placeholder="new password"
                            type="password"
                        />

                        <Button mt={2} colorScheme="teal" isLoading={isSubmitting} type="submit">
                            change password
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

// export default ChangePassword;

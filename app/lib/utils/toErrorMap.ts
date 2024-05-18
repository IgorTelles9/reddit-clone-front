import { FieldError } from "../graphql/generated/graphql";

export const toErrorsMap = (errors: FieldError[]): Record<string, string> => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
        errorMap[field] = message;
    });
    return errorMap;
};
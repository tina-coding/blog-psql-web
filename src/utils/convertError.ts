import { FieldError } from './../generated/graphql';
export const toFormikError = (error: FieldError[]) => {
	const formikError: Record<string, string> = {};
	error.forEach(({ field, message }) => {
		formikError[field] = message;
	});

	return formikError;
}
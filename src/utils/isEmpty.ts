export function isEmpty<T>(param: T): boolean {
	switch (typeof param) {
		case 'string':
			return param === "" || param === " ";
		default:
			return false;
	}
}
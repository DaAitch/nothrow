export const nothrow = <T>(accessor: () => T): T => {
	try {
		return accessor();
	} catch (e) {
		return undefined;
	}
};
export const getKeys = <T extends object>(obj: T) =>
	Object.keys(obj) as Array<keyof T>

export function jsonCopy<T extends object>({ object }: { object: T }): T {
  return JSON.parse(JSON.stringify(object));
}

export const makeApiUrlFactory = (path: string): string => {
  return `http://fordevs.herokuapp.com/api${path}`
}

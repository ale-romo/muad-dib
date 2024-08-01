export function replaceUnderscoresWithSpaces(input: string) {
  return input.replace(/_/g, ' ');
}

export function replaceSpacesWithUnderscores(input: string) {
  return input.replace(/ /g, '_');
}

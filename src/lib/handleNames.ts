export const replaceUnderscoresWithSpaces = (input: string) => {
  return input.replace(/_/g, ' ');
}

export const replaceSpacesWithUnderscores = (input: string) => {
  return input.replace(/ /g, '_');
}

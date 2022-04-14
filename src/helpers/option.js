const langImage = {
  english: "https://countryflagsapi.com/svg/us",
  indonesia: "https://countryflagsapi.com/svg/id",
  china: "https://countryflagsapi.com/svg/cn",
  japanese: "https://countryflagsapi.com/svg/jp",
  korea: "https://countryflagsapi.com/svg/kr",
  india: "https://countryflagsapi.com/svg/in",
  russia: "https://countryflagsapi.com/svg/ru",
};

export function genLanguageOption(languages) {
  return languages.map((language) => {
    return {
      value: language,
      label: language,
      flag: langImage[language.toLowerCase()],
    };
  });
}

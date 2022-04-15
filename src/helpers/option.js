const langImage = {
  english: "/images/flags/english.png",
  china: "/images/flags/china.png",
  japanese: "/images/flags/japanese.png",
  korea: "/images/flags/south-korea.png",
  india: "/images/flags/india.png",
  russia: "/images/flags/russia.png",
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

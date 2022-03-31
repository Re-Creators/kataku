export function greetTime() {
  const time = new Date().getHours();

  if (time < 12) {
    return "Pagi";
  } else if (time < 15) {
    return "Siang";
  } else if (time < 18) {
    return "Sore";
  }

  return "Malam";
}

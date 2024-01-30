export default function getRandomFilename() {
  return `${Date.now()}_${Math.floor(Math.random() * 10000 + 10000)}`;
}
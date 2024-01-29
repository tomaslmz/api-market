export default function getRandomEmail() {
  const random = () => Math.floor(Math.random() * 10000 + 10000);
  return `${Date.now()}${random()}@test.com}`;
}
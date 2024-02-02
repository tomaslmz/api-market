export default function getRandomEmail() {
  return `${Math.round(Math.random()*100000)}@test.com`;
}
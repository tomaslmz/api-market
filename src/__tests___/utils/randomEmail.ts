import { v4 as uuidv4 } from 'uuid';

export default function getRandomEmail() {
  return `${uuidv4()}@test.com`;
}
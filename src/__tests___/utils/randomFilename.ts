import { v4 as uuidv4 } from 'uuid';

export default function getRandomFilename() {
  return `${Date.now()}_${uuidv4()}`;
}
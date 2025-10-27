import { v4 as uuidv4 } from "uuid";

function generateIdempotencyKey() {
  return uuidv4();
}

export default generateIdempotencyKey;

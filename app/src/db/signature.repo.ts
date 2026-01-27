import { db, SignatureRecord } from "../db/database";

export const signatureRepo = {
  save(signature: SignatureRecord) {
    return db.signatures.add(signature);
  },
  get(id: number) {
    return db.signatures.get(id);
  },
  delete(id: number) {
    return db.signatures.delete(id);
  },
};

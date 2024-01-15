import { hash, genSalt, compare as compareHash } from 'bcrypt';

export const encrypt = async (password: string) => {
    const salt = await genSalt(8);

    const passwordHash = await hash(password, salt);

    return passwordHash;
};

export const compare = async (hash1: string, hash2: string) => {
    const isEqual = await compareHash(hash1, hash2);

    return isEqual;
};
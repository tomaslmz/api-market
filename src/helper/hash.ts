import { hash, compare as compareHash } from 'bcrypt';

export const encrypt = async (password: string) => {
    const passwordHash = await hash(password, 8);

    return passwordHash;
};

export const compare = async (actualPassword: string, encryptedPassword: string) => {
    const isEqual = await compareHash(actualPassword, encryptedPassword);

    return isEqual;
};
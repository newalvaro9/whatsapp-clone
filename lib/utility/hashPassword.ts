import bcrypt from 'bcrypt';

export default async function hashPassword(password: string): Promise<string> {
    let hash: string = await bcrypt.hash(password, 12)
    return hash
}
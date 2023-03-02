import bcrypt from 'bcrypt';

export default async function hashPassword(password: string) {
    let hash = await bcrypt.hash(password, 12)
    return hash
}
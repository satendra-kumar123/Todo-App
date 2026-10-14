import bcrypt from 'bcrypt'

export async function hashingPassword(password) {
    return await bcrypt.hash(password, 10)
}

export async function comparePassword(password, hashedpassword) {
    return await bcrypt.compare(password, hashedpassword)
}
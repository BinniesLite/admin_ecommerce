import jwt from 'jsonwebtoken';

export const MAX_AGE = 3 * 24 * 60 * 60;

export const createToken = (id: any) => {
    return jwt.sign(
        id, 
        process.env.AUTH_SECRET as string, 
        { expiresIn: MAX_AGE} 
    ) // payload
}   
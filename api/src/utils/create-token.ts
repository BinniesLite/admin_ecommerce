import jwt from "jsonwebtoken";

export const MAX_AGE = 3 * 60 * 60 * 24

// Return a token
export const createToken = (id: string) => {
    return jwt.sign( 
        { id }, // an id to hash the code
        process.env.AUTH_SECRET as string, // a secret string
        { expiresIn: MAX_AGE} // when does it expires
    )   
}
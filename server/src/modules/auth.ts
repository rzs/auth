import jwt  from "jsonwebtoken";

export interface UserDef {
    id: string;
    username: string;
}

export class User {
    id: string;
    username: string;
    constructor(data: UserDef) {
        this.id = data.id;
        this.username = data.username;
    }
}

export const user = new User({id: 'MyUser', username: 'Dan'})

export const createJWT = (user: User) => {
    const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET!);
    return token;
}
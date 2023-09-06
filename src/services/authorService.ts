import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Author } from '../models/author';

const registerAuthor = async (email: string, name: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return Author.create({ email, name, password: hashedPassword });
};

const loginAuthor = async (email: string, password: string) => {
    const author = await Author.findOne({ email }).select('password');
    if (!author) {
        throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, author.password);
    if (!passwordMatch) {
        throw new Error('Invalid email or password');
    }

    const jwtSecretKey = process.env.JWT_SECRET!;
    const token = jwt.sign({ id: author._id }, jwtSecretKey);
    return token;
};

export default {
    registerAuthor,
    loginAuthor
};

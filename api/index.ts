import { User, Mailbox } from '../types';
import { jwtDecode } from 'jwt-decode';

// --- MOCK DATABASE ---
// In a real app, this would be a database.
const MOCK_USERS: { [email: string]: { user: User, passwordHash: string, isVerified: boolean } } = {
    'test@example.com': {
        user: { name: 'Test User', email: 'test@example.com', picture: 'https://i.pravatar.cc/150?u=test' },
        passwordHash: 'password123',
        isVerified: true
    }
};

const MOCK_MAILBOXES: { [userId: string]: Mailbox[] } = {
    'test@example.com': [
        { id: 'mb_1', address: 'my-work-alias@altmail.pro' },
        { id: 'mb_2', address: 'project-xyz@altmail.pro' },
        { id: 'mb_3', address: 'personal-dev@altmail.pro' },
    ]
};

const MOCK_STATS = {
    mailboxesCreated: 3,
    emailsReceived24h: 14,
};
// --- END MOCK DATABASE ---

// --- Helper for simulating network delay ---
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- API Functions ---

// Authentication
export const login = async (email: string, password: string): Promise<{ user: User, token: string }> => {
    await sleep(1000);
    const storedUser = MOCK_USERS[email];
    if (storedUser && storedUser.passwordHash === password) {
        if (!storedUser.isVerified) {
             throw new Error(`Account not verified. Please check your email.`);
        }
        return { user: storedUser.user, token: `mock-jwt-for-${email}` };
    }
    throw new Error('Invalid email or password.');
};

export const loginWithGoogle = async (googleCredential: string): Promise<{ user: User, token: string }> => {
    await sleep(1000);
    try {
        const decoded: { name: string, email: string, picture: string } = jwtDecode(googleCredential);
        
        let userToReturn: User;

        if (MOCK_USERS[decoded.email]) {
            // User exists, update their info with the latest from Google and return it.
            const existingUserEntry = MOCK_USERS[decoded.email];
            existingUserEntry.user.name = decoded.name;
            existingUserEntry.user.picture = decoded.picture;
            existingUserEntry.isVerified = true; // Google sign-in auto-verifies
            userToReturn = existingUserEntry.user;
        } else {
            // User does not exist, create a new one.
            const newUser: User = { name: decoded.name, email: decoded.email, picture: decoded.picture };
            MOCK_USERS[decoded.email] = { user: newUser, passwordHash: 'google-provided', isVerified: true };
            userToReturn = newUser;
        }
        
        return { user: userToReturn, token: `mock-jwt-for-${decoded.email}` };
    } catch (e) {
        throw new Error('Invalid Google credential.');
    }
};

export const signup = async (email: string, password: string): Promise<{ user: User, token: string }> => {
    await sleep(1000);
    if (MOCK_USERS[email]) {
        throw new Error('An account with this email already exists.');
    }
    const name = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const newUser: User = { name, email }; // No picture on manual signup
    MOCK_USERS[email] = { user: newUser, passwordHash: password, isVerified: false };
    
    // In a real app, you would NOT return a token until the user is verified.
    // For this mock flow, we return a temporary token, but login will be blocked.
    console.log(`--- MOCK SIGNUP ---
    An account has been created for ${email}.
    The mock verification code is: 123456
    --- END MOCK SIGNUP ---`);
    return { user: newUser, token: `mock-jwt-for-${email}` };
};

export const getCurrentUser = async (token: string): Promise<User> => {
    await sleep(500);
    if (token.startsWith('mock-jwt-for-')) {
        const email = token.replace('mock-jwt-for-', '');
        if (MOCK_USERS[email]) {
            return MOCK_USERS[email].user;
        }
    }
    throw new Error('Invalid session.');
};

export const verifyEmail = async (email: string, code: string): Promise<{ message: string }> => {
    await sleep(1000);
    if (!MOCK_USERS[email]) {
        throw new Error('User not found.');
    }
    // The magic mock code is '123456'
    if (code === '123456') {
        MOCK_USERS[email].isVerified = true;
        return { message: 'Account verified successfully!' };
    }
    throw new Error('Invalid verification code.');
};

export const resendVerificationEmail = async (email: string): Promise<{ message: string }> => {
    await sleep(1000);
    if (!MOCK_USERS[email]) {
        // Don't throw an error, to prevent email enumeration
        return { message: 'If an account with this email exists, a new code has been sent.' };
    }
    console.log(`--- MOCK RESEND ---
    A new verification code has been "sent" to ${email}.
    The mock verification code is still: 123456
    --- END MOCK RESEND ---`);
    return { message: 'A new verification code has been sent.' };
};

// Dashboard
export const getDashboardStats = async (token: string): Promise<{ mailboxesCreated: number, emailsReceived24h: number }> => {
    await sleep(800);
    if (!token.startsWith('mock-jwt-for-')) throw new Error('Unauthorized');
    return MOCK_STATS;
};

export const getUserMailboxes = async (token: string): Promise<Mailbox[]> => {
    await sleep(1200);
    if (token.startsWith('mock-jwt-for-')) {
        const email = token.replace('mock-jwt-for-', '');
        return MOCK_MAILBOXES[email] || [];
    }
    throw new Error('Unauthorized');
};
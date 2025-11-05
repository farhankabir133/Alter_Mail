
export interface User {
  name: string;
  email: string;
  picture?: string; // from Google
}

export interface EmailMessage {
  id: string;
  from?: { // From address can be null for some system messages
    address: string;
    name: string;
  };
  subject: string;
  intro: string; // A short text preview of the email body
  seen: boolean;
  createdAt: string; // ISO string
  htmlBody?: string; // Full HTML body, to be fetched on demand
}

export interface Mailbox {
  id: string; // This is the account ID from the email service
  address: string;

  // These details are needed for mail.tm API
  password?: string; // Required for authentication
  token?: string; // JWT for API requests
}

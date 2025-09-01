
export interface EmailMessage {
  id: string;
  from: string;
  subject: string;
  body: string; // This will be HTML content
  receivedAt: string;
}

export interface Mailbox {
  id: string;
  address: string;
  expiresAt: string; // ISO string
}

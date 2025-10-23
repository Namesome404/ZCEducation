import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export interface Outcome {
  id: number;
  field: string;
  narrative: string;
  duration: string;
  keyMilestone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: number;
  background: string;
  timeline: string;
  interest: string;
  contact: string;
  status: 'new' | 'read' | 'replied';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Outcomes
export function getOutcomes(): Outcome[] {
  const filePath = path.join(dataDir, 'outcomes.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function saveOutcomes(outcomes: Outcome[]): void {
  const filePath = path.join(dataDir, 'outcomes.json');
  fs.writeFileSync(filePath, JSON.stringify(outcomes, null, 2));
}

export function addOutcome(outcome: Omit<Outcome, 'id' | 'createdAt' | 'updatedAt'>): Outcome {
  const outcomes = getOutcomes();
  const newId = outcomes.length > 0 ? Math.max(...outcomes.map(o => o.id)) + 1 : 1;
  const now = new Date().toISOString();
  const newOutcome: Outcome = {
    ...outcome,
    id: newId,
    createdAt: now,
    updatedAt: now,
  };
  outcomes.push(newOutcome);
  saveOutcomes(outcomes);
  return newOutcome;
}

export function updateOutcome(id: number, updates: Partial<Outcome>): Outcome | null {
  const outcomes = getOutcomes();
  const index = outcomes.findIndex(o => o.id === id);
  if (index === -1) return null;
  
  outcomes[index] = {
    ...outcomes[index],
    ...updates,
    id: outcomes[index].id,
    createdAt: outcomes[index].createdAt,
    updatedAt: new Date().toISOString(),
  };
  saveOutcomes(outcomes);
  return outcomes[index];
}

export function deleteOutcome(id: number): boolean {
  const outcomes = getOutcomes();
  const filtered = outcomes.filter(o => o.id !== id);
  if (filtered.length === outcomes.length) return false;
  saveOutcomes(filtered);
  return true;
}

// Articles
export function getArticles(): Article[] {
  const filePath = path.join(dataDir, 'articles.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function saveArticles(articles: Article[]): void {
  const filePath = path.join(dataDir, 'articles.json');
  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
}

export function addArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Article {
  const articles = getArticles();
  const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
  const now = new Date().toISOString();
  const newArticle: Article = {
    ...article,
    id: newId,
    createdAt: now,
    updatedAt: now,
  };
  articles.push(newArticle);
  saveArticles(articles);
  return newArticle;
}

export function updateArticle(id: number, updates: Partial<Article>): Article | null {
  const articles = getArticles();
  const index = articles.findIndex(a => a.id === id);
  if (index === -1) return null;
  
  articles[index] = {
    ...articles[index],
    ...updates,
    id: articles[index].id,
    createdAt: articles[index].createdAt,
    updatedAt: new Date().toISOString(),
  };
  saveArticles(articles);
  return articles[index];
}

export function deleteArticle(id: number): boolean {
  const articles = getArticles();
  const filtered = articles.filter(a => a.id !== id);
  if (filtered.length === articles.length) return false;
  saveArticles(filtered);
  return true;
}

// Contacts
export function getContacts(): Contact[] {
  const filePath = path.join(dataDir, 'contacts.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function saveContacts(contacts: Contact[]): void {
  const filePath = path.join(dataDir, 'contacts.json');
  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));
}

export function addContact(contact: Omit<Contact, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Contact {
  const contacts = getContacts();
  const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
  const now = new Date().toISOString();
  const newContact: Contact = {
    ...contact,
    id: newId,
    status: 'new',
    createdAt: now,
    updatedAt: now,
  };
  contacts.unshift(newContact); // Add to beginning for latest first
  saveContacts(contacts);
  return newContact;
}

export function updateContact(id: number, updates: Partial<Contact>): Contact | null {
  const contacts = getContacts();
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  contacts[index] = {
    ...contacts[index],
    ...updates,
    id: contacts[index].id,
    createdAt: contacts[index].createdAt,
    updatedAt: new Date().toISOString(),
  };
  saveContacts(contacts);
  return contacts[index];
}

export function deleteContact(id: number): boolean {
  const contacts = getContacts();
  const filtered = contacts.filter(c => c.id !== id);
  if (filtered.length === contacts.length) return false;
  saveContacts(filtered);
  return true;
}


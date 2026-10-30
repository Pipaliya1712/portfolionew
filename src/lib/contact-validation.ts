export const contactFields = ['name', 'email', 'company', 'subject', 'message', 'consent'] as const;
export type ContactField = typeof contactFields[number];
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;
export const emptyContact: ContactValues = { name: '', email: '', company: '', subject: '', message: '', consent: '' };

export function validateContact(values: Record<string, unknown>): ContactErrors {
  const errors: ContactErrors = {};
  const name = typeof values.name === 'string' ? values.name : '';
  const email = typeof values.email === 'string' ? values.email.trim() : '';
  const subject = typeof values.subject === 'string' ? values.subject : '';
  const message = typeof values.message === 'string' ? values.message : '';
  if (!name.trim()) errors.name = 'Please enter your name.';
  else if (name.length > 100 || /[\r\n]/.test(name)) errors.name = 'Please enter a name of up to 100 characters on one line.';
  if (!email.trim()) errors.email = 'Please enter your email address.';
  else if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) errors.email = 'Please use a valid email address, such as alex@company.com.';
  if (values.company !== undefined && (typeof values.company !== 'string' || values.company.length > 200)) errors.company = 'Please keep your company or website to 200 characters.';
  if (!subject.trim()) errors.subject = 'Please choose a service, or select “Not sure yet”.';
  else if (subject.length > 150 || /[\r\n]/.test(subject)) errors.subject = 'Please select a valid service.';
  if (!message.trim()) errors.message = 'Tell me a little about what you would like to achieve.';
  else if (message.trim().length < 20) errors.message = 'Please add a little more detail — at least 20 characters.';
  else if (message.length > 5000) errors.message = 'Please keep your project details under 5,000 characters.';
  if (values.consent !== 'yes') errors.consent = 'Please agree to be contacted about this enquiry.';
  return errors;
}

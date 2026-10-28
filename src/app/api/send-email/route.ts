import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export async function POST(request: NextRequest) {
    try {
        const raw = await request.text();
        if (raw.length > 15000)
            return NextResponse.json({ error: 'Please keep your enquiry under 5,000 characters.' }, { status: 413 });
        let body;
        try {
            body = JSON.parse(raw);
        }
        catch {
            return NextResponse.json({ error: 'Please send a valid enquiry.' }, { status: 400 });
        }
        if (!body || typeof body !== 'object')
            return NextResponse.json({ error: 'Please send a valid enquiry.' }, { status: 400 });
        if (typeof body.website === 'string' && body.website.trim())
            return NextResponse.json({ success: true });
        const { name, email, subject, message, company = '', consent } = body;
        if ([name, email, subject, message, company].some(value => typeof value !== 'string') || !name.trim() || name.length > 100 || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\r\n]/.test(email + subject + name) || !subject.trim() || subject.length > 150 || message.trim().length < 20 || message.length > 5000 || company.length > 200 || consent !== 'yes') {
            return NextResponse.json({ error: 'Please check your details, include at least 20 characters about your project, and accept the privacy notice.' }, { status: 400 });
        }
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD)
            return NextResponse.json({ error: 'The enquiry form is not connected yet. Please email parthpipaliya1712@gmail.com directly.' }, { status: 503 });
        const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD }, connectionTimeout: 10000, socketTimeout: 15000 });
        await transporter.sendMail({ from: { name: 'Parth Pipaliya — Website', address: process.env.EMAIL_USER }, to: process.env.EMAIL_USER, replyTo: { name: name.trim(), address: email.trim() }, subject: `Project enquiry: ${subject.trim()}`, text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nCompany / website: ${company.trim() || 'Not supplied'}\nService: ${subject.trim()}\nContact consent: Yes\n\n${message.trim()}` });
        return NextResponse.json({ success: true });
    }
    catch {
        return NextResponse.json({ error: 'Your enquiry could not be sent. Please email parthpipaliya1712@gmail.com directly.' }, { status: 503 });
    }
}

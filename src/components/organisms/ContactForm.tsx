"use client";

import React from 'react';
import Reveal from '@/components/atoms/Reveal';

interface ContactFormProps {
  onSubmit?: (payload: { name: string; email: string; subject: string; message: string }) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const isValidEmail = (value: string) => /.+@.+\..+/.test(value);
  const isValid = name.trim() && isValidEmail(email) && subject.trim() && message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus('submitting');
    try {
      await new Promise((r) => setTimeout(r, 500));
      onSubmit?.({ name, email, subject, message });
      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <Reveal direction="up">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 max-w-3xl w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="How can we help?"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Write your message..."
              required
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={status === 'submitting' || !isValid}
            className="inline-flex items-center justify-center rounded-lg bg-black text-white px-5 py-2.5 disabled:opacity-50"
          >
            {status === 'submitting' ? 'Sending…' : 'Send Message'}
          </button>
          {status === 'success' && (
            <span className="text-green-600 text-sm">Message sent. We will get back to you soon.</span>
          )}
          {status === 'error' && (
            <span className="text-red-600 text-sm">Something went wrong. Please try again.</span>
          )}
        </div>
      </form>
    </Reveal>
  );
}



"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export default function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const contentId = React.useId();
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const setExpanded = (next: boolean) => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) {
      setOpen(next);
      return;
    }

    setIsAnimating(true);
    if (next) {
      // Opening: from 0 to content height, then snap to auto
      wrapper.style.height = '0px';
      wrapper.style.opacity = '0';
      // Force reflow
      void wrapper.offsetHeight;
      const target = inner.scrollHeight;
      wrapper.style.height = `${target}px`;
      wrapper.style.opacity = '1';
    } else {
      // Closing: from current height to 0
      const current = inner.scrollHeight;
      wrapper.style.height = `${current}px`;
      wrapper.style.opacity = '1';
      // Force reflow
      void wrapper.offsetHeight;
      wrapper.style.height = '0px';
      wrapper.style.opacity = '0';
    }

    const handleEnd = () => {
      const w = wrapperRef.current;
      if (!w) return;
      w.removeEventListener('transitionend', handleEnd);
      if (next) {
        w.style.height = 'auto';
        w.style.opacity = '1';
      }
      setOpen(next);
      setIsAnimating(false);
    };
    wrapper.addEventListener('transitionend', handleEnd);
  };

  return (
    <div className={cn('border-b border-gray-200 py-4')}> 
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setExpanded(!open)}
        className={cn(
          'w-full text-left flex items-center justify-between gap-4',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded-md'
        )}
      >
        <span className="font-semibold text-gray-900 text-base sm:text-lg">{question}</span>
        <span
          className={cn(
            'inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-transform',
            open ? 'rotate-45' : 'rotate-0'
          )}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-hidden={!open}
        ref={wrapperRef}
        style={{
          height: open ? 'auto' : 0,
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'height 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease-out',
        }}
        className={cn('mt-3')}
      >
        <div ref={innerRef} className={cn('text-gray-700 leading-relaxed text-sm sm:text-base')}
          aria-live="polite"
        >
          {answer}
        </div>
      </div>
    </div>
  );
}



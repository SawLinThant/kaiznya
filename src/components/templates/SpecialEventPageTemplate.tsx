"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { Button, Icon } from '@/components';
import { cn } from '@/lib/utils';
import Reveal from '@/components/atoms/Reveal';

interface SpecialEventPageTemplateProps {
  dict?: any;
  locale?: string;
}

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: string;
    category: string;
    featured?: boolean;
    discount?: number;
  };
  index: number;
  onRegister: (eventId: string) => void;
}

// Memoized EventCard component for optimal performance
const EventCard: React.FC<EventCardProps> = React.memo(({ event, index, onRegister }) => {
  const handleRegister = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onRegister(event.id);
  }, [event.id, onRegister]);

  return (
    <div 
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col",
        event.featured && "ring-2 ring-pink-400 ring-offset-2"
      )}
      style={{
        animationDelay: `${index * 150}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      {/* Featured Badge */}
      {event.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pink-500 text-white">
            ✨ Featured Event
          </span>
        </div>
      )}

      {/* Discount Badge */}
      {event.discount && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
            -{event.discount}% OFF
          </span>
        </div>
      )}

      {/* Event Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-900">
            {event.category}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="flex-grow p-6 sm:p-8 flex flex-col">
        {/* Event Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {event.title}
        </h3>

        {/* Event Description */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 flex-grow line-clamp-3">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon name="calendar" className="w-4 h-4 text-gray-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon name="clock" className="w-4 h-4 text-gray-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon name="location" className="w-4 h-4 text-gray-400" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        {/* Register Button */}
        <Button
          onClick={handleRegister}
          variant="primary"
          size="md"
          className="w-full bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Register Now
        </Button>
      </div>
    </div>
  );
});

EventCard.displayName = 'EventCard';

const SpecialEventPageTemplate: React.FC<SpecialEventPageTemplateProps> = ({ 
  dict, 
  locale = 'en' 
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showAllEvents, setShowAllEvents] = useState(false);

  // Memoized events data
  const events = useMemo(() => [
    {
      id: '1',
      title: 'Skincare Masterclass: The Science of Glowing Skin',
      description: 'Join our expert dermatologists for an exclusive masterclass on advanced skincare techniques. Learn about the latest ingredients, proper application methods, and how to build an effective routine.',
      date: 'March 15, 2024',
      time: '2:00 PM - 4:00 PM',
      location: 'Kanaiya Beauty Studio, Downtown',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
      category: 'Education',
      featured: true,
      discount: 20
    },
    {
      id: '2',
      title: 'Spring Beauty Launch Party',
      description: 'Be the first to experience our new Spring collection! Enjoy live demonstrations, exclusive previews, special launch pricing, and complimentary skincare consultations.',
      date: 'March 22, 2024',
      time: '6:00 PM - 9:00 PM',
      location: 'Kanaiya Flagship Store, Mall District',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=300&fit=crop',
      category: 'Launch',
      featured: true
    },
    {
      id: '3',
      title: 'Anti-Aging Workshop: Age Gracefully',
      description: 'Discover the secrets to youthful skin with our comprehensive anti-aging workshop. Learn about retinol, peptides, and other powerful ingredients.',
      date: 'March 28, 2024',
      time: '10:00 AM - 12:00 PM',
      location: 'Kanaiya Wellness Center',
      image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=500&h=300&fit=crop',
      category: 'Workshop',
      discount: 15
    },
    {
      id: '4',
      title: 'Men\'s Grooming Essentials',
      description: 'A comprehensive session covering men\'s skincare basics, grooming tips, and product recommendations for healthy, confident skin.',
      date: 'April 5, 2024',
      time: '3:00 PM - 5:00 PM',
      location: 'Kanaiya Men\'s Studio',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop',
      category: 'Men\'s Care'
    },
    {
      id: '5',
      title: 'Natural Ingredients Deep Dive',
      description: 'Explore the power of natural ingredients in skincare. Learn about botanical extracts, essential oils, and their benefits for different skin types.',
      date: 'April 12, 2024',
      time: '1:00 PM - 3:00 PM',
      location: 'Kanaiya Botanical Garden',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&h=300&fit=crop',
      category: 'Education'
    },
    {
      id: '6',
      title: 'Teen Skincare Bootcamp',
      description: 'Specialized skincare education for teenagers. Learn about acne prevention, gentle cleansing, and building healthy skincare habits early.',
      date: 'April 18, 2024',
      time: '11:00 AM - 1:00 PM',
      location: 'Kanaiya Youth Center',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
      category: 'Youth Care'
    }
  ], []);

  // Memoized filter categories
  const categories = useMemo(() => [
    { id: 'all', label: 'All Events' },
    { id: 'Education', label: 'Education' },
    { id: 'Launch', label: 'Product Launch' },
    { id: 'Workshop', label: 'Workshop' },
    { id: 'Men\'s Care', label: 'Men\'s Care' },
    { id: 'Youth Care', label: 'Youth Care' }
  ], []);

  // Memoized filtered events
  const filteredEvents = useMemo(() => {
    const filtered = activeFilter === 'all' 
      ? events 
      : events.filter(event => event.category === activeFilter);
    
    return showAllEvents ? filtered : filtered.slice(0, 6);
  }, [events, activeFilter, showAllEvents]);

  // Memoized handlers
  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
    setShowAllEvents(false); // Reset to show limited events when filter changes
  }, []);

  const handleRegister = useCallback((eventId: string) => {
    // Handle event registration
    console.log('Registering for event:', eventId);
    // In production, this would open a registration modal or redirect to registration page
  }, []);

  const handleToggleShowAll = useCallback(() => {
    setShowAllEvents(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-white lg:mb-12 md:mb-8">
      {/* Hero Section */}
      <Reveal direction="up" durationMs={700}>
        <section className="relative bg-gradient-to-br from-pink-50 via-white to-purple-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-0 md:px-0">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Special Events & Workshops
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join our exclusive skincare events, masterclasses, and workshops. 
                Learn from experts, discover new products, and connect with fellow beauty enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-gray-700">
                  <Icon name="star" className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium">Expert-Led Sessions</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Icon name="heart" className="w-5 h-5 text-pink-400" />
                  <span className="font-medium">Exclusive Access</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Icon name="calendar" className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">Limited Spots</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Filter Section */}
      <Reveal direction="up" delayMs={100}>
        <section className="py-8 sm:py-12 bg-gray-50 px-4">
          <div className="max-w-7xl mx-auto px-4 lg:px-0 md:px-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Upcoming Events
                </h2>
                <p className="text-gray-600">
                  {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleFilterChange(category.id)}
                    className={cn(
                      "px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200",
                      "hover:scale-105 active:scale-95",
                      activeFilter === category.id
                        ? "bg-gray-900 text-white shadow-lg"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Events Grid */}
      <Reveal direction="up" delayMs={200}>
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-0 md:px-0">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">📅</div>
                <p className="text-gray-600 text-lg">No events found for this category</p>
                <p className="text-gray-500 text-sm mt-2">Try selecting a different filter</p>
              </div>
            ) : (
              <>
                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  {filteredEvents.map((event, index) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={index}
                      onRegister={handleRegister}
                    />
                  ))}
                </div>

                {/* Show More/Less Button */}
                {events.filter(event => activeFilter === 'all' || event.category === activeFilter).length > 6 && (
                  <div className="text-center">
                    <Button
                      onClick={handleToggleShowAll}
                      variant="outline"
                      size="lg"
                      className="px-8 py-4 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      {showAllEvents ? 'Show Less Events' : 'Show All Events'}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </Reveal>

      {/* Newsletter Section */}
      <Reveal direction="up" delayMs={300}>
        <section className="py-16 sm:py-20 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="max-w-4xl mx-auto px-4 lg:px-0 md:px-0 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
              Stay Updated on Upcoming Events
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about exclusive events, 
              new product launches, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-gray-600 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              />
              <Button
                variant="primary"
                size="lg"
                className="px-8 py-3 bg-pink-500 text-white hover:bg-pink-600 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </div>
  );
};

export default SpecialEventPageTemplate;

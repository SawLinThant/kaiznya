"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import type { AboutTeamMember } from '@/lib/aboutMockData';

interface AboutTeamProps {
  team: AboutTeamMember[];
  className?: string;
}

const AboutTeam: React.FC<AboutTeamProps> = ({ team, className }) => {
  if (!team?.length) return null;
  return (
    <section className={cn('pb-8 sm:pb-10 lg:pb-12', className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Meet the Team</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {team.map(member => (
            <div key={member.id} className="bg-white rounded-2xl p-4 border border-gray-100 text-center shadow-sm">
              <div className="w-24 h-24 rounded-full mx-auto overflow-hidden mb-3 bg-gray-100">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="font-semibold text-gray-900">{member.name}</div>
              <div className="text-sm text-gray-600">{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;



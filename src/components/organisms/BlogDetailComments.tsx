"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components';
import type { BlogComment } from '@/lib/blogDetailMockData';
import Reveal from '@/components/atoms/Reveal';

interface BlogDetailCommentsProps {
  comments: BlogComment[];
  className?: string;
}

const BlogDetailComments: React.FC<BlogDetailCommentsProps> = ({ comments, className }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setNewComment('');
    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const CommentItem: React.FC<{ comment: BlogComment; isReply?: boolean }> = ({ 
    comment, 
    isReply = false 
  }) => (
    <div className={cn("py-4", isReply && "ml-8 pl-4 border-l-2 border-gray-100")}>
      <div className="flex items-start space-x-3">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-semibold text-gray-900">{comment.author.name}</h4>
            {comment.author.isVerified && (
              <Icon name="star" className="w-4 h-4 text-blue-500" />
            )}
            <span className="text-sm text-gray-500">{formatDate(comment.publishedAt)}</span>
          </div>
          <p className="text-gray-700 leading-relaxed mb-3">{comment.content}</p>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <Icon name="heart" className="w-4 h-4 mr-1" />
              <span>{comment.likes}</span>
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Reply
            </button>
          </div>
          
          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className={cn('py-8 sm:py-12 bg-gray-50', className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Comments ({comments.length})
            </h2>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="mb-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment, index) => (
                <Reveal key={comment.id} direction="up" delayMs={index * 100}>
                  <CommentItem comment={comment} />
                </Reveal>
              ))}
            </div>

            {comments.length === 0 && (
              <div className="text-center py-8">
                <Icon name="heart" className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default BlogDetailComments;

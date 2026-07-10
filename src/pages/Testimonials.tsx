import React, { useState } from 'react';
import { useSiteData } from '../context/DataContext';
import { Star, Quote, MessageSquare } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { data } = useSiteData();

  // Filter reviewers state
  const [roleFilter, setRoleFilter] = useState<'all' | 'Parent' | 'Student'>('all');

  const filteredTestimonials = data.testimonials.filter((item) => {
    if (roleFilter === 'all') return true;
    return item.relation === roleFilter;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full bg-primary/10 inline-block mb-3">
            Academic Reviews
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4 leading-tight">
            Parent & Student Testimonials
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Read direct feedback from families enrolled at Ratna Coaching Centre. We are grateful for their feedback and advocacy.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center border-b border-slate-200 gap-2 mb-12 overflow-x-auto pb-1.5 scrollbar-hide">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'Parent', label: 'Parent Perspectives' },
            { id: 'Student', label: 'Student Perspectives' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id as any)}
              className={`px-4 py-2 font-bold text-xs rounded-xl transition-all ${
                roleFilter === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-slate-500 hover:text-slate-700 border border-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((t) => (
            <div 
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all relative group"
            >
              {/* Quote bubble absolute decoration */}
              <Quote className="absolute top-6 right-6 text-slate-100 h-10 w-10 -z-0 group-hover:text-accent/10 transition-colors" />

              <div className="flex flex-col gap-4 relative z-10">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent stroke-[1.5]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-600 font-semibold leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              {/* Reviewer Meta info */}
              <div className="border-t border-slate-50 pt-5 mt-6 flex items-center gap-3 relative z-10">
                <div className="h-10 w-10 rounded-full bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 font-serif font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 leading-tight">{t.name}</h4>
                  <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                    {t.classLevel} • <span className="text-accent">{t.relation}</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Feedback invite block */}
        <div className="mt-16 text-center bg-white border border-slate-100 rounded-3xl p-8 max-w-2xl mx-auto shadow-sm">
          <MessageSquare className="text-accent mx-auto mb-4" size={24} />
          <h3 className="font-serif font-bold text-lg text-primary mb-2">Are you an enrolled parent or student?</h3>
          <p className="text-xs font-semibold text-slate-500 max-w-md mx-auto leading-relaxed mb-5">
            We value your suggestions. If you would like to share your review, please submit a feedback message via the Contact page or send us a WhatsApp text.
          </p>
        </div>

      </div>
    </div>
  );
};

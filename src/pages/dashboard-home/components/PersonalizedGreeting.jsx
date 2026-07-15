import React from 'react';
import { Flame, Quote, Star, Zap, Trophy } from 'lucide-react';

const PersonalizedGreeting = ({ user, streak, motivationalQuote }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getStreakMessage = () => {
    if (streak === 0) return "Ready to start your FitGuide journey? Let's make today count! 🚀";
    if (streak === 1) return "Amazing start! One day closer to your goals! 💪";
    if (streak < 7) return "You're building incredible momentum! Keep it up! ⚡";
    if (streak < 30) return "Unstoppable! Your consistency is inspiring! 🔥";
    return "Legendary dedication! You're a true FitGuide champion! 🏆";
  };

  const getStreakLevel = () => {
    if (streak === 0) return 'beginner';
    if (streak < 7) return 'warming-up';
    if (streak < 30) return 'on-fire';
    return 'legendary';
  };
  console.log("Greeting User:", user);

  return (
    <div className="fitguide-card p-6 space-y-5 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl glass-effect">
                <Star className="w-6 h-6 text-secondary neon-glow" fill="currentColor" />
              </div>
              <h1 className="font-poppins font-black text-3xl text-foreground">
                {getGreeting()},{" "}
                <span className="text-gradient">
                  {user?.name || user?.full_name || "User"}
                </span>
                ! <span className="ml-2 text-2xl">👋</span>
                <span className="ml-2 text-2xl">👋</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed">
              {getStreakMessage()}
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <span className="text-success font-medium">Online</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Trophy className="w-4 h-4 text-warning" />
                <span className="text-muted-foreground">Level {user?.level}</span>
              </div>
            </div>
          </div>

          {streak > 0 && (
            <div className={`flex items-center space-x-3 px-6 py-3 rounded-2xl glass-effect ${getStreakLevel() === 'legendary' ? 'achievement-glow' : ''
              } neon-border`}>
              <Flame className={`w-6 h-6 ${streak >= 30 ? 'text-secondary' : streak >= 7 ? 'text-warning' : 'text-success'
                } neon-glow`} />
              <div className="text-center">
                <div className="font-poppins font-bold text-xl text-gradient">
                  {streak}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {streak === 1 ? 'Day' : 'Days'} Streak
                </div>
              </div>
              {streak >= 7 && (
                <Zap className="w-4 h-4 text-secondary animate-pulse" />
              )}
            </div>
          )}
        </div>

        {/* Motivational Quote Section */}
        {motivationalQuote && (
          <div className="relative">
            <div className="glass-effect rounded-2xl p-4 border-l-4 border-primary">
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-xl bg-primary/20 flex-shrink-0">
                  <Quote className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <blockquote className="text-foreground font-medium italic">
                    "{motivationalQuote?.text}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <cite className="text-muted-foreground text-sm not-italic">
                      — {motivationalQuote?.author}
                    </cite>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-secondary" fill="currentColor" />
                      <Star className="w-3 h-3 text-secondary" fill="currentColor" />
                      <Star className="w-3 h-3 text-secondary" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Action Hint for New Users */}
        {streak === 0 && (
          <div className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm font-poppins font-semibold text-primary">
                  Ready to begin your transformation?
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Start with a quick 5-minute workout to build your first streak! 💫
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedGreeting;
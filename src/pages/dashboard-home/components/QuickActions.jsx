import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ user, onQuickStart }) => {
  const navigate = useNavigate();

  const quickActionItems = [
    {
      id: 'start-workout',
      title: 'Start Workout',
      description: 'Begin your fitness session',
      icon: 'Play',
      color: 'bg-primary text-primary-foreground',
      action: () => onQuickStart('workout')
    },
    {
      id: 'browse-exercises',
      title: 'Browse Exercises',
      description: 'Explore workout library',
      icon: 'Search',
      color: 'bg-secondary text-secondary-foreground',
      action: () => navigate('/exercise-catalog')
    },
    {
      id: 'track-progress',
      title: 'Track Progress',
      description: 'View your fitness journey',
      icon: 'TrendingUp',
      color: 'bg-success text-success-foreground',
      action: () => navigate('/progress-tracker')
    },
    {
      id: 'join-community',
      title: 'Community',
      description: 'Connect with others',
      icon: 'Users',
      color: 'bg-accent text-accent-foreground',
      action: () => navigate('/workout-routines')
    }
  ];

  const bookmarkedItems = [
    {
      id: 'saved-workout-1',
      title: 'Morning Cardio Blast',
      type: 'workout',
      duration: '20 min',
      icon: 'Heart'
    },
    {
      id: 'saved-routine-1',
      title: 'Upper Body Strength',
      type: 'routine',
      duration: '45 min',
      icon: 'Bookmark'
    },
    {
      id: 'saved-article-1',
      title: 'Nutrition Guide for Athletes',
      type: 'article',
      duration: '5 min read',
      icon: 'BookOpen'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Start Actions */}
      <div className="bg-card rounded-2xl p-6 morphic-card border border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-poppins font-semibold text-lg text-foreground">
            Quick Actions
          </h2>
          <Icon name="Zap" size={20} className="text-muted-foreground" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActionItems?.map((item) => (
            <button
              key={item?.id}
              onClick={item?.action}
              className="group p-4 rounded-xl border border-border hover:border-primary/50 transition-all duration-200 micro-celebration bg-background hover:bg-muted/30"
            >
              <div className={`w-12 h-12 rounded-lg ${item?.color} flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={item?.icon} size={24} />
              </div>
              <h3 className="font-poppins font-medium text-sm text-foreground mb-1">
                {item?.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {item?.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      {/* Bookmarked Content */}
      <div className="bg-card rounded-2xl p-6 morphic-card border border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-poppins font-semibold text-lg text-foreground">
            Your Bookmarks
          </h2>
          <Icon name="Bookmark" size={20} className="text-muted-foreground" />
        </div>

        {bookmarkedItems?.length > 0 ? (
          <div className="space-y-3">
            {bookmarkedItems?.map((item) => (
              <div
                key={item?.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">
                  <Icon name={item?.icon} size={16} className="text-muted-foreground group-hover:text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-poppins font-medium text-sm text-foreground line-clamp-1">
                    {item?.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span className="capitalize">{item?.type}</span>
                    <span>•</span>
                    <span>{item?.duration}</span>
                  </div>
                </div>
                
                <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              </div>
            ))}
            
            <div className="pt-3 border-t border-border">
              <Button variant="ghost" size="sm" fullWidth>
                View All Bookmarks
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="BookmarkPlus" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm mb-4">
              No bookmarks yet. Save your favorite workouts and articles!
            </p>
            <Button variant="outline" size="sm" onClick={() => navigate('/exercise-catalog')}>
              Explore Content
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActions;
import React from "react";
import Icon from "../../../components/AppIcon";

const MetricsOverview = ({ overviewData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
      {overviewData?.map((metric) => (
        <div
          key={metric?.id}
          className="morphic-card bg-card p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl ${metric?.bgColor} flex items-center justify-center`}
            >
              <Icon
                name={metric?.icon}
                size={24}
                className={metric?.iconColor}
              />
            </div>

            {metric?.change && (
              <div
                className={`px-2 py-1 rounded-full text-xs font-mono ${metric?.changeColor}`}
              >
                {metric.change}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-poppins font-semibold text-lg text-foreground">
              {metric?.value}
            </h3>

            <p className="text-sm text-muted-foreground">
              {metric?.label}
            </p>

            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${metric?.progressColor}`}
                style={{ width: `${metric?.progress}%` }}
              />
            </div>

            {metric?.goal && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Goal: {metric.goal}</span>
                <span>{metric.progress}%</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;
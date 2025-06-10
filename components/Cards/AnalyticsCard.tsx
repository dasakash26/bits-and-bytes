"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Eye, Search, BarChart3 } from "lucide-react";
import analyticsData from "@/data/analytics.json";

const iconMap = {
  TrendingUp,
  Users,
  Eye,
  Search,
};

const colorMap = {
  TrendingUp: "from-blue-500 to-cyan-500",
  Users: "from-purple-500 to-pink-500",
  Eye: "from-emerald-500 to-teal-500",
  Search: "from-orange-500 to-red-500",
};

export const AnalyticsCard = () => {
  return (
    <Card className="bg-card border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30 group overflow-hidden ">
      <CardHeader className="pb-4 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <CardTitle className="text-lg font-semibold flex items-center gap-2 relative z-10">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-sm">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          Analytics Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {analyticsData.overview.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const gradient = colorMap[item.icon as keyof typeof colorMap];
            return (
              <div
                key={index}
                className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 group/metric hover:scale-105 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${gradient} shadow-sm group-hover/metric:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                    {item.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground group-hover/metric:text-primary transition-colors duration-200">
                  {item.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium mt-1 flex items-center justify-between">
                  <span>{item.title}</span>
                  <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${gradient} rounded-full w-3/4`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

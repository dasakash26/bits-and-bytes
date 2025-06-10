"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Star, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import profile from "@/data/profile.json";

export const ProfileCard = () => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push("/profile/dasakash26");
  };

  return (
    <Card
      className="bg-card border-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-primary/30 overflow-hidden p-0"
      onClick={handleCardClick}
    >
      <div className="h-20 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
      <CardContent className="relative pt-0 pb-6">
        <div className="flex flex-col items-center -mt-10">
          <div className="relative">
            <Avatar className="w-20 h-20 border-4 border-background shadow-lg group-hover:scale-110 transition-transform duration-300">
              <AvatarImage src={profile.image} alt={profile.name} />
              <AvatarFallback className="text-lg bg-gradient-to-br from-primary to-primary/70 text-white">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-background flex items-center justify-center">
              <Star className="w-3 h-3 text-yellow-800 fill-current" />
            </div>
          </div>

          <div className="text-center mt-4 space-y-2">
            <h2 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">
              {profile.name}
            </h2>
            <p className="text-primary font-medium bg-primary/10 px-3 py-1 rounded-full text-sm">
              {profile.title}
            </p>
            <p className="text-muted-foreground text-sm px-4 leading-relaxed max-w-xs">
              {profile.bio}
            </p>
          </div>

          <div className="flex gap-8 mt-4 p-4 bg-gradient-to-r from-muted/30 to-muted/50 rounded-xl border border-border/50 group-hover:border-primary/20 transition-colors duration-200">
            <div className="text-center group-hover:scale-105 transition-transform duration-200">
              <div className="font-bold text-lg text-foreground flex items-center gap-1">
                {profile.followers}
                <Users className="w-3 h-3 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center group-hover:scale-105 transition-transform duration-200">
              <div className="font-bold text-lg text-foreground">
                {profile.following}
              </div>
              <div className="text-xs text-muted-foreground">Following</div>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <MapPin className="w-4 h-4" />
              <span>India</span>
            </div>
            <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <Calendar className="w-4 h-4" />
              <span>Joined 2024</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

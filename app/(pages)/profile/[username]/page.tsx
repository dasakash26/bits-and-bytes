"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  Link as LinkIcon,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Globe,
} from "lucide-react";
import profile from "@/data/profile.json";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="relative">
            <div className="h-24 bg-gradient-to-r from-primary via-primary/80 to-accent relative overflow-hidden -m-6 mb-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <CardContent className="relative pt-0 pb-2">
              <div className="flex flex-col items-center -mt-12">
                <Avatar className="w-24 h-24 border-4 border-background shadow-2xl ring-2 ring-primary/20">
                  <AvatarImage src={profile.image} alt={profile.name} />
                  <AvatarFallback className="text-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    AD
                  </AvatarFallback>
                </Avatar>

                <div className="text-center mt-6 space-y-3">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    {profile.name}
                  </h1>
                  <p className="text-primary font-semibold text-lg">
                    @{params.username}
                  </p>
                  <p className="text-muted-foreground font-medium">
                    {profile.title}
                  </p>
                  <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                    {profile.bio}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    <span>akashdas.dev</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>contact@akashdas.dev</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-2 mt-4">
                  <div className="p-2 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                    <Twitter className="w-4 h-4" />
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                    <Globe className="w-4 h-4" />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-8 mt-8 p-4 bg-muted/30 rounded-xl backdrop-blur-sm">
                  <div className="text-center">
                    <div className="font-bold text-xl text-foreground">
                      {profile.followers}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      Followers
                    </div>
                  </div>
                  <div className="w-px bg-border" />
                  <div className="text-center">
                    <div className="font-bold text-xl text-foreground">
                      {profile.following}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      Following
                    </div>
                  </div>
                  <div className="w-px bg-border" />
                  <div className="text-center">
                    <div className="font-bold text-xl text-foreground">42</div>
                    <div className="text-xs text-muted-foreground font-medium">
                      Posts
                    </div>
                  </div>
                  <div className="w-px bg-border" />
                  <div className="text-center">
                    <div className="font-bold text-xl text-foreground">15</div>
                    <div className="text-xs text-muted-foreground font-medium">
                      Drafts
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Content */}
          <div className="mt-8">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="mt-6">
                <Card>
                  <CardContent className="p-2 text-center">
                    <p className="text-muted-foreground text-lg">
                      No posts yet. Check back later!
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="drafts" className="mt-6">
                <Card>
                  <CardContent className="p-2 text-center">
                    <p className="text-muted-foreground text-lg">
                      No drafts yet. Start writing!
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

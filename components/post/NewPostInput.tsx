"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { PostDialog } from "./PostDialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";

export const NewPostInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  return (
    <Card className="mb-4 border shadow-sm bg-card p-0">
      <CardContent className="p-2">
        <div className="flex items-center gap-2">
          <Avatar className="w-12 h-12 flex-shrink-0">
            <AvatarImage src={session.data?.user?.image!}alt="User Avatar" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              U
            </AvatarFallback>
          </Avatar>

          <PostDialog isOpen={isOpen} onOpenChange={setIsOpen}>
            <div className="flex-1 py-4 px-3 rounded-full bg-muted/30 hover:bg-muted/50 cursor-text transition-all duration-200 border border-border/30 hover:border-border group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-muted-foreground text-xs">
                    Share your thoughts...
                  </p>
                </div>
                <Pencil className="w-3 h-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
              </div>
            </div>
          </PostDialog>
        </div>
      </CardContent>
    </Card>
  );
};

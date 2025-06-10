import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const AuthorSection = () => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
          AD
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-sm">Akash Das</p>
        <p className="text-xs text-muted-foreground">Writing as author</p>
      </div>
    </div>
  );
};

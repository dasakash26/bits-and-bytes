"use client";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CallToActionButton = () => {
  console.log("CallToActionButton component is rendering");

  return (
    <Link href="/feed" className="inline-block z-20">
      <Button
        size="lg"
        className="text-lg px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        onClick={() =>
          console.log("CallToActionButton clicked - navigating to /feed")
        }
      >
        Explore Latest Tech
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </Link>
  );
};

export default CallToActionButton;

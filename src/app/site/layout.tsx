import Navigation from "@/components/site/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
      <main className="h-full">
        <Navigation />
        {children}
      </main>
  );
};

export default layout;

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GlareCard } from "../ui/glare-card";
export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10", className)}>
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className="relative group block p-2 h-full w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5* idx,
            ease: "easeInOut"  // Adding an easing function for smoother animation
          }}
          viewport={{ once: true }}
    
        >
      
          <GlareCard className="flex flex-col items-center justify-center">
         
          <span className="text-7xl text-white">{item.icon}</span>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
     
    </GlareCard>
        </motion.div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, x: 0 }}
      
        transition={{ duration: 0.5 }}
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black bg-opacity-10 group-hover:bg-opacity-100  border border-transparent border-secondary relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </motion.div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-white  text-3xl tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn("mt-8 text-secondary font-bold tracking-wide leading-relaxed text-3xl ", className)}
    >
      {children}
    </p>
  );
};

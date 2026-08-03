import { useState } from "react";
import { getIcon } from "../../../shared/data/icons";
import type { Skill } from "../../../shared/types";
import { ChevronDown } from "lucide-react";

interface SkillCardProps {
  readonly skill: Skill;
  readonly index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = getIcon(skill.icon);

  return (
    <div
      className="relative bg-linear-to-br from-surface-container-high via-surface-container to-surface-container-low border border-outline-variant/30 p-4 md:p-8 space-y-4 md:space-y-6 group hover:border-primary/50 transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-glow-cyan animate-fade-in-up overflow-hidden"
      style={{
        animationDelay: `${index * 10}ms`,
        animationFillMode: "both",
        opacity: 0,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Gradient sweep on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex justify-between items-start relative z-10">
        <Icon className="text-primary text-2xl md:text-3xl group-hover:animate-pulse transition-all duration-300" />
        {skill.is_new && (
          <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-secondary-container px-2 py-0.5 text-[10px] font-black text-on-secondary tracking-widest">
            NEW
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h4 className="font-headline font-bold text-xl md:text-2xl mb-2 group-hover:text-gradient transition-all duration-500">
          {skill.title}
        </h4>

        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-label tracking-widest opacity-60">
            {skill.is_new ? (
              <span className="text-accent-orange">CURRENTLY EXPLORING</span>
            ) : (
              "MASTERY LEVEL"
            )}
          </span>
          <span className="text-xs md:text-sm font-label text-on-surface">
            {skill.mastery_level}%
          </span>
        </div>

        <div className="h-1 bg-surface-container-highest w-full relative overflow-hidden">
          <div
            className={`absolute h-full ${skill.is_new ? "bg-accent-orange" : "bg-accent-cyan"}`}
            style={{
              width: `${skill.mastery_level}%`,
              boxShadow: `0 0 10px rgba(${skill.is_new ? "255,77,0" : "0,240,255"}, 0.5)`,
            }}
          />
          {skill.is_new && (
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          )}
        </div>

        {expanded && skill.details.length > 0 && (
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-outline-variant/20">
            <ul className="space-y-2 md:space-y-3">
              {skill.details.map((detail: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-on-surface-variant"
                >
                  <svg
                    className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10">
        <ChevronDown
          className={`text-primary text-sm md:text-base transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}
        />
      </div>

      <div className="absolute bottom-3 right-10 md:bottom-4 md:right-12 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="w-1 h-1 rounded-full bg-primary/60" />
        <span className="w-1 h-1 rounded-full bg-primary/40" />
        <span className="w-1 h-1 rounded-full bg-primary/20" />
      </div>
    </div>
  );
}

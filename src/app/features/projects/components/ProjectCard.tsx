import { useNavigate } from "react-router-dom";
import type { Project } from "../../../shared/types";
import { Code, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  readonly project: Project;
  readonly index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col gap-6 animate-fade-in-up"
      style={{
        animationDelay: `${index * 150 + 600}ms`,
        animationFillMode: "both",
        opacity: 0,
      }}
    >
      {/* Stage Label */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-label tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 uppercase">
          Stage {(index + 1).toString().padStart(2, "0")}
        </span>
      </div>

      {/* Card */}
      <div
        className="group relative aspect-video bg-surface-container-low overflow-hidden border border-outline-variant/10 transition-all duration-500 hover:border-primary/40 hover:shadow-glow-cyan hover:scale-[1.02] cursor-pointer"
        onClick={() => navigate(`/project/${index}`)}
      >
        {/* Gradient sweep */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />
        {/* Top glow */}
        <div className="absolute top-0 left-0 right-0 h-spx bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

        {/* Image */}
        <div className="absolute inset-0 scale-[0.95] transition-transform duration-700 group-hover:scale-100">
          <img
            src={project.ImageUrl}
            alt={project.Title}
            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        </div>

        {/* VIEW overlay */}
        <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-primary-container flex items-center justify-center backdrop-blur-sm bg-primary-container/5 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            <span className="text-primary font-label text-[10px] md:text-xs font-black tracking-[0.2em]">
              VIEW
            </span>
          </div>
        </div>

        {/* Title label */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
          <div className="text-[10px] font-label text-primary tracking-widest uppercase">
            Target: {project.Title}
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
          <span className="w-1 h-1 rounded-full bg-primary/60" />
          <span className="w-1 h-1 rounded-full bg-primary/40" />
          <span className="w-1 h-1 rounded-full bg-primary/20" />
        </div>
      </div>

      {/* Project Info */}
      <div>
        <h4 className="font-headline font-bold text-sm md:text-base lg:text-lg xl:text-xl mb-2 text-white group-hover:text-gradient transition-all duration-500">
          {project.Title}
        </h4>
        <p className="text-xs sm:text-sm md:text-base text-on-surface-variant/80 font-body mb-4">
          {project.Description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2">
          {project.Technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-label tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 px-2 py-1"
            >
              {tech}
            </span>
          ))}
          {project.Technologies.length > 3 && (
            <span className="text-[10px] font-label tracking-widest uppercase text-on-surface-variant bg-surface-container/10 border border-outline-variant/20 px-2 py-1">
              +{project.Technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action links */}
        <div className="flex gap-4 mt-4">
          {project.GithubUrl && (
            <a
              href={project.GithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-label tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              Code
            </a>
          )}
          {project.LiveUrl && (
            <a
              href={project.LiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-label tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

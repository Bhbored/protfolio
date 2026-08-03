import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanding } from "../../providers/LandingProvider";
import { getProjectCategoryName } from "../../../lib/project-category";
import ScreenshotGallery from "./components/ScreenshotGallery";
import TechnologiesList from "./components/TechnologiesList";
import KeyFeaturesList from "./components/KeyFeaturesList";
import ProjectInfoCard from "./components/ProjectInfoCard";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useLanding();

  const project = useMemo(() => {
    if (!id) return undefined;

    // Try numeric index first
    const num = Number(id);
    if (!isNaN(num) && num >= 0 && num < projects.length) {
      return projects[num];
    }

    // Try slug match
    return projects.find(
      (p) => p.title.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase(),
    );
  }, [id, projects]);

  if (!project) {
    navigate("/", { replace: true });
    return null;
  }

  const isMobileApp = [6, 7, 8, 32].includes(project.project_category);

  return (
    <div className="relative w-full min-h-screen bg-background">
      {/* Hero Image */}
      {project.image_url && (
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent z-10" />
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />

          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute top-6 left-6 md:top-8 md:left-12 z-20 inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high/80 backdrop-blur-sm border border-white/10 rounded-full text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-label text-sm uppercase tracking-widest">
              Back
            </span>
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="relative z-20 -mt-24 md:-mt-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {project.image_url && (
            <button
              type="button"
              onClick={() => navigate("/")}
              className="hidden md:inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 group"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="font-label text-sm uppercase tracking-widest">
                Back to Projects
              </span>
            </button>
          )}

          <div className="mb-8 md:mb-12">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[0.9] tracking-tight mb-4 md:mb-6">
              {project.title}
            </h1>
            <p className="font-body text-lg md:text-xl lg:text-2xl text-on-surface-variant/80 leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 md:gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-primary">
                  Category
                </p>
                <p className="font-body text-sm text-on-surface-variant">
                  {getProjectCategoryName(project.project_category)}
                </p>
              </div>
            </div>

            {project.technologies.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-label text-xs uppercase tracking-widest text-primary">
                    Tech Stack
                  </p>
                  <p className="font-body text-sm text-on-surface-variant">
                    {project.technologies.length} Technologies
                  </p>
                </div>
              </div>
            )}

            {project.github_url && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-label text-xs uppercase tracking-widest text-primary">
                    Repository
                  </p>
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors hover:underline"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            )}

            {project.live_url && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-label text-xs uppercase tracking-widest text-primary">
                    Live Demo
                  </p>
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors hover:underline"
                  >
                    Visit Site
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Screenshots */}
          {project.screenshots.length > 0 && (
            <div className="mb-16 md:mb-24">
              <h2 className="text-2xl md:text-[2.5rem] font-bold uppercase tracking-tight text-white mb-8">
                Project Screenshots
              </h2>
              <ScreenshotGallery
                screenshots={project.screenshots}
                isMobileApp={isMobileApp}
              />
            </div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-stretch">
            <div className="flex flex-col gap-8">
              {project.technologies.length > 0 && (
                <TechnologiesList technologies={project.technologies} />
              )}
              {project.key_features.length > 0 && (
                <KeyFeaturesList features={project.key_features} />
              )}
            </div>
            <div>
              <ProjectInfoCard
                category={project.project_category}
                repositoryUrl={project.github_url}
                technologyCount={project.technologies.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

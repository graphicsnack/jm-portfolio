import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "campglint",
    name: "CampGlint",
    platform: "iOS app",
    description: "Track campsite openings for the dates you want, find backup campgrounds, and get ready once you have a reservation.",
    screenshots: [
      {
        src: "/current-work/campglint-ios.webp",
        alt: "CampGlint screens for saved monitors, campsite alerts, and editing trip dates",
        width: 1600,
        height: 900,
      },
    ],
  },
  {
    id: "graphicsnack",
    name: "GraphicSnack",
    platform: "Design tool",
    description: "Get AI-assisted feedback on a screen or flow, decide what to fix first, and track how the design changes across versions.",
    screenshots: [
      {
        src: "/current-work/graphicsnack-projects.webp",
        alt: "GraphicSnack projects list with critique history and suggested first fixes",
        width: 600,
        height: 1304,
      },
      {
        src: "/current-work/graphicsnack-report.webp",
        alt: "GraphicSnack project report with recommended fixes and design versions",
        width: 600,
        height: 1304,
      },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <header className="site-header" id="top">
        <div className="site-width header-inner">
          <a className="brand-link" href="#top">
            <Image src="/brand/JM_logo_icon_transparent.png" alt="" width={34} height={34} />
            Juan Mondragon
          </a>
          <nav aria-label="Site navigation">
            <a className="text-link" href="#projects">Projects</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="showcase-hero" aria-labelledby="showcase-title">
          <div className="site-width hero-layout">
            <div className="hero-copy">
              <h1 id="showcase-title">What I’m<br className="hero-break" /> building.</h1>
              <p>I’m Juan, a product designer and builder. These are the side projects I’m working on.</p>
              <a className="hero-link" href="#projects">
                Explore projects <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-photo" aria-hidden="true">
              <Image
                src="/current-work/mountain-landscape.webp"
                alt=""
                fill
                sizes="(min-width: 800px) 42vw, 100vw"
                preload
              />
            </div>
          </div>
        </section>

        <section className="site-width projects-section" id="projects" aria-labelledby="projects-title">
          <h2 id="projects-title" className="section-heading">Current projects</h2>
          {projects.map((project) => (
            <article className="project" key={project.id} aria-labelledby={project.id}>
              <div className="project-copy">
                <p className="project-platform">{project.platform}</p>
                <h3 id={project.id}>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <div className={`project-media project-media-${project.id}`}>
                {project.screenshots.map((screenshot) => (
                  <Image
                    key={screenshot.src}
                    {...screenshot}
                    sizes={project.screenshots.length > 1
                      ? "(min-width: 800px) 180px, 36vw"
                      : "(min-width: 1100px) 760px, (min-width: 800px) 66vw, 94vw"}
                  />
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-width footer-inner">
          <p>Juan Mondragon</p>
          <nav aria-label="Elsewhere">
            <a className="text-link" href="https://www.linkedin.com/in/juanmondragon">
              LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a className="text-link" href="mailto:juansjsu@gmail.com">Email</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

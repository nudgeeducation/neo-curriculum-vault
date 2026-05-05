import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  currentSection?: "home" | "curriculum" | "term-dates" | "policies" | "faq"
}

export default ((opts?: Options) => {
  const current = opts?.currentSection ?? undefined

  const NEOSiteHeader: QuartzComponent = (_props: QuartzComponentProps) => {
    const linkClass = (key: string) => (current === key ? "neo-current" : undefined)
    return (
      <header class="neo-site-header">
        <div class="neo-bar">
          <a class="neo-brand" href="https://nudgeeducation.online/">
            NEO <small>by Nudge Education</small>
          </a>
          <nav class="neo-primary" aria-label="NEO primary">
            <a href="https://nudgeeducation.online/" class={linkClass("home")}>
              Home
            </a>
            <a href="https://curriculum.nudgeeducation.online/" class={linkClass("curriculum")}>
              Curriculum
            </a>
            <a href="https://nudgeeducation.online/term-dates.html" class={linkClass("term-dates")}>
              Term dates
            </a>
            <a href="https://policies.nudgeeducation.online/" class={linkClass("policies")}>
              Policies
            </a>
            <a href="https://nudgeeducation.online/faq.html" class={linkClass("faq")}>
              FAQ
            </a>
          </nav>
        </div>
      </header>
    )
  }

  NEOSiteHeader.css = `
.neo-site-header {
  background: #1A2E3B;
  color: #fff;
  border-bottom: 4px solid #2AB3A0;
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  margin: 0 -2rem 1.5rem -2rem;
}
.neo-bar {
  width: min(1120px, 100% - 2.5rem);
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  gap: 1rem;
  flex-wrap: wrap;
}
.neo-brand {
  display: flex;
  align-items: baseline;
  gap: .6rem;
  color: #fff !important;
  text-decoration: none !important;
  font-family: "Fraunces", Georgia, "Times New Roman", serif !important;
  font-weight: 600;
  font-size: 1.35rem;
  letter-spacing: -.01em;
  background: none !important;
}
.neo-brand small {
  font-family: "Inter", system-ui, sans-serif !important;
  font-weight: 500;
  font-size: .78rem;
  color: #2AB3A0;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.neo-primary {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
}
.neo-primary a {
  color: #cfe7e2 !important;
  text-decoration: none !important;
  font-size: .94rem;
  font-weight: 500;
  background: none !important;
}
.neo-primary a:hover {
  color: #fff !important;
}
.neo-primary a.neo-current {
  color: #fff !important;
  border-bottom: 2px solid #2AB3A0;
  padding-bottom: 2px;
}
@media (max-width: 720px) {
  .neo-primary {
    gap: .85rem;
    font-size: .88rem;
    width: 100%;
    justify-content: flex-start;
  }
  .neo-bar {
    padding-bottom: .8rem;
  }
}
`

  return NEOSiteHeader
}) satisfies QuartzComponentConstructor

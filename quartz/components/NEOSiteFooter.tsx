import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const NEOSiteFooter: QuartzComponent = (_props: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    return (
      <footer class="neo-site-footer">
        <div class="neo-footer-wrap">
          <div class="neo-cols">
            <div>
              <p class="neo-footer-title">Nudge Education Online</p>
              <p>
                The online alternative provision from Nudge Education. Working towards voluntary
                Ofsted accreditation as an online school.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li>
                  <a href="https://curriculum.nudgeeducation.online/">Curriculum</a>
                </li>
                <li>
                  <a href="https://nudgeeducation.online/term-dates.html">Term dates</a>
                </li>
                <li>
                  <a href="https://nudgeeducation.online/faq.html">FAQ</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>For commissioners</h4>
              <ul>
                <li>
                  <a href="https://policies.nudgeeducation.online/">Policies</a>
                </li>
                <li>
                  <a href="https://www.eventbrite.co.uk/o/nudge-education-ltd-115006744051">
                    Open events
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Get in touch</h4>
              <ul>
                <li>
                  <a href="mailto:neo@nudgeeducation.online">neo@nudgeeducation.online</a>
                </li>
                <li>
                  <a href="https://nudgeeducation.online">nudgeeducation.online</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="neo-legal">
            <span>© {year} Nudge Education Ltd · Part of Nudge Education</span>
            <span>nudgeeducation.online</span>
          </div>
        </div>
      </footer>
    )
  }

  NEOSiteFooter.css = `
.neo-site-footer {
  background: #1A2E3B;
  color: #9ab3bf;
  padding: 3rem 0 2rem;
  font-size: .92rem;
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  margin: 4rem -2rem 0 -2rem;
}
.neo-footer-wrap {
  width: min(1120px, 100% - 2.5rem);
  margin-inline: auto;
}
.neo-cols {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2.5rem;
  margin-bottom: 2rem;
}
@media (max-width: 820px) {
  .neo-cols {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}
@media (max-width: 540px) {
  .neo-cols {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
.neo-site-footer p {
  margin: 0 0 .5rem;
  color: #9ab3bf;
}
.neo-site-footer .neo-footer-title {
  font-family: "Fraunces", Georgia, "Times New Roman", serif;
  font-size: 1.25rem;
  color: #fff;
  margin: 0 0 .5rem;
}
.neo-site-footer h4 {
  color: #fff;
  font-family: "Inter", system-ui, sans-serif;
  font-size: .78rem;
  letter-spacing: .12em;
  text-transform: uppercase;
  margin: 0 0 .75rem;
  font-weight: 600;
}
.neo-site-footer a {
  color: #cfe7e2 !important;
  text-decoration: none !important;
  background: none !important;
}
.neo-site-footer a:hover {
  color: #fff !important;
  text-decoration: underline !important;
}
.neo-site-footer ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.neo-site-footer li {
  margin-bottom: .5rem;
}
.neo-legal {
  border-top: 1px solid rgba(255, 255, 255, .1);
  padding-top: 1.25rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: .82rem;
  color: #7d94a0;
}
`

  return NEOSiteFooter
}) satisfies QuartzComponentConstructor

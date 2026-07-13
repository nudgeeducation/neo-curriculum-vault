import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Mirrors the canonical shared nav: nudge-access-website/shared/header.html (v1).
// If the shared nav changes, update this component to match (structure, links, labels).

interface Options {
  currentSection?:
    | "home"
    | "curriculum"
    | "courses"
    | "qualifications"
    | "term-dates"
    | "post-16"
    | "next"
    | "demo"
    | "policies"
    | "faq"
    | "help"
}

const GROUPS: Record<string, string[]> = {
  learning: ["curriculum", "courses", "qualifications", "term-dates"],
  post16: ["post-16", "next"],
  commissioners: ["demo", "policies"],
  about: ["faq"],
}

export default ((opts?: Options) => {
  const current = opts?.currentSection ?? undefined

  const NEOSiteHeader: QuartzComponent = (_props: QuartzComponentProps) => {
    const cur = (key: string) => (current === key ? "page" : undefined)
    const here = (group: string) =>
      current && GROUPS[group]?.includes(current) ? "nn-group nn-here" : "nn-group"
    return (
      <header class="nn" id="nn">
        <div class="nn-wrap">
          <a class="nn-brand" href="https://nudgeeducation.online/" aria-label="NEO by Nudge Education — home">
            <span class="nn-neo">
              NEO<span class="nn-sq" aria-hidden="true"></span>
            </span>
            <span class="nn-by">by Nudge Education</span>
          </a>
          <button class="nn-toggle" aria-expanded="false" aria-controls="nn-primary">
            Menu
          </button>
          <nav class="nn-menu" id="nn-primary" aria-label="Primary">
            <a href="https://nudgeeducation.online/" aria-current={cur("home")}>
              Home
            </a>
            <div class={here("learning")}>
              <button aria-expanded="false">
                Learning <span class="nn-caret" aria-hidden="true">▾</span>
              </button>
              <div class="nn-drop">
                <a href="https://curriculum.nudgeeducation.online/" aria-current={cur("curriculum")}>
                  Curriculum
                </a>
                <a href="https://courses.nudgeeducation.online/" aria-current={cur("courses")}>
                  {"Courses & clubs"}
                </a>
                <a
                  href="https://courses.nudgeeducation.online/qualifications.html"
                  aria-current={cur("qualifications")}
                >
                  Qualifications
                </a>
                <a href="https://nudgeeducation.online/term-dates.html" aria-current={cur("term-dates")}>
                  Term dates
                </a>
              </div>
            </div>
            <div class={here("post16")}>
              <button aria-expanded="false">
                Post-16 <span class="nn-caret" aria-hidden="true">▾</span>
              </button>
              <div class="nn-drop">
                <a href="https://nudgeeducation.online/post-16.html" aria-current={cur("post-16")}>
                  Post-16 at NEO
                </a>
                <a href="https://next.nudgeeducation.online/" aria-current={cur("next")}>
                  NEO Next — what could come next?
                </a>
              </div>
            </div>
            <div class={here("commissioners")}>
              <button aria-expanded="false">
                For commissioners <span class="nn-caret" aria-hidden="true">▾</span>
              </button>
              <div class="nn-drop">
                <a href="https://demo.nudgeeducation.online/" aria-current={cur("demo")}>
                  Open day demo
                </a>
                <a href="https://policies.nudgeeducation.online/" aria-current={cur("policies")}>
                  Policies
                </a>
                <a href="https://www.eventbrite.co.uk/o/nudge-education-ltd-115006744051" rel="noopener">
                  Open events
                </a>
              </div>
            </div>
            <div class={here("about")}>
              <button aria-expanded="false">
                About <span class="nn-caret" aria-hidden="true">▾</span>
              </button>
              <div class="nn-drop">
                <a href="https://nudgeeducation.online/faq.html" aria-current={cur("faq")}>
                  FAQ
                </a>
                <a href="https://nudgeeducation.co.uk/blog" rel="external">
                  Blog
                </a>
              </div>
            </div>
            <a href="https://support.nudgeeducation.online/" aria-current={cur("help")}>
              Help
            </a>
            <a class="nn-cta" href="https://forms.gle/faBGGggUKXVyGZc7A" rel="noopener">
              Register
            </a>
          </nav>
        </div>
      </header>
    )
  }

  NEOSiteHeader.css = `
/* Rendered as a sibling of #quartz-body, so it spans the full viewport width. */
.nn{background:#1A2E3B;color:#fff;font-family:'Inter',Arial,system-ui,sans-serif;position:relative;z-index:40;margin:0 0 1.5rem 0}
.nn *{box-sizing:border-box}
.nn-wrap{max-width:1140px;margin:0 auto;padding:.7rem 1.25rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.nn-brand{display:inline-flex;align-items:baseline;gap:.5rem;text-decoration:none !important;color:#fff !important;background:none !important}
.nn-neo{font-family:'Fraunces',Georgia,serif;font-weight:600;font-size:1.45rem;letter-spacing:.01em;display:inline-flex;align-items:baseline}
.nn-sq{display:inline-block;width:.42em;height:.42em;background:#2AB3A0;margin-left:.12em}
.nn-by{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:#c9d2da}
.nn-toggle{display:none;background:none;border:1px solid rgba(255,255,255,.35);color:#fff;font:600 .85rem 'Inter',Arial,sans-serif;padding:.45rem .8rem;border-radius:8px;cursor:pointer}
.nn-menu{display:flex;align-items:center;gap:.1rem;flex-wrap:wrap}
.nn-menu > a, .nn-group > button{font:500 .87rem 'Inter',Arial,sans-serif;color:#dfe5ea !important;text-decoration:none !important;background:none;border:none;padding:.45rem .6rem;border-radius:7px;cursor:pointer;display:inline-flex;align-items:center;gap:.3rem}
.nn-menu > a:hover, .nn-group > button:hover{background:rgba(255,255,255,.1);color:#fff !important}
.nn-menu a[aria-current="page"], .nn-group.nn-here > button{color:#fff !important;box-shadow:inset 0 -2px 0 #2AB3A0}
.nn-caret{font-size:.6rem;opacity:.7}
.nn-group{position:relative}
.nn-drop{position:absolute;top:100%;left:0;min-width:15rem;background:#fff;border:1px solid #E8ECEF;border-radius:10px;box-shadow:0 10px 28px rgba(26,46,59,.18);padding:.4rem;display:none;flex-direction:column}
.nn-group.open > .nn-drop{display:flex}
@media (hover:hover){.nn-group:hover > .nn-drop{display:flex}}
.nn-drop a{color:#2D3436 !important;text-decoration:none !important;font:500 .88rem 'Inter',Arial,sans-serif;padding:.5rem .65rem;border-radius:7px;display:block;background:none !important}
.nn-drop a:hover{background:#F5F1E8 !important;color:#1A2E3B !important}
.nn-drop a[aria-current="page"]{color:#1F8A7C !important;font-weight:600;box-shadow:none}
.nn-cta{background:#2AB3A0 !important;color:#04201c !important;font-weight:600;margin-left:.35rem}
.nn-cta:hover{background:#46c4b2 !important}
@media (max-width:880px){
  .nn-toggle{display:inline-block}
  .nn-menu{display:none;flex-direction:column;align-items:stretch;width:100%;padding:.5rem 0 .8rem}
  .nn.nn-open .nn-menu{display:flex}
  .nn-group > button{width:100%;justify-content:space-between}
  .nn-drop{position:static;display:flex;background:rgba(255,255,255,.06);border:none;box-shadow:none;margin:.1rem 0 .3rem}
  .nn-drop a{color:#dfe5ea !important;padding-left:1.2rem}
  .nn-drop a:hover{background:rgba(255,255,255,.1) !important;color:#fff !important}
  .nn-drop a[aria-current="page"]{color:#2AB3A0 !important}
  .nn-cta{margin:.4rem .6rem 0;text-align:center}
}
`

  NEOSiteHeader.afterDOMLoaded = `
function neoNavSetup(){
  var nn=document.getElementById('nn');
  if(!nn||nn.dataset.nnBound)return;
  nn.dataset.nnBound='1';
  var toggle=nn.querySelector('.nn-toggle');
  function closeAll(){nn.querySelectorAll('.nn-group.open').forEach(function(o){o.classList.remove('open');o.querySelector('button').setAttribute('aria-expanded','false');});}
  toggle.addEventListener('click',function(){
    var open=nn.classList.toggle('nn-open');
    toggle.setAttribute('aria-expanded',open?'true':'false');
  });
  nn.querySelectorAll('.nn-group > button').forEach(function(btn){
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      var g=btn.parentElement,was=g.classList.contains('open');
      closeAll();
      if(!was){g.classList.add('open');btn.setAttribute('aria-expanded','true');}
    });
  });
  document.addEventListener('click',function(e){if(!nn.contains(e.target))closeAll();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll();});
}
neoNavSetup();
document.addEventListener('nav',neoNavSetup);
`

  return NEOSiteHeader
}) satisfies QuartzComponentConstructor

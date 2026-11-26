import { TechnicalDiagram } from "./TechnicalDiagram";
import { diagrams, organisation } from "@/data/technicalDiagrams";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { chapterFlows, lifecycle, stories } from "@/data/visualStories";
import nice from "@/assets/nice-logo.png";
import "./visualStories.css";

export function Workflow({
  title,
  steps,
}: {
  title: string;
  steps: [string, string][];
}) {
  const [selected, select] = useState(0);
  return (
    <figure className="visual-panel workflow">
      <figcaption>{title}</figcaption>
      <ol>
        {steps.map(([label], i) => (
          <li key={label}>
            <button aria-pressed={selected === i} onClick={() => select(i)}>
              <small>{String(i + 1).padStart(2, "0")}</small>
              {label}
            </button>
            {i < steps.length - 1 && (
              <ArrowRight aria-hidden="true" size={14} />
            )}
          </li>
        ))}
      </ol>
      <p aria-live="polite">{steps[selected][1]}</p>
    </figure>
  );
}

const demand = [74, 102, 137, 151, 129, 110, 90, 64];
const actual = [81, 97, 152, 146, 139, 105, 94, 58];
const roster = [10, 13, 16, 19, 18, 15, 12, 10];
const hours = ["09", "10", "11", "12", "13", "14", "15", "16"];
export function Forecast() {
  return (
    <figure className="visual-panel">
      <figcaption>
        Forecast versus actual · illustrative contact volumes
      </figcaption>
      <div className="volume-graph">
        {hours.map((h, i) => (
          <div
            key={h}
            role="img"
            aria-label={
              h + ":00, forecast " + demand[i] + ", actual " + actual[i]
            }
          >
            <div className="volume-bars">
              <i
                title={String(demand[i])}
                style={{ height: demand[i] / 1.65 + "%" }}
              />
              <i
                title={String(actual[i])}
                style={{ height: actual[i] / 1.65 + "%" }}
              />
            </div>
            <small>{h}:00</small>
          </div>
        ))}
      </div>
      <p className="chart-legend">
        <span>● Forecast</span>
        <span>● Actual</span>
      </p>
    </figure>
  );
}
export function ChapterVisual({ chapter }: { chapter: number }) {
  return (
    <div className={"chapter-visual chapter-visual-" + chapter}>
      {chapter === 0 && (
        <figure className="visual-panel">
          <figcaption>Revenue rose. Operating profit fell.</figcaption>
          <table>
            <caption>Synthetic monthly ledger</caption>
            <thead>
              <tr>
                <th>Record</th>
                <th>Previous</th>
                <th>Current</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Revenue</td>
                <td>€12,000</td>
                <td>€12,500</td>
              </tr>
              <tr>
                <td>Operating costs</td>
                <td>€8,000</td>
                <td>€9,000</td>
              </tr>
              <tr>
                <td>Operating result</td>
                <td>€4,000</td>
                <td>€3,500</td>
              </tr>
            </tbody>
          </table>
          <p>Compare cost categories before deciding where to intervene.</p>
        </figure>
      )}
      {chapter === 2 && (
        <figure className="visual-panel journey-map">
          <figcaption>Across the Mediterranean</figcaption>
          <svg
            viewBox="0 0 320 110"
            role="img"
            aria-label="Schematic journey from Egypt northwest to Malta"
          >
            <path
              d="M0 90 40 72 100 82 150 71 190 78 235 68 280 79 320 68V110H0Z"
              fill="#23374c"
            />
            <path
              d="M250 83Q190 5 76 30"
              fill="none"
              stroke="#86e6fc"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <circle cx="250" cy="83" r="5" fill="#a4d8fd" />
            <circle cx="76" cy="30" r="5" fill="#86e6fc" />
            <text x="86" y="34" fill="#dff5ff">
              Malta
            </text>
            <text x="258" y="87" fill="#dff5ff">
              Egypt
            </text>
          </svg>
        </figure>
      )}
      {chapter === 3 && <TechnicalDiagram diagram={organisation} />}
      <Workflow
        key={chapter}
        title={
          [
            "From transaction to decision",
            "From demand to staffing",
            "Egypt to Malta",
            "Operational decision lifecycle",
            "Workforce migration journey",
            "Conceptual knowledge journey",
          ][chapter]
        }
        steps={chapterFlows[chapter]}
      />
      {chapter === 1 && <Forecast />}
      {chapter === 4 && (
        <TechnicalDiagram diagram={diagrams["wfm-migration"]} />
      )}
      {chapter === 5 && (
        <TechnicalDiagram diagram={diagrams["knowledge-hub"]} />
      )}
    </div>
  );
}

const responsibilities = [
  [
    "Sobhe Mosaad",
    "Workforce Coordinator · Aligns planning and real-time priorities with operational needs.",
  ],
  [
    "4 Workforce Planners",
    "Translate forecasts into capacity, staffing requirements and schedules.",
  ],
  [
    "13 Real-Time Management team members",
    "Monitor volumes, coverage and adherence, then coordinate intraday actions with operations.",
  ],
  [
    "Operations & business performance",
    "Use planning and live signals to make staffing decisions and review service performance.",
  ],
];
export function LeadershipVisual() {
  const [active, select] = useState(0);
  return (
    <figure className="visual-panel org-chart">
      <figcaption>Workforce leadership and operations</figcaption>
      <div className="org-nodes">
        {responsibilities.map(([label], i) => (
          <button
            key={label}
            aria-pressed={i === active}
            onClick={() => select(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <p aria-live="polite">{responsibilities[active][1]}</p>
    </figure>
  );
}
export function WorkforceVisual() {
  const [aht, setAht] = useState(360),
    [shrink, setShrink] = useState(25),
    [overtime, setOvertime] = useState(0);
  const required = demand.map((n) =>
    Math.ceil((n * aht) / (3600 * 0.85 * (1 - shrink / 100))),
  );
  const gap = required.reduce(
    (total, n, i) => total + Math.max(0, n - roster[i]),
    0,
  );
  return (
    <section id="workforce-lab" className="section-container visual-lab">
      <h2>Workforce intelligence</h2>
      <p>Illustrative one-hour intervals and synthetic staffing records.</p>
      <div className="visual-grid">
        <Forecast />
        <div className="visual-panel">
          <h3>Capacity & coverage simulator</h3>
          <label>
            Average handle time · {aht}s
            <input
              type="range"
              min="180"
              max="600"
              step="15"
              value={aht}
              onChange={(e) => setAht(+e.target.value)}
            />
          </label>
          <label>
            Shrinkage · {shrink}%
            <input
              type="range"
              min="0"
              max="55"
              value={shrink}
              onChange={(e) => setShrink(+e.target.value)}
            />
          </label>
          <label>
            Overtime to apply · {overtime} staff-hours
            <input
              type="range"
              min="0"
              max="24"
              value={overtime}
              onChange={(e) => setOvertime(+e.target.value)}
            />
          </label>
          <p>
            Staffing = forecast workload ÷ available handling time at 85%
            occupancy. Rounded up by interval.
          </p>
          <div className="coverage-grid">
            {hours.map((h, i) => {
              const delta = roster[i] - required[i];
              return (
                <div key={h} data-gap={delta < 0}>
                  <strong>{h}:00</strong>
                  <span>
                    {roster[i]} / {required[i]}
                  </span>
                  <small>
                    {delta >= 0 ? "+" : ""}
                    {delta}
                  </small>
                </div>
              );
            })}
          </div>
          <p>Scheduled / required · coverage difference</p>
          <output>
            {Math.max(0, gap - overtime)} uncovered staff-hours after overtime
          </output>
          <p>
            Illustrative backlog capacity if the uncovered hours are filled:{" "}
            {Math.floor(
              (Math.max(0, overtime - gap) * 3600 * 0.85 * (1 - shrink / 100)) /
                aht,
            )}{" "}
            contacts.
          </p>
        </div>
      </div>
      <div className="visual-panel synthetic-metrics">
        <h3>Synthetic operating snapshot</h3>
        <dl>
          {[
            ["Adherence", "91%", "437 of 480 minutes in scheduled activity"],
            ["Absenteeism", "5%", "24 of 480 scheduled team hours missed"],
            ["Leave balance", "8 days", "20 entitled − 9 taken − 3 booked"],
            [
              "Cross-training",
              "3 of 8",
              "Three agents eligible for both queues",
            ],
          ].map(([label, value, detail]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <strong>{value}</strong>
                <span>{detail}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <TechnicalDiagram diagram={diagrams.workforce} />
      <Workflow title="Operational decision lifecycle" steps={lifecycle} />
    </section>
  );
}

function RetrievalDemo() {
  const [question, setQuestion] = useState("hours"),
    [stage, setStage] = useState(0);
  return (
    <div className="visual-panel">
      <h3>Try a synthetic knowledge lookup</h3>
      <p>Project scope: Example Support · Active revision: v2</p>
      <label>
        Example question
        <select
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            setStage(0);
          }}
        >
          <option value="hours">When does support close?</option>
          <option value="handover">Where do open requests go?</option>
        </select>
      </label>
      {stage === 0 ? (
        <button onClick={() => setStage(1)}>Process example document</button>
      ) : (
        <>
          <p>
            Indexed two passages from the current revision. An older revision
            and a document outside this project are excluded.
          </p>
          <button onClick={() => setStage(2)}>Retrieve matching passage</button>
        </>
      )}
      {stage === 2 && (
        <blockquote aria-live="polite">
          {question === "hours"
            ? "Support closes at 18:00 on weekdays."
            : "Open requests go to the next shift’s handover queue."}
          <footer>
            Example Support Handbook v2 ·{" "}
            {question === "hours" ? "§1 Coverage" : "§2 Handover"}
          </footer>
        </blockquote>
      )}
    </div>
  );
}
function DataExample() {
  const [filter, setFilter] = useState(false);
  return (
    <div className="visual-panel">
      <h3>Synthetic data lineage and validation</h3>
      <p className="lineage">
        Queue (1) → Interval workload (many) → Daily reporting
      </p>
      <p>
        Source queue code → queue_id · interval start → work_date · offered
        contacts → offered
      </p>
      <label>
        <input
          type="checkbox"
          checked={filter}
          onChange={(e) => setFilter(e.target.checked)}
        />{" "}
        Filter to Support queue
      </label>
      <pre>
        {"SELECT queue_id, SUM(offered) AS contacts\nFROM example_interval\n" +
          (filter ? "WHERE queue_id = 'SUPPORT'\n" : "") +
          "GROUP BY queue_id;"}
      </pre>
      <table>
        <caption>Illustrative results</caption>
        <thead>
          <tr>
            <th scope="col">Queue</th>
            <th scope="col">Contacts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SUPPORT</td>
            <td>412</td>
          </tr>
          {!filter && (
            <tr>
              <td>BILLING</td>
              <td>228</td>
            </tr>
          )}
        </tbody>
      </table>
      <p>
        Validate unique queue/interval keys and reconcile totals with the
        extract.
      </p>
    </div>
  );
}
export function CaseStudyVisual({ slug }: { slug: string }) {
  return (
    <div className={"case-visual visual-" + slug}>
      {diagrams[slug] && <TechnicalDiagram diagram={diagrams[slug]} />}
      {slug === "wfm-migration" && (
        <div className="migration-brand">
          <span>Injixo / Peopleware</span>
          <ArrowRight />
          <img src={nice} alt="NICE IEX" />
        </div>
      )}
      <Workflow
        key={slug}
        title={
          slug === "wfm-migration"
            ? "Phased migration · contribution and validation"
            : slug === "digital-ecosystem"
              ? "How this portfolio works"
              : "Conceptual architecture · public-safe overview"
        }
        steps={stories[slug]}
      />
      {slug === "knowledge-hub" && <RetrievalDemo />}
      {slug === "wfm-migration" && <DataExample />}
      {slug === "workforce-automation" && (
        <>
          <div className="visual-grid">
            <div className="visual-panel">
              <h3>Manual handoffs</h3>
              <p>Export files → copy into workbook → review → compose email</p>
            </div>
            <div className="visual-panel">
              <h3>Automated handoffs</h3>
              <p>
                Refresh data → validate exceptions → render summary → distribute
                after approval
              </p>
            </div>
          </div>
          <div className="visual-panel sample-report">
            <h3>Daily operations email</h3>
            <p>Synthetic HTML report preview · Tuesday, 16:00</p>
            <table>
              <thead>
                <tr>
                  <th scope="col">Measure</th>
                  <th scope="col">Plan</th>
                  <th scope="col">Actual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Contacts</td>
                  <td>857</td>
                  <td>872</td>
                </tr>
                <tr>
                  <td>Staff-hours</td>
                  <td>121</td>
                  <td>113</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

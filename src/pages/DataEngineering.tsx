import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { databaseCases } from "@/data/database";
import sql from "@/assets/sql-logo.jpg";
import "./refinement.css";

const entities = [
  {
    name: "Employee",
    key: "employee_id (PK)",
    detail: "One employee can have multiple assignments and roster intervals.",
  },
  {
    name: "Assignment",
    key: "assignment_id (PK) · employee_id, group_id (FK)",
    detail: "Effective dates preserve each change in team or configuration.",
  },
  {
    name: "Roster interval",
    key: "interval_id (PK) · employee_id (FK)",
    detail: "Each interval represents scheduled activity at a specific time.",
  },
  {
    name: "Time-off group",
    key: "group_id (PK)",
    detail:
      "One group can serve several assignments and have several rule versions.",
  },
  {
    name: "Rule version",
    key: "rule_id (PK) · group_id (FK)",
    detail: "Validity dates establish which entitlement policy applies.",
  },
];
const dates = ["2025-01-01", "2025-04-01", "2025-07-01"];
const assignments = ["Support", "Billing", "Planning"];
export default function DataEngineering() {
  const [entity, E] = useState(0),
    [period, P] = useState(0),
    [outcome, O] = useState("Accepted"),
    [selected, S] = useState(0);
  const item = databaseCases[selected];
  return (
    <>
      <Navbar />
      <main id="main-content" className="section-container data-feature">
        <header>
          <img src={sql} alt="SQL Server" />
          <p>SQL Server / T-SQL · PostgreSQL · BigQuery</p>
          <h1>Database engineering</h1>
          <p>
            Connecting operational records so teams can trust the reports and
            decisions that depend on them.
          </p>
        </header>
        <section>
          <h2>Model the relationships</h2>
          <p>Synthetic operational schema. Select an entity to see its role.</p>
          <div className="entity-map">
            {entities.map((e, i) => (
              <button
                key={e.name}
                aria-pressed={entity === i}
                onClick={() => E(i)}
              >
                <strong>{e.name}</strong>
                <small>{e.key}</small>
                {i === 1 && <span>↳ Many per employee or group</span>}
                {i === 2 && <span>↳ Many per employee</span>}
                {i === 4 && <span>↳ Many per time-off group</span>}
              </button>
            ))}
          </div>
          <p className="relation-line">
            Employee 1 → many assignments and roster intervals · Group 1 → many
            assignments and rule versions
          </p>
          <p aria-live="polite">{entities[entity].detail}</p>
        </section>
        <section>
          <h2>Report from the correct operational period</h2>
          <p>
            Use the assignment valid on the roster date. Looking up the current
            assignment can silently change historical totals.
          </p>
          <div className="assignment-track">
            {dates.map((date, i) => (
              <button
                key={date}
                aria-pressed={period === i}
                onClick={() => P(i)}
              >
                {date}
                <strong>{assignments[i]}</strong>
              </button>
            ))}
          </div>
          <pre>{`WITH valid_assignment AS (
  SELECT employee_id, team
  FROM example_assignment
  WHERE effective_start <= :report_date
    AND (effective_end > :report_date OR effective_end IS NULL)
)
SELECT r.employee_id, a.team, SUM(r.minutes) AS minutes
FROM example_roster r
LEFT JOIN valid_assignment a ON a.employee_id = r.employee_id
WHERE r.roster_date = :report_date
GROUP BY r.employee_id, a.team;`}</pre>
          <table>
            <caption>Synthetic result for {dates[period]}</caption>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Assignment</th>
                <th>Minutes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>EX-101</td>
                <td>{assignments[period]}</td>
                <td>{[420, 450, 480][period]}</td>
              </tr>
            </tbody>
          </table>
          <p>
            Validate that assignments do not overlap before aggregating. Keep
            unmatched records visible for review.
          </p>
        </section>
        <section>
          <h2>From system records to decisions</h2>
          <p className="relation-line">
            Operational systems → database connections → SQL processing →
            transformation → reports and applications
          </p>
          <p>
            Joins connect related datasets. CTEs and subqueries isolate
            intermediate checks. Conditional logic and aggregations turn raw
            records into reporting measures. Parameterised procedures keep
            repeated operations scoped to the intended period or business
            record.
          </p>
        </section>
        <section>
          <h2>Protect and reconcile transactions</h2>
          <p>Explore a synthetic request from validation through audit.</p>
          <div className="assignment-track">
            {["Accepted", "Rejected", "Rolled back"].map((x) => (
              <button key={x} aria-pressed={outcome === x} onClick={() => O(x)}>
                {x}
              </button>
            ))}
          </div>
          <p className="relation-line" aria-live="polite">
            {outcome === "Accepted"
              ? "Validate → apply change → verify → commit → audit accepted request"
              : outcome === "Rejected"
                ? "Validate → detect duplicate reference or invalid input → record rejection"
                : "Validate → apply change → verification fails → rollback → record failure"}
          </p>
        </section>
        <section>
          <h2>SQL case studies</h2>
          <div className="collection-nav">
            {databaseCases.map((c, i) => (
              <button
                key={c.id}
                aria-pressed={selected === i}
                onClick={() => S(i)}
              >
                {c.title}
              </button>
            ))}
          </div>
          <article aria-live="polite">
            <small>{item.status}</small>
            <h3>{item.title}</h3>
            <p>{item.problem}</p>
            <h4>Investigation and approach</h4>
            <p>{item.approach}</p>
            <h4>Validation</h4>
            <p>{item.validation}</p>
            {item.id === "migration" && (
              <Link to="/projects/wfm-migration">
                Explore the migration workflow ↗
              </Link>
            )}
          </article>
        </section>
        <p>
          <a href="/Sobhe_Mosaad_Resume.pdf">Download résumé</a> ·{" "}
          <Link to="/#work">View project showcase</Link>
        </p>
      </main>
      <FooterSection />
    </>
  );
}

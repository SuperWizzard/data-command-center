import { useId, useRef } from "react";
import "./technicalDiagram.css";

export type Node = {
  x: number;
  y: number;
  lines: string[];
  kind?: "database" | "decision" | "success" | "exception" | "entity";
};
type Edge = { from: number; to: number; label?: string; relation?: boolean; lane?: number; targetOffset?: number };
export type Diagram = {
  title: string;
  nodes: Node[];
  edges: Edge[];
  caption?: string;
  boundary?: string;
};
export function TechnicalDiagram({ diagram }: { diagram: Diagram }) {
  const id = useId(),
    dialog = useRef<HTMLDialogElement>(null);
  const { title, nodes, edges, caption, boundary } = diagram;
  const width = Math.max(...nodes.map((n) => n.x)) + 100,
    height = Math.max(...nodes.map((n) => n.y)) + 60;
  function drawing(marker: string) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={title}
        style={{ minWidth: width * 0.9 }}
      >
        <defs>
          <marker
            id={marker}
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8 Z" fill="#99adbd" />
          </marker>
        </defs>
        {boundary && (
          <>
            <rect
              x="8"
              y="10"
              width={width - 16}
              height={height - 19}
              rx="5"
              className="diagram-boundary"
            />
            <text x="18" y="28" className="diagram-label">
              {boundary}
            </text>
          </>
        )}
        {edges.map(({ from, to, label, relation, lane, targetOffset = 0 }) => {
          const a = nodes[from],
            b = nodes[to],
            horizontal = a.y === b.y,
            sign = horizontal ? Math.sign(b.x - a.x) : Math.sign(b.y - a.y);
          const x1 = a.x + (horizontal ? 82 * sign : 0),
            x2 = b.x + targetOffset - (horizontal ? 82 * sign : 0);
          const y1 = a.y + (horizontal ? 0 : 31 * sign),
            y2 = b.y - (horizontal ? 0 : 31 * sign);
          const mid = lane ?? (y1 + y2) / 2;
          return (
            <g key={from + "-" + to}>
              <path
                d={
                  horizontal
                    ? `M${x1} ${y1}H${x2}`
                    : `M${x1} ${y1}V${mid}H${x2}V${y2}`
                }
                className="diagram-edge"
                markerEnd={relation ? undefined : `url(#${marker})`}
              />
              {relation && (
                <path
                  d={`M${x2 - 7} ${y2 - 10 * sign}L${x2} ${y2}L${x2 + 7} ${y2 - 10 * sign}M${x1 - 6} ${y1 + 7 * sign}h12`}
                  className="diagram-edge"
                />
              )}
              {label && (
                <text
                  x={(x1 + x2) / 2 + (horizontal ? 0 : 4)}
                  y={mid - 7}
                  textAnchor={horizontal ? "middle" : "start"}
                  className="diagram-label"
                >
                  {label}
                </text>
              )}
            </g>
          );
        })}
        {nodes.map(({ x, y, lines, kind }, i) => (
          <g
            key={i}
            transform={`translate(${x} ${y})`}
            className={"diagram-node " + (kind ?? "process")}
          >
            {kind === "decision" ? (
              <polygon points="0,-31 82,0 0,31 -82,0" />
            ) : kind === "database" ? (
              <>
                <path d="M-82 -21 Q0 -40 82 -21 V21 Q0 41 -82 21Z" />
                <path d="M-82 -21Q0 -3 82 -21" className="diagram-edge" />
              </>
            ) : (
              <rect x="-82" y="-31" width="164" height="62" rx="3" />
            )}
            {kind === "entity" && (
              <path d="M-82 -10H82" className="diagram-edge" />
            )}
            {lines.map((line, j) => (
              <text
                key={line}
                textAnchor="middle"
                y={
                  kind === "entity"
                    ? -17 + j * 18
                    : 5 + (j - (lines.length - 1) / 2) * 16
                }
              >
                {line}
              </text>
            ))}
          </g>
        ))}
      </svg>
    );
  }
  return (
    <figure className="technical-diagram">
      <figcaption>
        <strong>{title}</strong>
        <button type="button" onClick={() => dialog.current?.showModal()}>
          Expand diagram
        </button>
      </figcaption>
      <div
        className="diagram-scroll"
        tabIndex={0}
        role="region"
        aria-label={title + " diagram, scroll horizontally if needed"}
      >
        {drawing(id)}
      </div>
      <p className="diagram-pan">Scroll across to see the full diagram.</p>
      <p>
        {caption ??
          "Conceptual illustration using generic systems and records."}
      </p>
      <dialog ref={dialog} aria-label={title}>
        <header>
          <strong>{title}</strong>
          <form method="dialog">
            <button>Close diagram</button>
          </form>
        </header>
        <div
          className="diagram-scroll"
          tabIndex={0}
          role="region"
          aria-label="Expanded diagram"
        >
          {drawing(id + "-expanded")}
        </div>
      </dialog>
    </figure>
  );
}


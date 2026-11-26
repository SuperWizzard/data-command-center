import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import {
  StoryTimeline,
  ThinkingSection,
  BuiltSection,
  ExploreAI,
} from "@/components/StorySections";
import { projects, demonstrations } from "@/data/portfolio";
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
  },
}));
afterEach(cleanup);
describe("portfolio interactions and content integrity", () => {
  it("distinguishes current leadership from the previous team", () => {
    render(<StoryTimeline />);
    fireEvent.click(
      screen.getByRole("button", { name: /04 From analysing to leading/ }),
    );
    expect(
      screen.getByText(/leadership of 4 Workforce Planners and 13/),
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: /02 Discovering the power/ }),
    );
    expect(screen.getByText(/managing a team of 17/)).toBeInTheDocument();
  });
  it("changes the visible problem-solving explanation", () => {
    render(<ThinkingSection />);
    fireEvent.click(screen.getByRole("button", { name: /05 Validate/ }));
    expect(screen.getByText(/Test edge cases/)).toBeInTheDocument();
  });
  it("filters ongoing projects while retaining case study links", () => {
    render(
      <MemoryRouter>
        <BuiltSection />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Ongoing" }));
    expect(
      screen.queryByRole("heading", { name: "eXoria" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { name: "AI-Powered Knowledge Hub" })
        .length,
    ).toBeGreaterThan(0);
  });
  it("opens the assistant with a suggested question", () => {
    const listener = vi.fn();
    window.addEventListener("portfolio:chat", listener);
    render(<ExploreAI />);
    fireEvent.click(
      screen.getByRole("button", { name: "What teams has he managed?" }),
    );
    expect(listener.mock.calls[0][0].detail).toBe("What teams has he managed?");
    window.removeEventListener("portfolio:chat", listener);
  });
  it("keeps unique case study slugs and all four original routes", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(6);
    expect(demonstrations.map((p) => p.path)).toEqual([
      "/bikeshare",
      "/scheduling",
      "/workforce",
      "/erp-analysis",
    ]);
  });
});

import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import { SessionBlock } from "./session-block";

const session: Session = {
  id: "opening-keynote",
  title: "Opening Keynote",
  speaker: "Marta Fernandez",
  track: "React",
  level: "beginner",
  room: "Main Hall",
  startTime: "09:00",
  durationMinutes: 45,
  description: "",
};

describe("SessionBlock", () => {
  it("shows the title, the start time and the speaker", () => {
    render(<SessionBlock session={session} top={0} height={72} />);

    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    expect(screen.getByText("09:00 · Marta Fernandez")).toBeInTheDocument();
  });

  it("links to the session page", () => {
    render(<SessionBlock session={session} top={0} height={72} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });

  it("shows the session level", () => {
    render(<SessionBlock session={session} top={0} height={72} />);

    expect(screen.getByText("Beginner")).toBeInTheDocument();
  });

  it("names the level in the link's accessible name", () => {
    render(<SessionBlock session={session} top={0} height={72} />);

    expect(
      screen.getByRole("link", { name: /level: beginner/i }),
    ).toBeInTheDocument();
  });

  it.each([
    ["intermediate", "Intermediate"],
    ["advanced", "Advanced"],
  ] as const)("shows the %s level as %s", (level, label) => {
    render(
      <SessionBlock session={{ ...session, level }} top={0} height={72} />,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});

import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./group-sessions-by-speaker";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("groups sessions under their speaker", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Marta Fernandez" }),
      session({ id: "s2", speaker: "Marta Fernandez" }),
      session({ id: "s3", speaker: "Iker Otxoa" }),
    ]);

    expect(groups).toEqual([
      {
        speaker: "Iker Otxoa",
        sessions: [expect.objectContaining({ id: "s3" })],
      },
      {
        speaker: "Marta Fernandez",
        sessions: [
          expect.objectContaining({ id: "s1" }),
          expect.objectContaining({ id: "s2" }),
        ],
      },
    ]);
  });

  it("sorts speakers alphabetically by name", () => {
    const groups = groupSessionsBySpeaker([
      session({ speaker: "Sofia Almeida" }),
      session({ speaker: "Diego Castellanos" }),
    ]);

    expect(groups.map((group) => group.speaker)).toEqual([
      "Diego Castellanos",
      "Sofia Almeida",
    ]);
  });

  it("excludes the closing-panel placeholder speaker", () => {
    const groups = groupSessionsBySpeaker([
      session({ speaker: "Full speaker lineup" }),
      session({ speaker: "Marta Fernandez" }),
    ]);

    expect(groups).toEqual([
      { speaker: "Marta Fernandez", sessions: [expect.any(Object)] },
    ]);
  });

  it("returns an empty array for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});

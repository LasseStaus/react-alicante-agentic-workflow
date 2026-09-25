import type { Session } from "@/types/session";

/** Placeholder speaker value seeded for the closing-panel session; not a real speaker. */
const EXCLUDED_SPEAKERS = new Set(["Full speaker lineup"]);

export interface SpeakerSessions {
  speaker: string;
  sessions: Session[];
}

/**
 * Groups sessions by speaker, dropping placeholder entries and sorting
 * speakers alphabetically by name.
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    if (EXCLUDED_SPEAKERS.has(session.speaker)) continue;

    const existing = bySpeaker.get(session.speaker) ?? [];
    existing.push(session);
    bySpeaker.set(session.speaker, existing);
  }

  return Array.from(bySpeaker, ([speaker, speakerSessions]) => ({
    speaker,
    sessions: speakerSessions,
  })).sort((a, b) => a.speaker.localeCompare(b.speaker));
}

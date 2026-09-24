import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  speaker: string;
  sessions: Session[];
}

export function SpeakerCard({ speaker, sessions }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle fontSize="md">{speaker}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="3">
          {sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <Flex direction="column">
                <Text
                  fontSize="sm"
                  color="var(--text-primary)"
                  _hover={{ color: "var(--accent-hex)" }}
                >
                  {session.title}
                </Text>
                <Text fontSize="xs" color="var(--text-muted)">
                  {session.startTime}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}

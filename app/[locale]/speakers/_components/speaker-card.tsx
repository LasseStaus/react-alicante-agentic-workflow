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
        <CardTitle as="h2" fontSize="md">
          {speaker}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Flex as="ul" direction="column" gap="3" listStyleType="none">
          {sessions.map((session) => (
            <Flex as="li" key={session.id}>
              <Link
                href={`/sessions/${session.id}`}
                aria-label={`${session.title}, ${session.startTime}`}
              >
                <Flex direction="column" paddingY="1">
                  <Text
                    fontSize="sm"
                    color="var(--text-primary)"
                    _hover={{ color: "var(--accent-hex)" }}
                  >
                    {session.title}
                  </Text>
                  <Text fontSize="xs" color="var(--text-secondary)">
                    {session.startTime}
                  </Text>
                </Flex>
              </Link>
            </Flex>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}

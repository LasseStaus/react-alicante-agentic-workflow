import { Badge } from "@/components/atoms/badge";
import { SurfaceCard } from "@/components/atoms/surface-card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface SessionBlockProps {
  session: Session;
  top: number;
  height: number;
}

export function SessionBlock({ session, top, height }: SessionBlockProps) {
  const t = useTranslations("SessionLevel");
  const tBadge = useTranslations("SessionBadge");

  const levelLabel = t(session.level);
  const accessibleName = [
    session.title,
    tBadge("level", { value: levelLabel }),
    session.startTime,
    session.speaker,
  ].join(", ");

  return (
    <Link href={`/sessions/${session.id}`} aria-label={accessibleName}>
      <Box
        position="absolute"
        insetX="1"
        top={`${top}px`}
        height={`${height}px`}
      >
        <SurfaceCard>
          <Flex align="center" gap="1" aria-hidden="true">
            <Text fontWeight="medium" color="var(--text-primary)" truncate>
              {session.title}
            </Text>
            <Box flexShrink="0">
              <Badge variant="secondary">{levelLabel}</Badge>
            </Box>
          </Flex>
          <Text color="var(--text-muted)" truncate aria-hidden="true">
            {session.startTime} · {session.speaker}
          </Text>
        </SurfaceCard>
      </Box>
    </Link>
  );
}

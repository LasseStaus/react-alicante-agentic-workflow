import { Badge } from "@/components/atoms/badge";
import { SurfaceCard } from "@/components/atoms/surface-card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Box, Flex, Text } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

interface SessionBlockProps {
  session: Session;
  top: number;
  height: number;
}

export async function SessionBlock({
  session,
  top,
  height,
}: SessionBlockProps) {
  const t = await getTranslations("SessionLevel");

  return (
    <Link href={`/sessions/${session.id}`}>
      <Box
        position="absolute"
        insetX="1"
        top={`${top}px`}
        height={`${height}px`}
      >
        <SurfaceCard>
          <Flex align="center" gap="1">
            <Text fontWeight="medium" color="var(--text-primary)" truncate>
              {session.title}
            </Text>
            <Box flexShrink="0">
              <Badge variant="secondary">{t(session.level)}</Badge>
            </Box>
          </Flex>
          <Text color="var(--text-muted)" truncate>
            {session.startTime} · {session.speaker}
          </Text>
        </SurfaceCard>
      </Box>
    </Link>
  );
}

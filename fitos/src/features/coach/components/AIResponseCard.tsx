import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Waveform } from './Waveform';
import { colors } from '@/shared/theme/colors';

interface BriefingItem {
  text: string;
  type: 'positive' | 'recommendation' | 'neutral';
}

interface AIResponseCardProps {
  coachName: string;
  userName: string;
  briefing: BriefingItem[];
  isThinking: boolean;
}

export function AIResponseCard({
  coachName,
  userName,
  briefing,
  isThinking,
}: AIResponseCardProps) {
  return (
    <View style={styles.card}>
      {/* Greeting */}
      <Text style={styles.greeting}>
        {getGreeting()},{'\n'}{userName}.          
      </Text>

      {/* Waveform — the AI's presence */}
      <View style={styles.waveformRow}>
        <Waveform isThinking={isThinking} />
      </View>

      {/* Briefing */}
      <View style={styles.briefing}>
        {briefing.map((item, i) => (
          <BriefingRow key={i} item={item} />
        ))}
      </View>
    </View>
  );
}

function BriefingRow({ item }: { item: BriefingItem }) {
  const dotColor =
    item.type === 'positive'
      ? colors.accent
      : item.type === 'recommendation'
      ? colors.warning
      : colors.textTertiary;

  return (
    <View style={styles.briefingRow}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <Text style={styles.briefingText}>{item.text}</Text>
    </View>
  );
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(17, 17, 17, 0.72)',
    padding: 18,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '300',
    color: colors.textPrimary,
    lineHeight: 28,
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  waveformRow: {
    marginTop: 4,
    marginBottom: 2,
    alignItems: 'flex-start',
  },
  briefing: {
    gap: 8,
  },
  briefingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 7,
    flexShrink: 0,
  },
  briefingText: {
    fontSize: 13,
    fontWeight: '300',
    color: colors.textSecondary,
    lineHeight: 18,
    flex: 1,
    letterSpacing: 0.1,
  },
});

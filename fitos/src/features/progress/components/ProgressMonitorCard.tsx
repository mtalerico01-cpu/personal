import React, { useState } from 'react';
import { LayoutChangeEvent, View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { radius, spacing } from '@/shared/theme/spacing';

type MetricKey = 'weight' | 'strength' | 'body';

interface ProgressMonitorCardProps {
  weightSeries: ChartPoint[];
  weightCurrentLbs: number;
  weightGoalLbs: number;
  strengthScore: number;
  strengthChange: number;
  strengthSeries: ChartPoint[];
  bodySeries: ChartPoint[];
  bodyLoggedCount: number;
  bodyTotalCount: number;
}

interface ChartPoint {
  label: string;
  value: number;
}

const CHART_HEIGHT = 132;
const CHART_GRAIN = '90 days · weekly';
const Y_AXIS_LABEL_WIDTH = 42;
const PLOT_HEIGHT = 108;

export function ProgressMonitorCard({
  weightSeries,
  weightCurrentLbs,
  weightGoalLbs,
  strengthScore,
  strengthChange,
  strengthSeries,
  bodySeries,
  bodyLoggedCount,
  bodyTotalCount,
}: ProgressMonitorCardProps) {
  const theme = useActiveTheme();
  const [metric, setMetric] = useState<MetricKey>('weight');
  const [chartFrameWidth, setChartFrameWidth] = useState(0);

  const selected = {
    weight: {
      label: 'Weight',
      value: `${weightCurrentLbs.toFixed(1)} lbs`,
      helper: `${Math.abs(weightGoalLbs - weightCurrentLbs).toFixed(1)} lbs to goal`,
      unit: 'lbs',
      series: weightSeries,
    },
    strength: {
      label: 'Strength',
      value: `${strengthScore}`,
      helper: `+${strengthChange} this month`,
      unit: 'score',
      series: strengthSeries,
    },
    body: {
      label: 'Waist',
      value: `${bodyLoggedCount}/${bodyTotalCount}`,
      helper: `${bodySeries[bodySeries.length - 1]?.value.toFixed(1) ?? '--'} in current`,
      unit: 'in',
      series: bodySeries,
    },
  }[metric];

  const chartData = toLineData(selected.series);
  const axis = getAxis(selected.series, selected.unit);
  const chartWidth = Math.max(220, chartFrameWidth - Y_AXIS_LABEL_WIDTH - spacing[5]);

  function handleChartLayout(event: LayoutChangeEvent) {
    setChartFrameWidth(event.nativeEvent.layout.width);
  }

  return (
    <Card padding={16}>
      <View style={styles.headerRow}>
        <View>
          <Text variant="labelMedium" color={theme.colors.persona.core} style={styles.eyebrow}>
            PROGRESS MONITOR
          </Text>
          <Text variant="headingMedium" color={colors.textPrimary}>
            {selected.label} trend
          </Text>
        </View>
        <View style={styles.metricValue}>
          <Text variant="headingSmall" color={colors.textPrimary}>{selected.value}</Text>
          <Text variant="caption" color={colors.textTertiary}>{selected.helper}</Text>
        </View>
      </View>

      <View style={[styles.contextRow, { borderTopColor: theme.colors.border.subtle }]}> 
        <View style={styles.timeframeRow}>
          <Text variant="caption" color={colors.textTertiary}>TIMEFRAME</Text>
          <Text variant="labelMedium" color={colors.textSecondary}>{CHART_GRAIN}</Text>
        </View>
        <View style={[styles.axisUnitPill, { backgroundColor: theme.colors.persona.soft, borderColor: theme.colors.border.persona }]}> 
          <Text variant="labelMedium" color={theme.colors.persona.core}>{selected.unit}</Text>
        </View>
      </View>

      <View style={[styles.tabs, { borderColor: theme.colors.border.subtle, backgroundColor: theme.colors.surface.default }]}> 
        <MetricTab label="Weight" active={metric === 'weight'} onPress={() => setMetric('weight')} />
        <MetricTab label="Strength" active={metric === 'strength'} onPress={() => setMetric('strength')} />
        <MetricTab label="Waist" active={metric === 'body'} onPress={() => setMetric('body')} />
      </View>

      <View
        style={[
          styles.chartFrame,
          { borderColor: theme.colors.border.subtle, backgroundColor: theme.colors.surface.default },
        ]}
        onLayout={handleChartLayout}
      >
        {chartFrameWidth > 0 && (
          <SimpleTrendChart
            data={chartData}
            axis={axis}
            width={chartWidth}
          />
        )}
      </View>
    </Card>
  );
}

interface MetricTabProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

function MetricTab({ label, active, onPress }: MetricTabProps) {
  const theme = useActiveTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.78}
      style={[
        styles.tab,
        active && styles.tabActive,
        active && { backgroundColor: theme.colors.persona.soft, borderColor: theme.colors.border.persona },
      ]}
    >
      <Text variant="labelMedium" color={active ? theme.colors.persona.core : theme.colors.text.muted} style={styles.tabText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function SimpleTrendChart({ data, axis, width }: { data: ChartPoint[]; axis: AxisConfig; width: number }) {
  const theme = useActiveTheme();
  const points = getChartPoints(data, axis, width);
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${path} L ${width} ${PLOT_HEIGHT} L 0 ${PLOT_HEIGHT} Z`;
  const latest = points[points.length - 1];
  const topLabel = axis.labels[2];
  const middleLabel = axis.labels[1];
  const bottomLabel = axis.labels[0];

  return (
    <View style={styles.chartShell}>
      <View style={styles.yAxisLabels}>
        <Text variant="caption" color={colors.textSecondary} style={styles.axisText}>{topLabel}</Text>
        <Text variant="caption" color={colors.textSecondary} style={styles.axisText}>{middleLabel}</Text>
        <Text variant="caption" color={colors.textSecondary} style={styles.axisText}>{bottomLabel}</Text>
      </View>
      <View style={styles.plotColumn}>
        <Svg width={width} height={PLOT_HEIGHT}>
          <Defs>
            <LinearGradient id="progressFill" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={theme.colors.persona.core} stopOpacity="0.11" />
              <Stop offset="1" stopColor={theme.colors.persona.core} stopOpacity="0.01" />
            </LinearGradient>
          </Defs>
          <Path d={`M 0 1 H ${width}`} stroke={theme.colors.border.subtle} strokeWidth={1} />
          <Path d={`M 0 ${PLOT_HEIGHT / 2} H ${width}`} stroke={theme.colors.border.subtle} strokeWidth={1} />
          <Path d={`M 0 ${PLOT_HEIGHT - 1} H ${width}`} stroke={theme.colors.border.default} strokeWidth={1} />
          <Path d={areaPath} fill="url(#progressFill)" />
          <Path d={path} fill="none" stroke={theme.colors.persona.soft} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
          <Path d={path} fill="none" stroke={theme.colors.persona.core} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx={latest.x} cy={latest.y} r={4} fill={theme.colors.persona.core} />
        </Svg>
        <View style={styles.xAxisLabels}>
          <Text variant="caption" color={colors.textSecondary} style={styles.axisText}>{data[0]?.label}</Text>
          <Text variant="caption" color={colors.textSecondary} style={styles.axisText}>{data[data.length - 1]?.label}</Text>
        </View>
      </View>
    </View>
  );
}

function toLineData(series: ChartPoint[]): ChartPoint[] {
  return series.map((point) => ({
    value: point.value,
    label: point.label,
  }));
}

interface AxisConfig {
  minValue: number;
  maxValue: number;
  labels: string[];
}

function getAxis(series: ChartPoint[], unit: string): AxisConfig {
  const values = series.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = Math.max((max - min) * 0.18, unit === 'score' ? 8 : 1);
  const minValue = Math.floor(min - padding);
  const topValue = Math.ceil(max + padding);
  const maxValue = topValue - minValue;
  const labels = Array.from({ length: 3 }, (_, index) => {
    const value = minValue + (maxValue / 2) * index;
    return formatValue(value, unit);
  });

  return { minValue, maxValue, labels };
}

function getChartPoints(data: ChartPoint[], axis: AxisConfig, width: number) {
  const range = axis.maxValue || 1;

  return data.map((point, index) => ({
    x: (index / Math.max(data.length - 1, 1)) * width,
    y: (1 - (point.value - axis.minValue) / range) * PLOT_HEIGHT,
  }));
}

function formatValue(value: number, unit: string) {
  if (unit === 'score') return `${Math.round(value)}`;
  return `${value.toFixed(1)}`;
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing[3],
  },
  eyebrow: {
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: spacing[1],
  },
  metricValue: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  contextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    marginTop: spacing[3],
    paddingTop: spacing[2],
  },
  timeframeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  axisUnitPill: {
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.semantic.border.default,
    backgroundColor: colors.semantic.surface.selected,
    paddingHorizontal: spacing[3],
    paddingVertical: 5,
  },
  tabs: {
    flexDirection: 'row',
    marginTop: spacing[3],
    padding: 3,
    borderRadius: 18,
    borderWidth: 1,
    gap: 3,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 14,
  },
  tabActive: {
    borderWidth: 1,
  },
  tabText: {
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  chartFrame: {
    height: CHART_HEIGHT,
    marginTop: spacing[3],
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: spacing[3],
    paddingTop: spacing[3],
  },
  chartShell: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  yAxisLabels: {
    width: Y_AXIS_LABEL_WIDTH,
    height: PLOT_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  plotColumn: {
    flex: 1,
  },
  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing[2],
  },
  axisText: {
    color: colors.semantic.text.secondary,
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: spacing[5],
  },
  emptyText: {
    marginTop: spacing[1],
    textAlign: 'center',
    lineHeight: 20,
  },
});
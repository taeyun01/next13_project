import { memo, useMemo } from 'react'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { AxisBottom } from '@visx/axis'
import { colors } from '@/styles/colorPalette'

import { format, parseISO } from 'date-fns'
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import addDelimiter from '@/utils/addDelimiter'

// 월별 데이터
// 날짜: 월별 마지막일자
// 잔고: 월별 마지막일자의 잔고
interface ChartData {
  date: string // x축
  balance: number // y축
}

interface MonthlyChartProps {
  chartData: ChartData[]
  width: number
  height: number
}

const verticalMargin = 120

const getX = (d: ChartData) => d.date
const getY = (d: ChartData) => d.balance
const formatDate = (date: string) => format(parseISO(date), 'M월')

const defaultMargin = { top: 60, right: 0, bottom: 0, left: 0 }

const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'white',
  padding: '8px 12px',
  borderRadius: '4px',
}

const MonthlyChart = ({ chartData, width, height }: MonthlyChartProps) => {
  // bounds
  const xMax = width
  const yMax = height - verticalMargin

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: chartData.map(getX),
        padding: 0.4,
      }),
    [xMax, chartData],
  )
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...chartData.map(getY))],
      }),
    [yMax, chartData],
  )

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<ChartData>()

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  })

  return width < 10 ? null : (
    <div style={{ position: 'relative' }}>
      <svg ref={containerRef} width={width} height={height}>
        <rect width={width} height={height} fill="url(#teal)" rx={14} />
        <Group top={verticalMargin / 2}>
          {chartData.map((d, i) => {
            const date = getX(d)
            const barWidth = xScale.bandwidth()
            const barHeight = yMax - (yScale(getY(d)) ?? 0)
            const barX = xScale(date)
            const barY = yMax - barHeight
            return (
              <rect
                key={`bar-${i}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={colors.black}
                onMouseLeave={() => {
                  hideTooltip()
                }}
                onMouseMove={(event) => {
                  const eventSvgCoords = localPoint(event)
                  showTooltip({
                    tooltipData: d,
                    tooltipTop: eventSvgCoords?.y,
                    tooltipLeft: eventSvgCoords?.x,
                  })
                }}
              />
            )
          })}
        </Group>
        <AxisBottom
          top={yMax + defaultMargin.top}
          scale={xScale}
          tickFormat={formatDate}
          stroke={colors.black}
          tickStroke={colors.black}
          tickLabelProps={{
            fill: colors.black,
            fontSize: 11,
            textAnchor: 'middle',
          }}
        />
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div>
            <strong>{formatDate(tooltipData.date)}</strong>
          </div>
          <div>총 지출: {addDelimiter(tooltipData.balance)}원</div>
        </TooltipInPortal>
      )}
    </div>
  )
}

interface ChartWrapperProps {
  height?: number
  chartData: ChartData[]
}

const ChartWrapper = ({ height = 200, chartData }: ChartWrapperProps) => {
  return (
    <ParentSize>
      {({ width }) => (
        <MonthlyChart width={width} height={height} chartData={chartData} />
      )}
    </ParentSize>
  )
}

export default memo(ChartWrapper)

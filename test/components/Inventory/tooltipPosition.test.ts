import { describe, expect, it } from 'vitest'
import { calculateTooltipPosition } from '../../../src/components/Inventory/tooltipPosition'

describe('calculateTooltipPosition', () => {
  it('places the tooltip below when there is not enough room above', () => {
    const position = calculateTooltipPosition({
      anchorRect: {
        left: 20,
        top: 12,
        width: 56,
        height: 56,
        right: 76,
        bottom: 68,
      },
      tooltipSize: { width: 224, height: 180 },
      viewport: { width: 320, height: 640 },
      offset: 8,
    })

    expect(position.placement).toBe('below')
    expect(position.top).toBe(76)
    expect(position.left).toBe(4)
  })

  it('places the tooltip above when there is not enough room below', () => {
    const position = calculateTooltipPosition({
      anchorRect: {
        left: 120,
        top: 520,
        width: 56,
        height: 56,
        right: 176,
        bottom: 576,
      },
      tooltipSize: { width: 224, height: 180 },
      viewport: { width: 360, height: 640 },
      offset: 8,
    })

    expect(position.placement).toBe('above')
    expect(position.top).toBe(332)
  })

  it('clamps oversized tooltips inside the viewport when neither side fits', () => {
    const position = calculateTooltipPosition({
      anchorRect: {
        left: 110,
        top: 140,
        width: 56,
        height: 56,
        right: 166,
        bottom: 196,
      },
      tooltipSize: { width: 224, height: 420 },
      viewport: { width: 360, height: 480 },
      offset: 8,
    })

    expect(position.placement).toBe('below')
    expect(position.top).toBe(56)
  })

  it('clamps the tooltip horizontally near the right viewport edge', () => {
    const position = calculateTooltipPosition({
      anchorRect: {
        left: 280,
        top: 120,
        width: 56,
        height: 56,
        right: 336,
        bottom: 176,
      },
      tooltipSize: { width: 224, height: 180 },
      viewport: { width: 360, height: 640 },
      offset: 8,
    })

    expect(position.left).toBe(132)
  })
})

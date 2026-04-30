export interface TooltipAnchorRect {
  left: number
  top: number
  width: number
  height: number
  right: number
  bottom: number
}

export interface TooltipSize {
  width: number
  height: number
}

export interface TooltipViewport {
  width: number
  height: number
}

export interface TooltipPosition {
  left: number
  top: number
  placement: 'above' | 'below'
}

const VIEWPORT_PADDING = 4

function clamp(value: number, min: number, max: number): number {
  if (max < min) return min
  return Math.min(Math.max(value, min), max)
}

export function calculateTooltipPosition({
  anchorRect,
  tooltipSize,
  viewport,
  offset,
}: {
  anchorRect: TooltipAnchorRect
  tooltipSize: TooltipSize
  viewport: TooltipViewport
  offset: number
}): TooltipPosition {
  const preferredBelowTop = anchorRect.bottom + offset
  const preferredAboveTop = anchorRect.top - offset - tooltipSize.height
  const spaceAbove = anchorRect.top - offset - VIEWPORT_PADDING
  const spaceBelow = viewport.height - anchorRect.bottom - offset - VIEWPORT_PADDING
  const fitsBelow = spaceBelow >= tooltipSize.height
  const fitsAbove = spaceAbove >= tooltipSize.height

  let placement: 'above' | 'below'
  if (fitsBelow) {
    placement = 'below'
  } else if (fitsAbove) {
    placement = 'above'
  } else {
    placement = spaceBelow >= spaceAbove ? 'below' : 'above'
  }

  const maxLeft = viewport.width - tooltipSize.width - VIEWPORT_PADDING
  const preferredLeft = anchorRect.left + (anchorRect.width / 2) - (tooltipSize.width / 2)
  const left = clamp(preferredLeft, VIEWPORT_PADDING, maxLeft)

  const maxTop = viewport.height - tooltipSize.height - VIEWPORT_PADDING
  const top = clamp(
    placement === 'below' ? preferredBelowTop : preferredAboveTop,
    VIEWPORT_PADDING,
    maxTop,
  )

  return { left, top, placement }
}

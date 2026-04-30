import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CategoryDisclosure } from '../../../src/components/ui/CategoryDisclosure'

describe('CategoryDisclosure', () => {
  it('adds a native tooltip to the disclosure summary', () => {
    render(React.createElement(CategoryDisclosure, { title: 'Known Landmarks' }, 'Body'))

    expect(screen.getByText('Known Landmarks').closest('summary')).toHaveAttribute('title', 'Toggle Known Landmarks')
  })
})

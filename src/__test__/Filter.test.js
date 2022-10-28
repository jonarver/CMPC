import React from 'react'
import {render, screen} from '@testing-library/react'
import {ComboBox} from '../../components/ui/Filter'

describe('when the ComboBox is mounted', () => {
  it('must display the title', () => {
    render(<ComboBox />)
    expect(
      screen.getByRole('heading', {name: /Filter Breeds/i}),
    ).toBeInTheDocument()
  })
})
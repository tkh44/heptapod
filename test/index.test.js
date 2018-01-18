/* eslint-disable no-sparse-arrays */
import React from 'react'
import renderer from 'react-test-renderer'
import { sheet, flush } from 'emotion'

import createResponsiveCss from '../src/index'

const css = createResponsiveCss([
  '@media(min-width: 420px)',
  '@media(min-width: 920px)',
  '@media(min-width: 1120px)',
  '@media(min-width: 11200px)'
])

describe('heptapod', () => {
  afterEach(() => flush())
  test('basic', () => {
    const cls3 = css`
      font-size: 16px;
      background: rgba(45, 213, 47, 0.11);
      color: aquamarine;
    ``
      background-color: hotpink;
    ``
      font-size: 16px;
      background: rgba(0, 0, 0, 0.11);
    `

    const tree = renderer
      .create(<div className={cls3.toString()}>Basic</div>)
      .toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })
})

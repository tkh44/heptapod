import { css as magic } from 'emotion'

export default function createResponsiveCss(breakpoints) {
  const mq = ['&'].concat(breakpoints)

  return function css() {
    const applied = [magic.apply(this, arguments)]

    function dynamicCss() {
      let cls = magic.apply(this, arguments)
      applied.push(cls)
      return dynamicCss
    }

    Object.defineProperty(dynamicCss, 'toString', {
      value() {
        // should return the sum of the styles to this point
        return magic.apply(
          this,
          applied.reduce((accum, cls, i) => {
            accum.push({ [mq[i]]: cls })
            return accum
          }, [])
        )
      }
    })

    return dynamicCss
  }
}

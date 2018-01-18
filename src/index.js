import { css as magic } from 'emotion'

export default function createResponsiveCss(breakpoints) {
  const mq = ['&'].concat(breakpoints)

  // Where do I call this
  function wrapStyles(styles, index) {
    const rule = mq[index]
    return `${rule}{${styles}}`
  }

  // class CSS extends String {
  //   constructor() {
  //     this.stack = []
  //   }
  //
  //   toString() {
  //     return magic.apply(this, this.stack)
  //   }
  // }

  return function css() {
    // console.log(arguments)
    // const className = magic.apply(this, arguments)
    const applied = []

    // Array.prototype.push.apply(applied, arguments)
    applied.push(magic.apply(this, arguments))

    function dynamicCss() {
      // this.className = css.apply(this, arguments)
      let cls = magic.apply(this, arguments)
      console.log(cls)
      applied.push(cls)
      // Array.prototype.push.apply(applied, magic.apply(this, arguments))
      // console.log(applied)
      return dynamicCss
    }

    dynamicCss.toString = function() {
      console.log(applied)
      // should return the sum of the styles to this point
      return magic.apply(
        this,
        applied.reduce((accum, cls, i) => {
          accum.push({ [mq[i]]: cls })
          return accum
        }, [])
      )
    }

    // this should be done via defineProperty i think
    // dynamicCss.$$depth = this && this.depth ? this.depth + 1 : 0

    return dynamicCss
  }
}

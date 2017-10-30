const mathSign = Math.sign || function (x) {
    const val = +x

    if (val === 0 || isNaN(val)) return val
    return val > 0 ? 1 : -1
  }

  const ScrollToAnchor = () => {
    const anchor = window.location.hash && document.querySelector(window.location.hash)
    const offsetY = window.scrollY || window.pageYOffset

    // no scroll to target, stop
    if (!anchor) return

    const elementTop = Math.round(anchor.getBoundingClientRect().top)

    // scrolled to element, stop
    if (elementTop === 0) return

    // hit max scroll boundaries, stop
    const isScrolledToTop = offsetY === 0
    const isScrolledToBottom = offsetY + document.body.clientHeight === document.body.scrollHeight
    const scrollStep = Math.ceil((Math.abs(elementTop / 8))) * mathSign(elementTop)

    if ((isScrolledToBottom && scrollStep > 0) || (isScrolledToTop && scrollStep < 0)) return

    // more scrolling to do!
    window.scrollBy(0, scrollStep)
    window.requestAnimationFrame(ScrollToAnchor)
  }

export default ScrollToAnchor

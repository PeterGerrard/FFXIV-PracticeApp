import { Point } from "@flatten-js/core";

// helper function to get an element's exact position
export function getPosition(e: HTMLElement): Point {
  let el: HTMLElement | null = e;
  let xPosition = 0;
  let yPosition = 0;
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      const xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      const yScrollPos = el.scrollTop || document.documentElement.scrollTop;
      xPosition += el.offsetLeft - xScrollPos + el.clientLeft;
      yPosition += el.offsetTop - yScrollPos + el.clientTop;
    } else {
      xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPosition += el.offsetTop - el.scrollTop + el.clientTop;
    }
    el = el.offsetParent as HTMLElement | null;
  }
  return new Point(xPosition, yPosition);
}

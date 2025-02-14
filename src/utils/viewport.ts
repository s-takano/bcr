
export type Breakpoint = "large" | "medium" | "small" | "tiny";

export const getBreakpoint = (windowWidth: number): Breakpoint => {
  if (windowWidth >= 1024) {
    return "large";
  }
  else if (windowWidth >= 768) {
    return "medium";
  }
  else if (windowWidth >= 640) {
    return "small";
  }
  else {
    return "tiny";
  }
}

export const isElementInViewport = (window: Window, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  }

  
export const rem = (x: number) => 4 * x;
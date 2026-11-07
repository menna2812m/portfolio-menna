// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import { TypeWriter } from "./TypeWriter";

function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduce && query.includes("reduce"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("TypeWriter", () => {
  it("shows the full text immediately when reduced motion is preferred", () => {
    mockReducedMotion(true);
    const { getByTestId } = render(<TypeWriter text="npm run hire-me" />);
    expect(getByTestId("typewriter-visible").textContent).toBe("npm run hire-me");
  });

  it("exposes the full text to assistive tech from the first render", () => {
    mockReducedMotion(false);
    vi.useFakeTimers();
    const { getByTestId } = render(<TypeWriter text="npm run hire-me" />);
    expect(getByTestId("typewriter-full").textContent).toBe("npm run hire-me");
    expect(getByTestId("typewriter-visible").textContent).not.toBe("npm run hire-me");
  });

  it("finishes typing the full text", () => {
    mockReducedMotion(false);
    vi.useFakeTimers();
    const { getByTestId } = render(<TypeWriter text="hire-me" speedMs={10} />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(getByTestId("typewriter-visible").textContent).toBe("hire-me");
  });
});

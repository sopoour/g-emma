import { css } from 'styled-components';

export const Breakpoints = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1501,
} as const;

export const getMedia =
  (breakpoint: keyof typeof Breakpoints) =>
  (literals: TemplateStringsArray, ...placeholders: any[]) => css`
    @media (min-width: ${Breakpoints[breakpoint]}px) {
      ${css(literals, ...placeholders)}
    }
  `;

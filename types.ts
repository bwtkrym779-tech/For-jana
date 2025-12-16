export interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  color: string;
}

export enum GeneratorStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface LoveLetterState {
  status: GeneratorStatus;
  content: string;
}

export interface ThemeConfig {
  id: string;
  label: string;
  bgBase: string;
  bgGradient: string;
  marqueeText: string; // The base color class for marquee
  primaryText: string;
  secondaryText: string;
  accentText: string;
  buttonBorder: string;
  buttonBgSlide: string;
  buttonTextInitial: string;
  heartColors: string[];
  selection: string;
  swatchColor: string;
  modalAccent: string; // Color for modal buttons/highlights
}
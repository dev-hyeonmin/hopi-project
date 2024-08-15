export type GENDER = (typeof GENDER)[keyof typeof GENDER];
export type GENDER_KEY = keyof typeof GENDER;
export type NATION = (typeof NATION)[keyof typeof NATION];
export type NATION_KEY = keyof typeof NATION;

export const GENDER = {
  1: '여',
  2: '남'
} as const;

export const NATION = {
  KOR: '한국인',
  ENG: '외국인',
  ETC: '외국인'
} as const;

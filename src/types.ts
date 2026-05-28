/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ScoreItem {
  name: string;
  label: string;
  t0: number;
  t1: number;
  t2: number;
  t3: number;
  description: string;
}

export interface BuyerPersona {
  id: string;
  name: string;
  age: number;
  tags: string[];
  situation: string;
  instroom: string;
  belemmeringen: string[];
  relevanteDomeinen: string[];
  ontwerpBelang: string;
  avatarSeed: string;
  scores: ScoreItem[];
}

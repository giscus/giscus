#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { argv } from 'process';

const COLOR_REGEX = /--color[a-z0-9-]+/g;
const DEFINING_COLOR_REGEX = /^(--color[a-z0-9-]+):/;

const ref = argv[2];
const purge = argv[3];

const reference = readFileSync(ref).toString();
const file = readFileSync(purge).toString();

function matchAll(string, regex) {
  return [...string.matchAll(regex)].map(([match]) => match);
}

const usedColors = new Set(matchAll(reference, COLOR_REGEX));

const fileByLines = file.split('\n');

fileByLines.forEach((l) => {
  const line = l.trim();

  const definedColor = line.match(DEFINING_COLOR_REGEX);
  if (!definedColor) return;

  const colorName = definedColor[1];
  if (!usedColors.has(colorName)) return;

  const newColors = matchAll(line, COLOR_REGEX);
  newColors.forEach((color) => usedColors.add(color));
});

const newFile = fileByLines
  .map((l) => {
    const line = l.trim();
    const definedColor = line.match(DEFINING_COLOR_REGEX);

    if (!definedColor || usedColors.has(definedColor[1])) return l;

    return null;
  })
  .filter((l) => l !== null);

const newFileString = newFile.join('\n');
writeFileSync(purge, newFileString);

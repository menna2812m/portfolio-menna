/**
 * Precomputes the dotted-earth points for the v2 hero globe.
 * Samples a Fibonacci sphere and keeps points that fall on land (Natural Earth 110m via world-atlas).
 * Output: src/components/v2/land-points.json as a flat [lat, lon, lat, lon, ...] array (1 decimal).
 * Run: npx tsx scripts/build-land-points.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

const topo = JSON.parse(readFileSync("node_modules/world-atlas/land-110m.json", "utf8")) as Topology;
const land = feature(topo, topo.objects.land as GeometryCollection);

const SAMPLES = 16000;
const golden = Math.PI * (3 - Math.sqrt(5));
const out: number[] = [];
for (let i = 0; i < SAMPLES; i++) {
  const y = 1 - (i / (SAMPLES - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const theta = golden * i;
  const lat = (Math.asin(y) * 180) / Math.PI;
  const lon = ((((Math.atan2(Math.sin(theta) * r, Math.cos(theta) * r) * 180) / Math.PI) + 540) % 360) - 180;
  if (lat < -60) continue; // skip Antarctica
  if (geoContains(land, [lon, lat])) out.push(Math.round(lat * 10) / 10, Math.round(lon * 10) / 10);
}
writeFileSync("src/components/v2/land-points.json", JSON.stringify(out));
console.log(`${out.length / 2} land points`);

export function hexToHsl(hexValue: string) {
  const trimmed = hexValue.trim();
  const withoutHash = trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;
  if (!/^[0-9a-fA-F]{3}$/.test(withoutHash) && !/^[0-9a-fA-F]{6}$/.test(withoutHash)) {
    return {
      accent: "222 89% 63%",
      foreground: "0 0% 100%",
    };
  }

  const expanded = withoutHash.length === 3 ? withoutHash.split("").map((char) => char + char).join("") : withoutHash;
  const r = Number.parseInt(expanded.substring(0, 2), 16) / 255;
  const g = Number.parseInt(expanded.substring(2, 4), 16) / 255;
  const b = Number.parseInt(expanded.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  const accent = `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  const foreground = l > 0.6 ? "240 10% 3.9%" : "0 0% 100%";

  return { accent, foreground };
}

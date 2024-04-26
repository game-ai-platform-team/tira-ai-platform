import { Chessboard } from "kokopu-react";

/**
 * Update css constants to the given color theme
 * @param name Name of the theme
 */
export function updateTheme(name: string): void {
    const root = document.documentElement;
    const colorsets = Chessboard.colorsets();

    root.style.setProperty("--primary", colorsets[name].b);
    root.style.setProperty("--secondary", colorsets[name].w);
    root.style.setProperty("--blue-marker", colorsets[name].cb);
    root.style.setProperty("--green-marker", colorsets[name].cg);
    root.style.setProperty("--red-marker", colorsets[name].cr);
    root.style.setProperty("--yellow-marker", colorsets[name].cy);
}

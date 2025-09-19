import React from "react";
import PropTypes from "prop-types";
import "./Skeleton.scss";

/**
 * Skeleton.jsx
 *
 * A flexible skeleton / shimmer loader component (JSX + SCSS).
 *
 * Props:
 * - variant: "text" | "rect" | "circle" (default "rect")
 * - width, height: number (px) or string (e.g. "50%", "2rem")
 * - size: shorthand for width & height
 * - count: number of lines for text variant
 * - lineWidths: array of widths (number or string) for each line
 * - lineGap: gap between text lines (number => px or string)
 * - borderRadius: number or string
 * - shimmer: boolean (default true)
 * - animationDuration: string like "1.2s"
 * - inline: boolean (render inline-block)
 * - className, style, ...rest (other div props)
 */

const dim = (v) => {
  if (v === undefined || v === null) return undefined;
  return typeof v === "number" ? `${v}px` : v;
};

function Skeleton({
  variant = "rect",
  width,
  height,
  size,
  count = 1,
  lineWidths,
  lineGap = 8,
  borderRadius,
  shimmer = true,
  animationDuration = "1.2s",
  inline = false,
  className = "",
  style = {},
  ...rest
}) {
  const resolvedWidth = dim(size ?? width);
  const resolvedHeight = dim(size ?? height);

  const baseStyle = {
    width: resolvedWidth,
    height: resolvedHeight,
    borderRadius: borderRadius !== undefined ? dim(borderRadius) : undefined,
    display: inline ? "inline-block" : "block",
    // CSS variable for SCSS to read animation duration
    ["--skeleton-duration"]: animationDuration,
    ...style,
  };

  if (variant === "text") {
    const n = Math.max(1, Math.floor(count));
    const gap = typeof lineGap === "number" ? `${lineGap}px` : lineGap;

    const lines = new Array(n).fill(0).map((_, i) => {
      const lw = lineWidths && lineWidths[i] !== undefined ? dim(lineWidths[i]) : undefined;
      const defaultWidth = lw ?? (i === n - 1 && !lineWidths ? "60%" : "100%");

      const lineStyle = {
        width: defaultWidth,
        height: resolvedHeight ?? "12px",
        marginBottom: i === n - 1 ? 0 : gap,
        borderRadius: borderRadius !== undefined ? dim(borderRadius) : "4px",
      };

      return (
        <div
          key={i}
          className={`skeleton skeleton--text-line ${shimmer ? "skeleton--shimmer" : ""}`}
          style={lineStyle}
          aria-hidden="true"
        />
      );
    });

    return (
      <div
        className={`skeleton__group ${className}`}
        role="status"
        aria-busy="true"
        aria-label="Loading content"
        {...rest}
      >
        {lines}
      </div>
    );
  }

  if (variant === "circle") {
    const s = resolvedWidth || resolvedHeight || dim(40);
    const circleStyle = {
      width: s,
      height: s,
      borderRadius: "50%",
      ...baseStyle,
    };
    // ensure width/height use the circle size not undefined overrides
    delete circleStyle.width; // we'll set explicitly below
    delete circleStyle.height;
    const merged = {
      width: s,
      height: s,
      borderRadius: "50%",
      ["--skeleton-duration"]: animationDuration,
      ...style,
      display: inline ? "inline-block" : "block",
    };

    return (
      <div
        className={`skeleton skeleton--circle ${shimmer ? "skeleton--shimmer" : ""} ${className}`}
        role="status"
        aria-busy="true"
        style={merged}
        {...rest}
      />
    );
  }

  // rect (default)
  return (
    <div
      className={`skeleton skeleton--rect ${shimmer ? "skeleton--shimmer" : ""} ${className}`}
      role="status"
      aria-busy="true"
      style={baseStyle}
      {...rest}
    />
  );
}

Skeleton.propTypes = {
  variant: PropTypes.oneOf(["text", "rect", "circle"]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  count: PropTypes.number,
  lineWidths: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  lineGap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shimmer: PropTypes.bool,
  animationDuration: PropTypes.string,
  inline: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Skeleton;
"use client";

/* WebGL 셰이더 배경 — aurora-veil.
 *
 * 부드러운 대기(帶氣) 색면이 느리게 흐르는 배경. CSS 그라데이션 애니메이션보다
 * 훨씬 유기적이고, 드로우콜 1회 + 에셋 0 + 화면 밖에선 자동 일시정지.
 * 색은 성은교회 팔레트(스카이 블루 + 황금)의 라이트 톤으로 조정했다.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type WebsiteShaderId = "aurora-veil";

export interface WebsiteShaderPreset {
  id: WebsiteShaderId;
  title: string;
  accent: string;
  interactive?: boolean;
  preview: {
    dark: string;
    light: string;
  };
  fragment: string;
}

export interface WebsiteShaderCanvasProps {
  preset?: WebsiteShaderId | string | WebsiteShaderPreset;
  className?: string;
  tone?: "dark" | "light";
  intensity?: number;
  animate?: boolean;
  maxPixelRatio?: number;
  maxCanvasPixels?: number;
  children?: ReactNode;
}

const vertexShaderSource = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentHeader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform vec4 u_trails[8];
uniform float u_intensity;
uniform float u_isLight;

float saturate(float value) {
  return clamp(value, 0.0, 1.0);
}

mat2 rotate2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p = rotate2d(0.72) * p * 2.03 + 4.17;
    amplitude *= 0.5;
  }
  return value;
}
`;

const fragmentFooter = `
void main() {
  vec2 uv = gl_FragCoord.xy / max(u_resolution.xy, vec2(1.0));
  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / max(min(u_resolution.x, u_resolution.y), 1.0);
  vec2 pointer = u_pointer * 2.0 - 1.0;
  pointer.x *= u_resolution.x / max(u_resolution.y, 1.0);

  vec3 color = shaderColor(uv, p, u_time, pointer, u_intensity, u_isLight);
  color = pow(max(color, vec3(0.0)), vec3(0.92));

  gl_FragColor = vec4(color, 1.0);
}
`;

export const websiteShaderPresets: WebsiteShaderPreset[] = [
  {
    id: "aurora-veil",
    title: "Aurora veil",
    accent: "#6ca8ef",
    interactive: false,
    preview: {
      /* WebGL 실패/로딩 중 폴백 — 셰이더와 같은 무드의 정적 그라데이션 */
      dark: "radial-gradient(circle at 30% 24%, rgba(96,156,245,0.4), transparent 32%), radial-gradient(circle at 80% 72%, rgba(222,178,92,0.25), transparent 34%), linear-gradient(140deg, #0a1128, #101830 55%, #0a0f22)",
      light:
        "radial-gradient(circle at 34% 22%, rgba(96,156,245,0.28), transparent 32%), radial-gradient(circle at 76% 70%, rgba(224,182,100,0.2), transparent 34%), linear-gradient(180deg, #dcebfa, #f2f7fd 60%, #fafcfe)",
    },
    /* 하늘 위쪽은 옅은 블루, 그 사이로 황금빛 베일이 스며드는 라이트 톤.
       veilA = 스카이 블루, veilB = 골드. 움직임은 원본 셰이더 그대로. */
    fragment: `
vec3 shaderColor(vec2 uv, vec2 p, float t, vec2 pointer, float intensity, float isLight) {
  vec2 q = p;
  q.x += sin(q.y * 2.0 + t * 0.18) * 0.22;
  q.y += cos(q.x * 1.7 - t * 0.14) * 0.16;

  /* 넓은 진폭의 베일 두 장이 화면 전체를 쓸고 지나가며 서로 겹친다 —
     위/아래 분리 배치는 경계가 보여서 폐기 (사용자 피드백) */
  float veilA = smoothstep(1.15, 0.0, abs(q.y + sin(q.x * 1.4 + t * 0.2) * 0.55));
  float veilB = smoothstep(1.05, 0.0, abs(q.y * 0.7 - cos(q.x * 1.9 - t * 0.16) * 0.62));
  float grain = fbm(q * 2.5 + t * 0.04);

  vec3 base = mix(vec3(0.045, 0.06, 0.14), vec3(0.955, 0.968, 0.99), isLight);
  /* 파스텔 톤 — 채도를 낮춰 은은하게 */
  vec3 sky = mix(vec3(0.26, 0.5, 0.95), vec3(0.66, 0.78, 0.96), isLight);
  vec3 gold = mix(vec3(0.95, 0.72, 0.3), vec3(0.97, 0.89, 0.74), isLight);

  vec3 color = base;
  color = mix(color, sky, veilA * mix(0.5, 0.42, isLight));
  color = mix(color, gold, veilB * mix(0.3, 0.38, isLight));
  color += (grain - 0.5) * 0.022;
  return color * (0.9 + intensity * 0.14);
}
`,
  },
];

export function getWebsiteShaderPreset(
  value: WebsiteShaderId | string | undefined,
) {
  if (!value) return undefined;

  const normalized = value.replace(/^shader-/, "");
  return websiteShaderPresets.find((preset) => preset.id === normalized);
}

export function WebsiteShaderCanvas({
  preset,
  className,
  tone = "light",
  intensity = 1,
  animate = true,
  maxPixelRatio = 1.35,
  maxCanvasPixels = 620_000,
  children,
}: WebsiteShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const trailRef = useRef<{ x: number; y: number; createdAt: number }[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const [contextEpoch, setContextEpoch] = useState(0);
  const [failed, setFailed] = useState(false);
  const activePreset = useMemo(() => resolveShaderPreset(preset), [preset]);

  const shouldAnimate = animate && !shouldReduceMotion;
  const isInteractive = activePreset.interactive !== false;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasElement = canvas;

    let disposed = false;
    let visible = true;
    let frame = 0;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setFailed(true);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const handleContextRestored = () => {
      setFailed(false);
      setContextEpoch((value) => value + 1);
    };

    canvasElement.addEventListener("webglcontextlost", handleContextLost);
    canvasElement.addEventListener(
      "webglcontextrestored",
      handleContextRestored,
    );

    try {
      gl = canvasElement.getContext("webgl", {
        alpha: true,
        antialias: false,
        depth: false,
        desynchronized: true,
        failIfMajorPerformanceCaveat: false,
        powerPreference: "low-power",
        preserveDrawingBuffer: false,
        stencil: false,
      } as WebGLContextAttributes);

      if (!gl) {
        setFailed(true);
        return cleanup;
      }

      program = createProgram(
        gl,
        vertexShaderSource,
        createFragmentSource(activePreset.fragment),
      );
      buffer = gl.createBuffer();

      if (!program || !buffer) {
        setFailed(true);
        return cleanup;
      }

      const positionLocation = gl.getAttribLocation(program, "a_position");
      const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
      const timeLocation = gl.getUniformLocation(program, "u_time");
      const pointerLocation = gl.getUniformLocation(program, "u_pointer");
      const trailLocation = gl.getUniformLocation(program, "u_trails[0]");
      const intensityLocation = gl.getUniformLocation(program, "u_intensity");
      const isLightLocation = gl.getUniformLocation(program, "u_isLight");
      const trailUniform = new Float32Array(32);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      setFailed(false);

      const resize = () => {
        if (!gl) return;

        const rect = canvasElement.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
        let width = Math.max(1, Math.floor(rect.width * ratio));
        let height = Math.max(1, Math.floor(rect.height * ratio));
        const pixelCount = width * height;

        if (pixelCount > maxCanvasPixels) {
          const scale = Math.sqrt(maxCanvasPixels / pixelCount);
          width = Math.max(1, Math.floor(width * scale));
          height = Math.max(1, Math.floor(height * scale));
        }

        if (canvasElement.width !== width || canvasElement.height !== height) {
          canvasElement.width = width;
          canvasElement.height = height;
        }

        gl.viewport(0, 0, width, height);
      };

      const render = (now: number) => {
        if (!gl || !program || disposed) return;

        resize();
        const nowSeconds = now * 0.001;
        const time = shouldAnimate ? nowSeconds : 18.0;
        const pointerValue = isInteractive
          ? pointerRef.current
          : { x: 0.5, y: 0.5 };
        const liveTrails = isInteractive
          ? trailRef.current.filter(
              (trail) => nowSeconds - trail.createdAt < 1.1,
            )
          : [];
        trailRef.current = liveTrails;
        trailUniform.fill(0);

        liveTrails.slice(0, 8).forEach((trail, index) => {
          const offset = index * 4;
          const strength = saturateNumber(
            1 - (nowSeconds - trail.createdAt) / 1.1,
          );

          trailUniform[offset] = trail.x;
          trailUniform[offset + 1] = trail.y;
          trailUniform[offset + 2] = strength;
          trailUniform[offset + 3] = index / 7;
        });

        gl.useProgram(program);
        gl.uniform2f(
          resolutionLocation,
          canvasElement.width,
          canvasElement.height,
        );
        gl.uniform1f(timeLocation, time);
        gl.uniform2f(pointerLocation, pointerValue.x, pointerValue.y);
        if (trailLocation) gl.uniform4fv(trailLocation, trailUniform);
        gl.uniform1f(intensityLocation, intensity);
        gl.uniform1f(isLightLocation, tone === "light" ? 1 : 0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const tick = (now: number) => {
        if (disposed || !visible) {
          frame = 0;
          return;
        }

        render(now);
        frame = requestAnimationFrame(tick);
      };

      const start = () => {
        if (frame || disposed) return;
        frame = requestAnimationFrame(tick);
      };

      resizeObserver = new ResizeObserver(() => render(performance.now()));
      resizeObserver.observe(canvasElement);

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          visible = Boolean(entry?.isIntersecting);

          if (visible && shouldAnimate) {
            start();
            return;
          }

          if (frame) {
            cancelAnimationFrame(frame);
            frame = 0;
          }

          if (visible) render(performance.now());
        },
        { threshold: 0.01 },
      );
      intersectionObserver.observe(canvasElement);

      render(performance.now());
      if (shouldAnimate) start();
    } catch {
      setFailed(true);
    }

    return cleanup;

    function cleanup() {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      canvasElement.removeEventListener("webglcontextlost", handleContextLost);
      canvasElement.removeEventListener(
        "webglcontextrestored",
        handleContextRestored,
      );

      if (gl) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
      }
    }
  }, [
    activePreset.fragment,
    contextEpoch,
    intensity,
    isInteractive,
    maxCanvasPixels,
    maxPixelRatio,
    shouldAnimate,
    tone,
  ]);

  const updatePointer = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const nextPointer = {
        x: saturateNumber(
          (event.clientX - rect.left) / Math.max(rect.width, 1),
        ),
        y:
          1 -
          saturateNumber((event.clientY - rect.top) / Math.max(rect.height, 1)),
      };
      const now = performance.now() * 0.001;
      const lastTrail = trailRef.current[0];

      pointerRef.current = nextPointer;

      if (
        !lastTrail ||
        Math.hypot(nextPointer.x - lastTrail.x, nextPointer.y - lastTrail.y) >
          0.018 ||
        now - lastTrail.createdAt > 0.045
      ) {
        trailRef.current = [
          { ...nextPointer, createdAt: now },
          ...trailRef.current,
        ].slice(0, 8);
      }
    },
    [],
  );

  const fallback =
    tone === "light" ? activePreset.preview.light : activePreset.preview.dark;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: fallback }}
      onPointerMove={isInteractive ? updatePointer : undefined}
      onPointerLeave={
        isInteractive
          ? () => {
              pointerRef.current = { x: 0.5, y: 0.5 };
            }
          : undefined
      }
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full touch-none transition-opacity duration-300",
          failed ? "opacity-0" : "opacity-100",
        )}
      />
      {children ? (
        <div className="relative z-10 h-full w-full">{children}</div>
      ) : null}
    </div>
  );
}

function resolveShaderPreset(
  preset: WebsiteShaderId | string | WebsiteShaderPreset | undefined,
) {
  if (typeof preset === "object" && preset) return preset;
  return getWebsiteShaderPreset(preset) ?? websiteShaderPresets[0];
}

function createFragmentSource(fragmentBody: string) {
  return `${fragmentHeader}
${fragmentBody}
${fragmentFooter}`;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function saturateNumber(value: number) {
  return Math.min(1, Math.max(0, value));
}

export default WebsiteShaderCanvas;

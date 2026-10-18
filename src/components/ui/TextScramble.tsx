"use client";
import {
  type ElementType,
  type JSX,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = "p",
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = useMemo(
    () => motion.create(Component as keyof JSX.IntrinsicElements),
    [Component],
  );
  const [displayText, setDisplayText] = useState(children);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!trigger || reducedMotion) return;
    const steps = Math.max(1, duration / Math.max(speed, 0.01));
    let step = 0;
    const interval = setInterval(
      () => {
        const progress = step / steps;
        setDisplayText(
          [...children]
            .map((char, index) =>
              char === " " || progress * children.length > index
                ? char
                : characterSet[Math.floor(Math.random() * characterSet.length)],
            )
            .join(""),
        );
        if (++step > steps) {
          clearInterval(interval);
          setDisplayText(children);
          onScrambleComplete?.();
        }
      },
      Math.max(speed, 0.01) * 1000,
    );
    return () => clearInterval(interval);
  }, [
    trigger,
    children,
    duration,
    speed,
    characterSet,
    reducedMotion,
    onScrambleComplete,
  ]);
  return (
    <MotionComponent className={className} {...props}>
      {reducedMotion ? children : displayText}
    </MotionComponent>
  );
}

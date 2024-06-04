import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getModelAudioUrl(id: number) {
  switch (id) {
    case 533:
      return '/assets/models/joanna.mp3';
    case 590:
      return '/assets/models/lora.mp3';
    case 577:
      return '/assets/models/mario.mp3';
    case 566:
      return '/assets/models/denis.wav';
    default:
      return "https://revocalize.s3.us-east-2.amazonaws.com/output/1112345/30_05_2023_11_00_07_None.wav";
  }
}

export function formatTime(seconds: number): string {
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;

  const formattedMinutes: string = String(minutes).padStart(2, '0');
  const formattedSeconds: string = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}


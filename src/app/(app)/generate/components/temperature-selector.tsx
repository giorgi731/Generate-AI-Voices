'use client';

import * as React from 'react';
import { SliderProps } from '@radix-ui/react-slider';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '~/components/ui/hover-card';
import { Label } from '~/components/ui/label';
import { Slider } from '~/components/ui/slider';

interface TemperatureSelectorProps {
  defaultValue: SliderProps['defaultValue'];
  onValueChange: (value: number) => void;
  clear: boolean;
}

export function TemperatureSelector({
  defaultValue,
  onValueChange,
  clear,
}: TemperatureSelectorProps) {
  const [value, setValue] = React.useState<any>(defaultValue);

  React.useEffect(() => {
    setValue([0]);
  }, [clear]);

  return (
    <div className="pt-2 grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="transpose">Transpose</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="transpose"
              max={12}
              min={-12}
              step={1}
              value={value}
              onValueChange={(value) => {
                console.log(value);
                setValue(value);
                // @ts-ignore:next-line
                onValueChange(value);
              }}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Transpose"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Transpose the generated voice by the given number of semitones.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

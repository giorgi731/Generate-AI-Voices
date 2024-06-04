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

interface MaxLengthSelectorProps {
  defaultValue: SliderProps['defaultValue'];
  onValueChange: (value: number) => void;
  clear: boolean;
}

export function MaxLengthSelector({
  defaultValue,
  onValueChange,
  clear,
}: MaxLengthSelectorProps) {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    setValue(defaultValue);
  }, [clear]);

  return (
    <div className="pt-2 grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maxlength">No. of generations</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="maxlength"
              max={5}
              min={1}
              defaultValue={value}
              step={1}
              value={value}
              onValueChange={(value) => {
                setValue(value);
                // @ts-ignore:next-line
                onValueChange(value);
              }}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="No. of generations"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The number of audio generations to perform. Each generation is unique
          in its own way. The more generations, the more vocal comping options
          you get.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

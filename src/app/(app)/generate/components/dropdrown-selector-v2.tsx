'use client';

import * as React from 'react';

import { cn } from '~/lib/utils';
import { useMutationObserver } from '~/core/hooks/use-mutation-observer';
import { Button } from '~/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '~/components/ui/hover-card';
import { Label } from '~/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';

interface DropdownSelectorProps {
  label: string;
  options: any[];
  optionGroups?: any[];
  onValueChange: (option: any) => void;
  hideHoverCard?: boolean;
  clear?: boolean;
  className?: string;
  selectedValue?: any;
  disabled?: boolean;
}

export function DropdownSelector({
  label,
  options,
  clear,
  optionGroups,
  onValueChange,
  hideHoverCard,
  className, // Destructured className prop
  selectedValue,
  disabled
}: DropdownSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<any>(options[0]);
  const [peekedOption, setPeekedOption] = React.useState<any>(options[0]);

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setOpen(false);
    onValueChange(option);
  };

  React.useEffect(() => {
    setSelectedOption(options[0]);
    setPeekedOption(options[0]);
  }, [clear]);

  React.useEffect(() => {
    if (selectedValue) {
      setSelectedOption(selectedValue);
    }
  }, [selectedValue]);

  return (
    <div className={`grid gap-2 ${className}`}>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="option" className="mt-3 mb-1">
            {label}
          </Label>
        </HoverCardTrigger>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={`Select ${label}`}
            className="justify-between w-full p-px border-0 ring-0"
            disabled={disabled}
          >
            <div className="back flex h-full w-full flex-row items-center justify-between rounded-lg py-5 px-[16px] bg-[#272035] hover:bg-[#322c40] transition-colors duration-200 ring-0 border-0">
              {selectedOption ? selectedOption.name : `Select ${label}...`}
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <HoverCard>
            {!hideHoverCard && (
              <HoverCardContent
                side="left"
                align="start"
                forceMount
                className="hidden min-h-[280px] md:block"
              >
                <div className="grid gap-2">
                  <h4 className="font-medium leading-none">
                    {peekedOption.name}
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    {peekedOption.description}
                  </div>
                </div>
              </HoverCardContent>
            )}
            <Command loop className="w-full mx-auto">
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder={`Search ${label}s...`} />
                <CommandEmpty>No options found.</CommandEmpty>
                <HoverCardTrigger />
                {optionGroups
                  ? optionGroups.map((group: any, index: number) => (
                      <CommandGroup key={index} heading={group.heading}>
                        {options
                          .filter((option: any) => group.filter(option))
                          .map((option: any) => (
                            <OptionItem
                              key={option.id}
                              option={option}
                              isSelected={selectedOption?.id === option.id}
                              onPeek={(option: any) => {
                                setPeekedOption(option);
                              }}
                              onSelect={() => handleOptionSelect(option)}
                            />
                          ))}
                      </CommandGroup>
                    ))
                  : options.map((option: any) => (
                      <OptionItem
                        key={option.id}
                        option={option}
                        isSelected={selectedOption?.id === option.id}
                        onPeek={(option: any) => {
                          setPeekedOption(option);
                        }}
                        onSelect={() => handleOptionSelect(option)}
                      />
                    ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface OptionItemProps {
  option: any;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (option: any) => void;
}

function OptionItem({ option, isSelected, onSelect, onPeek }: OptionItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'aria-selected') {
          onPeek(option);
        }
      }
    }
  });

  return (
    <CommandItem
      key={option.id}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {option.name}
      <Check
        className={cn(
          'ml-auto h-4 w-4',
          isSelected ? 'opacity-100' : 'opacity-0'
        )}
      />
    </CommandItem>
  );
}


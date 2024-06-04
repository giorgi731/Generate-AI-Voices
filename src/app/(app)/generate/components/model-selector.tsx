'use client';

import * as React from 'react';
import { PopoverProps } from '@radix-ui/react-popover';
import { Check, ChevronsUpDown } from 'lucide-react';

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

import { Model, ModelType, types } from '../data/models';

interface ModelSelectorProps extends PopoverProps {
  types: readonly ModelType[];
  models: Model[] | any;
  onValueChange: (model: Model) => void;
  clear: boolean;
  model: any;
  hideLabel?: boolean;
  expandBelow?: boolean;
}

export function ModelSelector({
  models,
  model,
  onValueChange,
  clear,
  className,
  hideLabel = false,
  expandBelow = false,
  ...props
}: ModelSelectorProps & { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState<Model | null>(
    models?.[0]
  );
  const [peekedModel, setPeekedModel] = React.useState<Model>(models?.[0]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredModels, setFilteredModels] = React.useState<any>([]);

  const handleSearchInputChange = (event: any) => {
    setSearchQuery(event);
  };

  React.useEffect(() => {
    const filtered = models?.filter((model: any) =>
      model?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredModels(filtered);
  }, [searchQuery, models]);

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    setOpen(false);
    onValueChange(model);
  };

  React.useEffect(() => {
    setSelectedModel(null);
  }, [clear]);

  React.useEffect(() => {
    setSelectedModel(model);
  }, [model]);

  return (
    <div className={`grid gap-2 ${className}`}>
      {!hideLabel && (
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Label htmlFor="model">Voice Model</Label>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-[260px] text-sm"
            side={expandBelow ? "bottom" : "left"}
          >
            The model which will generate the completion. Some models are suitable
            for natural language tasks, others specialize in code. Learn more.
          </HoverCardContent>
        </HoverCard>
      )}
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="justify-between w-full p-px bg-gradient-radial"
          >
            <div className="back flex h-full w-full flex-row items-center justify-between rounded-sm bg-[#160E24] px-[14px]">
              <div className="overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[180px]">
                {selectedModel ? selectedModel.name : 'Select a model...'}
              </div>
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <HoverCard>
            <HoverCardContent
              side="left"
              align="start"
              forceMount
              className="hidden min-h-[280px] md:block"
            >
              <div className="grid gap-2">
                <h4 className="font-medium leading-none">
                  {peekedModel?.name}
                </h4>
                <div className="text-sm text-muted-foreground">
                  {peekedModel?.description}
                </div>
              </div>
            </HoverCardContent>
            <Command loop className="w-full mx-auto">
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput
                  placeholder="Search Models..."
                  value={searchQuery}
                  onValueChange={handleSearchInputChange}
                />
                {filteredModels?.length === 0 && (
                  <CommandEmpty>No Models found.</CommandEmpty>
                )}
                <HoverCardTrigger />
                {types?.map((type) => (
                  <CommandGroup key={type} heading={type}>
                    {models
                      ?.filter((model: any) => model.gender === type)
                      ?.map((model: any) => (
                        <ModelItem
                          key={model.id}
                          model={model}
                          isSelected={selectedModel?.id === model.id}
                          onPeek={(model) => {
                            setPeekedModel(model);
                          }}
                          onSelect={() => handleModelSelect(model)}
                        />
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface ModelItemProps {
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (model: Model) => void;
}

function ModelItem({ model, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'aria-selected') {
          onPeek(model);
        }
      }
    }
  });

  return (
    <CommandItem
      key={model.id}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {model.name}
      {isSelected && (
        <Check
          className={cn(
            'ml-auto h-4 w-4',
            isSelected ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
    </CommandItem>
  );
}


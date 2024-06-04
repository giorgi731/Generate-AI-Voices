import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import classNames from 'classnames';
import { ChevronDownIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import selectIcon from '~/../public/images/selectIcon.svg';
import profilePicture from '~/../public/images/profilePic.png';
import Image from 'next/image';
import ProfileAvatar from '~/components/ProfileAvatar';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={classNames(
      `flex h-10 w-full items-center justify-between
        rounded-md py-1.5 ring-offset-1 transition-all
        duration-300 placeholder:text-gray-400 hover:bg-gray-50
          disabled:cursor-not-allowed
        disabled:opacity-50 dark:border-black-200 dark:bg-black-400
        dark:ring-primary-500/70 dark:hover:border-black-100 dark:hover:bg-black-300 dark:focus:ring-offset-black-400`,
      className
    )}
    {...props}
  >
    {props.asChild ? (
      children
    ) : (
      <div className="flex w-full items-center justify-between rounded-lg p-[12px] dark:bg-primary-300/10">
        <ProfileAvatar text={props.value?.toString()} />
        <div className="inline-block w-full ml-2 text-left">
          {children}
        </div>{' '}
        <div className="flex h-[22px] w-[22px] justify-center bg-[rgba(43,_32,_65,_1)]">
          {' '}
          <Image src={selectIcon} alt="select icon" />
        </div>
      </div>
    )}
  </SelectPrimitive.Trigger>
));

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, sideOffset = 4, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={classNames(
        `animate-in fade-in-250 relative z-50 w-[247px] overflow-hidden border border-transparent
          border-t-gray-50 bg-white shadow-xl dark:border-black-200 dark:bg-[#2B2041] dark:shadow-[0_0_40px_0] dark:shadow-primary-600/10 lg:rounded-md`,
        className
      )}
      sideOffset={sideOffset}
      {...props}
    >
      <SelectPrimitive.Viewport className={'flex flex-col space-y-0.5 p-1'}>
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={classNames(
      'py-1.5 pl-2 pr-2 text-xs font-medium text-gray-400 dark:text-gray-400',
      className
    )}
    {...props}
  />
));

SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItemClassName = `
  relative flex select-none items-center rounded-md hover:bg-primary-50 dark:hover:bg-black-200
  h-11 lg:h-8text-sm font-medium outline-none focus:bg-primary-50 my-0.5
  text-white/75
  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [data-state="checked"]:bg-primary-50
  [data-state="checked"]:dark:bg-fe-200 dark:focus:text-white/95 dark:focus:bg-transparent cursor-pointer data-[selected]:cursor-default
  transition-colors`;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref): any => (
  <SelectPrimitive.Item
    ref={ref}
    className={classNames(SelectItemClassName, className)}
    {...props}
  >
    <SelectPrimitive.ItemText>
      <div className="flex w-[200px] flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <ProfileAvatar text={props.textValue} />
          <p className="ml-[8px]">{children}</p>
        </div>
        <SelectPrimitive.ItemIndicator>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_820_9771)">
                <path
                  d="M15.6282 2.61482C15.1332 2.11912 14.3293 2.11943 13.8336 2.61482L5.75659 10.6922L2.1667 7.1023C1.671 6.6066 0.867479 6.6066 0.371777 7.1023C-0.123926 7.598 -0.123926 8.40152 0.371777 8.89723L4.85894 13.3844C5.10664 13.6321 5.43143 13.7562 5.75625 13.7562C6.08107 13.7562 6.40617 13.6324 6.65387 13.3844L15.6282 4.40972C16.1239 3.91436 16.1239 3.11049 15.6282 2.61482Z"
                  fill="#30DAFF"
                />
              </g>
              <defs>
                <clipPath id="clip0_820_9771">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </SelectPrimitive.ItemIndicator>
      </div>
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectAction = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
>(function SelectActionComponent({ className, children, ...props }, ref) {
  return (
    <div
      tabIndex={0}
      role={'button'}
      ref={ref}
      className={classNames(SelectItemClassName, '!pl-4 !pr-4', className)}
      {...props}
    >
      {children}
    </div>
  );
});

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={classNames(
      '-mx-1 my-1 h-px bg-gray-100 dark:bg-black-200',
      className
    )}
    {...props}
  />
));

SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectAction,
};

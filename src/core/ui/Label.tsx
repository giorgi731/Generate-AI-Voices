import { createElement } from 'react';
import classNames from 'classnames';

type Props = React.LabelHTMLAttributes<unknown> & {
  as?: string;
};

const Label: React.FCC<Props> = ({ children, className, as, ...props }) => {
  const tag = as ?? `label`;

  return createElement(
    tag,
    {
      className: classNames(
        `uppercase w-full text-[12px] text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]`,
        className
      ),
      ...props,
    },
    children
  );
};

export default Label;

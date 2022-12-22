import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

const Tooltip = ({
  children,
  content,
  side
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}) => {
  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            className={
              "bg-white px-4 py-2 rounded-lg shadow-lg" +
              " border-white border-10 [margin-top:-1px] mx-4"
            }>
            {content}
            <RadixTooltip.Arrow className='fill-white' color='white' />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;

import { Drawer } from "@base-ui/react";
import { MenuIcon, X } from "lucide-react";
import { IconButton } from "../ui/Button";
import { Icon } from "../ui/icons/Icon";

type MobileNavigationItem = {
  href: string;
  label: string;
};

type MobileNavigationProps = {
  items: ReadonlyArray<MobileNavigationItem>;
  openLabel: string;
  closeLabel: string;
  title: string;
  description: string;
};

export function MobileNavigation({
  items,
  openLabel,
  closeLabel,
  title,
  description,
}: MobileNavigationProps) {
  return (
    <Drawer.Root swipeDirection="left">
      <Drawer.Trigger render={<IconButton aria-label={openLabel} />}>
        <Icon icon={MenuIcon} size={20} />
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Backdrop
          className="
                fixed
                inset-0
                z-60
                bg-black
                [--backdrop-opacity:0.4]
                opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))]
                transition-opacity
                duration-300
                data-starting-style:opacity-0
                data-ending-style:opacity-0
                data-swiping:duration-0
            "
        />

        <Drawer.Viewport
          className="
                fixed
                inset-0
                z-70
                flex
                justify-start
            "
        >
          <Drawer.Popup
            className="
                    h-dvh
                    w-72
                    max-w-[85vw]
                    overflow-y-auto
                    overscroll-contain
                    border-r
                    border-border
                    bg-background
                    text-foreground
                    shadow-lg
                    outline-none
                    transform-[translateX(var(--drawer-swipe-movement-x))]
                    transition-transform
                    duration-300
                    data-starting-style:transform-[translateX(-100%)]
                    data-ending-style:transform-[translateX(-100%)]
                    data-swiping:duration-0
                "
          >
            <div className="flex h-16 items-center justify-end px-4">
              <Drawer.Title className="sr-only">{title}</Drawer.Title>

              <Drawer.Close render={<IconButton aria-label={closeLabel} />}>
                <Icon icon={X} size={20} />
              </Drawer.Close>
            </div>

            <Drawer.Description className="sr-only">
              {description}
            </Drawer.Description>

            <Drawer.Content className="p-3">
              <nav aria-label={title}>
                <ul className="flex flex-col gap-1">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Drawer.Close
                        render={<a href={item.href} />}
                        className="
                                        block
                                        min-h-12
                                        rounded-lg
                                        px-4
                                        py-3
                                        text-base
                                        font-medium
                                        hover:bg-surface-hover
                                    "
                      >
                        {item.label}
                      </Drawer.Close>
                    </li>
                  ))}
                </ul>
              </nav>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

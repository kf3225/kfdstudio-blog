import { Dialog } from "@kobalte/core/dialog";
import { X } from "lucide-solid";
import { type Component, type JSX, createSignal } from "solid-js";

interface DialogMenuProps {
  name: string;
  children?: JSX.Element;
}

const DialogMenu: Component<DialogMenuProps> = ({ name, children }) => {
  const [open, setOpen] = createSignal(false);

  return (
    <Dialog open={open()} onOpenChange={setOpen}>
      <Dialog.Trigger class="px-4 py-2 hover:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full">
        {name}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/20 animate-[content-hide_300ms_ease-in_forwards] data-[expanded]:animate-[content-show_300ms_ease-out]" />
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto">
          <Dialog.Content class="z-50 w-full max-w-[calc(100vw-32px)] sm:max-w-[500px] border border-gray-300 rounded-md p-4 bg-white shadow-lg my-auto animate-[content-hide_300ms_ease-in_forwards] data-[expanded]:animate-[content-show_300ms_ease-out]">
            <div class="flex items-baseline justify-between mb-3">
              <Dialog.Title class="text-xl font-medium text-gray-900 pr-4">
                {name}
              </Dialog.Title>
              <Dialog.CloseButton class="h-6 w-6 text-gray-700 flex-shrink-0 transition-colors duration-200 hover:text-gray-900">
                <X />
              </Dialog.CloseButton>
            </div>
            <Dialog.Description class="text-base text-gray-700 max-h-[60vh] overflow-auto">
              {children}
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
};

export default DialogMenu;

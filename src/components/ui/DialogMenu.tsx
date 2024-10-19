import {
  type Component,
  type JSX,
  Show,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { Transition } from "solid-transition-group";

interface DialogMenuProps {
  name: string;
  children?: JSX.Element;
}

const DialogMenu: Component<DialogMenuProps> = ({ name, children }) => {
  const [open, setOpen] = createSignal(false);
  const [dialogRef, setDialogRef] = createSignal<HTMLDivElement>();
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  onMount(() => {
    const handleClickOutside = (event: Event) => {
      if (dialogRef() && !dialogRef()?.contains(event.target as Node)) {
        closeDialog();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    onCleanup(() => {
      document.removeEventListener("mousedown", handleClickOutside);
    });
  });

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        class="px-4 py-2 hover:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full"
      >
        {name}
      </button>
      <Transition
        enterClass="opacity-0"
        enterToClass="opacity-100"
        exitClass="opacity-100"
        exitToClass="opacity-0"
        enterActiveClass="transition-opacity duration-200 ease-out"
        exitActiveClass="transition-opacity duration-200 ease-in"
      >
        <Show when={open()}>
          <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
            <div
              ref={setDialogRef}
              class="bg-white rounded-lg shadow-xl w-full max-w-[calc(100vh-2rem)] sm:max-w-md max-h-[50vh] md:max-h-[80vh] overflow-y-auto"
            >
              <div class="p-4 sm:p-6">
                <h2 class="text-xl font-bold mb-4">{name}</h2>
                {children}
              </div>
            </div>
          </div>
        </Show>
      </Transition>
    </>
  );
};

export default DialogMenu;

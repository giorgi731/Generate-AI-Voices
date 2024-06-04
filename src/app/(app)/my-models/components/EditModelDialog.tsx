import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import TextField from '~/core/ui/TextField';

export default function EditModelDialog({
  open,
  model,
  onClose,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  model?: Record<string, any>;
  onConfirm: (data: Record<any, any>) => void;
  onCancel: MouseEventHandler;
  onClose: (value: boolean) => void;
}) {
  const [form, setForm] = useState<Record<string, any>>(model || {});
  console.log(form, 'selectedModel');

  useEffect(() => {
    model && open && setForm(model);
  }, [model, open]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((_state) => ({ ..._state, [e.target.name]: e.target.value }));
  };

  return (
    <Transition show={open}>
      <Dialog
        className="relative z-10"
        onClose={(e) => {
          onClose(e);
        }}
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#282137] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className=" bg-[#282137] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mx-4 sm:mt-0 ">
                      <Dialog.Title
                        as="h3"
                        className="text-left text-base font-semibold leading-6 text-white"
                      >
                        Edit {model?.name}
                      </Dialog.Title>
                      <div className="mt-2">
                        <TextField className="!flex-row items-center justify-center gap-3">
                          <TextField.Label>Model Name:</TextField.Label>
                          <TextField.Input
                            name="name"
                            type="text"
                            onChange={handleChange}
                            value={form?.name}
                          />
                        </TextField>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#332a46d8] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={(e) => {
                      onConfirm(form);
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={(e) => {
                      onCancel(e);
                    }}
                    data-autofocus
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

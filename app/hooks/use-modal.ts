import { create } from "zustand";

export type ModalType = "idle" | "my-modal-name";

interface ModalStore {
  modal: ModalType;
  setModal: (modal: ModalType, value?: unknown) => void;
  closeModal: () => void;
  value?: unknown;
}

const useModalStore = create<ModalStore>((set) => ({
  modal: "idle",
  setModal: (modal, value) => {
    set(() => ({ modal, value }));
  },
  closeModal: () => {
    set(() => ({ modal: "idle" }));
  },
}));

export const useModal = () => {
  return useModalStore();
};

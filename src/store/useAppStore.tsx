import { ReactNode } from "react";
import { create } from "zustand";

type AppStore = {
  isShowModal: boolean;
  contentModal: ReactNode;
  setModal: (isShowModal: boolean, contentModal: ReactNode) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  isShowModal: false,
  contentModal: null,
  setModal: (isShowModal, contentModal) =>
    set(() => ({ isShowModal, contentModal })),
}));

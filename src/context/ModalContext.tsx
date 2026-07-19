'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ModalType = 'creator' | null

interface ModalContextValue {
  modal: ModalType
  openCreator: () => void
  close: () => void
}

const ModalContext = createContext<ModalContextValue>({
  modal: null,
  openCreator: () => {},
  close: () => {},
})

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalType>(null)

  return (
    <ModalContext.Provider
      value={{
        modal,
        openCreator: () => setModal('creator'),
        close: () => setModal(null),
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}

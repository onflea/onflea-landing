'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ModalType = 'creator' | 'buyer' | null

interface ModalContextValue {
  modal: ModalType
  openCreator: () => void
  openBuyer: () => void
  close: () => void
}

const ModalContext = createContext<ModalContextValue>({
  modal: null,
  openCreator: () => {},
  openBuyer: () => {},
  close: () => {},
})

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalType>(null)

  return (
    <ModalContext.Provider
      value={{
        modal,
        openCreator: () => setModal('creator'),
        openBuyer: () => setModal('buyer'),
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

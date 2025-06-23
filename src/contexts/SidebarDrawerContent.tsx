import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect } from "react";

import { useRouter } from "next/router";

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContentData = UseDisclosureReturn

const SidebarDrawerContent = createContext({} as SidebarDrawerContentData);

export function SidebarDrawerProvider({children} : SidebarDrawerProviderProps) {

  const disclosure = useDisclosure();
  
  const router = useRouter()

  useEffect(()=> {
    disclosure.onClose()
  },[router.asPath])

  return(
    <SidebarDrawerContent.Provider value={disclosure}>
      {children}
    </SidebarDrawerContent.Provider>
  )
}


export const useSidebarDrawer = () => useContext(SidebarDrawerContent)
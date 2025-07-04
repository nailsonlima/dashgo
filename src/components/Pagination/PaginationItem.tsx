import { Button } from "@chakra-ui/react";
import { number } from "framer-motion";

interface PaginationItemProps{
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({number, isCurrent=false, onPageChange}:PaginationItemProps) {
  if(isCurrent) {
    return(
      <Button 
      size='sm'
      fontSize='xs'
      w='4'
      colorScheme="pink"
      disabled
      _disabled= {{
        bgColor: 'pink.500',
        cursor: 'default',
      }}
      >
      {number}
    </Button>
    )
  } else {
    return(
      <Button 
      size='sm'
      fontSize='xs'
      w='4'
      bg='gray.700'
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => onPageChange(number)}
      >
      {number}
    </Button>
    )
  }
}
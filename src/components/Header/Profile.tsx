import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps{
  showProfileData?: boolean
}

export function Profile({showProfileData = true} : ProfileProps) {
  return(
    <Flex align='center'>
      {showProfileData && <Box mr='4' textAlign='right'>
        <Text>Nailson Lima</Text>                  
        <Text color='gray.300' fontSize='small'>
          nailsonlima@gmail.com
        </Text>
      </Box>}
      <Avatar size='md' name='Nailson Lima' src='https://github.com/nailsonlima.png'/>
    </Flex>
  )
}
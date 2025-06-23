import { Input } from "@/components/Form/Input";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  nome: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('Formato inválido'),
  password: yup.string().required('Senha obrigatória').length(6, ('Senha muito curta')),
  password_confirmation: yup.string().oneOf([
    undefined, 
    yup.ref('password')
  ], 'Senhas não são iguais')
})


export default function CreateUser(){

  const router = useRouter();

  const createUser = useMutation({
  mutationFn: async (newUser: CreateUserFormData) => {
    const response = await api.post('/users', {
      ...newUser,
      created_at: new Date(),
    });
    return response.data.user;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['users']) // Atualiza lista após criação
  }
});

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserFormSchema)
  })

  const erros = (formState.errors)

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values)

    router.push('/users')
    

    console.log(values)
  }


  return(
    <Box>
      <Header />
       <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
          <Sidebar />

            <Box
              as="form"
              flex='1'
              borderRadius={8}
              bg='gray.800'
              p={['6','8']}
              onSubmit={handleSubmit(handleCreateUser)}
            >            
              <Heading size='lg' fontWeight='normal' > Criar Usuário </Heading>
            <Divider my='6' borderColor='gray.700'/>

            <VStack spacing={8}>
              <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%'>
                <Input label="Nome Completo" {...register('name')} error={erros.name}/>
                <Input type='email' label="E-mail" {...register('email')} error={erros.email}/>
              </SimpleGrid>
              <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%'>
                <Input type="password" label="Senha" {...register('password')} error={erros.password}/>
                <Input type='password' label="Confirme a senha" {...register('password_confirmation')} error={erros.password_confirmation}/>
              </SimpleGrid>
            </VStack>
            <Flex mt={8} justify='flex-end'>
              <HStack spacing='4'>
                <Link href='/users'>
                  <Button colorScheme="whiteAlpha">Cancelar</Button>
                </Link>
                <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting} >Salvar</Button>
              </HStack>
            </Flex>
          </Box>
       </Flex>
    </Box>
  )
}
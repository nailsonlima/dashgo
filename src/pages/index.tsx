import { Input } from "@/components/Form/Input";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";


type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Formato inválido'),
  password: yup.string().required('Senha obrigatória')
})


export default function SignIn() {
    const { signIn, isAuthenticated } = useContext(AuthContext);

    const { register, handleSubmit, formState} = useForm({
      resolver: yupResolver(signInFormSchema)
    })
    
    const erros = (formState.errors)
  
    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {

      await new Promise(resolve => setTimeout(resolve ,2000));
      await signIn(values);
      console.log(values)
    }

  return (
  <Flex
    w="100vw"
    h="100vh"
    align="center"
    justify="center">
        <Flex
          as='form'
          w='100%'
          maxW={360}
          bg='gray.800'
          p='8'
          borderRadius='8'
          flexDir='column'
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={4}>
            <Input 
              label="E-mail"
              type="email"
              error={erros.email}
              {...register('email')}
              />
            <Input 
              label="Senha"
              type="password"
              error={erros.password}
              {...register('password')}
            />
          </Stack>

          <Button
            size='lg'
            type="submit"
            mt='6'
            colorScheme="pink"
            isLoading={formState.isSubmitting}
           >
            Entrar
          </Button>
        </Flex>
    </Flex>
);
}

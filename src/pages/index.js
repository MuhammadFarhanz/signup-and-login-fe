import Head from 'next/head';
import { Button,Stack,Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()

  const handleSignup = () => {
    router.push('/Account/signup')
  }
  const handleLogin = () => {
    router.push('/Account/login')
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
     <Center h='100vh' color='white'>
      <Stack direction='row' spacing={4} align='center'>
          <Button colorScheme='teal' variant='solid' onClick={handleSignup}>
          Signup
          </Button>
          <Button colorScheme='teal' variant='solid' onClick={handleLogin}>
          Login
          </Button>
      </Stack>
      </Center>
    </>
  );
}

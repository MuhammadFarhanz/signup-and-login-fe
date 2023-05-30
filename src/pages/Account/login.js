import Head from 'next/head';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useToast } from '@chakra-ui/react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useLoginUser } from '@/features/user/useLoginUser';
import userStore from '@/store/userStore';
import { useRouter } from 'next/router';


export default function Login() {
  const setUser = userStore((state) => state.setUser)
  const toast = useToast();
  const router = useRouter();
  const { mutate } = useLoginUser({
    onError: (error) => {
      console.log(error.response.data);
      toast({
        title: 'Error',
        description: error.response.data,
        status: 'error',
      });
    },
    onSuccess: (response) => {
      toast({
        title: 'Logged in successfully',
        status: 'success',
      });
      router.push('/home');

      setUser(response.data.user)
    console.log(response.data.user)
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const { email, password } = values;

        mutate({ email, password })

        // resetForm();
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required(),
    }),
  });

  

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Head>
      <Container py="10">
        <Heading>Login</Heading>
        <Box padding="4" border="1px solid lightgray" borderRadius="4px" mt="8">
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing="3">
              <FormControl isInvalid={formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  type="email"
                  name="email"
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  type="password"
                  name="password"
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                isLoading={formik.isSubmitting}
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Log In
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
}
 
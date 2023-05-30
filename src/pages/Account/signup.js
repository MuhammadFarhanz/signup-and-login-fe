import Head from 'next/head';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useToast } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import { useCreateUser } from '@/features/user/useCreateUser';
import { useRouter } from 'next/router';

export default function Signup() {
  const router = useRouter();
  const toast = useToast();
  const { mutate } = useCreateUser({
    onError: (error) => {
      console.log(error.response.data);
      toast({
        title: 'Error',
        description: error.response.data,
        status: 'error',
      });
    },
    onSuccess: () => {
      toast({
        title: 'user registered succesfully',
        status: 'success',
      });
      router.push('/Account/login');
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const { username, email, password } = values;

         mutate({
          username,
          email,
          password,
        });
       
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: yup.object().shape({
      username: yup.string().required().min(3).max(10),
      email: yup.string().required().email(),
      password: yup.string().required().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "The password must contain uppercase, lowercase, numbers and special characters"
      ),
    })
  });

  return (
    <>
       <Head>
          <title>Signup</title>
          <meta name="description" content="Signup page" />
        </Head>
      <Container py="10">
      <Heading>Signup</Heading>
        <Box padding="4" border="1px solid lightgray" borderRadius="4px" mt="8">
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing="3">
              <FormControl isInvalid={formik.errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  type='text'
                  name='username'
                />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  type='email'
                  name='email'
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  type='password'
                  name='password'
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                isLoading={formik.isSubmitting}
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Register Account
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
}

import Head from 'next/head';

import { useAuth } from '../lib/auth';
import { Flex, Button, Text } from '@chakra-ui/react';
import LogoIcon from '@/components/LogoIcon';

export default function Home() {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      w="full"
      h="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LogoIcon w={12} h={12} />
      {auth.user?.email ? (
        <>
          <Text>Current user: {auth.user.email}</Text>
          <Button onClick={() => auth.signout()}>Sign Out</Button>
        </>
      ) : (
        <Flex>
          <Button mt={4} size="sm" onClick={() => auth.signinWithFacebook()}>
            Sign in (Facebook)
          </Button>

          <Button mt={4} size="sm" onClick={() => auth.signinWithGoogle()}>
            Sign in (Google)
          </Button>

          <Button mt={4} size="sm" onClick={() => auth.signinWithGitHub()}>
            Sign in (Github)
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

import React from 'react';
import {
  Flex,
  HStack,
  Avatar,
  Text,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading
} from '@chakra-ui/react';
import LogoIcon from './LogoIcon';
import { useAuth } from '@/lib/auth';

import AddSiteModal from '@/components/AddSiteModal';

const DashboardShell = ({ children }) => {
  const auth = useAuth();

  // console.log(auth.user);
  return (
    <>
      <Flex
        justifyContent="space-between"
        backgroundColor="white"
        py={2}
        px={8}
      >
        <HStack spacing={4} align="center">
          <LogoIcon w={6} h={6} />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </HStack>
        <Flex justifyContent="flex-end" alignItems="center">
          <Link mr={4}>Account</Link>
          <Avatar src={auth.user?.photoUrl} size="sm" />
        </Flex>
      </Flex>
      <Flex
        height="100vh"
        backgroundColor="gray.100"
        justifyContent="center"
        alignItems="flex-start"
        p={8}
      >
        <Flex
          flexDirection="column"
          maxWidth="800px"
          width="100%"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.700" fontSize="sm">
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justifyContent="space-between">
            <Heading size="lg" as="h2" mb={2}>
              Sites
            </Heading>
            <AddSiteModal>+ Add Site</AddSiteModal>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </>
  );
};

export default DashboardShell;

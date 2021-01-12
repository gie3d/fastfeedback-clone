import { Text, Heading, Flex, Button } from '@chakra-ui/react';

import AddSiteModal from '@/components/AddSiteModal';

import DashboardShell from './DashboardShell';

const EmptyState = () => (
  <DashboardShell>
    <Flex
      backgroundColor="white"
      borderRadius="8px"
      width="100%"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="lg" mb={2} as="h2">
        You haven't added any sites.
      </Heading>
      <Text mb={4}>Let's get started.</Text>
      <AddSiteModal />
    </Flex>
  </DashboardShell>
);

export default EmptyState;

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { mutate } from 'swr';

import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';

const AddSiteModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();
  const initialRef = useRef();
  const toast = useToast();
  const auth = useAuth();

  const onPressCreateSite = ({ name, url }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url
    };
    createSite(newSite);
    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    mutate(
      '/api/sites',
      async (data) => {
        return { sites: [newSite, ...data.sites] };
      },
      false
    );
    onClose();
  };

  return (
    <>
      <Button
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray:700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
        onClick={onOpen}
      >
        {children}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onPressCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                name="name"
                placeholder="My Site"
                ref={register({
                  required: 'Required'
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://"
                name="url"
                ref={register({
                  required: 'Required'
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;

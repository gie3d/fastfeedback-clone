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

import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();
  const initialRef = useRef();
  const toast = useToast();
  const auth = useAuth();

  const onPressCreateSite = ({ site, url }) => {
    createSite({
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      site,
      url
    });
    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    onClose();
  };

  return (
    <>
      <Button fontWeight="medium" maxW={200} onClick={onOpen}>
        Add Your First Site
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
                name="site"
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

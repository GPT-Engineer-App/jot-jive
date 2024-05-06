import { Box, Container, Flex, IconButton, Input, Text, useDisclosure, VStack, Button, SimpleGrid, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";

const Note = ({ note, onDelete, onEdit }) => (
  <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
    <Flex justifyContent="space-between" alignItems="center">
      <Text>{note.text}</Text>
      <Box>
        <IconButton aria-label="Edit note" icon={<FaEdit />} onClick={() => onEdit(note)} />
        <IconButton aria-label="Delete note" icon={<FaTrash />} onClick={() => onDelete(note.id)} />
      </Box>
    </Flex>
  </Box>
);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleAddNote = () => {
    if (input.trim()) {
      const newNote = { id: Date.now(), text: input };
      setNotes([...notes, newNote]);
      setInput("");
      toast({
        title: "Note added.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({
      title: "Note deleted.",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEditNote = (updatedNote) => {
    const updatedNotes = notes.map(note => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotes);
    onClose();
  };

  return (
    <Container maxW="container.xl" p={5}>
      <VStack spacing={4}>
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl" fontWeight="bold">Notes</Text>
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onOpen}>
            Add Note
          </Button>
        </Flex>
        <Input placeholder="Type here to add a note..." value={input} onChange={(e) => setInput(e.target.value)} />
        <Button onClick={handleAddNote} colorScheme="blue">Add Note</Button>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
          {notes.map(note => (
            <Note key={note.id} note={note} onDelete={handleDeleteNote} onEdit={handleEditNote} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;
import { Box, Button, Container, Flex, Input, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useState } from "react";

const Note = ({ note, onEdit, onDelete }) => (
  <Box p={4} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
    <Text fontSize="xl">{note.text}</Text>
    <Button onClick={() => onEdit(note.id)} colorScheme="blue" size="sm" m={1}>
      Edit
    </Button>
    <Button onClick={() => onDelete(note.id)} colorScheme="red" size="sm" m={1}>
      Delete
    </Button>
  </Box>
);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editId, setEditId] = useState(null);

  const handleAddNote = () => {
    if (input) {
      setNotes([...notes, { id: Date.now(), text: input }]);
      setInput("");
    }
  };

  const handleEditNote = (id) => {
    const note = notes.find((note) => note.id === id);
    setInput(note.text);
    setEditId(id);
    onOpen();
  };

  const handleUpdateNote = () => {
    const updatedNotes = notes.map((note) => {
      if (note.id === editId) {
        return { ...note, text: input };
      }
      return note;
    });
    setNotes(updatedNotes);
    setInput("");
    setEditId(null);
    onClose();
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <Container maxW="container.xl" p={5}>
      <Flex direction="column" align="center" justify="center">
        <VStack spacing={4} align="stretch">
          <Input
            placeholder="Type here to add a note..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            size="lg"
          />
          <Button onClick={editId ? handleUpdateNote : handleAddNote} colorScheme="teal" size="md">
            {editId ? "Update Note" : "Add Note"}
          </Button>
        </VStack>
        <Flex wrap="wrap" justify="center" mt={5}>
          {notes.map((note) => (
            <Note key={note.id} note={note} onEdit={handleEditNote} onDelete={handleDeleteNote} />
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Index;
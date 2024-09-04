import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext'


function AddTransaction({ onClose, isOpen }) {

    const { formData, setformData, value, setvalue, handleFormSubmit } = useContext(GlobalContext);

    function handleFormhange(event) {
        setformData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        handleFormSubmit(formData);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Transaction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Enter Description</FormLabel>
                            <Input
                                placeholder='Enter Description'
                                name='description'
                                type='text'
                                onChange={handleFormhange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Enter Amount</FormLabel>
                            <Input
                                placeholder='Enter Amount'
                                name='amount'
                                type='number'
                                onChange={handleFormhange}
                            />
                        </FormControl>
                        <RadioGroup mt="5" value={value} onChange={setvalue}>
                            <Radio
                                checked={formData.type === 'income'}
                                value='income' colorScheme='blue' name='type'
                                onChange={handleFormhange}
                            >
                                Income
                            </Radio>
                            <Radio
                                checked={formData.type === 'expense'}
                                value="expense" colorScheme='red' name='type'
                                onChange={handleFormhange}
                                ml="4"
                            >
                                Expense
                            </Radio>
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={onClose} mr={"3"} type='submit'>Add</Button>
                        <Button onClick={onClose}>Cancel</Button>

                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default AddTransaction

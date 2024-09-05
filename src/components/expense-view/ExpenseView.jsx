import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, } from '@chakra-ui/react'
import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { GlobalContext } from '../../context/GlobalContext'


function ExpenseView() {

  const { baseURL, allTransactions, setallTransactions } = useContext(GlobalContext)


  useEffect(() => {
    let data = JSON.stringify({
      "description": "sep",
      "amount": 500,
      "type": "expense"
    });

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/transactions/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setallTransactions(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [baseURL, setallTransactions])


  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Invalid date";  // Check if the date string exists

    const dateObj = new Date(dateTimeString);  // Create a Date object from the UTC string

    // Format the date and time using toLocaleString() to get the local time
    return dateObj.toLocaleString();  // Returns the date and time in the user's local time zone
  };

  return (
    <Box
      flex={1}
      w="full"
      bg="white"
      mr="4"
      mt="10"
      p="5"
      pb="4"
      border="1px solid"
      borderColor="gray.100"
      borderRadius={"12"}
    >
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Amount</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allTransactions.map(item => (
            <Tr key={item.id} bg={item.type === "expense" ? "red.50" : "blue.50"}>
               <Td wordBreak="break-word" maxW="200px">
               <Text fontWeight="bold">{item.description}</Text>
               </Td>
               <Td>
                <Text>{item.amount}</Text> {/* Ensure amounts are formatted properly */}
              </Td>
              <Td>
                <Text>{formatDateTime(item.date)}</Text>
              </Td>
            </Tr>
          ),
 
          )
          }
        </Tbody>
      </Table>
    </Box>
  )
}

export default ExpenseView

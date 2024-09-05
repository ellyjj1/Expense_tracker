import React, { useContext, useEffect } from 'react'
import { Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import Summary from '../summary/Summary'
import ExpenseView from '../expense-view/ExpenseView'
import { GlobalContext } from '../../context/GlobalContext'
import axios from 'axios'

export default function Main() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { totalIncome, settotalIncome, totalExpense, settotalExpense, baseURL } = useContext(GlobalContext)

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/transactions/totals/',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        settotalIncome(response.data.total_income)
        settotalExpense(response.data.total_expense)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [baseURL, settotalIncome,settotalExpense])

  return (
    <Flex textAlign='center' flexDirection={'column '} pr={'5'} pl={'5'}>
      <Flex alignItems={'center'} justifyContent={'space-between'} mt={'12'} mb={'5'}>
        <Heading
          color={'blue.400'}
          display={["none", "block", "block", "block", "block"]}>
          Expense Tracker
        </Heading>
        <Flex alignItems={'center'}>
          <Button
            onClick={onOpen}
            colorScheme='blue'
            ml={'4'}
          >
            Add New Transaction
          </Button>
        </Flex>
      </Flex>
      <Summary totalExpense={totalExpense} totalIncome={totalIncome} isOpen={isOpen} onClose={onClose} />


      <Flex w="full" alignItems={"flex-start"} justifyContent={"space-evenly"} flexDirection={["column", "column", "column", "row", "row"]}>
        <ExpenseView />

      </Flex>
    </Flex>
  )
}



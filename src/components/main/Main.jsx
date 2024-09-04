import React, { useContext, useEffect } from 'react'
import { Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import Summary from '../summary/Summary'
import ExpenseView from '../expense-view/ExpenseView'
import { GlobalContext } from '../../context/GlobalContext'

export default function Main() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { totalIncome, settotalIncome, totalExpense, settotalExpense, allTransactions } = useContext(GlobalContext)

  useEffect(() => {
    let income = 0;
    let expense = 0;

    allTransactions.forEach(item => {
      item.type === "income" ? (income += parseFloat(item.amount)) : (expense += parseFloat(item.amount))
    })

    settotalIncome(income)
    settotalExpense(expense)

  }, [allTransactions, settotalIncome, settotalExpense])

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
        <ExpenseView
          data={allTransactions.filter(item => item.type === "income")}
          type="income"
        />
        <ExpenseView
          data={allTransactions.filter(item => item.type === "expense")}
          type="expense"
        />
      </Flex>
    </Flex>
  )
}



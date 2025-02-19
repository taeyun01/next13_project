import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Select from '@/components/shared/Select'
import TextField from '@/components/shared/TextField'
import { ChangeEvent, useState } from 'react'
import { getAccount, updateAccountBalance } from '@/remote/account'
import { createTransaction } from '@/remote/transaction'
import { Transaction } from '@/types/transaction'

const TransactionForm = () => {
  const [formValues, setFormValues] = useState({
    userId: '',
    type: 'deposit', // 기본은 입금
    amount: '',
    displayText: '',
  })

  const handleFormValues = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }))
  }

  // 해당 유저의 계좌정보를 가져와 입금과 출금을 처리
  const handleSubmit = async () => {
    console.log('formValues', formValues)
    const account = await getAccount(formValues.userId)

    // 계좌가 없을 때
    if (!account) {
      alert('해당 유저는 계좌를 보유하고 있지 않습니다.')
      return
    }

    // 지금 액션이 출금이고 유저의 잔액이 출금 금액보다 적으면 잔액부족
    if (
      formValues.type === 'withdraw' &&
      account.balance - Number(formValues.amount) < 0
    ) {
      alert(
        `잔액이 부족합니다. 지금 유저의 잔액은 ${account.balance}원 입니다.`,
      )
      return
    }

    // 입금과 출금이 일어난 후 계좌 잔액을 계산
    const balance =
      formValues.type === 'withdraw' // 선택한 타입이 출금이면
        ? account.balance - Number(formValues.amount) // 현재 잔액에서 입력한 금액을 뺌
        : account.balance + Number(formValues.amount) // 입금이면 현재 잔액에 입력한 금액을 더함

    // 새로운 거래 내역 생성
    const newTransaction = {
      ...formValues, // 전부 복사
      amount: Number(formValues.amount), // 입력한 금액
      date: new Date().toISOString(), // 거래 일시
      balance, // 거래 후 잔액
    } as Transaction

    // 1. 거래 내역 저장
    // 2. 유저 계좌 잔액 업데이트
    Promise.all([
      createTransaction(newTransaction),
      updateAccountBalance(formValues.userId, balance),
    ])

    alert('입출금 데이터 생성 완료')
  }

  return (
    <div>
      <Flex direction="column" gap={8}>
        <TextField
          label="유저 아이디"
          name="userId"
          value={formValues.userId}
          onChange={handleFormValues}
        />
        <Select
          name="type"
          value={formValues.type}
          options={[
            {
              label: '입금',
              value: 'deposit',
            },
            {
              label: '출금',
              value: 'withdraw',
            },
          ]}
          onChange={handleFormValues}
        />
        <TextField
          label="입출금 금액"
          name="amount"
          value={formValues.amount}
          onChange={handleFormValues}
        />
        <TextField
          label="보내는 사람"
          name="displayText"
          value={formValues.displayText}
          onChange={handleFormValues}
        />
        <Button onClick={handleSubmit}>
          {formValues.type === 'deposit' ? '입금' : '출금'}
        </Button>
      </Flex>
    </div>
  )
}

export default TransactionForm

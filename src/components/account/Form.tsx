import { useForm } from 'react-hook-form'

import { FORMS } from '@/constants/account'
import { Fragment, useCallback } from 'react'

import TextField from '@shared/TextField'
import Select from '@shared/Select'
import { AccountForm } from '@/types/account'
import Spacing from '@/components/shared/Spacing'
import dynamic from 'next/dynamic'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'))

type FormData = {
  [key: string]: string
}

const Form = ({ onNext }: { onNext: (formValues: FormData) => void }) => {
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: 'onBlur',
  })

  const component = useCallback(
    (form: AccountForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <TextField
            label={form.label}
            helpMessage={
              (formState.errors[form.id]?.message as string) || form.helpMessage // 에러메세지가 존재하면 먼저 에러를 띄움
            }
            hasError={formState.errors[form.id] != null}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id], // 해당 패턴을 가지고 유효성 검사
            })}
          />
        )
      }

      if (form.type === 'SELECT') {
        return (
          <Select
            label={form.label}
            options={form.options}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      }

      return null
    },
    [formState.errors, register],
  )

  return (
    <div style={{ padding: 24 }}>
      <form>
        {FORMS.map((form) => {
          return (
            <Fragment key={form.id}>
              {component(form)}
              <Spacing size={8} />
            </Fragment>
          )
        })}
        <FixedBottomButton
          label="개설하기"
          disabled={!formState.isValid}
          onClick={handleSubmit(onNext)}
        />
      </form>
    </div>
  )
}

const VALIDATION_MESSAGE_MAP: {
  [key: string]: {
    value: RegExp
    message: string
  }
} = {
  name: {
    value: /^[가-힣]+$/,
    message: '한글명을 확인해주세요',
  },
  email: {
    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: '이메일 형식을 확인해주세요',
  },
  phone: {
    value: /^\d+$/,
    message: '휴대전화번호를 확인해주세요',
  },
}

export default Form

import Preview from '@/components/event/Preview'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import TextField from '@/components/shared/TextField'
import { COLLECTIONS } from '@/constants/collection'
import { store } from '@/remote/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { ChangeEvent, useCallback, useState } from 'react'

const EventForm = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    subtitle: '',
    contents: '',
    buttonLabel: '',
    link: '',
    endDate: '',
  })

  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    },
    [],
  )

  const handleSubmit = async () => {
    // EVENT 컬렌션에 formValues 저장
    await setDoc(doc(collection(store, COLLECTIONS.EVENT)), formValues)

    alert('이벤트 정보를 추가했습니다!')

    setFormValues({
      title: '',
      subtitle: '',
      contents: '',
      buttonLabel: '',
      link: '',
      endDate: '',
    })
  }

  // 모든 필드가 비어있는지 확인 (value가 비어있지 않으면 제출가능 상태)
  const isSubmitDisabled = Object.values(formValues).every(
    (value) => value !== '',
  )

  return (
    <Flex direction="column" gap={12} style={{ padding: '12px 24px' }}>
      <Flex justify="center" gap={8}>
        <Flex direction="column" gap={8} style={{ flex: 1 }}>
          <TextField
            name="title"
            label="이벤트 제목"
            onChange={handleFormValues}
            value={formValues.title}
          />
          <TextField
            name="subtitle"
            label="이벤트 부제목"
            onChange={handleFormValues}
            value={formValues.subtitle}
          />
          <textarea
            style={{ height: 200 }}
            name="contents"
            onChange={handleFormValues}
            value={formValues.contents}
          />
          <TextField
            name="buttonLabel"
            label="버튼명"
            onChange={handleFormValues}
            value={formValues.buttonLabel}
          />
          <TextField
            name="link"
            label="링크"
            onChange={handleFormValues}
            value={formValues.link}
          />
          <TextField
            name="endDate"
            label="이벤트 종료일"
            onChange={handleFormValues}
            value={formValues.endDate}
          />
        </Flex>
        <Flex direction="column" gap={8} style={{ flex: 2 }}>
          <Preview data={formValues} mode="edit" />
        </Flex>
      </Flex>
      <Button size="medium" onClick={handleSubmit} disabled={!isSubmitDisabled}>
        저장하기
      </Button>
    </Flex>
  )
}

export default EventForm

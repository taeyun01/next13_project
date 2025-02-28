import Image from 'next/image'

//* Next Image 장점
//* 1. 그릴 사이즈에 맞게 이미지의 크기를 조절해준다.
//* 2. Lazy Loading이 기본으로 지원된다.
//* 3. Layout Shift를 방지해준다.
const ImagePage = () => {
  return (
    <div>
      <Image
        src="https://cdn.pixabay.com/photo/2025/01/09/16/59/forest-9322222_1280.jpg"
        alt="image"
        width={2000}
        height={2000}
      />
      <Image
        src="https://cdn.pixabay.com/photo/2025/02/22/17/45/food-9424463_1280.jpg"
        alt="image"
        width={2000}
        height={2000}
      />
      <Image
        src="https://cdn.pixabay.com/photo/2024/11/07/03/09/crab-9179589_1280.jpg"
        alt="image"
        width={2000}
        height={2000}
      />
      <Image
        src="https://cdn.pixabay.com/photo/2025/02/04/08/33/dandelion-9381266_1280.jpg"
        alt="image"
        width={2000}
        height={2000}
      />
    </div>
  )
}
export default ImagePage

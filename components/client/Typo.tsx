/** ‘따옴표 말’과 바로 뒤에 붙는 조사(는 · 을 · 이라는 등)를 한 덩어리로 묶어,
 *  줄 끝에서 따옴표와 조사가 갈라져 다음 줄로 떨어지지 않게 합니다. */
export default function Typo({ text }: { text: string }) {
  const parts = text.split(/(‘[^’]{1,24}’[가-힣]{0,3})/g);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="cl-nb">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

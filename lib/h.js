// jsx를 바벨로 컴파일시 적용할 함수
export default function h(type, props, ...children) {
  if (typeof type === "function") {
    return type(type, props, children);
  }
  return { type, props, children: children.flat() };
}

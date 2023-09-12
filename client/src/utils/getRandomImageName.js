const getRandomImageName = (name) => {
  const randomString = Math.random().toString(36).substring(7); // 랜덤 문자열 생성
  const timestamp = Date.now(); // 현재 시간을 밀리초로 얻음
  return `image_${timestamp}_${randomString}${name}`; // 이미지 이름을 조합하여 반환
};

export default getRandomImageName;

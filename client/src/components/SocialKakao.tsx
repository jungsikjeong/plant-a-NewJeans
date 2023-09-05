const SocialKakao = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API;
  const REDIRECT_URI = 'http://localhost:3000/auth/kakao/callback';
  // oauth 요청 URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <a href={KAKAO_AUTH_URL}>
      <img src='/images/kakao_login_btn.png' alt='' />
    </a>
  );
};
export default SocialKakao;

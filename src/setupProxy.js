const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
        target: 'http://aiopen.etri.re.kr:8000', // 실제 API 서버의 주소로 수정해야 합니다.
      changeOrigin: true,
    })
  );

  app.use(
    '/googleapis',
    createProxyMiddleware({
      target: 'https://firestore.googleapis.com', // Firestore API 주소
      changeOrigin: true,
      pathRewrite: {
        '^/googleapis': '' // '/googleapis'를 ''(빈 문자열)로 변환하여 요청을 전달합니다.
      },
      headers: {
        'Access-Control-Allow-Origin': '*', // 필요한 경우 CORS 헤더를 추가합니다.
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
      }
    })
  );
};
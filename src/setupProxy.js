import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/api',  // 프록시할 API 경로 설정
    createProxyMiddleware({
      target: 'http://aiopen.etri.re.kr:8000',  // 실제 API 서버 주소
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',  // 경로 재작성 (옵션)
      },
    })
  );
};
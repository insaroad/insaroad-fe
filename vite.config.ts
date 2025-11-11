import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* Node의 path 모듈 추가
    - Node의 path 모듈이란?
      - Node가 제공하는 파일 경로 유틸리티
      - 운영체제별로 경로 차이를 알아서 처리해줌
*/
import path from "path"; 


// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // path.resolve(a,b,...) : 세그먼트를 합쳐 절대 경로로 변환하는 함수
      // 현재 설정 파일 위치(__dirname) 기준으로 src의 절대 경로를 만들고, 그걸 @에 매핑한다. 
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

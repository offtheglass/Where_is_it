export {};
// 얘도 10_7_commit 버전에서는 쓰지 않음
declare global {
  interface Window {
    HOME_PATH: any; // 👈️ turn off type checking
  }
}
// 배포 설정. GitHub Pages 배포 시 아래 값을 채웁니다.
//
// SIMULATOR_API_BASE: Cloudflare Worker 프록시의 기본 URL.
//   - 값이 있으면: 모델 호출은 `${API_BASE}/api/simulate`, 데이터 저장은 `${API_BASE}/api/store`로 전송됩니다.
//   - 값이 비어 있으면: 로컬 브리지 모드(127.0.0.1:8765)로 동작합니다.
//   예: window.SIMULATOR_API_BASE = "https://admin-sim-proxy.example.workers.dev";
window.SIMULATOR_API_BASE = "https://admin-sim-proxy.example.workers.dev";

// 1차 검증(Phase 1) 모드. true이면 웹에서 직접 생성하지 않고,
// 사전 생성·검수된 사례를 열람·평가하는 화면으로 동작한다.
// GitHub Pages 공개 검증 배포에서는 true로 설정한다. 로컬 개발에서는 false.
window.SIMULATOR_PHASE1 = true;

// (legacy) Google Apps Script 직접 전송 endpoint. Worker 저장을 쓰면 비워 둡니다.
window.RESEARCH_SUBMISSION_ENDPOINT = "";

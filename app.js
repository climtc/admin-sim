const FALLBACK_DATA = {
  version: "2026-05-29.mvp1",
  domain_catalog: [
    {name: "현장체험학습", source_count: 3209, status: "scenario_ready"},
    {name: "예산계약", source_count: 1462, status: "hub_available_pending_scenario"},
    {name: "안전보건", source_count: 1370, status: "hub_available_pending_scenario"},
    {name: "교육과정", source_count: 1152, status: "hub_available_pending_scenario"},
    {name: "인사복무", source_count: 835, status: "hub_available_pending_scenario"},
    {name: "학교폭력", source_count: 713, status: "hub_available_pending_scenario"},
    {name: "방과후돌봄", source_count: 518, status: "hub_available_pending_scenario"},
    {name: "정보보안", source_count: 450, status: "scenario_ready"},
    {name: "교무학사", source_count: 412, status: "hub_available_pending_scenario"},
    {name: "생활교육", source_count: 128, status: "hub_available_pending_scenario"},
    {name: "민원정보공개", source_count: 37, status: "hub_available_pending_scenario"}
  ],
  recommended_prompts: [
    {
      title: "CCTV 재설치 복합 업무",
      domain: "정보보안",
      text: "초등학교에서 노후 CCTV를 지능형 CCTV로 재설치하려고 한다. 기존 위치별 촬영 범위, 설치 예고와 의견수렴, 물품선정위원회 또는 선정 사유, K-에듀파인 품의·계약·검수·지출, 개인정보 처리방침과 영상정보처리기기 운영 방침 공개까지 담당자별 업무 순서로 시뮬레이션해줘. 각 단계의 입력자료, 산출문서, 관련 시스템, 결재·협조 지점, 학생 안전·개인정보·예산계약 검토 필요 지점을 구분해줘."
    },
    {
      title: "현장체험학습 안전·정산",
      domain: "현장체험학습",
      text: "중학교 2학년 현장체험학습을 준비한다고 가정하고, 기본계획 수립부터 안전교육, 개인정보·동의서 수합, 취약학생 지원 확인, 업체 계약, 당일 운영, 불참자 처리, 결과보고와 정산까지 업무 프로세스를 재구성해줘. 담임교사, 업무담당자, 행정실, 관리자, 외부업체가 각각 언제 어떤 자료를 입력하고 어떤 시스템을 쓰는지 보여줘."
    },
    {
      title: "정보공개 청구 대응",
      domain: "민원정보공개",
      text: "학교에 CCTV 설치·운영 현황과 영상정보 열람 기록에 대한 정보공개 청구가 들어온 상황을 가정해줘. 자료보유자 확인, 비공개·부분공개 검토, 개인정보 마스킹, 내부 결재, 청구인 회신, 기록 보존까지 단계별로 정리하고 교사가 직접 관여하는 지점과 행정실·관리자 검토 필요 지점을 분리해줘."
    }
  ],
  scenarios: [
    {
      scenario_id: "cctv_reinstallation_school_site",
      title: "학교 영상정보처리기기(CCTV) 재설치",
      work_domain: "정보보안",
      subdomains: ["안전보건", "예산계약", "시설관리", "개인정보보호"],
      keywords: ["CCTV", "영상정보처리기기", "재설치", "개인정보", "보안정책", "시설공사", "위탁", "학교홈페이지"],
      seed_terms: {
        related_systems: ["업무관리", "K-에듀파인", "학교홈페이지", "교육시설통합정보망"],
        workflow_stages: ["계획", "안내", "심의결재", "집행", "보고정산", "기록보존"]
      },
      actors: [
        {id: "privacy_manager", name: "개인정보보호 담당자", role: "운영 방침과 개인정보 영향 요소 검토"},
        {id: "safety_facility_manager", name: "안전·시설 담당자", role: "설치 위치와 공사 범위 확인"},
        {id: "admin_office", name: "행정실 계약·회계 담당자", role: "품의, 계약, 검수, 지출 처리"},
        {id: "principal", name: "학교장·관리자", role: "최종 결재와 책임 경계 확인"},
        {id: "vendor", name: "설치·유지관리 업체", role: "현장 실사와 설치 자료 제출"}
      ],
      systems: [
        {id: "work_management", name: "업무관리", functions: ["계획 기안", "검토·협조", "결재", "시행문 보관"]},
        {id: "edufine", name: "K-에듀파인", functions: ["품의", "계약", "검수", "지출"]},
        {id: "homepage", name: "학교홈페이지", functions: ["운영 방침 공개", "변경 안내"]},
        {id: "facility_net", name: "교육시설통합정보망", functions: ["시설공사 이력", "하자보수"]},
        {id: "spreadsheet", name: "스프레드시트", functions: ["설치 위치 목록", "촬영 범위", "비교견적 정리"]}
      ],
      tasks: [
        {id: "cctv_t01", phase: "계획", title: "설치 필요성과 기존 장비 상태 확인", actor_id: "safety_facility_manager", system_ids: ["spreadsheet", "work_management"], inputs: ["기존 CCTV 위치 목록", "고장·노후 민원", "사각지대"], outputs: ["재설치 필요성 메모", "위치별 검토표"], risk: "medium", estimated_time: "D+0", human_review: ["학생 안전", "촬영 범위 적정성"]},
        {id: "cctv_t02", phase: "계획", title: "촬영 범위와 개인정보 처리 쟁점 검토", actor_id: "privacy_manager", system_ids: ["work_management", "homepage"], inputs: ["촬영 위치", "촬영 목적", "보관 기간", "접근 권한"], outputs: ["개인정보 검토 의견", "운영 방침 변경 항목"], risk: "high", estimated_time: "D+1", human_review: ["개인정보", "민원 가능성", "최종 승인"]},
        {id: "cctv_t03", phase: "심의결재", title: "재설치 계획 기안과 관리자 검토", actor_id: "privacy_manager", system_ids: ["work_management"], inputs: ["위치별 검토표", "개인정보 검토 의견", "예상 예산"], outputs: ["재설치 계획 공문", "협조·결재 이력"], risk: "high", estimated_time: "D+2", human_review: ["최종 승인", "책임 경계"]},
        {id: "cctv_t035", phase: "심의결재", title: "설치 예고, 의견수렴, 물품선정 검토", actor_id: "principal", system_ids: ["work_management", "homepage", "spreadsheet"], inputs: ["재설치 계획", "촬영 위치", "예상 금액", "물품 선정 기준", "의견수렴 결과"], outputs: ["설치 예고 또는 안내", "위원회 검토 기록", "선정 사유"], risk: "high", estimated_time: "D+2~D+5", human_review: ["민원 가능성", "예산계약", "최종 승인"]},
        {id: "cctv_t04", phase: "집행", title: "견적 수합, 품의, 계약 처리", actor_id: "admin_office", system_ids: ["edufine", "work_management", "spreadsheet"], inputs: ["견적서", "과업 범위", "예산 항목", "위탁 조건"], outputs: ["품의서", "계약 문서", "비교견적표"], risk: "high", estimated_time: "D+3~D+7", human_review: ["예산계약", "개인정보 처리 위탁"]},
        {id: "cctv_t05", phase: "집행", title: "현장 설치와 보안 설정 확인", actor_id: "vendor", system_ids: ["facility_net", "spreadsheet"], inputs: ["계약 범위", "설치 위치", "보안 설정 기준"], outputs: ["설치 완료 내역", "보안 설정 확인표"], risk: "high", estimated_time: "D+8~D+14", human_review: ["학생 안전", "정보보안"]},
        {id: "cctv_t06", phase: "보고정산", title: "검수, 지출, 방침 공개 갱신", actor_id: "admin_office", system_ids: ["edufine", "homepage", "work_management"], inputs: ["설치 완료 내역", "검수조서", "운영 방침 변경안"], outputs: ["검수·지출 문서", "홈페이지 공개 화면", "기록 보존 묶음"], risk: "high", estimated_time: "D+15~D+20", human_review: ["예산계약", "개인정보", "최종 승인"]}
      ],
      edges: [
        {source: "cctv_t01", target: "cctv_t02", label: "촬영 범위 검토"},
        {source: "cctv_t02", target: "cctv_t03", label: "검토 의견 첨부"},
        {source: "cctv_t03", target: "cctv_t035", label: "예고·의견수렴"},
        {source: "cctv_t035", target: "cctv_t04", label: "선정 후 집행"},
        {source: "cctv_t04", target: "cctv_t05", label: "계약·설치"},
        {source: "cctv_t05", target: "cctv_t06", label: "검수·공개"}
      ],
      related_work: [
        {title: "개인정보 처리방침 및 운영 방침 갱신", relation: "parallel", owner: "개인정보보호 담당자"},
        {title: "정보화기기 유지관리 용역 보안관리", relation: "preceding_or_parallel", owner: "정보보안 담당자"},
        {title: "시설공사 계약·검수·하자보수 관리", relation: "parallel", owner: "행정실"},
        {title: "학생·학부모 민원 및 안내 대응", relation: "follow_up", owner: "담임·생활안전 담당자"}
      ],
      bottlenecks: ["민감 공간과 촬영 범위 충돌", "계약·검수·지출 증빙 불일치", "홈페이지 공개와 내부 기록 보존 누락"],
      ai_support: ["위치별 촬영 목적·범위 점검표 생성", "계획서와 공개 문구 초안 생성", "증빙 정합성 점검", "결재 전 누락 서류 체크리스트 생성"],
      human_review_boundaries: ["개인정보", "학생 안전", "예산계약", "민원", "최종승인"],
      evidence: [
        {file_unit_id: "fu_b20bba54bfc05821", title: "영상정보처리기기 설치 및 운영관리 방침 수립 공개.pdf", evidence_type: "manual_candidate", domains: "안전보건;정보보안", systems: "업무관리", stages: "집행;기록보존"},
        {file_unit_id: "fu_4a9f95896ae1eeb9", title: "영상정보처리기기(CCTV) 보안정책 일부 변경 안내.pdf", evidence_type: "public_document", domains: "정보보안", systems: "업무관리", stages: "안내;집행"},
        {file_unit_id: "hub_record_cctv_selection", title: "물품선정위원회 회의 개최(지능형CCTV설치)", evidence_type: "hub_record_signal", domains: "정보보안;예산계약", systems: "K-에듀파인;업무관리", stages: "의견수렴;위원회;심의결재"},
        {file_unit_id: "fu_1b530964acea8c6f", title: "정보화기기 유지관리 용역 보안관리.pdf", evidence_type: "manual_candidate", domains: "정보보안;예산계약", systems: "K-에듀파인;업무관리", stages: "계획;집행;보고정산;기록보존"}
      ]
    }
  ]
};

let DATA = FALLBACK_DATA;
let state = {
  scenario: FALLBACK_DATA.scenarios[0],
  taskId: FALLBACK_DATA.scenarios[0].tasks[0].id,
  view: "graph",
  requestPackage: null,
  generationStatus: "idle",
  generatedResult: null,
  generationMeta: null,
  generationError: null,
  scenarioOrigin: "preview",
  activeRelatedId: null,
  graphZoom: 0.4,
  page: "simulator",
  selectedExampleTitle: "CCTV 재설치 복합 업무",
  activeSavedId: null,
  reviewingSavedId: null,
  currentGeneration: null,
  currentSavedId: null
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
// 배포 모드 분기:
//  - SIMULATOR_API_BASE가 설정되면 Cloudflare Worker 프록시(API 모드)를 사용한다.
//  - 비어 있으면 로컬 브리지 모드(http면 동일 출처, file://이면 127.0.0.1:8765).
const API_BASE = String(window.SIMULATOR_API_BASE || "").trim().replace(/\/$/, "");
const CODEX_ENDPOINT = API_BASE
  ? `${API_BASE}/api/simulate`
  : (window.location.protocol.startsWith("http")
    ? "/api/simulate"
    : "http://127.0.0.1:8765/api/simulate");
// 1차 검증(Phase 1): 웹에서 직접 생성하지 않고 사전 생성·검수된 사례를 열람·평가한다.
const PHASE1 = Boolean(window.SIMULATOR_PHASE1);
// Google Apps Script 서빙 모드: 저장은 google.script.run, 시나리오는 인라인 전역(window.__SCENARIOS__).
const GAS_MODE = Boolean(window.GAS_MODE);
const APP_VERSION = "poc-0.4";
const SAVED_RESULTS_KEY = "adminSimulatorSavedResults.v1";
const USED_EXAMPLES_KEY = "adminSimulatorUsedExamples.v1";
const RESEARCH_SESSION_KEY = "adminSimulatorResearchSession.v1";
const RESEARCH_RECORDS_KEY = "adminSimulatorResearchRecords.v1";
const RESEARCH_OUTBOX_KEY = "adminSimulatorResearchOutbox.v1";
const RESEARCH_ENDPOINT_KEY = "adminSimulatorResearchEndpoint.v1";
const RUBRIC_ITEMS = [
  {id: "experience_fit", label: "현장 경험 근접성"},
  {id: "process_validity", label: "업무 절차 타당성"},
  {id: "role_fit", label: "담당자·역할 적합성"},
  {id: "system_fit", label: "업무 시스템 반영도"},
  {id: "risk_boundary", label: "검토 필요 지점·위험 식별"},
  {id: "usefulness", label: "현장 활용 가능성"}
];
const EXTRA_PROMPT_EXAMPLES = [
  {title: "학교폭력 사안 접수와 조치", domain: "학교폭력", text: "학교폭력 의심 사안이 접수된 상황을 가정하고, 담임교사, 학교폭력 책임교사, 관리자, 보호자 연락, 사안 조사, 전담기구 검토, 관련 시스템 기록, 민감정보 보호 경계를 단계별로 시뮬레이션해줘."},
  {title: "방과후학교 강사 계약·정산", domain: "방과후돌봄", text: "방과후학교 강사 모집부터 선정, 계약, 수강 신청, 출결 관리, 강사료 지급, 민원 대응까지 담당자별 업무 프로세스와 K-에듀파인·업무관리 사용 지점을 정리해줘."},
  {title: "교원 복무와 출장 처리", domain: "인사복무", text: "교원의 출장 신청, 복무 승인, 여비 산정, 증빙 제출, 복무 기록 정정 요청까지 업무 흐름을 시뮬레이션하고 교사·교감·행정실의 역할 경계를 구분해줘."},
  {title: "학부모 민원 접수와 답변", domain: "민원정보공개", text: "학부모 민원이 접수된 상황에서 사실관계 확인, 내부 보고, 개인정보 마스킹, 답변 초안, 관리자 검토, 회신, 기록 보존까지 업무 프로세스를 구성해줘."},
  {title: "학교 안전점검 결과 조치", domain: "안전보건", text: "학교 안전점검에서 시설 보수 필요 사항이 발견된 상황을 가정하고, 위험도 판단, 임시 조치, 예산 검토, 공사 또는 수리 요청, 완료 확인, 학생 안전 안내까지 단계별로 보여줘."},
  {title: "교육과정 변경과 학사 공지", domain: "교육과정", text: "학사 일정 또는 교육과정 운영 계획 변경이 필요한 상황에서 교무부, 담임, 관리자, 학부모 안내, NEIS 또는 업무관리 처리, 변경 이력 보존까지 업무 흐름을 구성해줘."},
  {title: "현장체험학습 취소·환불", domain: "현장체험학습", text: "기상 악화로 현장체험학습이 취소되는 상황에서 학생·학부모 안내, 업체 협의, 취소 수수료, 환불, 정산, 내부 보고까지 업무 프로세스를 시뮬레이션해줘."}
];

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

function getSelectedSystems() {
  return ["업무관리", "K-에듀파인", "학교홈페이지", "NEIS"];
}

function readJsonStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJsonStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getSavedResults() {
  return readJsonStorage(SAVED_RESULTS_KEY, []);
}

function saveResults(results) {
  writeJsonStorage(SAVED_RESULTS_KEY, results);
}

function makeId(prefix) {
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${timestamp}_${random}`;
}

function getResearchSessionId() {
  const existing = localStorage.getItem(RESEARCH_SESSION_KEY);
  if (existing) return existing;
  const id = makeId("anon");
  localStorage.setItem(RESEARCH_SESSION_KEY, id);
  return id;
}

function getResearchEndpoint() {
  // Google Apps Script 모드: google.script.run 경로 사용(가짜 sentinel로 큐 활성화).
  if (GAS_MODE) return "gas://saveEvaluation";
  // Worker 프록시가 설정되어 있으면 GitHub 커밋 저장 엔드포인트를 우선 사용한다.
  if (API_BASE) return `${API_BASE}/api/store`;
  return String(window.RESEARCH_SUBMISSION_ENDPOINT || localStorage.getItem(RESEARCH_ENDPOINT_KEY) || "").trim();
}

// Worker(/api/store)는 정상 CORS를 지원하므로 응답을 읽어 전송 성공을 확인할 수 있다.
// legacy Apps Script endpoint는 no-cors 텍스트 전송만 가능하다.
function isWorkerStoreEndpoint(endpoint) {
  return Boolean(API_BASE) && endpoint === `${API_BASE}/api/store`;
}

function getResearchRecords() {
  return readJsonStorage(RESEARCH_RECORDS_KEY, {});
}

function saveResearchRecords(records) {
  writeJsonStorage(RESEARCH_RECORDS_KEY, records);
}

function getResearchOutbox() {
  return readJsonStorage(RESEARCH_OUTBOX_KEY, []);
}

function saveResearchOutbox(outbox) {
  writeJsonStorage(RESEARCH_OUTBOX_KEY, outbox.slice(-500));
}

function buildResearchUnit(eventType, source) {
  const resultId = source.result_id || source.id || makeId("result");
  const evaluation = source.evaluation || null;
  // D-2 통합 스키마: 생성 엔진(사례 출처)과 평가가 들어온 배포 채널을 함께 기록 → 엔진·채널 교차 비교.
  const sourceEngine = (source.scenario && source.scenario.source_engine) || "unknown";
  const deploymentChannel = GAS_MODE ? "google" : (API_BASE ? "github" : "local");
  return {
    schema_version: "poc-2026-05",
    source_engine: sourceEngine,
    deployment_channel: deploymentChannel,
    app_version: APP_VERSION,
    event_id: makeId("event"),
    event_type: eventType,
    event_at: new Date().toISOString(),
    session_id: getResearchSessionId(),
    result_id: resultId,
    saved_result_id: source.id || source.saved_result_id || null,
    title: source.title || "제목 없는 행정업무",
    prompt: source.prompt || source.requestPackage?.prompt || "",
    generated_result: {
      markdown: source.markdown || "",
      scenario: source.scenario || null,
      meta: source.meta || {},
      example_title: source.example_title || ""
    },
    evaluation: evaluation ? {
      scores: evaluation.scores || {},
      comment: evaluation.comment || "",
      fieldCorrections: evaluation.fieldCorrections || "",
      reviewerRole: evaluation.reviewerRole || "",
      updatedAt: evaluation.updatedAt || null
    } : null,
    request_package: source.requestPackage || null,
    submission: {
      endpoint_configured: Boolean(getResearchEndpoint()),
      transport: API_BASE ? "localStorage_outbox_then_worker_github_commit" : "localStorage_outbox_then_apps_script"
    }
  };
}

function upsertResearchRecord(unit) {
  const records = getResearchRecords();
  const previous = records[unit.result_id] || {};
  records[unit.result_id] = {
    ...previous,
    result_id: unit.result_id,
    session_id: unit.session_id,
    title: unit.title,
    prompt: unit.prompt,
    generated_result: unit.generated_result,
    evaluation: unit.evaluation || previous.evaluation || null,
    saved_result_id: unit.saved_result_id || previous.saved_result_id || null,
    last_event_type: unit.event_type,
    updated_at: unit.event_at
  };
  saveResearchRecords(records);
}

function queueResearchEvent(eventType, source) {
  const unit = buildResearchUnit(eventType, source);
  upsertResearchRecord(unit);
  const outbox = getResearchOutbox();
  outbox.push({
    id: unit.event_id,
    status: getResearchEndpoint() ? "pending" : "pending_endpoint",
    attempts: 0,
    last_error: "",
    payload: unit
  });
  saveResearchOutbox(outbox);
  transmitResearchOutbox();
  return unit;
}

// Google Apps Script 모드: google.script.run으로 시트에 저장(콜백 기반, CORS 없음).
function transmitViaGas() {
  if (!(window.google && window.google.script && window.google.script.run)) return;
  const outbox = getResearchOutbox();
  let changed = false;
  outbox.forEach((item) => {
    if (item.status === "sent" || item.status === "sending") return;
    item.status = "sending";
    item.attempts = Number(item.attempts || 0) + 1;
    changed = true;
    window.google.script.run
      .withSuccessHandler(() => {
        const ob = getResearchOutbox();
        const it = ob.find((x) => x.id === item.id);
        if (it) { it.status = "sent"; it.sent_at = new Date().toISOString(); it.last_error = ""; saveResearchOutbox(ob); }
        renderEvalResults();
      })
      .withFailureHandler((err) => {
        const ob = getResearchOutbox();
        const it = ob.find((x) => x.id === item.id);
        if (it) { it.status = "pending"; it.last_error = String((err && err.message) || err); saveResearchOutbox(ob); }
      })
      .saveEvaluation(item.payload);
  });
  if (changed) saveResearchOutbox(outbox);
}

async function transmitResearchOutbox() {
  if (GAS_MODE) { transmitViaGas(); return; }
  const endpoint = getResearchEndpoint();
  if (!endpoint) return;
  const outbox = getResearchOutbox();
  let changed = false;
  for (const item of outbox) {
    if (item.status === "sent" || item.status === "sending") continue;
    item.status = "sending";
    item.attempts = Number(item.attempts || 0) + 1;
    changed = true;
    try {
      if (isWorkerStoreEndpoint(endpoint)) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(item.payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.ok) {
          throw new Error(result.error || `저장 응답 오류: ${response.status}`);
        }
        item.stored_path = result.path || "";
      } else {
        // legacy Apps Script: 응답을 읽을 수 없는 no-cors 전송
        await fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          headers: {"Content-Type": "text/plain;charset=utf-8"},
          body: JSON.stringify(item.payload)
        });
      }
      item.status = "sent";
      item.sent_at = new Date().toISOString();
      item.last_error = "";
    } catch (error) {
      item.status = "pending";
      item.last_error = error.message || String(error);
    }
    saveResearchOutbox(outbox);
  }
  if (changed) saveResearchOutbox(outbox);
}

function getUsedExamples() {
  return new Set(readJsonStorage(USED_EXAMPLES_KEY, []));
}

function markExampleUsed(title) {
  if (!title) return;
  const used = getUsedExamples();
  used.add(title);
  writeJsonStorage(USED_EXAMPLES_KEY, Array.from(used));
}

function currentTaskTitle() {
  const manualTitle = $("#taskTitleInput")?.value?.trim();
  if (manualTitle) return manualTitle;
  const prompt = $("#promptInput")?.value?.trim() || "";
  const firstSentence = prompt.split(/[.!?。]|다\./)[0]?.trim();
  return firstSentence ? trimLabel(firstSentence, 38) : state.scenario?.title || "제목 없는 행정업무";
}

function emptyEvaluation() {
  return {
    scores: Object.fromEntries(RUBRIC_ITEMS.map((item) => [item.id, ""])),
    comment: "",
    fieldCorrections: "",
    reviewerRole: "",
    updatedAt: null
  };
}

function saveGeneratedResult(record) {
  const results = getSavedResults();
  const id = `saved_${Date.now()}`;
  const resultId = record.result_id || makeId("result");
  const saved = {
    id,
    result_id: resultId,
    createdAt: new Date().toISOString(),
    title: record.title || "제목 없는 행정업무",
    prompt: record.prompt || "",
    example_title: record.example_title || "",
    scenario: record.scenario,
    markdown: record.markdown || "",
    requestPackage: record.requestPackage || null,
    meta: record.meta || {},
    evaluation: emptyEvaluation()
  };
  results.unshift(saved);
  saveResults(results.slice(0, 100));
  state.activeSavedId = id;
  state.currentSavedId = id;
  renderSavedResults();
  renderInlineEvaluation();
  queueResearchEvent("result_saved", saved);
  return saved;
}

function asArray(value) {
  if (Array.isArray(value)) return value.filter((item) => item !== null && item !== undefined);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function uniqueValues(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function safeId(value, fallback) {
  const cleaned = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return cleaned || fallback;
}

function normalizeRisk(value) {
  const lowered = String(value || "").toLowerCase();
  if (["high", "medium", "low"].includes(lowered)) return lowered;
  if (String(value || "").includes("상")) return "high";
  if (String(value || "").includes("하")) return "low";
  return "medium";
}

function tokenSet(value) {
  return new Set(String(value || "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 2));
}

function overlapScore(left, right) {
  const a = tokenSet(left);
  const b = tokenSet(right);
  let score = 0;
  a.forEach((token) => {
    if (b.has(token)) score += 1;
  });
  return score;
}

function normalizeLinkedTaskIds(rawIds, tasks, legacyIdMap = new Map()) {
  const taskIds = new Set(tasks.map((task) => task.id));
  return uniqueValues(asArray(rawIds).map((item) => {
    const text = String(item || "");
    return legacyIdMap.get(text) || safeId(text, "");
  }).filter((id) => taskIds.has(id)));
}

function inferLinkedTaskIds(relatedItem, tasks, actorByName = new Map()) {
  const explicit = normalizeLinkedTaskIds(
    relatedItem.linked_task_ids || relatedItem.task_ids || relatedItem.task_id || relatedItem.source_task_id,
    tasks
  );
  if (explicit.length) return explicit;

  const query = [
    relatedItem.title,
    relatedItem.relation,
    relatedItem.owner,
    relatedItem.link_reason
  ].join(" ");
  const scored = tasks.map((task) => {
    const taskActor = actorByName.get(task.actor_id)?.name || "";
    const haystack = [
      task.phase,
      task.title,
      taskActor,
      asArray(task.inputs).join(" "),
      asArray(task.outputs).join(" "),
      asArray(task.human_review).join(" ")
    ].join(" ");
    return {id: task.id, score: overlapScore(query, haystack)};
  }).sort((a, b) => b.score - a.score);

  const best = scored.filter((item) => item.score > 0).slice(0, 2).map((item) => item.id);
  return best.length ? best : [tasks[0]?.id].filter(Boolean);
}

function normalizeSupportItem(item, index, tasks) {
  if (typeof item === "string") {
    return {
      title: item,
      description: "해당 업무 단계에서 초안 작성, 누락 확인, 증빙 정합성 점검을 지원합니다. 최종 판단과 승인에는 담당자 검토가 필요합니다.",
      applies_to_task_ids: [tasks[index % Math.max(tasks.length, 1)]?.id].filter(Boolean),
      expected_input: "업무 단계의 입력자료와 산출문서 초안",
      expected_output: item,
      human_review: "개인정보, 학생 안전, 예산계약, 민원, 최종승인"
    };
  }
  return {
    title: String(item.title || `AI 지원 후보 ${index + 1}`),
    description: String(item.description || "업무 초안 생성과 누락 점검을 지원합니다."),
    applies_to_task_ids: normalizeLinkedTaskIds(item.applies_to_task_ids || item.task_ids || item.task_id, tasks),
    expected_input: String(item.expected_input || "업무 입력자료"),
    expected_output: String(item.expected_output || item.output || "검토 가능한 초안 또는 체크리스트"),
    human_review: String(item.human_review || "담당자 최종 검토")
  };
}

function normalizeGeneratedScenario(rawScenario, requestPackage) {
  if (!rawScenario || typeof rawScenario !== "object") return null;
  const fallback = state.scenario || FALLBACK_DATA.scenarios[0];
  const rawActors = asArray(rawScenario.actors);
  const actors = rawActors.length
    ? rawActors.map((actor, index) => ({
      id: safeId(actor.id || actor.name, `actor_${index + 1}`),
      name: String(actor.name || `담당자 ${index + 1}`),
      role: String(actor.role || "생성된 업무 담당")
    }))
    : fallback.actors;
  const actorById = new Map(actors.map((actor) => [actor.id, actor]));
  const actorByName = new Map(actors.map((actor) => [actor.name, actor]));

  const rawSystems = asArray(rawScenario.systems);
  const systems = rawSystems.length
    ? rawSystems.map((system, index) => ({
      id: safeId(system.id || system.name, `system_${index + 1}`),
      name: String(system.name || `업무 시스템 ${index + 1}`),
      functions: asArray(system.functions).map(String)
    }))
    : asArray(requestPackage?.selection?.related_systems).map((name, index) => ({
      id: safeId(name, `system_${index + 1}`),
      name,
      functions: ["업무 입력", "검토", "기록 보존"]
    }));
  const usableSystems = systems.length ? systems : fallback.systems;
  const systemById = new Map(usableSystems.map((system) => [system.id, system]));
  const systemByName = new Map(usableSystems.map((system) => [system.name, system]));

  const taskIdMap = new Map();
  const rawTasks = asArray(rawScenario.tasks);
  const tasks = rawTasks.map((task, index) => {
    const id = safeId(task.id || task.title, `generated_t${String(index + 1).padStart(2, "0")}`);
    taskIdMap.set(String(task.id || ""), id);
    const actorKey = String(task.actor_id || "");
    const actorNameKey = String(task.actor || "");
    const actor = actorById.get(actorKey) || actorById.get(safeId(actorKey, "")) || actorByName.get(actorKey) || actorByName.get(actorNameKey) || actors[0];
    const systemIds = asArray(task.system_ids || task.systems)
      .map((item) => {
        const text = String(item);
        return systemById.get(text)?.id || systemById.get(safeId(text, ""))?.id || systemByName.get(text)?.id || safeId(text, "");
      })
      .filter((id) => systemById.has(id));
    return {
      id,
      phase: String(task.phase || `단계 ${index + 1}`),
      title: String(task.title || `생성 업무 ${index + 1}`),
      actor_id: actor?.id || actors[0]?.id || "actor_1",
      system_ids: systemIds.length ? uniqueValues(systemIds) : [usableSystems[0]?.id].filter(Boolean),
      inputs: asArray(task.inputs).map(String),
      outputs: asArray(task.outputs).map(String),
      risk: normalizeRisk(task.risk),
      estimated_time: String(task.estimated_time || `T+${index}`),
      human_review: asArray(task.human_review).map(String),
      overview: String(task.overview || `${task.title || `생성 업무 ${index + 1}`} 단계에서는 담당자가 입력자료를 확인하고 산출문서가 다음 단계로 넘겨질 수 있는 수준인지 검토합니다.`),
      key_checks: asArray(task.key_checks).map(String),
      decision_points: asArray(task.decision_points).map(String),
      common_mistakes: asArray(task.common_mistakes).map(String),
      handoff_notes: asArray(task.handoff_notes).map(String)
    };
  });
  const usableTasks = tasks.length ? tasks : fallback.tasks;

  const rawEdges = asArray(rawScenario.edges);
  const edges = rawEdges.map((edge) => {
    const source = taskIdMap.get(String(edge.source || "")) || safeId(edge.source, "");
    const target = taskIdMap.get(String(edge.target || "")) || safeId(edge.target, "");
    return {source, target, label: String(edge.label || "연결")};
  }).filter((edge) => (
    usableTasks.some((task) => task.id === edge.source) &&
    usableTasks.some((task) => task.id === edge.target)
  ));
  const sequentialEdges = usableTasks.slice(0, -1).map((task, index) => ({
    source: task.id,
    target: usableTasks[index + 1].id,
    label: "다음 단계"
  }));

  const workflowStages = uniqueValues(asArray(rawScenario.seed_terms?.workflow_stages).map(String).concat(usableTasks.map((task) => task.phase)));
  const relatedSystems = uniqueValues(asArray(rawScenario.seed_terms?.related_systems).map(String).concat(usableSystems.map((system) => system.name)));
  const boundaries = uniqueValues(asArray(rawScenario.human_review_boundaries).map(String).concat(usableTasks.flatMap((task) => task.human_review)));

  return {
    scenario_id: safeId(rawScenario.scenario_id || rawScenario.title, `generated_${Date.now()}`),
    title: String(rawScenario.title || "생성 업무 프로세스"),
    work_domain: String(rawScenario.work_domain || requestPackage?.selection?.work_domain || "생성 모델 판단"),
    subdomains: asArray(rawScenario.subdomains).map(String),
    keywords: asArray(rawScenario.keywords).map(String),
    seed_terms: {
      related_systems: relatedSystems.length ? relatedSystems : fallback.seed_terms.related_systems,
      workflow_stages: workflowStages.length ? workflowStages : fallback.seed_terms.workflow_stages
    },
    actors,
    systems: usableSystems,
    tasks: usableTasks,
    edges: edges.length ? edges : sequentialEdges,
    related_work: asArray(rawScenario.related_work).map((item, index) => ({
      id: safeId(item.id || item.title, `related_${index + 1}`),
      title: String(item.title || `관련 업무 ${index + 1}`),
      relation: String(item.relation || "related"),
      owner: String(item.owner || "담당자 검토"),
      overview: String(item.overview || `${item.title || `관련 업무 ${index + 1}`}는 현재 업무 프로세스와 함께 확인해야 하는 병행·후속 업무입니다. 연결된 단계의 산출문서와 검토 필요 지점이 누락되면 현장 처리와 기록 보존에 차이가 생길 수 있습니다.`),
      linked_task_ids: inferLinkedTaskIds(item, usableTasks, actorById),
      link_reason: String(item.link_reason || "업무 단계와 담당자·산출문서가 연결됩니다.")
    })),
    bottlenecks: asArray(rawScenario.bottlenecks).map(String),
    ai_support: asArray(rawScenario.ai_support).map((item, index) => normalizeSupportItem(item, index, usableTasks)),
    human_review_boundaries: boundaries.length ? boundaries : fallback.human_review_boundaries,
    evidence: asArray(rawScenario.evidence).map((item, index) => ({
      file_unit_id: String(item.file_unit_id || `generated_evidence_${index + 1}`),
      title: String(item.title || "생성 근거 메모"),
      evidence_type: String(item.evidence_type || "generated"),
      domains: String(item.domains || rawScenario.work_domain || ""),
      systems: String(item.systems || relatedSystems.join(";")),
      stages: String(item.stages || workflowStages.join(";"))
    }))
  };
}

function setGenerating(isGenerating) {
  const button = $("#simulateButton");
  button.disabled = isGenerating;
  button.textContent = isGenerating ? "생성 중..." : "생성하기";
}

function clampZoom(value) {
  return Math.min(1.4, Math.max(0.35, value));
}

function updateZoomControls() {
  const value = $("#zoomValue");
  const controls = $$(".zoom-controls button");
  if (value) value.textContent = `${Math.round(state.graphZoom * 100)}%`;
  controls.forEach((button) => {
    button.disabled = state.view !== "graph";
  });
}

function setGraphZoom(value) {
  state.graphZoom = clampZoom(value);
  renderVisualization();
  updateZoomControls();
}

function fitGraphToView() {
  const svg = $(".process-svg");
  const visualization = $(".visualization");
  if (!svg || !visualization) {
    setGraphZoom(0.4);
    return;
  }
  const baseWidth = Number(svg.dataset.baseWidth || svg.getAttribute("viewBox")?.split(" ")[2] || 1200);
  const availableWidth = Math.max(320, visualization.clientWidth - 34);
  setGraphZoom(availableWidth / baseWidth);
}

function getAllExamples() {
  const base = (DATA.recommended_prompts || FALLBACK_DATA.recommended_prompts || []);
  const merged = [...base, ...EXTRA_PROMPT_EXAMPLES];
  const seen = new Set();
  return merged.filter((item) => {
    if (seen.has(item.title)) return false;
    seen.add(item.title);
    return true;
  });
}

function createSupplementExamples(count, used, existing) {
  const seeds = [
    ["급식 알레르기 대응", "안전보건", "급식 알레르기 학생 정보 확인, 보호자 안내, 급식실 공유, 담임 확인, 응급상황 대응 기록까지 업무 프로세스를 구성해줘."],
    ["학적 변동 처리", "교무학사", "전입·전출 또는 학적 변동 상황에서 담임, 교무부, 행정실, NEIS 처리, 보호자 안내, 기록 보존까지 업무 흐름을 보여줘."],
    ["개인정보 제공 요청 대응", "정보보안", "외부 기관의 학생 개인정보 제공 요청이 들어온 상황에서 법적 근거 확인, 제공 여부 검토, 내부 결재, 마스킹, 기록 보존까지 정리해줘."],
    ["학교 행사 안전 계획", "안전보건", "학교 행사를 준비하면서 안전 계획, 역할 분담, 비상 연락, 시설 점검, 안내문, 사후 보고까지 담당자별 업무를 시뮬레이션해줘."],
    ["예산 변경과 물품 구입", "예산계약", "수업 운영 물품 구입이 필요한 상황에서 예산 확인, 품의, 견적, 검수, 지출, 증빙 보관까지 업무 흐름을 구성해줘."]
  ];
  const existingTitles = new Set(existing.map((item) => item.title));
  const supplements = [];
  let round = 1;
  while (supplements.length < count) {
    seeds.forEach(([baseTitle, domain, text]) => {
      const title = round === 1 ? baseTitle : `${baseTitle} 사례 ${round}`;
      if (supplements.length < count && !used.has(title) && !existingTitles.has(title)) {
        supplements.push({title, domain, text});
      }
    });
    round += 1;
  }
  return supplements;
}

function collectRequestPackage() {
  const selectedExample = getAllExamples().find((item) => item.title === state.selectedExampleTitle);
  return {
    mode: "local_generation_direct",
    browser_inference: false,
    project_id: "admin-work-simulator-local",
    task_title: currentTaskTitle(),
    selection: {
      admin_work_example: selectedExample?.title || null,
      work_domain: selectedExample?.domain || null,
      related_systems: getSelectedSystems(),
      include_manuals: true,
      evidence_limit: 12
    },
    prompt: $("#promptInput").value,
    preview_scenario_id: state.scenario?.scenario_id || null,
    generation_instruction: [
      "DataHubClient.build_simulator_context(request)로 근거 패키지를 먼저 생성한다.",
      "브라우저에서 업무 흐름을 생성하지 않고 공개 문서자료, 매뉴얼 후보, workflow seed를 읽어 업무 프로세스를 구성한다.",
      "개인정보, 학생 안전, 예산계약, 민원, 평가, 최종승인은 human_review_boundaries로 분리한다.",
      "결과는 tasks, actors, systems, edges, related_work, bottlenecks, ai_support, evidence로 반환한다.",
      "related_work에는 linked_task_ids와 link_reason을 포함해 관련 업무가 어떤 프로세스 단계와 연결되는지 표시한다."
    ]
  };
}

function previewExampleDomain(example) {
  const selectedDomain = example?.domain || null;
  const preview = selectedDomain
    ? DATA.scenarios.find((scenario) => scenario.work_domain === selectedDomain)
    : null;
  if (example) {
    state.selectedExampleTitle = example.title;
    $("#taskTitleInput").value = example.title;
    $("#promptInput").value = example.text;
  }
  if (preview) {
    state.scenario = preview;
    state.taskId = preview.tasks[0]?.id;
    state.scenarioOrigin = "preview";
    renderAll();
  }
}

async function runSimulation() {
  state.requestPackage = collectRequestPackage();
  const resultId = makeId("result");
  state.generationStatus = "running";
  state.generatedResult = null;
  state.generationMeta = null;
  state.generationError = null;
  state.currentGeneration = null;
  state.currentSavedId = null;
  state.activeSavedId = null;
  const selectedDomain = state.requestPackage.selection.work_domain;
  const preview = selectedDomain
    ? DATA.scenarios.find((scenario) => scenario.work_domain === selectedDomain)
    : null;
  if (preview) {
    state.scenario = preview;
    state.taskId = preview.tasks[0]?.id;
  }
  queueResearchEvent("generation_requested", {
    result_id: resultId,
    title: currentTaskTitle(),
    prompt: state.requestPackage.prompt,
    example_title: state.selectedExampleTitle || state.requestPackage.selection.admin_work_example,
    requestPackage: state.requestPackage
  });
  renderAll();
  setGenerating(true);

  try {
    const response = await fetch(CODEX_ENDPOINT, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(state.requestPackage)
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.ok) {
      const label = API_BASE ? "생성 프록시 응답 오류" : "로컬 생성 브리지 응답 오류";
      throw new Error(payload.error || `${label}: ${response.status}`);
    }
    state.generationStatus = "complete";
    state.generatedResult = payload.result;
    const generatedScenario = normalizeGeneratedScenario(payload.scenario, state.requestPackage);
    if (generatedScenario) {
      generatedScenario.title = currentTaskTitle() || generatedScenario.title;
      state.scenario = generatedScenario;
      state.taskId = generatedScenario.tasks[0]?.id;
      state.scenarioOrigin = "codex";
      state.view = "graph";
      $$(".tab-button").forEach((item) => item.classList.toggle("active", item.dataset.view === "graph"));
    }
    state.generationMeta = {
      elapsed_seconds: payload.elapsed_seconds,
      engine: payload.engine,
      cwd: payload.cwd,
      structured: payload.structured,
      scenario_applied: Boolean(generatedScenario)
    };
    markExampleUsed(state.selectedExampleTitle || state.requestPackage.selection.admin_work_example);
    state.currentGeneration = {
      result_id: resultId,
      title: currentTaskTitle(),
      prompt: state.requestPackage.prompt,
      example_title: state.selectedExampleTitle || state.requestPackage.selection.admin_work_example,
      scenario: generatedScenario || state.scenario,
      markdown: state.generatedResult,
      requestPackage: state.requestPackage,
      meta: state.generationMeta
    };
    queueResearchEvent("generation_completed", state.currentGeneration);
    renderPromptExamples();
  } catch (error) {
    state.generationStatus = "error";
    state.generationError = error.message || String(error);
  } finally {
    setGenerating(false);
    renderAll();
  }
}

function actorName(scenario, actorId) {
  return scenario.actors.find((actor) => actor.id === actorId)?.name || actorId;
}

function systemName(scenario, systemId) {
  return scenario.systems.find((system) => system.id === systemId)?.name || systemId;
}

function relatedWorkId(item, index) {
  return safeId(item.id || item.title, `related_${index + 1}`);
}

function linkedTaskIdsForRelated(item) {
  const scenario = state.scenario;
  const actorById = new Map((scenario.actors || []).map((actor) => [actor.id, actor]));
  const explicit = normalizeLinkedTaskIds(item.linked_task_ids || item.task_ids || item.task_id, scenario.tasks || []);
  return explicit.length ? explicit : inferLinkedTaskIds(item, scenario.tasks || [], actorById);
}

function relatedWorkForTask(taskId) {
  return (state.scenario.related_work || []).map((item, index) => ({
    ...item,
    id: relatedWorkId(item, index),
    linked_task_ids: linkedTaskIdsForRelated(item)
  })).filter((item) => item.linked_task_ids.includes(taskId));
}

function taskNeighbors(scenario, taskId) {
  const incoming = (scenario.edges || []).filter((edge) => edge.target === taskId)
    .map((edge) => scenario.tasks.find((task) => task.id === edge.source)?.title || edge.source)
    .filter(Boolean);
  const outgoing = (scenario.edges || []).filter((edge) => edge.source === taskId)
    .map((edge) => scenario.tasks.find((task) => task.id === edge.target)?.title || edge.target)
    .filter(Boolean);
  return {incoming, outgoing};
}

function systemFunctionList(scenario, task) {
  return (task.system_ids || []).map((id) => {
    const system = scenario.systems.find((item) => item.id === id);
    if (!system) return null;
    return `${system.name}: ${asArray(system.functions).join(", ") || "기록·검토"}`;
  }).filter(Boolean);
}

function supportForTask(scenario, taskId) {
  return asArray(scenario.ai_support).map((item, index) => normalizeSupportItem(item, index, scenario.tasks || []))
    .filter((item) => !item.applies_to_task_ids.length || item.applies_to_task_ids.includes(taskId));
}

function renderMarkdown(text) {
  const lines = String(text || "").split(/\r?\n/);
  const html = [];
  let listOpen = false;
  let codeOpen = false;
  const closeList = () => {
    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }
  };

  lines.forEach((line) => {
    if (line.trim().startsWith("```")) {
      closeList();
      html.push(codeOpen ? "</code></pre>" : "<pre><code>");
      codeOpen = !codeOpen;
      return;
    }
    if (codeOpen) {
      html.push(`${escapeHtml(line)}\n`);
      return;
    }
    const trimmed = line.trim();
    if (!trimmed) {
      closeList();
      return;
    }
    if (trimmed.startsWith("### ")) {
      closeList();
      html.push(`<h4>${escapeHtml(trimmed.slice(4))}</h4>`);
      return;
    }
    if (trimmed.startsWith("## ")) {
      closeList();
      html.push(`<h3>${escapeHtml(trimmed.slice(3))}</h3>`);
      return;
    }
    if (trimmed.startsWith("# ")) {
      closeList();
      html.push(`<h3>${escapeHtml(trimmed.slice(2))}</h3>`);
      return;
    }
    if (/^[-*]\s+/.test(trimmed)) {
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${escapeHtml(trimmed.replace(/^[-*]\s+/, ""))}</li>`);
      return;
    }
    if (/^\d+\.\s+/.test(trimmed)) {
      closeList();
      html.push(`<p><strong>${escapeHtml(trimmed.replace(/^\d+\.\s+/, ""))}</strong></p>`);
      return;
    }
    closeList();
    html.push(`<p>${escapeHtml(trimmed)}</p>`);
  });
  closeList();
  if (codeOpen) html.push("</code></pre>");
  return html.join("");
}

function engineLabel(engine) {
  const raw = String(engine || "").trim();
  const e = raw.toLowerCase();
  if (!raw) return "Claude";
  if (e === "api") return "Claude (API)";
  if (e === "claude") return "Claude";
  if (e === "codex") return "Codex";
  if (e.includes("local generation")) return "Claude (로컬)";
  return raw;
}

function renderSummary() {
  const scenario = state.scenario;
  $("#matchLabel").textContent = `${scenario.work_domain} · ${scenario.subdomains?.slice(0, 3).join(" · ") || ""}`;
  $("#scenarioTitle").textContent = scenario.title;
  const sourceLabel = state.scenarioOrigin === "codex" ? "생성 결과" : "검수 시나리오 미리보기";
  $("#scenarioSubtitle").textContent = `${scenario.seed_terms.workflow_stages.join(" -> ")} 단계로 구성된 ${sourceLabel}입니다.`;
  $("#scoreValue").textContent = PHASE1 ? "현장 검증 대기" : engineLabel(state.generationMeta?.engine);
  $("#boundaryCount").textContent = String(scenario.human_review_boundaries.length);
  $("#ownerSummary").textContent = scenario.actors.slice(0, 3).map((actor) => actor.name).join(", ");
  $("#systemSummary").textContent = scenario.seed_terms.related_systems.slice(0, 4).join(", ");
  $("#boundarySummary").textContent = scenario.human_review_boundaries.slice(0, 4).join(", ");
}

function renderSimulationBrief() {
  if (PHASE1) {
    const evaluated = Boolean(selectedSavedResult()?.evaluation?.updatedAt);
    $("#simulationBriefTitle").textContent = "검수된 업무 사례";
    $("#simulationBriefText").textContent = "이 사례가 실제 학교 행정업무와 얼마나 비슷한지 확인한 뒤, 아래 버튼으로 평가해 주세요. (웹에서는 직접 생성하지 않습니다.)";
    $("#simulationSignals").innerHTML = `
      <div class="generation-actions">
        <button id="evaluateCaseButton" class="primary-button compact-button" type="button">이 사례 평가하기</button>
        <span class="save-state">${evaluated ? "이미 평가를 저장했습니다. 다시 수정할 수 있습니다." : "아직 이 사례를 평가하지 않았습니다."}</span>
      </div>
    `;
    const evaluateCaseButton = $("#evaluateCaseButton");
    if (evaluateCaseButton) {
      evaluateCaseButton.addEventListener("click", () => {
        $("#inlineReviewForm")?.scrollIntoView({behavior: "smooth", block: "start"});
        $("#inlineReviewForm input, #inlineReviewForm select")?.focus?.();
      });
    }
    return;
  }
  if (state.generationStatus === "running") {
    $("#simulationBriefTitle").textContent = "업무 프로세스를 생성 중입니다";
    $("#simulationBriefText").textContent = API_BASE
      ? "입력한 업무 제목, 예시, 프롬프트가 서버리스 프록시(API)로 전달되었습니다. 응답이 도착하면 아래 영역에 바로 표시합니다."
      : "입력한 업무 제목, 예시, 프롬프트가 로컬 생성 브리지로 전달되었습니다. 응답이 도착하면 아래 영역에 바로 표시합니다.";
    $("#simulationSignals").innerHTML = `
      <span class="signal-chip">${API_BASE ? "serverless_proxy" : "local_generation_bridge"}</span>
      <span class="signal-chip system">endpoint: ${escapeHtml(CODEX_ENDPOINT)}</span>
      <span class="signal-chip boundary">${API_BASE ? "API key hidden on proxy" : "local read-only execution"}</span>
    `;
    return;
  }

  if (state.generationStatus === "complete" && state.generatedResult) {
    const meta = state.generationMeta || {};
    const isSaved = Boolean(state.currentSavedId);
    $("#simulationBriefTitle").textContent = "생성 결과";
    $("#simulationBriefText").textContent = meta.scenario_applied
      ? "아래 결과가 요약, 담당자 업무 프로세스 시각화, 관련 업무, 상세 패널에 적용되었습니다."
      : "아래 결과는 표시되었지만 구조화 시나리오를 찾지 못해 시각화는 기존 미리보기를 유지합니다.";
    $("#simulationSignals").innerHTML = `
      <div class="codex-meta">
        <span class="signal-chip">engine: ${escapeHtml(meta.engine || "claude")}</span>
        <span class="signal-chip system">elapsed: ${escapeHtml(meta.elapsed_seconds ?? "-")}s</span>
        <span class="signal-chip system">result applied: ${meta.scenario_applied ? "yes" : "no"}</span>
        <span class="signal-chip boundary">browser generation: false</span>
      </div>
      <div class="generation-actions">
        <button id="saveGeneratedButton" class="primary-button compact-button" type="button" ${isSaved ? "disabled" : ""}>${isSaved ? "저장됨" : "저장하기"}</button>
        <button id="evaluateGeneratedButton" class="fit-button compact-button" type="button" ${isSaved ? "" : "disabled"}>생성 결과 평가하기</button>
        <span class="save-state">${isSaved ? "저장 결과 목록에 추가되었습니다." : "저장하면 평가 목록에서 검토 의견을 기록할 수 있습니다."}</span>
      </div>
      <article class="codex-result">${renderMarkdown(state.generatedResult)}</article>
    `;
    bindGenerationActions();
    return;
  }

  if (state.generationStatus === "error") {
    const isTimeout = String(state.generationError || "").includes("초를 초과");
    $("#simulationBriefTitle").textContent = isTimeout ? "생성 시간 초과" : "로컬 생성 연결 오류";
    $("#simulationBriefText").textContent = isTimeout
      ? "로컬 브리지 서버는 실행 중이지만 생성이 제한 시간을 넘겼습니다. 프롬프트를 조금 줄이거나 다시 실행하면 됩니다. 현재 브리지는 더 긴 제한 시간으로 조정되어 있습니다."
      : "로컬 브리지 서버가 실행 중인지 확인하세요. 아래 명령으로 이 HTML을 서버에서 열면 생성 버튼이 로컬 생성 엔진과 연결됩니다.";
    $("#simulationSignals").innerHTML = `
      <pre class="request-package">cd [프로젝트 폴더]/행정업무_시뮬레이터_프로토타입
python3 local_generation_bridge.py</pre>
      <div class="error-box">${escapeHtml(state.generationError)}</div>
    `;
    return;
  }

  if (!state.requestPackage) {
    $("#simulationBriefTitle").textContent = "생성 대기";
    $("#simulationBriefText").textContent = "추천 예시나 프롬프트를 준비한 뒤 생성 버튼을 누르면, 로컬 브리지 서버가 요청을 전달하고 결과를 이 영역에 표시합니다.";
    $("#simulationSignals").innerHTML = `
      <span class="signal-chip">local_generation_bridge</span>
      <span class="signal-chip boundary">browser generation: false</span>
      <span class="signal-chip system">endpoint: ${escapeHtml(CODEX_ENDPOINT)}</span>
    `;
    return;
  }
  $("#simulationBriefTitle").textContent = "생성 요청 패키지";
  $("#simulationBriefText").textContent = "아래 JSON은 생성 요청에 사용된 입력 패키지입니다.";
  $("#simulationSignals").innerHTML = `<pre class="request-package">${escapeHtml(JSON.stringify(state.requestPackage, null, 2))}</pre>`;
}

function bindGenerationActions() {
  const saveButton = $("#saveGeneratedButton");
  const evaluateButton = $("#evaluateGeneratedButton");
  if (saveButton) {
    saveButton.addEventListener("click", () => {
      if (!state.currentGeneration || state.currentSavedId) return;
      const saved = saveGeneratedResult(state.currentGeneration);
      state.reviewingSavedId = saved.id;
      renderSimulationBrief();
      renderReviewReturnBar();
    });
  }
  if (evaluateButton) {
    evaluateButton.addEventListener("click", () => {
      if (!state.currentSavedId) return;
      state.activeSavedId = state.currentSavedId;
      renderInlineEvaluation();
      $("#inlineReviewForm")?.scrollIntoView({behavior: "smooth", block: "start"});
    });
  }
}

function renderTaskDetail() {
  const scenario = state.scenario;
  const task = scenario.tasks.find((item) => item.id === state.taskId) || scenario.tasks[0];
  const riskClass = task.risk === "high" ? "risk-high" : "risk-medium";
  const neighbors = taskNeighbors(scenario, task.id);
  const supports = supportForTask(scenario, task.id);
  $("#taskDetail").innerHTML = `
    <h3 class="detail-title">${escapeHtml(task.title)}</h3>
    <p class="detail-meta">${escapeHtml(task.phase)} · ${escapeHtml(actorName(scenario, task.actor_id))} · ${escapeHtml(task.estimated_time)}</p>
    <div class="tag-row">
      <span class="tag ${riskClass}">위험도 ${escapeHtml(task.risk)}</span>
      ${(task.system_ids || []).map((id) => `<span class="tag">${escapeHtml(systemName(scenario, id))}</span>`).join("")}
    </div>
    <div class="detail-block">
      <h3>업무 개요</h3>
      <p class="detail-text">${escapeHtml(task.overview || "이 단계의 목적, 담당자 판단, 다음 단계로 넘길 산출물을 함께 확인해야 합니다.")}</p>
    </div>
    <div class="detail-block compact-grid">
      ${detailList("선행 단계", neighbors.incoming.length ? neighbors.incoming : ["이 프로세스의 시작 단계 또는 독립 검토 단계"])}
      ${detailList("후속 단계", neighbors.outgoing.length ? neighbors.outgoing : ["최종 보고 또는 기록 보존 단계"])}
    </div>
    ${detailList("입력자료", task.inputs)}
    ${detailList("산출물", task.outputs)}
    ${detailList("시스템 기능 확인", systemFunctionList(scenario, task))}
    ${detailList("핵심 확인사항", task.key_checks?.length ? task.key_checks : task.human_review)}
    ${detailList("판단 지점", task.decision_points?.length ? task.decision_points : ["담당자 검토 후 다음 단계 진행 여부를 판단"])}
    ${detailList("자주 놓치는 부분", task.common_mistakes?.length ? task.common_mistakes : ["산출문서, 결재 이력, 개인정보·예산계약 검토 필요 지점 누락 여부"])}
    ${detailList("인수인계 메모", task.handoff_notes?.length ? task.handoff_notes : ["다음 담당자가 확인할 입력자료와 산출문서 위치를 명확히 남김"])}
    ${detailList("담당자 검토 필요 지점", task.human_review)}
    <div class="detail-block">
      <h3>AI 지원 후보</h3>
      <div class="support-list">
        ${supports.length ? supports.map((item) => `
          <article class="support-item">
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.description)}</p>
            <dl>
              <div><dt>입력</dt><dd>${escapeHtml(item.expected_input)}</dd></div>
              <div><dt>출력</dt><dd>${escapeHtml(item.expected_output)}</dd></div>
              <div><dt>검토</dt><dd>${escapeHtml(item.human_review)}</dd></div>
            </dl>
          </article>
        `).join("") : `<p class="empty-note">이 단계에 직접 연결된 AI 지원 후보가 아직 없습니다.</p>`}
      </div>
    </div>
  `;
}

function detailList(title, items) {
  return `
    <div class="detail-block">
      <h3>${escapeHtml(title)}</h3>
      <ul>${(items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
  `;
}

function renderRelatedWork() {
  const scenario = state.scenario;
  const related = (scenario.related_work || []).map((item, index) => ({
    ...item,
    id: relatedWorkId(item, index),
    linked_task_ids: linkedTaskIdsForRelated(item),
    overview: item.overview || `${item.title}는 현재 프로세스와 함께 검토해야 하는 관련 행정업무입니다. 담당자, 산출문서, 검토 필요 지점이 맞물리므로 연결된 단계와 함께 확인해야 합니다.`,
    link_reason: item.link_reason || "연결된 업무 단계와 담당자·산출문서를 함께 검토합니다."
  }));
  $("#relatedWork").innerHTML = related.map((item) => `
    <article class="related-card ${state.activeRelatedId === item.id ? "active" : ""}">
      <strong>${escapeHtml(item.title)}</strong>
      <div class="tag-row">
        <span class="tag">${escapeHtml(item.relation)}</span>
        <span class="tag">${escapeHtml(item.owner)}</span>
      </div>
      <p class="related-overview">${escapeHtml(item.overview)}</p>
      <p class="related-reason">${escapeHtml(item.link_reason)}</p>
      <div class="process-link-row" aria-label="연결된 업무 단계">
        ${item.linked_task_ids.map((taskId) => {
          const task = scenario.tasks.find((candidate) => candidate.id === taskId);
          if (!task) return "";
          return `<button class="process-link" type="button" data-related-id="${escapeHtml(item.id)}" data-task-id="${escapeHtml(task.id)}">${escapeHtml(task.phase)} · ${escapeHtml(trimLabel(task.title, 18))}</button>`;
        }).join("")}
      </div>
    </article>
  `).join("");
  $$(".process-link").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeRelatedId = button.dataset.relatedId;
      setActiveTask(button.dataset.taskId);
      document.querySelector(".visualization")?.scrollIntoView({behavior: "smooth", block: "nearest"});
    });
  });
}

function setActiveTask(taskId) {
  state.taskId = taskId;
  renderVisualization();
  renderTaskDetail();
  renderRelatedWork();
}

function renderGraph() {
  const scenario = state.scenario;
  const tasks = scenario.tasks;
  const taskW = 190;
  const taskH = 128;
  const nodeStep = 246;
  const width = Math.max(1240, tasks.length * nodeStep + 120);
  const graphHeight = 540;
  const topY = 186;
  const taskNodes = tasks.map((task, index) => ({
    id: task.id,
    x: 82 + index * nodeStep,
    y: topY,
    w: taskW,
    h: taskH,
    task
  }));
  const actorNodes = scenario.actors.slice(0, 5).map((actor, index) => ({
    id: actor.id,
    label: actor.name,
    x: 82 + index * 220,
    y: 42,
    w: 196,
    h: 68
  }));
  const systemNodes = scenario.systems.slice(0, 5).map((system, index) => ({
    id: system.id,
    label: system.name,
    x: 82 + index * 220,
    y: 408,
    w: 196,
    h: 70
  }));

  const taskEdges = scenario.edges
    .filter((edge) => tasks.some((task) => task.id === edge.source) && tasks.some((task) => task.id === edge.target))
    .map((edge) => {
      const source = taskNodes.find((node) => node.id === edge.source);
      const target = taskNodes.find((node) => node.id === edge.target);
      const midX = (source.x + source.w + target.x) / 2;
      const labelY = source.y - 18;
      const centerY = source.y + source.h / 2;
      return `
        <path class="edge-line" d="M ${source.x + source.w} ${centerY} C ${source.x + source.w + 34} ${centerY}, ${target.x - 34} ${centerY}, ${target.x} ${centerY}" marker-end="url(#arrow)"></path>
        <rect class="edge-label-bg" x="${midX - 48}" y="${labelY - 15}" width="96" height="22" rx="11"></rect>
        <text class="edge-label" x="${midX}" y="${labelY}" text-anchor="middle">${escapeHtml(trimLabel(edge.label || "", 10))}</text>
      `;
    }).join("");

  // 가독성: 담당자·시스템 연결선은 모든 단계가 아니라 "선택한 업무 단계"의 것만 표시한다.
  // (담당자/시스템 노드 위치가 단계와 1:1로 맞지 않아 전체를 그리면 대각선이 교차해 엉킨다.)
  const activeTask = tasks.find((task) => task.id === state.taskId) || tasks[0];
  const activeActorId = activeTask ? activeTask.actor_id : null;
  const activeSystemIds = activeTask ? (activeTask.system_ids || []).slice(0, 2) : [];

  const actorEdges = (() => {
    if (!activeTask) return "";
    const source = actorNodes.find((node) => node.id === activeActorId);
    const target = taskNodes.find((node) => node.id === activeTask.id);
    if (!source || !target) return "";
    return `<path class="edge-line actor-edge active-link" d="M ${source.x + source.w / 2} ${source.y + source.h} C ${source.x + source.w / 2} ${source.y + source.h + 30}, ${target.x + target.w / 2} ${target.y - 30}, ${target.x + target.w / 2} ${target.y}" marker-end="url(#arrowActor)"></path>`;
  })();

  const systemEdges = activeTask ? activeSystemIds.map((systemId) => {
    const source = taskNodes.find((node) => node.id === activeTask.id);
    const target = systemNodes.find((node) => node.id === systemId);
    if (!source || !target) return "";
    return `<path class="edge-line system-edge active-link" d="M ${source.x + source.w / 2} ${source.y + source.h} C ${source.x + source.w / 2} ${source.y + source.h + 30}, ${target.x + target.w / 2} ${target.y - 30}, ${target.x + target.w / 2} ${target.y}" marker-end="url(#arrowSystem)"></path>`;
  }).join("") : "";

  const actorMarkup = actorNodes.map((node) => `
    <g class="node-card actor-node ${node.id === activeActorId ? "linked" : "muted-node"}">
      <rect x="${node.x}" y="${node.y}" width="${node.w}" height="${node.h}" rx="8"></rect>
      <text class="node-kicker" x="${node.x + 14}" y="${node.y + 19}">ROLE</text>
      ${svgTextLines(node.label, node.x + 14, node.y + 42, 13, 2, "node-title", 15)}
    </g>
  `).join("");

  const systemMarkup = systemNodes.map((node) => `
    <g class="node-card system-node ${activeSystemIds.includes(node.id) ? "linked" : "muted-node"}">
      <rect x="${node.x}" y="${node.y}" width="${node.w}" height="${node.h}" rx="8"></rect>
      <text class="node-kicker" x="${node.x + 14}" y="${node.y + 20}">SYSTEM</text>
      ${svgTextLines(node.label, node.x + 14, node.y + 44, 13, 2, "node-title", 15)}
    </g>
  `).join("");

  const taskMarkup = taskNodes.map((node) => `
    <g class="node-card ${state.taskId === node.id ? "active" : ""}" data-task-id="${node.id}">
      <rect x="${node.x}" y="${node.y}" width="${node.w}" height="${node.h}" rx="8"></rect>
      <rect class="risk-band ${node.task.risk === "high" ? "risk-band-high" : "risk-band-medium"}" x="${node.x}" y="${node.y}" width="7" height="${node.h}" rx="4"></rect>
      <text class="phase" x="${node.x + 16}" y="${node.y + 24}">${escapeHtml(trimLabel(node.task.phase, 13))}</text>
      ${svgTextLines(node.task.title, node.x + 16, node.y + 50, 12, 3, "node-title", 16)}
      <text class="phase" x="${node.x + 16}" y="${node.y + 104}">${escapeHtml(trimLabel(actorName(scenario, node.task.actor_id), 15))}</text>
      <text class="node-kicker" x="${node.x + 16}" y="${node.y + 122}">${escapeHtml(trimLabel(node.task.estimated_time, 16))}</text>
    </g>
  `).join("");

  $("#visualization").innerHTML = `
    <div class="graph-frame">
      <div class="graph-legend">
        <span><i class="legend-dot role"></i>담당 역할</span>
        <span><i class="legend-dot task"></i>업무 단계</span>
        <span><i class="legend-dot system"></i>시스템 기능</span>
        <span><i class="legend-line"></i>선후행·검토 연결</span>
        <span class="legend-hint">업무 단계를 클릭하면 담당자·시스템 연결이 표시됩니다</span>
      </div>
    <svg class="process-svg" width="${width}" height="${graphHeight}" viewBox="0 0 ${width} ${graphHeight}" role="img" aria-label="업무 프로세스 그래프">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6c879a"></path>
        </marker>
        <marker id="arrowSoft" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9bb0be"></path>
        </marker>
        <marker id="arrowActor" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#236d56"></path>
        </marker>
        <marker id="arrowSystem" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9a6419"></path>
        </marker>
      </defs>
      <rect class="lane-bg lane-actor" x="18" y="18" width="${width - 36}" height="108" rx="10"></rect>
      <rect class="lane-bg lane-task" x="18" y="150" width="${width - 36}" height="190" rx="10"></rect>
      <rect class="lane-bg lane-system" x="18" y="382" width="${width - 36}" height="116" rx="10"></rect>
      <text class="lane-label" x="34" y="46">담당자</text>
      <text class="lane-label" x="34" y="180">업무 프로세스</text>
      <text class="lane-label" x="34" y="414">업무 시스템</text>
      ${actorEdges}
      ${systemEdges}
      ${taskEdges}
      ${actorMarkup}
      ${taskMarkup}
      ${systemMarkup}
    </svg>
    </div>
  `;
  $$(".node-card[data-task-id]").forEach((node) => {
    node.addEventListener("click", () => setActiveTask(node.dataset.taskId));
  });
  applyGraphZoom(width, graphHeight);
}

function applyGraphZoom(width, height) {
  const svg = $(".process-svg");
  const frame = $(".graph-frame");
  if (!svg || !frame) return;
  const zoom = state.graphZoom;
  svg.setAttribute("width", String(Math.round(width * zoom)));
  svg.setAttribute("height", String(Math.round(height * zoom)));
  svg.dataset.baseWidth = String(width);
  svg.dataset.baseHeight = String(height);
  svg.style.width = `${Math.round(width * zoom)}px`;
  svg.style.height = `${Math.round(height * zoom)}px`;
  frame.style.minWidth = `${Math.round(width * zoom)}px`;
  updateZoomControls();
}

function renderPromptExamples() {
  const select = $("#promptExampleSelect");
  if (!select) return;
  const used = getUsedExamples();
  const all = getAllExamples();
  let examples = all.filter((item) => !used.has(item.title)).slice(0, 5);
  if (examples.length < 5) {
    examples = examples.concat(createSupplementExamples(5 - examples.length, used, examples));
  }
  select.innerHTML = `<option value="">추천 예시…</option>` + examples.map((item, index) =>
    `<option value="${index}">${escapeHtml(item.title)} · ${escapeHtml(item.domain)}</option>`).join("");
  select.onchange = () => {
    if (select.value === "") return;
    const item = examples[Number(select.value)];
    if (!item) return;
    const promptInput = $("#promptInput");
    const titleInput = $("#taskTitleInput");
    if (promptInput) promptInput.value = item.text;
    if (titleInput) titleInput.value = item.title;
    state.selectedExampleTitle = item.title;
    previewExampleDomain(item);
  };
}

function trimLabel(label, length) {
  return label.length > length ? `${label.slice(0, length - 1)}...` : label;
}

function splitLabel(label, maxChars, maxLines) {
  const chars = Array.from(String(label || ""));
  const lines = [];
  let current = "";
  chars.forEach((char) => {
    if (current.length >= maxChars && char !== " ") {
      lines.push(current.trim());
      current = char;
    } else {
      current += char;
    }
  });
  if (current.trim()) lines.push(current.trim());
  if (lines.length > maxLines) {
    const clipped = lines.slice(0, maxLines);
    clipped[maxLines - 1] = trimLabel(clipped[maxLines - 1], Math.max(4, maxChars - 1));
    return clipped;
  }
  return lines.length ? lines : [""];
}

function svgTextLines(label, x, y, maxChars, maxLines, className = "", lineHeight = 15) {
  const lines = splitLabel(label, maxChars, maxLines);
  const classAttr = className ? ` class="${className}"` : "";
  return `
    <text${classAttr} x="${x}" y="${y}">
      ${lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeHtml(line)}</tspan>`).join("")}
    </text>
  `;
}

function renderTimeline() {
  const scenario = state.scenario;
  $("#visualization").innerHTML = `
    <div class="timeline">
      ${scenario.tasks.map((task) => `
        <div class="timeline-row">
          <div class="time-label">${escapeHtml(task.estimated_time)}</div>
          <button class="time-bar" type="button" data-task-id="${escapeHtml(task.id)}">
            <strong>${escapeHtml(task.phase)} · ${escapeHtml(task.title)}</strong><br>
            <span>${escapeHtml(actorName(scenario, task.actor_id))} · ${(task.system_ids || []).map((id) => escapeHtml(systemName(scenario, id))).join(", ")}</span>
          </button>
        </div>
      `).join("")}
    </div>
  `;
  $$(".time-bar").forEach((button) => {
    button.addEventListener("click", () => setActiveTask(button.dataset.taskId));
  });
}

function renderMatrix() {
  const scenario = state.scenario;
  const systems = scenario.systems;
  $("#visualization").innerHTML = `
    <table class="matrix-table">
      <thead>
        <tr>
          <th>업무 단계</th>
          <th>담당자</th>
          ${systems.map((system) => `<th>${escapeHtml(system.name)}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${scenario.tasks.map((task) => `
          <tr>
            <td><strong>${escapeHtml(task.phase)}</strong><br>${escapeHtml(task.title)}</td>
            <td>${escapeHtml(actorName(scenario, task.actor_id))}</td>
            ${systems.map((system) => `<td>${task.system_ids.includes(system.id) ? "<span class=\"cell-pill\">필수</span>" : ""}</td>`).join("")}
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderEvidence() {
  const scenario = state.scenario;
  $("#visualization").innerHTML = `
    <table class="evidence-table">
      <thead>
        <tr>
          <th>근거 단위</th>
          <th>제목</th>
          <th>영역</th>
          <th>시스템</th>
          <th>단계</th>
        </tr>
      </thead>
      <tbody>
        ${(scenario.evidence || []).map((item) => `
          <tr>
            <td>${escapeHtml(item.file_unit_id)}<br><span class="tag">${escapeHtml(item.evidence_type)}</span></td>
            <td>${escapeHtml(item.title)}</td>
            <td>${escapeHtml(item.domains)}</td>
            <td>${escapeHtml(item.systems)}</td>
            <td>${escapeHtml(item.stages)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderVisualization() {
  if (state.view === "timeline") renderTimeline();
  else if (state.view === "matrix") renderMatrix();
  else if (state.view === "evidence") renderEvidence();
  else renderGraph();
  updateZoomControls();
}

function renderAll() {
  renderSummary();
  renderReviewReturnBar();
  renderSimulationBrief();
  renderVisualization();
  renderRelatedWork();
  renderTaskDetail();
  renderInlineEvaluation();
}

function averageScore(evaluation) {
  const scores = Object.values(evaluation?.scores || {}).map(Number).filter((value) => value > 0);
  if (!scores.length) return "-";
  return (scores.reduce((sum, value) => sum + value, 0) / scores.length).toFixed(1);
}

function savedResultOverview(item) {
  const scenario = item?.scenario || {};
  const explicit = item?.overview || scenario.overview || scenario.summary;
  if (explicit) return trimLabel(String(explicit), 150);

  const tasks = asArray(scenario.tasks);
  const actors = asArray(scenario.actors).slice(0, 3).map((actor) => actor.name).filter(Boolean).join(", ");
  const stages = tasks.slice(0, 3).map((task) => task.phase || task.title).filter(Boolean).join(" -> ");
  const boundaries = asArray(scenario.human_review_boundaries).slice(0, 3).join(", ");
  const taskCount = tasks.length ? `${tasks.length}개 단계` : "업무 단계";
  const actorText = actors ? `주요 담당자는 ${actors}이며, ` : "";
  const boundaryText = boundaries ? ` 검토 필요 지점은 ${boundaries}입니다.` : "";
  const stageText = stages ? `${stages} 흐름의 ` : "";
  return trimLabel(`${actorText}${stageText}${taskCount}로 구성된 생성 업무입니다.${boundaryText}`, 150);
}

function selectedSavedResult() {
  const results = getSavedResults();
  return results.find((item) => item.id === state.activeSavedId) || results[0] || null;
}

function reviewingSavedResult() {
  if (!state.reviewingSavedId) return null;
  return getSavedResults().find((item) => item.id === state.reviewingSavedId) || null;
}

function renderReviewReturnBar() {
  const bar = $("#reviewReturnBar");
  if (!bar) return;
  const item = reviewingSavedResult();
  const show = state.page === "simulator" && Boolean(item);
  bar.hidden = !show;
  if (show) {
    $("#reviewReturnTitle").textContent = item.title || "저장된 생성 결과";
  }
}

function renderSavedResults() {
  const results = getSavedResults();
  const list = $("#savedResultList");
  const detail = $("#reviewDetail");
  if (!list || !detail) return;
  if (!state.activeSavedId && results[0]) state.activeSavedId = results[0].id;
  list.innerHTML = results.length ? results.map((item) => `
    <button class="saved-result-card ${state.activeSavedId === item.id ? "active" : ""}" type="button" data-saved-id="${escapeHtml(item.id)}">
      <strong>${escapeHtml(item.title)}</strong>
      <span class="saved-card-time">생성 ${escapeHtml(new Date(item.createdAt).toLocaleString("ko-KR"))}</span>
      <p>${escapeHtml(savedResultOverview(item))}</p>
    </button>
  `).join("") : `<p class="empty-note">아직 저장된 생성 결과가 없습니다. 생성 결과에서 저장하기를 누르면 이 목록에 추가됩니다.</p>`;
  $$(".saved-result-card").forEach((button) => {
    button.addEventListener("click", () => {
      const item = results.find((entry) => entry.id === button.dataset.savedId);
      if (item) loadSavedIntoView(item);
    });
  });
  renderReviewDetail();
  renderEvalResults();
}

// 저장된 결과/사례를 결과 화면으로 불러와 보면서 평가
function loadSavedIntoView(item) {
  if (!item || !item.scenario) return;
  state.activeSavedId = item.id;
  state.reviewingSavedId = null;
  state.scenario = item.scenario;
  state.taskId = item.scenario.tasks?.[0]?.id;
  state.generatedResult = item.markdown;
  state.generationStatus = "complete";
  state.generationMeta = {...(item.meta || {}), scenario_applied: true};
  state.currentGeneration = {
    result_id: item.result_id || item.id,
    title: item.title,
    prompt: item.prompt,
    example_title: item.example_title,
    scenario: item.scenario,
    markdown: item.markdown,
    requestPackage: item.requestPackage,
    meta: item.meta
  };
  state.currentSavedId = item.id;
  state.scenarioOrigin = item.kind === "case" ? "case" : "codex";
  renderAll();
  if (typeof renderCaseLibrary === "function") renderCaseLibrary();
  switchPage("simulator");
}

function activeSavedResultStrict() {
  if (!state.activeSavedId) return null;
  return getSavedResults().find((item) => item.id === state.activeSavedId) || null;
}

function defaultReviewerRole() {
  try { return localStorage.getItem("adminSimulatorReviewerRole.v1") || ""; } catch (_) { return ""; }
}

function evaluationFormHtml(item) {
  const evaluation = item.evaluation || emptyEvaluation();
  const roleValue = evaluation.reviewerRole || defaultReviewerRole();
  return `
    <form id="rubricForm" class="rubric-form">
      <label>
        평가자 역할
        <input name="reviewerRole" type="text" value="${escapeHtml(roleValue)}" placeholder="예: 초등 교무부장, 행정업무 담당 교사">
      </label>
      <div class="rubric-grid">
        ${RUBRIC_ITEMS.map((rubric) => {
          const cur = String(evaluation.scores?.[rubric.id] || "");
          return `
          <div class="rubric-item" role="group" aria-label="${escapeHtml(rubric.label)}">
            <span class="rubric-label">${escapeHtml(rubric.label)}</span>
            <div class="seg">
              ${[1, 2, 3, 4, 5].map((score) => `
                <label class="seg-opt" title="${score}점">
                  <input type="radio" name="${escapeHtml(rubric.id)}" value="${score}" ${cur === String(score) ? "checked" : ""} aria-label="${escapeHtml(rubric.label)} ${score}점">
                  <span>${score}</span>
                </label>`).join("")}
            </div>
          </div>`;
        }).join("")}
      </div>
      <label>
        종합 의견
        <textarea name="comment" rows="4" placeholder="실제 경험과 가까운 점, 어색한 점, 빠진 업무를 적어주세요.">${escapeHtml(evaluation.comment || "")}</textarea>
      </label>
      <label>
        수정·보완이 필요한 업무
        <textarea name="fieldCorrections" rows="3" placeholder="현장에서는 다르게 처리되는 절차나 담당자, 시스템을 적어주세요.">${escapeHtml(evaluation.fieldCorrections || "")}</textarea>
      </label>
      <div class="review-actions">
        <button class="primary-button compact-button" type="submit">평가 저장</button>
        <span class="save-state">${evaluation.updatedAt ? `${escapeHtml(new Date(evaluation.updatedAt).toLocaleString("ko-KR"))} 저장됨` : "아직 평가가 저장되지 않았습니다."}</span>
      </div>
    </form>`;
}

// 결과 화면 오른쪽: 보고 있는 업무를 같은 화면에서 평가
function renderInlineEvaluation() {
  const host = $("#inlineReviewForm");
  if (!host) return;
  const item = activeSavedResultStrict();
  if (!item) {
    host.innerHTML = `<p class="empty-note">${PHASE1
      ? "왼쪽 패널에서 업무 사례를 선택하면, 이 결과를 보면서 여기서 바로 평가할 수 있습니다."
      : "결과를 생성한 뒤 <strong>저장하기</strong>를 누르거나, ‘저장 목록’에서 항목을 선택하면 여기서 평가할 수 있습니다."}</p>`;
    return;
  }
  host.innerHTML = `
    <p class="eval-target">${escapeHtml(item.title)}</p>
    ${evaluationFormHtml(item)}
  `;
  const form = $("#rubricForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      saveEvaluation(item.id, new FormData(event.currentTarget));
    });
  }
}

// 평가 항목 정규화: {title, reviewerRole, scores, updatedAt}
function evalItemsFromSaved() {
  return getSavedResults()
    .filter((s) => s.evaluation && s.evaluation.updatedAt)
    .map((s) => ({ title: s.title, reviewerRole: s.evaluation.reviewerRole, scores: s.evaluation.scores || {}, updatedAt: s.evaluation.updatedAt }));
}

function renderResultsTable(items, scopeText, isServer) {
  const host = $("#evalResultsTable");
  if (!host) return;
  const scope = $("#evalResultsScope");
  if (scope) scope.textContent = scopeText;
  if (!items || !items.length) {
    host.innerHTML = `<p class="empty-note">아직 저장된 평가가 없습니다. 사례를 평가하면 여기에 누적됩니다.</p>`;
    return;
  }
  const rubric = RUBRIC_ITEMS;
  const colAvg = {};
  rubric.forEach((r) => { colAvg[r.id] = []; });
  const rows = items.map((it) => {
    const scores = it.scores || {};
    const nums = rubric.map((r) => Number(scores[r.id])).filter((n) => n > 0);
    rubric.forEach((r) => { const v = Number(scores[r.id]); if (v > 0) colAvg[r.id].push(v); });
    const avg = nums.length ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1) : "-";
    const when = it.updatedAt ? new Date(it.updatedAt).toLocaleString("ko-KR") : "-";
    return `<tr>
      <td class="er-title">${escapeHtml(it.title || "-")}</td>
      <td>${escapeHtml(it.reviewerRole || "-")}</td>
      ${rubric.map((r) => `<td>${escapeHtml(String(scores[r.id] || "-"))}</td>`).join("")}
      <td><strong>${avg}</strong></td>
      <td class="er-time">${escapeHtml(when)}</td>
    </tr>`;
  }).join("");
  const avgRow = `<tr class="er-avg">
    <td>평균</td><td></td>
    ${rubric.map((r) => { const a = colAvg[r.id]; return `<td>${a.length ? (a.reduce((x, y) => x + y, 0) / a.length).toFixed(1) : "-"}</td>`; }).join("")}
    <td></td><td></td>
  </tr>`;
  const note = isServer
    ? `이 표는 <strong>모든 참여자의 평가(서버 집계)</strong>입니다. 평가가 저장되면 모두가 같은 결과를 봅니다.`
    : `이 표는 <strong>이 브라우저에 저장된 평가</strong>입니다. 정적 사이트 특성상 방문자(다른 사람·기기)의 평가는 자동으로 합산·표시되지 않습니다. 전체 공유·합산은 별도 저장 백엔드가 필요합니다.`;
  host.innerHTML = `
    <div class="eval-results-scroll">
      <table class="eval-results">
        <thead><tr>
          <th>사례</th><th>평가자</th>
          ${rubric.map((r) => `<th title="${escapeHtml(r.label)}">${escapeHtml(r.label)}</th>`).join("")}
          <th>평균</th><th>시간</th>
        </tr></thead>
        <tbody>${rows}${avgRow}</tbody>
      </table>
    </div>
    <p class="empty-note">${note}</p>
  `;
}

// 평가 결과 보기. 기본은 이 브라우저 저장본. GAS 모드면 서버(시트)에서 전체 집계를 읽어 갱신.
function renderEvalResults() {
  if (!$("#evalResultsTable")) return;
  const local = evalItemsFromSaved();
  renderResultsTable(local, `${local.length}건 (이 브라우저 저장)`, false);
  if (GAS_MODE && window.google && window.google.script && window.google.script.run) {
    window.google.script.run
      .withSuccessHandler((rows) => {
        if (Array.isArray(rows)) renderResultsTable(rows, `${rows.length}건 (전체·서버 집계)`, true);
      })
      .withFailureHandler(() => { /* 서버 실패 시 로컬 표 유지 */ })
      .listEvaluations();
  }
}

// 저장 목록(02) 페이지: 선택 항목 요약 + 검토·평가 화면 안내(평가 폼은 결과 화면에 인라인)
function renderReviewDetail() {
  const detail = $("#reviewDetail");
  const item = selectedSavedResult();
  if (!detail) return;
  if (!item) {
    detail.innerHTML = `<p class="empty-note">저장된 결과·사례가 없습니다. 사례를 생성·저장하면 이 목록에 추가됩니다.</p>`;
    return;
  }
  const evaluation = item.evaluation || emptyEvaluation();
  const avg = averageScore(evaluation);
  detail.innerHTML = `
    <article class="review-summary">
      <span>${escapeHtml(item.example_title || "직접 입력")}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(trimLabel(item.prompt, 180))}</p>
    </article>
    <p class="review-status">
      평가 상태: ${evaluation.updatedAt ? `저장됨 (평균 ${escapeHtml(String(avg))})` : "미평가"}
    </p>
    <p class="empty-note">‘검토·평가 화면 열기’를 누르면 업무 프로세스를 보면서 같은 화면에서 평가할 수 있습니다.</p>
  `;
}

function saveEvaluation(id, formData) {
  const results = getSavedResults();
  const target = results.find((item) => item.id === id);
  if (!target) return;
  target.evaluation = {
    scores: Object.fromEntries(RUBRIC_ITEMS.map((rubric) => [rubric.id, formData.get(rubric.id) || ""])),
    comment: formData.get("comment") || "",
    fieldCorrections: formData.get("fieldCorrections") || "",
    reviewerRole: formData.get("reviewerRole") || "",
    updatedAt: new Date().toISOString()
  };
  saveResults(results);
  queueResearchEvent("evaluation_saved", target);
  renderInlineEvaluation();
  if ($("#caseLibraryList")) renderCaseLibrary();
  renderEvalResults();
  if (state.page === "review") renderSavedResults();
}

function switchPage(page) {
  state.page = page;
  $$(".nav-button").forEach((button) => button.classList.toggle("active", button.dataset.page === page));
  $("#simulatorPage").classList.toggle("active", page === "simulator");
  $("#reviewPage").classList.toggle("active", page === "review");
  if (page === "review") renderSavedResults();
  renderReviewReturnBar();
}

function bindEvents() {
  const simulateButton = $("#simulateButton");
  if (simulateButton) simulateButton.addEventListener("click", runSimulation);
  $$(".nav-button").forEach((button) => button.addEventListener("click", () => switchPage(button.dataset.page)));
  $$(".global-section-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (link.getAttribute("href") === "#reviewPage") switchPage("review");
      else switchPage("simulator");
    });
  });
  window.addEventListener("online", transmitResearchOutbox);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) transmitResearchOutbox();
  });
  $("#loadSavedButton").addEventListener("click", () => {
    const item = selectedSavedResult();
    if (item?.scenario) loadSavedIntoView(item);
  });
  $("#reviewReturnButton").addEventListener("click", () => {
    if (state.reviewingSavedId) state.activeSavedId = state.reviewingSavedId;
    switchPage("review");
  });
  $("#reviewReturnCloseButton").addEventListener("click", () => {
    state.reviewingSavedId = null;
    renderReviewReturnBar();
  });
  const exportButton = $("#exportCasesButton");
  if (exportButton) exportButton.addEventListener("click", exportCasesToJson);
  const onboardStart = $("#onboardStart");
  if (onboardStart) onboardStart.addEventListener("click", () => dismissOnboarding(true));
  const onboardSkip = $("#onboardSkip");
  if (onboardSkip) onboardSkip.addEventListener("click", () => dismissOnboarding(false));
  const onboardOverlay = $("#onboarding");
  if (onboardOverlay) {
    onboardOverlay.addEventListener("click", (event) => {
      if (event.target === onboardOverlay) dismissOnboarding(false);
    });
  }
  $("#clearSavedButton").addEventListener("click", () => {
    if (!confirm("저장된 생성 결과와 평가를 모두 삭제할까요?")) return;
    saveResults([]);
    state.activeSavedId = null;
    state.reviewingSavedId = null;
    renderSavedResults();
    renderReviewReturnBar();
  });
  $("#zoomOutButton").addEventListener("click", () => setGraphZoom(state.graphZoom - 0.1));
  $("#zoomInButton").addEventListener("click", () => setGraphZoom(state.graphZoom + 0.1));
  $("#zoomFitButton").addEventListener("click", fitGraphToView);
  $$(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".tab-button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.view = button.dataset.view;
      renderVisualization();
      updateZoomControls();
    });
  });
}

// ===== Phase 1 (사례 열람·평가) =====

function caseId(scenario) {
  return `case_${scenario.scenario_id}`;
}

function caseSummaryMarkdown(scenario) {
  const stages = scenario.seed_terms?.workflow_stages || [];
  const systems = scenario.seed_terms?.related_systems || [];
  const actors = (scenario.actors || []).map((a) => `- ${a.name}: ${a.role}`).join("\n");
  const tasks = (scenario.tasks || []).map((t, i) => `${i + 1}. (${t.phase}) ${t.title}`).join("\n");
  const related = (scenario.related_work || []).map((r) => `- ${r.title}`).join("\n");
  const boundaries = (scenario.human_review_boundaries || []).join(", ");
  return [
    `## ${scenario.title}`,
    `업무영역: ${scenario.work_domain}`,
    `단계: ${stages.join(" → ")}`,
    `관련 시스템: ${systems.join(", ")}`,
    "",
    "### 담당자",
    actors,
    "",
    "### 업무 단계",
    tasks,
    "",
    "### 관련 업무",
    related,
    "",
    `### 담당자 검토 필요 지점`,
    boundaries,
    "",
    "> 이 사례는 공개 문서 기반으로 로컬에서 생성·검수한 시뮬레이션이며, 현장 교사 평가로 검증·개선하는 1차 검증 대상입니다."
  ].join("\n");
}

function seedCaseLibrary() {
  const existing = getSavedResults();
  const byId = new Map(existing.map((item) => [item.id, item]));
  const merged = (DATA.scenarios || []).map((scenario) => {
    const id = caseId(scenario);
    const prev = byId.get(id);
    return {
      id,
      result_id: id,
      kind: "case",
      createdAt: prev?.createdAt || new Date().toISOString(),
      title: scenario.title,
      prompt: (scenario.prompt_examples && scenario.prompt_examples[0]) || `${scenario.work_domain} 업무 사례`,
      example_title: "검수 사례",
      scenario,
      markdown: caseSummaryMarkdown(scenario),
      requestPackage: null,
      meta: {origin: "phase1_case", validation_status: scenario.validation_status || "pending_field_validation"},
      evaluation: prev?.evaluation || emptyEvaluation()
    };
  });
  // 사례가 아닌 기존 저장 항목은 뒤에 보존
  const nonCases = existing.filter((item) => item.kind !== "case" && !DATA.scenarios.some((s) => caseId(s) === item.id));
  saveResults([...merged, ...nonCases]);
}

function loadCase(scenario) {
  state.scenario = scenario;
  state.taskId = scenario.tasks?.[0]?.id;
  state.activeSavedId = caseId(scenario);
  state.currentSavedId = caseId(scenario);
  state.scenarioOrigin = "case";
  renderAll();
  renderCaseLibrary();
  switchPage("simulator");
}

function renderCaseLibrary() {
  const list = $("#caseLibraryList");
  if (!list) return;
  const saved = getSavedResults();
  const evaluatedIds = new Set(saved.filter((s) => s.evaluation?.updatedAt).map((s) => s.id));
  list.innerHTML = (DATA.scenarios || []).map((scenario) => {
    const id = caseId(scenario);
    const active = state.activeSavedId === id;
    const done = evaluatedIds.has(id);
    return `
      <button class="case-lib-item ${active ? "active" : ""}" type="button" data-scenario-id="${escapeHtml(scenario.scenario_id)}">
        <strong>${escapeHtml(scenario.title)}</strong>
        <small>${escapeHtml(scenario.work_domain)}${done ? " · 평가완료" : ""}</small>
      </button>`;
  }).join("");
  $$(".case-lib-item").forEach((button) => {
    button.addEventListener("click", () => {
      const scenario = DATA.scenarios.find((s) => s.scenario_id === button.dataset.scenarioId);
      if (scenario) loadCase(scenario);
    });
  });
  const progress = $("#evalProgress");
  if (progress) {
    const total = (DATA.scenarios || []).length;
    const done = (DATA.scenarios || []).filter((s) => evaluatedIds.has(caseId(s))).length;
    progress.textContent = `평가 ${done} / 총 ${total}`;
    progress.classList.toggle("complete", total > 0 && done >= total);
  }
}

function setGenerationDisabled(disabled) {
  ["#taskTitleInput", "#promptInput", "#promptExampleSelect", "#simulateButton"].forEach((sel) => {
    const el = $(sel);
    if (el) el.disabled = disabled;
  });
  const tool = $("#generationTool");
  if (tool) tool.classList.toggle("disabled", disabled);
  const note = $("#genNote");
  if (note) {
    note.hidden = !disabled;
    note.classList.toggle("gen-note--paused", disabled);
    if (disabled) note.textContent = "사례 직접 생성 기능은 준비가 될 때까지 사용 정지 중입니다. 지금은 등록된 검수 사례를 보고 평가해 주세요.";
  }
}

function applyPhase1Ui() {
  document.body.classList.add("phase1");
  const lib = $("#caseLibrary");
  if (lib) lib.hidden = false;
  // 생성하기는 숨기지 않고 비활성화만 한다(준비용 기능)
  setGenerationDisabled(true);
  // 라벨을 평가 흐름에 맞게 조정
  const navBrowse = document.querySelector('.nav-button[data-page="simulator"] strong');
  if (navBrowse) navBrowse.textContent = "검토·평가";
  const navBrowseSmall = document.querySelector('.nav-button[data-page="simulator"] small');
  if (navBrowseSmall) navBrowseSmall.textContent = "사례를 보며 같은 화면에서 평가";
  const navReview = document.querySelector('.nav-button[data-page="review"] strong');
  if (navReview) navReview.textContent = "평가 결과";
  const navReviewSmall = document.querySelector('.nav-button[data-page="review"] small');
  if (navReviewSmall) navReviewSmall.textContent = "지금까지의 평가 결과 보기";
  const savedHead = document.querySelector('#reviewPage .module .module-head h2');
  if (savedHead) savedHead.textContent = "업무 사례 목록";
  // score-card 라벨을 검수 상태로
  const engineLabelEl = document.querySelector('.score-card--engine span');
  if (engineLabelEl) engineLabelEl.textContent = "검수 상태";
  seedCaseLibrary();
  renderCaseLibrary();
  if (DATA.scenarios && DATA.scenarios[0]) {
    state.activeSavedId = caseId(DATA.scenarios[0]);
  }
  maybeShowOnboarding();
}

// 검증자 첫 방문 온보딩(1회성)
function maybeShowOnboarding() {
  const overlay = $("#onboarding");
  if (!overlay) return;
  let seen = false;
  try { seen = Boolean(localStorage.getItem("adminSimulatorOnboarded.v1")); } catch (_) { seen = false; }
  if (seen) return;
  const roleInput = $("#onboardRole");
  if (roleInput) roleInput.value = defaultReviewerRole();
  overlay.hidden = false;
}

function dismissOnboarding(saveRole) {
  const overlay = $("#onboarding");
  if (saveRole) {
    const role = ($("#onboardRole")?.value || "").trim();
    try {
      localStorage.setItem("adminSimulatorOnboarded.v1", "1");
      if (role) localStorage.setItem("adminSimulatorReviewerRole.v1", role);
    } catch (_) { /* ignore */ }
    renderInlineEvaluation();
  } else {
    try { localStorage.setItem("adminSimulatorOnboarded.v1", "1"); } catch (_) { /* ignore */ }
  }
  if (overlay) overlay.hidden = true;
}

// 로컬(운영자) 전용: 검수한 사례를 배포용 scenarios.json 형식으로 내보내기(다운로드).
function exportCasesToJson() {
  const results = getSavedResults();
  const seen = new Set();
  const unique = [];
  for (const item of results) {
    const scenario = item && item.scenario;
    if (!scenario) continue;
    const key = scenario.scenario_id || scenario.title;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(scenario);
  }
  if (!unique.length) {
    alert("내보낼 사례가 없습니다. 먼저 사례를 생성·저장하세요.");
    return;
  }
  const date = new Date().toISOString().slice(0, 10);
  const payload = {
    version: `${date}.phase1`,
    build_note: {
      phase: "phase1",
      generation: "로컬에서 생성·검수한 사례 내보내기. 원문/허브 데이터는 포함하지 않음.",
      evidence_note: "evidence 항목은 비식별 업무 유형 참조이며 학교명·인명·원문 경로를 포함하지 않는다."
    },
    domain_catalog: DATA.domain_catalog || [],
    recommended_prompts: DATA.recommended_prompts || [],
    scenarios: unique
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "scenarios.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function boot() {
  if (window.__SCENARIOS__ && Array.isArray(window.__SCENARIOS__.scenarios)) {
    // GAS(HtmlService) 모드: 시나리오를 인라인 전역으로 받는다(fetch 불가).
    DATA = window.__SCENARIOS__;
  } else {
    try {
      const response = await fetch("./data/scenarios.json");
      if (response.ok) DATA = await response.json();
    } catch (error) {
      DATA = FALLBACK_DATA;
    }
  }
  state.scenario = DATA.scenarios[0];
  state.taskId = state.scenario.tasks[0].id;
  if (PHASE1) applyPhase1Ui();
  // 배포용 내보내기는 로컬(운영자) 모드에서만 노출
  const exportBtn = $("#exportCasesButton");
  if (exportBtn) exportBtn.hidden = PHASE1;
  renderPromptExamples();
  renderSavedResults();
  bindEvents();
  renderAll();
  transmitResearchOutbox();
}

boot();

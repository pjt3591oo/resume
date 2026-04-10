# 박정태(멍개) — Resume

macOS 데스크탑을 테마로 한 인터랙티브 웹 이력서입니다.
각 섹션은 독립된 "앱 윈도우"로 열리며, Dock에서 원하는 앱을 실행해볼 수 있습니다.

🔗 **Live**: [https://pjt3591oo.github.io/resume](https://pjt3591oo.github.io/resume)

---

## ✨ Features

- **macOS 데스크탑 UI** — 메뉴바 + 윈도우 + Dock으로 구성된 데스크탑 환경
- **다중 윈도우 앱** — About, Skills, Experience, Projects, Packages, Publications, Blog, Lectures, Growth, Contact 총 10개 앱을 개별 창으로 실행
- **윈도우 매니저**
  - 트래픽 라이트 버튼 (🔴 닫기 / 🟡 최소화 / 🟢 최대화)
  - 타이틀바 드래그로 이동, 더블클릭으로 최대화 토글
  - 클릭 시 포커스 및 z-index 자동 정렬 (비포커스 윈도우는 타이틀바 채도 낮춤)
  - 첫 오픈 시 cascade 배치
- **Dock**
  - 10개 앱 아이콘 + GitHub/Trash
  - 호버 시 확대 애니메이션 + 툴팁
  - 실행 중인 앱은 하단 점으로 표시
  - 포커스된 앱 아이콘을 다시 클릭하면 최소화 (macOS 동작)
- **메뉴바** — Apple 로고, 포커스된 앱 이름, 배터리/WiFi/검색 아이콘, 실시간 시계
- **다크 / 라이트 테마 토글** — `localStorage`에 선호 저장
- **반응형** — 모바일/태블릿 사이즈에서도 동작

---

## 🧱 Tech Stack

- **Vanilla HTML / CSS / JavaScript** — 빌드 도구 없이 단일 파일
- **Font Awesome** — 아이콘 (CDN)
- **Shields.io** — npm / PyPI 패키지 버전 배지

> 의도적으로 프레임워크를 배제해 single-file 정적 사이트로 유지합니다.

---

## 📁 Structure

```
resume/
├── index.html          # 전체 UI (HTML + CSS + JS 인라인)
├── docs/
│   ├── resume.pdf            # 이력서 PDF
│   └── career-description.pdf # 경력기술서 PDF
├── images/             # 저서 커버, 파비콘 등
├── resource/
│   └── video.mp4       # 소개 영상
└── README.md
```

---

## 🚀 Running Locally

별도의 빌드 과정이 없습니다. 아무 정적 서버로 열면 됩니다.

```bash
# Python
python3 -m http.server 8000

# Node (http-server)
npx http-server .

# 또는 그냥 브라우저로 index.html 열기
open index.html
```

---

## 🗂️ Apps

| 앱 | 내용 |
|---|---|
| 🧑 **About** | 프로필, 역할, 연락처 및 다운로드 버튼 |
| ⚡ **Skills** | 기술 스택 (Terminal 스타일 JSON 포함) |
| 📅 **Experience** | 회사별 타임라인 및 프로젝트 상세 |
| 📂 **Projects** | 사이드/오픈소스 프로젝트 |
| 📦 **Packages** | npm, PyPI 배포 패키지 |
| 📚 **Publications** | 저서 4권 |
| 📝 **Blog** | 기술 블로그 시리즈 |
| 🎓 **Lectures** | 강의 이력 |
| 🌱 **Growth** | 개발자 성장 스토리 |
| ✉️ **Contact** | 이메일, GitHub, 블로그, SO 링크 |

---

## 📬 Contact

- **Email** — pjt3591oo@gmail.com · pjt3591oo@naver.com
- **GitHub** — [@pjt3591oo](https://github.com/pjt3591oo)
- **Blog** — [blog.naver.com/pjt3591oo](https://blog.naver.com/pjt3591oo)
- **Stack Overflow** — [멍개 (mung)](https://stackoverflow.com/users/8667760/)

---

© 2025 박정태(멍개). Built with coffee ☕ on macOS-style UI.

import { type MouseEvent, useEffect, useState } from "react";

const heroSlides = [
  {
    eyebrow: "RE:IMAGINE THE ORDINARY",
    title: "버려진 것에서\n발견한 새로운 세계",
    description:
      "도시의 흔적과 예술이 만나는 곳, 수평선은 익숙한 사물을 낯선 시선으로 다시 바라봅니다.",
    image:
      "https://images.unsplash.com/photo-1677568543193-939ac5a32299?auto=format&fit=crop&w=2200&q=90",
  },
  {
    eyebrow: "ART · SPACE · EXPERIENCE",
    title: "예술이 머무는\n열린 문화 공간",
    description:
      "전시와 체험, 휴식이 자연스럽게 이어지는 오늘의 복합문화공간을 만나보세요.",
    image:
      "https://images.unsplash.com/photo-1723974591057-ccadada1f283?auto=format&fit=crop&w=2200&q=90",
  },
  {
    eyebrow: "A SUSTAINABLE PERSPECTIVE",
    title: "다시 쓰는 재료,\n다시 보는 일상",
    description:
      "폐기된 산업 재료에 상상력을 더해 지속 가능한 내일을 이야기합니다.",
    image:
      "https://images.unsplash.com/photo-1784397368570-d8e40f3d72df?auto=format&fit=crop&w=2200&q=90",
  },
];

const galleryImages = [
  {
    slug: "industrial-memory",
    title: "산업의 기억",
    src: "https://images.unsplash.com/photo-1789774465693-e6e3e5fe520c?auto=format&fit=crop&w=900&q=85",
    alt: "산업 소재로 만든 현대미술 조형물",
    description:
      "쓰임을 다한 산업 소재의 표면과 흔적을 그대로 살려 시간의 축적을 보여주는 설치 프로젝트입니다.",
    year: "2026",
  },
  {
    slug: "yellow-signal",
    title: "노란 신호",
    src: "https://images.unsplash.com/photo-1784913110373-b36c399adf58?auto=format&fit=crop&w=900&q=85",
    alt: "전시장에 설치된 노란색 설치 작품",
    description:
      "도시에서 수집한 구조물에 선명한 색을 더해 익숙한 공간의 감각을 새롭게 환기합니다.",
    year: "2025",
  },
  {
    slug: "surface-and-trace",
    title: "표면과 흔적",
    src: "https://images.unsplash.com/photo-1730646315525-093dcd342bcf?auto=format&fit=crop&w=900&q=85",
    alt: "벽면의 현대미술 작품",
    description:
      "찢고 덧붙이는 반복적인 행위를 통해 사라진 풍경과 남겨진 기억의 관계를 탐구한 전시입니다.",
    year: "2025",
  },
  {
    slug: "light-curve",
    title: "빛의 곡선",
    src: "https://images.unsplash.com/photo-1785004904178-0cd03e08a1f7?auto=format&fit=crop&w=900&q=85",
    alt: "자연광이 드는 곡선형 전시 공간",
    description:
      "시간에 따라 달라지는 자연광과 유연한 구조물이 만나 공간 자체가 하나의 작품이 됩니다.",
    year: "2024",
  },
  {
    slug: "small-companion",
    title: "작은 동행",
    src: "https://images.unsplash.com/photo-1598662149187-bfbd42c6ebf5?auto=format&fit=crop&w=900&q=85",
    alt: "재치 있는 고양이 조형 작품",
    description:
      "버려진 생활용품을 유쾌한 동물의 모습으로 재구성해 일상과 환경을 다시 바라보게 합니다.",
    year: "2024",
  },
];

const programs = [
  {
    slug: "upcycling-object",
    number: "01",
    category: "EXPERIENCE",
    title: "업사이클링 오브제",
    description: "버려진 재료를 관찰하고 나만의 작은 예술 작품으로 재탄생시킵니다.",
    schedule: "매주 토요일 14:00",
    audience: "성인 및 청소년",
    image:
      "https://images.unsplash.com/photo-1761403942462-04b8b97f1fe9?auto=format&fit=crop&w=900&q=85",
  },
  {
    slug: "discovery-docent",
    number: "02",
    category: "DOCENT TOUR",
    title: "발견의 시선",
    description: "도슨트와 함께 작품에 숨은 재료와 작가의 이야기를 발견합니다.",
    schedule: "화–일 11:00, 16:00",
    audience: "누구나",
    image:
      "https://images.unsplash.com/photo-1763046224157-4095b90a87cf?auto=format&fit=crop&w=900&q=85",
  },
  {
    slug: "weekend-family-lab",
    number: "03",
    category: "FAMILY LAB",
    title: "주말 창작 연구소",
    description: "아이와 어른이 함께 질문하고 표현하는 가족 참여형 프로그램입니다.",
    schedule: "매주 일요일 13:00",
    audience: "6–12세 어린이 동반 가족",
    image:
      "https://images.unsplash.com/photo-1788728782937-677f063b4c6c?auto=format&fit=crop&w=900&q=85",
  },
];

type DetailContent = {
  slug: string;
  type: "EXHIBITION" | "ARCHIVE" | "PROGRAM";
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  secondaryImage: string;
  details: { label: string; value: string }[];
  body: string[];
};

const currentExhibition: DetailContent = {
  slug: "material-memory",
  type: "EXHIBITION",
  eyebrow: "CURRENT EXHIBITION",
  title: "재료의 기억:\n두 번째 숨",
  description:
    "기능을 잃은 산업 재료가 여섯 작가의 손을 거쳐 저마다의 기억을 품은 작품으로 되살아납니다.",
  image:
    "https://images.unsplash.com/photo-1784397368570-d8e40f3d72df?auto=format&fit=crop&w=1800&q=90",
  secondaryImage:
    "https://images.unsplash.com/photo-1706042555112-4ae1b484a742?auto=format&fit=crop&w=1400&q=85",
  details: [
    { label: "기간", value: "2026. 04. 18 — 08. 30" },
    { label: "장소", value: "수평선 제1전시실" },
    { label: "관람", value: "무료" },
    { label: "참여 작가", value: "김하늘 외 5인" },
  ],
  body: [
    "녹슨 철판, 낡은 기계 부품, 공사장의 파편은 한때 도시의 움직임을 만들던 재료였습니다. 이번 전시는 역할을 다한 사물에 남은 시간과 노동의 흔적을 여섯 작가의 서로 다른 시선으로 바라봅니다.",
    "작가들은 재료를 새것처럼 감추는 대신 긁힘과 변색, 불규칙한 형태를 작품의 중요한 언어로 받아들입니다. 관람객은 익숙한 물질이 낯선 풍경으로 바뀌는 순간을 따라가며 버려진 것의 다음 가능성을 발견하게 됩니다.",
  ],
};

const detailContents: DetailContent[] = [
  currentExhibition,
  ...programs.map((program) => ({
    slug: program.slug,
    type: "PROGRAM" as const,
    eyebrow: program.category,
    title: program.title,
    description: program.description,
    image: program.image.replace("w=900", "w=1800"),
    secondaryImage:
      program.number === "01"
        ? "https://images.unsplash.com/photo-1663840502041-092fefbee4a3?auto=format&fit=crop&w=1400&q=85"
        : program.number === "02"
          ? "https://images.unsplash.com/photo-1683861763373-b62d946619ac?auto=format&fit=crop&w=1400&q=85"
          : "https://images.unsplash.com/photo-1636326094765-a991d83b9dce?auto=format&fit=crop&w=1400&q=85",
    details: [
      { label: "일정", value: program.schedule },
      { label: "대상", value: program.audience },
      { label: "장소", value: "수평선 창작 스튜디오" },
      { label: "소요 시간", value: "약 90분" },
    ],
    body: [
      `${program.title}는 결과보다 관찰하고 질문하는 과정에 집중하는 참여형 프로그램입니다. 전문 에듀케이터의 안내와 함께 재료의 성질을 살펴보고, 자유로운 방식으로 생각을 표현합니다.`,
      "모든 재료와 도구는 공간에서 준비합니다. 처음 참여하는 분도 편안하게 즐길 수 있으며, 완성한 작업은 가져가 일상에서 계속 감상할 수 있습니다.",
    ],
  })),
  ...galleryImages.map((archive) => ({
    slug: archive.slug,
    type: "ARCHIVE" as const,
    eyebrow: `ARCHIVE ${archive.year}`,
    title: archive.title,
    description: archive.description,
    image: archive.src.replace("w=900", "w=1800"),
    secondaryImage:
      "https://images.unsplash.com/photo-1771150538254-ae3d3e93db33?auto=format&fit=crop&w=1400&q=85",
    details: [
      { label: "연도", value: archive.year },
      { label: "유형", value: "기획 전시" },
      { label: "장소", value: "수평선 전시실" },
      { label: "기획", value: "수평선 큐레이터팀" },
    ],
    body: [
      archive.description,
      "수평선의 아카이브는 완성된 작품뿐 아니라 재료를 수집하고 공간을 구성하는 과정, 전시에 참여한 사람들의 대화까지 함께 기록합니다. 이 기록은 다음 프로젝트를 위한 새로운 출발점이 됩니다.",
    ],
  })),
];

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : ""}
      fill="none"
      viewBox="0 0 28 16"
    >
      <path d="M1 8h24M19 1l7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function DetailPage({
  content,
  onBack,
}: {
  content: DetailContent;
  onBack: () => void;
}) {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-stone-200 bg-stone-50/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-6 lg:px-12">
          <button className="group flex items-center gap-3 text-left" onClick={onBack}>
            <span className="grid size-10 place-items-center rounded-full border border-stone-950/60 text-xs font-semibold transition group-hover:bg-stone-950 group-hover:text-white">
              SH
            </span>
            <span className="hidden text-sm leading-tight font-semibold tracking-[0.16em] sm:block">
              수평선
              <small className="block text-[0.5rem] font-normal tracking-[0.25em] text-stone-500">
                CULTURE SPACE
              </small>
            </span>
          </button>
          <button
            className="flex items-center gap-3 text-sm font-medium transition hover:text-stone-500"
            onClick={onBack}
          >
            <Arrow direction="left" />
            목록으로
          </button>
        </div>
      </header>

      <section className="px-6 pt-36 pb-16 lg:px-12 lg:pt-44 lg:pb-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="section-label text-stone-500">{content.eyebrow}</p>
              <h1 className="mt-7 whitespace-pre-line text-5xl leading-[1.08] font-medium tracking-tight sm:text-6xl lg:text-8xl">
                {content.title}
              </h1>
            </div>
            <p className="max-w-xl text-lg leading-8 text-stone-600 lg:pb-2">
              {content.description}
            </p>
          </div>
        </div>
      </section>

      <div className="flex min-h-[460px] items-center justify-center bg-stone-200 lg:min-h-[620px]">
        <img
          className="max-h-[80vh] w-full object-contain"
          src={content.image}
          alt={content.title}
        />
      </div>

      <section className="px-6 py-24 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-screen-2xl gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-28">
          <div>
            <p className="section-label">INFORMATION</p>
            <dl className="mt-7 border-t border-stone-300">
              {content.details.map((detail) => (
                <div
                  className="grid grid-cols-[6rem_1fr] gap-4 border-b border-stone-300 py-5 text-sm"
                  key={detail.label}
                >
                  <dt className="text-stone-400">{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="section-label">ABOUT</p>
            <div className="mt-7 space-y-7">
              {content.body.map((paragraph) => (
                <p
                  className="text-xl leading-9 font-light text-stone-700 sm:text-2xl sm:leading-10"
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-950 px-6 py-20 text-white lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-screen-2xl gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div className="flex min-h-[440px] items-center justify-center bg-stone-900 sm:min-h-[560px]">
            <img
              className="max-h-[70vh] w-full object-contain"
              src={content.secondaryImage}
              alt={`${content.title} 상세 이미지`}
            />
          </div>
          <div className="lg:pb-3">
            <p className="section-label text-lime-300">A CLOSER LOOK</p>
            <p className="mt-7 text-3xl leading-tight font-medium sm:text-4xl">
              재료를 가까이 보고,
              <br />
              새로운 이야기를 발견하세요.
            </p>
            <p className="mt-6 max-w-md leading-7 text-white/55">
              수평선은 전시와 프로그램을 통해 익숙한 사물에 오래 머무는 시선을 제안합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center lg:px-12 lg:py-32">
        <p className="section-label text-stone-400">
          {content.type === "PROGRAM" ? "RESERVATION" : "VISIT SOOPYUNG"}
        </p>
        <p className="mt-6 text-3xl font-medium tracking-tight sm:text-5xl">
          {content.type === "PROGRAM" ? "함께 만드는 시간을 예약하세요" : "공간에서 직접 만나보세요"}
        </p>
        <button className="outline-button mt-10" onClick={onBack}>
          메인으로 돌아가기 <Arrow />
        </button>
      </section>
    </main>
  );
}

export default function App() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSlug, setActiveSlug] = useState(
    () => new URLSearchParams(window.location.search).get("content"),
  );

  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % heroSlides.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 20);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const handleNavigation = () => {
      setActiveSlug(new URLSearchParams(window.location.search).get("content"));
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  const moveSlide = (direction: number) => {
    setSlide(
      (current) => (current + direction + heroSlides.length) % heroSlides.length,
    );
  };

  const openDetail = (event: MouseEvent<HTMLAnchorElement>, slug: string) => {
    event.preventDefault();
    window.history.pushState({ detail: true }, "", `?content=${slug}`);
    setActiveSlug(slug);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const closeDetail = () => {
    if (window.history.state?.detail) {
      window.history.back();
      return;
    }

    window.history.replaceState({}, "", window.location.pathname);
    setActiveSlug(null);
    window.scrollTo(0, 0);
  };

  const activeContent = detailContents.find((content) => content.slug === activeSlug);

  if (activeContent) {
    return <DetailPage content={activeContent} onBack={closeDetail} />;
  }

  return (
    <main className="overflow-hidden bg-stone-50 text-stone-950">
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
          isScrolled
            ? "border-stone-200 bg-stone-50 text-stone-950"
            : "border-white/25 bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex h-24 max-w-screen-2xl items-center justify-between px-6 lg:px-12">
          <a className="group flex items-center gap-3" href="#top" aria-label="수평선 홈">
            <span
              className={`grid size-11 place-items-center rounded-full border text-sm font-semibold tracking-tight transition ${
                isScrolled
                  ? "border-stone-950/60 group-hover:bg-stone-950 group-hover:text-white"
                  : "border-white/70 group-hover:bg-white group-hover:text-stone-950"
              }`}
            >
              SH
            </span>
            <span className="hidden text-sm leading-tight font-semibold tracking-[0.16em] sm:block">
              수평선
              <small className="block text-[0.55rem] font-normal tracking-[0.25em] opacity-70">
                CULTURE SPACE
              </small>
            </span>
          </a>

          <nav className="hidden items-center gap-9 text-sm font-medium lg:flex" aria-label="주 메뉴">
            {["공간 소개", "전시", "체험", "대관", "프로젝트"].map((item) => (
              <a className="nav-link" href={`#${item}`} key={item}>
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-2 text-xs sm:flex">
              <button className="font-semibold underline underline-offset-4">KR</button>
              <span className="opacity-40">/</span>
              <button className="opacity-65 transition hover:opacity-100">EN</button>
            </div>
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              className="menu-button"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 flex items-center bg-stone-950 px-8 pt-24 text-white transition duration-500 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto w-full max-w-screen-xl">
          {["공간 소개", "전시", "체험", "대관", "프로젝트"].map((item, index) => (
            <a
              className="flex items-center justify-between border-b border-white/20 py-5 text-3xl font-medium"
              href={`#${item}`}
              key={item}
              onClick={() => setMenuOpen(false)}
            >
              <span>{item}</span>
              <span className="text-xs text-white/40">0{index + 1}</span>
            </a>
          ))}
        </div>
      </div>

      <section className="relative min-h-[780px] text-white" id="top">
        {heroSlides.map((item, index) => (
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === slide ? "opacity-100" : "opacity-0"
            }`}
            key={item.title}
          >
            <img className="size-full object-cover" src={item.image} alt="" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />
          </div>
        ))}

        <div className="relative z-10 mx-auto flex min-h-[780px] max-w-screen-2xl items-center px-6 pt-24 lg:px-12">
          <div className="max-w-3xl">
            <p className="mb-6 text-xs font-semibold tracking-[0.3em] text-lime-300">
              {heroSlides[slide].eyebrow}
            </p>
            <p
              className="whitespace-pre-line text-5xl leading-[1.12] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
              role="heading"
              aria-level={1}
            >
              {heroSlides[slide].title}
            </p>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              {heroSlides[slide].description}
            </p>
            <a
              className="outline-button mt-10"
              href="?content=material-memory"
              onClick={(event) => openDetail(event, "material-memory")}
            >
              전시 둘러보기
              <Arrow />
            </a>
          </div>
        </div>

        <div className="absolute inset-x-6 bottom-8 z-20 mx-auto flex max-w-[calc(100vw-3rem)] items-center justify-between border-t border-white/35 pt-6 lg:inset-x-12 lg:max-w-[calc(1536px-6rem)]">
          <div className="flex items-center gap-4 text-xs tabular-nums">
            <span>0{slide + 1}</span>
            <div className="h-px w-24 bg-white/30">
              <div
                className="h-px bg-white transition-all duration-500"
                style={{ width: `${((slide + 1) / heroSlides.length) * 100}%` }}
              />
            </div>
            <span className="text-white/55">0{heroSlides.length}</span>
          </div>
          <div className="flex gap-2">
            <button className="round-arrow" onClick={() => moveSlide(-1)} aria-label="이전 슬라이드">
              <Arrow direction="left" />
            </button>
            <button className="round-arrow" onClick={() => moveSlide(1)} aria-label="다음 슬라이드">
              <Arrow />
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-6 py-28 lg:px-12 lg:py-40" id="공간 소개">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="section-label">ABOUT SPACE</p>
            <p className="mt-7 text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
              쓸모를 다한 것들이
              <br />
              다시 빛나는 장소
            </p>
          </div>
          <div className="border-t border-stone-300 pt-7 lg:pt-0">
            <p className="max-w-3xl text-2xl leading-relaxed font-light text-stone-700 sm:text-3xl">
              수평선은 산업의 시간이 남긴 재료를 예술의 언어로 바꾸는 재생복합 문화공간입니다.
              전시를 보고, 직접 만들고, 천천히 머물며 일상 속 새로운 가능성을 발견합니다.
            </p>
            <a className="text-link mt-10" href="#footer">
              공간 이야기 <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-stone-950 text-white" id="전시">
        <div className="grid min-h-[720px] lg:grid-cols-2">
          <div className="relative min-h-[520px] overflow-hidden lg:min-h-full">
            <img
              className="size-full object-cover transition duration-700 hover:scale-105"
              src="https://images.unsplash.com/photo-1784397368570-d8e40f3d72df?auto=format&fit=crop&w=1400&q=90"
              alt="산업 금속을 활용한 설치 작품"
            />
            <span className="absolute top-8 left-8 rounded-full bg-lime-300 px-4 py-2 text-xs font-semibold text-stone-950">
              ON VIEW
            </span>
          </div>
          <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-20">
            <div>
              <p className="section-label text-lime-300">CURRENT EXHIBITION</p>
              <p
                className="mt-8 text-4xl leading-tight font-medium tracking-tight sm:text-5xl"
                role="heading"
                aria-level={2}
              >
                재료의 기억:
                <br />
                두 번째 숨
              </p>
              <p className="mt-8 max-w-lg leading-7 text-white/60">
                녹슨 철판, 낡은 기계 부품, 공사장의 파편. 기능을 잃은 재료가 여섯 작가의 손을
                거쳐 저마다의 기억을 품은 작품으로 되살아납니다.
              </p>
            </div>
            <div className="mt-16 border-t border-white/20 pt-7">
              <dl className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <dt className="mb-2 text-white/40">기간</dt>
                  <dd>2026. 04. 18 — 08. 30</dd>
                </div>
                <div>
                  <dt className="mb-2 text-white/40">장소</dt>
                  <dd>수평선 제1전시실</dd>
                </div>
              </dl>
              <a
                className="outline-button mt-10"
                href="?content=material-memory"
                onClick={(event) => openDetail(event, "material-memory")}
              >
                자세히 보기 <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 lg:py-40" id="gallery">
        <div className="mx-auto flex max-w-screen-2xl items-end justify-between px-6 lg:px-12">
          <div>
            <p className="section-label">ARCHIVE 2024 — 2026</p>
            <p
              className="mt-6 text-4xl font-medium tracking-tight sm:text-5xl"
              role="heading"
              aria-level={2}
            >
              낯선 시선의 기록
            </p>
          </div>
          <p className="hidden max-w-xs text-sm leading-6 text-stone-500 md:block">
            재료와 공간, 사람의 만남으로 완성된
            <br />
            수평선의 지난 장면을 살펴보세요.
          </p>
        </div>

        <div className="gallery-track mt-14" aria-label="전시 아카이브">
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <a
              className="gallery-card"
              href={`?content=${image.slug}`}
              key={`${image.src}-${index}`}
              onClick={(event) => openDetail(event, image.slug)}
            >
              <figure>
                <img src={image.src} alt={index < galleryImages.length ? image.alt : ""} />
                <figcaption>
                  <span>0{(index % galleryImages.length) + 1}</span>
                  <span>{image.alt}</span>
                </figcaption>
              </figure>
            </a>
          ))}
        </div>
        <p className="marquee-text mt-20" aria-hidden="true">
          RE:USE &nbsp; RE:THINK &nbsp; RE:CREATE &nbsp; RE:USE &nbsp; RE:THINK &nbsp;
          RE:CREATE
        </p>
      </section>

      <section className="bg-lime-300 px-6 py-28 lg:px-12 lg:py-36" id="체험">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex flex-col justify-between gap-8 border-b border-stone-950/30 pb-10 md:flex-row md:items-end">
            <div>
              <p className="section-label">PROGRAM</p>
              <p
                className="mt-6 text-4xl font-medium tracking-tight sm:text-5xl"
                role="heading"
                aria-level={2}
              >
                보고, 만지고, 함께 만드는 시간
              </p>
            </div>
            <a className="text-link" href="#footer">
              전체 프로그램 <Arrow />
            </a>
          </div>

          <div className="grid gap-px bg-stone-950/25 lg:grid-cols-3">
            {programs.map((program) => (
              <a
                className="program-card group block"
                href={`?content=${program.slug}`}
                key={program.number}
                onClick={(event) => openDetail(event, program.slug)}
              >
                <div className="program-image">
                  <img src={program.image} alt="" />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold tracking-widest">
                  <span>{program.category}</span>
                  <span>{program.number}</span>
                </div>
                <p className="mt-7 text-2xl font-semibold">{program.title}</p>
                <p className="mt-4 leading-7 text-stone-700">{program.description}</p>
                <span className="mt-8 inline-flex size-11 items-center justify-center rounded-full border border-stone-950 transition group-hover:bg-stone-950 group-hover:text-white">
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative grid min-h-[620px] place-items-center overflow-hidden bg-stone-900 px-6 py-24 text-center text-white"
        id="대관"
      >
        <img
          className="absolute inset-0 size-full object-cover opacity-45"
          src="https://images.unsplash.com/photo-1641124965087-4462d2aba7ae?auto=format&fit=crop&w=2200&q=90"
          alt=""
        />
        <div className="absolute inset-0 bg-stone-950/35" />
        <div className="relative max-w-3xl">
          <p className="section-label text-lime-300">YOUR NEXT SCENE</p>
          <p
            className="mt-7 text-4xl leading-tight font-medium tracking-tight sm:text-6xl"
            role="heading"
            aria-level={2}
          >
            당신의 다음 장면을 위한 공간
          </p>
          <p className="mx-auto mt-7 max-w-xl leading-7 text-white/70">
            전시, 브랜드 행사, 워크숍과 촬영까지. 오래 기억될 경험을 위한 독특한 공간을
            제안합니다.
          </p>
          <a className="outline-button mt-10" href="#footer">
            대관 문의하기 <Arrow />
          </a>
        </div>
      </section>

      <footer className="bg-stone-950 px-6 py-16 text-white lg:px-12" id="footer">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid gap-14 border-b border-white/20 pb-14 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-4xl font-semibold tracking-tight">수평선</p>
              <p className="mt-5 max-w-md leading-7 text-white/55">
                사물의 과거와 예술의 미래가 만나는
                <br />
                지속 가능한 복합문화공간
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
              <div>
                <p className="mb-5 text-white/35">VISIT</p>
                <p className="w-[120px] leading-7">화-일 10:00~18:00</p>
                <p className="leading-7">매주 월요일 휴관</p>
              </div>
              <div>
                <p className="mb-5 text-white/35">CONTACT</p>
                <p className="leading-7">02 1234 5678</p>
                <p className="leading-7">hello@soopyung.kr</p>
              </div>
              <div>
                <p className="mb-5 text-white/35">FOLLOW</p>
                <a className="block leading-7 hover:underline" href="#top">
                  Instagram
                </a>
                <a className="block leading-7 hover:underline" href="#top">
                  Youtube
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-7 text-xs text-white/35 sm:flex-row sm:justify-between">
            <p>© 2026 SOOPYUNG CULTURE SPACE</p>
            <p>서울특별시 성동구 성수이로 00</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

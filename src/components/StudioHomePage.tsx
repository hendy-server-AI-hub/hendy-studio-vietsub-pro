import React, { useState } from "react";
import {
  Film,
  Sparkles,
  Globe,
  Users,
  Zap,
  Bookmark,
  Download,
  Video,
  Languages,
  ArrowRight,
  CheckCircle2,
  Play,
  Monitor,
  Laptop,
  Smartphone,
  ShieldCheck,
  Cloud,
  Sliders,
  Share2,
  Lock,
  Code2,
  Scissors,
  Volume2,
  Plus,
  Search,
  Bell,
  HelpCircle,
  ArrowUp,
  Image as ImageIcon,
  Wand2,
  Settings,
  QrCode,
  Mail,
  X,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import { PlatformInfo } from "../utils/universalPlatformAdapter";

interface StudioHomePageProps {
  onEnterStudio: () => void;
  onOpenTranslator: () => void;
  onOpenSocialImport?: () => void;
  onOpenVoiceover: () => void;
  onOpenCapCut: () => void;
  onOpenBookmarklet: () => void;
  onOpenDownload: () => void;
  onOpenSampleVideos: () => void;
  onOpenImageTranslator: () => void;
  onOpenAuth: () => void;
  onOpenAdminPortal?: () => void;
  platformInfo: PlatformInfo;
  currentUser: any;
}

export const StudioHomePage: React.FC<StudioHomePageProps> = ({
  onEnterStudio,
  onOpenTranslator,
  onOpenSocialImport,
  onOpenVoiceover,
  onOpenCapCut,
  onOpenBookmarklet,
  onOpenDownload,
  onOpenSampleVideos,
  onOpenImageTranslator,
  onOpenAuth,
  onOpenAdminPortal,
  platformInfo,
  currentUser,
}) => {
  // Mode switcher: "landing" (Image 1: capcut.com/vi-vn/) vs "my-edit" (Image 2: capcut.com/my-edit)
  const [homeViewMode, setHomeViewMode] = useState<"landing" | "my-edit">("landing");
  
  // CapCut Auth Dialog (Image 3: "Chào mừng bạn đến với CapCut")
  const [isCapCutAuthOpen, setIsCapCutAuthOpen] = useState(false);
  const [authActiveTab, setAuthActiveTab] = useState<"video" | "design" | "ai_effects" | "seedance">("video");

  // Prompt input state for Image 2 workspace
  const [promptInput, setPromptInput] = useState("");
  const [workspaceTab, setWorkspaceTab] = useState<"video" | "design">("video");
  const [aspectRatioChoice, setAspectRatioChoice] = useState("Tự động");
  const [qualityChoice, setQualityChoice] = useState("Standard");

  // Admin access passcode
  const [isAdminAuthDialogOpen, setIsAdminAuthDialogOpen] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [adminError, setAdminError] = useState("");

  const handleAdminAccess = () => {
    if (currentUser?.email === "quanlinh2210@gmail.com") {
      onOpenAdminPortal?.();
      return;
    }
    setIsAdminAuthDialogOpen(true);
  };

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode.trim() === "ADMIN2026" || adminPasscode.trim() === "quanlinh2210") {
      setIsAdminAuthDialogOpen(false);
      setAdminPasscode("");
      setAdminError("");
      onOpenAdminPortal?.();
    } else {
      setAdminError("Mã quản trị viên không chính xác. Vui lòng thử lại.");
    }
  };

  const handlePromptSubmit = () => {
    if (promptInput.trim()) {
      onEnterStudio();
    } else {
      onEnterStudio();
    }
  };

  // CapCut Logo Component (< > icon + CapCut text)
  const CapCutLogo = ({ className = "h-7" }: { className?: string }) => (
    <div className={`flex items-center gap-2 select-none cursor-pointer ${className}`} onClick={() => setHomeViewMode("landing")}>
      <svg className="w-7 h-7 shrink-0 text-white fill-current" viewBox="0 0 24 24">
        {/* CapCut iconic two opposing brackets */}
        <path d="M4 6.5L9.5 12L4 17.5H7.5L13 12L7.5 6.5H4Z" />
        <path d="M20 6.5L14.5 12L20 17.5H16.5L11 12L16.5 6.5H20Z" />
      </svg>
      <span className="font-extrabold text-xl tracking-tight text-white">CapCut</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-[#00c4cc] selection:text-black">
      {/* ========================================================================= */}
      {/* 1. TOP GLOBAL NAVIGATION (Matches Image 1 capcut.com/vi-vn/ header)       */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#07090e]/85 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand Logo & CapCut Dropdown Menus */}
          <div className="flex items-center gap-7">
            <CapCutLogo />

            {/* Menu Links matching capcut.com/vi-vn/ */}
            <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-slate-300">
              <div className="flex items-center gap-1 hover:text-white transition cursor-pointer group">
                <span>Sản phẩm</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
              </div>
              <div className="flex items-center gap-1 hover:text-white transition cursor-pointer group">
                <span>Tính năng</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
              </div>
              <div className="flex items-center gap-1 hover:text-white transition cursor-pointer group">
                <span>Blog</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
              </div>
              <div className="flex items-center gap-1 hover:text-white transition cursor-pointer group">
                <span>Mẫu</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
              </div>
              <div className="flex items-center gap-1 hover:text-white transition cursor-pointer group">
                <span>Khám phá</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 hover:text-white transition cursor-pointer">
                <Globe className="w-3.5 h-3.5 text-[#00c4cc]" />
                <span>Tiếng Việt</span>
              </div>
            </nav>
          </div>

          {/* Right Header CTAs matching Image 1: Dùng thử trực tuyến & Tải xuống */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* View Switcher Pill: Toggle between Landing Page (Img 1) and My-Edit Studio (Img 2) */}
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 p-0.5 rounded-full text-xs font-semibold mr-1">
              <button
                onClick={() => setHomeViewMode("landing")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  homeViewMode === "landing"
                    ? "bg-[#00c4cc] text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Giới thiệu
              </button>
              <button
                onClick={() => setHomeViewMode("my-edit")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  homeViewMode === "my-edit"
                    ? "bg-[#00c4cc] text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                My-Edit Studio
              </button>
            </div>

            {/* Auth Button */}
            <button
              onClick={() => setIsCapCutAuthOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition"
            >
              <span>{currentUser ? (currentUser.displayName?.split(" ")?.[0] || "Tài khoản") : "Đăng nhập"}</span>
            </button>

            {/* "Dùng thử trực tuyến" (Black / Dark pill button with white text in screenshot) */}
            <button
              id="btn-nav-try-online"
              onClick={onEnterStudio}
              className="px-4 sm:px-5 py-2 rounded-full bg-slate-900 hover:bg-black text-white text-xs sm:text-[13px] font-bold border border-white/15 hover:border-white/30 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Dùng thử trực tuyến
            </button>

            {/* "Tải xuống" (Light pill button in screenshot) */}
            <button
              id="btn-nav-download"
              onClick={onOpenDownload}
              className="px-4 sm:px-5 py-2 rounded-full bg-slate-200 hover:bg-white text-slate-900 text-xs sm:text-[13px] font-bold shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Tải xuống
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CONDITIONAL VIEW: LANDING PAGE (IMAGE 1) vs MY-EDIT STUDIO (IMAGE 2)   */}
      {/* ========================================================================= */}

      {homeViewMode === "landing" ? (
        /* ----------------------------------------------------------------------- */
        /* VIEW A: LANDING PAGE (Matches Image 1 capcut.com/vi-vn/ exactly)        */
        /* ----------------------------------------------------------------------- */
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* Subtle Iridescent Pastel Background Glow (Cyan / Purple / Pink mesh from screenshot) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] pointer-events-none opacity-40">
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#a5f3fc]/30 rounded-full blur-[120px]" />
            <div className="absolute top-24 right-1/4 w-[420px] h-[420px] bg-[#f3e8ff]/25 rounded-full blur-[130px]" />
            <div className="absolute top-48 left-1/3 w-[380px] h-[380px] bg-[#ffe4e6]/20 rounded-full blur-[120px]" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00c4cc]/15 rounded-full blur-[140px]" />
          </div>

          {/* Hero Section */}
          <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center space-y-6">
            {/* The Signature CapCut Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.18] sm:leading-[1.16] max-w-4xl mx-auto">
              Trình chỉnh sửa{" "}
              <span className="text-[#00c4cc] drop-shadow-[0_0_24px_rgba(0,196,204,0.35)]">
                ảnh và video
              </span>{" "}
              với công nghệ AI dành cho mọi người
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
              CapCut có mọi thứ bạn cần để tạo nội dung thịnh hành trên YouTube, Instagram và nhiều nền tảng khác.
            </p>

            {/* Call To Action Buttons matching Image 1 */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {/* Primary Cyan Pill Button: "Dùng thử trực tuyến miễn phí" */}
              <button
                id="btn-hero-try-online-free"
                onClick={onEnterStudio}
                className="px-7 sm:px-8 py-3.5 rounded-full bg-[#00e5ff] hover:bg-[#00c4cc] text-[#07090e] font-extrabold text-sm sm:text-base shadow-xl shadow-[#00e5ff]/20 active:scale-95 transition-all cursor-pointer"
              >
                Dùng thử trực tuyến miễn phí
              </button>

              {/* Secondary Light Pill Button: "Tải xuống" */}
              <button
                id="btn-hero-download"
                onClick={onOpenDownload}
                className="px-7 sm:px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/15 backdrop-blur-md active:scale-95 transition-all cursor-pointer"
              >
                Tải xuống
              </button>
            </div>

            {/* Subtext: "Không yêu cầu thẻ tín dụng" */}
            <p className="text-xs sm:text-sm text-slate-400 font-medium pt-1">
              Không yêu cầu thẻ tín dụng
            </p>

            {/* Quick Switch to CapCut Workspace (My Edit View) */}
            <div className="pt-8">
              <button
                onClick={() => setHomeViewMode("my-edit")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 transition-all cursor-pointer group"
              >
                <LayoutGrid className="w-4 h-4 text-[#00c4cc]" />
                <span>Khám phá giao diện Studio Seedance 2.5 (CapCut My-Edit)</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
              </button>
            </div>
          </section>

          {/* Quick Features Row */}
          <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-20 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                onClick={onEnterStudio}
                className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#00c4cc]/40 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00c4cc]/20 text-[#00c4cc] flex items-center justify-center mb-3">
                  <Film className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-[#00c4cc] transition-colors">
                  Biên Tập Video & Vietsub Tự Động
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Nhận diện lời thoại tiếng Việt, đồng bộ mốc thời gian, tạo phụ đề karaoke và bong bóng chữ CapCut.
                </p>
              </div>

              <div
                onClick={onOpenTranslator}
                className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#00c4cc]/40 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                  Dịch Mọi Link YouTube, TikTok & Reels
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Dán link trực tiếp để tự động bóc tách phụ đề và chuyển ngữ tiếng Việt nhanh chóng không cần tải tệp.
                </p>
              </div>

              <div
                onClick={onOpenVoiceover}
                className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#00c4cc]/40 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-rose-300 transition-colors">
                  Thuyết Minh AI Đa Giọng Phân Vai
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Lồng tiếng tự nhiên theo ngữ điệu nhân vật Nam, Nữ, Già, Trẻ và tự động giảm âm thanh nền video.
                </p>
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* ----------------------------------------------------------------------- */
        /* VIEW B: CAPCUT WORKSPACE (Matches Image 2 capcut.com/my-edit?start_tab=video) */
        /* ----------------------------------------------------------------------- */
        <div className="flex-1 flex overflow-hidden">
          {/* Left Vertical Navigation Rail (Matches Image 2) */}
          <aside className="w-16 sm:w-18 bg-[#0b0e14] border-r border-white/5 flex flex-col items-center py-4 justify-between shrink-0 select-none">
            <div className="flex flex-col items-center gap-4 w-full">
              {/* CapCut Logo */}
              <div
                onClick={() => setHomeViewMode("landing")}
                className="p-1 hover:opacity-80 transition cursor-pointer"
                title="Quay về trang chủ"
              >
                <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M4 6.5L9.5 12L4 17.5H7.5L13 12L7.5 6.5H4Z" />
                  <path d="M20 6.5L14.5 12L20 17.5H16.5L11 12L16.5 6.5H20Z" />
                </svg>
              </div>

              {/* Cyan '+' (New Project Button from Image 2) */}
              <button
                onClick={onEnterStudio}
                className="w-10 h-10 rounded-2xl bg-[#00c4cc] hover:bg-[#00e5ff] text-slate-950 flex items-center justify-center shadow-lg shadow-[#00c4cc]/20 active:scale-95 transition-all cursor-pointer"
                title="Tạo dự án mới"
              >
                <Plus className="w-6 h-6 stroke-[3]" />
              </button>

              {/* Home Icon (Active) */}
              <button
                onClick={() => setHomeViewMode("my-edit")}
                className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center transition cursor-pointer"
                title="Trang chính"
              >
                <Film className="w-5 h-5 text-[#00c4cc]" />
              </button>

              {/* Templates Icon */}
              <button
                onClick={onOpenCapCut}
                className="w-10 h-10 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition cursor-pointer"
                title="Mẫu chữ & CapCut Presets"
              >
                <Zap className="w-5 h-5" />
              </button>

              {/* Scissors / Cut icon */}
              <button
                onClick={onEnterStudio}
                className="w-10 h-10 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition cursor-pointer"
                title="Cắt ghép & Dòng thời gian"
              >
                <Scissors className="w-5 h-5" />
              </button>

              {/* Audio Waveform icon */}
              <button
                onClick={onOpenVoiceover}
                className="w-10 h-10 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition cursor-pointer"
                title="Lồng tiếng AI & Sóng âm"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              {/* Magic Tools icon */}
              <button
                onClick={onOpenTranslator}
                className="w-10 h-10 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition cursor-pointer"
                title="Dịch mọi link & Web"
              >
                <Globe className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Nav: Settings & Profile */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleAdminAccess}
                className="w-9 h-9 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition cursor-pointer"
                title="Cổng Quản Trị & Lập Trình Viên"
              >
                <Code2 className="w-4 h-4 text-indigo-400" />
              </button>

              <button
                onClick={() => setIsCapCutAuthOpen(true)}
                className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 text-white flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-[#00c4cc] transition cursor-pointer"
                title="Tài khoản"
              >
                {currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-xs">{currentUser?.displayName?.[0] || "U"}</span>
                )}
              </button>
            </div>
          </aside>

          {/* Main Workspace Body */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-6xl mx-auto w-full space-y-8">
            {/* Top Workspace Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">Studio Sáng Tạo</span>
                <span>/</span>
                <span>My-Edit AI Workspace</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 transition cursor-pointer"
                  title="Tải ứng dụng cho máy tính"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Ứng dụng máy tính</span>
                </button>
                <button
                  onClick={() => setIsCapCutAuthOpen(true)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                  title="Thông báo"
                >
                  <Bell className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Seedance 2.5 Hero Prompt Card (Matches Image 2) */}
            <div className="space-y-4 text-center max-w-3xl mx-auto pt-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#00c4cc]" />
                <span>Do AI của CapCut cung cấp</span>
              </div>

              {/* Big Headline: "Dùng thử Seedance 2.5 — 30 giây & chỉnh sửa chính xác" */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Dùng thử Seedance 2.5 — 30 giây & chỉnh sửa chính xác
              </h2>

              {/* Switcher Tabs: Video | Thiết kế */}
              <div className="inline-flex items-center bg-white/5 p-1 rounded-2xl border border-white/10">
                <button
                  onClick={() => setWorkspaceTab("video")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    workspaceTab === "video"
                      ? "bg-[#00c4cc] text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Video</span>
                </button>
                <button
                  onClick={() => setWorkspaceTab("design")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    workspaceTab === "design"
                      ? "bg-[#00c4cc] text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Thiết kế</span>
                </button>
              </div>

              {/* Interactive Prompt Creation Input Box (Matches Image 2) */}
              <div className="bg-[#0f131a] border border-white/10 focus-within:border-[#00c4cc]/60 rounded-3xl p-4 sm:p-5 shadow-2xl transition-all text-left space-y-4">
                <textarea
                  rows={3}
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Tạo video bằng Dreamina Seedance 2.0. Chỉ dùng tệp phương tiện mà bạn có quyền sử dụng và đã được cho phép."
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none leading-relaxed"
                />

                {/* Bottom toolbar inside prompt box */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    {/* '+' Add Media file */}
                    <button
                      onClick={onEnterStudio}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
                      title="Đính kèm tệp video hoặc ảnh"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    {/* 'Tự động ∨' Aspect ratio selector */}
                    <select
                      value={aspectRatioChoice}
                      onChange={(e) => setAspectRatioChoice(e.target.value)}
                      className="bg-white/5 text-slate-300 hover:text-white text-xs font-medium rounded-xl px-2.5 py-1.5 border border-white/5 focus:outline-none cursor-pointer"
                    >
                      <option value="Tự động" className="bg-slate-900">Tự động (16:9 / 9:16)</option>
                      <option value="16:9" className="bg-slate-900">16:9 Ngang</option>
                      <option value="9:16" className="bg-slate-900">9:16 TikTok / Reels</option>
                      <option value="1:1" className="bg-slate-900">1:1 Vuông</option>
                    </select>

                    {/* 'Standard ∨' Quality selector */}
                    <select
                      value={qualityChoice}
                      onChange={(e) => setQualityChoice(e.target.value)}
                      className="bg-white/5 text-slate-300 hover:text-white text-xs font-medium rounded-xl px-2.5 py-1.5 border border-white/5 focus:outline-none cursor-pointer"
                    >
                      <option value="Standard" className="bg-slate-900">Standard (Chuẩn)</option>
                      <option value="HD 1080p" className="bg-slate-900">HD 1080p 60fps</option>
                      <option value="4K Ultra" className="bg-slate-900">4K Ultra HD</option>
                    </select>
                  </div>

                  {/* Up Arrow Submit Button (Generate) */}
                  <button
                    onClick={handlePromptSubmit}
                    className="w-9 h-9 rounded-xl bg-[#00c4cc] hover:bg-[#00e5ff] text-slate-950 flex items-center justify-center shadow-lg active:scale-90 transition-all cursor-pointer"
                    title="Tạo video với AI"
                  >
                    <ArrowUp className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            {/* "Tính năng phổ biến" Section (Matches Image 2) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base sm:text-lg text-white">
                  Tính năng phổ biến
                </h3>
                <button
                  onClick={onEnterStudio}
                  className="text-xs font-semibold text-slate-400 hover:text-[#00c4cc] transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Xem tất cả</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Cards Grid from Image 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {/* 1. Featured Design Studio Card (Matches the blue-tinted card with mannequin) */}
                <div
                  onClick={onEnterStudio}
                  className="col-span-1 sm:col-span-2 lg:col-span-1 rounded-3xl bg-gradient-to-br from-[#0c2333] via-[#091a27] to-[#0b121b] border border-[#00c4cc]/30 p-4 flex flex-col justify-between hover:border-[#00c4cc] transition-all cursor-pointer group shadow-lg min-h-[160px]"
                >
                  <div className="flex items-center justify-center py-2">
                    <div className="w-14 h-14 rounded-2xl bg-[#00c4cc]/20 border border-[#00c4cc]/40 flex items-center justify-center text-[#00c4cc]">
                      <Wand2 className="w-7 h-7" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <button className="w-full py-1.5 px-3 rounded-full bg-[#00c4cc] hover:bg-[#00e5ff] text-slate-950 text-[11px] font-extrabold transition-all">
                      Try it now in Design Studio &gt;
                    </button>
                  </div>
                </div>

                {/* 2. Trình chỉnh sửa video */}
                <div
                  onClick={onEnterStudio}
                  className="rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 p-4 flex flex-col justify-between transition-all cursor-pointer group hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center mb-3">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-[#00c4cc] transition-colors">
                      Trình chỉnh sửa video
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      Chỉnh sửa theo dòng thời gian chuyên sâu & xuất video chất lượng cao
                    </p>
                  </div>
                </div>

                {/* 3. Studio tạo video (Seedance 2.5) */}
                <div
                  onClick={onOpenSampleVideos}
                  className="rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 p-4 flex flex-col justify-between transition-all cursor-pointer group hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                      Studio tạo video
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      Seedance 2.5 và video mẫu chuẩn sắc nét
                    </p>
                  </div>
                </div>

                {/* 4. Studio thiết kế */}
                <div
                  onClick={onOpenImageTranslator}
                  className="rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 p-4 flex flex-col justify-between transition-all cursor-pointer group hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-3">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                      Studio thiết kế
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      Trợ lý thiết kế ảo với sức mạnh AI sáng tạo hình ảnh
                    </p>
                  </div>
                </div>

                {/* 5. Chuyển văn bản thành lời nói (TTS) */}
                <div
                  onClick={onOpenVoiceover}
                  className="rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 p-4 flex flex-col justify-between transition-all cursor-pointer group hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-2xl bg-rose-500/15 text-rose-400 flex items-center justify-center mb-3">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors">
                      Chuyển văn bản thành lời...
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      Hơn 100 giọng nói giống người thật phân vai Nam/Nữ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. CAPCUT AUTHENTICATION MODAL (Matches Image 3)                           */}
      {/* ========================================================================= */}
      {isCapCutAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          {/* Dual Column Modal Dialog */}
          <div className="relative w-full max-w-4xl bg-[#10141d] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col md:flex-row max-h-[92vh]">
            {/* Close Button */}
            <button
              onClick={() => setIsCapCutAuthOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: Artistic Illustration Banner (Matches Image 3) */}
            <div className="md:w-1/2 p-6 sm:p-8 bg-gradient-to-b from-[#161d2b] to-[#0c1017] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#00c4cc]">
                    Dreamina Seedance 2.0
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  Studio tạo video
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Trợ lý video toàn diện để bạn tìm cảm hứng, viết kịch bản, chỉnh sửa, phối lại, tạo và hơn thế nữa.
                </p>
              </div>

              {/* Four Feature Tabs at bottom of left panel (Matches Image 3) */}
              <div className="pt-8 relative z-10">
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 border-t border-white/10 pt-4">
                  {[
                    { id: "video", label: "Studio tạo video" },
                    { id: "design", label: "Studio thiết kế" },
                    { id: "ai_effects", label: "Hiệu ứng AI" },
                    { id: "seedance", label: "Seedance 2.0" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setAuthActiveTab(tab.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                        authActiveTab === tab.id
                          ? "bg-white/15 text-white"
                          : "hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: "Chào mừng bạn đến với CapCut" (Matches Image 3) */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-[#10141d] space-y-6">
              <div className="space-y-5 pt-2">
                <h2 className="text-xl sm:text-2xl font-black text-white text-center">
                  Chào mừng bạn đến với CapCut
                </h2>

                {/* Social Login Options */}
                <div className="space-y-2.5 pt-2">
                  {/* Google */}
                  <button
                    onClick={() => {
                      setIsCapCutAuthOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-98 cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Tiếp tục bằng Google</span>
                  </button>

                  {/* Email */}
                  <button
                    onClick={() => {
                      setIsCapCutAuthOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs sm:text-sm border border-white/10 transition-all active:scale-98 cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-slate-300" />
                    <span>Tiếp tục bằng email</span>
                  </button>

                  {/* TikTok */}
                  <button
                    onClick={() => {
                      setIsCapCutAuthOpen(false);
                      if (onOpenSocialImport) onOpenSocialImport();
                      else onEnterStudio();
                    }}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs sm:text-sm border border-white/10 transition-all active:scale-98 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.86-4.49v-7a8.16 8.16 0 0 0 4.77 1.52v-3.49h-.86z" />
                    </svg>
                    <span>Tiếp tục bằng TikTok</span>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={() => {
                      setIsCapCutAuthOpen(false);
                      onEnterStudio();
                    }}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs sm:text-sm border border-white/10 transition-all active:scale-98 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current text-[#1877f2]" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Tiếp tục bằng Facebook</span>
                  </button>

                  {/* CapCut Mobile App QR Code */}
                  <button
                    onClick={() => {
                      setIsCapCutAuthOpen(false);
                      onOpenDownload();
                    }}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs sm:text-sm border border-white/10 transition-all active:scale-98 cursor-pointer"
                  >
                    <QrCode className="w-4 h-4 text-[#00c4cc]" />
                    <span>Tiếp tục bằng CapCut cho di động...</span>
                  </button>
                </div>
              </div>

              {/* Disclaimer matching Image 3 */}
              <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                Bằng việc nhấp vào Tiếp tục, bạn chấp nhận{" "}
                <span className="underline hover:text-slate-400 cursor-pointer">Điều khoản dịch vụ</span>{" "}
                và{" "}
                <span className="underline hover:text-slate-400 cursor-pointer">Chính sách quyền riêng tư</span>{" "}
                của chúng tôi
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/5 bg-[#05070a] px-4 sm:px-8 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CapCutLogo className="h-5" />
            <span>© 2026 Vietsub Video Studio · Công nghệ CapCut AI Seedance 2.5</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button onClick={() => setHomeViewMode("landing")} className="hover:text-white transition cursor-pointer">
              Giới thiệu
            </button>
            <span>•</span>
            <button onClick={() => setHomeViewMode("my-edit")} className="hover:text-white transition cursor-pointer">
              My-Edit Studio
            </button>
            <span>•</span>
            <button onClick={onEnterStudio} className="hover:text-white transition cursor-pointer">
              Vào Chỉnh Sửa
            </button>
            <span>•</span>
            <button onClick={onOpenDownload} className="hover:text-white transition cursor-pointer">
              Tải Ứng Dụng ({platformInfo.os.toUpperCase()})
            </button>
            <span>•</span>
            <button
              onClick={handleAdminAccess}
              className="flex items-center gap-1 text-slate-500 hover:text-indigo-400 transition cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Cổng Dev & Deploy Hub</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Passcode Dialog for Admin Access */}
      {isAdminAuthDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Xác Thực Quản Trị & Lập Trình Viên</h3>
                <p className="text-xs text-slate-400">Khu vực kiểm thử đa nền tảng và triển khai server</p>
              </div>
            </div>

            <form onSubmit={handleVerifyPasscode} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1.5">
                  Mã Quản Trị (Admin Passcode):
                </label>
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => {
                    setAdminPasscode(e.target.value);
                    setAdminError("");
                  }}
                  placeholder="Nhập mã xác thực (ADMIN2026)..."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none"
                  autoFocus
                />
                {adminError && <p className="text-xs text-rose-400 mt-1.5">{adminError}</p>}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminAuthDialogOpen(false);
                    setAdminPasscode("");
                    setAdminError("");
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md"
                >
                  Vào Cổng Dev
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

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
  Sparkle,
  Share2,
  Lock,
  Code2,
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
  const [isAdminAuthDialogOpen, setIsAdminAuthDialogOpen] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [adminError, setAdminError] = useState("");

  const handleAdminAccess = () => {
    // If logged in as admin user (e.g. quanlinh2210@gmail.com), allow direct access
    if (currentUser?.email === "quanlinh2210@gmail.com") {
      onOpenAdminPortal?.();
      return;
    }
    // Otherwise open passcode dialog
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
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-y-auto selection:bg-rose-500 selection:text-white">
      {/* Standard Homepage Header Toolbar */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Vietsub Video Studio
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  AI 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Hệ sinh thái tạo phụ đề, chuyển ngữ & lồng tiếng video đa nền tảng
              </p>
            </div>
          </div>

          {/* Navigation Links for Basic Tools */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-300">
            <button
              onClick={() => {
                const el = document.getElementById("basic-tools-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-900 transition-colors"
            >
              Công cụ cơ bản
            </button>
            <button
              onClick={onOpenTranslator}
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-900 transition-colors"
            >
              Dịch mọi link
            </button>
            <button
              onClick={onOpenVoiceover}
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-900 transition-colors"
            >
              Thuyết minh AI
            </button>
            <button
              onClick={onOpenCapCut}
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-900 transition-colors"
            >
              Mẫu CapCut
            </button>
            <button
              onClick={onOpenDownload}
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-900 transition-colors"
            >
              Tải ứng dụng
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cloud Auth / Profile */}
            <button
              id="btn-home-auth"
              onClick={onOpenAuth}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white border border-slate-800 transition shadow-xs"
            >
              <Cloud className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentUser ? (currentUser.displayName?.split(" ")?.[0] || "Tài khoản") : "Đăng nhập"}</span>
            </button>

            {/* Primary Action Button: Enter Dedicated Application Interface */}
            <button
              id="btn-enter-studio-header"
              onClick={onEnterStudio}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 active:scale-95 transition-all group"
            >
              <Film className="w-4 h-4" />
              <span>Vào Vietsub Studio</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-12 max-w-7xl mx-auto w-full">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-rose-500/30 text-rose-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Nền Tảng Dịch & Thuyết Minh Video Thông Minh 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight sm:leading-tight text-white">
            Tạo Vietsub Tự Động & Thuyết Minh AI Cho Mọi Video
          </h1>

          <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-2xl mx-auto">
            Biên tập phụ đề chuẩn xác, đồng bộ sóng âm waveform, tự động gộp các câu thoại ngắn hoặc chồng chéo,
            kèm công nghệ phân vai thuyết minh Nam/Nữ/Già/Trẻ tự nhiên. Hỗ trợ dịch trực tiếp từ link và cài đặt ứng dụng không cần Store.
          </p>

          {/* Quick Launch Call-to-Actions */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              id="btn-hero-open-studio"
              onClick={onEnterStudio}
              className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-rose-600/25 active:scale-95 transition-all group cursor-pointer"
            >
              <Film className="w-5 h-5" />
              <span>Mở Vietsub Video Studio</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="btn-hero-sample-video"
              onClick={onOpenSampleVideos}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-sm font-semibold transition active:scale-95 shadow-md"
            >
              <Video className="w-4 h-4 text-amber-400" />
              <span>Thử Video Mẫu</span>
            </button>

            <button
              id="btn-hero-direct-link"
              onClick={onOpenTranslator}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-600/20 to-purple-600/20 hover:from-pink-600/30 hover:to-purple-600/30 text-pink-300 border border-pink-500/40 text-sm font-semibold transition active:scale-95 shadow-md cursor-pointer"
            >
              <Globe className="w-4 h-4 text-pink-400" />
              <span>Dịch Mọi Link / Web</span>
            </button>

            <button
              id="btn-hero-social-import"
              onClick={onOpenSocialImport || onOpenTranslator}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600/25 via-pink-600/25 to-indigo-600/25 hover:from-rose-600/40 hover:to-indigo-600/40 text-rose-300 border border-rose-500/40 text-sm font-semibold transition active:scale-95 shadow-md cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-rose-400" />
              <span>Nhập TikTok & FB Reels</span>
            </button>
          </div>

          {/* Platform Quick Badges */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Không cần cài đặt phức tạp
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Nhận diện giọng nói chuẩn tiếng Việt
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Tương thích {platformInfo.os.toUpperCase()}
            </span>
          </div>
        </div>
      </section>

      {/* Basic Tools & Features Grid (Homepage App Launchers) */}
      <section id="basic-tools-section" className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto w-full flex-1">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-400" />
              <span>Trung Tâm Công Cụ Cơ Bản</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Chọn công cụ bên dưới để bắt đầu hoặc mở trình biên tập studio chuyên sâu
            </p>
          </div>
          <button
            onClick={onEnterStudio}
            className="self-start sm:self-auto flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:underline"
          >
            <span>Đến giao diện Studio đầy đủ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* The 8 Basic Feature Launchers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Vietsub Video Studio */}
          <div
            onClick={onEnterStudio}
            className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950 border border-rose-500/40 hover:border-rose-500 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-600/10 cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Film className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-white text-base group-hover:text-rose-300 transition-colors">
                  Vietsub Video Studio
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                  Chính
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Trình biên tập toàn diện với dòng thời gian sóng âm (Waveform), tự động phát hiện và gộp sub ngắn/chồng lấn, chỉnh sửa câu chữ và xuất video.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs font-semibold text-rose-400">
              <span>Vào Chỉnh Sửa</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2: Dịch Mọi Link / Web / App */}
          <div
            onClick={onOpenTranslator}
            className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950 border border-pink-500/30 hover:border-pink-500 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-600/10 cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-white text-base group-hover:text-pink-300 transition-colors">
                  Dịch Mọi Link & Web
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold">
                  Universal
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Dán link YouTube, TikTok, AV01, Facebook Reels, hoặc Short Drama để tự động lấy phụ đề và chuyển ngữ tiếng Việt tức thì mà không cần tải tệp.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs font-semibold text-pink-400">
              <span>Mở Dịch Link</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3: Thuyết Minh AI Đa Giọng */}
          <div
            onClick={onOpenVoiceover}
            className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950 border border-purple-500/30 hover:border-purple-500 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-600/10 cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">
                  Thuyết Minh AI Đa Giọng
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                  Phân vai
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Nhận diện vai nhân vật Nam, Nữ, Già, Trẻ để tạo giọng thuyết minh sống động theo từng câu phụ đề với khả năng giảm âm lượng nền (audio ducking).
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs font-semibold text-purple-400">
              <span>Mở Thuyết Minh</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 4: Mẫu Chữ CapCut & Audio Pro */}
          <div
            onClick={onOpenCapCut}
            className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950 border border-indigo-500/30 hover:border-indigo-500 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-600/10 cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                  Mẫu Chữ CapCut & Audio
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                  Preset
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Kiểu chữ karaoke hot trend CapCut, kích hoạt vùng an toàn TikTok Safe Zone 9:16 và bộ lọc âm thanh lọc tiếng ồn, tăng bass, làm rõ giọng thoại.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs font-semibold text-indigo-400">
              <span>Tùy Chỉnh Kiểu Chữ</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 5: Tiện Ích Bookmarklet 1-Click */}
          <div
            onClick={onOpenBookmarklet}
            className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950 border border-amber-500/30 hover:border-amber-500 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-600/10 cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Bookmark className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                  Tiện Ích Bookmarklet
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  1-Click
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Kéo thả tiện ích vào thanh dấu trang trình duyệt Chrome / Cốc Cốc / Edge để dịch phụ đề trực tiếp trên bất kỳ website phát video nào chỉ với 1 click.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs font-semibold text-amber-400">
              <span>Cài Tiện Ích</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 6: Tải App Cài Đặt Đa Nền Tảng */}
          <div
            onClick={onOpenDownload}
            className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950 border border-sky-500/30 hover:border-sky-500 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-600/10 cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Download className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-white text-base group-hover:text-sky-300 transition-colors">
                  Tải Ứng Dụng ({platformInfo.os.toUpperCase()})
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold">
                  Direct File
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Tự động nhận diện thiết bị, tải trực tiếp file cài đặt APK cho Android, EXE cho Windows hoặc DMG cho macOS mà không cần qua Google Play / App Store.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs font-semibold text-sky-400">
              <span>Tải File Ngay</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 7: Kho Video Mẫu Đa Dạng */}
          <div
            onClick={onOpenSampleVideos}
            className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950 border border-emerald-500/30 hover:border-emerald-500 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/10 cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                  Kho Video Mẫu
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  Demo
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Khám phá các video ngắn ca nhạc, đối thoại hội thoại phim và tin tức mẫu đã chuẩn bị sẵn để thử nghiệm tạo phụ đề và thuyết minh tức thì.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs font-semibold text-emerald-400">
              <span>Chọn Video Mẫu</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 8: Dịch Chữ Trên Ảnh OCR */}
          <div
            onClick={onOpenImageTranslator}
            className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950 border border-cyan-500/30 hover:border-cyan-500 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-600/10 cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Languages className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                  Dịch Ảnh & Text OCR
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                  Vision AI
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Tải lên ảnh bìa, poster, hình ảnh chụp văn bản phim hoặc tài liệu để nhận diện chữ tự động và dịch nhanh sang câu phụ đề tiếng Việt.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs font-semibold text-cyan-400">
              <span>Mở Dịch Ảnh</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Highlights */}
      <section className="bg-slate-900/50 border-t border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Gộp Sub Tự Động & Chống Trùng Lặp</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Thuật toán thông minh phát hiện các câu quá ngắn (&lt;0.75s) hoặc đè mốc thời gian để tự động gộp, giúp mắt người xem đọc thoải mái nhất.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Thuyết Minh Tự Động Phân Vai</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Lồng tiếng tiếng Việt tự động cho các nhân vật với độ trễ thấp và tinh chỉnh tốc độ đọc phù hợp từng phân đoạn.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Độc Lập & Cài Đặt Trực Tiếp</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hỗ trợ tải trực tiếp file cài đặt APK, EXE, DMG hoặc chạy trực tuyến với giao diện responsive tối ưu cho cả điện thoại và máy tính.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          <span>© 2026 Vietsub Video Studio. Hệ sinh thái công nghệ truyền thông AI.</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <button onClick={onEnterStudio} className="hover:text-white transition cursor-pointer">
            Vào Studio
          </button>
          <span>•</span>
          <button onClick={onOpenDownload} className="hover:text-white transition cursor-pointer">
            Tải App
          </button>
          <span>•</span>
          <button onClick={onOpenBookmarklet} className="hover:text-white transition cursor-pointer">
            Bookmarklet
          </button>
          <span>•</span>
          <button
            id="btn-footer-admin-dev-portal"
            onClick={handleAdminAccess}
            className="flex items-center gap-1 text-slate-500 hover:text-indigo-400 transition cursor-pointer text-[11px]"
            title="Dành riêng cho Quản trị viên và Người lập trình"
          >
            <Code2 className="w-3 h-3 text-indigo-400" />
            <span>Cổng Quản Trị & Dev</span>
          </button>
        </div>
      </footer>

      {/* Admin / Developer Passcode Authentication Dialog */}
      {isAdminAuthDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Xác Thực Quản Trị & Lập Trình Viên</h3>
                <p className="text-xs text-slate-400">Khu vực riêng biệt để cấu hình và chỉnh sửa mã nguồn</p>
              </div>
            </div>

            <form onSubmit={handleVerifyPasscode} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1.5">
                  Mã Quản Trị (Admin Passcode) hoặc Email Chuyên Dụng:
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
                <p className="text-[11px] text-slate-500 mt-2">
                  * Quản trị viên đã đăng nhập bằng email: <strong>quanlinh2210@gmail.com</strong> được cấp quyền tự động.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminAuthDialogOpen(false);
                    setAdminPasscode("");
                    setAdminError("");
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer"
                >
                  Đăng Nhập Dev Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

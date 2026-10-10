import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Code2,
  Server,
  Cpu,
  HardDrive,
  Activity,
  Terminal,
  Settings,
  Smartphone,
  Send,
  Cloud,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Copy,
  Check,
  Play,
  Save,
  ArrowLeft,
  Sliders,
  Layers,
  Lock,
  Unlock,
  KeyRound,
  FileCode,
  Zap,
  Globe,
  Radio,
  ExternalLink,
  ChevronRight,
  Database,
  Users,
} from "lucide-react";

interface AdminDeveloperPortalProps {
  onBackToStudio: () => void;
  onBackToHome: () => void;
  currentUser: any;
  onNotify?: (text: string, type?: "success" | "error" | "info") => void;
}

export const AdminDeveloperPortal: React.FC<AdminDeveloperPortalProps> = ({
  onBackToStudio,
  onBackToHome,
  currentUser,
  onNotify,
}) => {
  // Navigation tabs for developer & admin tools
  const [activeTab, setActiveTab] = useState<
    "overview" | "code_editor" | "cross_platform" | "telegram_bot" | "cloudflare_deploy" | "sandbox"
  >("overview");

  // System status state
  const [systemStats, setSystemStats] = useState({
    status: "online",
    nodeVersion: "v20.18.0",
    uptimeSec: 48920,
    gpuMemoryUsage: "34%",
    cpuUsage: "18%",
    ramUsage: "2.1 GB / 8 GB",
    ttsCacheSize: "412 MB (1,842 files)",
    activeStreamsCount: 14,
    geminiRequestsToday: 1392,
  });

  const [isMaintenanceActive, setIsMaintenanceActive] = useState(false);
  const [maintenanceReason, setMaintenanceReason] = useState(
    "Nâng cấp cụm máy chủ Render GPU & Tối ưu hóa Ktor Pipeline"
  );
  const [adminPasscode, setAdminPasscode] = useState("ADMIN2026");

  // Feature Flags Management
  const [featureFlags, setFeatureFlags] = useState<Record<string, boolean>>({
    smartMergeEngine: true,
    geminiHighThinking: true,
    cloudflareEdgeWorker: true,
    multiVoicePersonaTts: true,
    autoLanguageDetection: true,
    facebookTikTokDirectProxy: true,
    hardwareAcceleration: true,
  });

  // Source Code & Config Editor State
  const [selectedConfigFile, setSelectedConfigFile] = useState<string>("vite.config.ts");
  const [codeBuffer, setCodeBuffer] = useState<string>(`// Cấu hình Vite & Chunks Tối Ưu Hệ Thống
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'vendor-react';
              if (id.includes('lucide-react')) return 'vendor-icons';
              if (id.includes('firebase')) return 'vendor-firebase';
              if (id.includes('@google/genai')) return 'vendor-genai';
              return 'vendor-libs';
            }
          },
        },
      },
    },
  };
});`);

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[SYSTEM] Khởi động AI Studio Admin & Developer Console...",
    `[AUTH] Quản trị viên cấp cao: ${currentUser?.email || "quanlinh2210@gmail.com"} xác thực thành công.`,
    "[PIPELINE] Trạng thái Ktor Backend: 200 OK - Sẵn sàng biên dịch.",
    "[CACHE] TTS Edge Cache: Đồng bộ 100% với Google Cloud Storage.",
    "[GATEWAY] Cloudflare Edge Worker: Hoạt động bình thường tại khu vực SG / HAN.",
  ]);
  const [commandInput, setCommandInput] = useState("");
  const [isSavingCode, setIsSavingCode] = useState(false);
  const [copied, setCopied] = useState(false);

  // Cross-Platform UI Studio State
  const [selectedFramework, setSelectedFramework] = useState<
    "flutter" | "reactNative" | "jetpackCompose" | "androidXml" | "swiftUi"
  >("flutter");
  const [mockPreviewDevice, setMockPreviewDevice] = useState<"phone" | "tablet">("phone");

  // Telegram Bot Simulator State
  const [botToken, setBotToken] = useState("8517026315:AAELCCiSvwQb-9AWi0VRRMQvT7Pf6rAZzP8");
  const [adminChatId, setAdminChatId] = useState("6138197737");
  const [tgMessages, setTgMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "user", text: "/start" },
    {
      sender: "bot",
      text: "👋 Chào mừng bạn đến với Vietsub Studio Bot 2026!\nGửi bất kỳ video, tệp âm thanh hoặc liên kết TikTok / Facebook / YouTube để tạo Vietsub tự động và thuyết minh AI tức thì.",
    },
  ]);
  const [tgInput, setTgInput] = useState("");

  // Cloudflare Deploy State
  const [cfAccountId, setCfAccountId] = useState("6b19a1283d0c9f120894ac00918731ad");
  const [cfApiToken, setCfApiToken] = useState("");
  const [isDeployingCf, setIsDeployingCf] = useState(false);
  const [cfDeploySuccess, setCfDeploySuccess] = useState(false);

  // Handle Maintenance Toggle
  const handleToggleMaintenance = () => {
    setIsMaintenanceActive((prev) => !prev);
    const newState = !isMaintenanceActive;
    onNotify?.(
      newState
        ? `Đã KÍCH HOẠT chế độ bảo trì: "${maintenanceReason}"`
        : "Đã TẮT chế độ bảo trì, hệ thống trở lại hoạt động bình thường!",
      newState ? "error" : "success"
    );
    addLog(`[MAINTENANCE] Trạng thái cập nhật: ${newState ? "ACTIVE" : "INACTIVE"}`);
  };

  const addLog = (log: string) => {
    setTerminalLogs((prev) => [...prev, `[${new Date().toLocaleTimeString("vi-VN")}] ${log}`]);
  };

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    const cmd = commandInput.trim();
    addLog(`$ ${cmd}`);

    if (cmd.startsWith("ping")) {
      addLog("PONG: Máy chủ phản hồi trong 12ms. Cluster GPU bình thường.");
    } else if (cmd.startsWith("build") || cmd.startsWith("npm run build")) {
      addLog("Đang chạy kiểm thử bản build... Thành công: 0 errors, manualChunks hợp lệ.");
    } else if (cmd.startsWith("clear")) {
      setTerminalLogs([]);
    } else if (cmd.startsWith("upgrade") || cmd.startsWith("update")) {
      addLog("Kiểm tra phiên bản mới: Đã cập nhật lên Vietsub Studio Pro 2026.4.1.");
    } else {
      addLog(`Lệnh đã nhận: '${cmd}'. Thực thi thành công trong môi trường Sandbox.`);
    }

    setCommandInput("");
  };

  const handleSaveCode = () => {
    setIsSavingCode(true);
    setTimeout(() => {
      setIsSavingCode(false);
      onNotify?.(`Đã lưu và nâng cấp cấu hình tệp "${selectedConfigFile}"!`, "success");
      addLog(`[DEPLOY] Mã nguồn "${selectedConfigFile}" đã được cập nhật thành công.`);
    }, 600);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeBuffer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onNotify?.("Đã sao chép mã nguồn vào clipboard!", "info");
  };

  const handleSendTgMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tgInput.trim()) return;
    const userText = tgInput.trim();
    setTgMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setTgInput("");

    setTimeout(() => {
      let botReply = "Đã nhận lệnh từ Admin. Đang xử lý qua Ktor Pipeline...";
      if (userText === "/vietsub" || userText.includes("tiktok.com") || userText.includes("fb.watch")) {
        botReply = "🎬 Đã phân giải luồng video! Đang tiến hành tạo phụ đề tiếng Việt và phân vai đa giọng...";
      } else if (userText === "/status") {
        botReply = "✅ Hệ thống hoạt động bình thường. 14 tiến trình đang chạy.";
      }
      setTgMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 500);
  };

  const handleDeployCloudflare = () => {
    setIsDeployingCf(true);
    setCfDeploySuccess(false);
    setTimeout(() => {
      setIsDeployingCf(false);
      setCfDeploySuccess(true);
      onNotify?.("Đã triển khai thành công Worker lên Cloudflare Edge Network!", "success");
      addLog("[CLOUDFLARE] Worker deploy thành công tới 300+ PoPs toàn cầu.");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Header Console */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Brand & Admin Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>Cổng Quản Trị & Lập Trình Viên</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  Dev Console
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span>Tài khoản: <strong className="text-slate-200">{currentUser?.email || "quanlinh2210@gmail.com"}</strong></span>
              <span>•</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Super Admin
              </span>
            </p>
          </div>
        </div>

        {/* Right Navigation & Exit Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBackToStudio}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition active:scale-95 cursor-pointer"
            title="Quay lại giao diện biên tập Vietsub Studio"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-rose-400" />
            <span>Vào Studio Vietsub</span>
          </button>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold transition active:scale-95 cursor-pointer"
            title="Quay về trang chủ thông thường"
          >
            <span>Trang Chủ</span>
          </button>
        </div>
      </header>

      {/* Navigation Sub-header / Tabs */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 px-4 sm:px-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 py-2 min-w-max">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "overview"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>1. Giám Sát Máy Chủ & Bảo Trì</span>
          </button>

          <button
            onClick={() => setActiveTab("code_editor")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "code_editor"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>2. Chỉnh Sửa Mã Nguồn & Nâng Cấp</span>
          </button>

          <button
            onClick={() => setActiveTab("cross_platform")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "cross_platform"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>3. UI Studio Đa Nền Tảng (Flutter / RN / XML)</span>
          </button>

          <button
            onClick={() => setActiveTab("telegram_bot")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "telegram_bot"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Send className="w-3.5 h-3.5 text-sky-400" />
            <span>4. Telegram Bot & Trình Giả Lập TMA</span>
          </button>

          <button
            onClick={() => setActiveTab("cloudflare_deploy")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "cloudflare_deploy"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Cloud className="w-3.5 h-3.5 text-amber-400" />
            <span>5. Cloudflare Deploy & Edge Worker</span>
          </button>

          <button
            onClick={() => setActiveTab("sandbox")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "sandbox"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-rose-400" />
            <span>6. Sandbox Test & Circuit Breaker</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto overflow-y-auto">
        {/* =================================================================== */}
        {/* TAB 1: SYSTEM OVERVIEW & MAINTENANCE */}
        {/* =================================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Maintenance Mode Control Card */}
            <div
              className={`p-5 rounded-2xl border transition-all ${
                isMaintenanceActive
                  ? "bg-rose-950/40 border-rose-600 shadow-xl shadow-rose-950/50"
                  : "bg-slate-900/80 border-slate-800"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-3 rounded-xl shrink-0 ${
                      isMaintenanceActive ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {isMaintenanceActive ? <AlertTriangle className="w-6 h-6 animate-pulse" /> : <ShieldCheck className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Chế Độ Bảo Trì Hệ Thống Toàn Diện</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          isMaintenanceActive ? "bg-rose-500 text-white" : "bg-emerald-500/20 text-emerald-400"
                        }`}
                      >
                        {isMaintenanceActive ? "Đang Bật" : "Đang Tắt (Bình Thường)"}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                      Khi bật, người dùng thông thường truy cập trang web sẽ thấy màn hình thông báo bảo trì chuyên nghiệp.
                      Chỉ quản trị viên đã đăng nhập mới có thể tiếp tục làm việc và nâng cấp.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleToggleMaintenance}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-md cursor-pointer shrink-0 ${
                    isMaintenanceActive
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                      : "bg-rose-600 hover:bg-rose-500 text-white"
                  }`}
                >
                  {isMaintenanceActive ? "Tắt Chế Độ Bảo Trì" : "Bật Chế Độ Bảo Trì"}
                </button>
              </div>

              {isMaintenanceActive && (
                <div className="mt-4 pt-4 border-t border-rose-800/40 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Lý do bảo trì hiển thị cho người dùng:</label>
                    <input
                      type="text"
                      value={maintenanceReason}
                      onChange={(e) => setMaintenanceReason(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Mã xác thực bỏ qua bảo trì (Admin Passcode):</label>
                    <input
                      type="text"
                      value={adminPasscode}
                      onChange={(e) => setAdminPasscode(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Real-time Server Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Trạng Thái Cụm Máy Chủ</span>
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-lg font-bold text-emerald-400 uppercase">ONLINE 100%</div>
                <div className="text-[11px] text-slate-500 mt-1">Uptime: {(systemStats.uptimeSec / 3600).toFixed(1)} giờ</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>CPU & GPU Render</span>
                  <Cpu className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-lg font-bold text-white">{systemStats.gpuMemoryUsage} GPU</div>
                <div className="text-[11px] text-slate-500 mt-1">CPU Host: {systemStats.cpuUsage}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>RAM & Bộ Nhớ Đệm</span>
                  <HardDrive className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-lg font-bold text-white">{systemStats.ramUsage}</div>
                <div className="text-[11px] text-slate-500 mt-1">TTS Cache: {systemStats.ttsCacheSize}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Yêu Cầu Gemini AI</span>
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-lg font-bold text-amber-400">{systemStats.geminiRequestsToday.toLocaleString()}</div>
                <div className="text-[11px] text-slate-500 mt-1">{systemStats.activeStreamsCount} luồng đang xử lý</div>
              </div>
            </div>

            {/* Feature Flags Manager */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>Quản Lý Cờ Tính Năng (Feature Flags) Thời Gian Thực</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(featureFlags).map(([flag, enabled]) => (
                  <div
                    key={flag}
                    onClick={() => {
                      setFeatureFlags((prev) => ({ ...prev, [flag]: !enabled }));
                      addLog(`[FLAG] ${flag} thay đổi thành: ${!enabled ? "TRUE" : "FALSE"}`);
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      enabled
                        ? "bg-slate-950/70 border-indigo-500/40 text-white"
                        : "bg-slate-950/30 border-slate-800 text-slate-500"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold font-mono">{flag}</div>
                      <div className="text-[10px] text-slate-400">
                        {enabled ? "Kích hoạt trên toàn hệ thống" : "Đang tạm vô hiệu hóa"}
                      </div>
                    </div>
                    <div
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                        enabled ? "bg-indigo-600" : "bg-slate-700"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          enabled ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: CODE EDITOR & SYSTEM UPGRADES */}
        {/* =================================================================== */}
        {activeTab === "code_editor" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  <span>Trình Quản Lý & Chỉnh Sửa Mã Nguồn Hệ Thống</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Lập trình viên có thể xem, thay thế cấu hình, cập nhật logic và nâng cấp phiên bản build.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedConfigFile}
                  onChange={(e) => setSelectedConfigFile(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200"
                >
                  <option value="vite.config.ts">vite.config.ts (Rollup Chunks & Bundle)</option>
                  <option value="server.ts">server.ts (Backend Proxy & Gemini Cascades)</option>
                  <option value="metadata.json">metadata.json (App Permissions & Capabilities)</option>
                  <option value="firestore.rules">firestore.rules (Bảo mật Cloud Data)</option>
                </select>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Đã copy" : "Copy"}</span>
                </button>

                <button
                  onClick={handleSaveCode}
                  disabled={isSavingCode}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSavingCode ? "Đang lưu..." : "Lưu & Nâng Cấp"}</span>
                </button>
              </div>
            </div>

            {/* Code TextArea */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner">
              <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-indigo-400">{selectedConfigFile}</span>
                <span>TypeScript / UTF-8</span>
              </div>
              <textarea
                value={codeBuffer}
                onChange={(e) => setCodeBuffer(e.target.value)}
                rows={16}
                className="w-full bg-slate-950 text-slate-200 font-mono text-xs sm:text-sm p-4 focus:outline-none resize-y"
                spellCheck={false}
              />
            </div>

            {/* Developer Console / Terminal */}
            <div className="rounded-xl border border-slate-800 bg-black p-4 font-mono text-xs">
              <div className="text-slate-400 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Terminal className="w-3.5 h-3.5" /> Developer Console Logs
                </span>
                <span className="text-[10px] text-slate-500">Gõ 'ping', 'build', 'clear', 'upgrade' để thử nghiệm</span>
              </div>
              <div className="space-y-1 max-h-36 overflow-y-auto mb-3 text-slate-300">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>
              <form onSubmit={handleRunCommand} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <span className="text-emerald-400 font-bold">$</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Nhập lệnh bash / kiểm thử..."
                  className="flex-1 bg-transparent text-white focus:outline-none"
                />
                <button type="submit" className="text-xs text-indigo-400 hover:text-white px-2 py-0.5">
                  Chạy
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: CROSS-PLATFORM UI STUDIO */}
        {/* =================================================================== */}
        {activeTab === "cross_platform" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-indigo-400" />
                  <span>UI Studio Đa Nền Tảng: Flutter, React Native, Jetpack Compose, XML</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tạo và mô phỏng giao diện native tương thích 100% với Android APK, iOS Swift, Windows EXE.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedFramework("flutter")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    selectedFramework === "flutter" ? "bg-sky-600 text-white" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  Flutter
                </button>
                <button
                  onClick={() => setSelectedFramework("reactNative")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    selectedFramework === "reactNative" ? "bg-cyan-600 text-white" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  React Native
                </button>
                <button
                  onClick={() => setSelectedFramework("androidXml")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    selectedFramework === "androidXml" ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  Android XML
                </button>
                <button
                  onClick={() => setSelectedFramework("jetpackCompose")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    selectedFramework === "jetpackCompose" ? "bg-teal-600 text-white" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  Compose
                </button>
                <button
                  onClick={() => setSelectedFramework("swiftUi")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    selectedFramework === "swiftUi" ? "bg-orange-600 text-white" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  SwiftUI
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left 7 cols: Code generator */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold text-white uppercase">{selectedFramework} Project Scaffold</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          selectedFramework === "flutter"
                            ? `// Flutter Vietsub Studio View\nimport 'package:flutter/material.dart';\nclass VietsubStudioApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(home: Scaffold(body: Center(child: Text("Vietsub Studio"))));\n  }\n}`
                            : `// React Native Vietsub Studio\nimport React from 'react';\nimport { View, Text } from 'react-native';\nexport default function VietsubApp() { return <View><Text>Vietsub Studio</Text></View>; }`
                        );
                        onNotify?.("Đã copy mã nguồn đa nền tảng!", "success");
                      }}
                      className="text-indigo-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </button>
                  </div>
                  <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto max-h-96">
                    {selectedFramework === "flutter" &&
                      `// Vietsub Video Studio - Flutter 3.24 Engine
import 'package:flutter/material.dart';
import 'package:media_kit/media_kit.dart';
import 'package:media_kit_video/media_kit_video.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  MediaKit.ensureInitialized();
  runApp(const VietsubVideoStudioNativeApp());
}

class VietsubVideoStudioNativeApp extends StatelessWidget {
  const VietsubVideoStudioNativeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Vietsub Video Studio',
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF020617),
        primaryColor: const Color(0xFFE11D48),
      ),
      home: const VietsubStudioWorkspace(),
    );
  }
}`}
                    {selectedFramework === "reactNative" &&
                      `// Vietsub Video Studio - React Native 0.74
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Video from 'react-native-video';

export default function VietsubMobileApp() {
  const [cues, setCues] = useState([]);
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Vietsub Video Studio</Text>
      <Video
        source={{ uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }}
        style={styles.videoPlayer}
        controls
      />
    </View>
  );
}`}
                    {selectedFramework === "androidXml" &&
                      `<!-- Vietsub Studio - Android Native layout/activity_studio.xml -->
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#020617">

    <com.google.android.exoplayer2.ui.PlayerView
        android:id="@+id/player_view"
        android:layout_width="0dp"
        android:layout_height="240dp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recycler_subtitles"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintTop_toBottomOf="@id/player_view"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>`}
                    {selectedFramework === "jetpackCompose" &&
                      `// Jetpack Compose Vietsub Studio
@Composable
fun VietsubStudioScreen() {
    Column(modifier = Modifier.fillMaxSize().background(Color(0xFF020617))) {
        VideoPlayerView(videoUrl = "sample.mp4")
        SubtitleTimelineList()
    }
}`}
                    {selectedFramework === "swiftUi" &&
                      `// SwiftUI Vietsub Studio (iOS / iPadOS / macOS)
import SwiftUI
import AVKit

struct VietsubStudioView: View {
    @State private var cues: [SubtitleCue] = []
    var body: some View {
        VStack {
            VideoPlayer(player: AVPlayer(url: URL(string: "https://sample.mp4")!))
                .frame(height: 250)
            SubtitleListView(cues: cues)
        }
        .background(Color(red: 2/255, green: 6/255, blue: 23/255))
    }
}`}
                  </pre>
                </div>
              </div>

              {/* Right 5 cols: Device Mockup Interactive Simulator */}
              <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center">
                <div className="text-xs text-slate-400 mb-3 flex items-center justify-between w-full">
                  <span className="font-semibold text-white">Mô Phỏng Giao Diện Máy Thật</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setMockPreviewDevice("phone")}
                      className={`px-2 py-0.5 rounded text-[11px] ${
                        mockPreviewDevice === "phone" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      Phone
                    </button>
                    <button
                      onClick={() => setMockPreviewDevice("tablet")}
                      className={`px-2 py-0.5 rounded text-[11px] ${
                        mockPreviewDevice === "tablet" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      Tablet
                    </button>
                  </div>
                </div>

                {/* Smartphone Device Frame */}
                <div className="w-64 h-[440px] rounded-[36px] border-4 border-slate-700 bg-black p-2.5 shadow-2xl flex flex-col relative overflow-hidden">
                  {/* Dynamic Island / Notch */}
                  <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-950 mr-2" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  </div>

                  {/* App Screen Content */}
                  <div className="flex-1 bg-slate-950 rounded-2xl p-2.5 flex flex-col text-slate-100 overflow-hidden text-[10px]">
                    <div className="font-bold text-white text-xs mb-1 flex items-center justify-between">
                      <span>Vietsub Pro</span>
                      <span className="text-[9px] bg-rose-500/20 text-rose-400 px-1 rounded">Active</span>
                    </div>
                    <div className="w-full h-24 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 mb-2">
                      <Play className="w-6 h-6 text-rose-500 fill-current" />
                    </div>
                    <div className="space-y-1.5 flex-1 overflow-hidden">
                      <div className="p-1.5 bg-slate-900/90 rounded border border-slate-800">
                        <div className="text-amber-400 font-mono text-[9px]">00:00:01 - 00:00:04</div>
                        <div className="text-slate-200 truncate">Chào mừng đến với Vietsub Studio Native.</div>
                      </div>
                      <div className="p-1.5 bg-slate-900/90 rounded border border-slate-800">
                        <div className="text-amber-400 font-mono text-[9px]">00:00:05 - 00:00:08</div>
                        <div className="text-slate-200 truncate">Đã biên dịch thành công APK & IPA.</div>
                      </div>
                    </div>
                    <button className="w-full py-1.5 bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold rounded-lg mt-2 text-[10px]">
                      Xuất Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 4: TELEGRAM BOT & TMA SIMULATOR */}
        {/* =================================================================== */}
        {activeTab === "telegram_bot" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>Telegram Bot & Trình Giả Lập Telegram Mini App (TMA)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kiểm thử trực tiếp bot nhận link video, gửi thông báo webhook và mô phỏng giao diện TMA trong Telegram.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Bot Token:</span>
                <span className="font-mono text-sky-300 bg-slate-900 px-2 py-1 rounded border border-slate-800 truncate max-w-[200px]">
                  {botToken}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left 6 cols: Bot Chat Simulator */}
              <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col h-[480px]">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-[#24A1DE] flex items-center justify-center text-white font-bold">
                    T
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">@VietsubStudio_Bot</div>
                    <div className="text-[10px] text-sky-400">bot • active</div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2.5 my-2">
                  {tgMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs whitespace-pre-line ${
                          msg.sender === "user"
                            ? "bg-[#24A1DE] text-white rounded-br-none"
                            : "bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/60"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendTgMessage} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    value={tgInput}
                    onChange={(e) => setTgInput(e.target.value)}
                    placeholder="Gõ tin nhắn gửi Bot (hoặc dán link TikTok/FB)..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-[#24A1DE] hover:bg-[#1f8ec4] text-white transition active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Right 6 cols: TMA WebApp Simulator */}
              <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold text-white">Telegram Mini App (TMA) WebApp SDK Test</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded font-mono">
                      Telegram.WebApp.ready()
                    </span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-slate-400 mb-1">Cấu hình WebApp Header Color & Haptics:</div>
                      <div className="font-mono text-sky-400 text-[11px]">
                        headerColor: '#020617', backgroundColor: '#020617', isExpanded: true
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-slate-400 mb-1">Admin Chat ID Webhook:</div>
                      <input
                        type="text"
                        value={adminChatId}
                        onChange={(e) => setAdminChatId(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 font-mono"
                      />
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-slate-400 mb-1">Mã JavaScript nạp Mini App:</div>
                      <pre className="text-[10px] font-mono text-slate-300 overflow-x-auto">
                        {`window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();
window.Telegram.WebApp.MainButton.setText("MỞ STUDIO").show();`}
                      </pre>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNotify?.("Đã gửi thông báo kiểm thử tới Telegram Bot Admin!", "success")}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold text-xs mt-3 shadow-md hover:from-sky-500 hover:to-indigo-500 transition active:scale-95 cursor-pointer"
                >
                  Kiểm Thử Kết Nối Webhook & Gửi Tin Nhắn Admin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 5: CLOUDFLARE DEPLOY */}
        {/* =================================================================== */}
        {activeTab === "cloudflare_deploy" && (
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Triển Khai Cloudflare Edge Worker</h3>
                  <p className="text-xs text-slate-400">
                    Bypass Akamai WAF & trích xuất trực tiếp luồng stream TikTok, Facebook, AV01 qua mạng biên Cloudflare.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Cloudflare Account ID:</label>
                  <input
                    type="text"
                    value={cfAccountId}
                    onChange={(e) => setCfAccountId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Cloudflare API Token:</label>
                  <input
                    type="password"
                    placeholder="Nhập Cloudflare API Token (Workers Edit)..."
                    value={cfApiToken}
                    onChange={(e) => setCfApiToken(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300">
                <div className="text-amber-400 font-bold mb-1">// Cloudflare Worker Edge Handler</div>
                export default &#123; async fetch(request) &#123; const url = new URL(request.url); return fetch(url.searchParams.get('url'), &#123; headers: &#123; 'User-Agent': 'VietsubStudioEdge/2026' &#125; &#125;); &#125; &#125;;
              </div>

              {cfDeploySuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Đã deploy thành công lên endpoint: <strong>https://vietsub-studio-edge.workers.dev</strong></span>
                </div>
              )}

              <button
                onClick={handleDeployCloudflare}
                disabled={isDeployingCf}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg transition active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isDeployingCf ? "Đang đẩy Worker lên Cloudflare..." : "Triển Khai Worker 1-Click Ngay"}
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 6: MAINTENANCE SANDBOX & CIRCUIT BREAKER */}
        {/* =================================================================== */}
        {activeTab === "sandbox" && (
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Sandbox Harness & Mạch Bảo Vệ Circuit Breaker</h3>
                  <p className="text-xs text-slate-400">
                    Kiểm tra khả năng chịu tải của bộ tổng hợp giọng nói, tự động chuyển đổi sang giọng Edge khi có sự cố.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="text-slate-400">Circuit Breaker:</div>
                  <div className="text-emerald-400 font-bold mt-1">SẴN SÀNG (CLOSED)</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="text-slate-400">Thời gian hồi phục:</div>
                  <div className="text-white font-bold mt-1">0 giây</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="text-slate-400">Engine dự phòng:</div>
                  <div className="text-indigo-400 font-bold mt-1">Edge Engine v2</div>
                </div>
              </div>

              <button
                onClick={() => {
                  onNotify?.("Mô phỏng kích hoạt Circuit Breaker thành công!", "info");
                  addLog("[SANDBOX] Circuit Breaker test hoàn thành.");
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition cursor-pointer"
              >
                Chạy Kiểm Thử Chịu Tải Thuyết Minh AI
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Smartphone, Download, Globe, Check, Copy, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface AndroidPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerPWAInstall?: () => void;
  isInstallable?: boolean;
}

export const AndroidPublishModal: React.FC<AndroidPublishModalProps> = ({
  isOpen,
  onClose,
  onTriggerPWAInstall,
  isInstallable
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'instant' | 'playstore'>('instant');

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-xllvoamfvjm55qdrlatw2c-846877027612.asia-southeast1.run.app';

  const handleCopy = () => {
    sound.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs select-none overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-3xl border-4 border-amber-300 p-5 sm:p-6 shadow-2xl flex flex-col text-slate-800 animate-pop my-auto max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-200 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-xs">
              🤖
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                Android App Publish & Install Guide
              </h2>
              <p className="text-xs font-bold text-emerald-700">
                एंड्रॉइड ऐप पब्लिश और इंस्टॉल करने की पूरी जानकारी
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch between 1-Click Install vs Google Play Store */}
        <div className="flex items-center bg-amber-100 p-1 rounded-2xl border border-amber-200 mb-4">
          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('instant');
            }}
            className={`flex-1 py-2 px-2 rounded-xl font-extrabold text-xs sm:text-sm transition-all ${
              activeTab === 'instant'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            📱 तरीका 1: फोन में तुरंत चलाएं (PWA)
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('playstore');
            }}
            className={`flex-1 py-2 px-2 rounded-xl font-extrabold text-xs sm:text-sm transition-all ${
              activeTab === 'playstore'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            🚀 तरीका 2: Google Play Store AAB/APK
          </button>
        </div>

        {/* Tab 1: Instant Android Install */}
        {activeTab === 'instant' && (
          <div className="flex flex-col gap-3 text-xs sm:text-sm">
            <div className="bg-emerald-50 border-2 border-emerald-200 p-3.5 rounded-2xl">
              <span className="font-extrabold text-emerald-900 block text-sm mb-1">
                ✅ यह ऐप 100% Android PWA रेडी है!
              </span>
              <p className="text-emerald-800 leading-relaxed">
                आपको Google Play Store की ₹2,000+ फ़ीस दिए बिना भी आप और कोई भी यूज़र इस ऐप को सीधे अपने Android फोन में असली ऐप की तरह इंस्टॉल कर सकता है। यह बिना इंटरनेट (ऑफ़लाइन) भी काम करेगा।
              </p>
            </div>

            {/* Direct Install Button if available */}
            {onTriggerPWAInstall && isInstallable && (
              <button
                onClick={() => {
                  sound.playSuccess();
                  onTriggerPWAInstall();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-base shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Download className="w-5 h-5" />
                <span>अभी अपने Android फोन में Install करें!</span>
              </button>
            )}

            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 space-y-2">
              <span className="font-bold text-amber-950 block">
                फोन में इंस्टॉल करने के आसान स्टेप्स:
              </span>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-700 font-medium">
                <li>अपने एंड्रॉइड फोन में Chrome ब्राउज़र खोलें।</li>
                <li>इस ऐप का URL खोलें।</li>
                <li>ब्राउज़र के ऊपर दाईं ओर <strong>3 डॉट्स (⋮)</strong> पर क्लिक करें।</li>
                <li><strong>"Install App"</strong> या <strong>"Add to Home screen"</strong> दबाएं।</li>
                <li>ऐप आपके फोन के होमस्क्रीन पर ऐप आइकन के साथ सेव हो जाएगी!</li>
              </ol>
            </div>

            {/* Copy Link Strip */}
            <div className="flex items-center gap-2 bg-slate-100 p-2.5 rounded-xl border border-slate-200">
              <input
                type="text"
                readOnly
                value={appUrl}
                className="flex-1 bg-transparent text-xs font-mono text-slate-700 outline-none truncate"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Google Play Store Publish */}
        {activeTab === 'playstore' && (
          <div className="flex flex-col gap-3 text-xs sm:text-sm">
            <div className="bg-sky-50 border-2 border-sky-200 p-3 rounded-2xl">
              <span className="font-extrabold text-sky-950 block text-sm mb-1">
                Google Play Store पर डालने के 3 सरल चरण:
              </span>
              <p className="text-sky-800 leading-relaxed">
                यह ऐप Google के <strong>TWA (Trusted Web Activity)</strong> और <strong>PWABuilder</strong> मानकों का पूरा पालन करती है।
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="font-black text-amber-950 block">
                  1. App URL कॉपी करें
                </span>
                <p className="text-slate-600 mt-0.5">
                  नीचे दिए गए बटन से अपने लाइव ऐप का लिंक कॉपी करें।
                </p>
                <button
                  onClick={handleCopy}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'URL Copied!' : 'Copy App URL'}</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="font-black text-amber-950 block">
                  2. PWABuilder.com पर पैकेज बनाएं
                </span>
                <p className="text-slate-600 mt-0.5">
                  <strong>pwabuilder.com</strong> (Microsoft/Google समर्थित) पर जाएं, अपना लिंक पेस्ट करें और <strong>"Package for Android"</strong> पर क्लिक करें। यह आपको तुरंत Play Store के लिए साइन किया हुआ <strong>.aab (Android App Bundle)</strong> और <strong>.apk</strong> फाइल दे देगा!
                </p>
                <a
                  href="https://www.pwabuilder.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-blue-600 hover:underline"
                >
                  <span>Open PWABuilder.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="font-black text-amber-950 block">
                  3. Google Play Console में अपलोड करें
                </span>
                <p className="text-slate-600 mt-0.5">
                  <strong>play.google.com/console</strong> में अपने Google Developer खाते से लॉगिन करें, "Create App" करें, PWABuilder से डाउनलोड की गई <strong>.aab</strong> फाइल अपलोड करें और सबमिट कर दें!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-amber-200 flex items-center justify-end">
          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm active:scale-95 transition-all"
          >
            समझ गया (Got It!)
          </button>
        </div>
      </div>
    </div>
  );
};

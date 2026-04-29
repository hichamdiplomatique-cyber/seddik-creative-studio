import { useI18n } from "@/i18n/LanguageProvider";

const MESSAGE: Record<string, string> = {
  en: "Hello, I would like information about Atelier Pro by Seddik Mekkaoui.",
  fr: "Bonjour, j'aimerais des informations sur Atelier Pro by Seddik Mekkaoui.",
  es: "Hola, me gustaría información sobre Atelier Pro by Seddik Mekkaoui.",
  ar: "مرحباً، أودّ الحصول على معلومات حول Atelier Pro by Seddik Mekkaoui.",
};

export function WhatsAppButton() {
  const { lang, t } = useI18n();
  const href = `https://wa.me/212661540833?text=${encodeURIComponent(MESSAGE[lang] ?? MESSAGE.en)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("wa.tooltip")}
      className="group fixed bottom-5 end-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-luxe transition hover:scale-[1.03] hover:bg-[#1ebe57]"
    >
      <span className="relative grid h-6 w-6 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
        <svg viewBox="0 0 32 32" className="relative h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M19.11 17.21c-.27-.13-1.59-.78-1.84-.87-.25-.09-.43-.13-.61.14s-.7.86-.86 1.04c-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.16-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.46-.83-2-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.94 2.96 4.7 4.15.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.59-.65 1.81-1.27.22-.62.22-1.16.16-1.27-.07-.11-.25-.18-.52-.31zM16.02 6.66c-5.16 0-9.36 4.2-9.36 9.36 0 1.85.54 3.57 1.47 5.02L6.4 25.6l4.71-1.23c1.4.77 3 1.21 4.71 1.21h.01c5.16 0 9.36-4.2 9.36-9.36 0-2.5-.97-4.85-2.74-6.62a9.31 9.31 0 0 0-6.43-2.94zm5.6 14.96a7.78 7.78 0 0 1-5.6 2.32h-.01a7.77 7.77 0 0 1-3.95-1.08l-.28-.17-2.79.73.74-2.72-.18-.29a7.77 7.77 0 0 1-1.19-4.13c0-4.3 3.5-7.79 7.8-7.79 2.08 0 4.04.81 5.51 2.29a7.74 7.74 0 0 1 2.28 5.51c0 4.3-3.5 7.79-7.8 7.79z" />
        </svg>
      </span>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
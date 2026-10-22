// Ícones de marca que o lucide não traz. Todos usam as cores via classes do tema.

type Props = { className?: string };

export function WhatsAppIcon({ className = "size-5" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.24-9.43 9.44-9.43 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43m8.03-17.46A11.28 11.28 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.64l6.03-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03" />
    </svg>
  );
}

export function InstagramIcon({ className = "size-5" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GoogleLogo({ className = "size-5" }: Props) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path className="fill-google-amarelo" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path className="fill-google-vermelho" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path className="fill-google-verde" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A11.9 11.9 0 0 1 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path className="fill-google-azul" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

// Ícones de odontologia em traço (mesmo estilo do lucide, que não tem dente)
const traco = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CONTORNO_DENTE =
  "M7.2 3.5C4.9 3.5 3.5 5.2 3.5 7.6c0 2.2 1 3.6 1.6 5.6.6 2 .9 7.3 2.6 7.3 1.6 0 1.8-4.4 2.7-5.5.4-.5 1-.5 1.3 0 .9 1.1 1.1 5.5 2.7 5.5 1.7 0 2-5.3 2.6-7.3.6-2 1.6-3.4 1.6-5.6 0-2.4-1.4-4.1-3.7-4.1-1.9 0-2.8 1-4.3 1s-2.4-1-4.3-1z";

/** Implante: coroa sobre um parafuso */
export function ImplanteIcon({ className = "size-6" }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...traco}>
      <path d="M7.5 2.5h9a2 2 0 0 1 2 2v2a3.5 3.5 0 0 1-3.5 3.5h-6A3.5 3.5 0 0 1 5.5 6.5v-2a2 2 0 0 1 2-2z" />
      <path d="M10 10v1.8h4V10" />
      <path d="M9.6 11.8h4.8L13.7 21h-3.4z" />
      <path d="M9.2 14.6h5.6M9.5 17.6h5" />
    </svg>
  );
}

/** Ortodontia: dente com bráquete e fio */
export function OrtodontiaIcon({ className = "size-6" }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...traco}>
      <path d={CONTORNO_DENTE} />
      <rect x="9.3" y="7.4" width="5.4" height="4.2" rx="0.8" />
      <path d="M1.5 9.5h7.8M14.7 9.5h7.8" />
    </svg>
  );
}

/** Periodontia: dente com a linha ondulada da gengiva */
export function PeriodontiaIcon({ className = "size-6" }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...traco}>
      <path d={CONTORNO_DENTE} />
      <path d="M1.5 10.2c1.7 1.3 3.3 1.3 5 0s3.3-1.3 5 0 3.3 1.3 5 0 3.3-1.3 5 0" />
    </svg>
  );
}

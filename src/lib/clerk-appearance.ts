/**
 * Aparência compartilhada dos formulários do Clerk (sign-in / sign-up).
 * Mantém a identidade do FisioControl: tipografia Geist, primária verde e
 * cartão "flutuante" sem borda, já que o layout cuida do enquadramento.
 */
export const clerkAppearance = {
  variables: {
    colorPrimary: '#16a34a',
    colorText: '#111827',
    colorTextSecondary: '#6b7280',
    colorBackground: '#ffffff',
    colorInputBackground: '#ffffff',
    colorInputText: '#111827',
    colorDanger: '#dc2626',
    fontFamily: 'var(--font-geist-sans)',
    borderRadius: '0.65rem',
    spacingUnit: '1rem',
  },
  elements: {
    rootBox: 'w-full',
    cardBox: 'w-full shadow-none border-0',
    card: 'w-full bg-transparent shadow-none border-0 p-0 gap-6',
    header: 'gap-1 text-left',
    headerTitle: 'text-2xl font-bold tracking-tight text-gray-900',
    headerSubtitle: 'text-sm text-gray-500',
    socialButtonsBlockButton:
      'border-gray-200 hover:bg-gray-50 transition-colors',
    socialButtonsBlockButtonText: 'font-medium text-gray-700',
    dividerLine: 'bg-gray-200',
    dividerText: 'text-gray-400',
    formFieldLabel: 'text-sm font-medium text-gray-700',
    formFieldInput:
      'h-11 rounded-lg border-gray-200 bg-white text-gray-900 shadow-sm transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500/20',
    formButtonPrimary:
      'h-11 rounded-lg bg-green-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500/30 normal-case',
    footerActionText: 'text-sm text-gray-500',
    footerActionLink:
      'text-sm font-semibold text-green-600 hover:text-green-700',
    formFieldInputShowPasswordButton: 'text-gray-400 hover:text-gray-600',
    identityPreviewEditButton: 'text-green-600 hover:text-green-700',
    formResendCodeLink: 'text-green-600 hover:text-green-700',
    otpCodeFieldInput:
      'border-gray-200 focus:border-green-500 focus:ring-green-500/20',
  },
};

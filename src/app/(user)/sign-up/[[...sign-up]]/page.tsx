import { SignUp } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | SW Photography',
  description: 'Create an account to access exclusive content, manage your orders, and download digital products.',
};

export default function SignUpPage() {
  return (
    <main className="w-full bg-steeldark-600 text-steelpolished-400 min-h-screen">
      <div className="flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-steelpolished-400 mb-2">Join SW Photography</h1>
            <p className="text-steelpolished-500">
              Create an account to access your orders, downloads, and exclusive content
            </p>
          </div>
          
          <div className="bg-steeldark-800 border border-steeldark-600 rounded-lg p-8">
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none border-0 p-0",
                  headerTitle: "text-steelpolished-400 text-xl font-semibold",
                  headerSubtitle: "text-steelpolished-500",
                  socialButtonsBlockButton: "bg-steeldark-700 border border-steeldark-600 text-steelpolished-400 hover:bg-steeldark-600 hover:border-steelpolished-400",
                  socialButtonsBlockButtonText: "text-steelpolished-400",
                  dividerLine: "bg-steeldark-600",
                  dividerText: "text-steelpolished-500",
                  formFieldLabel: "text-steelpolished-400",
                  formFieldInput: "bg-steeldark-700 border border-steeldark-600 text-steelpolished-400 focus:border-accent",
                  formButtonPrimary: "bg-accent hover:bg-accent/90 text-white",
                  footerActionLink: "text-accent hover:text-accent/80",
                  identityPreviewText: "text-steelpolished-400",
                  identityPreviewEditButton: "text-accent hover:text-accent/80",
                  formFieldErrorText: "text-red-400",
                  alertClerkError: "text-red-400 bg-red-400/10 border border-red-400/20",
                  formFieldSuccessText: "text-green-400",
                  formFieldWarningText: "text-yellow-400",
                  formFieldInputShowPasswordButton: "text-steelpolished-400 hover:text-steelpolished-300",
                  otpCodeFieldInput: "bg-steeldark-700 border border-steeldark-600 text-steelpolished-400 focus:border-accent",
                  formResendCodeLink: "text-accent hover:text-accent/80",
                  backButton: "text-steelpolished-400 hover:text-steelpolished-300",
                  navbar: "hidden",
                  navbarButton: "text-steelpolished-400 hover:text-steelpolished-300",
                  breadcrumbsItem: "text-steelpolished-500",
                  breadcrumbsItemDivider: "text-steelpolished-600",
                  breadcrumbsItemCurrent: "text-steelpolished-400",
                  verificationLinkStatusBox: "bg-steeldark-700 border border-steeldark-600",
                  verificationLinkStatusText: "text-steelpolished-400",
                  verificationLinkStatusIconBox: "text-accent",
                }
              }}
            />
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-steelpolished-500 text-sm">
              Already have an account?{' '}
              <a href="/sign-in" className="text-accent hover:text-accent/80 font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

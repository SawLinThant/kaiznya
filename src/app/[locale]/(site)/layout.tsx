import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/lib/constants';
import Navigation from '@/components/organisms/Navigation';
import { Footer } from '@/components';

interface SiteLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-white">
      <Navigation locale={locale} dict={dict} />
      <main className="max-w-7xl mx-auto py-3 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}



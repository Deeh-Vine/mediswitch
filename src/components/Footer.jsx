import { Pill, Heart, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-navy text-white/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">

          {/* Brand Column — spans 2 cols on md+ */}
          <div className="md:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-dark p-2 rounded-lg">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif font-bold text-2xl text-white">MediSwitch</span>
            </div>

            {/* Subtext */}
            <p className="text-sm leading-relaxed text-white/60 max-w-sm">
              Democratizing access to life-saving medication across Nigeria by connecting patients
              with NAFDAC-approved, affordable generic alternatives.
            </p>

            {/* Impact Badge */}
            <div className="border border-white/20 bg-white/5 p-3 rounded-xl mt-4 inline-flex items-start gap-3">
              <Globe className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#F5A623' }} />
              <p className="text-xs text-white/70 leading-snug">
                Aligned with <span className="text-white font-semibold">UN SDG 3</span>: Good Health &amp; Well-being.
              </p>
            </div>
          </div>

          {/* Spacer on lg to push links right */}
          <div className="hidden lg:block" />

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Search Drugs', href: '#' },
                { label: 'Find Pharmacies', href: '#' },
                { label: 'How it Works', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'NAFDAC Guidelines', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Privacy Policy', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/10 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2026 MediSwitch. Target: Nigeria &amp; Sub-Saharan Africa.</p>
          <p className="flex items-center gap-1.5">
            Built with{' '}
            <Heart
              className="w-3.5 h-3.5"
              fill="#D94040"
              style={{ color: '#D94040' }}
            />{' '}
            by Team RX Codes.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

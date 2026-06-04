import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShieldCheck,
  MapPin,
  Activity,
  Check,
  X,
  Users,
  Globe,
  ArrowRight,
  Pill
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PILL_DRUGS = ['Augmentin', 'Flagyl', 'Glucophage', 'Amlodipine', 'Coartem'];

const STATS = [
  { value: '200–400%', label: 'Drug price rise since 2023' },
  { value: '80%', label: 'Average patient savings' },
  { value: '40%+', label: 'Disease burden covered' },
  { value: '100%', label: 'NAFDAC certified' },
];

const CRISIS_CARDS = [
  {
    title: 'Prescriptions patients cannot fill',
    text: 'Over 60% of Nigerians report abandoning prescriptions at the counter due to unaffordable branded drug prices driven by forex and import volatility.',
    border: 'border-danger',
  },
  {
    title: 'Supply shrinkage from multinationals',
    text: 'Major pharmaceutical multinationals have exited or drastically reduced distribution in Nigeria, creating artificial scarcity that inflates cost further.',
    border: 'border-savings-amber',
  },
  {
    title: 'Treatment abandonment drives resistance',
    text: 'Incomplete drug courses due to cost lead to antimicrobial resistance—an emerging public health emergency that threatens entire communities.',
    border: 'border-danger',
  },
  {
    title: 'The knowledge gap — not a supply gap',
    text: 'NAFDAC-certified generics already exist on Nigerian shelves at a fraction of the cost. The problem is awareness. MediSwitch closes that gap.',
    border: 'border-savings-amber',
  },
];

const HOW_STEPS = [
  { num: '01', icon: <Search className="w-6 h-6" />, title: 'Search any drug', text: 'Type any branded drug name or active ingredient. Our engine maps it instantly.' },
  { num: '02', icon: <ShieldCheck className="w-6 h-6" />, title: 'See NAFDAC generics', text: 'View every verified NAFDAC-approved generic alternative with pricing in Naira.' },
  { num: '03', icon: <Activity className="w-6 h-6" />, title: 'Build trust with proof', text: 'Understand why the generic is identical: constituent tables, dosages, and AI explanation.' },
  { num: '04', icon: <MapPin className="w-6 h-6" />, title: 'Find it nearby', text: 'Locate the nearest partner pharmacy stocking your chosen generic and navigate there.' },
];

const WHO_CARDS = [
  {
    tier: 'Primary',
    icon: <Users className="w-7 h-7 text-primary-dark" />,
    title: 'Patient / Family member',
    text: 'Anyone prescribed a drug in Nigeria who needs to manage household healthcare costs without compromising treatment quality.',
    bg: 'bg-white border-primary-light/40',
    badge: 'bg-primary-pale text-primary-dark',
  },
  {
    tier: 'Secondary',
    icon: <Activity className="w-7 h-7 text-savings-amber" />,
    title: 'Community health worker / Nurse',
    text: 'Frontline health workers advising patients in primary care settings who need quick access to safe, affordable treatment alternatives.',
    bg: 'bg-white border-savings-amber/30',
    badge: 'bg-savings-bg text-dark-navy',
  },
  {
    tier: 'Tertiary',
    icon: <MapPin className="w-7 h-7 text-text-sec" />,
    title: 'Partner pharmacies',
    text: 'Registered retail and community pharmacies who stock verified NAFDAC generics and want to be discoverable by cost-conscious patients.',
    bg: 'bg-white border-border-dev',
    badge: 'bg-gray-100 text-text-sec',
  },
];

const COMPARISON_ROWS = [
  'General drug information',
  'Nigerian market data',
  'Local pricing in Naira',
  'Nigerian generic brands',
  'NAFDAC approval data',
  'Pharmacy locations',
];

const COMPARISON_COLS = [
  { name: 'ChatGPT / AI tools', checks: [true, false, false, false, false, false] },
  { name: 'Drugs.com', checks: [true, true, false, false, false, false] },
  { name: 'Google Search', checks: [true, false, false, false, false, false] },
  { name: 'MediSwitch', checks: [true, true, true, true, true, true], highlight: true },
];

export default function Landing() {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState('login');

  return (
    <div className="min-h-screen bg-bg-warm flex flex-col font-sans text-dark-navy">
      <Navbar />

      {/* ═══════════════════════════════════════
          SECTION 1: AUTH MODAL (UI ONLY)
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {showAuth && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuth(false)}
              className="absolute inset-0 bg-dark-navy/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl z-10 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-primary-dark p-6 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Pill className="w-5 h-5" />
                    <span className="font-serif font-bold text-lg">MediSwitch</span>
                  </div>
                  <button
                    onClick={() => setShowAuth(false)}
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-white/70 mt-2">
                  {authTab === 'login' ? 'Welcome back. Sign in to your account.' : 'Join thousands of Nigerians saving on prescriptions.'}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border-dev">
                {['login', 'signup'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setAuthTab(tab)}
                    className={`flex-1 py-3 text-sm font-bold transition-colors cursor-pointer ${
                      authTab === tab
                        ? 'text-primary-dark border-b-2 border-primary-dark bg-primary-pale/30'
                        : 'text-text-sec hover:text-dark-navy'
                    }`}
                  >
                    {tab === 'login' ? 'Log In' : 'Sign Up'}
                  </button>
                ))}
              </div>

              {/* Form */}
              <div className="p-6 space-y-4">
                {authTab === 'signup' && (
                  <div>
                    <label className="text-xs font-bold text-text-sec uppercase tracking-wider block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      placeholder="Adaeze Okonkwo"
                      className="w-full border border-border-dev rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-mid transition-colors"
                    />
                  </div>
                )}
                <div>
                  <label className="text-xs font-bold text-text-sec uppercase tracking-wider block mb-1.5">Email address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full border border-border-dev rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-mid transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-sec uppercase tracking-wider block mb-1.5">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-border-dev rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-mid transition-colors"
                  />
                </div>
                <button className="w-full bg-primary-dark hover:bg-primary-mid text-white font-bold py-3 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer mt-2">
                  {authTab === 'login' ? 'Sign In' : 'Create Account'}
                </button>
                <p className="text-center text-xs text-text-sec">
                  {authTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    onClick={() => setAuthTab(authTab === 'login' ? 'signup' : 'login')}
                    className="text-primary-dark font-bold hover:underline cursor-pointer"
                  >
                    {authTab === 'login' ? 'Sign up free' : 'Log in'}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════
          SECTION 2: HERO
      ═══════════════════════════════════════ */}
      <section className="bg-primary-dark text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Nigeria's Generic Drug Finder
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            Same medicine.{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Smarter price.</span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-white/10 rounded" />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/75 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            MediSwitch helps Nigerians find NAFDAC-approved generic alternatives to expensive branded drugs instantly — saving up to 80% at the counter with the same active ingredients, same dosage, same effect.
          </motion.p>

          {/* Fake Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => navigate('/home')}
            className="flex items-center bg-white rounded-2xl shadow-xl overflow-hidden max-w-xl mx-auto cursor-pointer group"
          >
            <Search className="w-5 h-5 text-text-mut ml-5 shrink-0" />
            <span className="flex-1 py-4 px-4 text-text-mut text-sm font-medium text-left">
              Search drugs... e.g. Augmentin, Panadol
            </span>
            <div className="bg-primary-dark group-hover:bg-[#0A6640] text-white font-bold text-sm px-5 py-4 transition-colors shrink-0 flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </div>
          </motion.div>

          {/* Quick Pill Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-2"
          >
            <span className="text-xs text-white/50 font-medium self-center">Try:</span>
            {PILL_DRUGS.map((drug) => (
              <button
                key={drug}
                onClick={() => navigate('/home')}
                className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer"
              >
                {drug}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3: STATS BAR
      ═══════════════════════════════════════ */}
      <section className="bg-white border-b border-border-dev">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border-dev">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center px-4 py-2"
              >
                <div className="font-serif text-3xl md:text-4xl font-bold text-primary-dark">{stat.value}</div>
                <div className="text-xs text-text-sec font-medium mt-1 leading-snug">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4: AFFORDABILITY CRISIS
      ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-bg-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold text-danger uppercase tracking-widest">The Reality</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark-navy">
              The drug affordability crisis in Nigeria
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CRISIS_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-2xl p-6 border-l-4 ${card.border} shadow-sm hover:shadow-md transition-shadow space-y-3`}
              >
                <h3 className="font-serif font-bold text-lg text-dark-navy leading-snug">{card.title}</h3>
                <p className="text-sm text-text-sec leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5: HOW IT WORKS
      ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white border-t border-border-dev">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 space-y-3">
            <span className="text-xs font-bold text-primary-dark uppercase tracking-widest">The Process</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark-navy">How MediSwitch works</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex flex-col gap-4"
              >
                {/* Connector line (desktop) */}
                {i < HOW_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+2rem)] right-0 h-px bg-border-dev z-0" />
                )}
                <div className="relative z-10 w-14 h-14 bg-primary-pale rounded-2xl flex items-center justify-center text-primary-dark shadow-sm">
                  {step.icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-text-mut font-mono">{step.num}</span>
                  <h3 className="font-serif font-bold text-base text-dark-navy mt-0.5">{step.title}</h3>
                  <p className="text-sm text-text-sec leading-relaxed mt-1">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6: WHO WE SERVE
      ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-bg-warm border-t border-border-dev">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold text-primary-dark uppercase tracking-widest">Our Users</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark-navy">Who MediSwitch serves</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHO_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all space-y-4 ${card.bg}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="bg-bg-warm p-3 rounded-xl">{card.icon}</div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${card.badge}`}>
                    {card.tier}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-dark-navy">{card.title}</h3>
                  <p className="text-sm text-text-sec leading-relaxed mt-2">{card.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7: TRUST BANNER
      ═══════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div className="flex justify-center">
              <div className="bg-white/10 border border-white/20 p-5 rounded-2xl">
                <ShieldCheck className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
              Trusted. Verified. Made for Nigerians.
            </h2>
            <p className="text-white/65 text-base max-w-xl mx-auto">
              Every alternative on MediSwitch is NAFDAC-registered, bioequivalent, and sourced from verified Nigerian market data.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: <ShieldCheck className="w-4 h-4" />, text: 'NAFDAC Approved' },
              { icon: <Activity className="w-4 h-4" />, text: 'Save up to 80%' },
              { icon: <MapPin className="w-4 h-4" />, text: '100+ Pharmacies' },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-2.5 rounded-full text-sm font-semibold"
              >
                {badge.icon}
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 8: COMPETITOR COMPARISON
      ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white border-t border-border-dev overflow-x-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold text-primary-dark uppercase tracking-widest">The Advantage</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark-navy">
              Why MediSwitch vs everything else
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border-dev shadow-sm">
            <table className="w-full min-w-[560px] text-sm border-collapse">
              <thead>
                <tr className="bg-bg-warm">
                  <th className="text-left p-4 text-xs font-bold text-text-sec uppercase tracking-wider border-b border-border-dev w-2/5">
                    Feature
                  </th>
                  {COMPARISON_COLS.map((col) => (
                    <th
                      key={col.name}
                      className={`p-4 text-center text-xs font-bold uppercase tracking-wider border-b border-border-dev ${
                        col.highlight
                          ? 'bg-primary-dark text-white'
                          : 'text-text-sec'
                      }`}
                    >
                      {col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dev">
                {COMPARISON_ROWS.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-bg-warm/60 transition-colors">
                    <td className="p-4 font-medium text-dark-navy">{row}</td>
                    {COMPARISON_COLS.map((col, cIdx) => (
                      <td
                        key={cIdx}
                        className={`p-4 text-center ${col.highlight ? 'bg-primary-dark/5' : ''}`}
                      >
                        {col.checks[rIdx] ? (
                          <span className="inline-flex justify-center">
                            <Check className={`w-5 h-5 ${col.highlight ? 'text-primary-dark' : 'text-primary-dark/60'}`} strokeWidth={2.5} />
                          </span>
                        ) : (
                          <span className="inline-flex justify-center">
                            <X className="w-5 h-5 text-danger/50" strokeWidth={2.5} />
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 9: ABOUT RX CODES & SDG
      ═══════════════════════════════════════ */}
      <section className="bg-dark-navy text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: About RX Codes */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 bg-primary-dark text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                <Pill className="w-3.5 h-3.5" />
                Built by Team RX Codes
              </span>

              <h2 className="font-serif text-3xl md:text-4xl font-bold leading-snug">
                We are a growing community of techies in health building solutions.
              </h2>

              <p className="text-white/65 text-sm leading-relaxed">
                RX Codes is a forward-driven team of pharmacy students with a shared passion for technology and innovation while rooted in the health sciences. Our diverse interests and skills have led us to explore ideas, innovate and build. By embracing technology and innovation we are working towards becoming professionals who embrace change, lead and shape the future of digital health to build a thriving and efficient health sector.
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white text-dark-navy font-bold text-sm px-6 py-3 rounded-xl hover:bg-primary-pale transition-all group"
              >
                See more about RX Codes
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Right: SDG Impact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Standards Status</span>
                <div className="flex items-center gap-3 mt-3">
                  <div className="bg-primary-dark/70 border border-primary-light/30 p-3 rounded-xl">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 font-medium">United Nations SDG</div>
                    <div className="font-serif font-bold text-white text-xl leading-tight">Goal 3</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-3">
                <h3 className="font-serif font-bold text-xl md:text-2xl text-white leading-snug">
                  UN SDG 3 Target: Good Health & Well-being
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Ensuring access to certified generic substitutes to build a thriving and efficient health sector — reducing financial toxicity as a barrier to treatment in Nigeria.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {['Access', 'Equity', 'Affordability'].map((tag) => (
                  <div key={tag} className="bg-white/5 border border-white/10 rounded-xl py-2.5 text-center text-xs font-bold text-white/70 uppercase tracking-wider">
                    {tag}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-bg-warm border-t border-border-dev">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark-navy">
            Stop overpaying for your prescriptions.
          </h2>
          <p className="text-text-sec text-base">
            Search for any branded drug and find a NAFDAC-verified generic alternative in seconds — free, always.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/home')}
              className="bg-primary-dark hover:bg-[#0A6640] text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-sm active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search drugs for free
            </button>
            <button
              onClick={() => setShowAuth(true)}
              className="border border-border-dev bg-white hover:border-primary-mid text-dark-navy font-bold px-8 py-3.5 rounded-xl transition-all"
            >
              Create free account
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

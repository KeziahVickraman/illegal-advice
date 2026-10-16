import React from "react";
import { ShieldCheck, Scale, ExternalLink, AlertTriangle, PhoneCall, HelpCircle } from "lucide-react";

export function RealHelpFooter() {
  return (
    <footer
      id="real-help-footer"
      aria-labelledby="real-help-heading"
      className="bg-slate-900 text-slate-100 border-t-8 border-amber-500 py-16 px-4"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Solemn Disclaimer Header */}
        <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5 shadow-lg">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/40 shrink-0">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2
              id="real-help-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2"
            >
              Real Legal Help & Statutory Notice
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              <strong className="text-amber-400 font-semibold">Not Guilty-ish Legal</strong> is a comedic satire and public legal education project. This website is{" "}
              <span className="underline decoration-amber-400">NOT a real law firm</span> and does not provide formal legal representation, attorney-client relationship, or actionable legal advice. If you or someone you know is facing criminal allegations or active court proceedings, you must consult genuine, qualified professionals immediately.
            </p>
          </div>
        </div>

        {/* Real Legal Resources Directory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Option 1: Qualified Private Attorney */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col justify-between hover:border-slate-500 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
                <Scale className="w-4 h-4" />
                Option 01
              </div>
              <h3 className="text-xl font-bold text-white mt-2">
                Qualified Private Defense Lawyer
              </h3>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                Retain an accredited attorney licensed by your jurisdiction's Bar Association or Law Society. A qualified criminal defence specialist can assess your case particulars, represent you at bail hearings, and navigate evidence discovery.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/80">
              <a
                href="https://www.lawsociety.org.sg/for-public/finding-a-lawyer/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                aria-label="Find a qualified lawyer directory link"
              >
                <span>Find an Accredited Lawyer Directory</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Option 2: Public Defender's Office (PDO) */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col justify-between hover:border-slate-500 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wider uppercase">
                <ShieldCheck className="w-4 h-4" />
                Option 02
              </div>
              <h3 className="text-xl font-bold text-white mt-2">
                Public Defender's Office (PDO)
              </h3>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                The Public Defender's Office provides government-funded legal aid and criminal defense representation for eligible individuals who cannot afford private legal counsel and pass statutory means and merits criteria.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/80">
              <a
                href="https://pdo.mlaw.gov.sg/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                aria-label="Public Defender's Office portal link"
              >
                <span>Public Defender's Office Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Option 3: Criminal Legal Aid Scheme (CLAS) */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col justify-between hover:border-slate-500 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs tracking-wider uppercase">
                <HelpCircle className="w-4 h-4" />
                Option 03
              </div>
              <h3 className="text-xl font-bold text-white mt-2">
                Criminal Legal Aid Scheme (CLAS)
              </h3>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                Administered by Pro Bono SG, CLAS offers free legal representation by volunteer lawyers to individuals facing non-capital criminal charges who meet financial means testing criteria.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/80">
              <a
                href="https://www.probono.sg/our-services/legal-representation/clas/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                aria-label="Criminal Legal Aid Scheme CLAS application link"
              >
                <span>Apply for CLAS Assistance</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Immediate Rights Reminder & Contact Safeguards */}
        <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 text-xs sm:text-sm text-slate-400 space-y-3">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <PhoneCall className="w-4 h-4 text-amber-400" />
            What to do if you are currently arrested or detained:
          </div>
          <ul className="list-disc list-inside space-y-1.5 pl-2 leading-relaxed">
            <li>Remain calm and state your identity accurately as required by law.</li>
            <li>Politely exercise your right to remain silent to avoid unintentional self-incrimination.</li>
            <li>Request to contact an attorney or your family member at the earliest reasonable opportunity.</li>
            <li>Do not sign statements without reading them carefully and having them interpreted if necessary.</li>
          </ul>
        </div>

        {/* Copyright and Closing Note */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} Not Guilty-ish Legal (Comedic Strip-Mall Satire & Legal Literacy Project). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400">Satire & Education</span>
            <span>•</span>
            <span className="hover:text-slate-400">Zero Real Retainers Accepted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

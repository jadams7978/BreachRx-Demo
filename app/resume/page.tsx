// ===============================================
// app/resume/page.tsx
// ===============================================
import Header from '@/components/Header';
import Link from 'next/link';

export default function ResumePage() {
  return (
    <>
      <Header />
      <main className="py-8">
        <div className="mb-6">
          <Link href="/" className="text-sm text-brx-blue hover:underline">
            ← Back to Home
          </Link>
        </div>
        <h1 className="font-heading mb-6 text-2xl font-semibold text-brx-navy">Resume</h1>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-8">
          {/* Contact Header */}
          <div className="text-center border-b border-gray-200 pb-6">
            <h2 className="font-heading text-xl font-semibold text-brx-navy">John Adams</h2>
            <p className="text-sm text-brx-text-body mt-2">
              Fayetteville, AR | 870-584-7978 | jadams7978@gmail.com |{' '}
              <a
                href="https://www.linkedin.com/in/john-adams-171713133/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brx-blue hover:underline"
              >
                LinkedIn
              </a>
            </p>
            <a
              href="/john-adams-resume.pdf"
              download
              className="inline-block mt-4 rounded-full bg-brx-blue px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brx-blue-hover"
            >
              Download PDF
            </a>
          </div>

          {/* About */}
          <section>
            <h3 className="font-heading text-base font-semibold text-brx-navy mb-3 uppercase">About</h3>
            <p className="text-sm text-brx-text-body">
              I'm John, Lead UI Developer located in Fayetteville, Arkansas with nearly five years of experience building internal tools.
            </p>
            <p className="text-sm text-brx-text-body mt-2">
              As AI raises the stakes for both defenders and attackers, I'm especially motivated by work that reduces chaos and strengthens security. I enjoy taking messy, manual workflows and turning them into clear, reliable systems, and I'd love to apply that mindset to BreachRx's mission.
            </p>
          </section>

          {/* Professional Experience */}
          <section>
            <h3 className="font-heading text-base font-semibold text-brx-navy mb-4 uppercase">Professional Experience</h3>

            <div className="space-y-6">
              {/* Acxiom */}
              <div>
                <h4 className="font-medium text-brx-text-heading">
                  Acxiom LLC <span className="font-normal text-brx-text-body">| Conway, AR</span>
                </h4>

                <div className="mt-3">
                  <h5 className="font-medium text-brx-blue">
                    Lead UI Developer <span className="font-normal text-brx-text-body">| Feb 2025 – Present</span>
                  </h5>
                  <ul className="mt-2 space-y-1 text-sm text-brx-text-body list-disc pl-5">
                    <li>End-to-end owner and lead developer of an internal UI enabling self-service functionality.</li>
                    <li>Fully adopted an AI mindset to refactor legacy code, generate creative and efficient solutions across unfamiliar stacks, eliminate language/tooling barriers, and consistently deliver high-impact features.</li>
                    <li>Designed and implemented high-performance backend and frontend solutions using Node.js, React, and Express, reducing weekly billing workflow from 4 hours to 30 minutes.</li>
                    <li>Designed and implemented a front-end tool allowing client teams to manage their own data inputs, reducing backend support tickets and saving hours of coordination each week.</li>
                    <li>Migrated UI from react-scripts to Vite, significantly improving local build times, hot module reload performance, and overall dev experience.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium text-brx-blue">
                    Associate Solution Developer <span className="font-normal text-brx-text-body">| Sep 2021 – Feb 2025</span>
                  </h5>
                  <ul className="mt-2 space-y-1 text-sm text-brx-text-body list-disc pl-5">
                    <li>Re-architected the Nightly Build system (SQL, Bash, Perl), reducing execution time from 9 hours to 2.5 hours.</li>
                    <li>Spearheaded GitHub migration as CMPI Change Manager, ensuring seamless version control and CI/CD pipeline adoption.</li>
                    <li>Built performance-oriented scripts in Perl and Bash to consolidate large file sets, removing manual intervention from operations.</li>
                    <li>Conducted code reviews and mentored developers, promoting reusable code and consistent Git workflows.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium text-brx-blue">
                    Intern Solution Developer <span className="font-normal text-brx-text-body">| May 2021 – Sep 2021</span>
                  </h5>
                  <ul className="mt-2 space-y-1 text-sm text-brx-text-body list-disc pl-5">
                    <li>Developed shell and SQL scripts to automate data validation and generate reports.</li>
                    <li>Designed and developed PL/SQL procedures and triggers to optimize database processes.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="font-heading text-base font-semibold text-brx-navy mb-4 uppercase">Education</h3>
            <div>
              <h4 className="font-medium text-brx-text-heading">Southern New Hampshire University</h4>
              <p className="text-sm mt-1">
                <span className="font-medium text-brx-blue">B.S. in Cybersecurity</span>
                <span className="text-brx-text-body"> | 2020 – 2023</span>
              </p>
              <p className="text-sm text-brx-text-body mt-1">Graduated Summa Cum Laude (4.0 GPA) while working full-time.</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
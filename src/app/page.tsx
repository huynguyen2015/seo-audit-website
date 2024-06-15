import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://www.1hour.dev/tools"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/logo.png"
            alt="1hour.dev logo"
            width={180}
            height={180}
            priority
          />
        </a>
      </div>

      <div className="container mt-10 grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card text-card-foreground cursor-pointer rounded-xl border shadow">
          <a
            href="https://www.1hour.dev/tools/stripe"
            title="Stripe Notification Generator"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none">
                Stripe Notification Generator
              </h3>
              <p className="text-muted-foreground pt-2 text-sm">
                Generate fake Stripe notifications to fool your friends or to
                manifest your goals.
              </p>
            </div>
          </a>
        </div>
        <div className="bg-card text-card-foreground cursor-pointer rounded-xl border shadow">
          <a
            href="https://www.1hour.dev/tools/x-revenue"
            title="X Ad Revenue Generator"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none">
                X Ad Revenue Generator
              </h3>
              <p className="text-muted-foreground pt-2 text-sm">
                Generate fake X Ad Revenue notifications to fool your friends or
                to manifest your goals.
              </p>
            </div>
          </a>
        </div>
        <div className="bg-card text-card-foreground cursor-pointer rounded-xl border shadow">
          <a
            href="https://www.1hour.dev/tools/x-check"
            title="Twitter shadow ban check"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none">
                Twitter shadow ban check
              </h3>
              <p className="text-muted-foreground pt-2 text-sm">
                Check twitter account has been shadow ban or not
              </p>
            </div>
          </a>
        </div>
        <div className="bg-card text-card-foreground cursor-pointer rounded-xl border shadow">
          <a
            href="https://www.1hour.dev/tools/fb-extract"
            title="Download facebook video, facebook reels, free"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none">
                Download facebook video
              </h3>
              <p className="text-muted-foreground pt-2 text-sm">
                Help to download facebook video, facebook reels for free
              </p>
            </div>
          </a>
        </div>
        <div className="bg-card text-card-foreground cursor-pointer rounded-xl border shadow">
          <a
            href="/keyword-analyze"
            title="Analyze website keyword, keyword analyze, audit keyword website"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none">
                Analyze website&apos;s keyword
              </h3>
              <p className="text-muted-foreground pt-2 text-sm">
                Help to analyze website keyword by sitemap url. It&apos;ll count
                the current keywords in website and help you to find the top of
                focusing keywords
              </p>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}

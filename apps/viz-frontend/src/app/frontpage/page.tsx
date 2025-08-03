'use client';

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Layout from '@/src/components/Layout'
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// import { CldImage } from 'next-cloudinary';

import { US, BO, ES, DE, DK, BR, IN } from 'country-flag-icons/react/3x2'
import ReactIcon from '@/src/svg/reactIcon.svg'
import NextIcon from '@/src/svg/nextIcon.svg'
import NestIcon from '@/src/svg/nestIcon.svg'
import SupabaseIcon from '@/src/svg/supabaseIcon.svg'
import VercelIcon from '@/src/svg/vercelIcon.svg'
import PrismaIcon from '@/src/svg/prismaIcon.svg'
import GraphQLIcon from '@/src/svg/graphqlIcon.svg'
import TailwindIcon from '@/src/svg/tailwindIcon.svg'
import ShadcnIcon from '@/src/svg/shadcnIcon.svg'
import PostgresIcon from '@/src/svg/postgresIcon.svg'
import GmailIcon from '@/src/svg/gmailIcon.svg'
import GithubIcon from '@/src/svg/githubIcon.svg'
import LinkedinIcon from '@/src/svg/linkedinIcon.svg'
import WhatsappIcon from '@/src/svg/whatsappIcon.svg'
import LetterIcon from '@/src/svg/letterIcon.svg'
import ContactsIcon from '@/src/svg/contactsIcon.svg'
import ProjectsIcon from '@/src/svg/projectsIcon.svg'
import AboutMeIcon from '@/src/svg/aboutmeIcon.svg'
import PaymentsIcon from '@/src/svg/paymentsIcon.svg'
import HomeIcon from '@/src/svg/homeIcon.svg'
import YoutubeIcon from '@/src/svg/youtubeIcon.svg'

import { ConsoleLogoGreeting } from '@/src/components/ConsoleLogoGreeting'
import { CellphoneLogoGreeting } from '@/src/components/CellphoneLogoGreeting'
import {
  isMobile,
  isTablet,
  isDesktop,
  isAndroid,
  isIOS,
  isWindows,
  isMacOs,
} from "react-device-detect";
import { useWindowSize, useWindowScroll } from "@uidotdev/usehooks";
import './page.css';

const navigation = [
  { name: 'Sobre mi', href: '#' },
  { name: 'Servicios', href: '#' },
  { name: 'Productos', href: '#' },
  { name: 'Preguntame', href: '#' },
]

export function useDeviceType() {
  if (isAndroid) return "android";
  if (isIOS) return "ios";
  if (isTablet) return "tablet";
  if (isMobile) return "mobile";
  if (isDesktop) return "desktop";
  if (isWindows) return "windows";
  if (isMacOs) return "mac";
  return "unknown";
}

export default function Page() {


  useEffect(() => {
    const deviceType = useDeviceType();
    if (isMobile) {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.setAttribute("content", "#111827");
      } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "theme-color";
        newMeta.content = "#111827";
        document.head.appendChild(newMeta);
      }
    }
  }, []);

  // create array of strings
  const softwareDeveloperLanguages: { title: string; flag: React.ReactNode }[] = [
    { title: 'Software Developer', flag: <US title="English" width={24} /> },
    { title: 'Desarrollador de Software', flag: <ES title="Espaniol" width={24} /> },
    { title: 'Softwareudvikler', flag: <DK title="Danish" width={24} /> },
    { title: 'Desenvolvedor de software', flag: <BR title="Portugues" width={24} /> },
    { title: 'Softwareentwickler', flag: <DE title="German" width={24} /> },
    { title: 'सॉफ़्टवेयर डेवलपर', flag: <IN title="Hindi" width={24} /> }
  ];

  const techStackIcons = [
    { src: ReactIcon, alt: 'React', link: 'https://reactjs.org/', width: 48, height: 48, textColor: 'hover:text-cyan-500' },
    { src: NextIcon, alt: 'NextJS', link: 'https://nextjs.org/', width: 64, height: 48, textColor: 'hover:text-black dark:text-white' },
    { src: NestIcon, alt: 'NestJS', link: 'https://nestjs.com/', width: 48, height: 48, textColor: 'hover:text-red-400' },
    { src: SupabaseIcon, alt: 'Supabase', link: 'https://supabase.com/', width: 48, height: 48, textColor: 'hover:text-emerald-500' },
    { src: VercelIcon, alt: 'Vercel', link: 'https://vercel.com/', width: 40, height: 48, textColor: 'hover:text-black dark:text-white' },
    { src: PrismaIcon, alt: 'Prisma', link: 'https://www.prisma.io/', width: 48, height: 48, textColor: 'hover:text-gray-400' },
    { src: GraphQLIcon, alt: 'GraphQL', link: 'https://graphql.org/', width: 48, height: 48, textColor: 'hover:text-pink-500' },
    { src: TailwindIcon, alt: 'TailwindCSS', link: 'https://tailwindcss.com/', width: 56, height: 48, textColor: 'hover:text-sky-400' },
    { src: ShadcnIcon, alt: 'Shadcn/ui', link: 'https://ui.shadcn.com/', width: 48, height: 48, textColor: 'hover:text-gray-500' },
    { src: PostgresIcon, alt: 'PostgreSQL', link: 'https://www.postgresql.org/', width: 48, height: 48, textColor: 'hover:text-blue-300' }
  ];
  // const [terminalLineData, setTerminalLineData] = useState<React.ReactElement[]>(
  //   [<TerminalOutput key={0}>Hola Developer Bienvenido :)</TerminalOutput>],
  // );
  // const [showGreetingConsole, setShowGreetingConsole] = useState(true)
  const [{ x, y }, scrollTo] = useWindowScroll();
  const [section1Position, setSection1Position] = useState(0);
  // const [heightWindow, setHeightWindow] = useState(0);
  const size = useWindowSize();
  const section1Ref = useRef<HTMLDivElement>(null);
  const [headerWidth, setHeaderWidth] = useState(0);


  const scrollToSection = (offset = 0) => {
    if (section1Ref.current) {
      const y = section1Ref.current.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // useEffect(() => {
  //   if (size && typeof size.height === "number") {
  //     setHeightWindow(size.height);
  //   }
  // }, [size]);

  // useEffect(() => {

  //   console.log('entro a useEffect', section1Ref.current)
  //   if (section1Ref.current) {
  //     setSection1Position(section1Ref.current.getBoundingClientRect().top + window.scrollY);
  //     console.log('Posición Y del elemento:', section1Position);
  //   }
  //   const deviceType = useDeviceType();
  //   if (deviceType === 'mobile' || deviceType === 'android' || deviceType === 'ios') {
  //     setHeaderWidth(30);
  //     console.log('Mobile device detected');
  //   }
  //   if (deviceType === 'desktop') {
  //     setHeaderWidth(35);
  //     console.log('Desktop device detected');
  //   }
  //   console.log('Device Type:', deviceType);

  // }, []);

  useEffect(() => {
    if (section1Ref.current) {
      setSection1Position(section1Ref.current.getBoundingClientRect().top);
      console.log('Posición Y del elemento:', section1Position);
    }
  }, [size.height]);

  useEffect(() => {
    setTimeout(() => {
      if (section1Ref.current) {
        setSection1Position(section1Ref.current.getBoundingClientRect().top);
        console.log('Posición Y del elemento:', section1Position);
      }
    }, 0);
  }, []);

  if (!size.height && !section1Ref.current) {
    return (
      <>
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <span className="mb-4 text-lg text-slate-400">Loading...</span>
          <div className="w-8 h-8 border-4 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    )
  }


  return (
    <Layout navigation={navigation}>

      {/* <h1 className="text-4xl font-bold text-gray-400 mb-6">
          <span className="inline-flex items-center transition-transform duration-500 ease-in-out -translate-y-10 hover:translate-y-0">
            <BO title="Bolivia" width={30} className='rounded-sm' />
            <span className="ml-2"> {' '} Hi, I'm Oscar Cortez</span>
          </span>
        </h1> */}
      {/* <h1 style={{ wordBreak: 'break-word', hyphens: 'auto' }} className="mx-auto text-4xl text-justify max-w-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent whitespace-pre-line break-words hyphens-auto">
          {softwareDeveloperLanguages.map((lang, index) => (
            <span key={index} >
              <Tooltip>
                <TooltipTrigger asChild>
                  <a className="cursor-pointer transition duration-200 ease-in-out">
                    {lang.title}
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  {lang.flag}
                </TooltipContent>
              </Tooltip>
              {index < softwareDeveloperLanguages.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </h1> */}

      {/* <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-stretch">
          <div className="flex-1 flex justify-center">
            <ConsoleLogo />
          </div>
          <div className="flex-1 flex flex-col justify-center text-2xl text-gray-400 max-w-2xl space-y-7 sm:mt-0 mt-10">
            <h1 className="text-4xl font-bold text-gray-400 mb-6">
              <span className="inline-flex items-center">
                <BO title="Bolivia" width={30} className='rounded-sm' />
                <span className="ml-2">
                  {' '}
                  Hi, I'm Oscar Cortez
                </span>
              </span>
              <span >
                esto es una prueba
              </span>
            </h1>
          </div>
        </div> */}
      <div
        className="min-h-screen w-full relative bg-black section-container"
        style={size?.height ? { height: `${size.height}px` } : undefined}>
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
          }}
        />
        <div className="flex flex-col w-full min-h-screen items-center justify-center gap-10 relative">
          <div className="w-full md:w-md md:h-48 hidden sm:block">
            <ConsoleLogoGreeting />
          </div>
          <div className="w-full md:w-md md:h-48 block sm:hidden">
            <CellphoneLogoGreeting />
          </div>
          <div className="w-full md:w-[60%] p-4 bg-slate-900 rounded-xl shadow-lg">
            <h1 className="text-center text-gray-800 dark:text-gray-400 mb-5 sm:mb-1 space-y-6">
              <p className="inline-flex items-center justify-center text-4xl md:text-4xl font-extrabold tracking-tight">
                <span className="hidden sm:block">
                  Hi, I’m Oscar Cortez — a Software Engineer with a degree in Computer Science.
                </span>
                <span className="block sm:hidden text-3xl">
                  Hi, I’m Oscar Cortez, Software Engineer
                </span>
              </p>
              <p className="mx-auto max-w-4xl text-lg md:text-2xl text-justify font-medium bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-relaxed">
                <span className="hidden sm:block">
                  I’ve worked as a Database Administrator (DBA), ETL Developer, and now I specialize in full-stack software development — from backend logic to user-facing interfaces
                </span>
                <span className="block sm:hidden">
                  I’ve worked as a DBA, ETL Developer, and now I specialize in full-stack software development.
                </span>
              </p>
              <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-400">
                <span className="hidden sm:block">
                  Thanks for stopping by — welcome to my professional site. 💙
                </span>
                <span className="block sm:hidden">
                  Thanks for visiting 💙
                </span>
              </p>
            </h1>
          </div>
        </div>

        <section
        // ref={section1Ref}
        // className='-mt-35'
        >
          <div className="text-center md:mt-10 text-balance !text-5xl relative">
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl z-40 bg-slate-900/80 backdrop-blur-md rounded-b-xl flex-row items-center justify-center gap-6 px-4 shadow-lg hidden sm:flex">
              <button
                onClick={() => {
                  scrollTo({ top: size?.height, behavior: 'smooth' });
                  console.log('Scroll to section 1 clicked');
                }}
                className="text-slate-300 text-lg px-6 py-3 border-b-2 border-transparent transition-all duration-300 hover:drop-shadow-xl hover:border-slate-500 bg-transparent"
              >
                Contact me
              </button>
              <Link
                href=""
                className="text-emerald-200 text-lg px-6 py-3 border-b-2 border-transparent transition-all duration-300 hover:drop-shadow-xl hover:border-emerald-300"
              >
                Projects
              </Link>
              <Link
                href=""
                className="text-indigo-200 text-lg px-6 py-3 border-b-2 border-transparent transition-all duration-300 hover:drop-shadow-xl hover:border-indigo-500"
              >
                My mentors
              </Link>
              <Link
                href=""
                className="text-rose-200 text-lg px-6 py-3 border-b-2 border-transparent transition-all duration-300 hover:drop-shadow-xl hover:border-rose-300"
              >
                Tech tips
              </Link>
              <Link
                href=""
                className="text-violet-300 text-lg px-6 py-3 border-b-2 border-transparent transition-all duration-300 hover:drop-shadow-xl hover:border-violet-400"
              >
                Payments
              </Link>

            </div>
            {/* <span className='hidden sm:block'>Not enough? Keep scrolling to discover more cool stuff. 🚀</span> */}

            {/* <span className="block sm:hidden text-3xl"> More cool stuff 🚀</span> */}
            <div className="text-white w-full h-14 fixed left-0 bottom-0 block sm:hidden z-50 backdrop-blur-md bg-black/60">
              <div className="flex justify-around items-center py-4 h-full">
                <button
                  className="flex flex-col items-center bg-transparent border-none outline-none cursor-pointer"
                  onClick={() => scrollToSection(-22)}
                >
                  <Image src={ContactsIcon} alt="Resume Icon" width={28} height={28} />
                  <span className="text-xs">Contacts</span>
                </button>
                <button
                  className="flex flex-col items-center bg-transparent border-none outline-none cursor-pointer"
                  onClick={() => console.log('Projects button clicked')}
                >
                  <Image src={ProjectsIcon} alt="Resume Icon" width={28} height={28} />
                  <span className="text-xs">Projects</span>
                </button>
                <button
                  className="flex flex-col items-center bg-transparent border-none outline-none cursor-pointer"
                  onClick={() => console.log('About me button clicked')}
                >
                  <Image src={AboutMeIcon} alt="Resume Icon" width={28} height={28} />
                  <span className="text-xs">About me</span>
                </button>
                <button
                  className="flex flex-col items-center bg-transparent border-none outline-none cursor-pointer"
                  onClick={() => console.log('Payments button clicked')}
                >
                  <Image src={PaymentsIcon} alt="Resume Icon" width={28} height={28} />
                  <span className="text-xs">Payments</span>
                </button>
                <button
                  className="flex flex-col items-center bg-transparent border-none outline-none cursor-pointer"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <Image src={HomeIcon} alt="Resume Icon" width={28} height={28} />
                  <span className="text-xs">Home</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-stretch section-container">
        <div ref={section1Ref} className="w-full max-w-4xl mx-auto mt-5 mb-10">
          <h2
            className="text-3xl font-bold text-left mb-4 text-slate-900 dark:text-slate-100"
            contentEditable
            suppressContentEditableWarning={true}
          >
            Get in touch
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-400 hidden sm:block">
            Reach out for collaboration, questions, or just to say hello!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="mailto:oscarkortez@gmail.com"
              className="bg-slate-100 dark:bg-slate-800 rounded-xl shadow flex items-center justify-between group transition google-gradient-border py-3 px-5"
            >
              <div>
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-400">Email</h3>
                <span className="text-slate-300 group-hover:underline break-all">
                  oscarkortez@gmail.com
                </span>
              </div>
              <div className="flex items-center">
                <Image src={GmailIcon} alt="Gmail Icon" width={32} height={32} className="transition-transform duration-200 group-hover:scale-120" />
              </div>
            </a>
            <a
              href="https://linkedin.com/in/oscarkortez"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100 dark:bg-slate-800 rounded-xl shadow flex items-center justify-between group transition hover:ring-2 hover:ring-blue-400 py-3 px-5"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-400">LinkedIn</h3>
                <span className="text-slate-300 group-hover:underline break-all">
                  linkedin.com/in/oscarkortez
                </span>
              </div>
              <div className="flex items-center ml-6">
                <Image src={LinkedinIcon} alt="LinkedIn Icon" width={32} height={32} className="transition-transform duration-200 group-hover:scale-120" />
              </div>
            </a>
            <a
              href="https://www.youtube.com/@OSCARCORTEZVILLCA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100 dark:bg-slate-800 rounded-xl shadow flex items-center justify-between group transition hover:ring-2 hover:ring-red-400 py-3 px-5"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-400">YouTube</h3>
                <span className="text-slate-300 group-hover:underline break-all">
                  @OSCARCORTEZVILLCA
                </span>
              </div>
              <div className="flex items-center ml-6">
                <Image src={YoutubeIcon} alt="YouTube Icon" width={32} height={32} className="transition-transform duration-200 group-hover:scale-120" />
              </div>
            </a>
            <a
              href="https://github.com/oscarcortez"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100 dark:bg-slate-800 rounded-xl shadow flex items-center justify-between group transition hover:ring-2 hover:ring-slate-400 py-3 px-5"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-400">GitHub</h3>
                <span className="text-slate-300 group-hover:underline break-all">
                  github.com/oscarkortez
                </span>
              </div>
              <div className="flex items-center ml-6">
                <Image src={GithubIcon} alt="Github Icon" width={32} height={32} className="transition-transform duration-200 group-hover:scale-120" />
              </div>
            </a>
            <a
              href="https://wa.me/59177703364"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100 dark:bg-slate-800 rounded-xl shadow flex items-center justify-between group transition hover:ring-2 hover:ring-green-300 py-3 px-5"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-400">Whatsapp</h3>
                <span className="text-slate-300 group-hover:underline break-all">
                  +591 77703364
                </span>
              </div>
              <div className="flex items-center ml-6">
                <Image src={WhatsappIcon} alt="Whatsapp Icon" width={32} height={32} className="transition-transform duration-200 group-hover:scale-120" />
              </div>
            </a>
            <a
              href="https://linkedin.com/in/oscarkortez"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100 dark:bg-slate-800 rounded-xl shadow flex items-center justify-between group transition hover:ring-2 hover:ring-red-300 py-3 px-5"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-400">Resume</h3>
                <span className="text-slate-300 group-hover:underline break-all">
                  resume_oscarcortez.pdf
                </span>
              </div>
              <div className="flex items-center ml-6">
                <Image src={LetterIcon} alt="Resume Icon" width={32} height={32} className="transition-transform duration-200 group-hover:scale-120" />
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-stretch section-container">
        <div ref={section1Ref} className="w-full max-w-4xl mx-auto mt-5 mb-10">
          <h2 className="text-3xl font-bold text-left mb-4 text-slate-900 dark:text-slate-100">Payments</h2>
          <p className="mb-8 text-gray-600 dark:text-gray-400 hidden sm:block">
            If you want to support my work or hire me for a project, here are some payment options:
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Banco BCP</AccordionTrigger>
              <AccordionContent className="flex items-center justify-center w-full">
                <Image src="/images/qr/bnb.png" alt="Banco BCP" width={350} height={100} className="rounded-lg mb-4" />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Banco BNB</AccordionTrigger>
              <AccordionContent className="flex items-center justify-center w-full">
                <Image src="/images/qr/bnb.png" alt="Banco BNB" width={350} height={100} className="rounded-lg mb-4" />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Yape</AccordionTrigger>
              <AccordionContent className="flex items-center justify-center w-full">
                <Image src="/images/qr/bnb.png" alt="Yape" width={350} height={100} className="rounded-lg mb-4" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-stretch section-container">
        <div ref={section1Ref} className="w-full max-w-4xl mx-auto mt-5 mb-10">
          <h2 className="text-3xl font-bold text-left mb-4 text-slate-900 dark:text-slate-100">Know me</h2>
          <div className="flex-1 flex flex-col justify-center mb-3 md:text-xl text-gray-400 max-w-2xl space-y-5 text-center">
            <p>
              Get to know my{' '}
              <span className="text-gray-300 hover:text-blue-400 font-semibold hover:underline cursor-pointer transition duration-200 ease-in-out">
                professional
              </span>
              {' '} world ... and the {' '}
              <span className="text-gray-300 hover:text-pink-400 font-semibold hover:underline cursor-pointer transition duration-200 ease-in-out">
                personal
              </span> {' '} side that drives it.
            </p>
            <p>
              No fluff. Just free, real-world{' '}
              <span className="text-gray-300 hover:text-blue-400 font-semibold hover:underline cursor-pointer transition duration-200 ease-in-out">
                tech tips
              </span>.
            </p>
            <p>
              Behind the code: true dev{' '}
              <span className="text-gray-300 hover:text-pink-400 font-semibold hover:underline cursor-pointer transition duration-200 ease-in-out">
                stories
              </span>.
            </p>
            <p>
              <span className="text-gray-300 hover:text-pink-400 font-semibold hover:underline cursor-pointer transition duration-200 ease-in-out">
                Developers
              </span> and{' '}
              <span className="text-gray-300 hover:text-blue-400 font-semibold hover:underline cursor-pointer transition duration-200 ease-in-out">
                mentors
              </span> who inspire my work.
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center mb-3 md:text-xl text-gray-400 max-w-2xl text-center">
            <p className="mt-6 text-lg leading-12 text-gray-600 dark:text-gray-400 max-w-xl mx-auto space-y-5">
              💡 Did you know? This site runs on a tasty tech stack: <br />
              <span className="font-medium text-gray-800 dark:text-gray-300">
                {techStackIcons.map((tech, index) => (
                  <span key={index}>
                    <Link href={tech.link} target="_blank" rel="noopener noreferrer" className={`hover:underline ${tech.textColor} transition duration-200 ease-in-out`}>
                      {tech.alt}
                    </Link>
                    {index < techStackIcons.length - 1 ? ', ' : ' '}
                  </span>
                ))}
              </span>
              — and a pinch of magic ✨. Built with love, bugs, and lots of coffee ☕.
            </p>
            <p className="dark:text-gray-400 leading-loose">
              Curious about the code? Check out the{' '}
              <Link href={"/"} target="_blank" rel="noopener noreferrer"
                className={`hover:underline transition duration-200 ease-in-out dark:text-gray-300`}>
                Github repo
                <Image src={GithubIcon} alt="Github Icon" width={24} height={24} className="inline ml-1 transition-transform duration-200 hover:scale-110" />
              </Link>
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {techStackIcons.map((tech) => (
                <Tooltip key={tech.alt}>
                  <TooltipTrigger asChild>
                    <Link href={tech.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Image src={tech.src} alt={tech.alt} width={tech.width} height={tech.height} className="transition-transform duration-200 hover:scale-110" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    {tech.alt}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}
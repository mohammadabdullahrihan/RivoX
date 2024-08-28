"use client";

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Search,
  Zap,
  Code,
  Cloud,
  Link,
  MapPin,
  Globe,
  Mic,
  ArrowRight,
  Github,
  LucideIcon,
  Server,
  Palette,
  Cpu,
  ChevronDown,
  Check,
  Menu,
  X
} from "lucide-react"
import NextLink from "next/link"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
  useAnimation
} from "framer-motion"
import { cn } from '@/lib/utils';
import { Tweet } from 'react-tweet'
import Image from 'next/image';

const TestimonialSection: React.FC = () => {
  const tweetIds = [
    "1825543755748782500",
    "1825876424755941787",
    "1827580223606669661",
    "1825574082345136506",
    "1825973306924872143",
    "1825821083817103852"
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      controls.start({
        x: [0, -200 + '%'],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isSmallScreen, controls]);

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted overflow-hidden">
      <div className="container px-4 md:px-6">
        <h2 className="font-serif text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-center mb-12">
          What People Are Saying
        </h2>
        <div className="md:hidden relative h-[400px] overflow-hidden">
          <motion.div
            className="flex absolute top-0 left-0 gap-6"
            animate={controls}
          >
            {[...tweetIds, ...tweetIds].map((id, index) => (
              <div key={index} className="w-[300px] flex-shrink-0">
                <Tweet id={id} />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
          {tweetIds.map((id) => (
            <div key={id} className="tweet-container">
              <Tweet id={id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutUsSection: React.FC = () => {
  const aboutPoints = [
    {
      icon: Search,
      title: "Minimalistic Search",
      description: "We strip away the clutter to focus on what matters most - delivering accurate and relevant results."
    },
    {
      icon: Code,
      title: "AI-Powered",
      description: "Leveraging cutting-edge AI technology to understand and respond to your queries with precision."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Designed for speed, MiniPerplx provides instant answers to keep up with your pace of work."
    }
  ];

  return (
    <section id="about-us" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-4">
            About MiniPerplx
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
            MiniPerplx is reimagining the way you search and interact with information online.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <point.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const MarqueeTestimonials: React.FC = () => {
  const testimonials = [
    "Absolutely love MiniPerplx! 🚀",
    "Game-changer for my workflow. 💼",
    "Simplicity at its finest. ✨",
    "Can't imagine working without it now. 🙌",
    "MiniPerplx is a must-have tool! 🛠️",
  ];

  return (
    <div className="bg-primary py-4 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {testimonials.concat(testimonials).map((text, index) => (
          <span key={index} className="text-white text-xl font-bold mx-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <Card className="h-full transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1">
    <CardHeader>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="rounded-full p-2 inline-block"
      >
        <Icon className="w-8 h-8 text-primary" />
      </motion.div>
      <CardTitle className="text-xl sm:text-2xl mt-4">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
)

interface Star {
  x: number;
  y: number;
  size: number;
  name: string;
  category: string;
}

const TechConstellation: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([])
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const constellationRef = useRef<HTMLDivElement>(null)

  const techStack = [
    {
      category: "Core Technologies",
      icon: Server,
      items: ["Next.js", "React", "TypeScript", "Vercel AI SDK", "Tailwind CSS"]
    },
    {
      category: "UI & Styling",
      icon: Palette,
      items: ["shadcn/ui", "Framer Motion", "Lucide Icons"]
    },
    {
      category: "AI Services & APIs",
      icon: Cpu,
      items: ["Azure OpenAI", "Tavily AI", "e2b.dev", "OpenWeatherMap", "Google Maps API", "Firecrawl"]
    }
  ];

  useEffect(() => {
    if (constellationRef.current) {
      const { width, height } = constellationRef.current.getBoundingClientRect()
      const newStars: Star[] = []
      const centerX = width / 2
      const centerY = height / 2
      const maxRadius = Math.min(width, height) * 0.4 // 40% of the smaller dimension

      techStack.forEach((category, categoryIndex) => {
        const categoryAngle = (categoryIndex / techStack.length) * Math.PI * 2
        const categoryRadius = maxRadius * 0.8 // 80% of maxRadius for category centers

        const categoryCenterX = centerX + Math.cos(categoryAngle) * categoryRadius
        const categoryCenterY = centerY + Math.sin(categoryAngle) * categoryRadius

        category.items.forEach((item, index) => {
          const itemAngle = categoryAngle + (index / category.items.length - 0.5) * Math.PI * 0.5
          const itemRadius = Math.random() * maxRadius * 0.3 + maxRadius * 0.1 // Between 10% and 40% of maxRadius

          const x = categoryCenterX + Math.cos(itemAngle) * itemRadius
          const y = categoryCenterY + Math.sin(itemAngle) * itemRadius

          newStars.push({
            x,
            y,
            size: Math.random() * 2 + 2,
            name: item,
            category: category.category
          })
        })
      })

      setStars(newStars)
    }
  }, [])

  const getStarColor = (category: string) => {
    switch (category) {
      case "Core Technologies":
        return "#FFD700"
      case "UI & Styling":
        return "#00CED1"
      case "AI Services & APIs":
        return "#FF69B4"
      default:
        return "#FFFFFF"
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="relative w-full h-[600px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg overflow-hidden" ref={constellationRef}>
        <AnimatePresence>
          {stars.map((star, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <motion.div
                  className="absolute rounded-full cursor-pointer"
                  style={{
                    left: star.x,
                    top: star.y,
                    width: star.size,
                    height: star.size,
                    backgroundColor: getStarColor(star.category),
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 2, boxShadow: `0 0 10px ${getStarColor(star.category)}` }}
                />
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="border-none p-2 rounded-lg shadow-lg"
                style={{
                  backgroundColor: getStarColor(star.category),
                  color: star.category === "Core Technologies" ? "#000" : "#fff"
                }}
              >
                <div className="text-sm font-bold">{star.name}</div>
                <div className="text-xs opacity-80">{star.category}</div>
              </TooltipContent>
            </Tooltip>
          ))}
        </AnimatePresence>
        {hoveredCategory && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {stars
              .filter((star) => star.category === hoveredCategory)
              .map((star, index, filteredStars) => {
                const nextStar = filteredStars[(index + 1) % filteredStars.length]
                return (
                  <motion.line
                    key={index}
                    x1={star.x}
                    y1={star.y}
                    x2={nextStar.x}
                    y2={nextStar.y}
                    stroke={getStarColor(star.category)}
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                )
              })}
          </svg>
        )}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {techStack.map((category, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 text-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setHoveredCategory(category.category)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getStarColor(category.category) }} />
              <span>{category.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const TryButton: React.FC = () => {
  return (
    <NextLink
      href="/search"
      className={cn(
        "rounded-full bg-zinc-800 hover:bg-zinc-800/90 transition hover:scale-105 hover:rotate-3 px-6 py-3 flex gap-x-2 items-center justify-center text-white font-semibold w-fit h-fit",
        "homeBtn"
      )}
    >
      Try MiniPerplx
      <ArrowRight width={20} height={20} />
    </NextLink>
  )
}

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
      style={{ scaleX }}
    />
  )
}

const FloatingIcon: React.FC<{ Icon: LucideIcon }> = ({ Icon }) => (
  <motion.div
    className="absolute text-primary opacity-10"
    initial={{ x: `${Math.random() * 100}vw`, y: -50 }}
    animate={{
      y: '100vh',
      rotate: Math.random() * 360,
    }}
    transition={{
      duration: Math.random() * 20 + 10,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
  </motion.div>
)

const FloatingIcons: React.FC = () => {
  const icons = [Search, Zap, Code, Cloud, Link, MapPin, Globe, Mic];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="hidden sm:block">
        {icons.map((Icon, index) => (
          <FloatingIcon key={index} Icon={Icon} />
        ))}
      </div>
      <div className="sm:hidden">
        {icons.slice(0, 4).map((Icon, index) => (
          <FloatingIcon key={index} Icon={Icon} />
        ))}
      </div>
    </div>
  )
}


const NavItem: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <NextLink
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          {children}
        </NextLink>
      </NavigationMenuLink>
    </li>
  )
}


const MobileNavItem: React.FC<{ href: string; children: React.ReactNode; onClick: () => void }> = ({ href, children, onClick }) => {
  return (
    <li>
      <NextLink
        href={href}
        className="block py-2 text-foreground hover:text-primary transition-colors"
        onClick={onClick}
      >
        {children}
      </NextLink>
    </li>
  )
}

const LandingPage: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)


  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => setMounted(true), [])
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  if (!mounted) return null

  const features = [
    { icon: Globe, title: "Web Search", description: "Powered by Tavily AI for comprehensive web results." },
    { icon: Code, title: "Code Interpreter", description: "Utilize e2b.dev for advanced code interpretation and execution." },
    { icon: Cloud, title: "Weather Forecast", description: "Get accurate weather information via OpenWeatherMap." },
    { icon: Link, title: "URL Summary", description: "Summarize web content quickly with Jina AI Reader." },
    { icon: MapPin, title: "Location Search", description: "Find places and nearby locations using Google Maps API." },
    { icon: Mic, title: "Translation & TTS", description: "Translate text and convert to speech with OpenAI TTS." },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans" id='start'>
      <ScrollProgress />
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between sm:justify-center sm:gap-5 sticky top-0 bg-background/80 backdrop-blur-sm z-40">
        <NextLink className="flex items-center justify-center group" href="#start">
          <span className="font-serif font-bold text-xl group-hover:text-primary transition-colors tracking-tight">MiniPerplx</span>
        </NextLink>
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="p-4 space-y-2 grid grid-cols-2 max-w-sm w-[400px]">
                  <NavItem href="#about-us">
                    <div className="text-sm font-medium">About Us</div>
                    <p className="text-sm text-muted-foreground">Learn more about MiniPerplx and our mission.</p>
                  </NavItem>
                  <NavItem href="#features">
                    <div className="text-sm font-medium">Features</div>
                    <p className="text-sm text-muted-foreground">Discover the powerful capabilities of MiniPerplx.</p>
                  </NavItem>
                  <NavItem href="#tech-stack">
                    <div className="text-sm font-medium">Tech Stack</div>
                    <p className="text-sm text-muted-foreground">Explore the technologies powering MiniPerplx.</p>
                  </NavItem>
                  <NavItem href="#testimonials">
                    <div className="text-sm font-medium">Testimonials</div>
                    <p className="text-sm text-muted-foreground">See what others are saying about MiniPerplx.</p>
                  </NavItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NextLink href="#try-it" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Try It
                </NavigationMenuLink>
              </NextLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bg-background border-b border-border z-30 md:hidden overflow-hidden"
          >
            <nav className="container px-4 py-4">
              <ul className="space-y-4">
                <MobileNavItem href="#about-us" onClick={() => setIsMenuOpen(false)}>About Us</MobileNavItem>
                <MobileNavItem href="#features" onClick={() => setIsMenuOpen(false)}>Features</MobileNavItem>
                <MobileNavItem href="#tech-stack" onClick={() => setIsMenuOpen(false)}>Tech Stack</MobileNavItem>
                <MobileNavItem href="#testimonials" onClick={() => setIsMenuOpen(false)}>Testimonials</MobileNavItem>
                <MobileNavItem href="#try-it" onClick={() => setIsMenuOpen(false)}>Try It</MobileNavItem>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
      <section className="w-full py-48 bg-gradient-to-b from-background to-muted relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center space-y-4">
              <motion.h1 
                className="font-serif font-bold text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-black leading-[1.1] tracking-tight pb-2"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                Introducing MiniPerplx
              </motion.h1>
              <motion.p 
                className="mx-auto max-w-[700px] text-muted-foreground text-xl md:text-2xl text-balance font-serif tracking-normal"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                A minimalistic AI search engine designed to deliver answers in the simplest and most elegant way possible.✨
              </motion.p>
              <motion.div
                className="flex flex-col items-center space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <TryButton />
                </motion.div>
                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                  variants={itemVariants}
                >
                  <NextLink href="https://www.producthunt.com/posts/miniperplx?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-miniperplx" target="_blank" rel="noopener noreferrer" passHref>
                    <Image
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=481378&theme=light"
                      alt="MiniPerplx - A minimalistic AI-powered search engine. | Product Hunt"
                      width={250}
                      height={54}
                      className="h-12 w-auto"
                    />
                  </NextLink>
                  <NextLink href="https://peerlist.io/zaidmukaddam/project/miniperplx" target="_blank" rel="noopener noreferrer" passHref>
                    <Image
                      src="/Launch_SVG_Light.svg"
                      alt="Peerlist"
                      width={32}
                      height={32}
                      className="h-12 w-auto"
                    />
                  </NextLink>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        <AboutUsSection />
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="font-serif text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-center mb-12">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section id="tech-stack" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted to-background overflow-hidden">
          <div className="container px-4 md:px-6">
            <h2 className="font-serif text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-center mb-12 text-balance">
              Our Tech Constellation
            </h2>
            <p className="text-center text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-serif tracking-normal">
              Explore the universe of technologies powering MiniPerplx. Hover over the stars to discover the constellations of our tech stack.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <TechConstellation />
            </motion.div>
          </div>
        </section>

        <TestimonialSection />
        <MarqueeTestimonials />

        <div className="border-b"></div>
        <section id="try-it" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bg-opacity-85">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <AnimatedSection>
                <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Ready to Experience MiniPerplx?
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-serif tracking-normal">
                  Discover the power of minimalistic AI search.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.4} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="group transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <NextLink href="/search">
                    Try MiniPerplx
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </NextLink>
                </Button>
                <Button variant="outline" size="lg" asChild className="group transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <NextLink href="https://git.new/mplx" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                    View on GitHub
                  </NextLink>
                </Button>
              </AnimatedSection>
            </div>
          </div>
          <motion.div
            className="absolute inset-0 z-0 opacity-30"
            initial={{ backgroundPosition: '0% 0%' }}
            animate={{ backgroundPosition: '100% 100%' }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M0 0h20L0 20z"/%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: '20px 20px',
            }}
          />
        </section>
      </main>
      <footer className="w-full py-12 md:py-24 bg-gradient-to-t from-background to-muted relative overflow-hidden">
        <AnimatePresence>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-neutral-500">
                MiniPerplx
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} MiniPerplx. All rights reserved.</p>
            </motion.div>
          </div>
          <div className="absolute inset-0 z-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/10"
                style={{
                  width: Math.random() * 50 + 25,
                  height: Math.random() * 50 + 25,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </AnimatePresence>
      </footer>
    </div>
  )
}

export default LandingPage
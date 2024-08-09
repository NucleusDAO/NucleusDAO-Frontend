'use client';
import NavComp from '@/components/home-component/nav-comp';
import Background from '@/assets/images/main-bg.png';
import SectionTwoBackground from '@/assets/images/section-2-bg.png';
import { Button } from '@/components/ui/button';
import Lottie from 'react-lottie';
import { defaultProposalOption } from '@/components/animation-options';
import NucleusDAOSample from '@/assets/images/nucleus-dao-sample.png';
import Image from 'next/image';
import FeaturesComp from '@/components/home-component/features-comp';
import HowItWorksBackground from '@/assets/images/section-3-bg.png';
import SectionFourBackground from '@/assets/images/section-4-bg.png';
import { Heading } from '@/components/headings/heading';
import HowItWorks from '@/components/home-component/how-it-works';
import WhyAeternity from '@/components/home-component/why-aeternity';
import JoinCommunityForm from '@/components/forms/join-community-form';
import Footer from '@/components/footer';
import MainSection from '@/components/home-component/main-section';
import { useMediaQuery } from '@/hooks/use-media-query';
import Link from 'next/link';
import { cn } from '@/libs/utils';
import { useEffect } from 'react';
import AOS from 'aos';

export default function Home() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const screenWidth =
    (typeof window !== 'undefined' && window.innerWidth >= 1880) ||
    window.innerWidth >= 912;

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="flex justify-center mx-auto max-w-[1880px] overflow-x-hidden">
      <div className={cn('min-h-screen bg-[#0A0A0A]')}>
        <main
          className={cn(
            'bg-contain bg-no-repeat',
            screenWidth ? 'min-h-[40vh]' : 'w-full min-h-[0vh] lg:min-h-[105vh]'
          )}
          style={{
            background: 'round',
            backgroundImage: `url(${Background.src})`,
          }}
        >
          <NavComp />
          <MainSection />

          <div className="text-center mx-auto">
            <Lottie
              options={defaultProposalOption}
              height={320}
              width={isDesktop ? 420 : 300}
            />
          </div>
        </main>

        <section
          className={cn(
            'bg-cover bg-no-repeat w-full p-12 lg:p-24 space-y-4 lg:space-y-8',
            screenWidth ? 'min-h-[40vh]' : 'min-h-fit lg:min-h-[160vh]'
          )}
          style={{
            backgroundImage: `url(${SectionTwoBackground.src})`,
          }}
          id="about"
        >
          <div
            className="border border-[#5E5F62B9] mx-auto lg:mx-0 text-sm bg-gradient-to-r from-[#44444433] to-[#65656533] px-6 py-2 rounded-[20px] w-fit text-[#9050E9]"
            role="heading"
          >
            <h2>About NucleusDAO</h2>
          </div>
          <div className="w-full lg:w-[65%] space-y-8 pb-4">
            <Heading title="Discover NucleusDAO: Revolutionizing Decentralized Governance" />
            <p
              className="font-light lg:text-base text-center lg:text-left text-sm"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="500"
            >
              NucleusDAO embraces true autonomy by empowering communities to
              create DAOs with unparalleled transparency, user-centric design,
              and fair decision-making. We prioritize seamless participation and
              collaboration, ensuring every voice matters in shaping the future.
            </p>
          </div>

          <div className="border border-[#656565] py-8 px-6 lg:px-14 rounded-[20px] bg-gradient-to-r from-[#1E1E1E33] to-[#19191933] lg:flex-row flex-col-reverse flex justify-between items-center">
            <div className="space-y-4 lg:space-y-8 lg:pl-16">
              <h2 className="text-white font-medium text-[24px] lg:text-[28px] w-full xl:w-[60%] mt-4 lg:mt-0">
                Launch your DAO with an Inclusive Builder
              </h2>

              <Button className="px-8 h-9" id="features">
                <Link href={'/#join'}>Launch your DAO</Link>
              </Button>
            </div>
            <Image
              src={NucleusDAOSample}
              alt="Nucleus DAO Template"
              width={450}
            />
          </div>
        </section>

        <section
          className={cn('w-full space-y-8', screenWidth ? '' : 'lg:-mt-32')}
        >
          <div
            className="border border-[#5E5F62B9] mx-auto bg-gradient-to-r text-sm from-[#44444433] to-[#65656533] px-6 py-2 rounded-[20px] w-fit text-[#9050E9]"
            role="heading"
          >
            <h2 className="">Features</h2>
          </div>
          <div className="w-full px-6 lg:px-0 lg:w-[45%] mx-auto text-center space-y-2 lg:space-y-6">
            <Heading
              title="Innovation Unleashed: Explore the Features of NucleusDAO"
              className="lg:text-center"
            />
            <p
              className="font-light text-sm lg:text-base"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="500"
            >
              NucleusDAO offers a range of innovative features designed to
              facilitate seamless collaboration and decision-making.
            </p>
          </div>
        </section>

        <section className="px-6 lg:px-24 pt-16 w-full lg:mt-24">
          <FeaturesComp />
        </section>

        <section
          style={{
            background: 'round',
            backgroundImage: `url(${HowItWorksBackground.src})`,
          }}
          className="px-6 lg:px-24 bg-contain bg-no-repeat w-full py-16 space-y-5"
          id="howItWorks"
        >
          <div
            className="border border-[#5E5F62B9] mx-auto text-sm bg-gradient-to-r from-[#44444433] to-[#65656533] px-6 py-2 rounded-[20px] w-fit text-[#9050E9]"
            role="heading"
          >
            <h2>How it Works</h2>
          </div>
          <div className="space-y-4 w-full lg:w-[65%] text-center mx-auto pb-16">
            <Heading
              title="Navigating Decentralized Governance: A Step-by-Step Guide"
              className="lg:text-center"
            />
            <p
              className="font-light text-sm lg:text-base"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="500"
            >
              Discover how NucleusDAO simplifies decentralized governance
              through our intuitive step-by-step guide. Watch short animations
              to see how you can create, manage, and participate in DAOs with
              ease.
            </p>
          </div>

          <HowItWorks />
        </section>

        <section
          style={{
            background: 'round',
            backgroundImage: `url(${SectionFourBackground.src})`,
          }}
          className="px-6 lg:px-24 bg-contain bg-no-repeat w-full py-8 lg:py-20 space-y-16"
        >
          <div className="space-y-4 lg:space-y-8 w-full lg:w-[65%]">
            <div
              className="border mx-auto lg:mx-0 border-[#5E5F62B9] text-sm bg-gradient-to-r from-[#44444433] to-[#65656533] px-6 py-2 rounded-[20px] w-fit text-[#9050E9]"
              role="heading"
            >
              <h2>Blockchain</h2>
            </div>
            <Heading title="The Smart Choice for Next-Level Decentralized Decision-Making" />
          </div>

          <WhyAeternity />
        </section>

        <section
          className="space-y-8 pt-24 lg:pt-0 mb-28 lg:mt-16 flex-grow px-10 lg:px-0"
          id="contactUs"
        >
          <div
            className="border border-[#5E5F62B9] mx-auto text-sm bg-gradient-to-r from-[#44444433] to-[#65656533] px-6 py-2 rounded-[20px] w-fit text-[#9050E9]"
            role="heading"
          >
            <h2>Subscribe to our newsletter</h2>
          </div>
          <div className="space-y-8 w-full lg:w-[65%] text-center mx-auto">
            <Heading
              title="Join the Early Community"
              className="lg:text-center"
            />
            <p className="font-light px-6 lg:px-12 lg:text-base text-sm">
              Be among the first to shape the future of decentralized
              governance. Sign up now for exclusive access to updates, insights,
              and a chance to participate in our launch.
            </p>
            <div className="w-full lg:w-[60%] mx-auto relative">
              <JoinCommunityForm />
            </div>
          </div>
        </section>

        <div className="lg:mt-auto mb-10 mt-20 w-full px-6 lg:px-24">
          <Footer />
        </div>
      </div>
    </div>
  );
}

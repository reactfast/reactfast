'use client'
import { NavController } from '@reactfast/nav'
import {
  BuildingOffice2Icon,
  MapPinIcon as MapPinOutlineIcon,
  ChatBubbleLeftRightIcon,
  HomeModernIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  FunnelIcon,
  PhoneIcon as PhoneOutlineIcon,
  ArrowRightCircleIcon,
  UserGroupIcon,
  ListBulletIcon,
  FolderIcon,
  IdentificationIcon,
  InboxArrowDownIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'

const example = {
  sticky: true,
  search: false,
  fallbackText: '@ReactFast',
  logoAlt: 'React Fast Logo',
  login: true,
  loginHref: '/login',
  cta: true,
  ctaTitle: 'Go Pro',
  ctaBtnHref: '/help/contact',
  menuItems: [
    {
      title: 'Libraries',
      href: '/services',
      useLink: true,
      onHover: true,
      full: true,
      subMenu: [
        {
          title: 'Forms',
          href: '/forms/docs',
          useLink: true,
          icon: <InboxArrowDownIcon />,
          description:
            'Build dynamic, controlled schema-driven react forms with %50 less lines of code.',
        },
        {
          title: 'Nav',
          href: '/nav/docs',
          useLink: true,
          icon: <WrenchScrewdriverIcon />,
          description:
            'Create and manage dynamic / controlled navigation menus easily with json definitions',
        },
        // {
        //   title: 'Tabs',
        //   href: '/tabs/docs',
        //   useLink: true,
        //   icon: <FolderIcon />,
        //   description: 'Define single page navigation  ',
        // },
        // {
        //   title: 'Index',
        //   href: '/index/docs',
        //   useLink: true,
        //   icon: <ListBulletIcon />,
        //   description:
        //     'Durable flat roofing system for long-term waterproofing.',
        // },
        // {
        //   title: 'View',
        //   href: '/view/docs',
        //   useLink: true,
        //   icon: <IdentificationIcon />,
        //   description:
        //     'Easy create view only and editable views for models based on json configs.',
        // },
        // {
        //   title: 'Next-Validations',
        //   href: '/validations/docs',
        //   useLink: true,
        //   icon: <LockClosedIcon />,
        //   description:
        //     'Define Next edge function with easy json definitions/schemas',
        // },
      ],
      ctas: [
        {
          title: 'Go Pro',
          href: '/signup',
          icon: <PhoneOutlineIcon />,
        },
        {
          title: 'View Pro Tools',
          href: '/tools',
          icon: <ArrowRightCircleIcon />,
        },
      ],
    },
    // {
    //   title: 'Tools',
    //   href: '/tools',
    //   useLink: true,
    //   onHover: true,
    //   full: true,
    //   subMenu: [
    //     {
    //       title: 'Pro Tools',
    //       href: '/register',
    //       useLink: true,
    //       icon: <WrenchScrewdriverIcon />,
    //       description: 'Get access to countless tools to help you build',
    //     },
    //     {
    //       title: 'Form Builder',
    //       href: '/account/flows/forms',
    //       useLink: true,
    //       icon: <WrenchScrewdriverIcon />,
    //       description:
    //         'Build custom forms with drag-and-drop ease. export ready to use json schemas for @reactfast/forms library',
    //     },
    //     {
    //       title: 'Nav Builder (Coming Soon)',
    //       href: '#',
    //       useLink: true,
    //       icon: <WrenchScrewdriverIcon />,
    //       description: 'Build and style custom navigation menus with ease.',
    //     },
    //     {
    //       title: 'Tabs builder (Coming Soon)',
    //       href: '#',
    //       useLink: true,
    //       icon: <HomeModernIcon />,
    //       description:
    //         'Create and customize tabbed interfaces quickly. copy and pase json into your projects.',
    //     },
    //     {
    //       title: 'Index builder (Coming Soon)',
    //       href: '#',
    //       useLink: true,
    //       icon: <HomeModernIcon />,
    //       description:
    //         'Generate dynamic index views for your data models effortlessly for next level speedy development.',
    //     },
    //     {
    //       title: 'View builder (Coming Soon)',
    //       href: '#',
    //       useLink: true,
    //       icon: <FunnelIcon />,
    //       description:
    //         'Craft custom view components for your applications with simple json configurations.',
    //     },
    //     {
    //       title: 'Next-Validations builder (Coming Soon)',
    //       href: '#',
    //       useLink: true,
    //       icon: <HomeModernIcon />,
    //       description:
    //         'Define robust validation schemas for your Next.js applications using an intuitive interface.',
    //     },
    //   ],
    //   ctas: [
    //     {
    //       title: 'Go Pro',
    //       href: '/signup',
    //       icon: <PhoneOutlineIcon />,
    //     },
    //     {
    //       title: 'FAQ',
    //       href: '/help/faq',
    //       icon: <ChatBubbleLeftRightIcon />,
    //     },
    //     {
    //       title: 'View All Tools',
    //       href: '/services',
    //       icon: <ArrowRightCircleIcon />,
    //     },
    //   ],
    // },
    {
      title: 'About',
      href: '/about',
      useLink: true,
      onHover: true,
      subMenu: [
        {
          title: 'Company',
          href: '/about/company',
          useLink: true,
          icon: <BuildingOffice2Icon />,
          description: 'Who we are and how we work.',
        },
        {
          title: 'Team',
          href: '/about/team',
          useLink: true,
          icon: <UserGroupIcon />,
          description: 'What our customers are saying.',
        },
      ],
    },
  ],
}

export default function LayoutWrapper() {
  return <NavController baseConfig={example} />
}

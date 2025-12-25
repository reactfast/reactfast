import {
  Inter,
  Roboto,
  Lora,
  Montserrat,
  Poppins,
  Raleway,
  Playfair_Display,
  Merriweather,
  Nunito,
  Ubuntu,
  Oswald,
  Josefin_Sans,
  Rubik,
  Source_Sans_3,
  Karla,
  Hind,
  Work_Sans,
  Titillium_Web,
  Cabin,
  Fira_Sans,
  Dosis,
  Quicksand,
  Barlow,
  Mukta,
  Spectral,
} from 'next/font/google'

// Load fonts with CSS variables
const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inter',
})
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-roboto',
})
const lora = Lora({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-lora',
})
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-montserrat',
})
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-poppins',
})
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-raleway',
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-playfair',
})
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-merriweather',
})
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-nunito',
})
const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-ubuntu',
})
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-oswald',
})
const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-josefin',
})
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-rubik',
})
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-source-sans',
})
const karla = Karla({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-karla',
})
const hind = Hind({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-hind',
})
const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-work-sans',
})
const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-titillium',
})
const cabin = Cabin({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cabin',
})
const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fira-sans',
})
const dosis = Dosis({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dosis',
})
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-quicksand',
})
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-barlow',
})
const mukta = Mukta({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mukta',
})
const spectral = Spectral({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-spectral',
})

// Object mapping font names to their CSS classes
const fonts = {
  Inter: inter.className,
  Roboto: roboto.className,
  Lora: lora.className,
  Montserrat: montserrat.className,
  Poppins: poppins.className,
  Raleway: raleway.className,
  Playfair_Display: playfair.className,
  Merriweather: merriweather.className,
  Nunito: nunito.className,
  Ubuntu: ubuntu.className,
  Oswald: oswald.className,
  Josefin_Sans: josefin.className,
  Rubik: rubik.className,
  Source_Sans_3: sourceSans.className,
  Karla: karla.className,
  Hind: hind.className,
  Work_Sans: workSans.className,
  Titillium_Web: titillium.className,
  Cabin: cabin.className,
  Fira_Sans: firaSans.className,
  Dosis: dosis.className,
  Quicksand: quicksand.className,
  Barlow: barlow.className,
  Mukta: mukta.className,
  Spectral: spectral.className,
}

export { fonts }

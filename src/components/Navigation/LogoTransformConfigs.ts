import { Breakpoint } from "@/utils/viewport";


export type LogoTransformConfig = {
    start: {
      left: number;
      top: number;
      scale: number;
    };
    target: {
      left: number;
      top: number;
      scale: number;
    };
  }

export const LogoTransformConfigs = (screenHeight: number, screenWidth: number) : Record<Breakpoint, LogoTransformConfig>  => {
    const verticalMiddle = screenHeight / 2;
    const horizontalMiddle = screenWidth / 2;
    return {
      large: {
      start: {
        left: horizontalMiddle - 380,
        top: verticalMiddle, // Adjust 100 based on logo height
        scale: 1.7
      },
      target: {
        left: 20,
        top: 30,
        scale: 1
      }
    },
    medium: {
      start: {
        left: horizontalMiddle - 320,
        top: verticalMiddle - 70, // Adjust 80 for mobile logo height
        scale: 1.3
      },
      target: {
        left: 5,
        top: 20,
        scale: 0.8
      }
    },
    small: {
      start: {
        left: horizontalMiddle - 300,
        top: verticalMiddle - 100, // Adjust 80 for mobile logo height
        scale: 1
      },
      target: {
        left: 5,
        top: 15,
        scale: 0.8
      }
    },
    tiny: {
      start: {
        left: horizontalMiddle - 200,
        top: verticalMiddle - 110, // Adjust 80 for mobile logo height
        scale: 1
      },
      target: {
        left: -3,
        top: -3,
        scale: 0.8
      }
    }
  }};

export type LogoTransform = {
    left: number;
    top: number;
    scale: number;
}

export const initialTransform : LogoTransform = {
    left: 0,
    top: 0,
    scale: 1
};

export const TransitionNavigationColor = 'bg-transparent';
export const CompleteNavigationColor = 'bg-white';

export const navigationLogoColor = {
    r: 234, 
    g: 179, 
    b: 8
  }

export const ActiveLinkColor = "text-gold-600";
export const InactiveTransitionLinkColor = "text-white hover:text-gray-400";
export const InactiveCompleteLinkColor = "text-black hover:text-gray-400";


export type SectionConfig = {
    name: string;
    link: string;
  }
  
export const sections: Record<string, SectionConfig> = {
    home: {name: 'Home', link: '#home'}, 
    services: {name: 'Services', link: '#services'}, 
    about: {name: 'About', link: '#about'}, 
  //   gallery: {name: 'Gallery', link: '#gallery'}, 
    contact: {name: 'Contact', link: '#contact'}
  };
  
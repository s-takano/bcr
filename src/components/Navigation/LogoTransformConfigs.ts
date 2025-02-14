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
        top: 10,
        scale: 0.8
      }
    },
    tiny: {
      start: {
        left: horizontalMiddle - 170,
        top: verticalMiddle - 110, // Adjust 80 for mobile logo height
        scale: 0.9
      },
      target: {
        left: -10,
        top: 0,
        scale: 0.7
      }
    }
  }};

export type TextColor = {
    r: number;
    g: number;
    b: number;
}

export type LogoTransform = {
    left: number;
    top: number;
    scale: number;
    textColor: TextColor;
    dropShadowOpacity: number;
    subHeadlineOpacity: number;
}

export type NavigationTransform = {
    top: number;
    color: string;
}

export const NavigationLogoColor : TextColor = {
  r: 234, 
  g: 179, 
  b: 8
}

export const initialTransform : LogoTransform = {
    left: 0,
    top: 0,
    scale: 1,
    textColor: {
      r: 255,
      g: 255,
      b: 255
    },
    dropShadowOpacity: 100,
    subHeadlineOpacity: 100
};

export const TransitionNavigationColor = 'bg-transparent';
export const CompleteNavigationColor = 'bg-white';

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
  
import { Breakpoint, rem } from "@/utils/viewport";


export type BrandSignatureTransformConfig = {
    headline: {
      left: number;
      top: number;
      scale: number;
    };
    logo: {
      left: number;
      top: number;
      scale: number;
    };
  }


const getBrandSignatureTransforms = (screenHeight: number, screenWidth: number, navigationHeightMax: number, brandSignatureHeight: number) : Record<Breakpoint, BrandSignatureTransformConfig>  => {
  const headlineTop = screenHeight / 2;
  const headlineLeft = screenWidth / 2;
  const logoTop = (navigationHeightMax - brandSignatureHeight) / 2;

  return {
    large: {
    headline: {
      left: headlineLeft - 380,
      top: headlineTop, // Adjust 100 based on logo height
      scale: 1.7
    },
    logo: {
      left: rem(5),
      top: logoTop - rem(-1) / 2,
      scale: 1
    }
  },
  medium: {
    headline: {
      left: headlineLeft - 320,
      top: headlineTop - 70, 
      scale: 1.3
    },
    logo: {
      left: rem(1),
      top: logoTop - rem(2) / 2,
      scale: 0.8
    }
  },
  small: {
    headline: {
      left: headlineLeft - 300,
      top: headlineTop - 100, 
      scale: 1
    },
    logo: {
      left: rem(1),
      top: logoTop - rem(3) / 2,
      scale: 0.8
    }
  },
  tiny: {
    headline: {
      left: headlineLeft - 170,
      top: headlineTop - 110, 
      scale: 0.9
    },
    logo: {
      left: -rem(3),
      top: logoTop - rem(3) / 2,
      scale: 0.7
    }
  }
}};

export const getBrandSignatureTransform = (screenHeight: number, screenWidth: number, navigationHeightMax: number, brandSignatureHeight: number, breakpoint: Breakpoint) : BrandSignatureTransformConfig => {
  return getBrandSignatureTransforms(screenHeight, screenWidth, navigationHeightMax, brandSignatureHeight)[breakpoint];
}

export type TextColor = {
    r: number;
    g: number;
    b: number;
}

export type BrandSignatureTransform = {
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

export const initialBrandSignatureTransform : BrandSignatureTransform = {
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
export const CompleteNavigationColor = 'bg-black';

export const ActiveLinkColor = "text-gold-600";
export const InactiveTransitionLinkColor = "text-white hover:text-gray-400";
export const InactiveCompleteLinkColor = "text-white hover:text-gray-400";


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
  
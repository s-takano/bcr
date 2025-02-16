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


const getBrandSignatureTransforms = (screenHeight: number, screenWidth: number, navigationHeightMax: number, brandSignatureWidth: number, brandSignatureHeight: number): Record<Breakpoint, BrandSignatureTransformConfig> => {

  const displacementFactor = 0.7;
  
  // Calculate the displacement 1/4 of the screen width and height
  const horizontalDisplacement = Math.round(screenWidth / 4 * displacementFactor);
  const verticalDisplacement = Math.round(screenHeight / 4 * displacementFactor);  

  // Calculate the center of the screen
  const centerLeft = (screenWidth - brandSignatureWidth) / 2;
  const centerTop = (screenHeight - brandSignatureHeight) / 2;

  const headlinePositions = {
    left: {
      left: centerLeft - horizontalDisplacement,
      center: centerLeft,
      right: centerLeft + horizontalDisplacement
    },
    top: {
      center: centerTop,
      top: centerTop - verticalDisplacement,
      bottom: centerTop + verticalDisplacement
    }
  }

  const logoTop = (navigationHeightMax - brandSignatureHeight) / 2;

  return {
    large: {
      headline: {
        left: headlinePositions.left.left,
        top: headlinePositions.top.center, // Adjust 100 based on logo height
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
        left: headlinePositions.left.left,
        top: headlinePositions.top.center,
        scale: 1.5
      },
      logo: {
        left: rem(1),
        top: logoTop - rem(2) / 2,
        scale: 0.8
      }
    },
    small: {
      headline: {
        left: headlinePositions.left.center,
        top: headlinePositions.top.bottom,
        scale: 1.3
      },
      logo: {
        left: rem(1),
        top: logoTop - rem(3) / 2,
        scale: 0.8
      }
    },
    tiny: {
      headline: {
        left: headlinePositions.left.center,
        top: headlinePositions.top.bottom,
        scale: 1.5
      },
      logo: {
        left: -rem(3),
        top: logoTop - rem(3) / 2,
        scale: 0.7
      }
    }
  }
};

export const getBrandSignatureTransform = (screenHeight: number, screenWidth: number, navigationHeightMax: number, brandSignatureWidth: number, brandSignatureHeight: number, breakpoint: Breakpoint): BrandSignatureTransformConfig => {
  return getBrandSignatureTransforms(screenHeight, screenWidth, navigationHeightMax, brandSignatureWidth, brandSignatureHeight)[breakpoint];
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

export type ScreenDimensions = {
  screenHeight: number;
  screenWidth: number;
  navigationHeightMax: number;
  brandSignatureWidth: number;
  brandSignatureHeight: number;
}

export type NavigationTransform = {
  isActive: boolean;
  height: number;
}

export const NavigationLogoColor: TextColor = {
  r: 234,
  g: 179,
  b: 8
}

export const initialBrandSignatureTransform: BrandSignatureTransform = {
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

export const TransitionNavigationColor = 'transparent';
export const CompleteNavigationColor = 'black';

export const ActiveLinkColor = "text-gold-600";
export const InactiveTransitionLinkColor = "text-white hover:text-gray-400";
export const InactiveCompleteLinkColor = "text-white hover:text-gray-400";


export type SectionConfig = {
  name: string;
  link: string;
}

const sections: Record<string, SectionConfig> = {
  home: { name: 'Home', link: '#home' },
  services: { name: 'Services', link: '#services' },
  about: { name: 'About', link: '#about' },
  //   gallery: {name: 'Gallery', link: '#gallery'}, 
  //  contact: {name: 'Contact', link: '#contact'}
};

export const getAllSections = () => sections;

export const getSection = (sectionName: string) => {
  const section = sections[sectionName];
  if (section === undefined)
    return sections['home'];
  return section;
}

export const getNavigationColor = (isActive: boolean): string => {
  return isActive ? CompleteNavigationColor : TransitionNavigationColor;
}

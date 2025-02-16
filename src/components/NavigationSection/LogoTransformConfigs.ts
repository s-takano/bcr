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

  const displacementFactorX = 0.7;
  const displacementFactorY = 1;
  const paddingY = 50;

  // Calculate the displacement 1/4 of the screen width and height
  const horizontalDisplacement1_4 = Math.round(screenWidth / 4 * displacementFactorX);
  const verticalDisplacement1_4 = Math.round(screenHeight / 4 * displacementFactorY);  

  // Calculate the center of the screen
  const centerX = (screenWidth - brandSignatureWidth) / 2;
  const centerY = (screenHeight - brandSignatureHeight) / 2;

  const bottomY = screenHeight - (brandSignatureHeight + paddingY) ;

  const headlinePositions = {
    left: {
      left: centerX - horizontalDisplacement1_4,
      center: centerX,
      right: centerX + horizontalDisplacement1_4
    },
    top: {
      top: centerY - verticalDisplacement1_4,
      center: centerY,
      bottom1_4: centerY + verticalDisplacement1_4,
      bottom: bottomY
    }
  }

  const logoTop = (navigationHeightMax - brandSignatureHeight) / 2;

  return {
    large: {
      headline: {
        left: headlinePositions.left.left,
        top: headlinePositions.top.bottom1_4, // Adjust 100 based on logo height
        scale: 1.7
      },
      logo: {
        left: rem(5),
        top: logoTop,
        scale: 1
      }
    },
    medium: {
      headline: {
        left: headlinePositions.left.left,
        top: headlinePositions.top.bottom1_4,
        scale: 1.5
      },
      logo: {
        left: rem(1),
        top: logoTop,
        scale: 0.8
      }
    },
    small: {
      headline: {
        left: headlinePositions.left.left,
        top: headlinePositions.top.bottom1_4,
        scale: 1.3
      },
      logo: {
        left: rem(1),
        top: logoTop,
        scale: 0.8
      }
    },
    tiny: {
      headline: {
        left: headlinePositions.left.left,
        top: headlinePositions.top.bottom,
        scale: 1
      },
      logo: {
        left: -rem(3),
        top: logoTop,
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

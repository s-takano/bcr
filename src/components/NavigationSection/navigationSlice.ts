// navigationSlice.ts
import { createSlice, PayloadAction, createSelector, UnknownAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { getBreakpoint } from '@/utils/viewport';
import { CompleteNavigationColor, initialBrandSignatureTransform, 
    BrandSignatureTransform, 
    BrandSignatureTransformConfig, getBrandSignatureTransform, 
    TransitionNavigationColor, 
    ActiveLinkColor,
    InactiveCompleteLinkColor,
    InactiveTransitionLinkColor,
    SectionConfig,
    NavigationLogoColor,
    NavigationTransform,
    TextColor
} from './LogoTransformConfigs';

interface NavigationState {
  activeSection: string;
  hasMounted: boolean;
  lastScrollY: number;
  navigationHeight: number;
  navigationHeightMax: number;
  animationProgress: number;
  brandSignatureTransform: BrandSignatureTransform;
  navigationTransform: NavigationTransform;
}

const initialState: NavigationState = {
  activeSection: 'home',
  hasMounted: false,
  animationProgress: 0,
  lastScrollY: 0,
  brandSignatureTransform: initialBrandSignatureTransform,
  navigationHeight: 200,
  navigationHeightMax: 200,
  navigationTransform: {
    top: 0,
    color: 'bg-transparent'
  }
};  

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveSection(state, action: PayloadAction<string>) {
      state.activeSection = action.payload || 'home';
    },
    setHasMounted(state, action: PayloadAction<boolean>) {
      state.hasMounted = action.payload;
    },
    setAnimationProgress(state, action: PayloadAction<number>) {
      state.animationProgress = action.payload;
    },
    setLastScrollY(state, action: PayloadAction<number>) {
      state.lastScrollY = action.payload;
    },
    setBrandSignatureTransform(state, action: PayloadAction<BrandSignatureTransform>) {
      state.brandSignatureTransform = action.payload;
    },
    setNavigationHeight(state, action: PayloadAction<number>) {
      state.navigationHeight = action.payload;
    },
    setNavigationHeightMax(state, action: PayloadAction<number>) {
      state.navigationHeightMax = action.payload;
    },
    setNavigationTransform(state, action: PayloadAction<NavigationTransform>) {
      state.navigationTransform = action.payload;
    }
  },
});


export const {
  setActiveSection,
  setHasMounted,
  setAnimationProgress,
  setLastScrollY,
  setBrandSignatureTransform,
  setNavigationHeight,
  setNavigationHeightMax,
  setNavigationTransform
} = navigationSlice.actions;

const IsAnimationComplete = (navigation: NavigationState)=> {
    return navigation.animationProgress > 0.99;
}

const getNavigationColor = (isAnimationComplete: boolean) : string => {
  return isAnimationComplete ? CompleteNavigationColor : TransitionNavigationColor;
}

const getLogoTextColor = (animationProgress: number) : TextColor => {
  return {
    r: 255 - (255 - NavigationLogoColor.r) * animationProgress, 
    g: 255 - (255 - NavigationLogoColor.g) * animationProgress, 
    b: 255 - (255 - NavigationLogoColor.b) * animationProgress
  }
}

const getDropShadowOpacity = (animationProgress: number) : number => {
  return 100 - 100 * animationProgress * 3;
}

export const selectIsAnimationComplete = createSelector(
  (state: RootState) => state.navigation.animationProgress,
  (animationProgress) => animationProgress > 0.99
);


const getProgress = (scrollY: number | undefined) => {
    if( !scrollY ) return 0;
    const currentScrollY = scrollY;
    const currentTextOffset = currentScrollY * 0.9;
    const progress = Math.min(currentTextOffset / 500, 1);
    return progress;
  }


export const getActiveLinkClass = (section: SectionConfig) =>
  (_: ThunkDispatch<{navigation: NavigationState;}, undefined, UnknownAction>, getState: () => RootState) => {
  const activeSection = getState().navigation.activeSection;
  const IsAnimationComplete = getState().navigation.animationProgress > 0.99;
  if( activeSection === section.link.replace('#', '') )
      return ActiveLinkColor;
  if(IsAnimationComplete)
    return InactiveCompleteLinkColor;
  else
    return InactiveTransitionLinkColor;
}

const getSubHeadlineOpacity = (animationProgress: number) : number => Math.max(0, 1 - animationProgress);

const computeBrandSignatureTransform = (screenHeight: number, screenWidth: number, navigationHeightMax: number, brandSignatureHeight: number, progress: number) : BrandSignatureTransform => {

  const config: BrandSignatureTransformConfig = getBrandSignatureTransform(screenHeight, screenWidth, navigationHeightMax, brandSignatureHeight, getBreakpoint(screenWidth));
    
  const transform: BrandSignatureTransform = {
      left: config.headline.left + (config.logo.left - config.headline.left) * progress,
      top: config.headline.top + (config.logo.top - config.headline.top) * progress,
      scale: config.headline.scale + (config.logo.scale - config.headline.scale) * progress,
      textColor: getLogoTextColor(progress),
      dropShadowOpacity: getDropShadowOpacity(progress),
      subHeadlineOpacity: getSubHeadlineOpacity(progress)
  }

  return transform;
}

export const updateBrandSignatureTransform = (
    scrollY: number | undefined, 
    screenHeight: number | undefined, 
    screenWidth: number | undefined,
    brandSignatureHeight: number
  ) =>
    (dispatch: ThunkDispatch<{navigation: NavigationState;}, undefined, UnknownAction>, getState: () => RootState) => {    

    const progress = getProgress(scrollY);

    dispatch(setAnimationProgress(progress));

    // keep track of the last scroll position
    dispatch(setLastScrollY(scrollY || 0));

    const virtualScreenHeight = screenHeight ? screenHeight : 800;
    const virtualScreenWidth = screenWidth ? screenWidth : 1024;
    const transform = computeBrandSignatureTransform(
      virtualScreenHeight, 
      virtualScreenWidth, 
      getState().navigation.navigationHeightMax, 
      brandSignatureHeight,
      progress);

    dispatch(setBrandSignatureTransform(transform));
};


const computeNavigationBoundingRect = (firstSectionHeight: number, scrollDisplacement: number, navigationHeight: number, navigationHeightMax: number) => {
  let newHeight = navigationHeight;

  if(firstSectionHeight <= navigationHeightMax)
    newHeight = navigationHeight - scrollDisplacement;
  else
    newHeight = navigationHeightMax;

  newHeight = Math.max(0, Math.min(navigationHeightMax, Math.round(newHeight)));

  const newTop = newHeight - navigationHeightMax;

  return {top: newTop, height: newHeight};
}

export const updateNavigationBoundingRect = (firstSectionHeight: number, scrollDisplacement: number) => 
  (dispatch: ThunkDispatch<{navigation: NavigationState;}, undefined, UnknownAction>, getState: () => RootState) => {
  const navigationBoundingRect = computeNavigationBoundingRect(
    firstSectionHeight, 
    scrollDisplacement,
    getState().navigation.navigationHeight,
    getState().navigation.navigationHeightMax
  );
  dispatch(setNavigationHeight(navigationBoundingRect.height));
  
  const navigationTransform: NavigationTransform = {
    top: navigationBoundingRect.top,
    color: getNavigationColor(IsAnimationComplete(getState().navigation))
  }
  
  dispatch(setNavigationTransform(navigationTransform));
}

export default navigationSlice.reducer;

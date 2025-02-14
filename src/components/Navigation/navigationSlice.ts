// navigationSlice.ts
import { createSlice, PayloadAction, createSelector, UnknownAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { getBreakpoint } from '@/utils/viewport';
import { CompleteNavigationColor, initialTransform, LogoTransform, 
    LogoTransformConfig, LogoTransformConfigs, 
    TransitionNavigationColor, 
    navigationLogoColor,
    ActiveLinkColor,
    InactiveCompleteLinkColor,
    InactiveTransitionLinkColor,
    SectionConfig
} from './LogoTransformConfigs';

interface NavigationState {
  activeSection: string;
  subHeadlineOpacity: number;
  hasMounted: boolean;
  logoAnimationProgress: number;
  navigationColor: string;
  lastScrollY: number;
  scrollProgress: number;
  logoTransform: LogoTransform;
  navigationHeight: number;
  navigationHeightMax: number;
  navigationTop: number;
}

const initialState: NavigationState = {
  activeSection: 'home',
  subHeadlineOpacity: 1,
  hasMounted: false,
  logoAnimationProgress: 0,
  navigationColor: 'bg-transparent',
  lastScrollY: 0,
  scrollProgress: 0,
  logoTransform: initialTransform,
  navigationHeight: 200,
  navigationHeightMax: 200,
  navigationTop: 0
};  

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveSection(state, action: PayloadAction<string>) {
      state.activeSection = action.payload;
    },
    setSubHeadlineOpacity(state, action: PayloadAction<number>) {
      state.subHeadlineOpacity = action.payload;
    },
    setHasMounted(state, action: PayloadAction<boolean>) {
      state.hasMounted = action.payload;
    },
    setLogoAnimationProgress(state, action: PayloadAction<number>) {
      state.logoAnimationProgress = action.payload;
    },
    setNavigationColor(state, action: PayloadAction<string>) {
      state.navigationColor = action.payload;
    },
    setLastScrollY(state, action: PayloadAction<number>) {
      state.lastScrollY = action.payload;
    },
    setScrollProgress(state, action: PayloadAction<number>) {
      state.scrollProgress = action.payload;
    },
    setLogoTransform(state, action: PayloadAction<LogoTransform>) {
      state.logoTransform = action.payload;
    },
    setNavigationHeight(state, action: PayloadAction<number>) {
      state.navigationHeight = action.payload;
    },
    setNavigationHeightMax(state, action: PayloadAction<number>) {
      state.navigationHeightMax = action.payload;
    },
    setNavigationTop(state, action: PayloadAction<number>) {
      state.navigationTop = action.payload;
    }
  },
});


export const {
  setActiveSection,
  setSubHeadlineOpacity,
  setHasMounted,
  setLogoAnimationProgress,
  setNavigationColor,
  setLastScrollY,
  setLogoTransform,
  setNavigationHeight,
  setNavigationHeightMax,
  setNavigationTop
} = navigationSlice.actions;

const IsLogoAnimationComplete = (navigation: NavigationState)=> {
    return navigation.logoAnimationProgress > 0.99;
}

export const selectNavigationColor = createSelector(
  (state: RootState) => IsLogoAnimationComplete(state.navigation),
  (IsLogoAnimationComplete) => IsLogoAnimationComplete ? CompleteNavigationColor : TransitionNavigationColor
);

export const selectLogoTextColor = createSelector(
  (state: RootState) => state.navigation.logoAnimationProgress,
  (logoAnimationProgress) => 
     `rgb(
      ${255 - (255 - navigationLogoColor.r) * logoAnimationProgress}, 
      ${255 - (255 - navigationLogoColor.g) * logoAnimationProgress}, 
      ${255 - (255 - navigationLogoColor.b) * logoAnimationProgress}
    )`
);
      
export const selectGradientOpacity = createSelector(
  (state: RootState) => state.navigation.logoAnimationProgress,
  (logoAnimationProgress) => 100 - 100 * logoAnimationProgress * 3
);

export const selectIsLogoAnimationComplete = createSelector(
  (state: RootState) => state.navigation.logoAnimationProgress,
  (logoAnimationProgress) => logoAnimationProgress > 0.99
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
  const IsLogoAnimationComplete = getState().navigation.logoAnimationProgress > 0.99;
  if( activeSection === section.link.replace('#', '') )
      return ActiveLinkColor;
  if(IsLogoAnimationComplete)
    return InactiveCompleteLinkColor;
  else
    return InactiveTransitionLinkColor;
}


export const updateLogoAnimation = (
    scrollY: number | undefined, screenHeight: number | undefined, 
    screenWidth: number | undefined) =>
    (dispatch: ThunkDispatch<{navigation: NavigationState;}, undefined, UnknownAction>) => {    

    // Calculate positions based on screen height
    const virtualScreenHeight = screenHeight ? screenHeight : 800;
    const virtualScreenWidth = screenWidth ? screenWidth : 1024;
    const progress = getProgress(scrollY);

    dispatch(setLogoAnimationProgress(progress));

    // fading out towards the end of the logo animation
    dispatch(setSubHeadlineOpacity(Math.max(0, 1 - progress)));

    // changing navigation color to white towards the end of the logo animation    
    dispatch(setNavigationColor(progress > 0.9 ? CompleteNavigationColor : TransitionNavigationColor));

    // keep track of the last scroll position
    dispatch(setLastScrollY(scrollY || 0));

    const config: LogoTransformConfig = LogoTransformConfigs(virtualScreenHeight, virtualScreenWidth)[getBreakpoint(virtualScreenWidth)];
    
    const transform: LogoTransform = {
        left: config.start.left + (config.target.left - config.start.left) * progress,
        top: config.start.top + (config.target.top - config.start.top) * progress,
        scale: config.start.scale + (config.target.scale - config.start.scale) * progress
    }

    dispatch(setLogoTransform(transform));
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
  dispatch(setNavigationTop(navigationBoundingRect.top));
}

export default navigationSlice.reducer;

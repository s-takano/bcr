// navigationSlice.ts
import { createSlice, PayloadAction, createSelector, UnknownAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { getBreakpoint } from '@/utils/viewport';
import {
  initialBrandSignatureTransform,
  BrandSignatureTransform,
  BrandSignatureTransformConfig, getBrandSignatureTransform,
  NavigationLogoColor,
  NavigationTransform,
  TextColor,
  ScreenDimensions
} from './LogoTransformConfigs';

interface NavigationState {
  hasMounted: boolean;
  lastScrollY: number;
  animationProgress: number;
  screenDimensions: ScreenDimensions;
  brandSignatureTransform: BrandSignatureTransform;
  navigationTransform: NavigationTransform;
  sidebarMenuOpen: boolean;
}

const initialState: NavigationState = {
  hasMounted: false,
  animationProgress: 0,
  lastScrollY: 0,
  screenDimensions: {
    screenHeight: 0,
    screenWidth: 0,
    navigationHeightMax: 200,
    brandSignatureWidth: 100,
    brandSignatureHeight: 200
  },
  brandSignatureTransform: initialBrandSignatureTransform,
  navigationTransform: {
    isActive: false,
    height: 200
  },
  sidebarMenuOpen: false
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
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
    setNavigationTransform(state, action: PayloadAction<NavigationTransform>) {
      state.navigationTransform = action.payload;
    },
    setSidebarMenuOpen(state, action: PayloadAction<boolean>) {
      state.sidebarMenuOpen = action.payload;
    },
    setScreenDimensions(state, action: PayloadAction<ScreenDimensions>) {
      state.screenDimensions = action.payload;
    }
  },
});


export const {
  setHasMounted,
  setAnimationProgress,
  setLastScrollY,
  setBrandSignatureTransform,
  setNavigationTransform,
  setSidebarMenuOpen,
  setScreenDimensions
} = navigationSlice.actions;

const IsAnimationComplete = (navigation: NavigationState) => {
  if (navigation.sidebarMenuOpen)
    return true;
  return navigation.animationProgress > 0.99;
}

const getLogoTextColor = (animationProgress: number): TextColor => {
  return {
    r: 255 - (255 - NavigationLogoColor.r) * animationProgress,
    g: 255 - (255 - NavigationLogoColor.g) * animationProgress,
    b: 255 - (255 - NavigationLogoColor.b) * animationProgress
  }
}

const getDropShadowOpacity = (animationProgress: number): number => {
  return 100 - 100 * animationProgress * 3;
}

export const selectIsAnimationComplete = createSelector(
  (state: RootState) => state.navigation.animationProgress,
  (animationProgress) => animationProgress > 0.99
);


const getProgress = (scrollY: number | undefined) => {
  if (!scrollY) return 0;
  const currentScrollY = scrollY;
  const currentTextOffset = currentScrollY * 0.9;
  const progress = Math.min(currentTextOffset / 500, 1);
  return progress;
}


const getSubHeadlineOpacity = (animationProgress: number): number => Math.max(0, 1 - animationProgress * 1.5);

const computeBrandSignatureTransform = (screenHeight: number, screenWidth: number, navigationHeightMax: number, brandSignatureWidth: number, brandSignatureHeight: number, progress: number): BrandSignatureTransform => {

  const config: BrandSignatureTransformConfig = getBrandSignatureTransform(screenHeight, screenWidth, navigationHeightMax, brandSignatureWidth, brandSignatureHeight, getBreakpoint(screenWidth));

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


const updateBrandSignatureTransform = (progress: number, sidebarMenuOpen: boolean) => (dispatch: ThunkDispatch<{ navigation: NavigationState; }, undefined, UnknownAction>, getState: () => RootState) => {

  const virtualScreenHeight = getState().navigation.screenDimensions.screenHeight || 800;
  const virtualScreenWidth = getState().navigation.screenDimensions.screenWidth || 1024;

  const transform = computeBrandSignatureTransform(
    virtualScreenHeight,
    virtualScreenWidth,
    getState().navigation.screenDimensions.navigationHeightMax,
    getState().navigation.screenDimensions.brandSignatureWidth,
    getState().navigation.screenDimensions.brandSignatureHeight,
    sidebarMenuOpen ? 1 : progress);

  dispatch(setBrandSignatureTransform(transform));
}

export const slideBrandSignature = (
  scrollY: number | undefined,
) =>
  (dispatch: ThunkDispatch<{ navigation: NavigationState; }, undefined, UnknownAction>, getState: () => RootState) => {

    const progress = getProgress(scrollY);

    dispatch(setAnimationProgress(progress));

    // keep track of the last scroll position
    dispatch(setLastScrollY(scrollY || 0));

    dispatch(updateBrandSignatureTransform(progress, getState().navigation.sidebarMenuOpen));
  };


const computeNavigationHeight = (sidebarMenuOpen: boolean, firstSectionHeight: number, scrollDisplacement: number, navigationHeight: number, navigationHeightMax: number) => {
  let newHeight = navigationHeight;

  if (firstSectionHeight <= navigationHeightMax && !sidebarMenuOpen)
    newHeight = navigationHeight - scrollDisplacement;
  else
    newHeight = navigationHeightMax;

  newHeight = Math.max(0, Math.min(navigationHeightMax, Math.round(newHeight)));

  return newHeight;
}

export const updateNavigationBoundingRect = (firstSectionHeight: number, scrollDisplacement: number) =>
  (dispatch: ThunkDispatch<{ navigation: NavigationState; }, undefined, UnknownAction>, getState: () => RootState) => {

    const navigationHeight = computeNavigationHeight(
      getState().navigation.sidebarMenuOpen,
      firstSectionHeight,
      scrollDisplacement,
      getState().navigation.navigationTransform.height,
      getState().navigation.screenDimensions.navigationHeightMax
    );

    dispatch(setNavigationTransform({
      isActive: IsAnimationComplete(getState().navigation),
      height: navigationHeight
    }));
  }

export const toggleSidebarMenu = () =>
  (dispatch: ThunkDispatch<{ navigation: NavigationState; }, undefined, UnknownAction>, getState: () => RootState) => {

    dispatch(setSidebarMenuOpen(!getState().navigation.sidebarMenuOpen));

    dispatch(setNavigationTransform({
      isActive: IsAnimationComplete(getState().navigation),
      height: getState().navigation.navigationTransform.height
    }));

    dispatch(updateBrandSignatureTransform(
      getState().navigation.animationProgress,
      getState().navigation.sidebarMenuOpen));
  }

export default navigationSlice.reducer;

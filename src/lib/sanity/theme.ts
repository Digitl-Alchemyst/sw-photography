const { theme } = (await import(
  // @ts-expect-error -- TODO setup themer.d.ts to get correct typings
  'https://themer.sanity.build/api/hues?default=7b7b7d;lightest:e9e9ec;darkest:101011&primary=799ed9;lightest:dedee2;darkest:17171a&transparent=959597;lightest:cacacb;darkest:27272b&positive=15b249;400&caution=c7a51f;300&critical=a01a0e'
)) as { theme: import('sanity').StudioTheme };

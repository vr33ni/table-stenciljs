import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
 
export const config: Config = {
  namespace: 'table-stenciljs',
  globalStyle: 'src/global/global.scss',
  plugins: [
    sass()
  ],
  extras: {
    cloneNodeFix: true,
    enableImportInjection: true,
  },

  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
     {
      type: 'dist-custom-elements',
      dir: 'stencil-components'
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    }
  ],
};
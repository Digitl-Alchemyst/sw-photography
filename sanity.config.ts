import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './schemaTypes';
import { apiVersion, dataset, projectId, studioUrl, title } from '@/lib/sanity/api';
import Logo from '@/c/studio/Logo';
import StudioNavbar from '@/c/studio/StudioNavbar';
import { myTheme } from '@/l/sanity/theme';

export default defineConfig({
  basePath: studioUrl,

  name: 'CMS_Studio',
  title: title,

  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,

  plugins: [
    structureTool({
      // defaultDocumentNode: getDefaultDocumentNode,
    }),
    visionTool({}),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: Logo,
      navbar: StudioNavbar,
    },
  },
  // theme: myTheme,
});

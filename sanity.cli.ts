import {defineCliConfig} from 'sanity/cli'
import {
  dataset,
  projectId,
} from '@/lib/sanity/sanity.tokens';

export default defineCliConfig({ api: { projectId, dataset } });
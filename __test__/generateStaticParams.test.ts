import resolveHref from '../src/lib/util/resolveHref';
import { generateStaticParams } from '../src/app/(user)/blog/[slug]/page';
describe('generateStaticParams', () => {
  it('should generate correct static params with paths', async () => {
    const params = await generateStaticParams();
    expect(params).toEqual([
      { slug: 'post-1', path: resolveHref('blog', 'post-1') },
      { slug: 'post-2', path: resolveHref('blog', 'post-2') },
    ]);
  });
});

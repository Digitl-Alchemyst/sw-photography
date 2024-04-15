import resolveHref from '../src/lib/util/resolveHref';

describe('resolveHref', () => {
  it('should return the correct path for a valid pageType', () => {
    const path = resolveHref('blog', 'my-blog-post');
    expect(path).toBe('/blog/my-blog-post');
  });

  it('should return undefined for an invalid pageType', () => {
    const path = resolveHref('invalid', 'my-blog-post');
    expect(path).toBeUndefined();
  });

  it('should handle missing slug correctly', () => {
    const path = resolveHref('blog');
    expect(path).toBe('/blog/');
  });

  // Add more test cases as needed
});

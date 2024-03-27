export default function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'blog':
      return slug ? `/blog/${slug}` : undefined
    case 'blogcategory':
      return slug ? `/blogcategory/${slug}` : undefined
    case 'gallery':
      return slug ? `/gallery/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

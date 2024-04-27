/* eslint-disable react/function-component-definition */
'use client';

import Link from 'next/link';

function ClientSideRoute({ children, route }: { children: React.ReactNode; route: string }) {
  return <Link href={route}>{children}</Link>;
}

export default ClientSideRoute;


/**
 * ClientSideRoute component renders a Link component to client-side route
 *
 * @param {React.ReactNode} children - The content to render inside the Link
 * @param {string} route - The client-side route to link to
 *
 * @returns {JSX.Element} - A Link component linking to the given route
 */
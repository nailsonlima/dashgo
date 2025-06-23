import Link, { LinkProps } from "next/link";
import { cloneElement, ReactElement } from "react";
import { useRouter } from "next/router";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement<{ color?: string }>;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({ children, shouldMatchExactHref = false , ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();

  let isActive = false;

  if(shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)){
    isActive = true;
  }
  if(!shouldMatchExactHref && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))){
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50',
      })}
    </Link>
  );
}

// import NextLink from 'next/link';
// import { useRouter } from 'next/router';
// import { ReactNode, cloneElement } from 'react';

// interface ActiveLinkProps {
//   children: ReactNode;
//   href: string;
//   shouldMatchExactHref?: boolean;
// }

// export function ActiveLink({ children, href, shouldMatchExactHref = false }: ActiveLinkProps) {
//   const { asPath } = useRouter();

//   // Verifica se o link está ativo
//   const isActive = shouldMatchExactHref ? asPath === href : asPath.startsWith(href);

//   // Clona o filho e adiciona a prop de estilo ativa
//   return (
//     <NextLink href={href} passHref>
//       {cloneElement(children as React.ReactElement, {
//         color: isActive ? 'pink.400' : 'gray.50',
//       })}
//     </NextLink>
//   );
// }

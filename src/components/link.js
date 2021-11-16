import Link from 'next/link';

const CustomLink = ({ href, children, ...props }) => {
  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  );
};

export default CustomLink;

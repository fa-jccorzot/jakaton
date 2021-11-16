import Head from 'next/head';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{`${title} | Falabella`}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default CustomHead;

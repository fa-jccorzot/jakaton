import styles from '../styles/home.module.css';
import Header from '../components/header';
import Head from '../components/head';
import Footer from '../components/footer';

import CustomLink from '../components/link';
import Left from '../components/arrows/left';
import Right from '../components/arrows/right';
import { useRef, useState, useEffect } from 'react';

const brands = [
  {
    id: 1,
    img: './images/brands/unsplash.png'
  },
  {
    id: 2,
    img: './images/brands/nike.png'
  },
  {
    id: 3,
    img: './images/brands/farfetch.png'
  },
  {
    id: 4,
    img: './images/brands/uniqlo.png'
  },
  {
    id: 5,
    img: './images/brands/west-elm.png'
  },
  {
    id: 6,
    img: './images/brands/gap.png'
  }
];

const products = [
  {
    img: '',
    brand: 'Barone LLC.',
    name: 'Set de sombras ',
    price: '$739.65',
    id: '1'
  },
  {
    img: '',
    brand: 'Barone LLC.',
    name: 'Set de sombras ',
    price: '$739.65',
    id: '2'
  },
  {
    img: '',
    brand: 'Barone LLC.',
    name: 'Set de sombras ',
    price: '$739.65',
    id: '3'
  },
  {
    img: '',
    brand: 'Barone LLC.',
    name: 'Set de sombras ',
    price: '$739.65',
    id: '4'
  },
  {
    img: '',
    brand: 'Barone LLC.',
    name: 'Set de sombras ',
    price: '$739.65',
    id: '5'
  },
  {
    img: '',
    brand: 'Barone LLC.',
    name: 'Set de sombras ',
    price: '$739.65',
    id: '6'
  },
  {
    img: '',
    brand: 'Barone LLC.',
    name: 'Set de sombras ',
    price: '$739.65',
    id: '7'
  },
  {
    img: '',
    brand: 'Barone LLC.',
    name: 'Set de sombras ',
    price: '$739.65',
    id: '8'
  },
  {
    img: '',
    brand: 'Barone LLC.',
    name: 'Set de sombras ',
    price: '$739.65',
    id: '9'
  },
  {
    img: '',
    brand: 'Barone LLC.',
    name: 'Set de sombras ',
    price: '$739.65',
    id: '10'
  },
  {
    img: '',
    brand: 'Barone LLC.',
    name: 'Set de sombras ',
    price: '$739.65',
    id: '11'
  }
];

export default function Home() {
  return (
    <>
      <Head title={'Surprise Me'} />
      <Header />
      <main className={styles.main}>
        <section className={styles.bannerContainer}>
          <img className={styles.bannerImg} src={'./images/banner.png'} alt={'banner'} />
        </section>

        <Section title={'Lo último que buscaste'}>
          <ProductsContainer>
            {products.map(product => (
              <ProductCard
                key={product.id}
                brand={product.brand}
                id={product.id}
                img={product.img}
                name={product.name}
                price={product.price}
              />
            ))}
          </ProductsContainer>
        </Section>

        <Section title={'Tus marcas favoritas'}>
          <div className={styles.brandsContainer}>
            {brands.map(brand => (
              <div key={brand.id} className={styles.brandContainer}>
                <img src={brand.img} alt={'brand'} />
              </div>
            ))}
          </div>
        </Section>
        <Section title={'Inspirado en tus favoritos'}>
          <ProductsContainer></ProductsContainer>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}

function ProductCard({ brand, name, price, img, id }) {
  return (
    <div className={styles.productCard}>
      <div src={img} className={styles.productImage} />
      <p className={styles.productBrand}>{brand}</p>
      <p className={styles.productName}>{name}</p>
      <p className={styles.productPrice}>{price}</p>
      <CustomLink href={`/${id}`} className={styles.productButton}>
        Ver Producto
      </CustomLink>
    </div>
  );
}

function ProductsContainer({ children }) {
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(false);
  const [position, setPosition] = useState(0);
  const ref = useRef();

  const length = useRef(children?.length || 0);
  const width = useRef(length.current * 192);
  const widthToChange = useRef(width.current / length.current);

  const changeCardClick = index => {
    setPosition(position + index * -widthToChange.current);
  };

  useEffect(() => {
    if (length.current <= 5) {
      setRight(true);
    }
  }, []);

  useEffect(() => {
    if (position === 0) {
      setLeft(true);
    } else if (position === -widthToChange.current * (length.current - 5)) {
      setRight(true);
    } else {
      setLeft(false);
      setRight(false);
    }
  }, [position]);

  return (
    <div className={styles.productsContainer}>
      <Left onClick={() => changeCardClick(-1)} disabled={left} />
      <div style={{ overflowX: 'hidden' }}>
        <div
          ref={ref}
          className={styles.productsRow}
          style={{ width: width.current, transform: `translateX(${position}px)` }}
        >
          {children}
        </div>
      </div>
      <Right onClick={() => changeCardClick(1)} style={{ justifySelf: 'end' }} disabled={right} />
    </div>
  );
}

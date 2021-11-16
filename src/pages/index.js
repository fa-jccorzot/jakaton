import styles from '../styles/Home.module.css';
import Header from '../components/header';
import Head from '../components/head';
import Footer from '../components/footer';

import CustomLink from '../components/link';
import Left from '../components/arrows/left';
import Right from '../components/arrows/right';

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

export default function Home() {
  return (
    <>
      <Head title={'Surprise Me'} />
      <Header />
      <main className={styles.main}>
        <section className={styles.bannerContainer}>
          <img className={styles.bannerImg} src={'./images/banner.png'} alt={'banner'} />
        </section>

        <Section title={'Lo último que buscaste'}></Section>

        <Section title={'Tus marcas favoritas'}>
          <div className={styles.brandsContainer}>
            {brands.map(brand => (
              <div key={brand.id} className={styles.brandContainer}>
                <img src={brand.img} alt={'brand'} />
              </div>
            ))}
          </div>
        </Section>
        <Section title={'Inspirado en tus favoritos'}></Section>
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

function ProductCard({ brand, name, price, img }) {
  return (
    <div className={styles.productContainer}>
      <div src={img} className={styles.productImage} />
      <p className={styles.productBrand}>{brand}</p>
      <p className={styles.productName}>{name}</p>
      <p className={styles.productPrice}>{price}</p>
      <CustomLink className={styles.productButton}>Ver Producto</CustomLink>
    </div>
  );
}

function ProductsContainer({ children }) {
  return (
    <div>
      <Left />
      {children}
      <Right />
    </div>
  );
}

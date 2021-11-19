import styles from '../styles/home.module.css';
import Header from '../components/header';
import Head from '../components/head';
import Footer from '../components/footer';

import CustomLink from '../components/link';
import Left from '../components/arrows/left';
import Right from '../components/arrows/right';
import { useRef, useState, useEffect } from 'react';

async function getProductsRecomendationsByUser(userId) {
  const response = await fetch(`https://model-tbjsueupcq-uc.a.run.app/predictions/items/${userId}`);
  const data = await response.json();
  return data;
}

async function getCategoriesRecomendationsByUser(userId) {
  const response = await fetch(`https://model-tbjsueupcq-uc.a.run.app/predictions/categories/${userId}`);
  const data = await response.json();
  return data;
}

async function getBrandsRecomendationsByUser(userId) {
  const response = await fetch(`https://model-tbjsueupcq-uc.a.run.app/predictions/brand/${userId}`);
  const data = await response.json();
  return data;
}

async function findProducts(product) {
  try {
    const response = await fetch(`https://www.tottus.cl/api/product-search?q=${product}&perPage=1`);
    const data = await response.json();
    return data;
  } catch (e) {
    /* const response = await fetch(`https://www.tottus.cl/api/product-search?q=${product}&perPage=1`);
    console.log(response); */
    console.log('ERROR YYYY: ', e);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Home({ products, brands, categories }) {
  return (
    <>
      <Head title={'Surprise Me'} />
      <Header />
      <main className={styles.main}>
        <section className={styles.bannerContainer}>
          <img className={styles.bannerImg} src={'./images/banner.png'} alt={'banner'} />
        </section>

        <Section title={'Lo que tenemos recomendado para ti'}>
          <ProductsContainer>
            {products.map(product => (
              <ProductCard
                key={product.id}
                brand={product.attributes.marca}
                id={product.id}
                img={product.images[0]}
                name={product.name}
                price={product.prices.currentPrice}
              />
            ))}
          </ProductsContainer>
        </Section>

        <Section title={'Marcas sugeridas'}>
          <div className={styles.brandsContainer}>
            {brands.map((brand, index) => (
              <Chip key={index} name={capitalizeFirstLetter(brand)} />
            ))}
          </div>
        </Section>
        <Section title={'Categorías sugeridas'}>
          <div className={styles.brandsContainer}>
            {categories.map((brand, index) => (
              <Chip key={index} name={capitalizeFirstLetter(brand?.toLowerCase())} />
            ))}
          </div>
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
      <img src={img} className={styles.productImage} alt={name} />
      <p className={styles.productBrand}>{capitalizeFirstLetter(brand ?? '')}</p>
      <p className={styles.productName}>{name}</p>
      <p className={styles.productPrice}>{`$ ${price}`}</p>
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
      setLeft(false);
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

function Chip({ name }) {
  return (
    <div className={styles.shipContainer}>
      <p className={styles.shipName}>{name}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const userId = context.params.id;
  try {
    const [recomendedProducts, categoriesRespone, brandsResponse] = await Promise.all([
      getProductsRecomendationsByUser(userId),
      getCategoriesRecomendationsByUser(userId),
      getBrandsRecomendationsByUser(userId)
    ]);

    const products = await Promise.all(
      Object.values(recomendedProducts.item_name).map(async producName => {
        const p = await findProducts(producName);
        return { ...p, searched: producName };
      })
    );
    const results = products
      .filter(product => product.count)
      .map(product => ({ ...product.results[0], searched: product.searched }));

    const categories = Object.values(categoriesRespone.category);

    const brands = Object.values(brandsResponse.brand).map(brand => brand.split(' ')[0]);

    return {
      props: { products: results, brands, categories } // will be passed to the page component as props
    };
  } catch (e) {
    console.log('ERROR: ', e);
    return {
      props: { products: [], brands: [], categories: [] } // will be passed to the page component as props
    };
  }
}

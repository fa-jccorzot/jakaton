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

// BA9567962ABE41EDBC7A7FF9476C80FB

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
  const response = await fetch(`https://model-tbjsueupcq-uc.a.run.app/predictions/brands/${userId}`);
  const data = await response.json();
  return data;
}

async function findProducts(product) {
  // https://www.tottus.cl/api/product-search?q=arroz&perPage=1
  /* const response = await fetch(`https://www.tottus.cl/api/product-search?q=arroz&perPage=1`, {});
  console.log(response);
  const data = await response.json(); */
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    '__cf_bm=S7Bvb6aUQwmzK_R2Y1wyXmroWdBfaco.pz4ybcoWm8k-1637293520-0-AUwykKepl84ApS+TsuMs8rDm+NPAvhK/i2bN3xTtUbkMPi4wbgFhRVs/ePu4p02LI7e51kXCQVO1dJHEM8pJR80U/wCZ5Sb1Ik8bjY00sJiz'
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://www.tottus.cl/api/product-search?q=${product}&perPage=1`, requestOptions);
  const data = await response.json();

  return data;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Home({ products }) {
  const [recomendedProducts, setRecomendedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    console.log('PRODUCTS: ', products);
  }, []);

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

        <Section title={'Tus marcas favoritas'}>
          <div className={styles.brandsContainer}>
            {brands.map(brand => (
              <div key={brand.id} className={styles.brandContainer}>
                <img src={brand.img} alt={'brand'} />
              </div>
            ))}
          </div>
        </Section>
        <Section title={'Inspirado en tus marcas favoritas'}>
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

export async function getServerSideProps(context) {
  const recomendedProducts = await getProductsRecomendationsByUser('BA9567962ABE41EDBC7A7FF9476C80FB');
  const products = await Promise.all(
    Object.values(recomendedProducts.item_name).map(async producName => {
      const p = await findProducts(producName);
      return { ...p, searched: producName };
    })
  );
  const results = products
    .filter(product => product.count)
    .map(product => ({ ...product.results[0], searched: product.searched }));
  return {
    props: { products: results } // will be passed to the page component as props
  };
}

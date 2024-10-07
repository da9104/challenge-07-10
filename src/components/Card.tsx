import styles from './Card.styles.module.scss'

interface CardProps {
  productName: string;
  productPrice: number;
  boughtDate: string;
}

function Card ({ productName, productPrice, boughtDate }: CardProps) {
  return (
    <div className="card flex flex-col mb-6 justify-center items-center">
     <div className='rounded border-2 px-10 py-10 w-[45%]'>
      <h2 className={styles.card__title}> {productName}</h2>
      <span> {productPrice} </span>
      <span> {boughtDate} </span>
      </div>
    </div>
  );
};

export default Card;
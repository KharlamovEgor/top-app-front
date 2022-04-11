import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { ForwardedRef, forwardRef, Fragment, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(
	forwardRef(
		(
			{ product, className, ...props }: ProductProps,
			ref: ForwardedRef<HTMLDivElement>,
		): JSX.Element => {
			const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
			const reviewRef = useRef<HTMLDivElement>(null);

			const variants = {
				closed: {
					height: 0,
					opacity: 0,
					overflow: 'hidden',
				},
				opened: {
					opacity: 1,
					height: 'auto',
				},
			};

			const scrollToReview = () => {
				setIsReviewOpened(true);
				reviewRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
				reviewRef.current?.focus();
			};

			return (
				<div className={className} {...props} ref={ref}>
					<Card className={cn(styles.product)}>
						<div className={styles.logo}>
							<Image
								src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
								alt={product.title}
								width="70"
								height="70"
							/>
						</div>
						<div className={styles.title}>{product.title}</div>
						<div className={styles.price}>
							<span>
								<span className="visualyHidden">цена</span>
								{priceRu(product.price)}
							</span>
							{product.oldPrice ? (
								<Tag className={styles.oldPrice} color="green">
									<span className="visualyHidden">скидка</span>
									{priceRu(product.price - product.oldPrice)}
								</Tag>
							) : null}
						</div>
						<div className={styles.credit}>
							<span>
								<span className="visualyHidden">кредит</span>
								{priceRu(product.credit)}/<span className={styles.month}>мес</span>
							</span>
						</div>
						<div className={styles.rating}>
							<span className="visualyHidden">
								{'рейтинг' + (product.reviewAvg ?? product.initialRating)}
							</span>
							<Rating rating={product.reviewAvg ?? product.initialRating} />
						</div>
						<div className={styles.tags}>
							{product.categories.map((c) => (
								<Tag className={styles.category} key={c} color="ghost">
									{c}
								</Tag>
							))}
						</div>
						<div className={styles.priceTitle} aria-hidden>
							цена
						</div>
						<div className={styles.creditTitle} aria-hidden>
							в кредит
						</div>
						<div className={styles.rateTitle}>
							<a
								href="#ref"
								onClick={scrollToReview}
								onKeyDown={(e) => {
									if (e.code == 'Space') {
										e.preventDefault();
										scrollToReview();
									}
								}}
							>
								{product.reviewCount}{' '}
								{declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
							</a>
						</div>
						<Divider className={styles.hr} />
						<div className={styles.description}>{product.description}</div>
						<div className={styles.feature}>
							{product.characteristics.map((c) => (
								<div className={styles.characteristics} key={c.name}>
									<span className={styles.characteristicsName}>{c.name}</span>
									<span className={styles.characteristicsDots} />
									<span className={styles.characteristicsValue}>{c.value}</span>
								</div>
							))}
						</div>
						<div className={styles.advBlock}>
							{product.advantages && (
								<div className={styles.advantages}>
									<div className={styles.advTitle}>Преимущества</div>
									<div>{product.advantages}</div>
								</div>
							)}
							{product.disadvantages && (
								<div className={styles.disadvantages}>
									<div className={styles.advTitle}>Недостатки</div>
									<div>{product.disadvantages}</div>
								</div>
							)}
						</div>
						<Divider className={cn(styles.hr, styles.hr2)} />
						<div className={styles.actions}>
							<Button appearance="primary">Узнать подробнее</Button>
							<Button
								appearance="ghost"
								arrow={isReviewOpened ? 'down' : 'right'}
								className={styles.reviewButton}
								onClick={() => setIsReviewOpened((state) => !state)}
								aria-expanded={!isReviewOpened}
							>
								Читать отзывы
							</Button>
						</div>
					</Card>
					<motion.div
						variants={variants}
						initial="closed"
						animate={isReviewOpened ? 'opened' : 'closed'}
					>
						<Card
							color="blue"
							className={cn(styles.reviews)}
							ref={reviewRef}
							tabIndex={isReviewOpened ? 0 : -1}
						>
							{product.reviews.map((r) => (
								<Fragment key={r._id}>
									<Review review={r} />
									<Divider />
								</Fragment>
							))}
							<ReviewForm productId={product._id} isOpened={isReviewOpened} />
						</Card>
					</motion.div>
				</div>
			);
		},
	),
);

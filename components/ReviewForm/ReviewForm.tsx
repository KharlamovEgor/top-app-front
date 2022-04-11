import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({
	productId,
	isOpened,
	className,
	...props
}: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
	} = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {
				...formData,
				productId,
			});

			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setError('Что-то пошло не так');
			}
		} catch (e) {
			if (e instanceof Error) {
				setError(e.message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', {
						required: {
							value: true,
							message: 'Заполните имя',
						},
					})}
					placeholder="Имя"
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register('title', {
						required: {
							value: true,
							message: 'Заполните заголовок',
						},
					})}
					className={styles.title}
					placeholder="Заголовок отзыва"
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'Укажите рейтинг',
							},
						}}
						render={({ field }) => (
							<Rating
								rating={field.value}
								ref={field.ref}
								isEditable
								setRating={field.onChange}
								error={errors.rating}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
						name="rating"
					/>
				</div>
				<Textarea
					{...register('description', {
						required: {
							value: true,
							message: 'Заполните описание',
						},
					})}
					className={styles.description}
					placeholder="Текст отзыва"
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					aria-label="текст отзыва"
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()} appearance="primary">
						Отправить
					</Button>
					<span className={styles.info}>
						* Перед публикацией отзыв пройдет предварительную модерацию и проверку
					</span>
				</div>
			</div>
			{isSuccess && (
				<div className={cn(styles.panel, styles.success)} role="alert">
					<div className={styles.successTitle}>Ваш отзыв отправлен</div>
					<div>Спасибо, ваш отзыв будет опубликован после проверки</div>
					<button
						className={styles.close}
						araia-label="Закрыть оповещение"
						onClick={() => setIsSuccess(false)}
						onKeyDown={(e) => {
							if (e.code == 'Space' || e.code == 'Enter') {
								e.preventDefault();
								setIsSuccess(false);
							}
						}}
					>
						<CloseIcon />
					</button>
				</div>
			)}
			{error && (
				<div className={cn(styles.panel, styles.error)} role="alert">
					Что-то пошло не так, попробуйте обновить страницу
					<button
						className={styles.close}
						onClick={() => setError(undefined)}
						aria-label="Закрыть оповещение"
						onKeyDown={(e) => {
							if (e.code == 'Space' || e.code == 'Enter') {
								e.preventDefault();
								setError(undefined);
							}
						}}
					>
						<CloseIcon />
					</button>
				</div>
			)}
		</form>
	);
};

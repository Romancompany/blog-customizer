import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState, SyntheticEvent, useEffect, useRef } from 'react';
import { Separator } from '../separator';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

type ArticleParamsFormProps = {
	setArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLElement | null>(null);
	const [isOpen, setOpen] = useState(false);
	const arrowClick = () => {
		setOpen((preOpen) => !preOpen);
	};

	useEffect(() => {
		const onMouseDown = (evt: Event) => {
			const target = evt.target as Node;
			if (!asideRef.current?.contains(target)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', onMouseDown);

		return () => {
			document.removeEventListener('mousedown', onMouseDown);
		};
	}, []);

	const [fontFamilyOption, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const [fontSizeOption, setFontSize] = useState(
		defaultArticleState.fontSizeOption
	);

	const onReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);

		setArticleState(defaultArticleState);
	};

	const onSubmit = () => {
		const articleState: ArticleStateType = {
			fontFamilyOption,
			fontColor,
			backgroundColor,
			contentWidth,
			fontSizeOption,
		};
		setArticleState(articleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={arrowClick} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onReset={onReset}
					onSubmit={(e: SyntheticEvent) => {
						e.preventDefault();
						onSubmit();
					}}>
					<Text
						as={'h2'}
						size={31}
						weight={800}
						uppercase={true}
						align={'left'}
						family={'open-sans'}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						selected={fontFamilyOption}
						onChange={setFontFamily}
						options={fontFamilyOptions}
						title='ШРИФТ'
					/>
					<RadioGroup
						selected={fontSizeOption}
						name='radio'
						onChange={setFontSize}
						options={fontSizeOptions}
						title='РАЗМЕР ШРИФТА'
					/>
					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='ЦВЕТ ШРИФТА'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='ЦВЕТ ФОНА'
					/>
					<Select
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
						title='ШИРИНА КОНТЕНТА'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

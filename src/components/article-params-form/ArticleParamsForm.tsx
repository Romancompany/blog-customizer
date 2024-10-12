import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
//import { StoryDecorator } from '../story-decorator';
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
} from '../../constants/articleProps';

const startOpen = true;

export const ArticleParamsForm = () => {
	const [isOpen, setOpen] = useState(startOpen);
	const arrowClick = () => {
		setOpen((preOpen) => !preOpen);
	};

	const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0]);
	const [fontColor, setFontColor] = useState(fontColors[0]);
	const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
	const [contentWidth, setContentWidth] = useState(contentWidthArr[0]);
	const [fontSize, setFontSize] = useState(fontSizeOptions[0]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={arrowClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text
						as={'h2'}
						weight={800}
						uppercase={true}
						align={'left'}
						family={'open-sans'}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						selected={fontFamily}
						onChange={setFontFamily}
						options={fontFamilyOptions}
						title='ШРИФТ'
					/>
					<RadioGroup
						selected={fontSize}
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

/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable max-params */
/**
 * @typedef {import('../../GAS | Library/v02/experiments/types').ExpSheet} ExpSheet
 * @typedef {import('../../GAS | Library/v02/experiments/types').ExpTasks} ExpTasks
 * @typedef {import('../../GAS | Library/v02/gas/styleSheet').RangeOptions} RangeOptions
 */

import { setMenu } from '../../GAS | Library/v02/gas/setMenu';
import { randomIntegersArray2d } from '../../GAS | Library/v02/arr/randomIntegersArray2d';
import { crusherCache } from '../../GAS | Library/v02/cache/crusherCache';
import { pipe } from '../../GAS | Library/v02/fp/pipe';
import { paste } from '../../GAS | Library/v02/gas/paste';
import { getProperSheet } from '../../GAS | Library/v02/experiments/getProperSheet';
import { runRandom } from '../../GAS | Library/v02/experiments/runRandom';
import { buildStructure } from '../../GAS | Library/v02/experiments/buildStructure';
import {
	setEveryMin,
	setEveryH,
	stopTimeTriggers,
} from '../../GAS | Library/v01/gas/timeTriggers';

import { EXP_SETUP } from './config';

/**
 * * Helper
 * Funkcja oczekująca tablicy funkcji z których będzie losowała te, które
 * mają właśnie się odpalić. Załadowany jest już do niej plik configu
 * @type {(arr: [string, function, string][]) => void}
 */

const go = runRandom(EXP_SETUP);

/* ******************************* ZADANIA ******************************** */

/**
 * Helper
 * Wpisuje w konsoli status działania
 *
 * @param {string} geo Źródło np. external
 * @param {string} ver Wersja eksperymentu
 * @param {string} desc Opis z którego arkusza wzięte dane
 */
const printInfo = (geo, ver, desc) =>
	console.log(`** Set to ${geo.toUpperCase()} '${desc}' | Ver: ${ver}`);

/**
 * Helper
 * Zapisz dane używając najefektywniejszego natywnego mechanizmu
 * @param {array[]} data Dane do wklejenia
 * @return {(sheet: GoogleAppsScript.Spreadsheet.Sheet) => void}
 */

const pasteNative = data => sheet =>
	sheet.getRange('A1:O').setValues(data);

/**
 * Zwraca specyficzny obiekt do paste. Dla 'native' nie jest wywoływana
 * @param {'default'|'full'|'nothing'|'native'} ver
 */

const getOptions = ver => {
	if (ver === 'default')
		return {
			notRemoveFilers: false,
			sort: null,
			sortOrder: null,
			restrictCleanup: null,
			notRemoveEmptys: false,
		};
	if (ver === 'nothing')
		return {
			notRemoveFilers: true,
			restrictCleanup: 'preserve',
			notRemoveEmptys: true,
		};
	if (ver === 'full') {
		return {
			sort: 1,
			sortOrder: 'az',
		};
	}
};

/**
 * Zapisz losowe dane dane do wskazanego źródła i wskazanego arkusza
 * @param {'ext'|'loc'|'hub'} geo Strukura danych do pobrania
 * @param {'default'|'full'|'nothing'|'native'} ver Wersja opcji - default - domyślna, full - dodane sortowanie do domyślej, nothing - tylko wkleja
 * @return {(target: ExpSheet) => function} target Np. target1 czy target2
 */
const setToSheet = (geo, ver) => target => {
	const data = randomIntegersArray2d(target.size, 15);

	return pipe(
		() => getProperSheet(geo, target, EXP_SETUP),
		sheet =>
			ver !== 'native'
				? paste(sheet, 'A1', data, getOptions(ver))
				: pasteNative(data),
		() => printInfo(geo, ver, target.printName)
	);
};

/**
 * Wklej dane do cacha
 * @param {string} prefix Przedrostek odróżniający cache od siebie
 * do testów 1, 15, 30 min i 1h
 * @returns {(target: ExpSheet) => function} target Np. target1 czy target2
 */
const setToCache = prefix => target => {
	const data = randomIntegersArray2d(target.size, 15);

	return pipe(
		() => crusherCache.put(`${prefix}${target.size}`, data, 360),
		() => printInfo('cache', prefix, target.printName)
	);
};

/* **************************** SETUP EXPERYMENTU ************************ */

// @ts-ignore
global.exp = {
	// Sety funkcji do losowania
	loc: go([
		['loc', setToSheet('loc', 'nothing'), 'a'],
		['loc', setToSheet('loc', 'default'), 'b'],
		['loc', setToSheet('loc', 'full'), 'c'],
		['loc', setToSheet('loc', 'native'), 'd'],
	]),
	hub: go([
		['hub', setToSheet('hub', 'nothing'), 'a'],
		['hub', setToSheet('hub', 'default'), 'b'],
		['hub', setToSheet('hub', 'full'), 'c'],
		['hub', setToSheet('hub', 'native'), 'd'],
	]),
	ext: go([
		['ext', setToSheet('ext', 'nothing'), 'a'],
		['ext', setToSheet('ext', 'default'), 'b'],
		['ext', setToSheet('ext', 'full'), 'c'],
		['ext', setToSheet('ext', 'native'), 'd'],
	]),
	// Zadania dla casha odpytywanego co 1, 15 i 30 min
	cacheA: go([['cache', setToCache('va'), 'a']]),
	cacheB: go([['cache', setToCache('vb'), 'b']]),
	cacheC: go([['cache', setToCache('vc'), 'c']]),
	cacheD: go([['cache', setToCache('vd'), 'd']]),
};

// @ts-ignore
global.utils = {
	buildStructure: () => buildStructure(EXP_SETUP),
	triggersFire: () => {
		setEveryMin('exp.loc', 1);
		setEveryMin('exp.hub', 1);
		setEveryMin('exp.ext', 1);
		setEveryMin('exp.cacheA', 1);
		setEveryMin('exp.cacheB', 15);
		setEveryMin('exp.cacheC', 30);
		setEveryH('exp.cacheD', 1);
	},
	triggersStop: stopTimeTriggers,
};

const menuElements = [
	['Zbuduj strukturę plików', 'utils.buildStructure'],
	[
		'Przetestuj funkcje',
		['Test : randomLocal', 'exp.loc'],
		['Test : randomHub', 'exp.hub'],
		['Test : randomExternal', 'exp.ext'],
		'------------------',
		['Test : randomCache 1 min', 'exp.cacheA'],
		['Test : randomCache 15 min', 'exp.cacheB'],
		['Test : randomCache 30 min', 'exp.cacheC'],
		['Test : randomCache 1h', 'exp.cacheD'],
	],
	'-------------------',
	['Uruchom eksperyment', 'utils.triggersFire'],
	['Zatrzymaj eksperyment', 'utils.triggersStop'],
	'-------------------',
	['Update menu', 'onOpen'],
];

// @ts-ignore
global.onOpen = () => {
	setMenu(menuElements, 'ICON', true);
};

/**
 * Ustawienie całego eksperymentu
 * @type {import('../../GAS | Library/v02/experiments/types').ExpSetup} EXP_SETUP
 */

const EXP_SETUP = {
	title: 'Zapis : Całość',
	method: 'Single Random',
	structure: {
		fixed: 'col',
		fixedSize: 15,
		randomData: false,
	},
	samples: {
		s1: 100,
		s2: 200,
		s3: 500,
		s4: 1000,
		s5: 2000,
		s6: 4000,
		s7: 8000,
		s8: 16000,
	},
	printTo: {
		loc: {
			prefix: 'A',
			name: 'Local',
			colorLight: '#ea4335',
			colorDark: '#c32e21',
			accentColor: '#ffff00',
			sheetsMeaning: {
				a: 'nothing',
				b: 'default',
				c: 'full',
				d: 'native',
				e: '',
				f: '',
			},
		},
		hub: {
			prefix: 'B',
			name: 'Hub',
			colorLight: '#ea4335',
			colorDark: '#c32e21',
			accentColor: '#ffff00',
			sheetsMeaning: {
				a: 'nothing',
				b: 'default',
				c: 'full',
				d: 'native',
				e: '',
				f: '',
			},
		},
		ext: {
			prefix: 'C',
			name: 'External',
			colorLight: '#ea4335',
			colorDark: '#c32e21',
			accentColor: '#ffff00',
			sheetsMeaning: {
				a: 'nothing',
				b: 'default',
				c: 'full',
				d: 'native',
				e: '',
				f: '',
			},
		},
		cache: {
			prefix: 'D',
			name: 'Cache',
			colorLight: '#ea4335',
			colorDark: '#c32e21',
			accentColor: '#ffff00',
			sheetsMeaning: {
				a: '1 min',
				b: '15 min',
				c: '30 min',
				d: '1 h',
				e: '',
				f: '',
			},
		},
	},
	misc: {
		templatPrintTo:
			'https://docs.google.com/spreadsheets/d/139mlb1yO8e_T8Bs25yX5kTiHaCvSNRuQf8RRyH2WpTg/edit#gid=1941260253',
		printToSubname: 'Wyniki',
		dataFolder: '_Pliki',
		externalsSheetName: 'Dane',
		externalsPrefix: 'file',
		hubName: 'externalHub',
	},
};

export { EXP_SETUP };

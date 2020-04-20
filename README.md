# GAS Perf. Exp | Template testu
## Template testu performance funkcji GAS

#### Struktura - plik config:
**Plik config** - wszystkie ustawienia struktury eksperymentu. Każdy element jest opisany w JSDocs. Kluczowe są 3 wymiary:

- **Samples** - to liczba wierszy lub kolumn w testowanych arkuszach (to czy są to kolumny czy wiersze ustawia się w kroku wcześniejszym - 'structure'). Cały system jest zbudowany na bazie 8 sampli. Może być mniej, ale nie może być więcej. Jeśli ma być mniej, to można zakomentować lub usunąc niepotrzebne właściwosci (np. s7, s8).

- **Struktura arkuszy** określona w sekcji 'results'. Są to najwyższe właściwości w tym obiekcie. Sa możliwe obecnie 4:
	- **Local (loc)** - arkusze na których operuje eksperyment są osadzone w tym samym arkuszu do skrypt (bound)
	- **Hub (hub)** - arkusze są osadzone w jednym zewnętrznym pliku
	- **External (ext)** - każdy arkusz sampla (jeden) jest osadzony w zewnętrznym pliku
	- **Cache (cache)** - dane (sample) są osadzone w cachu (na tym etapie cachu skryptu).

	Jeśli ma być mniej opcji struktur, to można usunąc lub zakomentować nieużywane (np. hub)

- **Warianty** - czyli różne opcje testowanej funkcji. System pozwala na 6 różnych opcji - wyniki trafiają do innych arkuszy w plikach wynikach (generycznie nazywające się A, B... F). Ich znaczenie definiuje się we właściwosć **sheetsMeaning** dla każdej możliwej opcji struktury.

#### Podgląd templatu + testy:
Podgląd testowych danych i testowanie zmian w templacie: https://drive.google.com/drive/folders/1yE3QKd1u21dSd9-KrPcjBJRKjnIHl2J3

#### Użycie:
Do każdego testu należy zbudować nowy sktypt i całą strukturę danych. Zatem najłatiwej przekopiować dane z tego tempatu jako nowy skrypt i je zmodyfikować

*****************
## Sekcja która powinna zostać w readme po przekopionau do oryginalnego eksperymentu:

### Dane:
url:

### Opis eksperymentu

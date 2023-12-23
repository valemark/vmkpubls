// Скрипт для работы базы данных

const PUBLS = document.getElementsByClassName("PUB");
const PUBLS_COUNT = PUBLS.length;

const PUBLS_STATUS = document.getElementById('ChoiceStatus');
const PUBLS_BASE = document.getElementById('ChoiceBase');

const STATISTICS_FIND = document.getElementById('StatisticsFIND');
const STATISTICS_HACJ = document.getElementById('StatisticsHACJ');
const STATISTICS_RSCI = document.getElementById('StatisticsRSCI');

const SEARCH = document.getElementsByClassName('Search');
const SEARCH_ID = document.getElementById('SearchId');
const SEARCH_AUTHOR = document.getElementById('SearchAuthor');
const SEARCH_TYPE = document.getElementById('SearchType');
const SEARCH_NAME = document.getElementById('SearchName');
const SEARCH_PLACE = document.getElementById('SearchPlace');
const SEARCH_BASE = document.getElementById('SearchBase');
const SEARCH_DATE = document.getElementById('SearchDate');
const SEARCH_PAGES = document.getElementById('SearchPages');


// Функция проверки наличия элемента в массиве
function ArrayCheck(element, array) {

	for (let array_element of array) {

		if (element == array_element) {
			return true
		}

	}

	return false

}

// Функция копирования библиографического описания в буфер обмена
function BiblioCopy(item) {

	let biblio = document.getElementById(item).innerText; 

	if (biblio == "") {
		alert("Библиографическое описание статьи " + item.slice(1, 6) + " отсутствует!");
	} else {
		navigator.clipboard.writeText(biblio);
		alert("Библиографическое описание статьи " + item.slice(1, 6) + " успешно скопировано!");
	}

}

// Функция отображения статистики публикаций
function ShowStat(count_find, count_hacj, count_rsci) {

	STATISTICS_FIND.innerHTML = "&nbsp;" + "НАЙДЕНО: " + count_find + " / " + PUBLS_COUNT + " | ";
	STATISTICS_HACJ.innerHTML = "ВАК: " + count_hacj + " | ";
	STATISTICS_RSCI.innerHTML = "РИНЦ: " + count_rsci + "&nbsp;";

}

// Функция поиска по различным критериям
function SearchPubls() {

	let count_find = 0;
	let count_hacj = 0;
	let count_rsci = 0;

	for (let PUB_LINE of PUBLS) {

		const CELL_ID =  PUB_LINE.getElementsByTagName("td")[0].innerHTML.slice(0, 5);
		const CELL_AUTHOR = PUB_LINE.getElementsByTagName("td")[1].innerHTML;
		const CELL_TYPE = PUB_LINE.getElementsByTagName("td")[2].innerHTML;
		const CELL_NAME = PUB_LINE.getElementsByTagName("td")[3].innerHTML;
		const CELL_PLACE = PUB_LINE.getElementsByTagName("td")[4].innerHTML;
		const CELL_BASE = PUB_LINE.getElementsByTagName("td")[5].innerHTML;
		const CELL_DATE = PUB_LINE.getElementsByTagName("td")[6].innerHTML;
		const CELL_PAGES = PUB_LINE.getElementsByTagName("td")[7].innerHTML.slice(0, 3);

		const REQUEST_ID = new RegExp(SEARCH_ID.value, 'i').test(CELL_ID);
		const REQUEST_AUTHOR = new RegExp(SEARCH_AUTHOR.value, 'i').test(CELL_AUTHOR);
		const REQUEST_TYPE = new RegExp(SEARCH_TYPE.value, 'i').test(CELL_TYPE);
		const REQUEST_NAME = new RegExp(SEARCH_NAME.value, 'i').test(CELL_NAME);
		const REQUEST_PLACE = new RegExp(SEARCH_PLACE.value, 'i').test(CELL_PLACE);
		const REQUEST_BASE = new RegExp(SEARCH_BASE.value, 'i').test(CELL_BASE);
		const REQUEST_DATE = new RegExp(SEARCH_DATE.value, 'i').test(CELL_DATE);
		const REQUEST_PAGES = new RegExp(SEARCH_PAGES.value, 'i').test(CELL_PAGES);

		let PUB_CLASSES = PUB_LINE.className.split(" ")
		PUB_CLASSES.push("ALL");

		PUB_LINE.style.display = "none";

		if (REQUEST_ID && REQUEST_AUTHOR && REQUEST_TYPE && REQUEST_NAME && REQUEST_PLACE && REQUEST_BASE && REQUEST_DATE && REQUEST_PAGES) {
			
			if (ArrayCheck(PUBLS_STATUS.value, PUB_CLASSES) && ArrayCheck(PUBLS_BASE.value, PUB_CLASSES)) {

				PUB_LINE.style.display = "";
				count_find = count_find + 1;

				if (ArrayCheck("HACJ", PUB_CLASSES)) {
					count_hacj = count_hacj + 1;
				}
				if (ArrayCheck("RSCI", PUB_CLASSES)) {
					count_rsci = count_rsci + 1;
				}

			}

		}

	}

	ShowStat(count_find, count_hacj, count_rsci);

}

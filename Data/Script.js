// Скрипт для работы базы данных

const PUBLS = document.getElementsByClassName("PUB");
const PUBLS_COUNT = PUBLS.length;

const PUBLS_STATUS = document.getElementById('ChoiceStatus');
const PUBLS_BASE = document.getElementById('ChoiceBase');

const STATISTICS_FIND = document.getElementById('StatisticsFind');
const STATISTICS_VAK = document.getElementById('StatisticsVAK');
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
function ShowStat(count_find, count_vak, count_rsci) {

	STATISTICS_FIND.innerHTML = "&nbsp;" + "НАЙДЕНО: " + count_find + " / " + PUBLS_COUNT + " | ";
	STATISTICS_VAK.innerHTML = "ВАК: " + count_vak + " | ";
	STATISTICS_RSCI.innerHTML = "РИНЦ: " + count_rsci + "&nbsp;";
}

// Функция поиска по различным критериям
function SearchPubls() {

	let count_find = 0;
	let count_vak = 0;
	let count_rsci = 0;

	for (let PUB_NOTE of PUBLS) {

		const CELL_TEXT_ID =  PUB_NOTE.getElementsByTagName("td")[0].innerHTML.slice(0, 5);
		const CELL_TEXT_AUTHOR = PUB_NOTE.getElementsByTagName("td")[1].innerHTML;
		const CELL_TEXT_TYPE = PUB_NOTE.getElementsByTagName("td")[2].innerHTML;
		const CELL_TEXT_NAME = PUB_NOTE.getElementsByTagName("td")[3].innerHTML;
		const CELL_TEXT_PLACE = PUB_NOTE.getElementsByTagName("td")[4].innerHTML;
		const CELL_TEXT_BASE = PUB_NOTE.getElementsByTagName("td")[5].innerHTML;
		const CELL_TEXT_DATE = PUB_NOTE.getElementsByTagName("td")[6].innerHTML;
		const CELL_TEXT_PAGES = PUB_NOTE.getElementsByTagName("td")[7].innerHTML.slice(0, 3);

		const REQUEST_ID = new RegExp(SEARCH_ID.value, 'i').test(CELL_TEXT_ID);
		const REQUEST_AUTHOR = new RegExp(SEARCH_AUTHOR.value, 'i').test(CELL_TEXT_AUTHOR);
		const REQUEST_TYPE = new RegExp(SEARCH_TYPE.value, 'i').test(CELL_TEXT_TYPE);
		const REQUEST_NAME = new RegExp(SEARCH_NAME.value, 'i').test(CELL_TEXT_NAME);
		const REQUEST_PLACE = new RegExp(SEARCH_PLACE.value, 'i').test(CELL_TEXT_PLACE);
		const REQUEST_BASE = new RegExp(SEARCH_BASE.value, 'i').test(CELL_TEXT_BASE);
		const REQUEST_DATE = new RegExp(SEARCH_DATE.value, 'i').test(CELL_TEXT_DATE);
		const REQUEST_PAGES = new RegExp(SEARCH_PAGES.value, 'i').test(CELL_TEXT_PAGES);

		PUB_NOTE.style.display = "none";

		if (REQUEST_ID && REQUEST_AUTHOR && REQUEST_TYPE && REQUEST_NAME && REQUEST_PLACE && REQUEST_BASE && REQUEST_DATE && REQUEST_PAGES) {
			
			if (PUB_NOTE.className.slice(4, 6) == PUBLS_STATUS.value || PUB_NOTE.className.slice(7, 9) == PUBLS_STATUS.value || PUBLS_STATUS.value == "ALL")  {
				
				if (PUB_NOTE.className.slice(7, 10) == PUBLS_BASE.value || PUB_NOTE.className.slice(11, 14) == PUBLS_BASE.value || PUB_NOTE.className.slice(10, 13) == PUBLS_BASE.value || PUB_NOTE.className.slice(14, 17) == PUBLS_BASE.value || PUBLS_BASE.value == "ALL") {
					
					PUB_NOTE.style.display = "";
					count_find = count_find + 1;
					
					if ((PUB_NOTE.className.slice(7, 10) == "DB1") || (PUB_NOTE.className.slice(11, 14) == "DB1") || (PUB_NOTE.className.slice(10, 13) == "DB1") || (PUB_NOTE.className.slice(14, 17) == "DB1")) {
						count_vak = count_vak + 1;
					}
					
					if ((PUB_NOTE.className.slice(7, 10) == "DB2") || (PUB_NOTE.className.slice(11, 14) == "DB2") || (PUB_NOTE.className.slice(10, 13) == "DB2") || (PUB_NOTE.className.slice(14, 17) == "DB2")) {
						count_rsci = count_rsci + 1;
					}

				}

			}

		}

	ShowStat(count_find, count_vak, count_rsci);

    }

}

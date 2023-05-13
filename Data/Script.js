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
function SearchPubls(argument) {

	let found_result;

	let search_request;
	let search_row;

	let count_find = 0;
	let count_vak = 0;
	let count_rsci = 0;

	if (argument == "ID") {
		search_request = new RegExp(SEARCH_ID.value, 'i');
		search_row = 0;
	} else if (argument == "Author") {
		search_request = new RegExp(SEARCH_AUTHOR.value, 'i');
		search_row = 1;
	} else if (argument == "Type") {
		search_request = new RegExp(SEARCH_TYPE.value, 'i');
		search_row = 2;
	} else if (argument == "Name") {
		search_request = new RegExp(SEARCH_NAME.value, 'i');
		search_row = 3;
	} else if (argument == "Place") {
		search_request = new RegExp(SEARCH_PLACE.value, 'i');
		search_row = 4;
	} else if (argument == "Base") {
		search_request = new RegExp(SEARCH_BASE.value, 'i');
		search_row = 5;
	} else if (argument == "Date") {
		search_request = new RegExp(SEARCH_DATE.value, 'i');
		search_row = 6;
	} else if (argument == "Pages") {
		search_request = new RegExp(SEARCH_PAGES.value, 'i');
		search_row = 7;
	} else {
		search_request = new RegExp(SEARCH_NAME.value, 'i');
		search_row = 3;
	}

	for (let PUB_NOTE of PUBLS) {
		found_result = false;
		if (search_row == 0) {
			found_cell = PUB_NOTE.getElementsByTagName("td")[0].innerHTML.slice(0, 5);
		} else {
			found_cell = PUB_NOTE.getElementsByTagName("td")[search_row].innerHTML;
		}
		found_result = search_request.test(found_cell);
		if ((found_result) & ((PUB_NOTE.className.slice(4, 6) == PUBLS_STATUS.value) || (PUB_NOTE.className.slice(7, 9) == PUBLS_STATUS.value) || (PUBLS_STATUS.value == "ALL")) & ((PUB_NOTE.className.slice(7, 10) == PUBLS_BASE.value) || (PUB_NOTE.className.slice(11, 14) == PUBLS_BASE.value) || (PUB_NOTE.className.slice(10, 13) == PUBLS_BASE.value) || (PUB_NOTE.className.slice(14, 17) == PUBLS_BASE.value) || (PUBLS_BASE.value == "ALL"))) {
			PUB_NOTE.style.display = "";
			count_find = count_find + 1;
			if ((PUB_NOTE.className.slice(7, 10) == "DB1") || (PUB_NOTE.className.slice(11, 14) == "DB1") || (PUB_NOTE.className.slice(10, 13) == "DB1") || (PUB_NOTE.className.slice(14, 17) == "DB1")) {
				count_vak = count_vak + 1;
			}
			if ((PUB_NOTE.className.slice(7, 10) == "DB2") || (PUB_NOTE.className.slice(11, 14) == "DB2") || (PUB_NOTE.className.slice(10, 13) == "DB2") || (PUB_NOTE.className.slice(14, 17) == "DB2")) {
				count_rsci = count_rsci + 1;
			}
		} else {
			PUB_NOTE.style.display = "none";
		}
	}

	for (SEARCH_INPUT of SEARCH) {
		if (SEARCH_INPUT.className.slice(7) != argument) {
			SEARCH_INPUT.value = "";
		}
	}

	ShowStat(count_find, count_vak, count_rsci);

}

// Функция поиска по статусу публикации
function SearchStatus() {
	
	let count_find = 0;
	let count_vak = 0;
	let count_rsci = 0;

	for (let PUB_NOTE of PUBLS) {
		if (((PUB_NOTE.className.slice(4, 6) == PUBLS_STATUS.value) || (PUB_NOTE.className.slice(7, 9) == PUBLS_STATUS.value) || (PUBLS_STATUS.value == "ALL")) & ((PUB_NOTE.className.slice(7, 10) == PUBLS_BASE.value) || (PUB_NOTE.className.slice(11, 14) == PUBLS_BASE.value) || (PUB_NOTE.className.slice(10, 13) == PUBLS_BASE.value) || (PUB_NOTE.className.slice(14, 17) == PUBLS_BASE.value) || (PUBLS_BASE.value == "ALL"))) {
			PUB_NOTE.style.display = "";
			count_find = count_find + 1;
			if ((PUB_NOTE.className.slice(7, 10) == "DB1") || (PUB_NOTE.className.slice(11, 14) == "DB1") || (PUB_NOTE.className.slice(10, 13) == "DB1") || (PUB_NOTE.className.slice(14, 17) == "DB1")) {
				count_vak = count_vak + 1;
			}
			if ((PUB_NOTE.className.slice(7, 10) == "DB2") || (PUB_NOTE.className.slice(11, 14) == "DB2") || (PUB_NOTE.className.slice(10, 13) == "DB2") || (PUB_NOTE.className.slice(14, 17) == "DB2")) {
				count_rsci = count_rsci + 1;
			}
		} else {
			PUB_NOTE.style.display = "none";
		}
	}

	ShowStat(count_find, count_vak, count_rsci);

}

// Функция поиска по базе данных публикации
function SearchBase() {
	
	let count_find = 0;
	let count_vak = 0;
	let count_rsci = 0;

	for (let PUB_NOTE of PUBLS) {
		if (((PUB_NOTE.className.slice(4, 6) == PUBLS_STATUS.value) || (PUB_NOTE.className.slice(7, 9) == PUBLS_STATUS.value) || (PUBLS_STATUS.value == "ALL")) & ((PUB_NOTE.className.slice(7, 10) == PUBLS_BASE.value) || (PUB_NOTE.className.slice(11, 14) == PUBLS_BASE.value) || (PUB_NOTE.className.slice(10, 13) == PUBLS_BASE.value) || (PUB_NOTE.className.slice(14, 17) == PUBLS_BASE.value) || (PUBLS_BASE.value == "ALL"))) {
			PUB_NOTE.style.display = "";
			count_find = count_find + 1;
			if ((PUB_NOTE.className.slice(7, 10) == "DB1") || (PUB_NOTE.className.slice(11, 14) == "DB1") || (PUB_NOTE.className.slice(10, 13) == "DB1") || (PUB_NOTE.className.slice(14, 17) == "DB1")) {
				count_vak = count_vak + 1;
			}
			if ((PUB_NOTE.className.slice(7, 10) == "DB2") || (PUB_NOTE.className.slice(11, 14) == "DB2") || (PUB_NOTE.className.slice(10, 13) == "DB2") || (PUB_NOTE.className.slice(14, 17) == "DB2")) {
				count_rsci = count_rsci + 1;
			}
		} else {
			PUB_NOTE.style.display = "none";
		}
	}

	ShowStat(count_find, count_vak, count_rsci);

}

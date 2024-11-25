export const calcuateOccuranceOfWord = (word, paragraph) => {
	return paragraph.toLowerCase().split(word.toLowerCase()).length - 1;
};

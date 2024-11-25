import { calcuateOccuranceOfWord } from './utilities';

const paragraph =
	'Frogs are fascinating creatures that belong to the amphibian family. They have smooth moist skin and long legs which help them jump great distances. Frogs live in many environments from forests to ponds. They are known for their unique croaking sounds which they use to communicate with each other. Additionally frogs play an important role in the ecosystem by controlling insect populations and serving as food for other animals.';

it("counts the number of 'are' in a paragraph", () => {
	expect(calcuateOccuranceOfWord('are', paragraph)).toBe(2);
});

it("counts the number of 'they' in a paragraph, ignoring case", () => {
	expect(calcuateOccuranceOfWord('they', paragraph)).toBe(3);
});

it("counts the number of 'They' in a paragraph, ignoring case", () => {
	expect(calcuateOccuranceOfWord('They', paragraph)).toBe(3);
});

it("counts the number of 'train' missing word", () => {
	expect(calcuateOccuranceOfWord('train', paragraph)).toBe(0);
});

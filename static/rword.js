"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_indexes_1 = require("./lib/generate-indexes");
const shuffle_words_1 = require("./lib/shuffle-words");
const fs_1 = require("fs");
const path_1 = require("path");
let words = [];
class rword {
    static get words() {
        return words;
    }
    /**
     * Randomly generates words from the words array
     */
    static generate(count = 1, opt) {
        opt = Object.assign({
            contains: /.*/,
            length: '3-10',
            capitalize: 'none'
        }, opt);
        let length = {};
        const contains = typeof opt.contains == 'string'
            ? new RegExp(opt.contains)
            : opt.contains;
        // Convert opt.length to an object
        // From string
        if (typeof opt.length == 'string') {
            if (opt.length.indexOf('-') > -1) {
                const [start, end] = opt.length.split('-').map(Number);
                length = { start, end };
            }
            else {
                opt.length = +opt.length;
            }
        }
        // From number
        if (typeof opt.length == 'number') {
            length = { exactly: opt.length };
        }
        let pool = [];
        // Skip filtering if possible
        if (contains.toString() == '/.*/' &&
            length.start == 3 &&
            length.end == 10) {
            pool = words;
        }
        // Filter out unwanted words
        else {
            pool = words.filter(word => {
                // Filter out words that don't match length
                if (length.exactly) {
                    if (word.length != length.exactly)
                        return false;
                }
                else {
                    if (word.length < length.start ||
                        word.length > length.end)
                        return false;
                }
                // Filter out words that don't contain regex
                if (contains)
                    return contains.test(word);
                else
                    return true;
            });
        }
        // No matches
        if (!pool.length)
            return count == 1 ? '' : [];
        // Generate indexes for words to return
        const indexes = generate_indexes_1.generateIndexes(pool.length, count);
        const temp = [];
        // Select words by index
        indexes.forEach(index => temp.push(pool[index]));
        pool = temp;
        // Capitalize words
        switch (opt.capitalize) {
            case 'all':
                pool = pool.map(w => w.toUpperCase());
                break;
            case 'first':
                pool = pool.map(w => w[0].toUpperCase() + w.slice(1));
                break;
        }
        // Returns string or array of strings
        return count == 1 ? pool[0] : pool;
    }
    /**
     * A simple generator that pulls words from a prefilled global pool. Should
     *  be preferred over `rword.generate()` if custom filters are not needed as
     *  this method can in certain instances be many times faster.
     * @param count - Words to return. Throws error if greater than `10`
     */
    static generateFromPool(count = 1) {
        if (count > 10)
            throw 'Too many words requested. Use rword.generate().';
        // Fill globalPool
        if (count > rword.globalPool.length)
            rword.globalPool = rword.generate(500);
        const pool = rword.globalPool.splice(0, count);
        return count == 1 ? pool[0] : pool;
    }
    /**
     * Shuffles words and globalPool arrays
     */
    static shuffle() {
        shuffle_words_1.shuffleWords(words);
        shuffle_words_1.shuffleWords(rword.globalPool);
    }
    /**
     * Load and shuffle word list
     */
    static load(list) {
        words = JSON.parse(fs_1.readFileSync(path_1.resolve(__dirname, `../words/${list}.json`), 'utf8'));
        rword.shuffle();
    }
}
rword.globalPool = [];
exports.rword = rword;
rword.load('small');
//# sourceMappingURL=rword.js.map
class UtilityHelper {
    setStyle(dom_elem, style_vals) {
        for (var property in style_vals) {
            dom_elem.style[property] = style_vals[property];
        }
        return dom_elem;
    }

    setVisibility(dom_elem, visible) {
        if (!visible) {
            dom_elem.style.visibility = "hidden";
        } else {
            dom_elem.style.visibility = "visible";
        }
    }

    setOpacity(dom_elem, val) {
        dom_elem.style.opacity = val;
    }

    removeElements(elements_arr, parent_elem) {
        for (let elem_ind = elements_arr.length - 1; elem_ind >= 0; elem_ind--) {
            parent_elem.removeChild(elements_arr[elem_ind]);
        }
    }

    filter_input(str_input) {
        if (str_input.length <= 3) {
            return false;
        } else {
            return true;
        }
    }
}

class ProcessQuery {
    constructor() {
        let a_elem_arr = document.getElementsByTagName("a");
        this.searchTrie = new SearchTrie();
        for (let elem_ind = 0; elem_ind < a_elem_arr.length; elem_ind++) {
            let elem = a_elem_arr[elem_ind];
            let elem_text_content = elem.textContent.toLowerCase();
            // Disqualifying entries with just one letter or less
            if (elem_text_content && elem_text_content.length > 2) {
                let token_set = this.compute_ngrams(elem_text_content, 3).keys();
                console.log(token_set);
                for (let ngram of token_set) {
                    if (ngram.trim().length >= 2) {
                        let elem_node = new ElementNode(ngram, elem);
                        this.searchTrie.add_string(elem_node);
                    }
                }

            }
        }
    }

    compute_ngrams(elem_text, n) {
        let ngrams_set = new Set();
        let mod = elem_text.length % n;
        for (let i = 0; i < elem_text.length - mod; i++) {
            let ngram = elem_text.substr(i, n);
            ngrams_set.add(ngram);
        }
        return ngrams_set;
    }

    genericResults(query_str) {
        // query_str should be minimum of three letters
        if (query_str && query_str.length >= 3) {
            let elem_nodes = this.searchTrie.get_suggestions(query_str.toLowerCase());
            return elem_nodes;
        }
    }
}

// Changes
// Which are in space break and relate them to same element
// Do not admit elements having no text at all

//:nt, :ct commands
// Check enter when no results
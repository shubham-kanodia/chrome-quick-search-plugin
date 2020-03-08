class ElementNode {
    constructor(str_doc, elem) {
        this.str_doc = str_doc;
        this.elem = elem;
    }
}


class TrieNode {
    constructor(tr_char) {
        this.tr_char = tr_char;
        this.next_nodes = [];
        this.end_elem_nodes = [];
    }
    addNode(node) {
        this.next_nodes.push(node);
        return this.next_nodes.length - 1;
    }
    get fetch_tr_char() {
        return this.tr_char;
    }

    get fetch_next_nodes() {
        return this.next_nodes;
    }

    get fetch_end_elem_nodes() {
        return this.end_elem_nodes;
    }

    find_in_nodes(tr_char) {
        for (let elem_ind = 0; elem_ind < this.next_nodes.length; elem_ind++) {
            if (this.next_nodes[elem_ind].tr_char == tr_char) {
                return elem_ind;
            }
        }
        return -1;
    }
}

class SearchTrie {
    constructor() {
        this.root = new TrieNode("-");
    }

    add_string(elem_obj, at_ind = 0, root = this.root) {
        let str_doc = elem_obj.str_doc;
        let elem = elem_obj.elem;
        let elem_ind = root.find_in_nodes(str_doc[at_ind]);
        if (elem_ind == -1) {
            let new_node = new TrieNode(str_doc[at_ind]);
            elem_ind = root.addNode(new_node);
        }
        if (at_ind < str_doc.length - 1) {
            this.add_string(elem_obj, at_ind + 1, root.next_nodes[elem_ind]);
        } else {
            root.next_nodes[elem_ind].end_elem_nodes.push(elem_obj);
        }
    }

    find_end_node(str_doc, root = this.root, at_ind = 0) {
        if (at_ind > str_doc.length - 1) {
            return root;
        }
        let elem_ind = root.find_in_nodes(str_doc[at_ind]);
        if (elem_ind == -1) {
            return root;
        } else {
            return this.find_end_node(str_doc, root.next_nodes[elem_ind], at_ind + 1);
        }
    }

    get_suggestions(str_doc) {
        let end_node = this.find_end_node(str_doc);
        let arr_nodes = [end_node];
        let temp_arr_nodes = [];
        let arr_elem_nodes = [];
        while (arr_nodes.length > 0 && arr_elem_nodes.length < 5) {
            for (let elem_ind = 0; elem_ind < arr_nodes.length; elem_ind++) {
                temp_arr_nodes = temp_arr_nodes.concat(arr_nodes[elem_ind].next_nodes);
                arr_elem_nodes = arr_elem_nodes.concat(arr_nodes[elem_ind].end_elem_nodes);

            }
            arr_nodes = temp_arr_nodes;
            temp_arr_nodes = [];
        }
        return arr_elem_nodes.slice(0, 6);
    }
}
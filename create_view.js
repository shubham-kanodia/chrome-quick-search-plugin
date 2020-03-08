class ViewHandler {
    constructor() {
        this.utilityHelper = new UtilityHelper()
        this.html_elem = document.querySelector("html");
        this.body_elem = document.querySelector("body");
        this.parent_div = document.createElement("div");
        this.input_elem = document.createElement("input");
        this.parent_div.setAttribute("id", "parentdiv74937");
        this.input_elem.setAttribute("id", "searchinp74937");
        this.input_elem.setAttribute("spellcheck", "false");
        this.parent_div = this.utilityHelper.setStyle(this.parent_div, parent_div_style)
        this.input_elem = this.utilityHelper.setStyle(this.input_elem, search_bar_style);
        this.html_elem.appendChild(this.parent_div);
        this.parent_div.appendChild(this.input_elem);
        this.input_elem.addEventListener("focus", function() {
            this.style.outline = "none";
        });
    }

    triggerView() {
        this.utilityHelper.setVisibility(this.parent_div, true);
        this.utilityHelper.setOpacity(this.body_elem, "0.6");
        this.utilityHelper.setOpacity(this.parent_div, "1.0");
        this.input_elem.focus();
    }

    hideView() {
        this.utilityHelper.setVisibility(this.parent_div, false);
        this.utilityHelper.setOpacity(this.body_elem, "1.0");
    }

    reflectResults(results_array) {
        // Delete Elements on every query
        let del_elements = document.querySelectorAll(".search_result_del");
        this.utilityHelper.removeElements(del_elements, this.parent_div);
        if (!results_array) {
            return;
        }
        for (let elem_index = 0; elem_index < results_array.length; elem_index++) {
            let div_elem = document.createElement("div");
            div_elem = this.utilityHelper.setStyle(div_elem, search_result_style);
            div_elem.textContent = results_array[elem_index].elem.textContent;
            div_elem.setAttribute("class", "search_result_del");
            div_elem.setAttribute("id", `search_result_id_${elem_index}`);
            this.parent_div.append(div_elem);
        }
    }
}
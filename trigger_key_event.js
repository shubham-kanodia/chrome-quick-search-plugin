let viewHandler = null;
let current_result_index = 0;
let total_results = null;
let results = null;
let utilityHelper = new UtilityHelper();
if (window == top) {
    window.addEventListener('keyup', doKeyPress, false);
    viewHandler = new ViewHandler();
}

function doKeyPress(e) {
    if (e.shiftKey && e.keyCode == 71) {
        viewHandler.triggerView();
        processQuery = new ProcessQuery();
        let input_elem = document.getElementById("searchinp74937");
        input_elem.addEventListener("keyup", showSearchResults);
    }
    if (e.key === "Escape") {
        viewHandler.hideView();
    }
}

function click_result_options() {
    let current_elem = results[current_result_index];
    current_elem.elem.click();
}

function process_command(inp_command) {
    if (inp_command.trim().indexOf(" ") != -1) {
        let split_command = inp_command.trim().split(" ");
        let inp_params = split_command.slice(1);
        let init_inp_command = split_command[0];
        console.log(init_inp_command);
        console.log(inp_params);
        chrome.runtime.sendMessage({ command: init_inp_command, params: inp_params });
    } else {
        chrome.runtime.sendMessage({ command: inp_command });
    }
}

function filter_input(str_inp) {
    if (str_inp[0] == ':') {
        process_command(str_inp.slice(1));
    } else {
        click_result_options();
    }
}

function showSearchResults(e) {
    if (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 13) {
        // All keys other than up arrow, down arrow and enter
        let input_elem_value = document.getElementById("searchinp74937").value;
        if (input_elem_value[0] != ":") {
            results = processQuery.genericResults(input_elem_value);
            viewHandler.reflectResults(results);
            if (results) {
                total_results = results.length;
                current_result_index = total_results - 1;
            } else {
                total_results = 0;
            }
        }
    }

    if (e.keyCode == 38) {
        // Up Arrow Key
        let current_elem = document.getElementById(`search_result_id_${current_result_index}`);
        current_elem = utilityHelper.setStyle(current_elem, search_result_style);
        if (current_result_index > 0) {
            current_result_index -= 1;
        } else {
            current_result_index = total_results - 1;
        }
        let next_elem = document.getElementById(`search_result_id_${current_result_index}`);
        utilityHelper.setStyle(next_elem, highlighted_search_result);
    } else if (e.keyCode == 40) {
        // Down Arrow Key
        let current_elem = document.getElementById(`search_result_id_${current_result_index}`);
        current_elem = utilityHelper.setStyle(current_elem, search_result_style);
        current_result_index = (current_result_index + 1) % total_results;
        let next_elem = document.getElementById(`search_result_id_${current_result_index}`);
        utilityHelper.setStyle(next_elem, highlighted_search_result);
    } else if (e.keyCode == 13) {
        // Enter Key
        let input_elem_value = document.getElementById("searchinp74937").value;
        filter_input(input_elem_value);
    }
}

// Tab search
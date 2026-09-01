const STORAGE_KEY = "taskflow_data";


function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.tasks)
    );

}


function loadData() {

    const savedTasks =
        localStorage.getItem(STORAGE_KEY);


    if (!savedTasks) {
        return;
    }


    state.tasks =
        JSON.parse(savedTasks);

}